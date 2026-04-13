# Session Handoff — Build the Lane Asset

> **Status**: CANONICAL
> **Created**: 2026-04-13
> **Purpose**: Self-contained briefing for a fresh Claude Code session to build the Lane asset — the second-highest-priority 3D asset after the Ball
> **Session scope**: 1 focused session, ~4-6 hours of work
> **Unlocks**: Scene components for ~22 content sections across Chapters 1, 6, 7, 8, 9, 11

---

## Part 1: What You Are Doing

You are building the **Lane asset** for Roll Model, an interactive 3D bowling encyclopedia. The Lane is a reusable `<Lane>` React component that renders a 60-foot bowling lane in the 3D scene. Scenes import `<Lane>` and pass props to control what's visible (markings, zones, oil patterns, highlighted boards, ball paths).

You are NOT writing content, NOT building scenes, NOT touching MDX files. You are building one asset component that will later be imported by ~22 different scene components.

### Why This Asset Now

Spec 09 (Asset Architecture) establishes that the Lane is the highest-leverage asset after the Ball. It's used by:
- Chapter 1: The Lane, Board Numbering (2 sections)
- Chapter 2: Ball Motion: Skid-Hook-Roll (1 section)
- Chapter 6: all 5 sections (three phases, speed/rev interaction, breakpoint, total hook, loft)
- Chapter 7: all 6 sections (oil patterns, house shot, PBA patterns, sport shots, lane transition, lane surfaces)
- Chapter 8: all 6 sections (pocket, entry angle, pin action, speed at pins, common leaves, perfect game)
- Chapter 9: 3 sections (3-6-9 system, corner pins, split conversions)
- Chapter 11: all 3 sections (rule of 31, watching ball reaction, making adjustments)

Building the Lane asset unblocks roughly 40% of all future scene work.

---

## Part 2: Required Reading

Read in this order before writing any code:

1. **`docs/specs/09-ASSET-ARCHITECTURE.md`** — Full context for the swappable-interface pattern. Read the "Asset 2: The Lane" section carefully. Three prototype options are laid out (A: Textured Plane, B: Full Procedural Shader, C: Hybrid). **You are building Option A** (textured plane) this session. Option C is a future upgrade.

2. **`docs/specs/07-INTERACTION-BLUEPRINTS.md`** — Search for "lane" to find every section that references the Lane asset. Read sections 1.1, 1.4, 2.4, 6.1–6.5, 7.1–7.6, 8.1–8.6, 9.2, 11.1–11.3 (you don't need to read all of them — skim to understand the prop surface the Lane needs to support).

3. **`src/components/3d/assets/pins/`** — The existing pins asset is your reference for the interface-implementation pattern. Look at:
   - `pin-profile.ts` — constants file
   - `lathe-pin.tsx` — single unit
   - `pin-deck.tsx` — composed component with props
   - `index.tsx` — public interface export

4. **`src/components/3d/scenes/prototype-scene.tsx`** — Shows how assets are consumed by scenes. The Lane will be consumed the same way.

5. **`src/lib/constants.ts`** — Existing constants file. You'll add lane dimensions here.

6. **`docs/research/lane-science-and-oil-patterns.md`** §1-2 — USBC lane dimensions and markings (exact measurements: 60ft length, 41.5 inch width, 39 boards, arrows at 15ft, dots at 7.5ft, foul line position).

---

## Part 3: What You Are Building

### Asset Layout

```
src/components/3d/assets/lane/
├── lane-constants.ts        # Dimensions, board positions, marking positions
├── textured-lane.tsx        # Option A implementation
├── oil-overlay.tsx          # Separate layer for oil pattern rendering (placeholder)
└── index.tsx                # Public interface: export { TexturedLane as Lane }
```

### The Component Interface

The Lane component must accept this prop surface (even if some props are unimplemented placeholders this session):

```typescript
export interface LaneProps {
  // Camera intent hints
  view?: 'overhead' | 'perspective' | 'side';

  // Markings visibility
  showArrows?: boolean;      // default true
  showDots?: boolean;         // default true
  showFoulLine?: boolean;     // default true
  showBoards?: boolean;       // default false — board lines across the surface
  showGutters?: boolean;      // default true

  // Dynamic highlights
  highlightBoard?: number;    // 1-39, lights up one board in yellow
  highlightBoardRange?: [number, number];  // e.g. [8, 12]
  highlightColor?: string;    // default "#fbbf24"

  // Zones for ball motion visualization
  showZones?: boolean;        // colors heads (blue), midlane (yellow), backends (green)
  zoneOpacity?: number;       // default 0.25

  // Oil pattern (Phase 2 — placeholder prop for now)
  oilPattern?: OilPatternName;  // type placeholder, see Part 6
  oilPatternVisible?: boolean;

  // Surface type
  surface?: 'wood' | 'synthetic';  // default 'wood'
}
```

**This session implements only the props up to "showZones". The `oilPattern`, `oilPatternVisible`, and `surface` props are declared but unimplemented placeholders.** They exist in the interface so scenes can be written against the full API, and future sessions can implement them without changing scene code.

### Scope Boundary for This Session

| Implement | Defer |
|-----------|-------|
| Lane surface plane | Oil pattern overlay shader |
| Board lines (procedural, via thin meshes) | Different surface types (wood vs synthetic) |
| Arrows at 15ft (7 meshes) | Ball path overlay (handled by separate `<BallPath>` component later) |
| Lane dots at 7ft and approach area | Breakpoint marker (separate component) |
| Foul line (single mesh) | Lane transition animation |
| Gutters (two long thin meshes) | Carrydown effects |
| Highlight board (colored stripe) | Multiple ball path visualizations |
| Highlight range | Wear patterns |
| Zones (3 colored rectangles) | Heat map overlays |

---

## Part 4: Implementation Steps

### Step 1: Lane Constants

**File:** `src/components/3d/assets/lane/lane-constants.ts`

USBC lane dimensions, converted to meters for the scene. The lane is massive in real units — we can either scale the whole scene down or use the real meter values and let camera distance handle the framing. **Use real meter values** for clarity.

```typescript
// USBC bowling lane dimensions — real-world meters
// Source: docs/research/lane-science-and-oil-patterns.md §1

export const LANE_LENGTH_M = 18.288;       // 60 feet
export const LANE_WIDTH_M = 1.0541;         // 41.5 inches
export const APPROACH_LENGTH_M = 4.572;     // 15 feet of approach
export const BOARD_COUNT = 39;
export const BOARD_WIDTH_M = LANE_WIDTH_M / BOARD_COUNT;  // ~0.02703m

export const GUTTER_WIDTH_M = 0.2286;       // 9 inches per gutter
export const FOUL_LINE_Z = 0;               // foul line at origin
export const PIN_DECK_START_Z = -LANE_LENGTH_M;  // -18.288m (negative = down the lane)

// Arrows: 7 arrows at 15 feet from foul line, on boards 5, 10, 15, 20, 25, 30, 35
export const ARROW_DISTANCE_M = 4.572;      // 15 feet
export const ARROW_BOARDS = [5, 10, 15, 20, 25, 30, 35];

// Lane dots: 7 dots at 7 feet from foul line
export const LANE_DOTS_DISTANCE_M = 2.1336; // 7 feet
export const LANE_DOT_BOARDS = [5, 10, 15, 20, 25, 30, 35];

// Approach dots: 5 dots at 12 feet and 15 feet behind the foul line
export const APPROACH_DOTS_12FT_Z = 3.6576; // 12 feet behind foul line (positive Z)
export const APPROACH_DOTS_15FT_Z = 4.572;  // 15 feet behind foul line

// Zone boundaries (down-the-lane, from foul line)
export const ZONE_HEADS_END_M = 6.096;      // 20 feet
export const ZONE_MIDLANE_END_M = 12.192;   // 40 feet
// Backends: from 12.192m to 18.288m (40-60 feet)

// Convert board number (1-39, right-to-left for right-handers) to X position.
// Board 1 is the right gutter, board 20 is center, board 39 is the left gutter.
// Returns the X coordinate of the CENTER of the board.
export function boardToX(board: number): number {
  const clamped = Math.max(1, Math.min(BOARD_COUNT, board));
  // Board 1 center = -LANE_WIDTH/2 + BOARD_WIDTH/2 (rightmost)
  // Board 39 center = +LANE_WIDTH/2 - BOARD_WIDTH/2 (leftmost)
  return -LANE_WIDTH_M / 2 + (clamped - 0.5) * BOARD_WIDTH_M;
}
```

### Step 2: Textured Lane Component

**File:** `src/components/3d/assets/lane/textured-lane.tsx`

This is the main implementation. A plane geometry with procedural markings rendered as additional meshes (not a shader — just cheap child meshes). The wood grain is handled by the existing Lightformer environment via reflectance; no actual wood texture file this session.

Key design decisions:
- **No texture files.** Use `meshStandardMaterial` with a warm brown color. The studio lighting will give it subtle reflections. Wood grain texture can be a future upgrade (Option C in spec 09).
- **Markings as child meshes.** Arrows are small triangle meshes. Dots are small circle/sphere meshes. Foul line is a thin box. This avoids shader complexity and makes it easy to show/hide individual markings with props.
- **Zones and highlights as transparent overlay planes.** Stack them 1mm above the main surface with semi-transparent materials.

```tsx
"use client";

import { useMemo } from "react";
import {
  LANE_LENGTH_M,
  LANE_WIDTH_M,
  GUTTER_WIDTH_M,
  ARROW_DISTANCE_M,
  ARROW_BOARDS,
  LANE_DOTS_DISTANCE_M,
  LANE_DOT_BOARDS,
  ZONE_HEADS_END_M,
  ZONE_MIDLANE_END_M,
  boardToX,
} from "./lane-constants";

export interface LaneProps {
  showArrows?: boolean;
  showDots?: boolean;
  showFoulLine?: boolean;
  showBoards?: boolean;
  showGutters?: boolean;
  highlightBoard?: number;
  highlightBoardRange?: [number, number];
  highlightColor?: string;
  showZones?: boolean;
  zoneOpacity?: number;
  // Phase 2 placeholders
  oilPattern?: string;
  oilPatternVisible?: boolean;
  surface?: "wood" | "synthetic";
}

export function TexturedLane({
  showArrows = true,
  showDots = true,
  showFoulLine = true,
  showBoards = false,
  showGutters = true,
  highlightBoard,
  highlightBoardRange,
  highlightColor = "#fbbf24",
  showZones = false,
  zoneOpacity = 0.25,
}: LaneProps) {
  // The lane surface is centered at (0, 0, -LANE_LENGTH_M/2) — pins are at -LANE_LENGTH_M, foul line at 0
  const centerZ = -LANE_LENGTH_M / 2;

  return (
    <group>
      {/* Main lane surface — warm wood color */}
      <mesh
        position={[0, 0, centerZ]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[LANE_WIDTH_M, LANE_LENGTH_M]} />
        <meshStandardMaterial
          color="#d4a574"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Gutters — two thin strips on either side */}
      {showGutters && (
        <>
          <mesh
            position={[-(LANE_WIDTH_M / 2 + GUTTER_WIDTH_M / 2), -0.01, centerZ]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[GUTTER_WIDTH_M, LANE_LENGTH_M]} />
            <meshStandardMaterial color="#2a1a10" roughness={0.9} />
          </mesh>
          <mesh
            position={[LANE_WIDTH_M / 2 + GUTTER_WIDTH_M / 2, -0.01, centerZ]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[GUTTER_WIDTH_M, LANE_LENGTH_M]} />
            <meshStandardMaterial color="#2a1a10" roughness={0.9} />
          </mesh>
        </>
      )}

      {/* Foul line — thin white bar at z=0 */}
      {showFoulLine && (
        <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[LANE_WIDTH_M, 0.03]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      )}

      {/* Arrows at 15 feet from foul line — 7 small triangles pointing away from bowler */}
      {showArrows &&
        ARROW_BOARDS.map((board) => (
          <ArrowMarker key={`arrow-${board}`} board={board} />
        ))}

      {/* Lane dots at 7 feet from foul line — 7 small circles */}
      {showDots &&
        LANE_DOT_BOARDS.map((board) => (
          <DotMarker key={`dot-${board}`} board={board} z={-LANE_DOTS_DISTANCE_M} />
        ))}

      {/* Board lines — thin lines separating each board */}
      {showBoards && <BoardLines />}

      {/* Highlighted single board */}
      {highlightBoard !== undefined && (
        <HighlightBoard board={highlightBoard} color={highlightColor} />
      )}

      {/* Highlighted board range */}
      {highlightBoardRange && (
        <HighlightBoardRange
          range={highlightBoardRange}
          color={highlightColor}
        />
      )}

      {/* Three zones */}
      {showZones && <Zones opacity={zoneOpacity} />}
    </group>
  );
}

// ----- Helper subcomponents -----

function ArrowMarker({ board }: { board: number }) {
  const x = boardToX(board);
  return (
    <mesh
      position={[x, 0.002, -ARROW_DISTANCE_M]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      {/* A small triangle pointing "down the lane" toward the pins */}
      <coneGeometry args={[0.025, 0.08, 3]} />
      <meshBasicMaterial color="#8b6f47" />
    </mesh>
  );
}

function DotMarker({ board, z }: { board: number; z: number }) {
  const x = boardToX(board);
  return (
    <mesh position={[x, 0.002, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.01, 16]} />
      <meshBasicMaterial color="#6b5636" />
    </mesh>
  );
}

function BoardLines() {
  // 38 thin lines separating the 39 boards
  const lines = Array.from({ length: 38 }, (_, i) => {
    const boardIdx = i + 1;
    const x = -LANE_WIDTH_M / 2 + boardIdx * (LANE_WIDTH_M / 39);
    return (
      <mesh
        key={`boardline-${boardIdx}`}
        position={[x, 0.001, -LANE_LENGTH_M / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.001, LANE_LENGTH_M]} />
        <meshBasicMaterial color="#000000" opacity={0.15} transparent />
      </mesh>
    );
  });
  return <>{lines}</>;
}

function HighlightBoard({ board, color }: { board: number; color: string }) {
  const x = boardToX(board);
  const width = LANE_WIDTH_M / 39;
  return (
    <mesh
      position={[x, 0.003, -LANE_LENGTH_M / 2]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[width, LANE_LENGTH_M]} />
      <meshBasicMaterial color={color} opacity={0.5} transparent />
    </mesh>
  );
}

function HighlightBoardRange({
  range,
  color,
}: {
  range: [number, number];
  color: string;
}) {
  const [start, end] = range;
  const startX = boardToX(Math.min(start, end));
  const endX = boardToX(Math.max(start, end));
  const width = Math.abs(endX - startX) + LANE_WIDTH_M / 39;
  const centerX = (startX + endX) / 2;
  return (
    <mesh
      position={[centerX, 0.003, -LANE_LENGTH_M / 2]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[width, LANE_LENGTH_M]} />
      <meshBasicMaterial color={color} opacity={0.35} transparent />
    </mesh>
  );
}

function Zones({ opacity }: { opacity: number }) {
  const headsLength = ZONE_HEADS_END_M;
  const midlaneLength = ZONE_MIDLANE_END_M - ZONE_HEADS_END_M;
  const backendsLength = LANE_LENGTH_M - ZONE_MIDLANE_END_M;

  return (
    <>
      {/* Heads — blue (skid zone) */}
      <mesh
        position={[0, 0.002, -headsLength / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[LANE_WIDTH_M, headsLength]} />
        <meshBasicMaterial color="#3b82f6" opacity={opacity} transparent />
      </mesh>
      {/* Midlane — amber (hook zone) */}
      <mesh
        position={[0, 0.002, -(ZONE_HEADS_END_M + midlaneLength / 2)]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[LANE_WIDTH_M, midlaneLength]} />
        <meshBasicMaterial color="#f59e0b" opacity={opacity} transparent />
      </mesh>
      {/* Backends — green (roll zone) */}
      <mesh
        position={[0, 0.002, -(ZONE_MIDLANE_END_M + backendsLength / 2)]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[LANE_WIDTH_M, backendsLength]} />
        <meshBasicMaterial color="#22c55e" opacity={opacity} transparent />
      </mesh>
    </>
  );
}
```

### Step 3: Public Interface

**File:** `src/components/3d/assets/lane/index.tsx`

```tsx
export { TexturedLane as Lane } from "./textured-lane";
export type { LaneProps } from "./textured-lane";
export {
  LANE_LENGTH_M,
  LANE_WIDTH_M,
  boardToX,
} from "./lane-constants";
```

### Step 4: Oil Overlay Placeholder

**File:** `src/components/3d/assets/lane/oil-overlay.tsx`

Stub this out so the import exists for future sessions. Just return `null` for now — the actual oil overlay requires the oil pattern data (separate session, see `12-SESSION-OIL-DATA.md`).

```tsx
"use client";

export interface OilOverlayProps {
  pattern?: string;
  visible?: boolean;
}

export function OilOverlay(_props: OilOverlayProps) {
  // Placeholder — oil pattern rendering lives here in a future session
  return null;
}
```

### Step 5: Update the Prototype Scene to Include the Lane

**File:** `src/components/3d/scenes/prototype-scene.tsx`

Add the lane below the ball so you can visually verify the new asset. Put the ball just above the foul line and the pin deck at the back. The existing ContactShadows should be removed (the lane now serves as ground).

Modifications:
1. Import `Lane` from `@/components/3d/assets/lane`
2. Add `<Lane showArrows showDots showFoulLine showBoards={false} />` before the ball
3. Remove the ContactShadows (they won't look right on top of the lane surface)
4. Adjust ball position if needed so it sits on the foul line

Don't go wild here — the goal is a smoke test, not a polished scene.

### Step 6: Add Lane Controls to Prototype Scene

Add Leva controls so you can visually verify each prop works:

```tsx
const {
  showArrows,
  showDots,
  showFoulLine,
  showBoards,
  showGutters,
  highlightBoard,
  showZones,
} = useControls("Lane Asset", {
  showArrows: true,
  showDots: true,
  showFoulLine: true,
  showBoards: false,
  showGutters: true,
  highlightBoard: { value: 0, min: 0, max: 39, step: 1 },
  showZones: false,
});
```

Pass `highlightBoard={highlightBoard > 0 ? highlightBoard : undefined}` so setting it to 0 means "no highlight."

### Step 7: Verify

```bash
npx tsc --noEmit  # zero errors
npm run build     # successful SSG build
```

Open `http://localhost:6200/learn/prototypes`:
- Lane should be visible stretching away from the camera
- 7 arrows visible at the 15ft mark (tiny triangles, brown-ish)
- 7 dots visible at the 7ft mark
- Foul line visible as a white strip
- Gutters visible as dark strips on either side
- Highlight Board slider (1-39) lights up single boards
- Show Boards toggle reveals thin lines between boards
- Show Zones toggle reveals 3 colored zones (blue/amber/green)
- Ball still visible at foul line (unchanged)
- Pin deck still visible at the back (unchanged)

### Step 8: Commit (do NOT push)

```
feat: lane asset — textured plane with markings, zones, highlights

Implements the Lane asset at src/components/3d/assets/lane/ following
the swappable-interface pattern from spec 09. Option A (textured plane)
with procedural markings — no texture files, no shaders.

Props implemented:
- showArrows, showDots, showFoulLine, showBoards, showGutters
- highlightBoard (single board), highlightBoardRange (inclusive range)
- showZones (3-zone colored overlay)

Props stubbed (declared in interface, unimplemented):
- oilPattern, oilPatternVisible, surface

Unlocks ~22 content sections across Ch 1, 2, 6, 7, 8, 9, 11 once the
matching scene components are built.

Prototype scene at /learn/prototypes updated to include the new lane
with Leva controls for visual verification.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

Do NOT push. The user will review and push.

---

## Part 5: Scope Discipline

This session ONLY builds the Lane asset. Do NOT:

- Write content MDX files (that's doc 08's job)
- Build scene components for Ch 6/7/8 content sections (that's doc 13's job)
- Implement the oil pattern overlay (that's doc 12's job)
- Download wood texture files or add HDRIs
- Refactor the existing ball or pins assets
- Install new packages
- Modify any file outside the paths listed in Part 4

Stay in the lane. (Pun intended.)

---

## Part 6: Known Gaps and Future Work

After this session, the Lane asset will have these known gaps that future sessions will fill:

1. **Oil pattern overlay** — blocked on the oil pattern data file (session 12). The `oilPattern` prop exists in the interface but renders nothing.
2. **Surface type differentiation** — wood vs synthetic. Currently just warm brown. Will become a material swap in a later session.
3. **Photoreal wood grain** — Option C in spec 09 upgrades the material to a textured base with shader overlays for dynamic elements.
4. **Ball path overlay** — a separate `<BallPath>` component (not part of Lane) will be built when scenes for Chapter 6 are written.
5. **Breakpoint marker** — another separate component for Chapter 6 scenes.

These are all future sessions. Don't try to sneak them into this one.

---

## Part 7: Common Pitfalls

### Pitfall 1: The lane is HUGE in world units

60 feet = 18.288 meters. A bowling ball (radius 0.108m) looks TINY next to the full lane. When you verify the scene, the existing camera position `[0.2, 0.18, 0.38]` will have the lane extending far behind everything — that's correct. If you want to see the whole lane, orbit back.

Don't adjust the camera defaults in this session. The camera is tuned for close-up ball views. Per-chapter scenes will override the camera as needed.

### Pitfall 2: planeGeometry default orientation

`<planeGeometry>` creates a plane in the XY plane by default (standing up, facing +Z). Rotate it by `[-Math.PI / 2, 0, 0]` to lay it flat on the XZ plane (the "ground"). Every Lane mesh in this file uses this rotation.

### Pitfall 3: Z-fighting between stacked planes

Multiple planes at the same Y position flicker because WebGL can't decide which is in front. Avoid by stacking with small Y offsets:
- Main lane surface: `y=0`
- Markings (arrows, dots, foul line): `y=0.001` to `y=0.002`
- Highlights: `y=0.003`
- Zones: `y=0.002`

1mm offsets are invisible to the user but eliminate z-fighting.

### Pitfall 4: `<meshBasicMaterial>` ignores lighting

Use `meshBasicMaterial` for things that should look flat and constant regardless of lighting (arrows, dots, foul line — which are "painted on"). Use `meshStandardMaterial` for the main lane surface and gutters (they should respond to the scene lights).

### Pitfall 5: Don't use `Line` components for board lines

drei's `<Line>` component renders with camera-space thickness which looks weird on a floor plane. Use thin `<planeGeometry>` strips instead.

---

## Part 8: Verification Checklist

- [ ] All files in `src/components/3d/assets/lane/` created
- [ ] `LaneProps` interface matches the contract in Part 3
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` succeeds
- [ ] `/learn/prototypes` renders lane + ball + pins without overlap
- [ ] Leva "Lane Asset" folder appears with all the toggles
- [ ] Arrows visible at 15ft, dots at 7ft, foul line present, gutters on both sides
- [ ] Highlight Board slider works (at 0 = nothing highlighted)
- [ ] Show Zones toggle shows 3 colored zones
- [ ] No z-fighting flicker when rotating the camera
- [ ] Ball and pins still work correctly (regression check)
- [ ] One commit created, NOT pushed

---

## Part 9: First Prompt for the Fresh Session

```
Read docs/specs/10-SESSION-LANE-ASSET.md fully. That's your complete briefing.
After reading it, read the files it references (spec 09, the existing pins asset,
the prototype scene, and the lane dimensions in the research doc).

Then build the Lane asset at src/components/3d/assets/lane/ following Option A
(textured plane with procedural markings). Do not implement oil patterns, do not
touch scene components for content sections, do not install new packages.

Verify on /learn/prototypes with the Leva controls. Commit with a clear message.
Do NOT push — I'll review first.
```
