# Roll Model — Layout Overhaul + Scene Cue System

> **Status**: ACTIVE
> **Created**: 2026-04-07
> **Phase**: 2 (Post-foundation, pre-content expansion)

---

## Problem

Phase 1 shipped a stacked layout: 3D scene on top (~55vh), content below. This creates two issues:

1. **Content is below the fold.** Users must scroll past the entire 3D canvas before seeing any text. The 3D dominates; the reading experience suffers.
2. **No interaction between content and scene.** The 3D ball spins with Leva sliders, but reading about "250 RPM stroker" doesn't connect to what you see. The learning is disconnected — text in one zone, visualization in another.
3. **GFM tables render as raw markdown pipes.** `remark-gfm` was removed from `next.config.ts` due to Turbopack serialization issues. Tables are a critical content format.

## Solution

### 1. Side-by-Side Layout (Option B)

On desktop (lg+), switch to a two-column layout:

```
+----------+-----------------------------+-------------------+
| SIDEBAR  |  CONTENT (scrollable)       | 3D SCENE (sticky) |
| 280px    |  max-w-2xl, left-aligned    | position: sticky  |
|          |                             | top: 0            |
| Ch 1...  |  # Rev Rate                 | height: 100vh     |
| Ch 5:    |  Rev rate measures...       |                   |
|  > Rev   |                             | [Spinning ball]   |
|    Tilt   |  ## Why It Matters          | [Leva controls]   |
|          |  ...                        |                   |
+----------+-----------------------------+-------------------+
```

Breakpoint behavior:
- **lg+ (1024px+)**: Side-by-side. Content left ~55%, 3D right ~45%. 3D is `position: sticky; top: 0; height: 100vh`.
- **md (768-1023px)**: Stacked but 3D reduced to ~35vh. Content gets more space.
- **sm (<768px)**: Content only. 3D hidden. Mobile sidebar drawer.

This matches the dany.works GLB viewer reference from the original vision — the layout Joe specifically called out as closest to what he wanted.

### 2. Scene Cues — Inline Interactive Moments

A new MDX component `<SceneCue>` that lives inside content and commands the 3D scene when clicked.

```mdx
<SceneCue
  label="See it: Stroker at 250 RPM"
  description="Watch how slowly a stroker's ball rotates"
  params={{ rpm: 250, showAxis: true }}
/>
```

When clicked:
1. The 3D scene smoothly transitions to the specified parameters
2. A brief highlight/pulse on the scene to draw attention
3. The Leva controls update to reflect the new values
4. The cue visually shows it's "active" (different border/bg)

Types for Phase 2:
- **Parameter Snap** — sets specific slider/toggle values (RPM, axis tilt, color, etc.)

Types for later phases:
- **Animated Sequence** — plays a scripted multi-step animation
- **Comparison Toggle** — switches between two states
- **Spotlight** — moves camera to a specific position/angle

### 3. GFM Table Fix

Pass `remarkGfm` plugin to `next-mdx-remote-client` in the `[...slug]/page.tsx` RSC render call, not through `next.config.ts`. This avoids the Turbopack serialization issue entirely.

### 4. 3D Quality Path

Current ball is a procedural sphere with `meshStandardMaterial`. For the prototype this is fine. The long-term path to highest-quality ball rendering on the web:

**Phase 2 (now)**: Improve the procedural ball — better PBR material (clearcoat for that glossy reactive resin look), environment map reflection, subtle track flare ring.

**Phase 3+**: Custom GLB model from Blender (or sourced from Joe's 3D partners) with:
- Baked AO and normal maps for surface detail
- Proper UV mapping for ball logos/graphics
- `meshPhysicalMaterial` with clearcoat, clearcoatRoughness, sheen
- HDR environment map for realistic reflections
- Post-processing: subtle bloom on specular highlights, SSAO

The architecture doesn't change — `BowlingBall` component accepts an optional `model` prop. Procedural geometry is the fallback; GLB is the upgrade path.

---

## Architecture Changes

### Scene Context Expansion

Current `scene-context.tsx` only tracks `activeScene: string`. Needs to also track scene parameters that can be set from content:

```typescript
interface SceneState {
  activeScene: string;
  setActiveScene: (scene: string) => void;
  sceneParams: Record<string, number | boolean | string>;
  setSceneParams: (params: Record<string, number | boolean | string>) => void;
}
```

This is the bridge. SceneCue components call `setSceneParams()`. The 3D scene reads `sceneParams` and uses them as override values for Leva controls.

### Leva + Context Integration

The challenge: Leva has its own internal state via `useControls`. We need scene cues to *set* Leva values from outside. Leva supports this via the `set` function returned from `useControls`:

```typescript
const [{ rpm }, set] = useControls("Rev Rate", () => ({
  rpm: { value: 400, min: 150, max: 650, step: 10 },
}));

// When context params change, sync to Leva:
useEffect(() => {
  if (sceneParams.rpm !== undefined) {
    set({ rpm: sceneParams.rpm });
  }
}, [sceneParams, set]);
```

This keeps Leva as the source of truth for the 3D scene, while allowing content to push values into it.

---

## Files to Modify

| File | Change |
|------|--------|
| `src/app/learn/layout.tsx` | Side-by-side grid layout (lg+), stacked fallback (md), content-only (sm) |
| `src/components/layout/scene-container.tsx` | Remove fixed height, adapt for sticky sidebar role |
| `src/lib/scene-context.tsx` | Add `sceneParams` and `setSceneParams` |
| `src/components/3d/scenes/rev-rate-scene.tsx` | Read context params, sync to Leva `set()` |
| `src/app/learn/[...slug]/page.tsx` | Add `remarkGfm` to MDXRemote options |
| `src/components/content/scene-cue.tsx` | NEW — the inline interactive CTA component |
| `src/components/content/mdx-components.tsx` | Register SceneCue in component map |
| `content/the-release/rev-rate.mdx` | Add SceneCue instances at key learning moments |
| `src/components/3d/bowling-ball.tsx` | Upgrade material to meshPhysicalMaterial with clearcoat |

---

## Verification

- [ ] lg+ screens: content scrolls on left, 3D sticky on right, sidebar on far left
- [ ] md screens: stacked layout, 3D at ~35vh, content below with more room
- [ ] sm screens: content only, no 3D, mobile drawer
- [ ] GFM tables render as proper HTML tables
- [ ] SceneCue click transitions the ball RPM smoothly
- [ ] Leva controls update when SceneCue fires
- [ ] Manual Leva adjustment still works independently
- [ ] Ball material looks noticeably better (clearcoat reflections)
- [ ] `npm run build` succeeds
- [ ] `npx tsc --noEmit` clean
