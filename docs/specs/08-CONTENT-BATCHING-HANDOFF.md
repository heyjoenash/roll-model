# Roll Model — Content Batching Session Handoff

> **Status**: CANONICAL
> **Created**: 2026-04-12
> **Purpose**: Self-contained briefing for a fresh Claude Code session to write MDX content in batches
> **Read this first, then read the files it references, then start writing**

---

## What You Are Doing

You are writing educational MDX content for **Roll Model** — an interactive 3D bowling encyclopedia at `github.com/heyjoenash/roll-model`, deployed at `roll-model.vercel.app`. Each content section is a `.mdx` file that renders in the left panel of a split layout, with an interactive 3D scene on the right. The user reads, and at key moments clicks `<SceneCue>` buttons that change what the 3D scene shows.

You are NOT building 3D scenes in this session. You are writing prose, tables, callouts, and SceneCue buttons. The 3D scenes get built in separate sessions using the interaction blueprints.

The project has 53 planned content sections across 12 chapters. Only 1 section is currently written (Rev Rate). Your job is to write sections in **batches of 3-5 related sections per session** — a "cluster" that shares research sources, scene types, and voice.

---

## Required Reading Before You Start

Read these files IN THIS ORDER before writing anything:

1. **`content/the-release/rev-rate.mdx`** — This is the ONE existing section. It is the style bible. Every section you write should match its voice, structure, and format.

2. **`docs/specs/07-INTERACTION-BLUEPRINTS.md`** — The complete production bible. For every section you write, find its entry here and use the exact SceneCue params, labels, and descriptions specified. The blueprints are canonical — do not invent your own SceneCue params.

3. **`src/lib/content-map.ts`** — The chapter/section registry. When you complete a new section, you must add its entry here so the routing works.

4. **`docs/specs/05-CONTENT-ARCHITECTURE.md`** — The content pipeline reference. Explains file naming, research source mapping, URL routing.

5. **The relevant research files** in `docs/research/` for your batch (see "Research Source Mapping" below).

---

## The Writing Voice — CRITICAL

Read `content/the-release/rev-rate.mdx` carefully. Here are the voice characteristics you MUST match:

### Voice Rules

1. **Second person** — Write TO the reader: "Your rev rate will change..." not "A bowler's rev rate changes..."
2. **Conversational but precise** — Use exact numbers naturally, not pedantically. "Elite two-handers reach 600+ RPM" is better than "Research has shown that elite-level two-handed bowlers typically generate rotational velocities in excess of 600 revolutions per minute."
3. **Build understanding progressively** — Concept first, then data, then practical application. Never drop a table before explaining what the table shows.
4. **No academic citations** — Strip all "(Smith et al., 2023)" or "USBC research has demonstrated" intros. Just state the facts. "USBC researchers found the optimal entry angle is 6 degrees" is fine. "A comprehensive study by the USBC Equipment Specifications and Certification group concluded that..." is not.
5. **No jargon without explanation** — First time you use "coverstock" or "PAP" or "breakpoint", define it in the same sentence.
6. **End with application** — Every section ends with "what should you do with this knowledge." Not just facts, but something the reader can actually act on.
7. **Opening hook** — The first paragraph must create curiosity or stakes. Don't lead with a dictionary definition.

### Forbidden Phrases
- "In this section, we will..."
- "It is important to note that..."
- "Research has shown that..."
- "As previously mentioned..."
- "Let's dive into..."
- Any form of "Did you know..."

### Approved Opening Patterns
- Start with a surprising fact or number
- Start with a common misconception
- Start with a direct "here's the thing" statement
- Start with the question the section answers

### Example Comparison

❌ Bad (academic):
> "The axis tilt of a bowling ball refers to the angle at which the rotational axis is oriented relative to the horizontal plane. Research conducted by bowling scientists has identified that axis tilt values typically range from 5 to 25 degrees for most bowlers."

✅ Good (Roll Model voice):
> "Axis tilt controls one thing: how much of your ball actually touches the lane. At 0 degrees, the ball rolls like a car tire — wide contact, maximum friction. At 90 degrees, it spins like a top with almost nothing touching. Most bowlers live between 5 and 25 degrees, and that range is where all the interesting stuff happens."

---

## The Components You Can Use in MDX

### Standard Markdown

All standard MDX elements work and are pre-styled:
- Headings (`#`, `##`, `###`)
- Paragraphs
- Lists (bullet and numbered)
- Tables (GFM syntax)
- Bold, italic, inline code
- Blockquotes

Use headings sparingly — usually just `##` (h2) for major sections within a page. The `#` (h1) title at the top is optional since the page has its own title from the content map.

### `<Callout>` Component

Four types of callout boxes:

```mdx
<Callout type="key">
The single most important concept in this section. Use once per page at the top.
</Callout>

<Callout type="pro-tip">
Practical advice a reader can apply immediately. Use 1-2 times per section.
</Callout>

<Callout type="warning">
Common mistake or something to avoid. Use when relevant, not every section.
</Callout>

<Callout type="note">
Additional context or side information. Use sparingly.
</Callout>
```

Callouts should contain prose, not tables or headings. Keep them short (1-3 sentences).

### `<SceneCue>` Component — The Key Interactive Element

```mdx
<SceneCue
  label="See it: Gentle 150 RPM roll"
  description="Watch how slowly a beginner's ball rotates — the ball barely turns."
  params={{ rpm: 150, showAxis: true, ballColor: "#22c55e" }}
/>
```

Rules for SceneCues:
- **Label** starts with "See it:" followed by the specific thing to observe
- **Description** is optional but helpful — 1 sentence explaining what to watch for
- **Params** are exactly the values from `docs/specs/07-INTERACTION-BLUEPRINTS.md` for this section — do not invent your own
- Use **2-4 SceneCues per section**, placed at natural reading moments
- First SceneCue should appear within the first 200 words (hook the interaction early)
- SceneCues create **dramatic contrast** — go from 150 to 600 RPM, not 400 to 420
- Never more than 4 per section — they lose impact if overused

---

## Section Structure Template

Every section should follow this rough structure (see `rev-rate.mdx` for the canonical example):

```
# [Title]

[Opening hook paragraph — 2-4 sentences, creates stakes or curiosity]

<Callout type="key">
[The single most important takeaway, 1-2 sentences]
</Callout>

## Why [Concept] Matters

[Practical explanation of why this matters. 2-3 paragraphs.]

<SceneCue
  label="See it: [First visual]"
  description="[What to watch]"
  params={{ ... }}
/>

[More explanation, building on what they just saw]

<SceneCue
  label="See it: [Second visual — dramatic contrast to first]"
  params={{ ... }}
/>

## [Secondary concept or data section]

[Explanation, possibly with a data table]

| Column | Column | Column |
|--------|--------|--------|
| ... | ... | ... |

<Callout type="pro-tip">
[Practical advice]
</Callout>

## How [Thing] Is Measured / Recognized / Applied

[Measurement methods, or how a bowler can recognize/use this]

[Optional third SceneCue at this point]

<SceneCue
  label="See it: [Third visual — the sweet spot or recommended state]"
  params={{ ... }}
/>

[Discussion of tradeoffs, ratios, or nuances]

<Callout type="warning">
[Common mistake — optional, only if relevant]
</Callout>

## What to Focus on as a Learner

[Actionable advice. What should the reader actually DO with this knowledge?]

1. **First action** — specific thing to try
2. **Second action** — specific thing to observe
3. **Third action** — specific thing to measure

[Closing paragraph — motivational, honest about the learning curve]
```

Target length: **80-140 lines of MDX**, depending on research richness.

---

## The Batching Strategy

Do not write sections in random order. Do not write one section at a time. **Write in clusters of 3-5 related sections.**

A cluster shares:
- **Research file** (minimizes context-switching)
- **Scene type** (maintains design consistency)
- **Topic area** (maintains voice coherence)
- **Learning progression** (reader could follow all 5 in order)

### Recommended First Batch: "The Custom Ball Owner Cluster"

This is the MOST USEFUL first batch because:
- All sections use the existing bowling ball component (no new 3D needed)
- All research comes from `ball-physics-and-equipment-science.md` and `biomechanics-and-form.md` + `performance-metrics-and-ml-classification.md`
- Target user (a new bowler with a custom ball) would read these together
- Every section is Tier 1 complexity
- The cluster answers: "I just bought a custom ball — what is it, what do the specs mean, and how does it work?"

**The 5 sections in Batch 1:**

1. **`content/the-ball/coverstock-types.mdx`** (Ch 2.1)
   - Research source: `docs/research/ball-physics-and-equipment-science.md` §1
   - Blueprint reference: `docs/specs/07-INTERACTION-BLUEPRINTS.md` §2.1
   - Content map entry: `"the-ball/coverstock-types"` with scene `"coverstock-types"`

2. **`content/the-ball/rg-and-differential.mdx`** (Ch 2.3)
   - Research source: `docs/research/ball-physics-and-equipment-science.md` §3-4
   - Blueprint reference: `docs/specs/07-INTERACTION-BLUEPRINTS.md` §2.3
   - Content map entry: `"the-ball/rg-and-differential"` with scene `"rg-differential"`

3. **`content/the-ball/surface-preparation.mdx`** (Ch 2.5)
   - Research source: `docs/research/ball-physics-and-equipment-science.md` §6
   - Blueprint reference: `docs/specs/07-INTERACTION-BLUEPRINTS.md` §2.5
   - Content map entry: `"the-ball/surface-preparation"` with scene `"surface-prep"`

4. **`content/the-release/axis-tilt.mdx`** (Ch 5.3)
   - Research source: `docs/research/performance-metrics-and-ml-classification.md` §4
   - Blueprint reference: `docs/specs/07-INTERACTION-BLUEPRINTS.md` §5.3
   - Content map entry: `"the-release/axis-tilt"` with scene `"axis-tilt"`

5. **`content/the-release/axis-rotation.mdx`** (Ch 5.4)
   - Research source: `docs/research/performance-metrics-and-ml-classification.md` §4
   - Blueprint reference: `docs/specs/07-INTERACTION-BLUEPRINTS.md` §5.4
   - Content map entry: `"the-release/axis-rotation"` with scene `"axis-rotation"`

---

## Research Source Mapping

When writing a section, you MUST read the corresponding research passage first. The research files are dense and citation-heavy — your job is to extract the 5-8 key facts a learner needs and transform them into conversational prose.

| Chapter | Research File(s) |
|---------|-----------------|
| Ch 1: The Basics | `lane-science-and-oil-patterns.md` §1-2 + `strike-physics-and-scoring-science.md` §1, §8 |
| Ch 2: The Ball | `ball-physics-and-equipment-science.md` (entire file) |
| Ch 3: The Approach | `biomechanics-and-form.md` §2, §6 |
| Ch 4: The Swing | `biomechanics-and-form.md` §3 |
| Ch 5: The Release | `biomechanics-and-form.md` §4-5 + `performance-metrics-and-ml-classification.md` §3-4 |
| Ch 6: Ball Motion | `ball-physics-and-equipment-science.md` §5 + `performance-metrics-and-ml-classification.md` §5-9 |
| Ch 7: The Lane | `lane-science-and-oil-patterns.md` §3-10 |
| Ch 8: The Strike | `strike-physics-and-scoring-science.md` §1-6 |
| Ch 9: Spares | `strike-physics-and-scoring-science.md` §5, §7 |
| Ch 10: Equipment Strategy | `ball-physics-and-equipment-science.md` §10 |
| Ch 11: Reading the Lane | `lane-science-and-oil-patterns.md` §7-8 + `08-coaching-pedagogy-and-feedback.md` §3 |
| Ch 12: Two-Handed | `biomechanics-and-form.md` §1 + `performance-metrics-and-ml-classification.md` §3 |

The file `01-bowling-science-reference.md` is a superset — use it as a backup if the specialized files don't cover something.

---

## Session Workflow (Step by Step)

For each content writing session:

### 1. Orient (first 5 minutes)
- Read `content/the-release/rev-rate.mdx` to refresh on voice and structure
- Read the interaction blueprint entries for your batch in `docs/specs/07-INTERACTION-BLUEPRINTS.md`
- Skim the research source file(s) for your batch

### 2. Write each section (main work)
- Open the target research passage
- Draft the MDX file in memory or scratchpad
- Check the blueprint for the exact SceneCue params — copy them verbatim
- Write the section following the structure template
- Verify all SceneCues match the blueprint
- Keep length 80-140 lines

### 3. Register the section
- Add the entry to `src/lib/content-map.ts` in the `contentMap` object
- Make sure the `scene` field matches what's expected (scene components don't exist yet for new sections — the scene will default to the default scene until built)

### 4. Verify
- Run `npm run build` to ensure the MDX compiles
- Run `npx tsc --noEmit` to catch any type errors
- Check that the route would work: `/learn/{chapter-slug}/{section-slug}`

### 5. Commit
- Group the batch into ONE commit with a message like `content: chapter 2 ball equipment cluster (5 sections)`
- Do NOT create a PR unless explicitly asked

---

## Quality Checklist (Per Section)

Before moving to the next section, verify:

- [ ] Opening hook is present (no "In this section...")
- [ ] `<Callout type="key">` in the first 300 words
- [ ] Exactly the SceneCue params from the blueprint — not invented ones
- [ ] 2-4 SceneCues total, spaced through the content
- [ ] First SceneCue appears within first 200 words
- [ ] At least one data table or comparison (if applicable to topic)
- [ ] `<Callout type="pro-tip">` somewhere in the middle
- [ ] No academic language or citations
- [ ] Ends with "what to focus on as a learner" section
- [ ] 80-140 lines of MDX
- [ ] Reads conversationally when read aloud
- [ ] Every jargon term is defined on first use
- [ ] Entry added to `content-map.ts`
- [ ] `npm run build` succeeds

---

## What NOT to Do

- Do NOT build or modify 3D scenes — that's a separate session
- Do NOT invent SceneCue params — use the blueprint verbatim
- Do NOT write more than 5 sections in one session — quality drops with volume
- Do NOT write sections outside your cluster — stay focused on related content
- Do NOT skip the research — every fact must come from the source material
- Do NOT use placeholder content or "TODO: add more here" — ship complete sections
- Do NOT create new component types — use only `<Callout>` and `<SceneCue>`
- Do NOT write a section whose 3D scene doesn't exist yet UNLESS the scene is Tier 1 (existing ball with different params) — otherwise the reader will see a blank scene
- Do NOT create files in `content/` for sections without research source material
- Do NOT modify the interaction blueprint file — it's canonical, you're just reading it
- Do NOT create documentation files — only MDX content files

---

## First Prompt to Use

When starting the fresh session, use this exact prompt:

```
Read docs/specs/08-CONTENT-BATCHING-HANDOFF.md fully. That's your complete briefing 
for this session. After reading it, read the other files it references (the existing 
rev-rate.mdx, the interaction blueprint 07, the content map, and the research files 
for Batch 1). Then write the first batch: 5 sections in the "Custom Ball Owner Cluster" 
(Coverstock Types, RG & Differential, Surface Preparation, Axis Tilt, Axis Rotation).

Write each section fully and carefully. This is a depth-over-speed project — take 
your time, nail the voice, match the blueprint exactly. After each section, run 
`npm run build` to verify it compiles. After all 5 sections, create a single commit 
with a message describing the cluster.

Do not build or modify 3D scenes. Do not rush. Do not skip the research reading.
```

---

## Future Batches (After Batch 1)

Once Batch 1 is complete, subsequent sessions should tackle:

- **Batch 2: "Foundation Cluster"** — Ch 1 sections (The Lane, The Pins, How Scoring Works, Board Numbering). Tier 2 scenes. Same research file group.
- **Batch 3: "Ball Motion Cluster"** — Ball Motion: Skid-Hook-Roll, Core Design, Weight & Drilling. Tier 2-3 scenes.
- **Batch 4: "Strike Physics Cluster"** — The Pocket, Entry Angle, Pin Action, Speed at Pins. Tier 3 scenes.
- **Batch 5: "Oil & Lane Reading Cluster"** — Oil Pattern Basics, House Shot, Rule of 31, Making Adjustments.
- **Batch 6: "The Release Refinement Cluster"** — Wrist Position, Follow-Through, One vs Two-Handed.
- **Batch 7: "Approach & Swing Cluster"** — Chapter 3 and 4 combined (figure-dependent scenes).
- **Batch 8: "Spares Cluster"** — Why Spares Matter, 3-6-9 System, Corner Pins, Split Conversions.
- **Batch 9: "Advanced Ball Motion Cluster"** — Three Phases, Speed/Rev Interaction, Breakpoint, Total Hook, Loft.
- **Batch 10: "Two-Handed Cluster"** — Chapter 12 (4 sections).
- **Batch 11: "Equipment Strategy Cluster"** — Chapter 10 (4 sections).
- **Batch 12: "Lane Conditions Cluster"** — PBA Patterns, Sport Shots, Lane Transition, Lane Surfaces, Watching Ball Reaction.

Each batch should take one focused session. The full content corpus should be complete in 12 sessions if batches are sized correctly.

---

## Remember

This is an encyclopedia someone reads at the bowling alley between games. It needs to be **immediately useful**, **instantly interactive** (via SceneCues), and **trustworthy** (accurate to the research). Quality matters more than speed. Voice matters more than volume. The reader should close each section feeling smarter, not overwhelmed.

The `rev-rate.mdx` file is your North Star. If your new section feels different from that one, rewrite it.
