# Session Handoff — Build the Figure Asset (Bowler)

> **Status**: CANONICAL
> **Created**: 2026-04-13
> **Purpose**: Self-contained briefing for a fresh Claude Code session to build the Figure asset — a minimalist "scientific diagram" bowler figure used in approach, swing, release, and two-handed scenes
> **Session scope**: 1 focused session, ~5-7 hours of work
> **Unlocks**: Scene components for ~17 content sections across Chapters 3, 4, 5, 12

---

## Part 1: What You Are Doing

You are building the **Bowler figure asset** for Roll Model. This is a minimalist articulated figure built from Three.js primitives — not a rigged humanoid, not a realistic character. The visual goal is **"biomechanics textbook diagram"**, not "video game character."

The figure is a `<Bowler>` React component that accepts props for style (one-handed / two-handed), pose (stance, backswing-peak, release, etc.), and various body mechanics overrides (spine tilt, knee flex, hip rotation). Scenes import `<Bowler>` and pass props to control what's shown.

### Why "Scientific Diagram" Not "Character"

Spec 09 (Asset Architecture) explicitly rejects realistic humanoids for this project. Reasons:
- Realistic characters create uncanny valley problems on the web
- A character has implicit brand choices (gender, age, body type) we don't want to make
- Scientific diagrams are what users expect in an educational context (think anatomy textbook)
- Primitives ship in one session; a rigged character would take weeks
- Upgradeability: the swappable interface means a real 3D team can deliver a rigged figure later and it slots in without touching scenes

### What Good Looks Like

Think of the figure as a wooden artist's mannequin rendered in Three.js primitives. Single color (neutral gray or muted blue). Matte material (roughness 0.7). Clean capsule torso, sphere head, cylinder limbs, sphere joints. Slow, deliberate motion. No clothing, no face, no fingers, no hair.

Reference images (mental model):
- A wooden mannequin from an art supply store
- Biomechanics diagrams in sports science papers
- The stick figures in pro bowling coaching books

NOT:
- Mixamo characters
- Ready Player Me avatars
- Minecraft Steve
- Anything that looks like a "game character"

---

## Part 2: Required Reading

1. **`docs/specs/09-ASSET-ARCHITECTURE.md`** — Read the "Asset 3: The Figure (Bowler)" section in full. Options A (primitive capsules) through E (IK) are laid out. **You are building Option A.** The "Visual style notes" subsection is critical for tone.

2. **`docs/specs/07-INTERACTION-BLUEPRINTS.md`** — Search for every section that references the figure. Read sections 3.1–3.5 (Approach), 4.1–4.5 (Swing), 5.1 (Wrist Position), 5.5 (One vs Two-Handed), 5.6 (Follow-Through), 12.1–12.4 (Two-Handed Bowling). Understand what poses and angles are needed.

3. **`docs/research/biomechanics-and-form.md`** — Skim §1 (one vs two-handed, spine tilt comparison), §2 (approach steps with timing tables), §3 (swing phases), §4 (release mechanics), §5 (follow-through), §6 (stance and setup). This is where the actual body angles come from. Don't read cover-to-cover — search for the specific poses you need.

4. **`src/components/3d/assets/pins/`** — Reference for the interface-implementation pattern. Specifically look at how `pin-profile.ts` (constants), `lathe-pin.tsx` (unit), `pin-deck.tsx` (composed), and `index.tsx` (public interface) are structured.

5. **`src/components/3d/assets/lane/`** — Another reference (may exist by the time you run this session). Same pattern.

---

## Part 3: The Component Interface

```typescript
export type BowlerStyle = 'one-handed' | 'two-handed';
export type Handedness = 'right' | 'left';

export type BowlerPose =
  | 'stance'           // Ready position, ball held at chest
  | 'pushaway'         // Ball extended forward, arm straight
  | 'step-1'           // First step of approach
  | 'step-2'           // Second step
  | 'step-3'           // Third step, backswing building
  | 'step-4'           // Fourth step, ball at peak behind
  | 'backswing-peak'   // Ball at top of backswing
  | 'forward-swing'   // Ball descending to release
  | 'release'          // Ball at release point, hand at ankle
  | 'follow-through';  // Hand extended after release

export interface BowlerProps {
  // Identity
  style?: BowlerStyle;        // default 'one-handed'
  handedness?: Handedness;    // default 'right'

  // Pose / phase
  pose?: BowlerPose;          // default 'stance'
  phase?: number;             // 0-1, interpolates between pose keyframes

  // Body mechanics overrides (take precedence over pose defaults)
  spineTilt?: number;         // 0-110 degrees forward
  kneeFlex?: number;          // 0-45 degrees
  shoulderRotation?: number;  // 0-180 degrees
  hipRotation?: number;       // 0-45 degrees

  // Visual helpers
  showJoints?: boolean;       // highlights joint spheres in brighter color
  showSpineAngle?: boolean;   // protractor overlay on spine
  showBallPath?: boolean;     // traces the ball's arc through the swing

  // Appearance
  color?: string;             // default "#94a3b8" (neutral slate)
  isGhost?: boolean;          // semi-transparent, for comparison mode
}
```

**This session implements everything except `showJoints`, `showSpineAngle`, `showBallPath`, and `phase`.** These four are stubbed or partially implemented — they're declared in the interface so future scenes can use the full API, but the visual helpers are future work.

---

## Part 4: File Layout

```
src/components/3d/assets/figure/
├── figure-constants.ts      # Body proportions, joint positions, keyframe defaults
├── poses.ts                 # Keyframe library — named poses mapped to joint angles
├── primitive-bowler.tsx     # The main implementation
└── index.tsx                # Public interface export
```

---

## Part 5: Implementation Steps

### Step 1: Body Constants

**File:** `src/components/3d/assets/figure/figure-constants.ts`

Body proportions for a ~1.75m tall figure. All units are meters. Proportions based on standard anatomy scaled for visual clarity:

```typescript
// Figure body proportions (meters) — roughly 1.75m total height
// Based on 8-head proportions but with slightly longer limbs for clarity

export const FIGURE_HEIGHT = 1.75;

// Head
export const HEAD_RADIUS = 0.105;  // ~21cm diameter

// Torso
export const TORSO_HEIGHT = 0.55;
export const TORSO_WIDTH = 0.32;
export const TORSO_DEPTH = 0.18;

// Arms
export const UPPER_ARM_LENGTH = 0.28;
export const UPPER_ARM_RADIUS = 0.04;
export const FOREARM_LENGTH = 0.25;
export const FOREARM_RADIUS = 0.035;
export const HAND_RADIUS = 0.06;

// Legs
export const UPPER_LEG_LENGTH = 0.42;
export const UPPER_LEG_RADIUS = 0.06;
export const LOWER_LEG_LENGTH = 0.42;
export const LOWER_LEG_RADIUS = 0.05;
export const FOOT_LENGTH = 0.22;
export const FOOT_HEIGHT = 0.05;

// Joint sphere size (for visible articulation points)
export const JOINT_RADIUS = 0.035;

// Shoulder offsets from torso center
export const SHOULDER_OFFSET_X = TORSO_WIDTH / 2;
export const SHOULDER_OFFSET_Y = TORSO_HEIGHT / 2 - 0.03;

// Hip offsets from torso center
export const HIP_OFFSET_X = TORSO_WIDTH / 3;
export const HIP_OFFSET_Y = -TORSO_HEIGHT / 2;

// Default colors
export const DEFAULT_FIGURE_COLOR = "#94a3b8";  // neutral slate
export const HIGHLIGHTED_JOINT_COLOR = "#fbbf24";
```

### Step 2: Pose Keyframe Library

**File:** `src/components/3d/assets/figure/poses.ts`

Each pose is a set of joint rotations (radians) for every articulated joint. This is the "canned animation" approach — not smooth IK, just named positions the figure snaps to.

Start with the minimum viable set: stance, backswing-peak, release, follow-through. Others can be added later by the scene-building sessions.

```typescript
// All angles in radians. Joint angles represent rotation FROM the
// default T-pose (arms out, legs straight, facing -Z).

export interface PoseKeyframe {
  spineTiltX: number;       // forward lean
  spineTiltZ: number;       // lateral lean
  hipRotation: number;      // torso rotation around Y

  // Right arm (dominant for right-handers)
  rightShoulderX: number;   // pitch (swing fore/aft)
  rightShoulderY: number;   // yaw (arm swing in/out from body)
  rightShoulderZ: number;   // roll (arm rotation around its own axis)
  rightElbow: number;       // elbow flexion (0 = straight, positive = bent)
  rightWrist: number;       // wrist flexion

  // Left arm (balance arm for one-handers, support arm for two-handers)
  leftShoulderX: number;
  leftShoulderY: number;
  leftShoulderZ: number;
  leftElbow: number;
  leftWrist: number;

  // Right leg
  rightHipX: number;        // pitch
  rightHipY: number;        // yaw
  rightKnee: number;
  rightAnkle: number;

  // Left leg
  leftHipX: number;
  leftHipY: number;
  leftKnee: number;
  leftAnkle: number;
}

const deg = (d: number) => (d * Math.PI) / 180;

// ----- One-handed poses -----

export const ONE_HANDED_STANCE: PoseKeyframe = {
  spineTiltX: deg(15),
  spineTiltZ: 0,
  hipRotation: 0,
  rightShoulderX: deg(30),   // arm forward slightly
  rightShoulderY: deg(-10),  // slightly inward
  rightShoulderZ: 0,
  rightElbow: deg(80),        // bent holding ball
  rightWrist: 0,
  leftShoulderX: deg(30),
  leftShoulderY: deg(10),
  leftShoulderZ: 0,
  leftElbow: deg(80),         // bent balance-holding the ball
  leftWrist: 0,
  rightHipX: 0,
  rightHipY: 0,
  rightKnee: deg(10),         // slight flex
  rightAnkle: 0,
  leftHipX: 0,
  leftHipY: 0,
  leftKnee: deg(10),
  leftAnkle: 0,
};

export const ONE_HANDED_BACKSWING_PEAK: PoseKeyframe = {
  spineTiltX: deg(40),
  spineTiltZ: deg(5),         // slight lean into the shot
  hipRotation: deg(15),
  rightShoulderX: deg(180),   // arm straight up behind
  rightShoulderY: deg(-5),
  rightShoulderZ: 0,
  rightElbow: 0,               // straight at peak
  rightWrist: 0,
  leftShoulderX: deg(10),
  leftShoulderY: deg(30),
  leftShoulderZ: 0,
  leftElbow: deg(15),
  leftWrist: 0,
  rightHipX: deg(10),
  rightHipY: 0,
  rightKnee: deg(20),
  rightAnkle: 0,
  leftHipX: deg(-5),
  leftHipY: 0,
  leftKnee: deg(45),           // slide leg bent
  leftAnkle: 0,
};

export const ONE_HANDED_RELEASE: PoseKeyframe = {
  spineTiltX: deg(50),
  spineTiltZ: deg(8),
  hipRotation: deg(-5),
  rightShoulderX: deg(-30),    // arm down and slightly forward
  rightShoulderY: 0,
  rightShoulderZ: 0,
  rightElbow: deg(10),          // nearly straight
  rightWrist: 0,
  leftShoulderX: deg(20),
  leftShoulderY: deg(50),
  leftShoulderZ: 0,
  leftElbow: deg(20),
  leftWrist: 0,
  rightHipX: 0,
  rightHipY: 0,
  rightKnee: deg(15),
  rightAnkle: 0,
  leftHipX: deg(-10),
  leftHipY: 0,
  leftKnee: deg(90),            // slide leg bent deep
  leftAnkle: 0,
};

export const ONE_HANDED_FOLLOW_THROUGH: PoseKeyframe = {
  spineTiltX: deg(45),
  spineTiltZ: deg(5),
  hipRotation: deg(-10),
  rightShoulderX: deg(-60),     // arm extended up/forward
  rightShoulderY: deg(15),
  rightShoulderZ: 0,
  rightElbow: deg(25),
  rightWrist: deg(15),
  leftShoulderX: deg(30),
  leftShoulderY: deg(45),
  leftShoulderZ: 0,
  leftElbow: deg(30),
  leftWrist: 0,
  rightHipX: 0,
  rightHipY: 0,
  rightKnee: deg(10),
  rightAnkle: 0,
  leftHipX: deg(-10),
  leftHipY: 0,
  leftKnee: deg(80),
  leftAnkle: 0,
};

// ----- Two-handed poses (key difference: ~80° spine tilt at release) -----

export const TWO_HANDED_STANCE: PoseKeyframe = {
  ...ONE_HANDED_STANCE,
  spineTiltX: deg(25),  // slightly more forward at stance
  // Both hands hold the ball
  rightShoulderX: deg(25),
  rightShoulderY: deg(-5),
  leftShoulderX: deg(25),
  leftShoulderY: deg(5),
};

export const TWO_HANDED_RELEASE: PoseKeyframe = {
  ...ONE_HANDED_RELEASE,
  spineTiltX: deg(80),  // extreme forward lean — THE signature two-handed feature
  spineTiltZ: deg(5),
  hipRotation: deg(-15),  // more hip drive
  // Left (support) hand still on ball until very end
  leftShoulderX: deg(-15),
  leftShoulderY: deg(25),
  leftElbow: deg(30),
};

// ----- Pose lookup table -----

export const POSES: Record<string, PoseKeyframe> = {
  "one-handed:stance": ONE_HANDED_STANCE,
  "one-handed:backswing-peak": ONE_HANDED_BACKSWING_PEAK,
  "one-handed:release": ONE_HANDED_RELEASE,
  "one-handed:follow-through": ONE_HANDED_FOLLOW_THROUGH,
  "two-handed:stance": TWO_HANDED_STANCE,
  "two-handed:release": TWO_HANDED_RELEASE,
  // Add more as scene-building sessions need them
};

export function getPose(style: string, pose: string): PoseKeyframe {
  const key = `${style}:${pose}`;
  return POSES[key] ?? POSES["one-handed:stance"];
}
```

### Step 3: The Primitive Bowler Component

**File:** `src/components/3d/assets/figure/primitive-bowler.tsx`

This is the main component. It reads the current pose from the pose library, applies any prop overrides (spineTilt etc.), and renders the figure as a tree of grouped primitives where each group represents a joint.

The hierarchy:
```
<group> (figure root — positioned and rotated as a whole)
  <group rotation={[spineTiltX, hipRotation, spineTiltZ]}> (spine/torso)
    <torso mesh>
    <head>
    <group position={leftShoulder} rotation={leftShoulderAngles}> (left shoulder)
      <upper arm mesh>
      <group position={leftElbow} rotation={[leftElbowAngle, 0, 0]}> (left elbow)
        <forearm mesh>
        <group position={leftWrist}> (left wrist)
          <hand mesh>
        </group>
      </group>
    </group>
    <group position={rightShoulder} rotation={rightShoulderAngles}> (right shoulder)
      ... same pattern ...
    </group>
  </group>
  <group position={leftHip} rotation={leftHipAngles}> (left hip)
    <upper leg mesh>
    <group position={leftKnee} rotation={[leftKneeAngle, 0, 0]}>
      <lower leg mesh>
      <group position={leftAnkle}>
        <foot mesh>
      </group>
    </group>
  </group>
  <group position={rightHip} ...>
    ... same pattern ...
  </group>
</group>
```

Key implementation details:
- Every limb mesh is positioned with its ORIGIN at the parent joint so rotating the parent group rotates the entire downstream chain correctly.
- Capsule geometry for torso (use drei's `<RoundedBox>` as an approximation if capsule isn't available).
- Cylinder geometry for limbs, positioned so one end is at the parent joint.
- Sphere for head and joints.
- All primitives use `meshStandardMaterial` with the figure color, roughness 0.7, metalness 0.

Here's the skeleton — the agent filling this in should complete the full tree:

```tsx
"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  FIGURE_HEIGHT,
  HEAD_RADIUS,
  TORSO_HEIGHT,
  TORSO_WIDTH,
  TORSO_DEPTH,
  UPPER_ARM_LENGTH,
  UPPER_ARM_RADIUS,
  FOREARM_LENGTH,
  FOREARM_RADIUS,
  HAND_RADIUS,
  UPPER_LEG_LENGTH,
  UPPER_LEG_RADIUS,
  LOWER_LEG_LENGTH,
  LOWER_LEG_RADIUS,
  FOOT_LENGTH,
  FOOT_HEIGHT,
  JOINT_RADIUS,
  SHOULDER_OFFSET_X,
  SHOULDER_OFFSET_Y,
  HIP_OFFSET_X,
  HIP_OFFSET_Y,
  DEFAULT_FIGURE_COLOR,
} from "./figure-constants";
import { getPose, type PoseKeyframe } from "./poses";

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
  style?: BowlerStyle;
  handedness?: Handedness;
  pose?: BowlerPose;
  phase?: number;
  spineTilt?: number;
  kneeFlex?: number;
  shoulderRotation?: number;
  hipRotation?: number;
  showJoints?: boolean;
  showSpineAngle?: boolean;
  showBallPath?: boolean;
  color?: string;
  isGhost?: boolean;
}

export function PrimitiveBowler({
  style = "one-handed",
  handedness = "right",
  pose = "stance",
  spineTilt,
  kneeFlex,
  hipRotation,
  color = DEFAULT_FIGURE_COLOR,
  isGhost = false,
}: BowlerProps) {
  // Resolve the active pose keyframe
  const keyframe = useMemo(() => {
    const base = getPose(style, pose);
    // Apply prop overrides on top of the base keyframe
    return {
      ...base,
      spineTiltX: spineTilt !== undefined ? (spineTilt * Math.PI) / 180 : base.spineTiltX,
      hipRotation: hipRotation !== undefined ? (hipRotation * Math.PI) / 180 : base.hipRotation,
      rightKnee: kneeFlex !== undefined ? (kneeFlex * Math.PI) / 180 : base.rightKnee,
      leftKnee: kneeFlex !== undefined ? (kneeFlex * Math.PI) / 180 : base.leftKnee,
    };
  }, [style, pose, spineTilt, kneeFlex, hipRotation]);

  const matOpacity = isGhost ? 0.5 : 1.0;
  const legYOffset = UPPER_LEG_LENGTH + LOWER_LEG_LENGTH;  // feet on ground

  return (
    <group position={[0, legYOffset, 0]}>
      {/* Spine/torso rotation */}
      <group
        rotation={[keyframe.spineTiltX, keyframe.hipRotation, keyframe.spineTiltZ]}
      >
        {/* Torso */}
        <Torso color={color} opacity={matOpacity} />

        {/* Head */}
        <mesh position={[0, TORSO_HEIGHT / 2 + HEAD_RADIUS + 0.02, 0]}>
          <sphereGeometry args={[HEAD_RADIUS, 24, 24]} />
          <meshStandardMaterial
            color={color}
            roughness={0.7}
            opacity={matOpacity}
            transparent={isGhost}
          />
        </mesh>

        {/* Right arm chain */}
        <group position={[SHOULDER_OFFSET_X, SHOULDER_OFFSET_Y, 0]}>
          <ArmChain
            shoulderX={keyframe.rightShoulderX}
            shoulderY={keyframe.rightShoulderY}
            shoulderZ={keyframe.rightShoulderZ}
            elbow={keyframe.rightElbow}
            wrist={keyframe.rightWrist}
            color={color}
            opacity={matOpacity}
            isGhost={isGhost}
          />
        </group>

        {/* Left arm chain */}
        <group position={[-SHOULDER_OFFSET_X, SHOULDER_OFFSET_Y, 0]}>
          <ArmChain
            shoulderX={keyframe.leftShoulderX}
            shoulderY={keyframe.leftShoulderY}
            shoulderZ={keyframe.leftShoulderZ}
            elbow={keyframe.leftElbow}
            wrist={keyframe.leftWrist}
            color={color}
            opacity={matOpacity}
            isGhost={isGhost}
            mirror
          />
        </group>
      </group>

      {/* Right leg chain — legs are OUTSIDE the spine rotation group
          because legs anchor the figure to the ground, they don't
          rotate with the torso */}
      <group position={[HIP_OFFSET_X, HIP_OFFSET_Y, 0]}>
        <LegChain
          hipX={keyframe.rightHipX}
          hipY={keyframe.rightHipY}
          knee={keyframe.rightKnee}
          ankle={keyframe.rightAnkle}
          color={color}
          opacity={matOpacity}
          isGhost={isGhost}
        />
      </group>

      {/* Left leg chain */}
      <group position={[-HIP_OFFSET_X, HIP_OFFSET_Y, 0]}>
        <LegChain
          hipX={keyframe.leftHipX}
          hipY={keyframe.leftHipY}
          knee={keyframe.leftKnee}
          ankle={keyframe.leftAnkle}
          color={color}
          opacity={matOpacity}
          isGhost={isGhost}
          mirror
        />
      </group>
    </group>
  );
}

// ----- Subcomponents: Torso, ArmChain, LegChain -----

function Torso({ color, opacity }: { color: string; opacity: number }) {
  return (
    <mesh>
      {/* Simple rounded box for torso */}
      <boxGeometry args={[TORSO_WIDTH, TORSO_HEIGHT, TORSO_DEPTH]} />
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        opacity={opacity}
        transparent={opacity < 1}
      />
    </mesh>
  );
}

function ArmChain(props: {
  shoulderX: number;
  shoulderY: number;
  shoulderZ: number;
  elbow: number;
  wrist: number;
  color: string;
  opacity: number;
  isGhost: boolean;
  mirror?: boolean;
}) {
  const { shoulderX, shoulderY, shoulderZ, elbow, color, opacity, isGhost, mirror } = props;
  const xSign = mirror ? -1 : 1;

  return (
    <group rotation={[shoulderX, shoulderY * xSign, shoulderZ * xSign]}>
      {/* Shoulder joint */}
      <mesh>
        <sphereGeometry args={[JOINT_RADIUS, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.7} opacity={opacity} transparent={isGhost} />
      </mesh>

      {/* Upper arm — hangs downward from shoulder */}
      <mesh position={[0, -UPPER_ARM_LENGTH / 2, 0]}>
        <cylinderGeometry args={[UPPER_ARM_RADIUS, UPPER_ARM_RADIUS, UPPER_ARM_LENGTH, 12]} />
        <meshStandardMaterial color={color} roughness={0.7} opacity={opacity} transparent={isGhost} />
      </mesh>

      {/* Elbow joint */}
      <group position={[0, -UPPER_ARM_LENGTH, 0]} rotation={[elbow, 0, 0]}>
        <mesh>
          <sphereGeometry args={[JOINT_RADIUS, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.7} opacity={opacity} transparent={isGhost} />
        </mesh>

        {/* Forearm */}
        <mesh position={[0, -FOREARM_LENGTH / 2, 0]}>
          <cylinderGeometry args={[FOREARM_RADIUS, FOREARM_RADIUS, FOREARM_LENGTH, 12]} />
          <meshStandardMaterial color={color} roughness={0.7} opacity={opacity} transparent={isGhost} />
        </mesh>

        {/* Hand */}
        <mesh position={[0, -FOREARM_LENGTH, 0]}>
          <sphereGeometry args={[HAND_RADIUS, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.7} opacity={opacity} transparent={isGhost} />
        </mesh>
      </group>
    </group>
  );
}

function LegChain(props: {
  hipX: number;
  hipY: number;
  knee: number;
  ankle: number;
  color: string;
  opacity: number;
  isGhost: boolean;
  mirror?: boolean;
}) {
  const { hipX, hipY, knee, color, opacity, isGhost, mirror } = props;
  const xSign = mirror ? -1 : 1;

  return (
    <group rotation={[hipX, hipY * xSign, 0]}>
      {/* Hip joint */}
      <mesh>
        <sphereGeometry args={[JOINT_RADIUS, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.7} opacity={opacity} transparent={isGhost} />
      </mesh>

      {/* Upper leg */}
      <mesh position={[0, -UPPER_LEG_LENGTH / 2, 0]}>
        <cylinderGeometry args={[UPPER_LEG_RADIUS, UPPER_LEG_RADIUS, UPPER_LEG_LENGTH, 12]} />
        <meshStandardMaterial color={color} roughness={0.7} opacity={opacity} transparent={isGhost} />
      </mesh>

      {/* Knee joint */}
      <group position={[0, -UPPER_LEG_LENGTH, 0]} rotation={[knee, 0, 0]}>
        <mesh>
          <sphereGeometry args={[JOINT_RADIUS, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.7} opacity={opacity} transparent={isGhost} />
        </mesh>

        {/* Lower leg */}
        <mesh position={[0, -LOWER_LEG_LENGTH / 2, 0]}>
          <cylinderGeometry args={[LOWER_LEG_RADIUS, LOWER_LEG_RADIUS, LOWER_LEG_LENGTH, 12]} />
          <meshStandardMaterial color={color} roughness={0.7} opacity={opacity} transparent={isGhost} />
        </mesh>

        {/* Foot */}
        <mesh position={[0, -LOWER_LEG_LENGTH - FOOT_HEIGHT / 2, FOOT_LENGTH / 4]}>
          <boxGeometry args={[UPPER_LEG_RADIUS * 2, FOOT_HEIGHT, FOOT_LENGTH]} />
          <meshStandardMaterial color={color} roughness={0.7} opacity={opacity} transparent={isGhost} />
        </mesh>
      </group>
    </group>
  );
}
```

### Step 4: Public Interface

**File:** `src/components/3d/assets/figure/index.tsx`

```tsx
export { PrimitiveBowler as Bowler } from "./primitive-bowler";
export type { BowlerProps, BowlerStyle, BowlerPose, Handedness } from "./primitive-bowler";
export { POSES, getPose } from "./poses";
export type { PoseKeyframe } from "./poses";
```

### Step 5: Update Prototype Scene for Figure Verification

Add a figure to the prototype scene temporarily so you can visually verify each pose. Add Leva controls for pose selection, style, and the mechanical overrides.

```tsx
import { Bowler } from "@/components/3d/assets/figure";

// Inside PrototypeScene:
const { showBowler, bowlerStyle, bowlerPose, bowlerSpineTilt } = useControls("Bowler Figure", {
  showBowler: false,
  bowlerStyle: { value: "one-handed", options: ["one-handed", "two-handed"] },
  bowlerPose: {
    value: "stance",
    options: ["stance", "backswing-peak", "release", "follow-through"],
  },
  bowlerSpineTilt: { value: 0, min: 0, max: 110, step: 5 },
});

// In the JSX:
{showBowler && (
  <group position={[2, 0, -1.5]}>
    <Bowler
      style={bowlerStyle as BowlerStyle}
      pose={bowlerPose as BowlerPose}
      spineTilt={bowlerSpineTilt || undefined}
    />
  </group>
)}
```

Place the figure to the right of the ball/pins so it doesn't overlap.

### Step 6: Verify

- `npx tsc --noEmit` clean
- `npm run build` passes
- `/learn/prototypes` renders the figure when toggled
- Cycle through poses in the Leva dropdown — each should visibly differ
- Switch style to two-handed — spine tilt should dramatically increase at release
- Drag the spineTilt slider — figure should lean forward more as it increases

### Step 7: Commit (do NOT push)

```
feat: figure asset — primitive bowler with pose keyframes

Implements the Figure asset at src/components/3d/assets/figure/ following
the "scientific diagram" approach from spec 09. Capsule/cylinder/sphere
primitives arranged as an articulated joint hierarchy.

Poses implemented (one-handed and two-handed variants):
- stance, backswing-peak, release, follow-through

Props implemented:
- style, handedness, pose, color, isGhost
- spineTilt, kneeFlex, hipRotation overrides

Props stubbed for future sessions:
- phase (pose interpolation)
- showJoints, showSpineAngle, showBallPath visual helpers
- approach step poses (step-1 through step-4, pushaway, forward-swing)

Unlocks ~17 content sections across Ch 3 (Approach), Ch 4 (Swing),
Ch 5 (Release), Ch 12 (Two-Handed).

Prototype scene updated with "Bowler Figure" Leva folder for visual verification.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

---

## Part 6: Scope Discipline

DO build:
- Body constants, pose library, primitive bowler component, index
- 4 keyframed poses per style (stance, backswing-peak, release, follow-through)
- Override support for spine tilt, knee flex, hip rotation
- Prototype scene integration for verification

DO NOT build:
- Smooth pose interpolation (`phase` prop) — future
- Approach step animations (step-1 through step-4) — future
- Visual helpers (joint highlights, spine protractor, ball path traces) — future
- Scene components for Chapters 3, 4, 5, 12 — that's doc 13's job
- A ball in the figure's hand — scenes handle that by positioning the Ball component near the figure's hand
- IK solver — explicitly rejected in spec 09
- Ready Player Me / Mixamo integration — explicitly rejected
- Face, hair, clothing, fingers

---

## Part 7: Common Pitfalls

### Pitfall 1: Getting joint hierarchy rotations wrong

The single biggest source of bugs is parent/child rotation ordering. Rules:
- The group at a joint should be positioned WHERE the joint is in the parent's coordinate space
- The group's rotation represents how much the downstream chain rotates at that joint
- The mesh of the limb goes INSIDE the joint's rotation group, positioned so its end at the joint is at `[0, 0, 0]`

If an arm looks like it's sticking out of the torso at a weird angle, you probably have the rotation axis wrong. Remember: X = pitch (fore/aft), Y = yaw (side-to-side), Z = roll (around its own long axis).

### Pitfall 2: Legs at origin, not below torso

The figure's origin point should be at the ground (feet). That's why the outer group in `PrimitiveBowler` uses `position={[0, legYOffset, 0]}`. Legs extend DOWN from their hip joints, so `-UPPER_LEG_LENGTH / 2` positions the leg cylinder correctly below the hip.

### Pitfall 3: Mirroring the left side

For the left arm and left leg, the rotation directions for shoulder yaw, hip yaw, etc. need to flip. The `mirror` prop on `ArmChain` and `LegChain` handles this with `const xSign = mirror ? -1 : 1` applied to the yaw angles.

If both arms swing forward together like a zombie, you probably forgot to mirror one side.

### Pitfall 4: boxGeometry and cylinderGeometry are Y-aligned by default

A cylinder's "up" is the Y axis. A box's sides are along all three axes. When you position a cylinder limb at `[0, -LENGTH/2, 0]`, its top face is at Y=0 (the joint) and bottom face is at `Y=-LENGTH`. That's what you want for a limb hanging from a joint.

### Pitfall 5: Don't use real human proportions — use readable proportions

Real human limbs are roughly 0.28m for upper arm, 0.25m for forearm, 0.42m for upper leg, etc. These work but create a figure that looks TINY compared to the bowling ball (which is 0.108m radius — the ball is bigger than the hand). This is correct. If you want the figure to read better in preview, either stand the camera back or put the figure at a different origin.

Don't scale the figure up to 2m tall "just so it looks right with the ball." Keep proportions real. Scenes handle framing.

---

## Part 8: Verification Checklist

- [ ] All files in `src/components/3d/assets/figure/` created
- [ ] `BowlerProps` interface matches Part 3
- [ ] At least 4 poses in the pose library per style
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` succeeds
- [ ] `/learn/prototypes` shows the figure when "Show Bowler" is enabled
- [ ] Cycling through poses visibly changes the figure
- [ ] Switching to two-handed at "release" shows dramatic ~80° spine tilt
- [ ] Spine tilt slider smoothly overrides the pose default
- [ ] No body parts clipping through each other in stance pose
- [ ] No errors in browser console
- [ ] Ball and pins still work (regression)
- [ ] One commit, NOT pushed

---

## Part 9: First Prompt for the Fresh Session

```
Read docs/specs/11-SESSION-FIGURE-ASSET.md fully. That's your complete briefing.
After reading it, read the files it references (spec 09 on the Figure section,
spec 07 for the figure-dependent scenes, the existing pins asset for the pattern,
and biomechanics-and-form.md sections 1-6 for the actual body angles).

Then build the Figure asset at src/components/3d/assets/figure/ following the
primitive-capsule approach from spec 09 (scientific diagram, not character).
Implement the 4 core poses (stance, backswing-peak, release, follow-through)
for both one-handed and two-handed styles.

Verify on /learn/prototypes with the Leva controls. Commit with a clear message.
Do NOT push — I'll review first.

Do not build scene components, do not install new packages, do not attempt
smooth animation or IK.
```
