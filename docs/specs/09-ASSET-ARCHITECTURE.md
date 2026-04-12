# Roll Model — Asset Architecture & Prototype Options

> **Status**: ACTIVE
> **Created**: 2026-04-12
> **Purpose**: Define the asset layer for Lane, Figure, Pins, and Ball so that today's prototypes can be swapped for high-end 3D team deliverables later without rewriting scenes

---

## The Core Insight

The highest risk in Roll Model isn't the 3D quality of today's prototypes — it's building scenes that are so tightly coupled to specific primitive geometries that every future upgrade requires rewriting every scene that uses them.

The solution is an **interface layer**: each asset (Ball, Lane, Pins, Figure) is a React component with a stable prop API. Scenes consume the interface. The implementation behind the interface can start as crude primitives and end as photoreal GLB models from a professional 3D team — and scenes never change.

This is the same pattern Shopify uses (MeshBasicMaterial with baked lighting for mobile, full PBR for desktop — the same scene component, swapped materials) and the same pattern Stripe Press uses (a single `Book` component whose implementation is a GLTF model but whose interface is "show me this book with these materials").

Build the prototype primitive versions now. Lock in the interfaces. Ship content against the prototypes. Swap in high-end assets when they arrive.

---

## The Interface Contract

Every asset component follows this pattern:

```tsx
// What the scene writes — stable forever
<Lane
  view="overhead"
  oilPattern="house-shot"
  highlightBoard={10}
  zones={["skid", "hook", "roll"]}
  ballPath={[{board: 20, distance: 0}, {board: 5, distance: 40}, {board: 17.5, distance: 60}]}
/>

// What the Lane component is internally — swappable
// Prototype v1: procedural shader plane with math-driven markings
// Prototype v2: textured plane with PNG oil overlay
// Production v3: GLB model from 3D team with PBR wood grain
// Production v4: GLB model with shader overlays for dynamic elements
```

The scene doesn't know which implementation is active. It just passes props. The implementation decides how to render.

This pattern means:
- **Content gets written today** against the stable interface
- **Prototype assets** get built today to unblock content
- **3D team deliverables** slot in later without touching scenes or content
- **A/B testing** is trivial — render the same scene with different implementations

---

## Asset 1: The Ball

### Current State (Already Built)
- Procedural sphere with MeshPhysicalMaterial + clearcoat
- Finger holes as cylinders
- Equator stripe (torus), pin dot marker
- Spin animation via useFrame with visual speed scaling
- Float wrapper for organic motion
- Accepts: `rpm`, `axisTilt`, `color`, `showAxis`, `radius`

### Interface for the Future

```tsx
interface BallProps {
  // Physical state
  rpm?: number;              // 0-700
  axisTilt?: number;         // 0-90 degrees
  axisRotation?: number;     // 0-90 degrees
  color?: string;            // hex

  // Surface characteristics
  coverstock?: 'plastic' | 'urethane' | 'reactive-solid' | 'reactive-pearl' | 'reactive-hybrid';
  surfaceGrit?: number | 'polish';  // 500-5000 or "polish"

  // Drilling layout
  layout?: 'pin-up' | 'pin-down' | 'pin-over-bridge';
  pinPosition?: [number, number];   // UV coordinates on ball surface
  cgPosition?: [number, number];
  papPosition?: [number, number];

  // Visual helpers
  showAxis?: boolean;
  showFlareRings?: boolean;
  showMarkers?: boolean;    // pin, CG, MB dots
  showCutaway?: number;     // 0-1, for core visualization
  coreType?: 'symmetric' | 'asymmetric';
}
```

### Prototype Tiers

**Tier 1 — Current (shipped):**
Procedural sphere + clearcoat. All physical state props work. Surface characteristics are faked by adjusting roughness/metalness per coverstock preset. Drilling layout shown as colored dots at approximate positions. Cutaway and core require Tier 2.

**Tier 2 — Next upgrade (1-2 days of work):**
Add a second sphere geometry inside the outer one, visible when cutaway > 0. Clip the outer geometry using a clipping plane. Core geometry is a bespoke mesh (symmetric = light bulb shape, asymmetric = light bulb + protrusion). Surface characteristics become proper material variants, not just roughness tweaks — a sparkle shader for pearl, a more diffuse shader for urethane, etc.

**Tier 3 — High-end team deliverable:**
Full GLB model with photogrammetry-grade detail. UV unwrapped for programmatic texture swapping (diffuse, normal, roughness maps). Separate GLB per coverstock type, OR a single GLB with material slots that get swapped at runtime. Track flare rings baked into normal map. Logo decals as separate texture layer.

### Upgrade Path

The current implementation accepts all the Tier 3 prop surface without change. When the GLB arrives, internal rendering switches from `<sphereGeometry>` to `<primitive object={gltf.scene} />`. No scene using `<Ball>` needs to change.

---

## Asset 2: The Lane

### Interface

```tsx
interface LaneProps {
  // Camera intent (affects how Lane renders, not where camera lives)
  view?: 'overhead' | 'perspective' | 'side' | 'first-person';

  // Markings visibility
  showArrows?: boolean;        // 7 arrows at 15ft
  showDots?: boolean;          // dots at 7.5ft and approach dots
  showFoulLine?: boolean;
  showBoards?: boolean;        // all 39 board lines
  showGutters?: boolean;

  // Dynamic highlights
  highlightBoard?: number;     // 1-39, lights up one board
  highlightBoardRange?: [number, number];  // [8, 12] highlights a range
  highlightColor?: string;

  // Zones for ball motion visualization
  showZones?: boolean;
  zoneColors?: { skid: string; hook: string; roll: string };

  // Oil pattern overlay
  oilPattern?: 'none' | 'house-shot' | 'wolf' | 'cheetah' | 'viper'
             | 'chameleon' | 'bear' | 'scorpion' | 'dragon' | 'badger'
             | 'shark' | 'bat' | 'custom';
  customOilPattern?: OilPattern;  // See type definition below
  oilPatternVisible?: boolean;    // Toggle visibility without changing data
  oilTransitionLevel?: number;    // 0 = fresh, 1 = heavily worn (6 games)

  // Surface type (affects material appearance)
  surface?: 'wood' | 'synthetic' | 'overlay-synthetic';

  // Ball path overlay
  ballPath?: Array<{ board: number; distance: number; phase?: 'skid' | 'hook' | 'roll' }>;
  ballPathColor?: string;
  ballPathOpacity?: number;

  // Breakpoint marker
  breakpoint?: { board: number; distance: number };
}

interface OilPattern {
  length: number;           // feet, 32-48
  volumeMl: number;         // total volume
  forward: number[];        // oil load per board, forward pass
  reverse: number[];        // oil load per board, reverse pass
  crossPattern?: 'crown' | 'flat' | 'reverse-crown' | 'top-hat';
}
```

### Prototype Options

#### Option A — MVP: Textured Plane
**Approach:** A single 60ft x 3.5ft plane with a baked diffuse texture showing all lane markings (boards, arrows, dots, foul line). Oil overlay is a second plane 1mm above with a semi-transparent shader.

```tsx
<mesh rotation={[-Math.PI / 2, 0, 0]}>
  <planeGeometry args={[1.05, 18.3]} />  // 3.5ft x 60ft scaled
  <meshStandardMaterial
    map={laneBaseTexture}
    normalMap={laneNormalTexture}
    roughness={0.3}
  />
</mesh>
// Second plane above for oil
<mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
  <planeGeometry args={[1.05, 18.3]} />
  <oilShaderMaterial pattern={oilPattern} />
</mesh>
```

**Pros:**
- Ships fastest (half a day)
- Photorealistic-ish if the texture is good
- Straightforward to implement
- Shader complexity isolated to the oil layer

**Cons:**
- Board highlights require shader tricks or a third plane layer
- Ball path overlay needs to be a Line component, not baked
- Fixed resolution (texture pixel grid)
- If we want different surfaces (wood vs synthetic), we need different textures

**Best for:** Getting content unblocked fast. This is the ship-first version.

#### Option B — Full Procedural (shader-driven everything)
**Approach:** A plane with a custom GLSL fragment shader that draws boards, arrows, dots, foul line, highlights, zones, and oil overlay all via UV math. No texture files.

```glsl
// Fragment shader sketch
uniform float highlightBoard;    // 0-39
uniform float oilLength;          // 0-1 normalized
uniform vec4 oilVolume[39];       // per-board oil amount
uniform vec3 zoneColors[3];
// ... etc

void main() {
  vec2 uv = vUv;
  int board = int(uv.x * 39.0);
  float distance = uv.y;

  // Base wood color
  vec3 color = woodGrainFunction(uv);

  // Draw boards
  if (mod(uv.x * 39.0, 1.0) < 0.02) color = vec3(0.3);

  // Draw arrows at 0.25 distance (15ft in 60ft lane)
  if (distance > 0.24 && distance < 0.26 && board % 5 == 0) {
    color = mix(color, vec3(1.0, 0.9, 0.5), 0.8);
  }

  // Highlight
  if (board == int(highlightBoard)) {
    color = mix(color, vec3(1.0, 0.8, 0.0), 0.7);
  }

  // Oil overlay
  if (distance < oilLength) {
    float oilDensity = oilVolume[board].r;
    color = mix(color, vec3(0.1, 0.3, 0.5), oilDensity * 0.4);
  }

  gl_FragColor = vec4(color, 1.0);
}
```

**Pros:**
- Zero asset files — pure math, loads instantly
- Infinite resolution (no texture pixel grid)
- Every visual element is a uniform you can animate
- Highly flexible: one shader covers all 12 PBA patterns, all highlights, all zones
- Highest quality transitions (smooth animation between states)

**Cons:**
- Shader complexity is high (~200 lines of GLSL)
- Wood grain procedural functions are hard to make look right
- Debugging shaders is painful
- Less photorealistic than a baked texture with real wood grain photography
- Requires GLSL expertise

**Best for:** Maximum flexibility and animation quality. Most "Shopify Editions" feeling.

#### Option C — Hybrid: Textured Base + Shader Overlay
**Approach:** A baked diffuse/normal texture for the wood grain (photoreal), plus a second shader-driven layer above for dynamic elements (highlights, oil, zones, ball paths).

This is the pmndrs-ecosystem favored pattern and what I'd recommend for Roll Model.

```tsx
function Lane({ oilPattern, highlightBoard, ... }: LaneProps) {
  return (
    <group>
      {/* Base wood layer — photoreal, static */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.05, 18.3]} />
        <meshStandardMaterial
          map={woodDiffuse}
          normalMap={woodNormal}
          roughnessMap={woodRoughness}
          metalness={0.1}
        />
      </mesh>

      {/* Dynamic overlay layer — shader-driven */}
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.05, 18.3]} />
        <laneOverlayMaterial
          highlightBoard={highlightBoard}
          oilData={oilPattern}
          showZones={showZones}
          transparent
          blending={AdditiveBlending}
        />
      </mesh>

      {/* Ball path as an actual 3D Line component */}
      {ballPath && <BallPathLine points={ballPath} />}

      {/* Breakpoint marker as a glowing sprite */}
      {breakpoint && <BreakpointMarker position={breakpoint} />}
    </group>
  );
}
```

**Pros:**
- Photoreal base from the baked texture
- Dynamic elements from shader = smooth animation
- Ball path and markers are separate meshes = easier to update
- Manageable shader complexity (overlay shader is simpler than full lane shader)
- Clear separation: static = textured, dynamic = shader
- Easy upgrade path: replace base texture with GLB model, keep overlay shader

**Cons:**
- More draw calls than Option A or B
- Transparency/blending needs care for correct layering
- Still need to produce the base texture

**Best for:** Production quality. Ship this.

#### Option D — GLB Lane Model from 3D Team
**Approach:** Professional 3D team delivers a detailed lane GLB with proper wood grain, wear patterns, oil gloss, gutters, approach area. Dynamic elements still use the shader overlay on top.

**Pros:**
- Highest visual quality — looks like a real bowling alley
- Proper wood types (maple vs pine) can be distinguished
- Wear patterns add realism
- Natural reflections and sheen from PBR materials

**Cons:**
- Cost (professional 3D work)
- File size (a good lane model with textures is 5-15 MB)
- Lead time (days to weeks for delivery)
- Still need the shader overlay for dynamic elements

**Best for:** Final production version. Order this in parallel with shipping Option C.

### Recommendation for Lane

**Ship Option A (textured plane) this week** to unblock content writing. The lane appears in 22 sections — having even a basic version unlocks batches 5, 6, 9, and 12.

**Upgrade to Option C (hybrid) before launch** for polish. This is ~2-3 days of work once the base texture is produced.

**Swap in Option D when the 3D team delivers**, which could be months from now. Because the interface is stable, the swap requires changing only the internal `<Lane>` component — no scenes touched.

### The Base Texture

For Option A and C, we need a lane base texture. Sources:
- **Procedurally generate in Blender** — wood grain shader baked to diffuse + normal maps at 2048x8192
- **Purchase from Poly Haven or Quixel Megascans** — CC0 wood floor textures, modified for bowling lane proportions
- **Commission from 3D team** — custom bowling lane texture with proper proportions and markings
- **Use AI generation** — tools like Stable Diffusion can generate wood grain plausibly, then manually add markings

The simplest path: generate a 2048x8192 wood plank texture in Blender (takes an hour) and paint markings on top in Photoshop/Figma.

---

## Asset 3: The Figure (Bowler)

This is the hardest asset to build well and the easiest to make look crude. The design goal is **"scientific diagram" not "bad character"** — the visual language of biomechanics textbooks, not video game characters.

### Interface

```tsx
interface BowlerProps {
  // Style and handedness
  style: 'one-handed' | 'two-handed';
  handedness: 'right' | 'left';

  // Pose / phase
  pose: 'stance' | 'pushaway' | 'step-1' | 'step-2' | 'step-3' | 'step-4'
      | 'backswing-peak' | 'forward-swing' | 'release' | 'follow-through';

  // Timeline position (for smooth interpolation)
  phase?: number;  // 0-1, interpolates between pose keyframes

  // Body mechanics overrides
  spineTilt?: number;      // 0-110 degrees forward
  kneeFlex?: number;       // 0-45 degrees
  shoulderRotation?: number;
  hipRotation?: number;

  // Visual helpers
  showBallPath?: boolean;  // Traces the ball through the swing
  showJoints?: boolean;    // Highlights joint positions
  showSpineAngle?: boolean; // Protractor overlay on spine
  showInjuryZones?: boolean; // Red zones on stressed body parts

  // Color
  color?: string;
  isGhost?: boolean;  // Semi-transparent for comparison mode
}
```

### Prototype Options

#### Option A — Segmented Primitive Capsules (the "scientific diagram" approach)

A minimal articulated figure built from Three.js primitives:
- Head: sphere (0.1 radius)
- Torso: capsule (0.25 x 0.5)
- Upper arms: cylinder (0.04 x 0.28)
- Forearms: cylinder (0.035 x 0.25)
- Hands: sphere (0.06 radius)
- Upper legs: cylinder (0.06 x 0.42)
- Lower legs: cylinder (0.05 x 0.42)
- Feet: rounded box (0.08 x 0.04 x 0.22)
- Joints: small spheres at connection points

Each body part is a child of a group that represents its parent joint. Rotating a group rotates everything downstream. Posing is done by setting rotation values on joint groups.

**Pros:**
- Ships in 1-2 days
- Intentionally diagrammatic aesthetic (looks like a scientific illustration, not an incompetent character)
- Zero external files
- Easy to pose programmatically
- Works at any scale
- Reads as "figure" from any angle
- Can be colored/ghosted for comparison mode

**Cons:**
- No muscle definition, clothing, or realism
- Joints look mechanical (visible seams)
- Looks "toy-like" if not handled with restraint
- Posing requires knowing anatomy angles

**Visual style notes:**
To keep it looking "scientific diagram" rather than "crude character":
- Use a single consistent color (neutral gray or muted blue) for the whole figure
- Slightly matte material (roughness 0.6-0.8) — not glossy
- No shading attempt at muscle — just clean primitive shapes
- Always show on a clean background (no busy textures behind the figure)
- When animating, favor slow deliberate motion over quick character-like movements

#### Option B — Low-Poly Blocky Figure
Like Minecraft but not quite that blocky. Rectangular limbs with visible edges.

**Pros:**
- Distinct visual style
- Could be charming

**Cons:**
- Too playful for educational brand
- Animation looks stiff
- Abandons the "scientific" visual language

**Verdict:** Skip this option. Doesn't fit Roll Model's tone.

#### Option C — 2D Silhouette on 3D Plane (hybrid)
An SVG stick figure or illustration painted on a plane in 3D space. The plane always faces the camera (billboard mode).

```tsx
<Billboard>
  <mesh>
    <planeGeometry args={[1, 2]} />
    <meshBasicMaterial map={figureSilhouette} transparent />
  </mesh>
</Billboard>
```

**Pros:**
- Can use professional illustrations or SVGs
- Very clean visual style
- Easy to produce (just need the illustrations)
- No 3D rigging required
- Infinitely scalable if SVG

**Cons:**
- Breaks 3D immersion (no depth)
- Can't orbit around it meaningfully
- Hard to show different angles of the same motion
- Would need multiple illustrations per pose

**Best for:** Chapters where the figure is referenced but not the focus (e.g., showing spine tilt as a comparison, not as the main interactive element).

#### Option D — Mixamo / Ready Player Me Rigged Humanoid
Use a free rigged humanoid model from Adobe Mixamo (free, 10k+ rigged characters) or Ready Player Me (avatar-style) and apply bowling-specific animations.

**Pros:**
- Professional rigging
- Smooth animation via skeletal deformation
- Realistic body proportions
- Can drive with mocap data or keyframe animation
- Mixamo has free bowling-adjacent animations

**Cons:**
- More realistic = more "uncanny valley" if done poorly
- Character faces distract from the concept being taught
- File size (several MB per model)
- Can't easily toggle "spine tilt" or "knee flex" — you'd need custom bone control
- Adds a character to the brand (what gender? what age? what body type?) — this creates subtle issues

**Best for:** A later polish phase if the primitive approach feels insufficient.

#### Option E — Procedural Primitive Figure with Inverse Kinematics
Option A + an IK solver. Drag the hand → the arm bends naturally. Drag the foot → the leg follows.

**Pros:**
- Magical feeling interaction
- Perfect for "pose the figure yourself" scenes
- Still diagrammatic aesthetic

**Cons:**
- IK solver is mathematically complex
- Three.js doesn't have a built-in IK solver for humanoid rigs
- Need to implement FABRIK or CCD IK manually, or use `three-ik` library
- Overkill for a site where most scenes don't need interactive posing

**Best for:** A future polish feature, not the initial build.

### Recommendation for Figure

**Ship Option A (primitive capsules)** as the only figure implementation. This works for all 17 figure-dependent sections. The key is visual restraint: single color, matte material, clean background, slow animations.

**Pose it with keyframes.** For each `pose` prop value, define a set of joint rotations. Interpolate between keyframes using React Spring or simple lerping. The `phase` prop (0-1) scrubs through a timeline of keyframes.

**Example keyframe system:**
```typescript
const POSES = {
  stance: {
    spineTilt: 15,
    rightShoulder: [0, 0, 0],
    rightElbow: [0, 0, -30],
    // ... etc
  },
  backswingPeak: {
    spineTilt: 40,
    rightShoulder: [180, 0, 0],
    rightElbow: [0, 0, 0],
    // ... etc
  },
  release: {
    spineTilt: 50,
    rightShoulder: [0, 0, -90],
    rightElbow: [0, 0, 0],
    // ... etc
  },
};

// In the component
const pose = useInterpolatedPose(currentPose, phase);
// Apply to joint groups via refs
```

**Upgrade path:** When the 3D team delivers a rigged humanoid, the `<Bowler>` component internal rendering swaps from primitive groups to a rigged GLB with keyframe animations triggered by the same `pose` prop. Scenes don't change.

---

## Asset 4: The Pins

### Interface

```tsx
interface PinsProps {
  // Pin state array (10 booleans or full state objects)
  pinState?: Array<PinState>;

  // Highlight specific pins
  highlight?: number[];  // array of pin numbers (1-10) to light up
  highlightColor?: string;
  dimOthers?: boolean;

  // Show pin numbers
  showNumbers?: boolean;

  // Chain reaction visualization
  showChainReaction?: boolean;
  chainColors?: { chain1: string; chain2: string; chain3: string; direct: string };

  // Physics simulation (optional)
  simulatePhysics?: boolean;
  ballImpact?: { position: [number, number]; velocity: [number, number, number] };
}

interface PinState {
  pinNumber: number;       // 1-10
  standing: boolean;
  position?: [number, number, number];  // For fallen/displaced pins
  rotation?: [number, number, number];
  highlight?: boolean;
}
```

### Prototype Options

#### Option A — Procedural Cylinder + Sphere Stack
A bowling pin is approximately: a bottom cylinder (the base), a narrower neck cylinder, a sphere (the head), connected with LatheGeometry for a smooth shape. Or just use `LatheGeometry` with the actual bowling pin silhouette as the profile curve.

```tsx
const pinProfile = [
  new THREE.Vector2(0, 0),          // base
  new THREE.Vector2(0.06, 0),
  new THREE.Vector2(0.06, 0.05),
  new THREE.Vector2(0.055, 0.15),
  new THREE.Vector2(0.04, 0.25),
  new THREE.Vector2(0.035, 0.28),   // narrow neck
  new THREE.Vector2(0.05, 0.31),    // widen to head
  new THREE.Vector2(0.055, 0.34),
  new THREE.Vector2(0.05, 0.37),
  new THREE.Vector2(0.035, 0.38),
  new THREE.Vector2(0, 0.38),       // top
];

<mesh>
  <latheGeometry args={[pinProfile, 32]} />
  <meshPhysicalMaterial
    color="white"
    roughness={0.4}
    clearcoat={0.8}
  />
</mesh>
```

**Pros:**
- Procedural, no files
- Accurate bowling pin silhouette
- Smooth rotation around Y axis
- Easy to customize (red stripe, numbers)
- PBR materials make it look real-ish

**Cons:**
- No fine detail (manufacturer logo, etc.)
- Slightly less realistic than a scanned model
- Lathe geometry means no asymmetry

#### Option B — Sourced GLB from Sketchfab
Free bowling pin GLB models exist on Sketchfab. Quality varies.

**Pros:**
- Potentially more realistic
- Possibly has proper red stripe

**Cons:**
- License checking required
- File size may be unnecessary
- May have texture dependencies

#### Option C — 3D Team Delivery
Professional model with proper materials, red stripe texture, logo decals, wear patterns.

**Pros:**
- Highest quality
- Correct proportions to USBC spec

**Cons:**
- Cost and lead time

### Recommendation for Pins

**Ship Option A (LatheGeometry procedural)** — it's the cleanest path. Pins appear in only 10 sections and are usually a supporting element, not the hero asset. A properly shaped lathe pin with clearcoat looks great.

**Skip Option B entirely** — sourced GLBs rarely match the procedural approach's simplicity.

**Accept Option C from 3D team** when it arrives for final polish.

---

## Asset 5: Oil Pattern Data (not strictly geometry)

Oil patterns are data, not geometry — but they need a clean structure so scenes can reference patterns by name or pass custom patterns.

### Data Structure

```typescript
// src/lib/oil-patterns.ts

export interface OilPattern {
  name: string;
  length: number;        // feet
  volumeMl: number;      // total oil
  ratio: string;         // e.g., "10:1", "3:1"

  // Oil density per board, distance bucket
  // 39 boards x N distance buckets (typically 10)
  density: number[][];   // [board][distanceBucket] = 0-1 oil density

  // Metadata
  category: 'house' | 'sport' | 'challenge' | 'pba-animal';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
}

// Named patterns
export const PATTERNS: Record<string, OilPattern> = {
  houseShot: { /* ... */ },
  wolf: { /* ... */ },
  cheetah: { /* ... */ },
  // ... all 10 PBA patterns
};
```

This data drives the Lane component's oil overlay shader. A pattern is just a number array. The shader samples the array based on UV coordinates to determine oil density at any point on the lane.

**Implementation approach:**
1. Create oil pattern data by reading from `lane-science-and-oil-patterns.md` §5 (has all 10 PBA patterns with real specs)
2. Store in `src/lib/oil-patterns.ts` as typed constants
3. Lane component accepts pattern name or custom data, passes to shader
4. Shader does the rendering

---

## How This Works as a System

### Directory Structure

```
src/
├── components/
│   └── 3d/
│       ├── assets/
│       │   ├── ball/
│       │   │   ├── index.tsx              # Ball component (interface)
│       │   │   ├── procedural-ball.tsx    # Current impl
│       │   │   └── glb-ball.tsx           # Future impl
│       │   ├── lane/
│       │   │   ├── index.tsx              # Lane component (interface)
│       │   │   ├── textured-lane.tsx      # Option A impl
│       │   │   ├── hybrid-lane.tsx        # Option C impl
│       │   │   └── lane-overlay-shader.ts
│       │   ├── figure/
│       │   │   ├── index.tsx              # Bowler component (interface)
│       │   │   ├── primitive-bowler.tsx   # Option A impl
│       │   │   ├── poses.ts               # Keyframe library
│       │   │   └── rigged-bowler.tsx      # Future impl
│       │   └── pins/
│       │       ├── index.tsx              # Pins component (interface)
│       │       └── lathe-pins.tsx         # Current impl
│       ├── scenes/
│       │   └── [scene files consume asset interfaces]
│       └── post-processing.tsx
└── lib/
    ├── oil-patterns.ts
    └── pose-library.ts
```

### The Index File Pattern

Each asset's `index.tsx` exports the interface and the active implementation:

```tsx
// src/components/3d/assets/lane/index.tsx
export type { LaneProps } from './types';
export { TexturedLane as Lane } from './textured-lane';
// Later:
// export { HybridLane as Lane } from './hybrid-lane';
```

Scenes import from the index only:
```tsx
import { Lane } from '@/components/3d/assets/lane';
```

Switching implementations = changing one line in one file. No scenes affected.

### Implementation Priority

The order to build these in, given the content batching plan:

1. **Pins (Option A)** — 1 day. Unblocks Ch 1 Pins section and all strike/spare scenes.
2. **Lane (Option A)** — 1-2 days. Unblocks 22 sections across chapters 1, 6, 7, 8, 9, 11.
3. **Oil pattern data** — half a day. Pure data, no 3D, but critical for Lane's oil overlay.
4. **Figure (Option A)** — 2-3 days. Unblocks chapters 3, 4, and parts of 5 and 12.
5. **Ball upgrades** — 1 day. Add coverstock presets, cutaway mode, marker display to existing ball.

Total: ~7 days of focused asset work unlocks ALL 53 content sections' 3D scenes.

### Then Content Can Run in Parallel

Once the assets are built against stable interfaces, content batching sessions can run without touching assets. And when the high-end 3D team delivers, a single swap session replaces each asset's internal rendering with the new deliverables.

---

## What a High-End 3D Team Should Deliver

When you're ready to engage a professional 3D team, here's the deliverable spec:

### Ball Package
- Base bowling ball GLB (~2-3 MB with embedded textures)
- 5 coverstock material variants (plastic, urethane, reactive solid, pearl, hybrid)
- UV unwrapped for programmatic texture swapping
- Normal map with realistic micro-surface detail
- Cutaway version with visible symmetric core
- Cutaway version with visible asymmetric core
- Blender source file for iteration

### Lane Package
- Full lane GLB with proper proportions (~5-10 MB)
- PBR materials with wood grain (maple heads + pine midlane)
- Synthetic surface variant
- Normal and roughness maps
- Approach area with dot markings
- Gutters as separate meshes
- Pin deck at 60ft mark
- Blender source file

### Figure Package
- Rigged humanoid GLB, male and female variants optional
- 15 bowling-specific animation clips:
  - Stance
  - 4-step approach
  - 5-step approach
  - Backswing
  - Release (one-handed)
  - Release (two-handed)
  - Follow-through (handshake, palm-up, helicopter)
  - Two-handed approach
- Joint bone hierarchy compatible with standard Three.js SkeletalAnimation
- Blender source with all animations

### Pin Package
- Single pin GLB (~500 KB)
- Proper USBC proportions
- Red stripe texture
- Standing, fallen, mid-fall animation states

### Environment Package
- HDR environment map of a bowling alley (2K or 4K)
- Multiple lighting variants (tournament, league, casual)

### Animation Package (optional, high-value)
- Motion-captured bowling deliveries in FBX or BVH format
- At least 5 clips showing different styles
- Retargetable to the rigged humanoid

### Total estimated cost: $15,000-$40,000 depending on team and quality tier

This is a significant investment but because of the interface architecture, the team can work in parallel with content writing and scene building. When their deliverables land, the swap is mechanical.

---

## Decision Summary

For the immediate future of Roll Model:

| Asset | Decision | Timeframe |
|-------|----------|-----------|
| Ball | Already built (Tier 1). Add Tier 2 upgrades (cutaway, coverstock variants) incrementally | Already shipped |
| Lane | Build Option A (textured plane) now, upgrade to Option C (hybrid) before launch, replace with Option D (GLB) when 3D team delivers | Week 1 |
| Pins | Build Option A (lathe procedural) | 1 day |
| Figure | Build Option A (primitive capsules) with keyframe pose library | Week 2 |
| Oil patterns | Create data structures, implement shader overlay as part of Lane | Included in Lane work |

The north star: **every asset has a stable interface. Implementations are swappable. Content and scenes never need to know what's happening inside an asset component.** This is how we ship prototypes today and upgrade to photoreal quality tomorrow without rewriting anything.
