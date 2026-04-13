# Handoff 06 — Content Batch 2: Foundation Cluster (Chapter 1)

> **Status**: READY (depends on Lane and Pins assets being shipped)
> **Type**: Content writing session
> **Estimated duration**: 4-6 focused hours
> **Output**: 4 production MDX content sections + 1 commit
> **Created**: 2026-04-13

---

## Quick Header

| Field | Value |
|-------|-------|
| **Session ID** | Handoff 06 |
| **Session type** | Content batching |
| **Cluster name** | Foundation (Chapter 1: The Basics) |
| **Sections in batch** | 4 |
| **Asset dependencies** | Lane (Handoff 02), Pins (already shipped) |
| **Content map note** | The pin-deck content has visual support; lane-related content waits for the lane asset to fully render with markings |
| **PRD requirements served** | FR-1, NFR-6 |
| **PRD milestone advanced** | M2 (Content Wave 1) |
| **Persona served** | All personas (this is foundational orientation content) |
| **Stop condition** | After commit, before push |
| **Parallel-safe with** | Asset-build sessions (different files) |
| **NOT parallel-safe with** | Other content batches (would touch content-map.ts) |

---

## Part 1: Why This Batch

The Foundation Cluster is Chapter 1 — the foundational orientation content that any new bowler needs before they can absorb the more advanced equipment/release/strike topics. It's deliberately **not** the first batch because it requires the Lane and Pins assets to render meaningfully — but it should be the second content batch shipped, because once it lands, a reader can navigate the site sequentially from "What's a bowling lane?" to "What's rev rate?" and the learning path makes sense.

### The 4 sections

| # | Section | URL | Lines |
|---|---------|-----|-------|
| 1 | The Lane | `/learn/the-basics/the-lane` | 110-130 |
| 2 | The Pins | `/learn/the-basics/the-pins` | 90-110 |
| 3 | How Scoring Works | `/learn/the-basics/scoring` | 110-130 |
| 4 | Board Numbering | `/learn/the-basics/board-numbering` | 90-110 |

Total expected output: ~400-480 lines of MDX.

### How this differs from Content Batch 1

The voice rules, structure template, component API, and quality bar are IDENTICAL to Handoff 01 (Content Batch 1). This handoff doesn't repeat all of that — it references Handoff 01 as the canonical voice/structure source.

The differences:
- Different sections (Ch 1 instead of Ch 2 + Ch 5)
- Different research source (`lane-science-and-oil-patterns.md` and `strike-physics-and-scoring-science.md`)
- Different scene names that depend on Lane and Pins assets
- Slightly more "introductory" tone since this is foundational content

The atomic task template from Handoff 01 Part 5 applies unchanged. Refer to it directly.

---

## Part 2: Pre-Flight Reading Checklist

### Required reading (~50 minutes total)

- [ ] **`docs/handoffs/01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md`** (~25 min)
  - Read Parts 3, 4, 5, 7, 10, 11 in particular
  - Voice rules, component API, atomic task template, common pitfalls, stop conditions
  - This handoff INHERITS Handoff 01's voice and structure rules — re-read them so they're fresh

- [ ] **`content/the-release/rev-rate.mdx`** (~5 min)
  - The canonical voice reference (still THE North Star)

- [ ] **`docs/specs/14-PRD.md`** persona section (~5 min)
  - Refresh on Joe (primary persona) — Foundation content serves him too, just earlier in his journey

- [ ] **`docs/GLOSSARY.md`** (~10 min)
  - Definitions for: lane, board, foul line, gutter, pin, pin deck, pocket, frame, strike, spare, scoring system

### Per-section reading (during writing)

- [ ] **`docs/specs/07-INTERACTION-BLUEPRINTS.md`** sections 1.1-1.4 — find via Grep
- [ ] Research files for each section (see Part 4 below)

---

## Part 3: Inherits from Handoff 01

This handoff explicitly INHERITS from Handoff 01 the following (re-read in 01, do not duplicate here):

- **Part 3: The Voice Bible** — three hard rules, forbidden phrases, approved opening patterns, voice comparison test
- **Part 4: Component API** — Callout 4 variants, SceneCue rules, MDX syntax gotchas
- **Part 5: The Atomic Task Template** — Phases A through F per section
- **Part 7: Cross-Section Quality Pass** — same checks but apply to 4 sections instead of 5
- **Part 10: Common Pitfalls** — bowling-content-specific traps (axis confusion is less relevant here, but jargon definition is critical)
- **Part 11: Stop Conditions** — same rules

What's DIFFERENT in this handoff: Part 4 below (per-section specifics) and the commit message (Part 5).

---

## Part 4: Per-Section Specifics

### SECTION 1 of 4: The Lane

**Goal**: A new bowler understands the physical layout of a bowling lane — its dimensions, markings, gutters, and the coordinate system bowlers use to talk about positions.

**File path**: `content/the-basics/the-lane.mdx`

**URL**: `/learn/the-basics/the-lane`

**Content map entry**:
```typescript
"the-basics/the-lane": {
  title: "The Lane",
  chapter: "The Basics",
  chapterNumber: 1,
  scene: "the-lane",
  description: "60 feet of wood (or synthetic), 39 boards wide, with arrows and dots that everything else references",
},
```

**Blueprint reference**: `docs/specs/07-INTERACTION-BLUEPRINTS.md` §1.1 "The Lane"

**Research source**: `docs/research/lane-science-and-oil-patterns.md` §1
- Grep for `"60 feet"` or `"USBC"` or `"lane dimensions"`
- The file is 743 lines — use Read with offset

**Key concepts to convey** (5-8 facts):
1. Lane is **60 feet long**, 41.5 inches wide, with **39 boards** (each just over 1 inch wide)
2. **Foul line** at 0 feet, **lane dots** at 7 feet, **arrows** at 15 feet, pins at 60 feet
3. **Gutters** on either side, 9 inches each
4. Three zones based on ball motion: **heads** (0-20 ft), **midlane** (20-40 ft), **backends** (40-60 ft)
5. Lanes are made of **wood** (traditional maple+pine) or **synthetic** (modern polymer)
6. The boards and arrows are the **coordinate system** bowlers use — "I'm playing 10 at the arrows" means "I'm aiming at the second arrow on board 10"
7. The foul line is a HARD line — stepping over it = zero pins
8. Most modern centers use synthetic; traditional centers still use wood

**SceneCue params** (from blueprint, COPY VERBATIM):
```mdx
<SceneCue
  label="See it: The full 60 feet"
  description="Pull back and see the entire lane from approach to pin deck"
  params={{ highlightBoard: 20, showZones: false, showBoardNumbers: true }}
/>

<SceneCue
  label="See it: The three zones"
  description="Heads (blue), midlane (yellow), backends (green) — the ball's journey"
  params={{ showZones: true, showBoardNumbers: false }}
/>

<SceneCue
  label="See it: Where you aim — the arrows at 15 feet"
  description="7 arrows on boards 5, 10, 15, 20, 25, 30, 35"
  params={{ showMarkings: "Arrows Only", highlightBoard: 10 }}
/>
```

**Approved opening pattern**: "Surprising fact" — most people think a bowling lane is "long and narrow." It's actually 60 feet of precision instrument with marks and zones bowlers use to play the surface.

**Length target**: 110-130 lines (this is data-heavy with all the dimensions)

**Glossary terms**: Lane, board, foul line, gutter, arrows, lane dots, heads, midlane, backends, wood lane, synthetic lane, USBC

**The "aha moment"**: Dragging the highlight board slider from 1 to 39 and realizing each board is barely an inch wide. Bowlers aim at SPECIFIC inches at a target 60 feet away. The precision required is enormous.

---

### SECTION 2 of 4: The Pins

**Goal**: A new bowler understands the 10 pins — their dimensions, the triangle layout, the numbering convention, and the surprising fact that the ball only directly hits 4 of them.

**File path**: `content/the-basics/the-pins.mdx`

**URL**: `/learn/the-basics/the-pins`

**Content map entry**:
```typescript
"the-basics/the-pins": {
  title: "The Pins",
  chapter: "The Basics",
  chapterNumber: 1,
  scene: "the-pins",
  description: "10 pins in a triangle, but the ball only touches 4 of them",
},
```

**Blueprint reference**: §1.2 "The Pins"

**Research source**: `docs/research/strike-physics-and-scoring-science.md` §1
- Grep for `"pin"` or `"USBC pin specifications"`

**Key concepts to convey**:
1. **10 pins** arranged in an equilateral triangle, **12 inches** center-to-center
2. Each pin: **15 inches tall**, **3 lbs 6-10 oz**, max body diameter **4.766 inches**
3. Made of **laminated maple wood with plastic coating** (USBC spec)
4. Numbered **1 through 10** in rows: row 1 = pin 1 (head pin), row 2 = pins 2-3, row 3 = 4-5-6, row 4 = 7-8-9-10
5. **Pin 1 = head pin**, **pins 7 and 10 = corner pins** (the hardest to leave standing alone)
6. **The ball only directly hits 4 pins on a strike**: 1, 3, 5, 9 (for a right-hander). The other 6 fall via chain reactions.
7. Pins fall when tilted past **9-11 degrees** — surprisingly little force
8. **Pin deck** is the back area where pins stand; made of harder material than the lane

**SceneCue params** (from blueprint, COPY VERBATIM):
```mdx
<SceneCue
  label="See it: The triangle"
  description="Overhead view, 12-inch spacing between pins"
  params={{ cameraAngle: "overhead", showSpacing: true }}
/>

<SceneCue
  label="See it: Row by row"
  description="Pins light up by row: head pin gold, row 2 blue, row 3 green, row 4 red"
  params={{ highlightRow: "animated-sequence" }}
/>

<SceneCue
  label="See it: Where strikes happen — only 4 pins"
  description="The ball only touches pins 1, 3, 5, 9. The other 6 fall from chain reactions."
  params={{ highlightPins: [1, 3, 5, 9], dimOthers: true }}
/>
```

**Approved opening pattern**: "Surprising fact" — a strike isn't about the ball knocking down 10 pins. The ball only touches 4 of them.

**Length target**: 90-110 lines

**Glossary terms**: Pin, pin deck, head pin, pocket, strike, USBC, chain reaction (pin action)

**The "aha moment"**: The "Where strikes happen" SceneCue. Bowling is a chain reaction, not a direct hit. The ball is the spark; the pins do the work. This is the foundation for understanding pin action (Ch 8) later.

---

### SECTION 3 of 4: How Scoring Works

**Goal**: A new bowler understands traditional bowling scoring — frames, strikes, spares, the bonus mechanic, why a perfect game is 300, and the 10th frame oddity.

**File path**: `content/the-basics/scoring.mdx`

**URL**: `/learn/the-basics/scoring`

**Content map entry**:
```typescript
"the-basics/scoring": {
  title: "How Scoring Works",
  chapter: "The Basics",
  chapterNumber: 1,
  scene: "scoring",
  description: "Frames, strikes, spares, and why a perfect game is 300",
},
```

**Blueprint reference**: §1.3 "How Scoring Works"

**Research source**: `docs/research/strike-physics-and-scoring-science.md` §8
- Grep for `"scoring"` or `"frame"` or `"strike bonus"`

**Key concepts to convey**:
1. A game = **10 frames**. Each frame = up to 2 balls (3 in the 10th)
2. Knock down all 10 pins on the FIRST ball = **strike** (X). Worth 10 + the next 2 balls.
3. Knock down all 10 pins on the SECOND ball (after leaving some on the first) = **spare** (/). Worth 10 + the next 1 ball.
4. Open frame = some pins left after both balls = just the count.
5. **Strike bonus = next 2 balls** is why the score "waits" — frame 1's strike doesn't fill in until frame 2 finishes
6. **Three strikes in a row = a "turkey"** = 30 in the first frame. Maximum frame value = 30.
7. **Perfect game = 12 strikes in a row = 300**. (Why 12 if there are only 10 frames? The 10th frame allows up to 3 balls if you strike — bonus rolls.)
8. League average for adult recreational bowlers: **~150**. Pros: **220+**.

**SceneCue params** (from blueprint):
```mdx
<SceneCue
  label="See it: How a strike scores"
  description="Frame 1 stays blank until you see balls 2 and 3 — then it fills in retroactively"
  params={{ scenario: "Strike", autoPlay: true }}
/>

<SceneCue
  label="See it: Why spares matter"
  description="Spare + 8 = 18. Open frame (8, 1) = 9. Same pin count, 9-pin difference."
  params={{ scenario: "Spare", showComparison: true }}
/>

<SceneCue
  label="See it: The perfect 300"
  description="12 consecutive strikes. Score climbs: 30, 60, 90... 300 in gold."
  params={{ scenario: "Perfect Game", autoPlay: true }}
/>
```

**Approved opening pattern**: "The question" — "Why is a perfect game 300 instead of 100? The answer reveals everything about how scoring actually works."

**Length target**: 110-130 lines (scoring needs explanation room)

**Glossary terms**: Frame, strike, spare, perfect game, head pin

**The "aha moment"**: The Turkey animation. Watching frame 1 stay blank through 3 balls, then suddenly score 30. The realization that bowling scoring rewards SEQUENCES, not single shots. Strikes pay forward.

---

### SECTION 4 of 4: Board Numbering

**Goal**: A new bowler understands the board numbering system that bowlers use to communicate positions and adjustments — and viscerally understands how narrow each board really is.

**File path**: `content/the-basics/board-numbering.mdx`

**URL**: `/learn/the-basics/board-numbering`

**Content map entry**:
```typescript
"the-basics/board-numbering": {
  title: "Board Numbering",
  chapter: "The Basics",
  chapterNumber: 1,
  scene: "board-numbering",
  description: "39 boards across the lane, each barely an inch wide — and bowlers aim at specific ones",
},
```

**Blueprint reference**: §1.4 "Board Numbering"

**Research source**: `docs/research/lane-science-and-oil-patterns.md` §1.2 + §2
- Grep for `"39 boards"` or `"board numbering"`

**Key concepts to convey**:
1. The lane has **39 boards** running its length (foul line to pins). Each is just over **1 inch wide**.
2. Numbered **1 to 39, right to left** for right-handed bowlers (board 1 is the right gutter side, board 20 is center, board 39 is the left gutter side)
3. **Left-handed convention is mirrored** (board 1 on their right side becomes board 1 on the lane's left side from the right-hander's perspective)
4. The **arrows at 15 feet** are at boards 5, 10, 15, 20, 25, 30, 35 (every 5 boards)
5. The **track area** — boards 8-12 — is where most balls travel and the first to dry out
6. "Move 2 boards left" means moving less than 2 actual inches — a tiny adjustment that completely changes where the ball arrives 60 feet away
7. Bowlers describe their target line in board numbers: "I'm playing 12 at the arrows out to 4 at the breakpoint"
8. The board system is the SHARED LANGUAGE bowlers use for everything — adjustments, coaching, equipment recommendations

**SceneCue params** (from blueprint):
```mdx
<SceneCue
  label="See it: How narrow a board really is"
  description="Slider exaggerates board width 5x, then drops to actual size — barely visible"
  params={{ boardWidthExaggeration: 1, highlightBoard: 10 }}
/>

<SceneCue
  label="See it: Arrow-to-board connection"
  description="Each arrow glows with its board number"
  params={{ showArrows: true, showArrowLabels: true }}
/>

<SceneCue
  label="See it: The track area"
  description="Boards 8-12 — where most balls travel"
  params={{ highlightRange: [8, 12], highlightColor: "orange" }}
/>
```

**Approved opening pattern**: "Direct + stakes" — "Bowlers aim at specific inches at a target 60 feet away. The board numbering system is how they talk about it."

**Length target**: 90-110 lines

**Glossary terms**: Board, boards, arrows, track area, gutter

**The "aha moment"**: The Board Width Exaggeration slider. At 5x, "board 10" looks like a wide plank — easy target. At 1x actual size, each board is barely an inch — pencil width. The user viscerally understands that "move 2 boards left" is moving less than 2 inches, and bowlers make these microscopic adjustments to change where the ball arrives 60 feet away.

---

## Part 5: Apply Phases A-F to Each Section

For each of the 4 sections, work through Phases A through F as defined in Handoff 01 Part 5. The template is identical:

- **Phase A**: Research & Orientation (~15-20 min)
- **Phase B**: Outline (~10 min)
- **Phase C**: Write (~30-45 min)
- **Phase D**: Quality Pass (~10 min)
- **Phase E**: Register in content-map.ts (~3 min)
- **Phase F**: Verify (~5 min)

Use the per-section specifics in Part 4 above for: file path, content-map entry, research source, key concepts, exact SceneCue params, opening pattern, length target, glossary terms, and "aha moment."

---

## Part 6: Cross-Section Quality Pass

After all 4 sections individually pass Phase F:

- [ ] **CS1.** Read all 4 sections in browser as a sequence. Do they form a coherent introduction? Does The Lane → The Pins → How Scoring Works → Board Numbering feel like a natural progression?
- [ ] **CS2.** Cross-reference: "The Lane" mentions arrows briefly, "Board Numbering" goes deep on them. Make sure they don't repeat the same explanation — each builds on the other.
- [ ] **CS3.** Verify NO section uses bowling jargon undefined. Cross-check against `docs/GLOSSARY.md`.
- [ ] **CS4.** Verify SceneCue counts: each section should have 2-4 cues
- [ ] **CS5.** Verify total line count: ~400-480 lines across the 4 files
- [ ] **CS6.** `npm run build` — must succeed
- [ ] **CS7.** `npx tsc --noEmit` — clean
- [ ] **CS8.** All 4 routes return 200:
  ```bash
  for path in the-basics/the-lane the-basics/the-pins the-basics/scoring the-basics/board-numbering; do
    curl -s -o /dev/null -w "$path: %{http_code}\n" http://localhost:6200/learn/$path
  done
  ```

---

## Part 7: Commit (single commit, do NOT push)

- [ ] Stage:
  ```bash
  git add content/the-basics/the-lane.mdx
  git add content/the-basics/the-pins.mdx
  git add content/the-basics/scoring.mdx
  git add content/the-basics/board-numbering.mdx
  git add src/lib/content-map.ts
  ```

- [ ] Commit message:

```
content: chapter 1 foundation cluster (4 sections)

Adds Content Batch 2 — the Foundation Cluster — covering the orientation
material every new bowler needs before diving into equipment, release,
or strike physics.

Sections:
- the-basics/the-lane — physical lane: 60ft, 41.5in, 39 boards, markings
- the-basics/the-pins — 10 pins in a triangle, only 4 directly hit on a strike
- the-basics/scoring — frames, strikes, spares, why a perfect game is 300
- the-basics/board-numbering — the coordinate system, viscerally narrow boards

All 4 sections target both the primary persona (Joe — new custom-ball
owner orienting himself) and secondary persona (Pat — the returning
bowler refreshing fundamentals). Voice matches rev-rate.mdx canonical
reference and follows spec 08 voice rules.

Scene components for the new scene names (the-lane, the-pins, scoring,
board-numbering) will be built in a future scene-building session —
content pages currently fall through to DefaultScene. The Lane and
Pins assets are already shipped, so once their scenes are built the
visual experience activates immediately.

Site goes from 6 → 10 production content sections.

PRD: serves FR-1, NFR-6. Advances milestone M2 (Content Wave 1) toward
its 10-section target.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

- [ ] Verify commit, **DO NOT push**.

### STATUS update (separate commit)

- [ ] Update `docs/STATUS.md` — add the 4 new sections, update count to 10/53, add commit hash
- [ ] Commit: `docs: status update after content batch 2`
- [ ] Stop.

---

## Part 8: PRD Cross-Reference

| PRD Reference | Contribution |
|---------------|--------------|
| **FR-1** (Educational content) | 4 of 53 sections written; total now 10/53 |
| **NFR-6** (Voice consistency) | 4 sections matching rev-rate.mdx canonical voice |
| **Persona Joe** | Foundational orientation Joe needs before the equipment content |
| **Persona Pat** | Returning bowler's refresher on basics |
| **Journey 1 & 2** | First-visit users now have a clear "start here" entry: The Lane → The Pins → Scoring → Board Numbering → (then Ch 2) |
| **Milestone M2** | M2 requires 10 sections + 10 scenes. After this session: 10 sections shipped, scenes still in progress. |

---

## Part 9: The Master Prompt (Copy Verbatim)

```
You are executing Handoff 06 — Content Batch 2: Foundation Cluster (Ch 1).
The complete handoff document is at:
docs/handoffs/06-CONTENT-BATCH-2-FOUNDATION.md

READ THAT FILE IN FULL FIRST.

Your goal: write 4 production MDX content sections for Chapter 1
(The Basics) — The Lane, The Pins, How Scoring Works, Board Numbering.
Total target output: 400-480 lines of polished MDX across 4 files.

This handoff INHERITS voice rules, structure template, component API,
and atomic task template from Handoff 01 (Content Batch 1). You MUST
read both:

Required reading order (BEFORE writing):
1. docs/handoffs/06-CONTENT-BATCH-2-FOUNDATION.md (this file)
2. docs/handoffs/01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md — re-read
   Parts 3, 4, 5, 7, 10, 11 for voice/structure/atomic-tasks/pitfalls/stops
3. content/the-release/rev-rate.mdx — the canonical voice reference
4. docs/specs/14-PRD.md persona section
5. docs/GLOSSARY.md — definitions for: lane, board, foul line, gutter,
   pin, pin deck, frame, strike, spare, perfect game, arrows, etc.

Per section, you'll also read:
- The matching blueprint in docs/specs/07-INTERACTION-BLUEPRINTS.md
  sections 1.1-1.4 (use Grep)
- Research files: docs/research/lane-science-and-oil-patterns.md §1-2
  and docs/research/strike-physics-and-scoring-science.md §1, §8
  (use Grep + Read with offset — files are too large to read whole)

Workflow: For each of the 4 sections, work through Phases A-F as
defined in Handoff 01 Part 5. Use the per-section specifics in Part 4
of THIS handoff for: file path, content-map entry (copy-pasteable),
research source, key concepts, exact SceneCue params (verbatim from
blueprint), opening pattern, length target, glossary terms, and the
"aha moment" the prose must build toward.

After all 4 sections pass Phase F, do the cross-section quality pass
in Part 6, commit with the message in Part 7, then update STATUS.md
as a separate small commit. Do NOT push.

Stop conditions and pitfalls inherited from Handoff 01.

This session is parallel-safe with asset-build sessions but is NOT
parallel-safe with other content batch sessions (they'd both touch
content-map.ts and could conflict).

Begin by reading both handoff docs. Confirm when ready to start
Section 1.
```
