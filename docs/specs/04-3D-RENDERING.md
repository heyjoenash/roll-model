# Roll Model — 3D Rendering Specification

> **Status**: CANONICAL
> **Last Updated**: 2026-04-11
> **Informed by**: Deep research into Shopify Editions (BFCM Globe) and Stripe Press 3D approaches

---

## Design Philosophy

3D in Roll Model follows the Shopify/Stripe principle: **content-first 3D**. The 3D scene exists to illustrate what the text describes, never for its own sake. Every visual effect should create instant understanding that no paragraph can match.

The visual quality target is "product photography" — studio lighting, soft reflections, cinematic tone mapping. Think Stripe Press book renders, not a game engine.

---

## Lighting System

**File**: `src/components/3d/scene-lighting.tsx`

### Architecture

Uses drei's `<Environment>` with `<Lightformer>` children instead of HDRI files. This is fully self-contained — zero network requests, zero file dependencies. The Environment renders Lightformers into an internal `WebGLCubeRenderTarget` at 256px resolution.

### Light Setup (5 Lightformers + 2 Directional)

| Light | Type | Intensity | Position | Purpose |
|-------|------|-----------|----------|---------|
| Key | Lightformer rect | 2.0 | [2, 3, 2] | Primary soft highlight, top-right |
| Fill | Lightformer rect | 0.5 | [-3, 1, -1] | Prevents harsh shadows on opposite side |
| Rim/Accent | Lightformer circle | 3.0 | [-2, 2, -3] | Dynamic color from content, creates colored rim |
| Bottom | Lightformer rect | 0.3 | [0, -3, 0] | Prevents pitch-black underside |
| Top Ambient | Lightformer ring | 1.0 | [0, 4, 0] | Overall ambient fill |
| Shadow Caster | directionalLight | 0.8 | [4, 5, 3] | castShadow for ContactShadows, 1024px shadow map |
| Accent Direct | directionalLight | 0.3 | [-2, 3, -1] | Lerps color to match accent Lightformer |

### Dynamic Accent Color (Stripe Press Technique)

The rim Lightformer and accent directional light shift color to match the active content's ball color. When a SceneCue changes `ballColor` to red, the environment reflections and rim light smoothly transition to red over ~2 seconds.

Implementation uses `useFrame` with `THREE.Color.lerp(target, 0.03)` — 60fps * 0.03 per frame settles in ~100 frames (~1.7 seconds). The lerped hex value is passed to the Lightformer's `color` prop; the directional light color is updated imperatively via ref.

### Props

```typescript
interface SceneLightingProps {
  accentColor?: string;  // CSS hex color, default "#b0b0ff"
}
```

### Previous Instability Note

Earlier versions used `<Environment preset="studio">` which fetches HDRIs from `cdn.polyhaven.com`. Network failures caused rendering crashes. The current Lightformer approach has no network dependency and is deterministically stable. **Do not add `preset`, `files`, or `path` props to the Environment component.**

---

## Ball Material

**File**: `src/components/3d/bowling-ball.tsx`

### MeshPhysicalMaterial (Polyurethane Clearcoat)

The main ball surface uses `meshPhysicalMaterial` to simulate a polished reactive resin bowling ball:

| Property | Value | Rationale |
|----------|-------|-----------|
| `roughness` | 0.15 | Low — polished surface. Clearcoat adds its own roughness on top |
| `metalness` | 0.08 | Near-zero — bowling balls are dielectric. Slight metalness adds color depth |
| `clearcoat` | 1.0 | Full clearcoat — the single most impactful property. Simulates polyurethane topcoat |
| `clearcoatRoughness` | 0.12 | Slight imperfection — "just polished" look, not glass |
| `envMapIntensity` | 1.2 | Slightly boosted environment reflections for the Lightformer setup |

### Ball Components

| Component | Geometry | Material | Notes |
|-----------|----------|----------|-------|
| Ball surface | sphereGeometry [radius, 64, 64] | meshPhysicalMaterial + clearcoat | Hero material, 64 segments for smooth silhouette |
| Finger holes (x3) | cylinderGeometry | meshStandardMaterial #050505, roughness 0.9 | Dark matte interior |
| Equator stripe | torusGeometry | meshPhysicalMaterial, white, opacity 0.35, clearcoat 0.5 | Makes spin visible at any RPM |
| Pin dot | sphereGeometry [radius*0.035] | meshStandardMaterial, white | Rotation reference point |
| Axis line | drei Line | Red #ef4444, lineWidth 2 | Optional, toggled by showAxis |

### Visual Speed Scaling

Real RPM mapped to visual rotation speed for readability:

```
visualRevsPerSec = 0.3 + (rpm / 650) * 2.7
```

| RPM | Visual Speed | Feel |
|-----|-------------|------|
| 150 | ~0.5 rev/sec | Lazy, clearly slow |
| 350 | ~1.7 rev/sec | Moderate, readable |
| 600 | ~3.0 rev/sec | Fast but trackable |

Real 600 RPM = 10 rev/sec (unreadable blur). The scaling ensures all speeds are instructive.

### Float Animation

The ball is wrapped in drei's `<Float>` for subtle organic motion:

| Property | Value | Effect |
|----------|-------|--------|
| `speed` | 1.5 | Slow oscillation cycle |
| `rotationIntensity` | 0.1 | Barely perceptible wobble |
| `floatIntensity` | 0.15 | Gentle vertical bob |
| `floatingRange` | [-0.005, 0.005] | 5mm total travel — subtle enough to be felt, not seen |

---

## Post-Processing Stack

**File**: `src/components/3d/post-processing.tsx`

### Effect Pipeline

Effects are processed in order within a single `<EffectComposer multisampling={0}>`:

| Effect | Key Settings | Purpose |
|--------|-------------|---------|
| **N8AO** | aoRadius=0.08, intensity=2.0, quality="medium", halfRes | Ambient occlusion — adds depth to finger holes, contact areas |
| **Bloom** | mipmapBlur, intensity=0.4, luminanceThreshold=0.85, radius=0.6 | Soft glow on clearcoat specular highlights. mipmapBlur is the premium algorithm |
| **Vignette** | offset=0.3, darkness=0.6 | Edge darkening frames the ball, draws eye to center |
| **ToneMapping** | mode=AGX | Filmic color response, preserves hues in bright highlights (better than ACES) |
| **SMAA** | (default settings) | Software anti-aliasing, required because hardware AA is disabled |

### Why multisampling={0}

N8AO doesn't work correctly with hardware MSAA. Instead, SMAA handles anti-aliasing in the post-processing pass. The Canvas also sets `antialias: false` for this reason.

### Bloom Threshold Design

`luminanceThreshold=0.85` means most surfaces don't bloom. Only the brightest specular highlights from the clearcoat material exceed this threshold. This creates selective, premium-feeling glow — not a gaming bloom-everything aesthetic.

---

## Contact Shadows

Added to both `RevRateScene` and `DefaultScene`:

```tsx
<ContactShadows
  position={[0, -BALL_RADIUS_METERS, 0]}
  opacity={0.5}
  scale={0.8}
  blur={2.5}
  far={0.5}
  resolution={256}
  frames={1}
  color="#000000"
/>
```

`frames={1}` bakes the shadow once on mount — zero ongoing GPU cost. The shadow silhouette doesn't change because the ball spins in place.

---

## Performance Strategy

### PerformanceMonitor (Adaptive DPR)

**File**: `src/components/layout/scene-canvas.tsx`

```
DPR starts at: Math.min(window.devicePixelRatio, 2)
On decline (FPS drops): DPR → 1
On incline (FPS recovers): DPR → Math.min(devicePixelRatio, 2)
After 3 flipflops: Stays at lower setting (gives up oscillating)
```

### Canvas Configuration

```tsx
<Canvas
  gl={{ antialias: false, powerPreference: "high-performance" }}
  dpr={dpr}  // Adaptive
/>
```

- `antialias: false` — SMAA handles it in post-processing
- `powerPreference: "high-performance"` — Requests discrete GPU on laptops
- DPR capped at 2 — Retina displays with DPR 3 get capped (Shopify pattern)

### Performance Budget

| Metric | Target |
|--------|--------|
| Draw calls | <20 (single ball + few lights) |
| Triangles | <15K (64x64 sphere + cylinders + torus) |
| Textures | 0 (procedural materials only) |
| Post-processing | 5 effects, merged into minimal passes |
| Frame time | <16.6ms on mid-range laptop GPU |

---

## Scene System

### Scene Switching

**File**: `src/components/layout/scene-switcher.tsx`

```typescript
switch (activeScene) {
  case "rev-rate": return <RevRateScene />;
  default:         return <DefaultScene />;
}
```

### Adding New Scenes

1. Create `src/components/3d/scenes/{scene-name}-scene.tsx`
2. Include `<SceneLighting accentColor={...} />`, your 3D content, `<ContactShadows>`, and `<OrbitControls>`
3. Add the case to `scene-switcher.tsx`
4. Add the scene name to the content entry in `content-map.ts`

### Scene Props Pattern

Each scene reads from SceneContext and syncs to Leva:

```tsx
const { sceneParams } = useScene();
const [{ param1, param2 }, set] = useControls("Scene Name", () => ({
  param1: { value: default, min, max, step, label },
}));

useEffect(() => {
  if (sceneParams.param1 !== undefined) set({ param1: sceneParams.param1 });
}, [sceneParams, set]);
```

---

## Future Upgrades (Phase 3+)

| Upgrade | Impact | Complexity |
|---------|--------|------------|
| GLB bowling ball model | Dramatically better detail (proper holes, logo UV) | Medium — swap geometry, keep material |
| HDRI from @pmndrs/assets | Richer reflections than Lightformers | Low — add `files` prop to Environment |
| Scroll-linked 3D (drei ScrollControls) | Camera moves as content scrolls | Medium |
| Camera transitions (CameraControls) | Smooth camera moves between sections | Low — already available in drei |
| Scene transition animations (@react-spring/three) | Fade/morph between scenes | Medium |
| Depth of Field | Cinematic focus effect | Low — add to PostProcessing |
| More scenes (lane, pins, approach) | Content expansion | High volume, low per-scene complexity |
