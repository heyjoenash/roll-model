# Handoff 03 — Oil Pattern Data Library

> **Status**: READY
> **Type**: Pure data session (TypeScript, no 3D)
> **Estimated duration**: 1.5-2 focused hours (half session)
> **Output**: `src/lib/oil-patterns.ts` + 1 commit
> **Created**: 2026-04-13

---

## Quick Header

| Field | Value |
|-------|-------|
| **Session ID** | Handoff 03 |
| **Session type** | Data file build |
| **Asset name** | Oil Pattern Data Library |
| **Files created** | 1 (`src/lib/oil-patterns.ts`) |
| **Files modified** | None (or optionally Lane's index.tsx to re-export the type) |
| **Asset dependencies** | None |
| **Unlocks** | Lane asset's oil overlay rendering + ~9 future scene components in Ch 7 and Ch 11 |
| **PRD requirements served** | FR-2 (lane scene functionality) |
| **PRD milestone advanced** | M1 (Asset Foundation) |
| **Stop condition** | After commit, before push |
| **Parallel-safe with** | Handoff 01 (Content Batch 1), Handoff 02 (Lane Asset) |

---

## Part 1: Why This Session Matters

Chapter 7 of Roll Model is entirely about lane conditions and oil patterns — 6 content sections all referencing specific patterns by name (Cheetah, Wolf, Badger, etc.). Chapter 11 (Reading the Lane) uses pattern length for the Rule of 31 calculations.

Without a typed data file containing the actual pattern specs (length, volume, ratio, density distribution), none of these scenes can render. The Lane asset has an `oilPattern` prop that's currently a stub. This session fills that gap.

**This is a pure data session.** No 3D. No React components. No visual work. Just typed TypeScript constants extracted from bowling research and exposed via clean helper functions. The whole session is research → typed data → tests.

It's a half-session (1.5-2 hours) because the work is mechanical: read the research file, define the interface, build the shape functions, define 11 patterns, write a few helpers, verify it compiles. No design decisions, no debugging.

### What success looks like at the end of this session

A new file at `src/lib/oil-patterns.ts` that exports:
- The `OilPattern` TypeScript interface
- 11 named patterns: house shot + 10 PBA animals (Wolf, Cheetah, Viper, Chameleon, Bear, Scorpion, Dragon, Badger, Shark, Bat)
- Helper functions: `getPattern`, `getPatternsByCategory`, `ruleOf31`, `patternLengthMeters`
- Plausible 39×10 density arrays for each pattern using shape generation functions

Calling `getPattern("house-shot").length` returns `40`. Calling `ruleOf31(40)` returns `9`. The file compiles cleanly and is ready to be consumed by future Lane oil overlay rendering and Chapter 7/11 scene components.

---

## Part 2: Pre-Flight Reading Checklist

### Required reading (~15 minutes total)

- [ ] **`docs/specs/12-SESSION-OIL-DATA.md`** (~10 min)
  - The generic oil data playbook
  - Read sections "What You Are Building", "The Data Structure", "The 11 Patterns to Build", and "The Density Array"
  - This handoff is the SPECIFIC atomic application of that playbook

- [ ] **`docs/specs/09-ASSET-ARCHITECTURE.md`** "Asset 5: Oil Pattern Data" subsection (~3 min)
  - Defines the `OilPattern` interface contract that scenes will consume

- [ ] **`docs/research/lane-science-and-oil-patterns.md`** §5 (~10 min via Grep+Read)
  - **The critical source.** Has all 10 PBA pattern specs.
  - Use Grep with pattern `"Wolf"` or `"PBA"` or `"oil pattern"` to find the section
  - Use Read with offset to load just §5 (the file is 743 lines — too much to read whole)
  - Note: pattern lengths, volumes, ratios for each named pattern

### Reference (consult during writing)

- [ ] `docs/GLOSSARY.md` — for the "Oil pattern", "House shot", and "PBA patterns" entries (cross-check definitions for consistency)

---

## Part 3: The Data Structure (What You're Building)

```typescript
export type OilPatternCategory = 'house' | 'sport' | 'challenge' | 'pba-animal';
export type OilPatternDifficulty = 'easy' | 'medium' | 'hard' | 'extreme';
export type OilPatternId =
  | 'house-shot'
  | 'wolf' | 'cheetah' | 'viper' | 'chameleon' | 'bear'
  | 'scorpion' | 'dragon' | 'badger' | 'shark' | 'bat';

export interface OilPattern {
  id: OilPatternId;
  name: string;
  category: OilPatternCategory;
  difficulty: OilPatternDifficulty;

  // Specs
  length: number;          // feet
  volumeMl: number;        // total oil in mL
  ratio: string;           // human-readable, e.g. "10:1"
  ratioNumeric: number;    // the ratio as a number, e.g. 10

  // Density per board, distance bucket
  // density[board][distanceBucket] = oil density 0-1
  // board: 0-38 (39 boards), distanceBucket: 0-9
  density: number[][];

  description: string;     // 1-2 sentence summary
  notes?: string;          // optional strategic notes
}
```

---

## Part 4: Atomic Task Checklist

### Phase A — File Skeleton (~5 min)

- [ ] **A1.** Create `src/lib/oil-patterns.ts`
- [ ] **A2.** Add a JSDoc header comment explaining the file's purpose and citing the research source
- [ ] **A3.** Define and export `OilPatternCategory` type
- [ ] **A4.** Define and export `OilPatternDifficulty` type
- [ ] **A5.** Define and export `OilPatternId` union type with all 11 IDs
- [ ] **A6.** Define and export `OilPattern` interface (per Part 3 above)

### Phase B — Shape Generation Functions (~20 min)

The shape functions take basic specs (length, ratio, volume) and produce a 39×10 density array. You need at least 2: `crownShape` (for house shots and most PBA patterns) and `flatShape` (for the Bear sport pattern). Optionally a third for top-hat shapes.

- [ ] **B1.** Implement `crownShape(length: number, ratio: number, volumeMl: number): number[][]`
  - Inner loop: for each of 39 boards, for each of 10 distance buckets
  - Compute distance from center: `Math.abs(board - 19.5)`
  - Compute width factor: stronger taper for higher ratios
  - Compute distance bucket distance in feet: `(bucket / 10) * 60`
  - Return 0 density if bucket is beyond the pattern length
  - Use the formula: `widthFactor = Math.max(0, 1 - (distFromCenter / 19.5) * (ratio / (ratio + 1)))`
- [ ] **B2.** Implement `flatShape(length: number, volumeMl: number): number[][]`
  - Similar structure but with minimal taper from center
  - Use: `widthFactor = Math.max(0.5, 1 - (distFromCenter / 19.5) * 0.3)`
- [ ] **B3.** (Optional) Implement `topHatShape(length: number, volumeMl: number): number[][]`
  - Flat in middle, steep dropoff at edges (vs gradual taper of crown)
- [ ] **B4.** Test mental model: a crown shape with ratio 10 should produce density values close to 1.0 in the center and close to 0 on the outside boards. A flat shape with ratio 1.5 should produce values around 0.7-1.0 across all boards.

### Phase C — Define All 11 Patterns (~30 min)

For each pattern, create an OilPattern object using the appropriate shape function. Cross-reference the research file for exact specs.

- [ ] **C1.** Define `housePattern` — id "house-shot", category 'house', difficulty 'easy', length 40, volume 25, ratio "10:1", ratioNumeric 10, shape: `crownShape(40, 10, 25)`
- [ ] **C2.** Define `wolfPattern` — id "wolf", 'pba-animal', 'hard', length 32 (shortest), volume 20, ratio "2.5:1", ratioNumeric 2.5, `crownShape(32, 2.5, 20)`
- [ ] **C3.** Define `cheetahPattern` — id "cheetah", 'pba-animal', 'medium', length 35, volume 22, ratio "3.4:1", ratioNumeric 3.4, `crownShape(35, 3.4, 22)`
- [ ] **C4.** Define `viperPattern` — id "viper", 'pba-animal', 'hard', length 36, volume 24, ratio "3.5:1", ratioNumeric 3.5, `crownShape(36, 3.5, 24)`
- [ ] **C5.** Define `chameleonPattern` — id "chameleon", 'pba-animal', 'hard', length 39, volume 25, ratio "3:1", ratioNumeric 3, `crownShape(39, 3, 25)`
- [ ] **C6.** Define `bearPattern` — id "bear", 'pba-animal', 'extreme', length 40, volume 26, ratio "1.5:1", ratioNumeric 1.5, **uses `flatShape(40, 26)`** (THE flat sport pattern)
- [ ] **C7.** Define `scorpionPattern` — id "scorpion", 'pba-animal', 'hard', length 42, volume 27, ratio "2.5:1", ratioNumeric 2.5, `crownShape(42, 2.5, 27)`
- [ ] **C8.** Define `dragonPattern` — id "dragon", 'pba-animal', 'hard', length 45, volume 28, ratio "2:1", ratioNumeric 2, `crownShape(45, 2, 28)`
- [ ] **C9.** Define `badgerPattern` — id "badger", 'pba-animal', 'extreme', length 47 (one of the longest), volume 30, ratio "2:1", ratioNumeric 2, `crownShape(47, 2, 30)`
- [ ] **C10.** Define `sharkPattern` — id "shark", 'pba-animal', 'extreme', length 48 (longest), volume 30, ratio "2:1", ratioNumeric 2, `crownShape(48, 2, 30)`
- [ ] **C11.** Define `batPattern` — id "bat", 'pba-animal', 'hard', length 36, volume 24, ratio "3:1", ratioNumeric 3, `crownShape(36, 3, 24)`
- [ ] **C12.** Add a `description` (1-2 sentences) and optional `notes` field for each pattern. Reference the research for accurate descriptions. Sample descriptions:
  - House shot: "The most common recreational pattern. Heavy oil in the center creates 'walls' that funnel errant shots back to the pocket."
  - Wolf: "The shortest PBA pattern at 32 feet. Minimal oil means the ball hooks early and forces bowlers outside near the gutter."
  - Bear: "The flat pattern. Nearly 1:1 ratio means no friction differential — no walls to save you. Misses go exactly where you miss."
  - Badger: "Very long pattern at 47 feet. Oil extends nearly to the pins, forcing bowlers deep inside the lane."
- [ ] **C13.** Verify each pattern has all required fields populated

### Phase D — Pattern Lookup Table (~5 min)

- [ ] **D1.** Create the `PATTERNS` constant: `Record<OilPatternId, OilPattern>`
- [ ] **D2.** Add all 11 patterns to the record using their ids as keys
- [ ] **D3.** Export `PATTERNS`

### Phase E — Helper Functions (~15 min)

- [ ] **E1.** Implement and export `getPattern(id: OilPatternId): OilPattern`
  - Returns `PATTERNS[id]`
  - Note: TypeScript ensures the id is valid at compile time, so no runtime safety check needed
- [ ] **E2.** Implement and export `getPatternsByCategory(category: OilPatternCategory): OilPattern[]`
  - `Object.values(PATTERNS).filter(p => p.category === category)`
- [ ] **E3.** Implement and export `ruleOf31(patternLength: number): number`
  - Formula: `breakpoint board = pattern length - 31`
  - Return `Math.max(1, patternLength - 31)`
- [ ] **E4.** Implement and export `patternLengthMeters(pattern: OilPattern): number`
  - Convert feet to meters: `pattern.length * 0.3048`

### Phase F — Verification (~10 min)

- [ ] **F1.** Run `npx tsc --noEmit` — verify zero errors
- [ ] **F2.** Run `npm run build` — verify successful build
- [ ] **F3.** Sanity-check the data with a temporary console.log somewhere accessible (e.g., the prototype scene):
  ```typescript
  import { PATTERNS, getPattern, ruleOf31 } from "@/lib/oil-patterns";
  console.log("All patterns:", Object.keys(PATTERNS));
  console.log("House shot:", getPattern("house-shot"));
  console.log("Wolf breakpoint:", ruleOf31(getPattern("wolf").length));
  console.log("House shot breakpoint:", ruleOf31(40));
  ```
  Expected output: 11 pattern keys, house shot details, Wolf breakpoint = 1, House shot breakpoint = 9.
- [ ] **F4.** Open `http://localhost:6200/learn/prototypes` and check the browser console
- [ ] **F5.** Verify all expected logs appear with correct values
- [ ] **F6.** **REMOVE the console.logs before committing** — they were just smoke tests

### Phase G — Commit (single commit, do NOT push)

- [ ] **G1.** Stage exactly this file:
  ```bash
  git add src/lib/oil-patterns.ts
  ```
- [ ] **G2.** Commit with this message:

```
feat: oil pattern data library — house shot + 10 PBA animals

Adds src/lib/oil-patterns.ts with 11 named oil patterns and helper
functions. Pure data, no 3D rendering — that comes in a future session
when the Lane asset's oil overlay is wired up.

Patterns defined:
- House Shot (40ft, 10:1 ratio, the recreational standard)
- Wolf (32ft, shortest PBA pattern)
- Cheetah (35ft, classic short pattern, gutter play)
- Viper (36ft)
- Chameleon (39ft)
- Bear (40ft, the flat sport pattern, 1.5:1 ratio)
- Scorpion (42ft)
- Dragon (45ft)
- Badger (47ft, requires deep inside line)
- Shark (48ft, the longest)
- Bat (36ft)

Each pattern includes specs (length, volume, ratio, category, difficulty)
plus a 39x10 density array generated from shape functions (crown for
house/most PBA patterns, flat for Bear).

Helpers exported: getPattern, getPatternsByCategory, ruleOf31,
patternLengthMeters.

Unlocks the Lane asset's oil overlay functionality (separate session)
and the 9 content sections in Ch 7 (Lane Conditions) and Ch 11
(Reading the Lane) that reference specific patterns by name.

PRD: serves FR-2. Advances milestone M1 (Asset Foundation).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

- [ ] **G3.** Verify the commit (`git log -1`)
- [ ] **G4.** **DO NOT push.**

### Phase H — STATUS Update (separate small commit)

- [ ] **H1.** Read `docs/STATUS.md`
- [ ] **H2.** Add "Oil pattern data library" to "What's Done" section under a new "3D Asset Data" subsection (or similar)
- [ ] **H3.** Update "What's Next" — Oil data is done, the next priority is Scene Building Chapter 2 (handoff 04) or wiring up the Lane oil overlay
- [ ] **H4.** Add the new commit hash to "Recent Activity"
- [ ] **H5.** Update the "Last Updated" date
- [ ] **H6.** Commit STATUS.md as a separate commit:
  ```
  docs: status update after oil pattern data
  ```
- [ ] **H7.** Stop. Do NOT push.

---

## Part 5: Common Pitfalls

### Pitfall 1: Over-precision on density values

You don't need PBA-exact density numbers. Plausible shapes are enough:
- High-ratio (house shot) = dramatic center/edge difference
- Low-ratio (Bear, sport) = uniform density
- Short patterns (Wolf, Cheetah) = drop to zero quickly
- Long patterns (Shark, Badger) = extend far down the lane

The actual rendering will be approximate — readers perceive "center-heavy" vs "flat" as the key signal. Don't waste time hand-tuning individual density values.

### Pitfall 2: Mixing up "length" and "distance buckets"

Pattern length is in feet (32-48 range). Distance buckets are 10 discrete slices spanning the lane's full 60 feet. A 40-foot pattern occupies the first 6.67 buckets (40/60 × 10) and is ZERO density in buckets 7-9.

Use this formula in your shape functions:
```typescript
const bucketDistanceFt = (bucket / 10) * 60;  // bucket distance in feet
const inPattern = bucketDistanceFt <= length;
density[board][bucket] = inPattern ? widthFactor : 0;
```

### Pitfall 3: Board direction (right-handed convention)

The 39 boards are counted right-to-left from the right-handed bowler's perspective. Board 1 is the right gutter side, board 20 is center, board 39 is the left gutter side.

The shape functions don't actually care about left vs right because the density arrays are symmetric — center is `Math.abs(board - 19.5)`. Just be consistent: index 0 of the array is board 1.

### Pitfall 4: TypeScript strict mode — no `any`

The project has TypeScript strict mode enabled. Don't use `any`. Don't use `as unknown as Type`. If you find yourself reaching for these, the answer is to define a proper type.

### Pitfall 5: Forgetting to remove smoke-test console.logs

In Phase F, you'll add temporary console.logs to verify the data loads. **Remove these before committing.** Run a final search for `console.log` in the file you're committing — there should be none.

### Pitfall 6: Skipping the actual research file

It's tempting to just use the spec numbers (length, ratio, volume) from this handoff and skip reading the research file. Don't. The research has authoritative descriptions and historical context that improve the `description` field for each pattern. A hand-waved description shipped to production will need to be rewritten later.

---

## Part 6: Stop Conditions

You should STOP and ask the user (NOT push, NOT commit) if:

1. **You can't find the PBA patterns section in the research file.** Don't guess at the specs. Stop.
2. **A pattern's spec in the research conflicts with this handoff's spec.** The research is authoritative. Update the handoff ref but stop and tell the user.
3. **The shape function you're writing produces all-zeros or all-ones density arrays.** That's a bug. Stop and debug.
4. **`npx tsc --noEmit` fails and you can't fix it in 1 attempt.** Stop.

You should COMMIT (and stop) when:

1. The file `src/lib/oil-patterns.ts` exists with all 11 patterns
2. All helper functions exported
3. `npx tsc --noEmit` clean
4. `npm run build` succeeds
5. Console.log smoke test confirmed correct values
6. Console.logs removed
7. STATUS update queued for separate small commit

You should NEVER:

1. Push to main without explicit user approval
2. Modify any file outside `src/lib/oil-patterns.ts` and `docs/STATUS.md`
3. Add new dependencies
4. Build oil overlay rendering in the Lane asset (that's a future session that builds on top of this data)
5. Modify scene components

---

## Part 7: PRD Cross-Reference

This handoff serves the following PRD requirements:

| PRD Reference | Contribution |
|---------------|--------------|
| **FR-2** (Interactive 3D scenes) | Provides the data that scenes for Ch 7 and Ch 11 need to render oil patterns |
| **Milestone M1** (Asset Foundation) | Critical sub-component of the Lane asset's full functionality |

---

## Part 8: The Master Prompt (Copy Verbatim)

```
You are executing Handoff 03 — Oil Pattern Data Library. The complete
handoff document is at:
docs/handoffs/03-OIL-PATTERN-DATA.md

READ THAT FILE IN FULL FIRST. It is the only set of instructions you need
for this session. This is a half-session (~1.5-2 hours).

Your goal: build src/lib/oil-patterns.ts containing the OilPattern
TypeScript interface, shape generation functions, all 11 named patterns
(house shot + 10 PBA animals), and helper functions (getPattern,
getPatternsByCategory, ruleOf31, patternLengthMeters). This is a pure
data session — no 3D, no React components.

Required reading order (BEFORE writing code):
1. docs/handoffs/03-OIL-PATTERN-DATA.md (this file)
2. docs/specs/12-SESSION-OIL-DATA.md — the generic oil data playbook
3. docs/specs/09-ASSET-ARCHITECTURE.md "Asset 5: Oil Pattern Data" subsection
4. docs/research/lane-science-and-oil-patterns.md §5 — use Grep + Read
   with offset to find the section. The file is too large to read whole.
   This is the authoritative source for pattern specs.

Workflow: work through Phases A-H in Part 4 of the handoff:
- Phase A: File skeleton with type definitions
- Phase B: Shape generation functions (crownShape, flatShape)
- Phase C: Define all 11 patterns
- Phase D: PATTERNS lookup table
- Phase E: Helper functions
- Phase F: Verification with smoke-test console.logs (then remove them)
- Phase G: Single commit (do NOT push)
- Phase H: STATUS.md update as separate commit

Stop conditions are in Part 6. If you hit any of them, stop and ask.

This session is parallel-safe with handoffs 01 and 02 — completely
different files, no overlap.

Begin by reading the handoff doc. Confirm when you're ready to start
Phase A.
```
