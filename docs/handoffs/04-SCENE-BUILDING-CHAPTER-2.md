# Handoff 04 — Scene Building: Chapter 2 (The Ball)

> **Status**: READY (depends on Handoff 01 having shipped)
> **Type**: Scene component build session
> **Estimated duration**: 4-6 focused hours
> **Output**: 6 new scene component files + scene-switcher updates + 1 commit
> **Created**: 2026-04-13

---

## Quick Header

| Field | Value |
|-------|-------|
| **Session ID** | Handoff 04 |
| **Session type** | Scene building (per chapter) |
| **Target chapter** | Chapter 2: The Ball (6 sections) |
| **Files created** | 6 scene component files |
| **Files modified** | `src/components/layout/scene-switcher.tsx` |
| **Asset dependencies** | Existing ball component only — no Lane/Figure/Oil data needed |
| **Content dependency** | Handoff 01 must have shipped (so the content sections exist for these scenes to back) |
| **Unlocks** | Visual experience for Ch 2 — readers see the ball react to coverstock toggles, RG sliders, etc. |
| **PRD requirements served** | FR-2 (interactive 3D scenes per section) |
| **PRD milestone advanced** | M2 (Content Wave 1) |
| **Stop condition** | After commit, before push |
| **Parallel-safe with** | Handoffs 02 (Lane), 03 (Oil Data) — different files; would conflict with Handoff 01 (touches the same scene-switcher) |

---

## Part 1: Why This Session Matters

Content Batch 1 (Handoff 01) writes 5 MDX files for Chapter 2 + Chapter 5. Those files reference scene names like `coverstock-types`, `rg-differential`, `surface-prep` — but **the matching scene components don't exist yet**. Until they do, all those content pages fall through to `DefaultScene` (the basic spinning ball). The reader sees content but no scene-specific 3D reaction to the SceneCues.

This session builds the actual scene components for Chapter 2's 6 sections. After this session, when a reader clicks "See it: Matte solid reactive" on the coverstock-types page, the ball actually changes appearance.

Chapter 2 is the EASIEST chapter to build scenes for because:
- All scenes use the existing `BowlingBall` component (no new asset dependencies)
- The interactions are mostly "vary a parameter" (color, RPM, axis, surface preset)
- No physics, no animation beyond what the ball already does, no figure work
- The interaction blueprints (spec 07 §2.x) are well-defined

This is the right first scene-building session because it ships visible visual progress without the risk of new asset complexity.

### What success looks like at the end of this session

A reader navigates to `/learn/the-ball/coverstock-types`. The 3D panel shows the ball with a glossy plastic appearance. They click "See it: Matte solid reactive" in the content. The ball's surface visibly changes — color shifts, gloss reduces. They drag the Leva "Coverstock" dropdown — the ball cycles through 5 material variants. Same for `rg-differential`, `surface-preparation`, `axis-tilt`, `axis-rotation` — each section has its own custom Leva controls and SceneCue responses.

The 5 sections written in Handoff 01 are now VISUALLY ALIVE, not just text on a page.

### Note: Section 2.4 "Ball Motion: Skid-Hook-Roll"

This is the 6th Chapter 2 section but it requires the **Lane asset** to render meaningfully (the ball traveling down a colored-zone lane). If Handoff 02 (Lane Asset) has shipped, you can build this scene. If not, **defer this scene** and ship the other 5 — note in the commit that ball-motion is deferred pending Lane asset.

Same logic for "Core Design" (2.2) — requires a cutaway visualization. For this session, build it as a stub that just shows the ball with the existing setup. A future session adds the cutaway feature when the Ball component supports it.

---

## Part 2: Pre-Flight Reading Checklist

### Required reading (~30 minutes)

- [ ] **`docs/specs/13-SESSION-SCENE-BUILDING.md`** (~15 min)
  - The generic scene-building playbook
  - Read the worked example for Chapter 2 "Coverstock Types" in Part 4
  - Review the scene component pattern in Part 3

- [ ] **`docs/specs/07-INTERACTION-BLUEPRINTS.md`** (~10 min)
  - Find sections 2.1 through 2.6
  - Read each blueprint entry IN FULL: load state, Leva controls, SceneCues, key animation, aha moment
  - Copy each section's Leva controls table and SceneCue params to a scratchpad

- [ ] **`src/components/3d/scenes/rev-rate-scene.tsx`** (~5 min)
  - Your reference scene template
  - Note the pattern: useScene + useControls + useEffect to sync sceneParams to Leva

### Verify dependency state

- [ ] **Verify Handoff 01 has shipped.** Check `git log --oneline -10` for "content: chapter 2 ball + chapter 5 release" or similar. If not, this session can still proceed, but the scenes will have no content sections to back them yet.
- [ ] Check `src/lib/content-map.ts` for the entries `the-ball/coverstock-types`, `the-ball/rg-and-differential`, `the-ball/surface-preparation`, `the-release/axis-tilt`, `the-release/axis-rotation`, and `the-ball/core-design`, `the-ball/weight-and-drilling`, `the-ball/ball-motion`.
- [ ] If any are missing, NOTE which ones — those scenes will exist but have no content backing them in this session.

---

## Part 3: The Scene Component Pattern (Refresher)

Every scene follows this structure (copy this template for each new scene):

```tsx
"use client";

import { useEffect } from "react";
import { useControls } from "leva";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { BowlingBall } from "../bowling-ball";
import { SceneLighting } from "../scene-lighting";
import { useScene } from "@/lib/scene-context";
import { BALL_RADIUS_METERS } from "@/lib/constants";

export function ExampleScene() {
  const { sceneParams } = useScene();

  // Leva controls — fields match the blueprint table EXACTLY
  const [{ param1, param2 }, set] = useControls(
    "Scene Display Name",
    () => ({
      param1: { value: ..., label: "..." },
      param2: { value: ..., label: "..." },
    })
  );

  // Sync SceneCue context params into Leva
  useEffect(() => {
    const updates: Record<string, number | boolean | string> = {};
    if (sceneParams.param1 !== undefined) updates.param1 = sceneParams.param1;
    if (sceneParams.param2 !== undefined) updates.param2 = sceneParams.param2;
    if (Object.keys(updates).length > 0) set(updates);
  }, [sceneParams, set]);

  return (
    <>
      <SceneLighting accentColor={someColor} />
      <BowlingBall {...derivedProps} />
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

---

## Part 4: Atomic Task Checklist — Per Section

Apply this template to each of the 5 (or 6) scenes. I list 5 here; the 6th (ball-motion) is deferred unless Lane has shipped.

### Phase A — Per-Section Setup (~5 min per section)

- [ ] **A1.** Open `docs/specs/07-INTERACTION-BLUEPRINTS.md` to the section's blueprint entry
- [ ] **A2.** Copy the Leva controls list to scratchpad (each control's name, type, range, default, label)
- [ ] **A3.** Copy each SceneCue's `params={{ ... }}` object to scratchpad
- [ ] **A4.** Note the camera angle from "What the user sees on load"
- [ ] **A5.** Note the "Aha Moment" — this should be the most responsive interaction

### Phase B — Create the Scene File (~20-25 min per section)

- [ ] **B1.** Create the file at `src/components/3d/scenes/{slug}-scene.tsx` (kebab-case slug matching the content-map `scene` value)
- [ ] **B2.** Copy the scene component template from Part 3 into the file
- [ ] **B3.** Rename the function from `ExampleScene` to e.g. `CoverstockTypesScene`
- [ ] **B4.** Update the imports as needed
- [ ] **B5.** Replace the Leva controls block with the section's specific controls (matching the blueprint EXACTLY)
- [ ] **B6.** Update the useEffect block to sync each control's parameter from sceneParams
- [ ] **B7.** Compose the JSX: SceneLighting + BowlingBall (with derived props) + ContactShadows + OrbitControls
- [ ] **B8.** For sections that need a parameter "preset map" (like coverstock variants → material properties), define the map as a constant outside the component

### Phase C — Register the Scene (~3 min per section)

- [ ] **C1.** Open `src/components/layout/scene-switcher.tsx`
- [ ] **C2.** Add the import: `import { CoverstockTypesScene } from "@/components/3d/scenes/coverstock-types-scene";`
- [ ] **C3.** Add the case statement to the switch:
  ```tsx
  case "coverstock-types":
    return <CoverstockTypesScene />;
  ```
- [ ] **C4.** Save the file

### Phase D — Verify the Scene (~5 min per section)

- [ ] **D1.** Run `npx tsc --noEmit` — must be clean
- [ ] **D2.** Run `npm run build` — must succeed
- [ ] **D3.** If the matching content section exists, navigate to `http://localhost:6200/learn/{path}` in browser
- [ ] **D4.** Verify the scene renders (the 3D panel changes from default to your new scene)
- [ ] **D5.** Click each SceneCue button in the content → verify the Leva controls update
- [ ] **D6.** Drag/toggle the Leva controls directly → verify the ball responds
- [ ] **D7.** Check browser console for errors

---

## Part 5: The 6 Chapter 2 Scenes

### Scene 1: Coverstock Types

- **File**: `src/components/3d/scenes/coverstock-types-scene.tsx`
- **Scene name**: `"coverstock-types"` (must match content-map entry)
- **Component name**: `CoverstockTypesScene`
- **Blueprint reference**: `docs/specs/07-INTERACTION-BLUEPRINTS.md` §2.1

**Leva controls** (from blueprint):
```typescript
useControls("Coverstock", () => ({
  coverstock: {
    value: "Plastic",
    options: ["Plastic", "Urethane", "Reactive Solid", "Reactive Pearl", "Reactive Hybrid"],
    label: "Coverstock",
  },
  showMotionPreview: { value: false, label: "Show Motion Preview" },
  rotateSpeed: { value: 0.5, min: 0, max: 2, step: 0.1, label: "Rotate Speed" },
}))
```

**Coverstock preset map** (define as constant outside the component):
```typescript
const COVERSTOCK_PRESETS: Record<string, { color: string; rpm: number }> = {
  Plastic: { color: "#dc2626", rpm: 30 },
  Urethane: { color: "#a16207", rpm: 30 },
  "Reactive Solid": { color: "#1e3a8a", rpm: 30 },
  "Reactive Pearl": { color: "#6366f1", rpm: 30 },
  "Reactive Hybrid": { color: "#7c2d12", rpm: 30 },
};
```

(Coverstock material variants on the ball itself are a future enhancement. For this session, vary the color as a proxy.)

**SceneCue param sync**: handle `coverstock`, `showMotionPreview`, `rotateSpeed`

**Camera**: default OrbitControls; the existing canvas position works for a single ball

**Pass to BowlingBall**: `rpm={60 * rotateSpeed}` (slow display rotation), `color={preset.color}`

### Scene 2: RG & Differential

- **File**: `src/components/3d/scenes/rg-differential-scene.tsx`
- **Scene name**: `"rg-differential"`
- **Component name**: `RgDifferentialScene`
- **Blueprint reference**: §2.3

**Leva controls** (from blueprint):
```typescript
useControls("RG & Differential", () => ({
  rgValue: { value: 2.540, min: 2.460, max: 2.800, step: 0.005, label: "RG Value" },
  differential: { value: 0.035, min: 0.010, max: 0.060, step: 0.001, label: "Differential" },
  showFlareRings: { value: true, label: "Show Flare Rings" },
  showMassHeatmap: { value: true, label: "Show Mass Heatmap" },
}))
```

**Note**: The Ball component doesn't currently support flare rings or mass heatmap visualization. For this session, accept the props in the scene's Leva controls but have them affect ball color or rotation speed as approximations:
- Lower RG → faster spin (revs up faster)
- Higher RG → slower spin (revs up slower)
- High differential → red color tint
- Low differential → blue tint

This is a "stub but functional" approach. Future Ball component enhancements can add the actual flare ring rendering.

**Pass to BowlingBall**:
```typescript
const rgFactor = (rgValue - 2.460) / (2.800 - 2.460);  // 0-1 normalized
rpm={400 - rgFactor * 200}  // higher RG = slower rev-up
color={...}
```

### Scene 3: Surface Preparation

- **File**: `src/components/3d/scenes/surface-prep-scene.tsx`
- **Scene name**: `"surface-prep"`
- **Component name**: `SurfacePrepScene`
- **Blueprint reference**: §2.5

**Leva controls** (from blueprint):
```typescript
useControls("Surface", () => ({
  grit: {
    value: 2000,
    options: [500, 1000, 2000, 3000, 4000, "Polish"],
    label: "Grit Level",
  },
  showTrajectory: { value: true, label: "Show Trajectory" },
}))
```

**Note**: Vary the ball's color to indicate grit level (rougher = darker matte; polished = brighter glossy). Trajectory preview is a future enhancement.

### Scene 4: Axis Tilt

- **File**: `src/components/3d/scenes/axis-tilt-scene.tsx`
- **Scene name**: `"axis-tilt"`
- **Component name**: `AxisTiltScene`
- **Blueprint reference**: §5.3

**Leva controls** (from blueprint):
```typescript
useControls("Axis Tilt", () => ({
  axisTilt: { value: 15, min: 0, max: 90, step: 1, label: "Axis Tilt (°)" },
  rpm: { value: 400, min: 200, max: 600, step: 10, label: "RPM" },
  showReferencePlane: { value: true, label: "Show Reference Plane" },
}))
```

**Pass to BowlingBall**: `axisTilt={axisTilt}`, `rpm={rpm}`, `showAxis={true}`

The Ball component already supports `axisTilt` natively. This scene is straightforward.

### Scene 5: Axis Rotation

- **File**: `src/components/3d/scenes/axis-rotation-scene.tsx`
- **Scene name**: `"axis-rotation"`
- **Component name**: `AxisRotationScene`
- **Blueprint reference**: §5.4

**Leva controls** (from blueprint):
```typescript
useControls("Axis Rotation", () => ({
  axisRotation: { value: 45, min: 0, max: 90, step: 1, label: "Axis Rotation (°)" },
  showTravelDirection: { value: true, label: "Show Travel Direction" },
  showSpinDirection: { value: true, label: "Show Spin Direction" },
}))
```

**Note**: The Ball component doesn't currently have an "axis rotation" prop separate from tilt. For this session, use the existing `axisTilt` prop with `axisRotation` value as a proxy. A future Ball enhancement can add a proper axis rotation prop.

### Scene 6: Ball Motion (DEFERRED unless Lane shipped)

- **File**: `src/components/3d/scenes/ball-motion-scene.tsx`
- **Scene name**: `"ball-motion"`
- **Blueprint reference**: §2.4

**Skip if Lane asset (Handoff 02) has not shipped.** This scene needs a lane to render the ball traveling down. Defer to a future session and note in the commit message.

If Lane HAS shipped, build a basic version: import `<Lane>`, position the ball at the foul line, allow Leva to control RPM and color, show the 3 zones via `<Lane showZones />`. Do NOT attempt to animate the ball traveling down the lane in this session — that's a separate ball-path feature.

---

## Part 6: Final Verification & Cross-Section Check

After all scenes are built and registered:

- [ ] **CS1.** Run `npx tsc --noEmit` — clean
- [ ] **CS2.** Run `npm run build` — successful
- [ ] **CS3.** All 5 (or 6) routes return 200:
  ```bash
  for path in the-ball/coverstock-types the-ball/rg-and-differential the-ball/surface-preparation the-release/axis-tilt the-release/axis-rotation; do
    curl -s -o /dev/null -w "$path: %{http_code}\n" http://localhost:6200/learn/$path
  done
  ```
- [ ] **CS4.** Open each route in browser → verify the scene-specific 3D appearance (different colors/behaviors per section)
- [ ] **CS5.** Click SceneCue buttons in each section → verify the Leva controls update accordingly
- [ ] **CS6.** Browser console clean across all pages

---

## Part 7: Commit (single commit, do NOT push)

- [ ] **C1.** Stage exactly these files:
  ```bash
  git add src/components/3d/scenes/coverstock-types-scene.tsx
  git add src/components/3d/scenes/rg-differential-scene.tsx
  git add src/components/3d/scenes/surface-prep-scene.tsx
  git add src/components/3d/scenes/axis-tilt-scene.tsx
  git add src/components/3d/scenes/axis-rotation-scene.tsx
  # (optionally) git add src/components/3d/scenes/ball-motion-scene.tsx
  git add src/components/layout/scene-switcher.tsx
  ```

- [ ] **C2.** Commit message:

```
feat: chapter 2 scene components — 5 sections (or 6) backing content batch 1

Builds the per-section 3D scene components for Chapter 2 (The Ball) and
the related Chapter 5 axis sections. These scenes activate when readers
visit the matching content pages from Content Batch 1.

Scenes shipped:
- coverstock-types — material variant dropdown with color presets
- rg-differential — RG and differential sliders affecting ball spin
- surface-prep — grit level dropdown affecting ball appearance
- axis-tilt — tilt slider with visible axis line
- axis-rotation — rotation slider (using axis tilt as proxy for now)

[If ball-motion built]:
- ball-motion — uses Lane asset to show 3-phase color zones

[If ball-motion deferred]:
Note: ball-motion (§2.4) deferred — requires Lane asset for full
visualization. Will be built in a follow-up session after Handoff 02
ships.

Each scene follows the rev-rate-scene.tsx template: useControls for
Leva, useEffect to sync sceneParams from SceneCue clicks. Some scenes
use color/RPM as proxies for features the Ball component doesn't yet
support natively (flare rings, surface texture, true axis rotation
prop). Future Ball component enhancements will replace these proxies.

Registered in scene-switcher.tsx with kebab-case scene names matching
the content-map entries from Content Batch 1.

PRD: serves FR-2. Advances milestone M2 (Content Wave 1).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

- [ ] **C3.** Verify commit
- [ ] **C4.** **DO NOT push.**

### STATUS update (separate small commit)

- [ ] Update `docs/STATUS.md` — add the new scenes to "Scene Components Built", update counts, add commit hash
- [ ] Commit STATUS as `docs: status update after chapter 2 scenes`
- [ ] Stop. Do NOT push.

---

## Part 8: Common Pitfalls

### Pitfall 1: Scene name kebab-case mismatch

The scene name in `content-map.ts` MUST match the case statement in `scene-switcher.tsx` exactly. Use kebab-case:

```typescript
// content-map.ts
scene: "coverstock-types"  // ✅
scene: "coverstockTypes"   // ❌
scene: "Coverstock-Types"  // ❌
```

### Pitfall 2: Forgetting the useEffect sync block

If you add a Leva control but don't add the matching branch in the useEffect, SceneCue clicks won't update that control. Every Leva field needs a corresponding `if (sceneParams.field !== undefined) updates.field = sceneParams.field` line.

### Pitfall 3: Trying to make the Ball do things it can't

The Ball component currently supports `rpm`, `axisTilt`, `color`, `showAxis`, `radius`. It does NOT support `coverstock`, `flareRings`, `axisRotation` (separate from tilt), `cutaway`, etc. For scenes that need these, use color/RPM as proxies and accept the limitation. Future Ball enhancements will close these gaps.

### Pitfall 4: Building scenes for sections that don't have content yet

Check `src/lib/content-map.ts` first. If the content entry doesn't exist, the route will 404 and you can't visually verify the scene. You can still BUILD the scene component (it's not blocked), but you won't be able to test it end-to-end until the content lands.

### Pitfall 5: Using OrbitControls inside the scene component overrides the canvas-level one

The Canvas in scene-canvas.tsx already has its own setup. Your scene's OrbitControls should be the ONLY OrbitControls active. If you see weird camera behavior, check that you're not double-rendering it.

### Pitfall 6: The dropdown "options" array uses string keys

Leva dropdown options must be strings (or objects with string keys). When using these in your map, you may need to coerce the value: `coverstock as string` if TypeScript complains.

---

## Part 9: Stop Conditions

STOP if:

1. The blueprint for a section is missing or malformed in spec 07 — don't invent
2. `npm run build` fails on a scene file you can't fix in 2 attempts
3. A scene needs the Ball component to support a feature it doesn't have AND you can't find a sensible proxy
4. You realize you need the Lane asset and Handoff 02 hasn't shipped — defer ball-motion

COMMIT (and stop) when:

1. All 5 (or 6) Chapter 2 scenes built
2. scene-switcher updated with all new cases
3. tsc clean, build clean
4. All routes return 200 (or 404 if content not yet shipped — note in commit)

NEVER:

1. Push without user approval
2. Modify the Ball component itself (use the existing API)
3. Build scenes outside Chapter 2
4. Modify content MDX files
5. Build new reusable assets

---

## Part 10: PRD Cross-Reference

| PRD Reference | Contribution |
|---------------|--------------|
| **FR-2** | 5-6 new scene components, each providing per-section interactivity |
| **Persona: Joe** | Joe can now see the ball react to his reading — the SceneCues actually do something |
| **Journey 1** | The "interactive content" experience is realized for Ch 2 |
| **Milestone M2** | M2 requires 10 scenes shipped — this session contributes 5-6 of them |

---

## Part 11: The Master Prompt (Copy Verbatim)

```
You are executing Handoff 04 — Scene Building: Chapter 2 (The Ball).
The complete handoff document is at:
docs/handoffs/04-SCENE-BUILDING-CHAPTER-2.md

READ THAT FILE IN FULL FIRST. It is the only set of instructions you need.

Your goal: build 5 (or 6) scene components for Chapter 2 sections that
already have content from Handoff 01 (Content Batch 1). Each scene
follows the rev-rate-scene.tsx template, registered in scene-switcher.tsx,
and verified in the browser at the matching content URL.

Required reading order (BEFORE writing code):
1. docs/handoffs/04-SCENE-BUILDING-CHAPTER-2.md (this file)
2. docs/specs/13-SESSION-SCENE-BUILDING.md — the generic scene-building
   playbook with the worked Coverstock Types example
3. docs/specs/07-INTERACTION-BLUEPRINTS.md sections 2.1, 2.3, 2.5 and
   sections 5.3, 5.4 — the per-scene specs (also 2.2, 2.4, 2.6 if you
   want to attempt those, but they need features beyond the current
   Ball component)
4. src/components/3d/scenes/rev-rate-scene.tsx — the reference template

Verify dependency state first: check git log for "content: chapter 2"
to confirm Handoff 01 has shipped. If not, you can still build scenes
but won't be able to visually test against real content.

Workflow: For each of the 5 sections (Coverstock Types, RG & Differential,
Surface Preparation, Axis Tilt, Axis Rotation), apply Phases A-D from
Part 4 of the handoff:
- Phase A: Per-section setup (read blueprint, copy params)
- Phase B: Create the scene file from the template
- Phase C: Register in scene-switcher
- Phase D: Verify

Use the per-section specifics in Part 5 of the handoff for: file path,
scene name, component name, exact Leva controls (from blueprint),
preset maps, and what to pass to BowlingBall.

The 6th scene (ball-motion §2.4) requires the Lane asset. If Handoff 02
has shipped, build it. If not, defer it and note in the commit.

Scenes 2.2 (Core Design) and 2.6 (Weight & Drilling) need features the
Ball component doesn't support yet (cutaway, marker visualization).
Build them as basic stubs that just show the existing ball — they'll
be enhanced when the Ball component grows those features.

After all scenes are built, do the cross-section verification in Part 6,
then commit using the message in Part 7. Do NOT push.

Common pitfalls (especially scene name kebab-case, useEffect sync,
and Ball component limitations) are in Part 8. Read before coding.

This session is parallel-safe with Handoffs 02 and 03 but would
CONFLICT with Handoff 01 if 01 is still running (both touch
scene-switcher.tsx and possibly content-map.ts). Verify 01 has
finished and committed before starting.

Begin by reading the handoff doc. Confirm when ready to start.
```
