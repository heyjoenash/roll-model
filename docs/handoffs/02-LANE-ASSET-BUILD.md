# Handoff 02 — Lane Asset Build

> **Status**: READY
> **Type**: 3D asset build session
> **Estimated duration**: 4-6 focused hours
> **Output**: New `<Lane>` component at `src/components/3d/assets/lane/` + prototype scene integration + 1 commit
> **Created**: 2026-04-13

---

## Quick Header

| Field | Value |
|-------|-------|
| **Session ID** | Handoff 02 |
| **Session type** | 3D asset build |
| **Asset name** | Lane (textured plane with markings) |
| **Files created** | 4 new files in `src/components/3d/assets/lane/` |
| **Files modified** | `src/components/3d/scenes/prototype-scene.tsx` (verification only) |
| **Asset dependencies** | None |
| **Unlocks** | ~22 future scene components across Ch 1, 2, 6, 7, 8, 9, 11 |
| **PRD requirements served** | FR-2, FR-5, NFR-4 |
| **PRD milestone advanced** | M1 (Asset Foundation) |
| **Stop condition** | After commit, before push. User reviews, user pushes. |
| **Parallel-safe with** | Handoff 01 (Content Batch 1) — different files, no overlap |

---

## Part 1: Why This Session Matters

The Lane is the **single highest-leverage asset** after the Ball. It appears in ~22 of the 53 planned content sections — roughly 40% of all scenes. Building it now unblocks:

- **Chapter 1** (The Lane, Board Numbering — needs the lane plane)
- **Chapter 2** (Ball Motion — needs the ball traveling on a lane)
- **Chapter 6** (all 5 sections — every ball-motion scene happens on the lane)
- **Chapter 7** (all 6 sections — oil patterns layer on top of the lane)
- **Chapter 8** (all 6 sections — strike physics needs the lane + pin deck)
- **Chapter 9** (3 sections — spare angles use the lane)
- **Chapter 11** (all 3 sections — reading the lane requires the lane)

Without this asset, scene-building sessions for chapters 1, 6, 7, 8, 9, and 11 are blocked. Building it is the rate-limiting step for visual content.

This session ships **Option A** from `docs/specs/09-ASSET-ARCHITECTURE.md`: a textured plane with procedural markings (arrows, dots, foul line) and overlay layers for highlights and zones. **Not** Option B (full procedural shader) and **not** Option C (hybrid with photoreal textures) — those are future upgrades.

### What success looks like at the end of this session

Open `/learn/prototypes` and see the bowling ball + pin deck + a full 60-foot lane stretching away from the camera. Toggle controls in the Leva panel show:
- Arrow markings at 15ft (7 small triangles)
- Lane dots at 7ft (7 small circles)
- Foul line as a thin white strip
- Two gutters as dark strips
- Highlight a single board in yellow with a slider
- Show the 3 motion zones (skid blue, hook amber, roll green) with a toggle

The lane component has a stable interface that future scene components can consume: `<Lane showArrows showDots highlightBoard={10} showZones />`. When a higher-end lane model arrives later, only the implementation file changes — every scene that imports `<Lane>` upgrades automatically.

---

## Part 2: Pre-Flight Reading Checklist

Read these in this order. Do not write code until all items are checked.

### Required reading (~30 minutes total)

- [ ] **`docs/specs/09-ASSET-ARCHITECTURE.md`** (~15 min)
  - Read the "Asset 2: The Lane" section in full
  - Three prototype options laid out (A: Textured Plane, B: Full Procedural Shader, C: Hybrid)
  - **You are building Option A this session** — Option C is a future upgrade
  - Read the "Recommendation for Lane" subsection

- [ ] **`docs/specs/10-SESSION-LANE-ASSET.md`** (~10 min)
  - The generic lane-build playbook
  - Section "Implementation Steps" lists the file structure, code skeletons, and design decisions
  - This handoff is the SPECIFIC application of that GENERIC playbook with atomic checklists

- [ ] **`src/components/3d/assets/pins/`** (~5 min — read all 4 files)
  - `pin-profile.ts` — your reference for the constants file pattern
  - `lathe-pin.tsx` — your reference for a single-unit component
  - `pin-deck.tsx` — your reference for a composed component with props
  - `index.tsx` — your reference for the public interface export

### Per-step reference (consult during writing)

- [ ] `src/components/3d/scenes/prototype-scene.tsx` — to understand how scenes consume assets and to add the lane verification at the end
- [ ] `src/lib/constants.ts` — existing constants file structure (for reference, you'll create a new file in the lane folder rather than adding to this one)

### Research (consult once)

- [ ] `docs/research/lane-science-and-oil-patterns.md` §1 — USBC lane dimensions
  - Use Grep with pattern `"60 feet"` or `"lane dimensions"` to find the section
  - Use Read with offset to load just that passage (the file is too large to read whole)
  - Verify: lane is 60 feet × 41.5 inches, 39 boards, arrows at 15ft, dots at 7.5ft

---

## Part 3: The Component Interface (What You're Building)

```typescript
export interface LaneProps {
  // Camera intent hints (informational, doesn't change rendering this session)
  view?: 'overhead' | 'perspective' | 'side';

  // Markings visibility (Phase 1 — implement these)
  showArrows?: boolean;        // default true
  showDots?: boolean;          // default true
  showFoulLine?: boolean;      // default true
  showBoards?: boolean;        // default false — board lines across the surface
  showGutters?: boolean;       // default true

  // Dynamic highlights (Phase 1 — implement these)
  highlightBoard?: number;     // 1-39, lights up one board in yellow
  highlightBoardRange?: [number, number];  // e.g. [8, 12]
  highlightColor?: string;     // default "#fbbf24"

  // Zones for ball motion visualization (Phase 1 — implement these)
  showZones?: boolean;         // colors heads/midlane/backends
  zoneOpacity?: number;        // default 0.25

  // Oil pattern overlay (Phase 2 — declare in interface, leave unimplemented)
  oilPattern?: string;
  oilPatternVisible?: boolean;

  // Surface type (Phase 2 — declare in interface, leave unimplemented)
  surface?: 'wood' | 'synthetic';
}
```

**Rule**: All Phase 2 props must be DECLARED in the TypeScript interface so future scene components can use the full API. They just don't need to RENDER anything yet. Stub them out — accept the prop, do nothing with it.

---

## Part 4: Atomic Task Checklist

### Phase A — File Setup (~5 min)

- [ ] **A1.** Create directory `src/components/3d/assets/lane/` (if it doesn't exist)
- [ ] **A2.** Verify the directory was created
- [ ] **A3.** Note the 4 files you'll create in this folder: `lane-constants.ts`, `textured-lane.tsx`, `oil-overlay.tsx`, `index.tsx`

### Phase B — Constants File (~15 min)

- [ ] **B1.** Create `src/components/3d/assets/lane/lane-constants.ts`
- [ ] **B2.** Add the LANE_LENGTH_M constant (18.288 = 60 feet in meters)
- [ ] **B3.** Add LANE_WIDTH_M (1.0541 = 41.5 inches in meters)
- [ ] **B4.** Add APPROACH_LENGTH_M (4.572 = 15 feet)
- [ ] **B5.** Add BOARD_COUNT (39)
- [ ] **B6.** Add BOARD_WIDTH_M (computed from LANE_WIDTH_M / BOARD_COUNT)
- [ ] **B7.** Add GUTTER_WIDTH_M (0.2286 = 9 inches)
- [ ] **B8.** Add FOUL_LINE_Z (0)
- [ ] **B9.** Add PIN_DECK_START_Z (-LANE_LENGTH_M)
- [ ] **B10.** Add ARROW_DISTANCE_M (4.572 = 15 feet from foul line)
- [ ] **B11.** Add ARROW_BOARDS array `[5, 10, 15, 20, 25, 30, 35]`
- [ ] **B12.** Add LANE_DOTS_DISTANCE_M (2.1336 = 7 feet)
- [ ] **B13.** Add LANE_DOT_BOARDS (same as ARROW_BOARDS)
- [ ] **B14.** Add ZONE_HEADS_END_M (6.096 = 20 feet)
- [ ] **B15.** Add ZONE_MIDLANE_END_M (12.192 = 40 feet)
- [ ] **B16.** Implement `boardToX(board: number): number` helper that converts a board number (1-39) to its X coordinate (board 1 is rightmost gutter side, board 20 is center, board 39 is leftmost)
- [ ] **B17.** Use the formula: `-LANE_WIDTH_M / 2 + (clamped - 0.5) * BOARD_WIDTH_M`
- [ ] **B18.** Save the file

The complete code for this file is in `docs/specs/10-SESSION-LANE-ASSET.md` Step 1 — copy verbatim if it helps.

### Phase C — Textured Lane Component (~60-90 min)

This is the largest file. Build it in passes — get the basic plane working first, then add markings, then highlights, then zones.

#### Sub-phase C.1 — Skeleton + base lane surface

- [ ] **C1.** Create `src/components/3d/assets/lane/textured-lane.tsx`
- [ ] **C2.** Add the `"use client"` directive
- [ ] **C3.** Import all needed lane-constants
- [ ] **C4.** Define and export the `LaneProps` TypeScript interface (per Part 3 above — include both Phase 1 and Phase 2 props)
- [ ] **C5.** Define and export the `TexturedLane` function component
- [ ] **C6.** Set up default prop values: `showArrows = true`, `showDots = true`, `showFoulLine = true`, `showBoards = false`, `showGutters = true`, `highlightColor = "#fbbf24"`, `showZones = false`, `zoneOpacity = 0.25`
- [ ] **C7.** Compute `centerZ = -LANE_LENGTH_M / 2` so the lane stretches from foul line at z=0 to pins at z=-LANE_LENGTH_M
- [ ] **C8.** Render the main lane surface mesh:
  - position `[0, 0, centerZ]`
  - rotation `[-Math.PI / 2, 0, 0]`
  - `<planeGeometry args={[LANE_WIDTH_M, LANE_LENGTH_M]} />`
  - `<meshStandardMaterial color="#d4a574" roughness={0.6} metalness={0.1} />`
  - `receiveShadow`
- [ ] **C9.** Save and verify the file compiles

#### Sub-phase C.2 — Gutters

- [ ] **C10.** Inside the return, conditionally render gutters when `showGutters` is true
- [ ] **C11.** Left gutter mesh:
  - position `[-(LANE_WIDTH_M / 2 + GUTTER_WIDTH_M / 2), -0.01, centerZ]`
  - rotation `[-Math.PI / 2, 0, 0]`
  - `<planeGeometry args={[GUTTER_WIDTH_M, LANE_LENGTH_M]} />`
  - dark color (`#2a1a10`), high roughness
- [ ] **C12.** Right gutter mesh (mirror of left)
- [ ] **C13.** Save and run `npx tsc --noEmit` — should be clean

#### Sub-phase C.3 — Foul line

- [ ] **C14.** Conditionally render foul line when `showFoulLine` is true
- [ ] **C15.** Foul line mesh:
  - position `[0, 0.001, 0]` (at z=0, slightly above lane surface to avoid z-fighting)
  - rotation `[-Math.PI / 2, 0, 0]`
  - `<planeGeometry args={[LANE_WIDTH_M, 0.03]} />`
  - `<meshBasicMaterial color="#ffffff" />`

#### Sub-phase C.4 — Arrows at 15ft

- [ ] **C16.** Create a helper subcomponent `ArrowMarker({ board })` inside the same file (or below the main component)
- [ ] **C17.** ArrowMarker computes `x = boardToX(board)` and renders a small cone:
  - position `[x, 0.002, -ARROW_DISTANCE_M]`
  - rotation `[-Math.PI / 2, 0, 0]`
  - `<coneGeometry args={[0.025, 0.08, 3]} />` (3-sided cone = triangle)
  - `<meshBasicMaterial color="#8b6f47" />` (warm brown)
- [ ] **C18.** In the main component, conditionally render the 7 arrows when `showArrows` is true: `ARROW_BOARDS.map(board => <ArrowMarker key={...} board={board} />)`

#### Sub-phase C.5 — Lane dots at 7ft

- [ ] **C19.** Create a `DotMarker({ board, z })` subcomponent
- [ ] **C20.** DotMarker renders a small circle:
  - position `[boardToX(board), 0.002, z]`
  - rotation `[-Math.PI / 2, 0, 0]`
  - `<circleGeometry args={[0.01, 16]} />`
  - `<meshBasicMaterial color="#6b5636" />`
- [ ] **C21.** Conditionally render dots when `showDots` is true: `LANE_DOT_BOARDS.map(b => <DotMarker board={b} z={-LANE_DOTS_DISTANCE_M} />)`

#### Sub-phase C.6 — Board lines (the 38 separating lines)

- [ ] **C22.** Create a `BoardLines` subcomponent (no props needed)
- [ ] **C23.** Generate 38 thin vertical strips separating the 39 boards using `Array.from({ length: 38 }, (_, i) => ...)`
- [ ] **C24.** Each strip is a thin plane:
  - x position `-LANE_WIDTH_M / 2 + (i + 1) * (LANE_WIDTH_M / 39)`
  - position `[x, 0.001, -LANE_LENGTH_M / 2]`
  - rotation `[-Math.PI / 2, 0, 0]`
  - `<planeGeometry args={[0.001, LANE_LENGTH_M]} />`
  - `<meshBasicMaterial color="#000000" opacity={0.15} transparent />`
- [ ] **C25.** Conditionally render `<BoardLines />` when `showBoards` is true

#### Sub-phase C.7 — Highlight a single board

- [ ] **C26.** Create a `HighlightBoard({ board, color })` subcomponent
- [ ] **C27.** Render a yellow stripe at the board position:
  - x = `boardToX(board)`
  - width = `LANE_WIDTH_M / 39`
  - position `[x, 0.003, -LANE_LENGTH_M / 2]`
  - rotation `[-Math.PI / 2, 0, 0]`
  - `<planeGeometry args={[width, LANE_LENGTH_M]} />`
  - `<meshBasicMaterial color={color} opacity={0.5} transparent />`
- [ ] **C28.** Conditionally render when `highlightBoard !== undefined`

#### Sub-phase C.8 — Highlight a range of boards

- [ ] **C29.** Create a `HighlightBoardRange({ range, color })` subcomponent
- [ ] **C30.** Compute the center X and total width from the range tuple
- [ ] **C31.** Render a wider stripe covering the range (similar to HighlightBoard but spanning multiple boards)
- [ ] **C32.** Use opacity 0.35 and color from the prop
- [ ] **C33.** Conditionally render when `highlightBoardRange !== undefined`

#### Sub-phase C.9 — Zones (skid/hook/roll)

- [ ] **C34.** Create a `Zones({ opacity })` subcomponent
- [ ] **C35.** Compute zone lengths: `headsLength = ZONE_HEADS_END_M`, `midlaneLength = ZONE_MIDLANE_END_M - ZONE_HEADS_END_M`, `backendsLength = LANE_LENGTH_M - ZONE_MIDLANE_END_M`
- [ ] **C36.** Render heads zone (blue):
  - position `[0, 0.002, -headsLength / 2]`
  - rotation `[-Math.PI / 2, 0, 0]`
  - `<planeGeometry args={[LANE_WIDTH_M, headsLength]} />`
  - `<meshBasicMaterial color="#3b82f6" opacity={opacity} transparent />`
- [ ] **C37.** Render midlane zone (amber `#f59e0b`) at `-(ZONE_HEADS_END_M + midlaneLength / 2)`
- [ ] **C38.** Render backends zone (green `#22c55e`) at `-(ZONE_MIDLANE_END_M + backendsLength / 2)`
- [ ] **C39.** Conditionally render `<Zones opacity={zoneOpacity} />` when `showZones` is true

#### Sub-phase C.10 — Final TexturedLane

- [ ] **C40.** Save the complete file
- [ ] **C41.** Run `npx tsc --noEmit` — must be clean

The complete reference code for this file is in `docs/specs/10-SESSION-LANE-ASSET.md` Step 2.

### Phase D — Oil Overlay Stub (~5 min)

- [ ] **D1.** Create `src/components/3d/assets/lane/oil-overlay.tsx`
- [ ] **D2.** Add `"use client"` directive
- [ ] **D3.** Define an `OilOverlayProps` interface with `pattern?: string` and `visible?: boolean`
- [ ] **D4.** Export an `OilOverlay` function component that takes the props but returns `null`
- [ ] **D5.** Add a comment explaining this is a placeholder for handoff 03 (Oil Pattern Data session)

### Phase E — Public Interface (~5 min)

- [ ] **E1.** Create `src/components/3d/assets/lane/index.tsx`
- [ ] **E2.** Re-export `TexturedLane as Lane` from `./textured-lane`
- [ ] **E3.** Re-export the `LaneProps` type from `./textured-lane`
- [ ] **E4.** Re-export `LANE_LENGTH_M`, `LANE_WIDTH_M`, and `boardToX` from `./lane-constants`
- [ ] **E5.** Verify the file structure matches the `pins/index.tsx` pattern

### Phase F — Update Prototype Scene for Verification (~15 min)

- [ ] **F1.** Read `src/components/3d/scenes/prototype-scene.tsx` to refresh on its current structure
- [ ] **F2.** Add the import: `import { Lane } from "@/components/3d/assets/lane";`
- [ ] **F3.** Add Leva controls for the lane in the existing useControls call:
  ```typescript
  // Add to the existing useControls("Prototype", () => ({ ... }))
  showArrows: { value: true, label: "Show Arrows" },
  showDots: { value: true, label: "Show Dots" },
  showFoulLine: { value: true, label: "Show Foul Line" },
  showBoards: { value: false, label: "Show Board Lines" },
  showZones: { value: false, label: "Show Zones" },
  highlightBoard: { value: 0, min: 0, max: 39, step: 1, label: "Highlight Board" },
  ```
- [ ] **F4.** Add the `<Lane>` component in the JSX, positioned with the foul line at the ball's position:
  ```tsx
  <Lane
    showArrows={showArrows}
    showDots={showDots}
    showFoulLine={showFoulLine}
    showBoards={showBoards}
    showZones={showZones}
    highlightBoard={highlightBoard > 0 ? highlightBoard : undefined}
  />
  ```
- [ ] **F5.** Position the lane group so it aligns with the existing ball position. The lane component is centered with foul line at z=0; the ball in prototype-scene is at the origin. They should naturally align.
- [ ] **F6.** Note: the existing pin deck offset `[0, -BALL_RADIUS_METERS, -1.5]` is too short — pins should be at the actual pin deck distance (`-LANE_LENGTH_M = -18.288m`). UPDATE THE PIN DECK position to be at `[0, -BALL_RADIUS_METERS, -LANE_LENGTH_M]`. **Important**: this means the camera will need to pull WAY back to see both ball and pins — that's expected and correct because a real lane is huge. Don't try to fight the geometry by scaling things down.
- [ ] **F7.** Update the OrbitControls `maxDistance` to something like `25` so the user can pull back far enough to see the whole lane

### Phase G — Verification (~10 min)

- [ ] **G1.** Save all files
- [ ] **G2.** Run `npx tsc --noEmit` — verify zero errors
- [ ] **G3.** Run `npm run build` — verify successful build
- [ ] **G4.** Verify dev server is running (check port 6200) or restart it
- [ ] **G5.** Run `curl -s -o /dev/null -w "%{http_code}" http://localhost:6200/learn/prototypes` — expect 200
- [ ] **G6.** Open `http://localhost:6200/learn/prototypes` in a browser
- [ ] **G7.** Visual checks:
  - Lane visible stretching down the scene from the foul line
  - 7 arrows visible as small triangles at 15ft mark
  - 7 dots visible at 7ft mark
  - Foul line visible as a thin white strip
  - Two dark gutters on either side
  - Pin deck at the far end (very far away because real lane scale)
  - Ball at the foul line
- [ ] **G8.** Functional checks via Leva panel:
  - Toggle "Show Boards" — 38 thin lines appear separating the 39 boards
  - Toggle "Show Zones" — 3 colored zones appear (blue heads, amber midlane, green backends)
  - Drag "Highlight Board" slider from 0 to 39 — yellow stripe sweeps across the lane width
  - Toggle "Show Arrows" off — arrows disappear
  - Toggle "Show Dots" off — dots disappear
  - Toggle "Show Foul Line" off — foul line disappears
- [ ] **G9.** Browser console check — no red errors (THREE.Clock deprecation warning is OK and unrelated)
- [ ] **G10.** Camera check — orbit the camera, pull back, zoom in. Lane stays visible from all angles. No flicker (z-fighting).

If any step fails, debug before moving to commit. Common failures and fixes are in Part 6.

### Phase H — Commit (single commit, do NOT push)

- [ ] **H1.** Stage exactly these files:
  ```bash
  git add src/components/3d/assets/lane/
  git add src/components/3d/scenes/prototype-scene.tsx
  ```
- [ ] **H2.** Commit with this message format:

```
feat: lane asset — textured plane with markings, zones, highlights

Implements the Lane asset at src/components/3d/assets/lane/ following
the swappable-interface pattern from spec 09. Option A (textured plane
with procedural markings) — no texture files, no shaders.

Files created:
- lane-constants.ts: USBC dimensions in meters, board-to-X conversion
- textured-lane.tsx: main component with markings, gutters, highlights, zones
- oil-overlay.tsx: stub for future oil pattern rendering (handoff 03)
- index.tsx: public interface (<Lane />)

Props implemented:
- showArrows, showDots, showFoulLine, showBoards, showGutters
- highlightBoard, highlightBoardRange, highlightColor
- showZones (3-zone colored overlay), zoneOpacity

Props stubbed (declared in interface, unimplemented):
- oilPattern, oilPatternVisible, surface

Unlocks ~22 future scene components across Ch 1, 2, 6, 7, 8, 9, 11
once matching scene components are built. Prototype sandbox at
/learn/prototypes updated to display the lane with full Leva controls.

Pin deck position updated to actual USBC distance (-18.288m) so the
prototype scene shows realistic lane scale.

PRD: serves FR-2, FR-5, NFR-4. Advances milestone M1 (Asset Foundation).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

- [ ] **H3.** Verify the commit was created (`git log -1`)
- [ ] **H4.** Run `git status` — should be clean (nothing else staged or modified)
- [ ] **H5.** **DO NOT push.** Stop here. The user reviews and pushes.

### Phase I — STATUS Update (separate small commit)

- [ ] **I1.** Read `docs/STATUS.md`
- [ ] **I2.** Add Lane to the "3D Assets Built" section
- [ ] **I3.** Update "What's In Progress" / "What's Next" — Lane is done, Oil Pattern Data (handoff 03) becomes the next priority
- [ ] **I4.** Add the new commit hash to "Recent Activity"
- [ ] **I5.** Update the "Last Updated" date at the top
- [ ] **I6.** Commit STATUS.md as a separate commit:
  ```
  docs: status update after lane asset build
  ```
- [ ] **I7.** Stop. Do NOT push.

---

## Part 5: Common Pitfalls

### Pitfall 1: planeGeometry default orientation

`<planeGeometry>` creates a plane in the XY plane (standing up, facing +Z). To lay it flat on the ground, ALWAYS rotate by `[-Math.PI / 2, 0, 0]`. Every Lane mesh in this asset uses this rotation.

If you forget the rotation, the lane will be standing up like a wall in front of the camera instead of lying flat.

### Pitfall 2: Z-fighting between stacked planes

Multiple planes at the same Y position flicker because WebGL can't decide which is in front. Always stack with small Y offsets:

| Layer | Y position |
|-------|-----------|
| Main lane surface | 0 |
| Markings (arrows, dots, foul line) | 0.001 to 0.002 |
| Highlights | 0.003 |
| Zones | 0.002 |

1mm offsets are invisible to the user but eliminate flicker.

### Pitfall 3: meshBasicMaterial vs meshStandardMaterial

- **meshBasicMaterial** ignores all lighting — use for "painted on" elements (arrows, dots, foul line, highlights, zones)
- **meshStandardMaterial** responds to lighting — use only for the main lane surface and gutters (which should look 3D)

If your highlights or arrows look weird, it's probably because they're using the wrong material type.

### Pitfall 4: Don't use `<Line>` for board separators

drei's `<Line>` component renders with screen-space thickness which looks weird on a floor plane. Use thin `<planeGeometry>` strips instead — they have proper world-space width and don't change as the camera moves.

### Pitfall 5: The lane is HUGE in world units

60 feet = 18.288 meters. A bowling ball (radius 0.108m) is TINY next to the full lane. When you verify the prototype scene, you'll need to either:
- Pull the camera way back to see both ball and pins
- Raise the OrbitControls maxDistance to ~25
- Accept that "wide shot" framing is the only one where everything is visible

Don't try to scale the lane down to "match the ball." Keep real proportions. Scenes per chapter will use specific camera setups appropriate to each section.

### Pitfall 6: Board direction (right-handed vs left-handed)

Board 1 is the right gutter (from the right-handed bowler's perspective looking down the lane). Board 20 is center. Board 39 is the left gutter. The `boardToX` function uses this convention with `-LANE_WIDTH_M / 2 + (board - 0.5) * BOARD_WIDTH_M`.

If you accidentally flip the convention, "board 5" will appear on the wrong side. Check by setting `highlightBoard={5}` and verifying it appears on the right side of the lane.

### Pitfall 7: Forgetting the Phase 2 prop stubs

The TypeScript interface MUST declare `oilPattern`, `oilPatternVisible`, and `surface` even though you don't render anything for them this session. Future scene components will pass these props expecting the interface to accept them. If you omit them, those scenes will fail to compile.

Stub them: declare in the interface, accept in the component signature, then ignore.

### Pitfall 8: Not running tsc and build

The single most common failure mode is "I think it works" without verifying. Always run BOTH:
- `npx tsc --noEmit` — catches type errors
- `npm run build` — catches MDX/SSG/import errors that the dev server might miss

Do both before committing.

---

## Part 6: Stop Conditions

You should STOP and ask the user (NOT push, NOT commit) if:

1. **`npm run build` fails and you can't fix it in 2 attempts.** Don't keep retrying. Stop.
2. **The lane renders but the markings are in wrong positions** (e.g., arrows are vertical instead of horizontal). Geometry rotation issues are easy to mis-debug — get help.
3. **You hit z-fighting flicker that you can't resolve with Y-offset tweaks.** Stop and ask.
4. **The pin deck or ball disappears when you add the lane.** Something is wrong with positioning or material occlusion.
5. **You realize you need a feature not in this session's scope** (oil pattern, ball path animation, shader-based wood grain). Stop. Defer to a future session.

You should COMMIT (and stop) when:

1. All files in `src/components/3d/assets/lane/` exist
2. `npx tsc --noEmit` is clean
3. `npm run build` succeeds
4. `/learn/prototypes` renders the lane with all markings visible
5. All Leva toggles work as expected
6. STATUS.md update is queued for a separate small commit

You should NEVER:

1. Push to main without explicit user approval
2. Modify any file outside the explicit list (4 lane asset files + prototype-scene.tsx + STATUS.md)
3. Build oil pattern rendering (that's handoff 03)
4. Build ball path animation (that's a future session)
5. Add new npm packages
6. Modify the existing pins, ball, lighting, or post-processing components
7. Write content MDX files (that's handoffs 01 and beyond)

---

## Part 7: PRD Cross-Reference

This handoff serves the following PRD requirements (`docs/specs/14-PRD.md`):

| PRD Reference | What This Session Contributes |
|---------------|------------------------------|
| **FR-2** (Interactive 3D scenes) | A reusable lane component that scenes can compose |
| **FR-5** (Asset architecture) | Demonstrates the swappable-interface pattern with another asset (after Pins) |
| **NFR-4** (Visual quality) | Studio-lit lane surface with proper USBC proportions |
| **Milestone M1** (Asset Foundation) | M1 requires all 4 reusable assets (Ball, Pins, Lane, Figure) — this session ships #3 of 4 |

When complete, the project moves from "2 of 4 reusable assets shipped" to "3 of 4." Only the Figure asset will remain (handoff 05).

---

## Part 8: The Master Prompt (Copy Verbatim)

Paste this into the first message of a fresh Claude Code session opened in `/Users/joenash/github/roll-model`:

---

```
You are executing Handoff 02 — Lane Asset Build. The complete handoff
document is at:
docs/handoffs/02-LANE-ASSET-BUILD.md

READ THAT FILE IN FULL FIRST. It is the only set of instructions you need
for this session. Do not skim. Do not start writing code until you have
read all 8 parts.

Your goal: build the Lane asset at src/components/3d/assets/lane/ following
Option A from spec 09 (textured plane with procedural markings, zones, and
highlights — no texture files, no shaders). The asset must support a
specific TypeScript interface so future scene components can consume it
without knowing the implementation.

Required reading order (BEFORE writing any code):
1. docs/handoffs/02-LANE-ASSET-BUILD.md (this file)
2. docs/specs/09-ASSET-ARCHITECTURE.md — read the "Asset 2: The Lane" section
3. docs/specs/10-SESSION-LANE-ASSET.md — the generic lane-build playbook
   that this handoff is the specific application of
4. src/components/3d/assets/pins/ — read all 4 files as your reference for
   the asset pattern (constants file, single-unit, composed component,
   public interface)
5. src/components/3d/scenes/prototype-scene.tsx — to understand how scenes
   consume assets

Workflow:
Work through Phases A through I as defined in Part 4 of the handoff.

- Phase A: File setup
- Phase B: Constants file (~17 atomic tasks)
- Phase C: Textured Lane component (~41 atomic tasks across 10 sub-phases)
- Phase D: Oil overlay stub
- Phase E: Public interface
- Phase F: Update prototype scene for verification
- Phase G: Verification (build + visual + functional checks)
- Phase H: Single commit (do NOT push)
- Phase I: STATUS.md update as a separate small commit

Use the per-phase atomic checklists. Do not skip steps. The complete
reference code for the constants and textured-lane files is in
docs/specs/10-SESSION-LANE-ASSET.md Steps 1 and 2 — copy verbatim if
needed, then verify against the atomic checklist.

Stop conditions are in Part 6. If you hit any of them, stop and ask
me — do not improvise.

Common pitfalls (especially planeGeometry rotation, z-fighting, and
material type confusion) are in Part 5. Read them BEFORE writing code,
not after debugging.

After verification passes (Phase G), commit using the message template
in Phase H (Part 4). Do NOT push. Then update STATUS.md as a separate
small commit (Phase I).

This session is parallel-safe with handoff 01 (Content Batch 1) — they
touch completely different files. If a content session is running in
another window, that's fine.

Begin by reading the handoff doc. Confirm when you're ready to start
Phase A.
```

---

## Part 9: After Completion

Once this session has shipped the Lane asset, the next sessions in priority order:

1. **Handoff 03 — Oil Pattern Data** (half-session, ~2 hours) — gives the Lane its oil overlay capability
2. **Handoff 04 — Scene Building Chapter 2** (full session) — builds 6 scenes against the existing ball, no more new assets needed
3. **Handoff 05 — Figure Asset Build** — last reusable asset, unlocks chapters 3, 4, 5, 12
4. **Handoff 06 — Content Batch 2** — Foundation cluster (Ch 1 sections), now possible because Lane and Pins exist

The Lane unblocks the most downstream work of any single session in the project.
