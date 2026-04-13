# Session Handoff — Build Scene Components for a Chapter

> **Status**: CANONICAL
> **Created**: 2026-04-13
> **Purpose**: Self-contained briefing for building the scene components that power content pages — one session builds the scenes for one or two related chapters
> **Session scope**: 1 focused session per chapter (or two small chapters), ~4-6 hours
> **Unlocks**: Activates the 3D side of content sections that already exist as MDX

---

## Part 1: What You Are Doing

You are building **scene components** — React Three Fiber components that compose the existing reusable assets (Ball, Pins, Lane, Figure) into per-section 3D scenes. Each content section has an `activeScene` string (e.g. `"coverstock-types"`) in `content-map.ts`; when a reader navigates to that section, `SceneSwitcher` looks up the string and renders the matching scene component.

**Right now, most scene names in `content-map.ts` fall through to `DefaultScene`** because the scene components don't exist yet. This session creates them.

You are NOT writing content (that's doc 08's job). You are NOT building reusable assets (that's docs 10/11/12's job). You are composing the assets INTO scenes that bring specific content sections to life.

### Session Strategy

Unlike content batching (which groups 5 sections per session), scene building is best done **one chapter at a time** or **two small related chapters together**. Reasons:
- Scenes within a chapter share the same assets and camera setups
- Interaction blueprint reading is more efficient when you read the chapter contiguously
- Voice/design consistency improves when chapters ship together

### Pick a Chapter

Before starting, the user (or you) picks a target chapter. The order of recommended chapters (easiest to hardest):

1. **Chapter 2: The Ball** (6 scenes) — All use the existing ball component with parameter variations. Easiest possible starting point.
2. **Chapter 5: The Release** (6 scenes) — Mostly ball with axis visualizations. Easy.
3. **Chapter 1: The Basics** (4 scenes) — Needs Lane and Pins (should be built first). Medium.
4. **Chapter 6: Ball Motion Down the Lane** (5 scenes) — Needs Lane and ball path animation. Medium.
5. **Chapter 7: The Lane (Conditions)** (6 scenes) — Needs Lane + oil pattern data. Medium-hard.
6. **Chapter 8: The Strike** (6 scenes) — Needs Pins + Lane + camera work. Medium.
7. **Chapter 9: Spares** (4 scenes) — Needs Pins + Lane. Medium.
8. **Chapter 10: Equipment Strategy** (4 scenes) — Mostly ball comparisons. Easy.
9. **Chapter 11: Reading the Lane** (3 scenes) — Needs Lane + oil data. Medium.
10. **Chapter 3: The Approach** (5 scenes) — Needs Figure (must be built first). Medium-hard.
11. **Chapter 4: The Swing** (5 scenes) — Needs Figure. Medium-hard.
12. **Chapter 12: Two-Handed Bowling** (4 scenes) — Needs Figure + Ball. Medium.

Start the session by confirming which chapter you're building. If unsure, default to Chapter 2 (The Ball) — it has no asset dependencies beyond the existing ball.

---

## Part 2: Required Reading

Before building any scene, you MUST have read these:

1. **`docs/specs/07-INTERACTION-BLUEPRINTS.md`** — **THE critical reference.** Find the entries for every section in your target chapter. Each entry specifies:
   - What the user sees on load (camera angle, objects, lighting mood)
   - Leva Controls (exact slider/toggle/dropdown definitions with ranges)
   - SceneCues (the params objects that content pushes to the scene)
   - Key Animation (what moves and how)
   - The "Aha" Moment (the interaction that creates understanding)

   Read EVERY section in your target chapter in full. Copy the Leva control specs and SceneCue params into a scratchpad.

2. **`src/components/3d/scenes/rev-rate-scene.tsx`** — The reference scene. Study how it:
   - Uses `useControls` from Leva with the 3-argument form (name, params object, dependency)
   - Wires the `useEffect` to sync `sceneParams` from SceneContext into Leva when SceneCues fire
   - Composes `SceneLighting`, `BowlingBall`, `ContactShadows`, and `OrbitControls`

3. **`src/components/3d/scenes/prototype-scene.tsx`** — A second reference, showing a scene with multiple assets (ball + pin deck).

4. **`src/components/3d/assets/`** — Read the public interfaces of the assets you'll use:
   - `ball/` (via `src/components/3d/bowling-ball.tsx` — not yet in assets directory)
   - `pins/index.tsx` — `<Pins />` component props
   - `lane/index.tsx` — `<Lane />` component props (if Lane asset is built)
   - `figure/index.tsx` — `<Bowler />` component props (if Figure asset is built)

5. **`src/lib/scene-context.tsx`** — Understand how `useScene()` returns `sceneParams` and how scenes read it.

6. **`src/lib/content-map.ts`** — See the existing scene names and add new ones as you create scenes.

7. **`src/components/layout/scene-switcher.tsx`** — Add new case statements here as you create scenes.

8. **The existing content MDX files** for your target chapter — if content exists for any section you're building a scene for, read the MDX to understand what the scene needs to respond to.

---

## Part 3: The Scene Component Pattern

Every scene follows this structure:

```tsx
"use client";

import { useEffect } from "react";
import { useControls } from "leva";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { BowlingBall } from "../bowling-ball";
import { SceneLighting } from "../scene-lighting";
import { useScene } from "@/lib/scene-context";
// Import any assets this scene uses:
// import { Lane } from "@/components/3d/assets/lane";
// import { Pins } from "@/components/3d/assets/pins";
// import { Bowler } from "@/components/3d/assets/figure";

export function ExampleScene() {
  const { sceneParams } = useScene();

  // Leva controls — name matches the chapter section,
  // fields match the blueprint's Leva Controls table
  const [{ param1, param2, param3 }, set] = useControls(
    "Example Scene",
    () => ({
      param1: { value: 400, min: 150, max: 650, step: 10, label: "Example Param" },
      param2: { value: false, label: "Toggle" },
      param3: { value: "#2563eb", label: "Color" },
    })
  );

  // Sync SceneCue context params into Leva
  useEffect(() => {
    const updates: Record<string, number | boolean | string> = {};
    if (sceneParams.param1 !== undefined) updates.param1 = sceneParams.param1;
    if (sceneParams.param2 !== undefined) updates.param2 = sceneParams.param2;
    if (sceneParams.param3 !== undefined) updates.param3 = sceneParams.param3;
    if (Object.keys(updates).length > 0) set(updates);
  }, [sceneParams, set]);

  return (
    <>
      <SceneLighting accentColor={param3} />

      {/* Scene-specific content composed from assets */}
      <BowlingBall rpm={param1} color={param3} />

      {/* Shadows */}
      <ContactShadows
        position={[0, -0.108, 0]}
        opacity={0.5}
        scale={0.8}
        blur={2.5}
        far={0.5}
        resolution={256}
        frames={1}
        color="#000000"
      />

      {/* Camera — tune per scene based on blueprint's "What the user sees on load" */}
      <OrbitControls
        enablePan={false}
        minDistance={0.2}
        maxDistance={1.0}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}
```

### The Key Copy-Paste Loop

For each section in your target chapter:

1. Open the blueprint entry for that section
2. Copy the Leva Controls table values into the `useControls` hook
3. Copy the SceneCue params into the `useEffect` block (each unique param becomes a line in the updates object)
4. Follow the "What the user sees on load" description to set the camera, lighting, and initial object positions
5. Follow the "Key Animation" description to add any `useFrame` logic for dynamic behavior
6. The "Aha Moment" guides you on what interaction should be most responsive — make sure those controls feel good

---

## Part 4: Example Walkthrough — Chapter 2 "Coverstock Types"

Let's build one scene start-to-finish as a reference.

**Blueprint entry** (from spec 07 §2.1 Coverstock Types):

- **What the user sees on load**: A single bowling ball rotating on a pedestal like a jewelry display. Glossy plastic appearance. Studio lighting. Ball fills 60% of viewport. Camera at 3/4 angle.
- **Leva Controls**:
  - `coverstock` (dropdown: Plastic/Urethane/Reactive Solid/Reactive Pearl/Reactive Hybrid, default Plastic)
  - `showMotionPreview` (toggle, default off)
  - `rotateSpeed` (slider 0-2, default 0.5)
- **SceneCues**:
  1. "See it: Glossy plastic spare ball" → `{ coverstock: "Plastic", showMotionPreview: true }`
  2. "See it: Matte solid reactive" → `{ coverstock: "Reactive Solid", showMotionPreview: true }`
  3. "See it: Pearlescent reactive" → `{ coverstock: "Reactive Pearl", showMotionPreview: true }`
- **Key Animation**: Ball rotates slowly. Surface material changes with coverstock dropdown.
- **Aha Moment**: Rapidly switching coverstocks while motion preview is on.

**File:** `src/components/3d/scenes/coverstock-types-scene.tsx`

```tsx
"use client";

import { useEffect } from "react";
import { useControls } from "leva";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { BowlingBall } from "../bowling-ball";
import { SceneLighting } from "../scene-lighting";
import { useScene } from "@/lib/scene-context";

// Map coverstock name to material properties
// (temporary approximation — future: proper material variants on the ball itself)
const COVERSTOCK_PRESETS: Record<
  string,
  { roughness: number; metalness: number; clearcoat: number; color: string }
> = {
  Plastic: { roughness: 0.05, metalness: 0.0, clearcoat: 1.0, color: "#dc2626" },
  Urethane: { roughness: 0.25, metalness: 0.05, clearcoat: 0.6, color: "#a16207" },
  "Reactive Solid": { roughness: 0.45, metalness: 0.0, clearcoat: 0.3, color: "#1e3a8a" },
  "Reactive Pearl": { roughness: 0.15, metalness: 0.3, clearcoat: 0.8, color: "#6366f1" },
  "Reactive Hybrid": { roughness: 0.3, metalness: 0.1, clearcoat: 0.6, color: "#7c2d12" },
};

export function CoverstockTypesScene() {
  const { sceneParams } = useScene();

  const [{ coverstock, showMotionPreview, rotateSpeed }, set] = useControls(
    "Coverstock",
    () => ({
      coverstock: {
        value: "Plastic",
        options: Object.keys(COVERSTOCK_PRESETS),
        label: "Coverstock",
      },
      showMotionPreview: { value: false, label: "Show Motion Preview" },
      rotateSpeed: { value: 0.5, min: 0, max: 2, step: 0.1, label: "Rotate Speed" },
    })
  );

  useEffect(() => {
    const updates: Record<string, number | boolean | string> = {};
    if (sceneParams.coverstock !== undefined) updates.coverstock = sceneParams.coverstock;
    if (sceneParams.showMotionPreview !== undefined)
      updates.showMotionPreview = sceneParams.showMotionPreview;
    if (sceneParams.rotateSpeed !== undefined) updates.rotateSpeed = sceneParams.rotateSpeed;
    if (Object.keys(updates).length > 0) set(updates);
  }, [sceneParams, set]);

  const preset = COVERSTOCK_PRESETS[coverstock as string] ?? COVERSTOCK_PRESETS.Plastic;

  return (
    <>
      <SceneLighting accentColor={preset.color} />

      <BowlingBall
        rpm={60 * rotateSpeed}  // slow display rotation, not real RPM
        color={preset.color}
        // TODO: ball component needs a way to accept override material props
        // For this session, just change the color as a proxy
      />

      <ContactShadows
        position={[0, -0.108, 0]}
        opacity={0.5}
        scale={0.8}
        blur={2.5}
        far={0.5}
        resolution={256}
        frames={1}
        color="#000000"
      />

      <OrbitControls
        enablePan={false}
        minDistance={0.2}
        maxDistance={1.0}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}
```

**Note on the material preset mapping:** Until the Ball component supports a `coverstockPreset` prop natively (a future enhancement — see spec 09), scenes can approximate coverstock types by varying the color and using the existing clearcoat/roughness defaults. It's not perfect but it's shippable.

**Register the scene:**

In `src/components/layout/scene-switcher.tsx`:
```tsx
import { CoverstockTypesScene } from "@/components/3d/scenes/coverstock-types-scene";
// ...
case "coverstock-types":
  return <CoverstockTypesScene />;
```

In `src/lib/content-map.ts`, the entry should already exist (created by a content batching session) with `scene: "coverstock-types"`.

---

## Part 5: The Workflow

For each scene in the chapter:

### Step 1: Read the blueprint
Open spec 07 to the section. Copy the Leva controls and SceneCue params to a scratchpad.

### Step 2: Create the scene file
`src/components/3d/scenes/{section-slug}-scene.tsx` — kebab-case slug matching the content-map `scene` value.

### Step 3: Scaffold the component
Start from the template in Part 3. Copy the scene pattern, rename, adjust imports.

### Step 4: Wire Leva controls
Match the blueprint's Leva table exactly. Use the same ranges, labels, and defaults.

### Step 5: Wire SceneCue sync
Add the `useEffect` block reading `sceneParams` and updating Leva via `set()`. Every unique param key across all SceneCues in this section must have a branch in the updates object.

### Step 6: Compose the scene
Add the assets and light rig. Use camera angle from the blueprint's "What the user sees on load". Add ContactShadows and OrbitControls.

### Step 7: Implement the key animation
If the blueprint specifies animated behavior beyond what an asset already does (e.g., ball path animation on the lane), add `useFrame` logic here.

### Step 8: Register the scene
- Add an `import` and `case` statement to `scene-switcher.tsx`
- Verify the content-map entry has the matching scene name (create/edit if needed)

### Step 9: Visually verify
Navigate to the route in the browser (`/learn/{chapter-slug}/{section-slug}`). Check:
- Scene renders without errors
- Leva controls appear and work
- Initial state matches the blueprint's "What the user sees on load"
- If the section has MDX content, its SceneCues work (click them and watch Leva update)

### Step 10: Move to the next section
Repeat. Aim for 4-6 scenes per session. If scenes start feeling similar (Chapter 2 ball scenes are basically all the same template), you'll move fast. If scenes need new camera angles or animation (Chapter 6 lane scenes), you'll move slower.

---

## Part 6: Chapter-Specific Notes

### Chapter 2: The Ball (easiest)

All 6 sections use the same existing ball component with different parameter combinations. Template-heavy. Build these first.

- **coverstock-types** — dropdown of materials (color/gloss proxies)
- **core-design** — needs cutaway ball (future work — scene can use color tinting as proxy for now)
- **rg-and-differential** — ball with flare ring visualization (stub this if flare rings don't exist yet)
- **ball-motion** — needs Lane asset AND ball path animation (defer if Lane isn't built)
- **surface-preparation** — grit slider controlling roughness
- **weight-and-drilling** — ball with visible markers (stub markers if Ball doesn't support them yet)

### Chapter 5: The Release

- **wrist-position** — close-up ball, wrist position is implicit via axis tilt
- **rev-rate** — ALREADY BUILT as rev-rate-scene.tsx
- **axis-tilt** — ball with visible axis line, tilt slider
- **axis-rotation** — ball with direction arrow (may need a new 3D helper for the arrow)
- **one-vs-two-handed** — two ball instances side-by-side, requires Figure OR just two spinning balls with different RPMs
- **follow-through** — static hand poses (requires Figure asset OR can be stubbed)

### Chapter 6: Ball Motion

Requires the Lane asset. Each scene animates a ball down the lane. Implement a shared `BallPath` helper component that takes path points and animates a ball along them. Consider building `BallPath` as part of this session if it doesn't exist.

### Chapter 7: The Lane (Conditions)

Requires Lane asset AND oil pattern data (sessions 10 and 12). The oil overlay rendering itself needs to be built in this session — the Lane asset has a stub for it.

### Chapter 8: The Strike

Requires Pins asset (exists). Each scene is an overhead view of the pin deck with the ball approaching. The "Pin Action" section needs slow-motion chain reaction animation — this is the most complex single scene in the chapter.

### Chapters 3 & 4: Approach & Swing

Require the Figure asset. Each scene is a side or 3/4 view of the bowler figure in a specific pose or mid-animation. Pose keyframes come from the Figure asset's pose library (session 11).

### Chapter 12: Two-Handed Bowling

Requires the Figure asset with two-handed pose variants. Scenes compare one-handed vs two-handed side-by-side.

---

## Part 7: Scope Discipline

DO build:
- Scene components for the target chapter
- Register scenes in scene-switcher and content-map
- Any scene-specific helper components (e.g., a `BallPath` animator, an axis arrow, a highlight indicator)
- Verify routes load and scenes render

DO NOT build:
- Reusable assets (Ball, Pins, Lane, Figure) — those are separate sessions
- Content MDX files — that's doc 08's job
- Cross-chapter refactors — stay in your chapter
- New npm packages
- Changes to post-processing, global lighting, or the Canvas setup

---

## Part 8: Common Pitfalls

### Pitfall 1: Leva useControls dependency array

`useControls` with the 3-argument form (name, callback, deps) supports dynamic control changes. Use it:

```tsx
const [values, set] = useControls("Name", () => ({ /* ... */ }));
```

The second argument is a function that returns the controls object. This lets you reference state from the enclosing scope if needed.

### Pitfall 2: SceneCue params sync missing a key

If a SceneCue pushes a param that your scene's `useEffect` doesn't check for, the scene won't respond. Always check EVERY unique param key across ALL SceneCues in the section.

### Pitfall 3: Scene rendering before assets are ready

If you're building a scene that needs the Lane asset but Lane isn't built yet, the scene will fail to compile. Options:
1. Defer this scene to a future session (after Lane is built)
2. Temporarily stub the asset with a simple plane or box
3. Work on scenes that don't depend on unbuilt assets first

The recommended approach: check what assets exist before picking scenes. Don't build scenes whose dependencies aren't ready.

### Pitfall 4: Camera angles

Each blueprint specifies a camera view (overhead, side, 3/4, first-person). You have a few options:
- Set `OrbitControls` defaults with `target`, `minDistance`, `maxDistance`, `minPolarAngle`, `maxPolarAngle`
- Override the Canvas camera position at the scene level (NOT recommended — affects other scenes)
- Use CameraControls from drei for programmatic positioning

For most scenes, OrbitControls with appropriate polar angle limits is enough. The user can rotate to any angle within the limits.

### Pitfall 5: Forgetting to kebab-case the scene name

The scene name in `content-map.ts` must be kebab-case and must match the case in `scene-switcher.tsx` exactly. `"CoverstockTypes"` in content-map and `"coverstock-types"` in scene-switcher = routing failure.

---

## Part 9: Verification Checklist

For each scene built:
- [ ] File exists at `src/components/3d/scenes/{slug}-scene.tsx`
- [ ] Uses `useScene()` to read context params
- [ ] Uses `useControls` with a `useEffect` sync block
- [ ] All Leva control fields match the blueprint
- [ ] All SceneCue params have branches in the updates object
- [ ] Composes `SceneLighting`, appropriate assets, `ContactShadows`, `OrbitControls`
- [ ] Registered in `scene-switcher.tsx` (import + case)
- [ ] Content-map entry exists with matching scene name
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` succeeds
- [ ] Route loads in browser (200)
- [ ] Leva controls appear and work
- [ ] SceneCue buttons (if content exists) update the Leva controls

For the session as a whole:
- [ ] All scenes in the target chapter built (or explicit list of deferred sections with reason)
- [ ] One commit at the end: `feat: {chapter} scene components (N sections)`
- [ ] NOT pushed — user reviews first

---

## Part 10: First Prompt for the Fresh Session

```
Read docs/specs/13-SESSION-SCENE-BUILDING.md fully. That's your complete briefing.

For this session, build the scene components for Chapter [N]: [Chapter Name].
After reading doc 13, read the following:
- docs/specs/07-INTERACTION-BLUEPRINTS.md — find the Chapter [N] section,
  read ALL subsections in full
- src/components/3d/scenes/rev-rate-scene.tsx — the reference scene pattern
- src/components/3d/assets/[relevant-asset]/index.tsx — for asset prop surfaces

Build each scene following the template in doc 13 Part 3. Register each in
scene-switcher.tsx and content-map.ts. Verify each route loads in the browser.

Commit with message "feat: chapter [N] scene components (N sections)".
Do NOT push — I'll review first.

Do not build reusable assets, do not write content, do not install packages.
```

Replace `[N]` and `[Chapter Name]` with the actual target. For the very first scene-building session, use:

```
For this session, build the scene components for Chapter 2: The Ball.
```

(Chapter 2 is the easiest starting point since all scenes are ball parameter variations.)
