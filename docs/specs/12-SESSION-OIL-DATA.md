# Session Handoff — Build the Oil Pattern Data Library

> **Status**: CANONICAL
> **Created**: 2026-04-13
> **Purpose**: Self-contained briefing for a fresh Claude Code session to build the oil pattern data file — pure TypeScript constants, no 3D rendering
> **Session scope**: Half-session (~2 hours)
> **Unlocks**: Lane asset's oil overlay functionality; scene components for Chapter 7 (6 sections) and Chapter 11 (3 sections)

---

## Part 1: What You Are Doing

You are creating a pure TypeScript data file that defines the 10 official PBA animal oil patterns plus the standard house shot. This data file is consumed by the Lane asset's oil overlay rendering and by any scene that needs to reference pattern metadata.

**No 3D code, no React components, no visual work.** Just typed constants extracted from the bowling research. This is a research-to-data transformation session.

### Why This Matters

Chapter 7 of Roll Model is entirely about lane conditions and oil patterns — 6 content sections all referencing specific patterns by name. Chapter 6 (Ball Motion Down the Lane) references patterns for breakpoint calculations. Chapter 11 (Reading the Lane) uses patterns for the Rule of 31.

Without this data file, none of those scenes can render the actual oil patterns. The Lane asset from session 10 has an `oilPattern` prop but nothing behind it. This session fills that gap.

---

## Part 2: Required Reading

1. **`docs/research/lane-science-and-oil-patterns.md`** §5 — **THE critical source.** This section has all 10 PBA patterns with their exact specs (length, total volume, ratio, forward/reverse oil distribution). Grep for "PBA" or "Cheetah" to find the section.

2. **`docs/research/lane-science-and-oil-patterns.md`** §3-4 — Background on how oil is applied (forward pass and reverse pass), how volume is measured (mL), and what "ratio" means (center board oil vs outside board oil).

3. **`docs/specs/09-ASSET-ARCHITECTURE.md`** — Read the "Asset 5: Oil Pattern Data" section. It defines the `OilPattern` TypeScript interface you're implementing.

4. **`docs/specs/07-INTERACTION-BLUEPRINTS.md`** §7.3 "PBA Patterns" — Shows how the oil pattern data will be consumed by the eventual scene. This is the end-user experience you're enabling.

5. **`src/lib/constants.ts`** — Existing constants file. The new oil pattern file lives alongside it.

---

## Part 3: What You Are Building

### File Layout

```
src/lib/
├── constants.ts            # existing
├── content-map.ts          # existing
├── scene-context.tsx       # existing
├── utils.ts                # existing
└── oil-patterns.ts         # NEW — this session
```

### The Data Structure

```typescript
export type OilPatternCategory = 'house' | 'sport' | 'challenge' | 'pba-animal';
export type OilPatternDifficulty = 'easy' | 'medium' | 'hard' | 'extreme';

export interface OilPattern {
  // Identity
  id: string;              // kebab-case slug, e.g. "wolf", "cheetah", "house-shot"
  name: string;            // Display name, e.g. "Wolf", "Cheetah", "Standard House Shot"
  category: OilPatternCategory;
  difficulty: OilPatternDifficulty;

  // Specs
  length: number;          // feet (oil length, not lane length)
  volumeMl: number;        // total oil volume in milliliters
  ratio: string;           // human-readable ratio like "10:1" or "3:1"
  ratioNumeric: number;    // the ratio as a number (e.g. 10 for "10:1", 3 for "3:1")

  // Oil density per board, distance bucket
  // density[board][distanceBucket] = oil density 0-1
  // board: 0-38 (39 boards), distanceBucket: 0-9 (10 buckets across the pattern length)
  density: number[][];

  // Metadata
  description: string;     // 1-2 sentence summary for tooltips/callouts
  notes?: string;          // optional: strategy notes, historical context
}
```

### The 11 Patterns to Build

From `lane-science-and-oil-patterns.md` §5:

**House Shot** (category: 'house', difficulty: 'easy')
- Length: 38-42 feet (use 40 as canonical)
- Volume: ~24-26 mL
- Ratio: 10:1 (center-to-outside)
- Description: "The most common recreational pattern. Heavy oil concentrated in the center boards creates 'walls' that funnel errant shots back to the pocket."

**Wolf** (category: 'pba-animal', difficulty: 'hard')
- Length: 32 feet (shortest PBA pattern)
- Volume: ~20 mL
- Ratio: 2.5:1
- Description: "The shortest PBA pattern. Minimal oil means the ball hooks early. Forces bowlers outside to the gutter."

**Cheetah** (category: 'pba-animal', difficulty: 'medium')
- Length: 35 feet
- Volume: ~22 mL
- Ratio: 3.4:1
- Description: "Short pattern that plays close to the gutter. Historically the highest-scoring PBA pattern because outside boards are dry and forgiving."

**Viper** (category: 'pba-animal', difficulty: 'hard')
- Length: 36 feet
- Volume: ~24 mL
- Ratio: 3.5:1

**Chameleon** (category: 'pba-animal', difficulty: 'hard')
- Length: 39 feet
- Volume: ~25 mL
- Ratio: 3:1

**Bear** (category: 'pba-animal', difficulty: 'extreme')
- Length: 40 feet
- Volume: ~26 mL
- Ratio: 1.5:1 (nearly flat — hardest pattern historically)
- Description: "The flat pattern. Nearly 1:1 ratio means no friction differential between center and outside — no 'walls' to save you. Misses go exactly where you miss."

**Scorpion** (category: 'pba-animal', difficulty: 'hard')
- Length: 42 feet
- Volume: ~27 mL
- Ratio: 2.5:1

**Dragon** (category: 'pba-animal', difficulty: 'hard')
- Length: 45 feet
- Volume: ~28 mL
- Ratio: 2:1

**Badger** (category: 'pba-animal', difficulty: 'extreme')
- Length: 47 feet (one of the longest)
- Volume: ~30 mL
- Ratio: 2:1
- Description: "Very long pattern — oil extends nearly to the pins. Ball must play deep inside the lane because the outside is dry but the pattern doesn't leave enough room for hook."

**Shark** (category: 'pba-animal', difficulty: 'extreme')
- Length: 48 feet
- Volume: ~30 mL
- Ratio: 2:1

**Bat** (category: 'pba-animal', difficulty: 'hard')
- Length: 36 feet
- Volume: ~24 mL
- Ratio: 3:1

Verify the exact numbers against `lane-science-and-oil-patterns.md` §5. The above are approximations — the research file has the authoritative values.

### The Density Array

This is the tricky part. For each pattern, you need a 39×10 array representing oil density across the lane width (39 boards) and down the pattern length (10 distance buckets from foul line to pattern end).

**You don't need perfectly accurate data.** You need plausible data that captures the key characteristics of each pattern. The actual rendering is approximate — readers will perceive "center-heavy" vs "flat" vs "front-heavy" as correct as long as the shape is right.

For each pattern, construct the density array using a shape function. Common shapes:

**Crown shape** (house shot): Heavy in center, tapers to zero on the outside boards. Longer in the middle distance buckets, shorter at the end.

```typescript
function crownShape(length: number, ratio: number, volumeMl: number): number[][] {
  const density: number[][] = [];
  for (let board = 0; board < 39; board++) {
    density[board] = [];
    // Distance from center (board 19.5)
    const distFromCenter = Math.abs(board - 19.5);
    // Ratio-weighted center-vs-outside density
    const widthFactor = Math.max(0, 1 - (distFromCenter / 19.5) * (ratio / (ratio + 1)));

    for (let bucket = 0; bucket < 10; bucket++) {
      // Pattern has the specified length — buckets beyond the length are zero
      const bucketDistance = (bucket / 10) * (60 / 10);  // bucket distance in feet
      const inPattern = bucketDistance <= length;
      density[board][bucket] = inPattern ? widthFactor : 0;
    }
  }
  return density;
}
```

**Flat shape** (sport patterns like Bear): Nearly uniform density across boards with minimal drop-off at the edges. Low ratio.

```typescript
function flatShape(length: number, volumeMl: number): number[][] {
  const density: number[][] = [];
  for (let board = 0; board < 39; board++) {
    density[board] = [];
    // Barely any taper from center to outside
    const distFromCenter = Math.abs(board - 19.5);
    const widthFactor = Math.max(0.5, 1 - (distFromCenter / 19.5) * 0.3);
    for (let bucket = 0; bucket < 10; bucket++) {
      const bucketDistance = (bucket / 10) * (60 / 10);
      density[board][bucket] = bucketDistance <= length ? widthFactor : 0;
    }
  }
  return density;
}
```

**Top hat shape** (challenge patterns): Flat in the middle with steep drop-offs at the edges (unlike crown which gradually tapers).

### Helper Functions to Export

Beyond the raw patterns, export a few helpers:

```typescript
// Get a pattern by ID
export function getPattern(id: string): OilPattern | undefined;

// Get all patterns in a category
export function getPatternsByCategory(category: OilPatternCategory): OilPattern[];

// Calculate Rule of 31 breakpoint for a given pattern length
export function ruleOf31(patternLength: number): number {
  // Rule of 31: breakpoint board = pattern length - 31
  // For house shot (40ft): 40 - 31 = board 9
  return Math.max(1, patternLength - 31);
}

// Get pattern length in meters (for 3D scene use)
export function patternLengthMeters(pattern: OilPattern): number {
  return pattern.length * 0.3048;  // feet to meters
}
```

---

## Part 4: Implementation Steps

### Step 1: Create the File with Types and Shape Functions

**File:** `src/lib/oil-patterns.ts`

Define the interface, the shape generation functions (crown, flat, top-hat), and the helper functions. Do this before defining the patterns so you can reuse the shapes.

### Step 2: Define All 11 Patterns

For each pattern, use the shape function that matches its description:

- House Shot → `crownShape(40, 10, 25)` — high ratio, crown
- Wolf → `crownShape(32, 2.5, 20)` — low ratio, short
- Cheetah → `crownShape(35, 3.4, 22)` — low ratio, short
- Viper → `crownShape(36, 3.5, 24)`
- Chameleon → `crownShape(39, 3, 25)`
- Bear → `flatShape(40, 26)` — flat pattern
- Scorpion → `crownShape(42, 2.5, 27)`
- Dragon → `crownShape(45, 2, 28)`
- Badger → `crownShape(47, 2, 30)` — long
- Shark → `crownShape(48, 2, 30)` — longest
- Bat → `crownShape(36, 3, 24)`

Collect them all into a `PATTERNS` record keyed by ID:

```typescript
export const PATTERNS: Record<string, OilPattern> = {
  "house-shot": { /* ... */ },
  "wolf": { /* ... */ },
  // etc.
};
```

### Step 3: Export Helpers

Implement `getPattern`, `getPatternsByCategory`, `ruleOf31`, `patternLengthMeters`.

### Step 4: Verify Types Compile

```bash
npx tsc --noEmit
```

Should pass with zero errors.

### Step 5: Write a Quick Test in Prototype Scene (optional but recommended)

Add a temporary console.log or Leva display in the prototype scene to verify the data loads:

```tsx
import { PATTERNS, ruleOf31 } from "@/lib/oil-patterns";

// Inside the scene component:
console.log("Oil patterns loaded:", Object.keys(PATTERNS));
console.log("House shot breakpoint:", ruleOf31(PATTERNS["house-shot"].length));
// Should log: House shot breakpoint: 9
```

Navigate to `/learn/prototypes` and check the browser console. All 11 patterns should be listed.

Remove the console.logs before committing — they're just for smoke testing.

### Step 6: Update the Lane Asset to Accept Oil Pattern (OPTIONAL)

If the Lane asset was built in a prior session and has a placeholder `oilPattern` prop, you can partially wire it up here. But actually **rendering** the oil overlay as a shader is a separate session's work. This session just provides the data.

What this session CAN do (optional stretch goal):
- Update the Lane asset's `LaneProps.oilPattern` type from `string` to `OilPatternId | 'none'`
- Add a simple monochrome overlay that renders the density data as a tinted plane (a first-pass visualization, not the full shader)

What this session CANNOT do:
- Build the proper shader-based oil overlay
- Handle pattern transitions over time
- Integrate with the ball path rendering

Keep the stretch goal genuinely optional. Shipping the data file cleanly is the primary goal.

### Step 7: Commit (do NOT push)

```
feat: oil pattern data library for PBA patterns and house shot

Adds src/lib/oil-patterns.ts with 11 named oil patterns:
- House Shot (10:1 ratio, 40ft)
- 10 PBA animal patterns: Wolf, Cheetah, Viper, Chameleon, Bear,
  Scorpion, Dragon, Badger, Shark, Bat

Each pattern includes specs (length, volume, ratio, category, difficulty)
plus a 39x10 density array representing oil distribution across boards
and distance buckets. Density is generated from shape functions
(crown for house/most PBA patterns, flat for Bear sport pattern).

Helpers exported: getPattern, getPatternsByCategory, ruleOf31,
patternLengthMeters.

Unlocks Lane asset's oil overlay functionality (separate session) and
the 9 content sections that reference specific patterns (Ch 7 and Ch 11).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

---

## Part 5: Scope Discipline

DO build:
- Type definitions
- Shape generation functions
- 11 pattern definitions
- Helper functions

DO NOT build:
- Oil overlay shader or rendering component
- Lane asset updates (unless as optional stretch)
- Scene components
- Content MDX
- Pattern animation over time (lane transition)
- Integration with ball path visualization

---

## Part 6: Common Pitfalls

### Pitfall 1: Over-precision on density values

You don't need PBA-exact numbers. Plausible shapes that capture the key characteristics are enough:
- High-ratio (house shot) = dramatic center/edge difference
- Low-ratio (Bear, sport) = uniform density
- Short patterns (Wolf, Cheetah) = drop to zero quickly
- Long patterns (Shark, Badger) = extend far down the lane

If the density looks "right" for a crown/flat/top-hat visually when eventually rendered, it's correct enough.

### Pitfall 2: Mixing up "length" and "distance buckets"

Pattern length is in feet (32-48 range). Distance buckets are 10 discrete slices across the pattern's length. A pattern at length 40 has its last distance bucket at 40 feet, not 60 feet. Buckets beyond the pattern length should have density 0.

### Pitfall 3: The 39 boards are counted right-to-left for right-handers

Board 1 is the right gutter (for a right-handed bowler's perspective). Board 20 is center. Board 39 is the left gutter. This matters when you calculate `distFromCenter` — use `Math.abs(board - 19.5)` for the half-board-offset centerline.

### Pitfall 4: `export default` vs named exports

Prefer named exports for data modules. The patterns file should export everything as named exports (`export const PATTERNS`, `export function getPattern`) so imports are explicit:

```typescript
import { PATTERNS, getPattern, ruleOf31 } from "@/lib/oil-patterns";
```

### Pitfall 5: Don't use any `any` types

TypeScript strict mode is enabled. Type every function signature. If you're tempted to use `any`, the answer is almost always "define a proper interface."

---

## Part 7: Verification Checklist

- [ ] `src/lib/oil-patterns.ts` exists
- [ ] `OilPattern` interface defined
- [ ] Category and difficulty types defined
- [ ] Shape functions implemented (crown, flat, at minimum)
- [ ] All 11 patterns defined in `PATTERNS` record
- [ ] Helper functions exported (`getPattern`, `getPatternsByCategory`, `ruleOf31`, `patternLengthMeters`)
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` succeeds
- [ ] Console log in prototype scene lists all 11 patterns (then removed)
- [ ] `ruleOf31(40)` returns 9 (house shot breakpoint sanity check)
- [ ] One commit, NOT pushed

---

## Part 8: First Prompt for the Fresh Session

```
Read docs/specs/12-SESSION-OIL-DATA.md fully. That's your complete briefing.
After reading it, read docs/research/lane-science-and-oil-patterns.md section 5
for the authoritative PBA pattern specs (use Grep or Read with offset to find
the section — the file is too big to read whole).

Then build src/lib/oil-patterns.ts with the OilPattern interface, shape generation
functions, all 11 named patterns (house shot + 10 PBA animals), and helper
functions. This is a pure data session — no 3D rendering, no React components.

Verify with `npx tsc --noEmit` and `npm run build`. Commit with a clear message.
Do NOT push — I'll review first.
```
