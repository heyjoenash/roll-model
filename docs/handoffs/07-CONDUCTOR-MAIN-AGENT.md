# Handoff 07 — Conductor / Main Agent (Continuous Orchestrator Role)

> **Status**: READY
> **Type**: Continuous orchestrator role (NOT a single-purpose session)
> **Estimated duration**: Recurring — re-invoke whenever you want forward progress between dedicated sessions
> **Output**: Variable per session — sub-features built, STUBs promoted, STATUS updated, bugs fixed, docs maintained
> **Created**: 2026-04-13

---

## Quick Header

| Field | Value |
|-------|-------|
| **Session ID** | Handoff 07 |
| **Session type** | **Continuous orchestrator** (re-invoked between dedicated sessions) |
| **Role** | Tech Lead / Project Conductor / Main Agent |
| **Files touched** | Variable — depends on what work the conductor picks up |
| **Asset dependencies** | None (depends on the specific sub-feature being built) |
| **PRD requirements served** | All FRs, NFR-5, NFR-6, all milestones, risks R-2, R-3, R-10 |
| **PRD milestone advanced** | Variable — usually whichever milestone is currently active |
| **Stop condition** | After each unit of work, commit and either stop OR pick the next item from the decision tree |
| **Parallel-safe with** | All other handoffs IF the parallel-safety rules in Part 4 are followed |

---

## Part 1: Role Definition

### What the conductor IS

The conductor is the **continuous tech-lead role** that pushes Roll Model forward by handling all the work that doesn't fit into any specific single-purpose session handoff. It runs in its own dedicated context window in parallel with whatever other sessions are active.

The conductor handles:
- **Sub-feature builds** for components that don't fit any standard handoff (Lane oil overlay shader, BallPath component, Pin Action animation, Scorecard, Ball cutaway/coverstock/axis-arrow enhancements)
- **STUB-to-handoff promotion** when a roadmap entry's dependencies are met
- **STATUS keeping** — updating `docs/STATUS.md` and `docs/handoffs/00-MASTER-ROADMAP.md` after each session ships
- **Bug fixing** for issues that emerge during session execution
- **Documentation hygiene** — keeping specs, indexes, glossary, READMEs current
- **Architecture stewardship** — identifying refactoring needs as the project grows (scene-switcher will not scale to 50 cases)
- **Cross-session integration validation** — verifying that work shipped by session X actually composes with work shipped by session Y
- **Blocker resolution** — un-sticking sessions that hit unexpected problems

### What the conductor IS NOT

- **Not a content writer** — content batches are dedicated content batch handoffs (01, 06, future content batches)
- **Not a major asset builder** — Lane, Figure, Pins, Ball assets are dedicated asset handoffs (02, 05, etc.). The conductor builds SUB-features within those assets, not the assets themselves.
- **Not a chapter-scale scene builder** — a full chapter's worth of scenes is a scene-building handoff (04, etc.)
- **Not a unilateral decision maker** — architectural choices that contradict the PRD must be discussed with the user first
- **Not a pusher** — the conductor commits but NEVER pushes to main without explicit user approval

### Why the conductor role exists

Without it, the project would be stuck in a frustrating loop: a content batch ships, but STATUS isn't updated. An asset session needs a sub-feature that doesn't have its own handoff, so the asset session has to scope-creep to build it, blowing its time estimate. A scene-building session hits a bug in the underlying asset and has to fix it, contaminating its scope. A STUB in the roadmap is "ready" but nobody promotes it to a full handoff, so the next session has nothing to grab.

The conductor is the mortar between the bricks. The dedicated handoffs (01-06) are the bricks. Without mortar, the wall falls down.

---

## Part 2: Required Reading (Every Conductor Session)

When starting a fresh conductor session, read these in order BEFORE deciding what to work on:

### Always (~15-20 min total)

1. **`docs/STATUS.md`** (~3 min)
   - Current state of the project
   - What's done, what's in progress, what's next
   - Recent commits
   - Build/deploy state
   - Blockers

2. **`docs/handoffs/00-MASTER-ROADMAP.md`** (~5 min)
   - Full path to v1.0 with all 34 sessions
   - Status of each entry (✅ DONE, 🟢 READY, 🟡 STUB, 🔴 BLOCKED)
   - Sub-features list — which ones might need building this session

3. **`docs/specs/14-PRD.md`** (~5-10 min, every 3-4 conductor sessions)
   - Vision, personas, milestones, definition of done
   - Out-of-scope hard boundaries (so you don't accidentally build something we shouldn't)
   - Risk register

4. **`git log --oneline -15`** (~1 min)
   - What's been shipped recently in any window
   - Authors and commit messages

5. **`git status`** (~1 min, READ-ONLY — don't make changes based on it yet)
   - What's uncommitted in the current working copy
   - **Important**: If you see uncommitted changes that aren't from your own conductor work, another session may be running in this checkout. STOP and ask the user before touching anything.

### Conditionally

- **`docs/handoffs/README.md`** — if you need to refresh on the parallel-safety matrix
- **`docs/handoffs/{XX}-{NAME}.md`** — if you need to understand what a recently-shipped session built
- **`docs/specs/09-ASSET-ARCHITECTURE.md`** — when working on a sub-feature
- **`docs/specs/07-INTERACTION-BLUEPRINTS.md`** — when promoting a scene-building STUB
- **`docs/GLOSSARY.md`** — if working on content review
- **`docs/README.md`** — if you need to know where a doc belongs

---

## Part 3: The Daily Workflow Decision Tree

When you start a conductor session, follow this decision tree to pick what to work on:

```
START
│
├─ Did you read STATUS.md and the recent git log?
│  └─ NO → Go back. You can't decide what to work on without context.
│  └─ YES ↓
│
├─ Are there finished sessions (commits in main) whose STATUS isn't reflecting them?
│  └─ YES → Run Playbook G (STATUS Update). 5-15 min. Always do this first.
│           Updates make every other decision more reliable.
│  └─ NO ↓
│
├─ Is there an active session blocked by something the conductor can fix?
│  └─ YES → Diagnose and fix it (small commit). HIGHEST PRIORITY — unblocks running work.
│  └─ NO ↓
│
├─ Has the user asked for something specific in this session?
│  └─ YES → Do that.
│  └─ NO ↓
│
├─ Is there a STUB whose dependencies just became met (new commits unblocked it)?
│  └─ YES → Run Playbook H (STUB Promotion). ~1-2h.
│  └─ NO ↓
│
├─ Is there a sub-feature blocking an upcoming session you can build now?
│  └─ YES → Run the matching playbook (A, B, C, D, or E). ~2-7h.
│  └─ NO ↓
│
├─ Is the dev server rendering correctly? Console errors?
│  └─ NO → Diagnose and fix
│  └─ YES ↓
│
├─ Has documentation drifted? (STATUS, INDEX, ROADMAP, README out of sync)
│  └─ YES → Reconcile. Small commit.
│  └─ NO ↓
│
├─ Is scene-switcher.tsx getting unwieldy? (>15 manual cases)
│  └─ YES → Run Playbook F (Scene-Switcher Refactor)
│  └─ NO ↓
│
├─ Is there a low-hanging Ball component enhancement that hasn't been built yet?
│  └─ YES → Run Playbook D (one of D1, D2, or D3)
│  └─ NO ↓
│
└─ Nothing urgent? → Tell the user "all current items handled, what should I work on next?"
```

The decision tree is sequential — start at the top, work down. The first match is what you do this session. Don't try to do multiple items at once unless they're tiny (e.g., updating STATUS plus reconciling INDEX).

---

## Part 4: Parallel-Safety Rules (Critical)

The conductor MUST NOT touch files that an active session in another window is editing. Conflicts cause merge issues, lost work, and broken state. Read this section before EVERY conductor session.

### How to know what's running

1. **Read `docs/STATUS.md`** "What's In Progress" section — the source of truth for active sessions
2. **Check `git status`** in your current checkout — if there are uncommitted changes that aren't yours, another session is in this same working copy (rare but possible)
3. **Check `git log --since="2 hours ago"`** — recent commits suggest recent activity
4. **Ask the user** if uncertain — better to wait 30 seconds than corrupt state

### File ownership during active sessions

**If a content batch is running** (Handoff 01, 06, or any future content batch):
- 🚫 Off-limits: `content/**/*.mdx`, `src/lib/content-map.ts`
- ✅ Safe: everything else

**If Lane Asset session is running** (Handoff 02):
- 🚫 Off-limits: `src/components/3d/assets/lane/**`, `src/components/3d/scenes/prototype-scene.tsx`
- ✅ Safe: everything else

**If Figure Asset session is running** (Handoff 05):
- 🚫 Off-limits: `src/components/3d/assets/figure/**`, `src/components/3d/scenes/prototype-scene.tsx`
- ✅ Safe: everything else

**If Oil Pattern Data session is running** (Handoff 03):
- 🚫 Off-limits: `src/lib/oil-patterns.ts`
- ✅ Safe: everything else

**If a Scene Building session is running** (Handoff 04 or future scene sessions):
- 🚫 Off-limits: scene files for the chapter being built, `src/components/layout/scene-switcher.tsx`
- ✅ Safe: everything else

### Always-safe zones (the conductor's playground)

- **`docs/**`** — all documentation. The conductor owns docs.
- **`src/components/3d/assets/[asset]/`** for any asset NOT being touched by an active session
- **New files entirely** — if it doesn't exist yet, no conflict possible
- **`src/lib/`** files that aren't `content-map.ts` or `oil-patterns.ts` (constants, scene-context, utils)
- **`src/components/3d/`** files at the top level (bowling-ball.tsx, scene-lighting.tsx, post-processing.tsx) IF no session is currently editing them
- **`src/components/content/`** for new helper components (e.g., scorecard.tsx)

### What to do when uncertain

1. Re-read STATUS.md to verify your understanding
2. Check git status again
3. **Default to a different task** in the decision tree
4. Ask the user — "I want to touch X, is anything currently editing it?"

### NEVER do these

- Touch a file an active session has edited recently
- Stage and commit files you didn't intend to modify
- Run `git add -A` or `git add .` (always stage specific files)
- Force-push, rebase, or rewrite history
- Push to main without explicit user approval
- Pull a branch other than main

---

## Part 5: Sub-Feature Playbooks (The Conductor's Menu)

Each playbook is a smaller-scope version of a full session handoff — 2-7 hours of focused work, complete with atomic task checklists, that the conductor can execute in a single session.

### Playbook A: Lane Oil Overlay Shader (~3-4h)

**Trigger**: After Handoff 02 (Lane Asset) AND Handoff 03 (Oil Pattern Data) have both shipped
**Blocks**: M1.4 in master roadmap, all M4 chapter scenes
**Files**:
- `src/components/3d/assets/lane/oil-overlay-material.tsx` (NEW) — custom shaderMaterial
- `src/components/3d/assets/lane/oil-overlay.tsx` (EDIT — currently a stub returning null)
- `src/components/3d/assets/lane/textured-lane.tsx` (EDIT — render OilOverlay when oilPattern prop is set)

**Atomic tasks**:
- [ ] **A1.** Read `docs/specs/09-ASSET-ARCHITECTURE.md` "Asset 5: Oil Pattern Data" subsection
- [ ] **A2.** Read `src/lib/oil-patterns.ts` to understand the OilPattern data structure (39×10 density array)
- [ ] **A3.** Read `src/components/3d/assets/lane/oil-overlay.tsx` (current stub)
- [ ] **A4.** Read `src/components/3d/assets/lane/textured-lane.tsx` to understand how Phase 2 props are wired
- [ ] **A5.** Design the shader: vertex shader (pass-through with UV), fragment shader (sample density from a uniform float array or DataTexture)
- [ ] **A6.** Decide: float array uniform vs DataTexture. DataTexture is preferred for 39×10 = 390 values (uniform array limits vary by GPU).
- [ ] **A7.** Create `oil-overlay-material.tsx` using `shaderMaterial` from drei
- [ ] **A8.** Implement the fragment shader: sample the density texture by UV, output blue-tinted color with density-driven alpha
- [ ] **A9.** Update `oil-overlay.tsx` to render a plane positioned 0.001m above the lane surface with the shader material
- [ ] **A10.** The OilOverlay component accepts `pattern: OilPattern` and converts the density array into a DataTexture
- [ ] **A11.** Update `textured-lane.tsx` to render `<OilOverlay pattern={pattern} visible={oilPatternVisible} />` when the oilPattern prop is set (look up the pattern via getPattern from oil-patterns.ts)
- [ ] **A12.** Add a Leva dropdown to the prototype scene for pattern selection (only if the prototype scene is safe to edit — verify no Lane session is running)
- [ ] **A13.** Test all 11 patterns visually:
  - house-shot: high-contrast crown, heavy center
  - wolf: very short, taper
  - bear: nearly flat, no crown shape
  - badger/shark: very long, extends down the lane
  - others: various crown shapes
- [ ] **A14.** Run `npx tsc --noEmit` — clean
- [ ] **A15.** Run `npm run build` — clean
- [ ] **A16.** Commit with message: `feat: lane oil overlay shader — renders 11 PBA patterns from data file`
- [ ] **A17.** **DO NOT push.** User reviews and pushes.
- [ ] **A18.** Run Playbook G to update STATUS.md and roadmap (M1.4 → DONE)

### Playbook B: BallPath Component (~3-4h)

**Trigger**: Before M6.6 (Scene Building Chapter 6 — Ball Motion Down the Lane). Decide approximately at M5 completion.
**Blocks**: M6.6 and any future scene that needs animated ball travel
**Files**:
- `src/components/3d/assets/ball-path/index.tsx` (NEW) — public interface
- `src/components/3d/assets/ball-path/ball-path-line.tsx` (NEW) — the path visualization
- `src/components/3d/assets/ball-path/animated-ball.tsx` (NEW) — ball that travels along the path
- `src/components/3d/assets/ball-path/path-types.ts` (NEW) — shared types

**Atomic tasks**:
- [ ] **B1.** Define the path data structure in `path-types.ts`:
  ```typescript
  export type BallMotionPhase = 'skid' | 'hook' | 'roll';
  export interface PathPoint {
    board: number;       // 1-39
    distance: number;    // feet from foul line
    phase: BallMotionPhase;
  }
  export interface BallPath {
    points: PathPoint[];
    duration: number;    // seconds for full traversal
  }
  ```
- [ ] **B2.** Create `ball-path-line.tsx`:
  - Accepts `points: PathPoint[]` and renders a drei `<Line>` along them
  - Color-coded segments: skid blue, hook amber, roll green (use ZONE_COLORS from scene-lighting or define shared constants)
  - Accepts opacity, lineWidth props
- [ ] **B3.** Convert path points (board, distance) to 3D coordinates using `boardToX` and `LANE_LENGTH_M` from `src/components/3d/assets/lane/lane-constants.ts`
- [ ] **B4.** Create `animated-ball.tsx`:
  - Accepts `points`, `duration`, `playing` (boolean), `onComplete` (callback)
  - Uses `useFrame` to lerp a ball mesh along the path over `duration` seconds
  - Imports `<BowlingBall>` from `src/components/3d/bowling-ball.tsx`
  - Pass through ball props (rpm, color, etc.)
- [ ] **B5.** Create `index.tsx` exporting `<BallPath>` (a composite of line + animated ball) and the types
- [ ] **B6.** Add Leva controls in the prototype scene for testing (only if prototype scene is safe to edit):
  - `playPath` toggle
  - `pathDuration` slider (1-10 seconds)
- [ ] **B7.** Test with a hardcoded path (e.g., start board 20, hook to board 8 at 40ft, return to board 17 at 60ft)
- [ ] **B8.** Verify the line renders, the ball animates along it, color zones are visible
- [ ] **B9.** Run tsc + build
- [ ] **B10.** Commit: `feat: ball-path asset — animated ball travel along multi-phase path`
- [ ] **B11.** Run Playbook G to update STATUS.md

### Playbook C: Pin Action Animation (~5-7h, more complex)

**Trigger**: Before M3.3 (Scene Building Chapter 8 — Strike scenes). M3 cannot start without this.
**Blocks**: M3 entirely, especially M3.3
**Approach**: Kinematic (predefined keyframes) NOT physics simulation. Real physics is too expensive and unpredictable.
**Files**:
- `src/components/3d/assets/pins/pin-action-animation.tsx` (NEW) — keyframe-driven animation component
- `src/components/3d/assets/pins/strike-keyframes.ts` (NEW) — pre-computed pin trajectories for strike sequences
- `src/components/3d/assets/pins/index.tsx` (EDIT — add the new exports)

**Atomic tasks**:
- [ ] **C1.** Read `docs/research/strike-physics-and-scoring-science.md` §3 for the chain reaction order:
  - Ball directly hits 1, 3, 5, 9 (right-handed)
  - 1 → 2 → 4 → 7 (left chain)
  - 3 → 6 → 10 (right chain)
  - 5 → 8 (middle chain)
  - 9 → 9 falls direct
- [ ] **C2.** Define the keyframe data structure in `strike-keyframes.ts`:
  ```typescript
  export interface PinKeyframe {
    time: number;          // 0-1, fraction through the animation
    position: [number, number, number];
    rotation: [number, number, number];
    fallen: boolean;
  }
  export interface StrikeSequence {
    name: string;          // e.g. "standard-pocket-strike"
    duration: number;      // seconds
    pinKeyframes: PinKeyframe[][];  // [pinIndex 0-9][keyframe index]
  }
  ```
- [ ] **C3.** Hand-craft the "standard pocket strike" sequence:
  - Pin 1 (head pin): standing at t=0, struck at t=0.0, falls forward over time
  - Pin 3: struck at t=0.05 (after pin 1 fell), tips right
  - Pin 5: struck at t=0.1
  - Pin 9: struck at t=0.15
  - Pin 2: struck at t=0.1 (by pin 1 chain), tips left
  - Pin 4: struck at t=0.18 (by pin 2 chain)
  - Pin 7: struck at t=0.25 (by pin 4 chain)
  - Pin 6: struck at t=0.18 (by pin 3 chain)
  - Pin 10: struck at t=0.28 (by pin 6 chain)
  - Pin 8: struck at t=0.22 (by pin 5 chain)
  - Each keyframe: starting position, slight rotation, then fallen position (lying on side, scattered slightly)
- [ ] **C4.** Create `pin-action-animation.tsx`:
  - Accepts `time: number` (0-1)
  - Accepts `sequence: StrikeSequence` (default to standard pocket strike)
  - Renders 10 pins at their interpolated positions
  - Uses `useFrame` to interpolate between keyframes based on the input `time`
  - Reuses `<LathePin>` for the pin geometry
- [ ] **C5.** Add a play/pause/scrub control via React state or expose props
- [ ] **C6.** Optionally add a "playing" prop that auto-advances `time` 0→1 over `duration` seconds
- [ ] **C7.** Update `src/components/3d/assets/pins/index.tsx` to export `<PinActionAnimation>` and the types
- [ ] **C8.** Test in the prototype scene (if safe to edit): play the strike sequence, scrub backward, slow-mo
- [ ] **C9.** Verify the chain reaction looks plausible — pins fall in the right order, end up scattered, no clipping
- [ ] **C10.** Document the keyframe format in a comment so future contributors can add other sequences (Brooklyn strike, flat 10 leave, etc.)
- [ ] **C11.** Run tsc + build
- [ ] **C12.** Commit: `feat: pin action animation — kinematic strike chain reaction sequence`
- [ ] **C13.** Run Playbook G

### Playbook D: Ball Component Enhancements (~2h each, 3 sub-features)

**Trigger**: Decide before M2.2 (Scene Building Chapter 2) finishes. Each sub-feature is independent.
**Files**: `src/components/3d/bowling-ball.tsx` (EDIT — add new optional props)

**Important**: The Ball component is a top-level file at `src/components/3d/bowling-ball.tsx` (NOT in the assets folder yet). Verify no other session is editing it before touching.

#### Sub-feature D1: Coverstock material variants (~2h)

- [ ] **D1.1.** Read the current `bowling-ball.tsx` to understand the existing material setup
- [ ] **D1.2.** Add a `coverstock?: 'plastic' | 'urethane' | 'reactive-solid' | 'reactive-pearl' | 'reactive-hybrid'` prop to BowlingBallProps
- [ ] **D1.3.** Define a preset map outside the component:
  ```typescript
  const COVERSTOCK_PRESETS = {
    plastic:           { roughness: 0.05, metalness: 0.0, clearcoat: 1.0, clearcoatRoughness: 0.05 },
    urethane:          { roughness: 0.25, metalness: 0.05, clearcoat: 0.6, clearcoatRoughness: 0.15 },
    'reactive-solid':  { roughness: 0.45, metalness: 0.0, clearcoat: 0.3, clearcoatRoughness: 0.4 },
    'reactive-pearl':  { roughness: 0.15, metalness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.1 },
    'reactive-hybrid': { roughness: 0.3, metalness: 0.1, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  };
  ```
- [ ] **D1.4.** When `coverstock` prop is set, override the default roughness/metalness/clearcoat values
- [ ] **D1.5.** Test by switching props in the prototype scene (if safe to edit)
- [ ] **D1.6.** Commit: `feat: ball component — coverstock material variants`

#### Sub-feature D2: Cutaway visualization (~2h)

- [ ] **D2.1.** Add `showCutaway?: boolean` and `cutawayAmount?: number` (0-1) props
- [ ] **D2.2.** Decide approach: clipping plane (THREE.Plane + clippingPlanes on material) OR partial sphere geometry (segment with phiStart/phiLength)
- [ ] **D2.3.** Implement cutaway: when showCutaway is true, slice the ball geometry to reveal interior
- [ ] **D2.4.** Add a simple core mesh inside (lightbulb shape via Lathe geometry, different color like orange)
- [ ] **D2.5.** Test in prototype scene
- [ ] **D2.6.** Commit: `feat: ball component — cutaway visualization with visible core`

#### Sub-feature D3: Axis arrow visualization (~1.5h)

- [ ] **D3.1.** Add `showAxisArrow?: boolean` prop (separate from existing `showAxis` red line)
- [ ] **D3.2.** Render a 3D arrow (cone + cylinder) from ball center along the spin axis
- [ ] **D3.3.** Color it red or another distinct color (#ef4444 to match existing red line)
- [ ] **D3.4.** Test in prototype scene
- [ ] **D3.5.** Commit: `feat: ball component — 3D axis arrow visualization`

### Playbook E: Scorecard Component (~3-4h)

**Trigger**: Before M2.4 (Scene Building Chapter 1) which includes the "How Scoring Works" scene
**Approach**: HTML overlay (NOT 3D). Scorecard is fundamentally a UI component, not a spatial one.
**Files**: `src/components/content/scorecard.tsx` (NEW)

**Atomic tasks**:
- [ ] **E1.** Define the props:
  ```typescript
  interface ScorecardProps {
    frames: Array<{ ball1?: number; ball2?: number; ball3?: number }>;
    scenario?: 'strike' | 'spare' | 'open' | 'turkey' | 'perfect';
    autoPlay?: boolean;
    showRunningTotal?: boolean;
  }
  ```
- [ ] **E2.** Implement traditional bowling scoring logic:
  - Strike (X): 10 + next 2 balls
  - Spare (/): 10 + next 1 ball
  - Open frame: just the pins knocked down
  - 10th frame: special — strike grants 2 bonus balls, spare grants 1 bonus ball
- [ ] **E3.** Render as a 10-frame HTML grid using Tailwind classes:
  - Each frame is a box with two ball indicators (or three for the 10th)
  - Strike = X, Spare = /, miss = number or -
  - Running total displayed below the ball indicators
- [ ] **E4.** Style to match the dark theme (use `bg-card`, `text-foreground`, `border-border` from existing Tailwind theme)
- [ ] **E5.** Add scenario presets:
  - `strike`: frame 1 = X, then waits for next 2 frames
  - `spare`: frame 1 = 7, /, then 8 → 18 total
  - `turkey`: 3 strikes in a row
  - `perfect`: 12 strikes → 300
- [ ] **E6.** Add fill-in animation: when `autoPlay` is true, frames fill in sequentially with CSS transitions
- [ ] **E7.** Export from a new file in `src/components/content/` (this is the content component folder, alongside Callout and SceneCue)
- [ ] **E8.** Test the perfect game animation visually
- [ ] **E9.** Run tsc + build
- [ ] **E10.** Commit: `feat: scorecard component — traditional bowling scoring with 10th frame logic`

### Playbook F: Scene-Switcher Refactor (~3-4h)

**Trigger**: When scene count exceeds ~15-20 (around M4 completion). Currently 3 scenes — not urgent yet.
**Files**:
- `src/components/3d/scenes/scene-registry.ts` (NEW)
- `src/components/layout/scene-switcher.tsx` (REFACTOR)

**Atomic tasks**:
- [ ] **F1.** Verify no scene-building session is currently running (this refactor touches scene-switcher)
- [ ] **F2.** Create `src/components/3d/scenes/scene-registry.ts`:
  ```typescript
  import type { ComponentType } from 'react';
  import { RevRateScene } from './rev-rate-scene';
  import { DefaultScene } from './default-scene';
  import { PrototypeScene } from './prototype-scene';
  // ... import all scenes

  export const SCENE_REGISTRY: Record<string, ComponentType> = {
    'rev-rate': RevRateScene,
    'prototype': PrototypeScene,
    // ... map all scenes
  };

  export const DEFAULT_SCENE = DefaultScene;
  ```
- [ ] **F3.** Refactor `scene-switcher.tsx` to use the registry:
  ```typescript
  import { SCENE_REGISTRY, DEFAULT_SCENE } from '@/components/3d/scenes/scene-registry';
  import { useScene } from '@/lib/scene-context';

  export function SceneSwitcher() {
    const { activeScene } = useScene();
    const Component = SCENE_REGISTRY[activeScene] ?? DEFAULT_SCENE;
    return <Component />;
  }
  ```
- [ ] **F4.** Verify all existing scenes still render correctly via the prototype sandbox and rev-rate page
- [ ] **F5.** Update `docs/specs/13-SESSION-SCENE-BUILDING.md` to document the new convention: "When you create a new scene, ALSO add it to scene-registry.ts"
- [ ] **F6.** Run tsc + build
- [ ] **F7.** Commit: `refactor: scene-switcher uses registry pattern instead of switch statement`

### Playbook G: STATUS.md and Roadmap Update (~10-15 min)

**Trigger**: After ANY session ships (any commit lands in main with a non-trivial change)
**Files**: `docs/STATUS.md`, `docs/handoffs/00-MASTER-ROADMAP.md`

**Atomic tasks**:
- [ ] **G1.** Read `docs/STATUS.md` to see current state
- [ ] **G2.** Run `git log --oneline -5` to find the new commits
- [ ] **G3.** For each new commit, identify what it shipped (read the commit message)
- [ ] **G4.** Update STATUS.md "What's Done" section with the new work
- [ ] **G5.** Update STATUS.md "What's In Progress" — remove the just-finished session
- [ ] **G6.** Update STATUS.md "What's Next (Next 3 Sessions)" — promote the next priority based on the roadmap
- [ ] **G7.** Update STATUS.md "Recent Activity" — add the new commits at the top, remove old ones (keep last 5)
- [ ] **G8.** Update STATUS.md "Last Updated" date
- [ ] **G9.** Update STATUS.md "Content sections shipped" count if applicable
- [ ] **G10.** Update STATUS.md "Phase" / "Milestone" lines if a milestone progressed
- [ ] **G11.** Open `docs/handoffs/00-MASTER-ROADMAP.md`
- [ ] **G12.** Find the matching session entry in the roadmap
- [ ] **G13.** Update its status: 🟢 READY → ✅ DONE
- [ ] **G14.** Update the milestone summary at the bottom of the roadmap
- [ ] **G15.** Commit as a small dedicated commit: `docs: status update after [session name]` (e.g., "docs: status update after content batch 1")
- [ ] **G16.** Do NOT push.

### Playbook H: STUB Promotion to Full Handoff (~1-2h per promotion)

**Trigger**: When a STUB session in the master roadmap has its dependencies met AND is approaching the queue
**Files**: `docs/handoffs/##-NEW-NAME.md` (NEW), `docs/handoffs/00-MASTER-ROADMAP.md` (EDIT), `docs/handoffs/README.md` (EDIT)

**Atomic tasks**:
- [ ] **H1.** Read the master roadmap entry for the STUB you're promoting (scope, dependencies, effort estimate)
- [ ] **H2.** Verify all dependencies are met (other sessions DONE, sub-features built)
- [ ] **H3.** Identify the relevant generic playbook in `docs/specs/`:
  - Content batch → spec 08
  - Lane asset → spec 10
  - Figure asset → spec 11
  - Oil data → spec 12
  - Scene building → spec 13
- [ ] **H4.** Read the relevant interaction blueprints in `docs/specs/07-INTERACTION-BLUEPRINTS.md` (for content/scene sessions)
- [ ] **H5.** Read the closest existing handoff (01-06) as a structural template
- [ ] **H6.** Decide the new handoff number (next available after current handoffs in the folder)
- [ ] **H7.** Create the new handoff file at `docs/handoffs/##-KEBAB-CASE-NAME.md`
- [ ] **H8.** Write the handoff with all standard parts:
  - Header table (session ID, type, effort, deps, parallel safety, PRD ref, milestone)
  - Strategic context (why this session matters, what success looks like)
  - Pre-flight reading checklist (with time estimates)
  - Voice/component API reference (if content session)
  - Atomic task checklist (Phases A-F or A-H, every micro-step a checkbox)
  - Per-section/per-component specifics
  - Cross-section quality pass
  - Single commit message template
  - Common pitfalls
  - Stop conditions
  - PRD cross-reference
  - The master prompt (copy-pasteable into a fresh window)
- [ ] **H9.** Aim for ~600-900 lines (matches the existing 01-06 handoffs)
- [ ] **H10.** Update the master roadmap: change status from 🟡 STUB → 🟢 READY, add the file link
- [ ] **H11.** Update `docs/handoffs/README.md` to add the new handoff to the index table
- [ ] **H12.** Update `docs/STATUS.md` to mention the newly READY session
- [ ] **H13.** Run tsc + build (docs-only changes, but verify nothing leaked)
- [ ] **H14.** Commit: `docs: promote roadmap entry M{X.Y} to full handoff at handoffs/##-NAME.md`

---

## Part 6: Common Scenarios & Resolutions

### Scenario 1: A content batch finished, STATUS isn't updated

**Diagnosis**: You see new commits in `git log` like "content: chapter 2 ball cluster (5 sections)" but STATUS.md still says "1 of 53 sections shipped."

**Resolution**: Run **Playbook G** (STATUS Update). 5-15 minutes. Always do this first.

### Scenario 2: Lane Asset shipped, Oil Pattern Data also shipped, but the Lane oil overlay isn't rendering anything

**Diagnosis**: You navigate to /learn/prototypes, the lane shows correctly, but when you select a pattern in Leva, nothing appears on the lane.

**Resolution**: Run **Playbook A** (Lane Oil Overlay Shader). The Lane asset shipped with `oil-overlay.tsx` as a stub returning null. The shader needs to be implemented now that the data file exists.

### Scenario 3: M3 Strike sessions are about to start but Pin Action animation doesn't exist

**Diagnosis**: User is approaching M3.3 (Scene Building Chapter 8) which needs the slow-motion chain reaction animation. The Pins asset has standing pins but no animated knockdown.

**Resolution**: Run **Playbook C** (Pin Action Animation) BEFORE the user starts M3.3. Otherwise M3.3 will be blocked or scope-creep.

### Scenario 4: Scene count just hit 18 and scene-switcher.tsx is getting messy

**Diagnosis**: `src/components/layout/scene-switcher.tsx` has 18 case statements. It's becoming a maintenance burden.

**Resolution**: Run **Playbook F** (Scene-Switcher Refactor). Implement the registry pattern.

### Scenario 5: User says "promote M4.1 to a full handoff"

**Diagnosis**: The user is approaching M4 work and wants the STUB promoted.

**Resolution**: Run **Playbook H** (STUB Promotion). Read the M4.1 entry in the roadmap, find the relevant generic playbook in specs, write the full atomic handoff.

### Scenario 6: The dev server is throwing console errors after a session merged

**Diagnosis**: You pull latest, run `npm run dev`, and the browser console shows errors that weren't there yesterday.

**Resolution**:
1. Read the error message carefully
2. Find the file/line referenced
3. If fixable in <30 minutes: fix it as a small commit (`fix: [description]`)
4. If complex: document the bug in STATUS.md "Blockers" and tell the user

### Scenario 7: Two windows want to touch content-map.ts at the same time

**Diagnosis**: Content Batch 1 is running in one window, Content Batch 2 is about to start in another window. They'll both edit content-map.ts.

**Resolution**: The conductor enforces single-writer rule for content-map.ts. Tell the user one batch must finish before the other starts. Update STATUS.md to make this explicit. Most parallel-safety conflicts are between content batches.

### Scenario 8: A new bowling term appears in some content but isn't in GLOSSARY.md

**Diagnosis**: While reviewing content for voice consistency, you find a term like "carrydown" used without definition. It's not in the glossary.

**Resolution**: Add the term to `docs/GLOSSARY.md` following the existing alphabetical format. Cross-reference the section that introduced it. Commit as `docs: glossary — add [term]`.

### Scenario 9: The roadmap and STATUS disagree about what's done

**Diagnosis**: STATUS says M2.1 is DONE but the roadmap says it's READY.

**Resolution**: `git log` is the source of truth. Find the actual commit that shipped the work. Reconcile both docs to match git history. The conductor is responsible for keeping both in sync.

### Scenario 10: A Ball component enhancement is needed mid-session by another window

**Diagnosis**: A scene-building session in another window pings you (via the user) saying "I need the Ball component to support `coverstock` prop variants."

**Resolution**: Verify no asset session is editing bowling-ball.tsx. Run **Playbook D1** (~2h). Once shipped, the scene-building session can pull and continue.

---

## Part 7: Stop Conditions

The conductor STOPS and asks the user when:

1. **An architectural decision contradicts something in the PRD.** Don't make calls that could fork the project's direction without discussion.

2. **A sub-feature scope is unclear or could go multiple ways.** Don't guess. Ask.

3. **A bug requires changes to a file an active session is editing.** Wait for that session to commit before fixing.

4. **The user explicitly hasn't approved a sub-feature being built yet.** Some sub-features might be deferred or out-of-scope — don't build speculatively.

5. **The conductor would need to push to main.** NEVER push without explicit approval. The user pushes, always.

6. **The work would take more than ~4-6 hours in one sitting.** Split across multiple conductor sessions or escalate to a dedicated handoff.

7. **Two sessions are conflicting on file ownership and the conductor can't resolve without making a judgment call.** Tell the user about the conflict. Let them decide.

8. **You're about to install a new npm package.** Always ask first. Adding dependencies is a decision, not a tactic.

9. **You're about to delete files** (other than temporary test files you just created).

10. **You're about to modify `docs/specs/01-14`** without explicit user approval. Spec docs are stable canonical references. Don't drift them mid-project.

---

## Part 8: Constraints

### The conductor NEVER

- Pushes to main (commits OK, push requires user approval)
- Modifies content (`content/**/*.mdx`) — that's content batch sessions
- Modifies any spec doc in `docs/specs/01-14` without explicit user approval
- Adds features outside the v1.0 scope (PRD §7 lists out-of-scope items)
- Installs new npm packages without user approval
- Deletes files (except temporary test files the conductor itself created)
- Renumbers handoff files (numbers are stable once assigned)
- Makes architectural changes that would conflict with spec 01 (Architecture) or spec 09 (Asset Architecture)
- Force-pushes, rebases, or rewrites git history
- Touches files that another active session is editing
- Modifies the running dev server's source files in a way that crashes the build

### The conductor ALWAYS

- Reads STATUS.md before deciding what to work on
- Updates STATUS.md after shipping work
- Commits in small, well-scoped commits with semantic messages (feat:, fix:, docs:, refactor:)
- Verifies `npx tsc --noEmit` and `npm run build` before any commit (skip the build for pure docs commits if you're confident no code leaked)
- Respects the parallel-safety matrix (Part 4)
- Documents the current state in commit messages
- Reads STATUS.md and git log at the start of every session
- Asks the user when uncertain rather than guessing

---

## Part 9: PRD Cross-Reference

The conductor role serves the PRD by ensuring nothing falls between the cracks of single-purpose handoffs. Specifically:

| PRD Reference | Conductor Contribution |
|---------------|----------------------|
| **All FRs** | Validates cross-session integration so requirements actually compose end-to-end |
| **NFR-5** (Maintainability) | Refactors when the codebase grows beyond the original architecture (scene-switcher, content-map organization, etc.) |
| **NFR-6** (Voice consistency) | Spot-checks content for voice drift between batches |
| **All Milestones M1-M7** | Promotes STUBs to handoffs so the next session is always ready when the user picks it up |
| **Risk R-2** (Voice drift across sessions) | Conducts periodic voice consistency reviews; updates GLOSSARY |
| **Risk R-3** (Asset complexity escalation) | Builds sub-features incrementally to keep asset sessions on scope |
| **Risk R-10** (Solo dev burnout / project stalls) | Reduces the cognitive load on the user by handling "everything else" between dedicated sessions |

When the conductor ships a unit of work, it should be possible to trace it back to one of these PRD references. If you can't, you might be doing speculative work outside the v1.0 scope — STOP and ask.

---

## Part 10: The Master Prompt (Copy Verbatim)

This is the exact text to paste as the FIRST MESSAGE in a fresh Claude Code session opened in `/Users/joenash/github/roll-model`. It invokes the conductor / main agent role.

---

```
You are executing the Conductor / Main Agent role for Roll Model.
The complete handoff document is at:
docs/handoffs/07-CONDUCTOR-MAIN-AGENT.md

READ THAT FILE IN FULL FIRST. It is the only set of instructions you need.

The conductor role is fundamentally different from the other handoffs
(01-06). Those are single-purpose flight plans for specific deliverables
(write a content batch, build the Lane asset, etc.). This one is a
CONTINUOUS orchestrator role that handles "everything else" between
dedicated sessions. You can be re-invoked many times across the project
lifecycle.

Your job is to push Roll Model forward by handling work that doesn't
fit any specific session handoff:
- Building sub-features (Lane oil overlay shader, BallPath component,
  Pin Action animation, Scorecard component, Ball cutaway/coverstock/
  axis-arrow enhancements)
- Promoting STUB roadmap entries to full atomic handoffs
- Refactoring infrastructure as the project grows (scene-switcher
  will not scale to 50 cases — needs a registry pattern around M4)
- Updating STATUS.md and the master roadmap after each session ships
- Fixing bugs that emerge during session execution
- Validating cross-session integration
- Maintaining documentation hygiene (specs, indexes, glossary, READMEs)

Required reading (BEFORE doing anything):
1. docs/handoffs/07-CONDUCTOR-MAIN-AGENT.md — your full briefing
2. docs/STATUS.md — current state of the project
3. docs/handoffs/00-MASTER-ROADMAP.md — full path to v1.0 with all 34
   sessions, READY/STUB/DONE status
4. docs/specs/14-PRD.md — vision, milestones, definition of done
5. Run `git log --oneline -15` to see what's shipped recently
6. Run `git status` (read-only) to see if anything is uncommitted
   from another session window in this checkout

Then follow the daily workflow decision tree in Part 3 of the handoff
to decide what to work on. The decision tree starts with "is STATUS out
of date?" (always update first if so) and ends with "pick a low-hanging
sub-feature from the menu."

The sub-feature playbooks are in Part 5 of the handoff. Each has its
own atomic task checklist:
- Playbook A: Lane Oil Overlay Shader (~3-4h)
- Playbook B: BallPath Component (~3-4h)
- Playbook C: Pin Action Animation (~5-7h)
- Playbook D: Ball Component Enhancements (~2h each, 3 sub-features)
- Playbook E: Scorecard Component (~3-4h)
- Playbook F: Scene-Switcher Refactor (~3-4h)
- Playbook G: STATUS.md Update (~10-15min — always run this after any session ships)
- Playbook H: STUB Promotion to Full Handoff (~1-2h per promotion)

CRITICAL — Parallel safety:
You're running in parallel with potentially other windows. Other
sessions may be running:
- Content Batch 1 (touches content/, content-map.ts) — currently RUNNING
- Lane Asset (touches src/components/3d/assets/lane/, prototype-scene)
- Figure Asset (touches src/components/3d/assets/figure/, prototype-scene)
- Oil Pattern Data (touches src/lib/oil-patterns.ts)
- Scene Building Chapter X (touches scene files, scene-switcher)

Read Part 4 of the handoff for the full parallel-safety matrix.
NEVER touch a file that another session might be editing. When in
doubt, ask the user or pick a different task from the decision tree.

Stop conditions are in Part 7. The big ones:
- NEVER push to main
- NEVER modify content/*.mdx (that's content batches)
- NEVER install new packages without explicit approval
- NEVER make architectural decisions that contradict the PRD
- NEVER touch files an active session is editing
- ALWAYS verify tsc clean and build clean before committing

Constraints are in Part 8. Read them — they prevent the conductor
from accidentally undermining other sessions or the PRD.

Commit work in small, well-scoped commits with semantic messages
(feat:, fix:, docs:, refactor:). After each unit of work, update
STATUS.md to reflect the new state via Playbook G.

WORKFLOW for this session:
1. Read the handoff doc (07) in full
2. Read STATUS, the master roadmap, and the recent git log
3. Apply the decision tree in Part 3
4. Announce what you plan to work on first
5. Wait for my approval before starting
6. Execute the chosen playbook (A through H)
7. Commit (do NOT push)
8. Run Playbook G if appropriate
9. Either pick the next item from the decision tree OR stop and tell me what you completed

Begin by reading the handoff doc and the required reading list.
Then announce what you plan to work on first based on the current
project state. Wait for my approval before starting.
```

---

## Part 11: How to Re-Invoke the Conductor

This handoff is unique among 01-07: it's **continuous**, not one-shot. You can re-invoke the conductor as many times as needed across the project lifecycle.

### When to start a new conductor session

- After any other session ships (STATUS update + check for blockers)
- When you want to build a sub-feature in parallel with running sessions
- When you need a STUB promoted before starting it
- When something feels stale and you want to push things forward without committing to a specific dedicated session
- When other sessions are blocked and you're not sure why
- Roughly every 3-5 dedicated sessions, just to keep documentation hygiene tight

### How to re-invoke

1. Open a fresh Claude Code window in `/Users/joenash/github/roll-model`
2. Paste the master prompt from Part 10 verbatim
3. The conductor reads the docs, decides what to work on, and announces its plan
4. You approve, it executes, it commits, you push when ready
5. Stop the session OR let it pick the next item from the decision tree

Each conductor session is bounded in scope (~2-7 hours of focused work, usually 1-2 playbook executions). Between sessions, the project state is captured in STATUS.md and the master roadmap so the next conductor session can pick up cleanly.

---

## Part 12: What This Handoff Is Not

This is not:
- A single-task flight plan (those are 01-06)
- A reference spec (those are in `docs/specs/`)
- A general "main loop" — there's no infinite loop here. Each conductor session has a defined start, work item, commit, and stop.
- An auto-pilot — the conductor still requires user approval at decision points

The conductor IS:
- A defined role with specific responsibilities and constraints
- Re-invokable as needed across the project lifecycle
- The mortar between the bricks (other handoffs)
- A way to keep the project moving without scope-creeping any single dedicated session

---

## Final Note

The single most important thing the conductor does is **update STATUS.md after each session ships**. Without this, every other session starts blind. With it, every other session knows exactly where the project stands.

If a conductor session can ONLY do one thing in its time budget, that one thing should be Playbook G. Everything else is gravy.

Take your time. Be careful. Ask when uncertain. The conductor's job is to keep the project healthy — not to be a hero.
