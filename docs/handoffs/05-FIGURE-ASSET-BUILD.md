# Handoff 05 — Figure (Bowler) Asset Build

> **Status**: READY
> **Type**: 3D asset build session
> **Estimated duration**: 5-7 focused hours
> **Output**: New `<Bowler>` component at `src/components/3d/assets/figure/` + prototype scene integration + 1 commit
> **Created**: 2026-04-13

---

## Quick Header

| Field | Value |
|-------|-------|
| **Session ID** | Handoff 05 |
| **Session type** | 3D asset build |
| **Asset name** | Bowler Figure (primitive scientific-diagram style) |
| **Files created** | 4 new files in `src/components/3d/assets/figure/` |
| **Files modified** | `src/components/3d/scenes/prototype-scene.tsx` (verification) |
| **Asset dependencies** | None |
| **Unlocks** | ~17 future scene components in Ch 3 (Approach), Ch 4 (Swing), Ch 5 (parts of Release), Ch 12 (Two-Handed) |
| **PRD requirements served** | FR-2, FR-5, NFR-4 |
| **PRD milestone advanced** | M1 (Asset Foundation) — completes the 4 reusable assets |
| **Stop condition** | After commit, before push |
| **Parallel-safe with** | Most other handoffs (touches files only this session uses) |

---

## Part 1: Why This Session Matters

The Figure (Bowler) is the **last reusable asset** needed to unblock the rest of the project. After this session, all 4 core assets (Ball, Pins, Lane, Figure) exist and the asset interface pattern from spec 09 is fully realized.

The Figure unlocks:
- **Chapter 3 (The Approach)** — all 5 sections need a figure for stance, 4-step, 5-step, timing, drift
- **Chapter 4 (The Swing)** — all 5 sections need a figure for pushaway, backswing, forward swing, free vs muscled, swing plane
- **Chapter 5 (The Release)** — 3 sections (wrist position, one vs two-handed, follow-through) need figures
- **Chapter 12 (Two-Handed Bowling)** — all 4 sections need side-by-side figure comparisons

That's ~17 sections blocked on this asset. After this session, content batches and scene-building sessions for those chapters become unblocked.

### The Visual Goal: Scientific Diagram, NOT Character

This is the most important design decision: the figure is built to look like a **biomechanics textbook illustration**, not a video game character. Capsule torso, sphere head, cylinder limbs, sphere joints, single neutral color, matte material, slow deliberate motion.

Why: Spec 09 explicitly rejects realistic humanoids because they create uncanny valley problems and force unwanted brand decisions (gender, age, body type). A primitive figure reads as "scientific reference" — neutral, educational, focused on biomechanics not characterization.

If at any point your figure starts looking like a "character" (with personality, expressiveness, etc.), step back. Restraint over flash.

### What success looks like at the end of this session

Open `/learn/prototypes` and toggle "Show Bowler" in the Leva panel. A simple capsule-and-cylinder figure appears at a position offset from the ball/pins/lane. Cycle through the pose dropdown:
- **stance** → upright with slight knee flex
- **backswing-peak** → significant forward lean, arm raised behind
- **release** → at the bottom of the swing, slide foot extended, hand near ankle
- **follow-through** → arm extended forward, body settled

Switch the style dropdown from "one-handed" to "two-handed" and observe the dramatic spine tilt change at the release pose (~40° vs ~80°).

The interface accepts `style`, `pose`, `spineTilt` (override), `kneeFlex` (override), `color`, `isGhost`. Future scene components can compose `<Bowler>` with these props to build any of the 17 figure-dependent sections.

---

## Part 2: Pre-Flight Reading Checklist

### Required reading (~40 minutes)

- [ ] **`docs/specs/09-ASSET-ARCHITECTURE.md`** "Asset 3: The Figure (Bowler)" (~10 min)
  - Read the full Figure section with the 5 prototype options
  - **You are building Option A (Primitive Capsules)** — the others are explicitly rejected for this session
  - Pay attention to the "Visual style notes" subsection — single color, matte material, clean background, slow deliberate motion

- [ ] **`docs/specs/11-SESSION-FIGURE-ASSET.md`** (~15 min)
  - The generic figure-build playbook
  - Has the complete code skeletons for figure-constants.ts, poses.ts, primitive-bowler.tsx
  - This handoff is the SPECIFIC atomic application

- [ ] **`docs/research/biomechanics-and-form.md`** §1, §2, §6 (~10 min via Grep+Read)
  - §1: One-handed vs two-handed comparison (spine tilt is THE key distinction)
  - §2: 4-step approach timing
  - §6: Stance and setup positions
  - Use Grep to find specific spine tilt angles

- [ ] **`src/components/3d/assets/pins/`** (~5 min)
  - Reference for the 4-file asset pattern (constants, unit, composed, index)
  - Look at how `pin-deck.tsx` composes multiple `<LathePin>` instances

### Reference (consult during writing)

- [ ] `docs/specs/07-INTERACTION-BLUEPRINTS.md` — sections 3.1-3.5 (Approach), 4.1-4.5 (Swing), 5.5 (One vs Two-Handed), 12.1-12.4 (Two-Handed) — to understand the future scene needs

---

## Part 3: The Component Interface (What You're Building)

```typescript
export type BowlerStyle = "one-handed" | "two-handed";
export type Handedness = "right" | "left";
export type BowlerPose =
  | "stance"
  | "pushaway"
  | "step-1" | "step-2" | "step-3" | "step-4"
  | "backswing-peak"
  | "forward-swing"
  | "release"
  | "follow-through";

export interface BowlerProps {
  style?: BowlerStyle;        // default 'one-handed'
  handedness?: Handedness;    // default 'right'
  pose?: BowlerPose;          // default 'stance'

  // Body mechanics overrides (take precedence over pose defaults)
  spineTilt?: number;         // 0-110 degrees forward
  kneeFlex?: number;          // 0-45 degrees
  hipRotation?: number;       // 0-45 degrees

  // Phase 2 placeholders (declare, don't implement)
  phase?: number;             // 0-1, smooth interpolation between poses
  showJoints?: boolean;       // highlight joints
  showSpineAngle?: boolean;   // protractor overlay
  showBallPath?: boolean;     // trace ball through swing

  // Appearance
  color?: string;             // default neutral slate
  isGhost?: boolean;          // semi-transparent for comparison mode
}
```

**This session implements**: the basic body, the 4 core poses (stance, backswing-peak, release, follow-through), and the spine tilt / knee flex / hip rotation override props. Both one-handed and two-handed style variants for those 4 poses.

**This session declares but stubs**: phase (smooth interpolation), showJoints, showSpineAngle, showBallPath. Approach step poses (step-1 through step-4, pushaway, forward-swing) — these get added in scene-building sessions when needed.

---

## Part 4: Atomic Task Checklist

### Phase A — File Setup (~5 min)

- [ ] **A1.** Create directory `src/components/3d/assets/figure/`
- [ ] **A2.** Verify the directory was created
- [ ] **A3.** Note the 4 files: `figure-constants.ts`, `poses.ts`, `primitive-bowler.tsx`, `index.tsx`

### Phase B — Body Constants (~15 min)

- [ ] **B1.** Create `src/components/3d/assets/figure/figure-constants.ts`
- [ ] **B2.** Add `FIGURE_HEIGHT = 1.75` (~1.75m total height)
- [ ] **B3.** Add `HEAD_RADIUS = 0.105`
- [ ] **B4.** Add torso constants: `TORSO_HEIGHT = 0.55`, `TORSO_WIDTH = 0.32`, `TORSO_DEPTH = 0.18`
- [ ] **B5.** Add upper arm: `UPPER_ARM_LENGTH = 0.28`, `UPPER_ARM_RADIUS = 0.04`
- [ ] **B6.** Add forearm: `FOREARM_LENGTH = 0.25`, `FOREARM_RADIUS = 0.035`
- [ ] **B7.** Add `HAND_RADIUS = 0.06`
- [ ] **B8.** Add upper leg: `UPPER_LEG_LENGTH = 0.42`, `UPPER_LEG_RADIUS = 0.06`
- [ ] **B9.** Add lower leg: `LOWER_LEG_LENGTH = 0.42`, `LOWER_LEG_RADIUS = 0.05`
- [ ] **B10.** Add foot: `FOOT_LENGTH = 0.22`, `FOOT_HEIGHT = 0.05`
- [ ] **B11.** Add `JOINT_RADIUS = 0.035` (for visible articulation spheres at joints)
- [ ] **B12.** Add shoulder offsets: `SHOULDER_OFFSET_X = TORSO_WIDTH / 2`, `SHOULDER_OFFSET_Y = TORSO_HEIGHT / 2 - 0.03`
- [ ] **B13.** Add hip offsets: `HIP_OFFSET_X = TORSO_WIDTH / 3`, `HIP_OFFSET_Y = -TORSO_HEIGHT / 2`
- [ ] **B14.** Add `DEFAULT_FIGURE_COLOR = "#94a3b8"` (neutral slate)
- [ ] **B15.** Add `HIGHLIGHTED_JOINT_COLOR = "#fbbf24"`
- [ ] **B16.** Save the file

The complete code is in `docs/specs/11-SESSION-FIGURE-ASSET.md` Step 1. Copy verbatim if it helps.

### Phase C — Pose Library (~30 min)

- [ ] **C1.** Create `src/components/3d/assets/figure/poses.ts`
- [ ] **C2.** Add a helper: `const deg = (d: number) => (d * Math.PI) / 180;`
- [ ] **C3.** Define and export the `PoseKeyframe` interface with these fields:
  - `spineTiltX: number` — forward lean
  - `spineTiltZ: number` — lateral lean
  - `hipRotation: number` — torso rotation around Y
  - `rightShoulderX: number`, `rightShoulderY: number`, `rightShoulderZ: number`
  - `rightElbow: number`
  - `rightWrist: number`
  - Same fields for left arm: `leftShoulderX`, `leftShoulderY`, `leftShoulderZ`, `leftElbow`, `leftWrist`
  - Right leg: `rightHipX`, `rightHipY`, `rightKnee`, `rightAnkle`
  - Left leg: same fields prefixed `left`
- [ ] **C4.** Define `ONE_HANDED_STANCE` PoseKeyframe (upright with slight knee flex, ball held at chest)
- [ ] **C5.** Define `ONE_HANDED_BACKSWING_PEAK` (~40° forward spine tilt, right arm raised behind)
- [ ] **C6.** Define `ONE_HANDED_RELEASE` (~50° forward spine tilt, right arm extended down to ankle)
- [ ] **C7.** Define `ONE_HANDED_FOLLOW_THROUGH` (~45° spine tilt, right arm extended forward and up)
- [ ] **C8.** Define `TWO_HANDED_STANCE` (slightly more forward spine than one-handed)
- [ ] **C9.** Define `TWO_HANDED_RELEASE` (**spineTiltX: deg(80)** — the dramatic two-handed signature)
- [ ] **C10.** Create the `POSES` lookup record:
  ```typescript
  export const POSES: Record<string, PoseKeyframe> = {
    "one-handed:stance": ONE_HANDED_STANCE,
    "one-handed:backswing-peak": ONE_HANDED_BACKSWING_PEAK,
    "one-handed:release": ONE_HANDED_RELEASE,
    "one-handed:follow-through": ONE_HANDED_FOLLOW_THROUGH,
    "two-handed:stance": TWO_HANDED_STANCE,
    "two-handed:release": TWO_HANDED_RELEASE,
  };
  ```
- [ ] **C11.** Implement `getPose(style: string, pose: string): PoseKeyframe` — returns `POSES[\`${style}:${pose}\`] ?? POSES["one-handed:stance"]`
- [ ] **C12.** Save the file

The complete code with all keyframe values is in `docs/specs/11-SESSION-FIGURE-ASSET.md` Step 2. Copy verbatim if it helps.

### Phase D — Primitive Bowler Component (~75-90 min)

This is the largest file. Build it incrementally — render a torso first, verify, then add limbs.

#### Sub-phase D.1 — Skeleton

- [ ] **D1.** Create `src/components/3d/assets/figure/primitive-bowler.tsx`
- [ ] **D2.** Add `"use client"`
- [ ] **D3.** Import `useMemo` from React
- [ ] **D4.** Import all needed constants from `./figure-constants`
- [ ] **D5.** Import `getPose` and `PoseKeyframe` from `./poses`
- [ ] **D6.** Define and export the type aliases: `BowlerStyle`, `Handedness`, `BowlerPose`
- [ ] **D7.** Define and export `BowlerProps` interface (per Part 3)
- [ ] **D8.** Define the `PrimitiveBowler` function component that destructures props with defaults

#### Sub-phase D.2 — Resolve the active pose

- [ ] **D9.** Inside the component, use `useMemo` to compute the active keyframe:
  - Get base from `getPose(style, pose)`
  - Apply prop overrides: if `spineTilt !== undefined`, override `spineTiltX = (spineTilt * Math.PI) / 180`
  - Same for `hipRotation` and `kneeFlex`
- [ ] **D10.** Compute `matOpacity = isGhost ? 0.5 : 1.0`
- [ ] **D11.** Compute `legYOffset = UPPER_LEG_LENGTH + LOWER_LEG_LENGTH` so feet sit on ground

#### Sub-phase D.3 — Outer group + torso + head

- [ ] **D12.** Return a `<group position={[0, legYOffset, 0]}>` outer wrapper
- [ ] **D13.** Inside, add a spine rotation group: `<group rotation={[keyframe.spineTiltX, keyframe.hipRotation, keyframe.spineTiltZ]}>`
- [ ] **D14.** Add the torso mesh (use `<boxGeometry args={[TORSO_WIDTH, TORSO_HEIGHT, TORSO_DEPTH]} />` and `meshStandardMaterial` with the figure color, roughness 0.7)
- [ ] **D15.** Add the head mesh above the torso:
  - position `[0, TORSO_HEIGHT / 2 + HEAD_RADIUS + 0.02, 0]`
  - `<sphereGeometry args={[HEAD_RADIUS, 24, 24]} />`
  - same material as torso

#### Sub-phase D.4 — Right arm chain

- [ ] **D16.** Add a positioned group for the right shoulder: `<group position={[SHOULDER_OFFSET_X, SHOULDER_OFFSET_Y, 0]}>`
- [ ] **D17.** Render an `ArmChain` subcomponent inside (you'll define this below) with the right-side keyframe values
- [ ] **D18.** Outside the main `PrimitiveBowler` component, define `ArmChain({ shoulderX, shoulderY, shoulderZ, elbow, wrist, color, opacity, isGhost, mirror })`
- [ ] **D19.** ArmChain renders:
  - Outer group with `rotation={[shoulderX, shoulderY * xSign, shoulderZ * xSign]}` where `xSign = mirror ? -1 : 1`
  - Shoulder joint sphere at origin
  - Upper arm cylinder positioned at `[0, -UPPER_ARM_LENGTH / 2, 0]` (hangs DOWN from shoulder)
  - Inner group at `[0, -UPPER_ARM_LENGTH, 0]` for the elbow
  - Inside elbow: rotation `[elbow, 0, 0]`, then a sphere joint, then forearm cylinder at `[0, -FOREARM_LENGTH / 2, 0]`, then hand sphere at `[0, -FOREARM_LENGTH, 0]`
- [ ] **D20.** Test compile

#### Sub-phase D.5 — Left arm chain

- [ ] **D21.** Add a positioned group for the left shoulder: `<group position={[-SHOULDER_OFFSET_X, SHOULDER_OFFSET_Y, 0]}>`
- [ ] **D22.** Render `<ArmChain mirror ... />` with the LEFT-side keyframe values

#### Sub-phase D.6 — Legs (OUTSIDE the spine rotation group)

- [ ] **D23.** Important: Legs must be at the SAME level as the spine group, not nested inside it. Legs anchor the figure to the ground; they don't rotate with the torso lean.
- [ ] **D24.** Add right hip group: `<group position={[HIP_OFFSET_X, HIP_OFFSET_Y, 0]}>` containing a `LegChain` with right-side values
- [ ] **D25.** Add left hip group: `<group position={[-HIP_OFFSET_X, HIP_OFFSET_Y, 0]}>` containing `<LegChain mirror ... />` with left-side values
- [ ] **D26.** Define `LegChain({ hipX, hipY, knee, ankle, color, opacity, isGhost, mirror })` outside the main component
- [ ] **D27.** LegChain renders:
  - Outer group with `rotation={[hipX, hipY * xSign, 0]}`
  - Hip joint sphere
  - Upper leg cylinder at `[0, -UPPER_LEG_LENGTH / 2, 0]`
  - Inner group at `[0, -UPPER_LEG_LENGTH, 0]` rotation `[knee, 0, 0]`
  - Knee joint sphere
  - Lower leg cylinder at `[0, -LOWER_LEG_LENGTH / 2, 0]`
  - Foot box at `[0, -LOWER_LEG_LENGTH - FOOT_HEIGHT / 2, FOOT_LENGTH / 4]` (foot extends slightly forward)

#### Sub-phase D.7 — Final compile check

- [ ] **D28.** Save the file
- [ ] **D29.** Run `npx tsc --noEmit` — must be clean

The complete code with all the geometry args is in `docs/specs/11-SESSION-FIGURE-ASSET.md` Step 3. Copy verbatim if it helps.

### Phase E — Public Interface (~5 min)

- [ ] **E1.** Create `src/components/3d/assets/figure/index.tsx`
- [ ] **E2.** Re-export `PrimitiveBowler as Bowler` from `./primitive-bowler`
- [ ] **E3.** Re-export the types: `BowlerProps`, `BowlerStyle`, `BowlerPose`, `Handedness`
- [ ] **E4.** Re-export `POSES` and `getPose` from `./poses`
- [ ] **E5.** Re-export the `PoseKeyframe` type

### Phase F — Update Prototype Scene (~15 min)

- [ ] **F1.** Read `src/components/3d/scenes/prototype-scene.tsx`
- [ ] **F2.** Add the import: `import { Bowler, type BowlerStyle, type BowlerPose } from "@/components/3d/assets/figure";`
- [ ] **F3.** Add Leva controls in the existing useControls call:
  ```typescript
  showBowler: { value: false, label: "Show Bowler" },
  bowlerStyle: { value: "one-handed", options: ["one-handed", "two-handed"], label: "Style" },
  bowlerPose: { value: "stance", options: ["stance", "backswing-peak", "release", "follow-through"], label: "Pose" },
  bowlerSpineTilt: { value: 0, min: 0, max: 110, step: 5, label: "Spine Tilt Override" },
  ```
- [ ] **F4.** Add the figure rendering to the JSX (positioned to the SIDE of the existing ball/pins so it doesn't overlap):
  ```tsx
  {showBowler && (
    <group position={[2.5, 0, 0]}>
      <Bowler
        style={bowlerStyle as BowlerStyle}
        pose={bowlerPose as BowlerPose}
        spineTilt={bowlerSpineTilt > 0 ? bowlerSpineTilt : undefined}
      />
    </group>
  )}
  ```
- [ ] **F5.** Adjust OrbitControls maxDistance if needed so the camera can pull back enough to see ball + figure together

### Phase G — Verification (~15 min)

- [ ] **G1.** Save all files
- [ ] **G2.** Run `npx tsc --noEmit` — verify zero errors
- [ ] **G3.** Run `npm run build` — verify successful build
- [ ] **G4.** `curl http://localhost:6200/learn/prototypes` — verify 200
- [ ] **G5.** Open in browser
- [ ] **G6.** Toggle "Show Bowler" — figure appears to the right of the ball
- [ ] **G7.** Cycle through poses dropdown:
  - **stance** → upright with slight knee flex, both arms holding ball position
  - **backswing-peak** → forward lean (~40°), right arm raised behind
  - **release** → bottom of swing, arm down, slide leg bent
  - **follow-through** → arm extended forward, body settled
- [ ] **G8.** Switch style to "two-handed":
  - At **release** pose, spine tilt should be DRAMATICALLY more forward (~80°)
  - This is THE signature visual difference between styles
- [ ] **G9.** Drag "Spine Tilt Override" slider → figure should lean forward more as the slider increases
- [ ] **G10.** No body parts should clip through each other in the stance pose
- [ ] **G11.** Browser console clean

### Phase H — Commit (single commit, do NOT push)

- [ ] **H1.** Stage exactly:
  ```bash
  git add src/components/3d/assets/figure/
  git add src/components/3d/scenes/prototype-scene.tsx
  ```

- [ ] **H2.** Commit message:

```
feat: figure asset — primitive bowler with pose keyframes

Implements the Figure (Bowler) asset at src/components/3d/assets/figure/
following spec 09's "scientific diagram" approach (Option A). Capsule
torso, sphere head, cylinder limbs, sphere joints. Single neutral color,
matte material — no character, no clothing, no face.

Files created:
- figure-constants.ts: body proportions and joint positions
- poses.ts: keyframe library for one-handed and two-handed variants
- primitive-bowler.tsx: the main component with articulated joint hierarchy
- index.tsx: public interface (<Bowler />)

Poses implemented (4 each for one-handed and two-handed where applicable):
- stance: upright with slight knee flex, ball at chest height
- backswing-peak: forward lean (~40° one-hand, ~50° two-hand)
- release: bottom of swing, slide leg bent, arm at ankle
- follow-through: arm extended forward, body settled

The two-handed release pose features the signature ~80° forward spine
tilt (vs ~40° for one-handed) — the dramatic mechanical difference
that defines the modern two-handed style.

Props implemented:
- style ('one-handed' | 'two-handed'), handedness, pose
- spineTilt, kneeFlex, hipRotation override props
- color (default neutral slate), isGhost (semi-transparent for comparisons)

Props stubbed for future sessions:
- phase (0-1 smooth interpolation between poses)
- showJoints, showSpineAngle, showBallPath visual helpers
- approach step poses (step-1 through step-4, pushaway, forward-swing)

Unlocks ~17 future scene components in Ch 3 (Approach), Ch 4 (Swing),
Ch 5 (Wrist, One-vs-Two-Handed, Follow-Through), Ch 12 (Two-Handed).

This completes the 4 reusable assets (Ball, Pins, Lane, Figure) — the
asset interface pattern from spec 09 is now fully realized. Future
high-end 3D team deliverables can be swapped in without touching scenes.

Prototype scene at /learn/prototypes updated with Bowler controls for
visual verification.

PRD: serves FR-2, FR-5, NFR-4. Advances and COMPLETES milestone M1
(Asset Foundation).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

- [ ] **H3.** Verify the commit
- [ ] **H4.** **DO NOT push.**

### Phase I — STATUS Update (separate commit)

- [ ] Update `docs/STATUS.md` — Figure goes into "3D Assets Built", note that M1 is now COMPLETE (all 4 reusable assets shipped), update next sessions to reflect that scenes for chapters 3, 4, 5, 12 are now possible
- [ ] Commit: `docs: status update after figure asset — M1 complete`
- [ ] Stop. Do NOT push.

---

## Part 5: Common Pitfalls

### Pitfall 1: Joint hierarchy rotation ordering

The single biggest source of figure bugs. Rules:
- The group at a joint is positioned WHERE that joint is in the parent's coordinate space
- The group's rotation determines how the entire downstream chain rotates AT that joint
- The mesh of the limb sits INSIDE the joint's rotation group, positioned so its end at the joint is at `[0, 0, 0]`

If an arm sticks out at a weird angle, you have the rotation axis wrong. Remember:
- **X axis** = pitch (fore/aft swing)
- **Y axis** = yaw (side-to-side rotation, around the vertical body axis)
- **Z axis** = roll (twist around the limb's own length)

### Pitfall 2: Cylinder default orientation

`<cylinderGeometry>` creates a cylinder with its long axis along Y. When you position a limb cylinder at `[0, -LENGTH/2, 0]`, its TOP face is at `Y=0` (the joint position) and its BOTTOM face is at `Y=-LENGTH`. That's exactly what you want for a limb hanging from a joint.

If a limb cylinder appears horizontal instead of vertical, you have an unexpected rotation somewhere up the chain.

### Pitfall 3: Mirroring left vs right limbs

For the left arm and left leg, the rotation directions for shoulder yaw, hip yaw, etc. need to FLIP (because the keyframe values are written for the right side). The `mirror` prop on `ArmChain` and `LegChain` handles this with `const xSign = mirror ? -1 : 1` applied to the yaw angles.

If both arms swing forward like a zombie, you forgot to mirror one side.

### Pitfall 4: Legs inside the spine rotation group

This is a SUBTLE bug. The spine group rotates the torso/head/arms by the spine tilt angle. If you put legs INSIDE that group too, the legs lean forward with the torso, which is wrong — legs anchor the figure to the ground.

Legs go OUTSIDE the spine rotation group, at the same level as the spine group. The hierarchy is:
```
<outer group>            // figure root, positioned at ground
  <spine group>          // rotates by spineTilt
    <torso, head, arms>
  </spine group>
  <left hip group>       // siblings of spine, NOT children
    <left leg chain>
  </left hip group>
  <right hip group>
    <right leg chain>
  </right hip group>
</outer group>
```

### Pitfall 5: Don't scale up to "match the ball"

The figure is ~1.75m tall. The bowling ball is 0.108m radius. The ball is genuinely TINY next to the figure — that's correct because real proportions. Don't scale either one to "look right together." Scenes that show ball + figure will use specific camera setups and positioning.

### Pitfall 6: Don't try to add a face, hair, fingers, or clothing

Restraint is the brand. The moment you add a face, the figure becomes a "character" with implicit gender/age/personality. The moment you add fingers, the geometry budget explodes. Single color, primitive shapes, no detail.

### Pitfall 7: Visual verification only at clean poses

The 4 poses you're implementing are DISCRETE — they snap. Don't try to interpolate between them in this session. The `phase` prop (smooth interpolation) is explicitly deferred. Verify each pose looks right at its discrete snap, not in transition.

---

## Part 6: Stop Conditions

STOP if:

1. The figure renders but body parts are clipping through each other in the stance pose (geometry positioning bug)
2. Both arms move identically (mirroring bug — left side not flipped)
3. The figure floats above or sinks below the ground (`legYOffset` calculation wrong)
4. `npm run build` fails on a file you can't fix in 2 attempts
5. You realize you need IK or smooth animation — DEFER, that's a future session

COMMIT (and stop) when:

1. All 4 figure files exist
2. tsc clean, build clean
3. `/learn/prototypes` shows the figure for all 4 poses × 2 styles = 8 visual variants
4. The two-handed release pose visibly differs from one-handed (dramatic spine tilt)
5. STATUS update queued for separate commit

NEVER:

1. Push without user approval
2. Build a face, hair, fingers, or clothing
3. Add IK or smooth pose interpolation
4. Use a Mixamo or Ready Player Me model
5. Build scene components for chapters 3, 4, 5, 12 — that's a future scene-building session
6. Modify any other asset (Ball, Pins, Lane)

---

## Part 7: PRD Cross-Reference

| PRD Reference | Contribution |
|---------------|--------------|
| **FR-2** | The 4th and final reusable 3D asset, completing the asset library |
| **FR-5** | Demonstrates the swappable interface pattern with the most complex asset type |
| **NFR-4** | Maintains the "scientific diagram" visual restraint that fits the brand |
| **Milestone M1** | M1 requires all 4 assets (Ball, Pins, Lane, Figure). This session ships #4 of 4. **M1 COMPLETE after this session.** |

---

## Part 8: The Master Prompt (Copy Verbatim)

```
You are executing Handoff 05 — Figure (Bowler) Asset Build. The complete
handoff document is at:
docs/handoffs/05-FIGURE-ASSET-BUILD.md

READ THAT FILE IN FULL FIRST. It is your only set of instructions.

Your goal: build the Figure (Bowler) asset at
src/components/3d/assets/figure/ following Option A from spec 09 — a
"scientific diagram" primitive figure built from capsules, cylinders,
and spheres. Single neutral color, matte material, no character.

This is the LAST reusable asset. After this session, all 4 reusable
assets exist (Ball, Pins, Lane, Figure) and Milestone M1 is complete.

Required reading order (BEFORE writing code):
1. docs/handoffs/05-FIGURE-ASSET-BUILD.md (this file)
2. docs/specs/09-ASSET-ARCHITECTURE.md "Asset 3: The Figure (Bowler)" —
   pay special attention to the "Visual style notes" subsection
3. docs/specs/11-SESSION-FIGURE-ASSET.md — the generic figure-build
   playbook with complete code skeletons
4. docs/research/biomechanics-and-form.md §1, §2, §6 — for spine tilt
   angles and stance/release positions (use Grep + Read with offset)
5. src/components/3d/assets/pins/ — reference for the asset pattern

Workflow: work through Phases A-I from Part 4 of the handoff:
- Phase A: File setup
- Phase B: Body constants (~16 atomic tasks)
- Phase C: Pose library — 4 keyframes per style (~12 atomic tasks)
- Phase D: Primitive bowler component — built incrementally in 7
  sub-phases (~29 atomic tasks)
- Phase E: Public interface
- Phase F: Update prototype scene for verification
- Phase G: Verification — cycle through all poses × both styles
- Phase H: Single commit (do NOT push)
- Phase I: STATUS.md update as separate commit

Code skeletons for figure-constants.ts, poses.ts, and primitive-bowler.tsx
are in spec 11 (steps 1-3). Copy verbatim if helpful, then verify
against the atomic checklist.

Stop conditions in Part 6. Common pitfalls in Part 5 — read them BEFORE
writing the joint hierarchy. The mirroring and rotation-axis pitfalls
are the most common.

The visual goal is "biomechanics textbook illustration" not "video game
character." Restraint over flash. If the figure starts looking like a
character, step back.

This session is parallel-safe with most other handoffs — the only file
overlap risk is if Handoff 04 (scene building) is touching the prototype
scene at the same time. Verify no other session has uncommitted
prototype-scene.tsx changes.

Begin by reading the handoff doc. Confirm when ready.
```
