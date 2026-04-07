# Roll Model — 3D Artist Technical Brief

> **Status**: ACTIVE
> **Created**: 2026-04-07
> **For**: 3D artist / modeler delivering bowling ball assets for web-based interactive viewer
> **Tech stack**: Three.js via React Three Fiber, rendered in browser via WebGL/WebGPU

---

## Project Context

Roll Model is an interactive 3D bowling encyclopedia. Users read about bowling concepts while manipulating 3D visualizations — spinning a bowling ball, adjusting RPM, viewing axis tilt, etc. The bowling ball is the hero asset that appears on nearly every page. It needs to look *exceptional* — this is a product showcase, not a game asset.

The ball is viewed in a panel that can range from 400px to 1200px wide, at close-to-medium distance. Users orbit around it, zoom in on finger holes, and watch it spin at various speeds. It's always against a dark background with studio-style lighting.

---

## Deliverables Summary

| Asset | Format | Poly Target | Texture Res | File Size Target |
|-------|--------|-------------|-------------|------------------|
| Bowling Ball (generic) | GLB (Draco compressed) | 20-50K tris | 2K (2048x2048) | 1-3 MB |
| Ball Core Cutaway | GLB (Draco compressed) | 30-60K tris | 2K | 2-4 MB |
| HDRI Environment | HDR or EXR | N/A | 2K (2048x1024) minimum | 2-5 MB |

---

## 1. Bowling Ball Model

### Geometry

- **Total triangle count**: 20,000-50,000
- **Sphere body**: Smooth subdivision, 64+ segments around the equator for silhouette quality at close distance
- **Finger holes**: Three holes (two finger, one thumb) with interior geometry — NOT just texture tricks. Users will orbit and zoom close enough to see inside. The holes should have ~5mm of visible interior depth with slightly rounded edges
  - Two finger holes: ~28mm diameter
  - One thumb hole: ~32mm diameter
  - Holes positioned in standard conventional grip layout
- **Pin marker**: A small filled circle on the ball surface (the "pin" mark used in drilling — NOT a bowling pin). This is a flat colored dot, approximately 15mm diameter. Position it roughly 3-4 inches from the finger holes
- **CG marker**: A smaller dot marking the center of gravity. Position opposite side from the pin
- **No flat bottom / no stand** — the ball floats in space, resting on a contact shadow

### UV Mapping

**Critical**: UVs must support dynamic texture swapping. We will programmatically change the ball's color, graphics, and logo at runtime.

- **Single UV map** occupying the full 0-1 UV space
- **Spherical projection** with seam placed where finger holes are (hidden area)
- **Finger holes on separate UV islands** (they have a different material — dark matte interior)
- **Deliver the UV layout as a flat PNG** alongside the model, so we can paint graphics directly onto the UV template
- **Test**: The UV layout should produce zero visible distortion when a checkerboard texture is applied

### Normals & Smoothing

- Smooth shading everywhere on the ball surface
- Sharp edges ONLY on the finger hole rims (the transition from ball surface to hole interior)
- Recalculate normals before export — no inverted faces

---

## 2. Material Setup (Blender Principled BSDF)

Set up the material in Blender using **Principled BSDF** so it exports correctly to glTF/GLB.

### Reactive Resin Coverstock (default ball surface)

A reactive resin bowling ball has a specific look: high gloss, subtle depth, slightly translucent coverstock with a clearcoat layer on top.

| Principled BSDF Property | Value | Notes |
|--------------------------|-------|-------|
| Base Color | Connect to **Diffuse texture** | The ball's primary color/graphic |
| Metallic | **0.0** | Resin is NOT metallic |
| Roughness | **0.12 - 0.18** | Low = glossy. Connect to **Roughness texture** for variation |
| IOR | **1.5** (default) | Standard dielectric |
| Coat Weight | **1.0** | Full clearcoat coverage — this is the key to the "wet" look |
| Coat Roughness | **0.05 - 0.10** | Very smooth clearcoat — near-mirror glossiness |
| Sheen Weight | **0.15 - 0.25** | Subtle edge glow at grazing angles |
| Sheen Tint | **0.0** (white) | Neutral sheen color |
| Normal Map | Connect to **Normal texture** | Surface micro-detail (porosity of resin) |

### Finger Hole Interior (separate material)

| Property | Value |
|----------|-------|
| Base Color | **#050505** (near-black) |
| Roughness | **0.85 - 0.95** (very matte) |
| Metallic | **0.0** |
| No clearcoat | |

### Material Variants to Deliver

If possible, deliver multiple material presets saved as Blender material slots:

1. **Reactive Resin** (glossy, clearcoat, high sheen) — most common ball type
2. **Urethane** (slightly more matte, less clearcoat, warmer tone)
3. **Plastic/Polyester** (very high gloss, no surface texture, like a house ball)
4. **Pearl Reactive** (add iridescence — color shift at viewing angles)

These variants let us show different ball types in the Equipment chapter. If too much work, prioritize Reactive Resin only.

---

## 3. Texture Maps

Deliver all textures at **2048x2048 (2K)** resolution in **PNG format** (we compress to KTX2/Basis in our pipeline).

### Required Maps

| Map | Description | Notes |
|-----|-------------|-------|
| **Diffuse / Albedo** | Base color of the ball | Pure color, NO lighting baked in. Should be neutral enough to tint programmatically |
| **Normal Map** | Surface micro-detail | The subtle porosity/texture of reactive resin coverstock. NOT perfectly smooth — real bowling balls have visible micro-texture under close inspection |
| **Roughness Map** | Glossiness variation | Mostly uniform low values (0.1-0.2) but with subtle variation mimicking real coverstock |
| **AO (Ambient Occlusion)** | Shadow in crevices | Primarily affects finger hole rims and any logo/graphic recesses |

### Optional Maps (enhanced realism)

| Map | Description | Notes |
|-----|-------------|-------|
| **Clearcoat Normal Map** | Microscopic clearcoat surface detail | Very subtle — adds realism to reflections at close zoom |
| **Emissive Map** | For glowing logo/brand elements | Only if we want specific design elements to glow |

### What NOT to Bake

- Do NOT bake lighting into the diffuse map
- Do NOT bake shadows into any map (we use real-time shadows)
- Do NOT bake environment reflections (we use real-time environment mapping)

---

## 4. Ball Core Cutaway Model (Secondary Asset)

For the "Core Design" chapter, we need a cross-section view showing the internal structure of a bowling ball.

### What It Shows

A bowling ball sliced in half (or ~60% with a cutaway), revealing:

1. **Outer shell (coverstock)** — the colored exterior, 2-3mm thick
2. **Filler material** — the bulk of the ball interior, uniform color (usually off-white/gray)
3. **Core** — the dense weight block in the center

### Two Variants

**Symmetric Core**: A simple lightbulb/mushroom shape centered in the ball. The mass is evenly distributed around the vertical axis.

**Asymmetric Core**: An irregularly shaped core with a visible mass bias (one side heavier). Often has a secondary "flange" extending from the main core.

Reference images: search "bowling ball core cutaway" — there are many manufacturer cross-section photos showing the layers.

### Geometry Notes

- The cut surface should be clean and flat (like a medical diagram cross-section)
- Each layer (coverstock, filler, core) should be a separate mesh/material for color independence
- Core geometry should be detailed enough to show the shape clearly
- Cut edges can have a slight bevel for visual polish

---

## 5. Environment Map (HDRI)

We need a studio-style HDRI that makes glossy bowling balls look their best.

### Requirements

- **Format**: HDR (.hdr) or OpenEXR (.exr) — must be high dynamic range, NOT LDR
- **Resolution**: 2048x1024 minimum (2K equirectangular), 4096x2048 preferred
- **Style**: Studio lighting — soft key light, subtle fill, rim light for edge definition
- **Background**: Dark/neutral — the ball renders against a dark UI (#09090b near-black)
- **Light sources**: 2-3 distinct soft lights visible in reflections. Bowling balls are highly reflective; the reflected light sources ARE the visual interest

### What Works Well for Glossy Spheres

- A main soft light slightly above and to the right (creates the primary specular highlight)
- A subtle fill from the left (prevents the dark side from going completely black)
- A rim/back light (creates the bright edge outline that separates the ball from the background)
- No harsh point lights — everything should be soft and diffused

### Source Options

If sourcing rather than creating:
- [Poly Haven](https://polyhaven.com/hdris) — free CC0 HDRIs, search "studio"
- [Needle Cloud FastHDR](https://cloud.needle.tools/hdris) — optimized KTX2 format HDRIs
- Custom: shoot or render a studio environment in Blender (Cycles) and export as equirectangular HDR

---

## 6. Export Settings (Blender)

### GLB Export Checklist

```
File > Export > glTF 2.0 (.glb/.gltf)

Format: glTF Binary (.glb)

Include:
  [x] Selected Objects (or entire scene if only ball)
  [x] Custom Properties

Transform:
  [x] +Y Up (glTF standard)

Data > Mesh:
  [x] Apply Modifiers
  [x] UVs
  [x] Normals
  [x] Vertex Colors (if used)
  [ ] Tangents (Three.js computes these)

Data > Material:
  [x] Materials
  [x] Images — embed in GLB

Compression:
  [x] Compression (enable Draco)
  Compression Level: 6 (good balance of speed/size)
  Quantization Position: 14 (sufficient for bowling ball scale)
  Quantization Normal: 10
  Quantization Tex Coord: 12
  Quantization Color: 10
```

### Post-Export Optimization (we handle this)

After receiving the GLB, we will:
1. Run `gltf-transform optimize` for additional compression
2. Convert textures to KTX2/Basis format for GPU-compressed delivery
3. Test in our R3F viewer for material fidelity

---

## 7. File Naming Convention

```
bowling-ball-reactive-resin.glb      # Main ball model
bowling-ball-core-symmetric.glb      # Cutaway — symmetric core
bowling-ball-core-asymmetric.glb     # Cutaway — asymmetric core
studio-lighting.hdr                  # HDRI environment

textures/
  ball-diffuse.png                   # 2048x2048
  ball-normal.png                    # 2048x2048
  ball-roughness.png                 # 2048x2048
  ball-ao.png                        # 2048x2048
  ball-clearcoat-normal.png          # 2048x2048 (optional)
  ball-uv-layout.png                 # UV template for painting graphics
```

---

## 8. Quality Checklist

Before delivery, verify:

- [ ] GLB opens correctly in [glTF Viewer](https://gltf-viewer.donmccurdy.com/)
- [ ] Ball looks correct under default lighting in the viewer
- [ ] Finger holes have visible interior geometry (not just dark texture)
- [ ] No inverted normals (ball doesn't appear inside-out from any angle)
- [ ] UV checkerboard test shows no major distortion
- [ ] File size is under 3 MB per model (with embedded textures)
- [ ] Textures are 2K PNG with no baked lighting
- [ ] Materials use Principled BSDF (not custom shader nodes that won't export)
- [ ] HDRI creates visible specular highlights on a glossy sphere test

---

## 9. How We'll Use These Assets

In our React Three Fiber setup:

```tsx
// Loading the ball model
const { scene } = useGLTF('/models/bowling-ball-reactive-resin.glb')

// Loading the environment
<Environment files="/hdri/studio-lighting.hdr" />

// Dynamic color/graphic changes
material.map = newDiffuseTexture  // Swap ball graphic at runtime
material.color = new Color('#1a1a2e')  // Tint base color
```

The ball will be:
- Orbited by users (mouse drag to rotate camera around ball)
- Spun at various RPM values (continuous rotation animation)
- Viewed from multiple angles (close zoom to see finger holes, pulled back for full ball)
- Shown alongside other 3D objects (lane surface, pins) in later phases

Quality matters because users spend extended time looking at this ball while reading educational content. It's not a fleeting game asset — it's a showcase piece that needs to hold up under close, prolonged inspection.

---

## 10. Communication

- Deliver via shared drive, WeTransfer, or git LFS — whatever works
- Include the Blender source file (.blend) alongside exports so we can iterate
- Questions about Three.js material compatibility → ask Joe, we'll test and provide feedback
- First deliverable: the main bowling ball model. We'll integrate and provide visual feedback before proceeding to the core cutaway
