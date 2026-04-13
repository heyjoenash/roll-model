# Handoff 01 — Content Batch 1: Custom Ball Owner Cluster

> **Status**: READY
> **Type**: Content writing session
> **Estimated duration**: 5-7 focused hours
> **Output**: 5 production MDX content sections + 1 commit + STATUS.md update
> **Created**: 2026-04-13

---

## Quick Header

| Field | Value |
|-------|-------|
| **Session ID** | Handoff 01 |
| **Session type** | Content batching |
| **Cluster name** | Custom Ball Owner |
| **Sections in batch** | 5 |
| **Asset dependencies** | None (uses existing ball component) |
| **PRD requirements served** | FR-1, NFR-6 |
| **PRD milestone advanced** | M2 (Content Wave 1) |
| **Persona served** | Joe (primary — the new custom-ball owner) |
| **Stop condition** | After commit, before push. User reviews, user pushes. |

---

## Part 1: Why This Session Matters (Strategic Context)

### What you're producing

5 MDX content sections that, together, form the "Custom Ball Owner Cluster" — the answer to a new bowler's most pressing questions: "What did I just buy and how does it actually work?"

| # | Section | URL | Lines |
|---|---------|-----|-------|
| 1 | Coverstock Types | `/learn/the-ball/coverstock-types` | 100-120 |
| 2 | RG & Differential | `/learn/the-ball/rg-and-differential` | 110-130 |
| 3 | Surface Preparation | `/learn/the-ball/surface-preparation` | 90-110 |
| 4 | Axis Tilt | `/learn/the-release/axis-tilt` | 90-110 |
| 5 | Axis Rotation | `/learn/the-release/axis-rotation` | 90-110 |

Total expected output: ~480-580 lines of polished MDX.

### Why this is the first batch

This batch was chosen as the inaugural production content batch because:

1. **Zero new asset dependencies.** Every section's 3D scene either already exists (the spinning ball) or can be approximated by the default scene with a different color. No blocking on Lane, Figure, or Oil Data sessions.

2. **High PRD persona alignment.** The primary persona (Joe — new custom-ball owner) explicitly needs all 5 of these concepts. They're written in the order Joe would mentally process them: "What's my ball made of?" → "What's inside it?" → "What surface is it set up with?" → "How do I release it?" → "Which way do I spin it?"

3. **Research-rich.** All 5 sections have dense, factual research material. The hard part (gathering the science) is done; this session is pure transformation.

4. **Voice consistency anchor.** Writing 5 related sections in one focused session keeps the voice tight. Each section reinforces the rhythm of the previous one. The cluster forms a coherent learning unit.

5. **Builds momentum.** Going from 1 → 6 production sections (a 6x jump) is a visible, motivating milestone. The site goes from "proof of concept with one section" to "actually a learning resource."

### What success looks like at the end of this session

A reader who lands on `/learn/the-ball/coverstock-types` can read all 5 sections in sequence over ~30-40 minutes. They come away understanding what their custom-drilled reactive ball is, what those numbers on the spec sheet mean, and how their hand position determines the ball's path. They feel smarter and more confident, and they know what to ask their pro shop next time.

The voice of all 5 sections is indistinguishable from `content/the-release/rev-rate.mdx`. A reader couldn't tell they were written by different people. There's one author behind Roll Model and they're both knowledgeable and approachable.

---

## Part 2: Pre-Flight Reading Checklist

Read these files in this order. Do not skim. Do not write anything until all pre-flight items are checked.

### Required reading (~45 minutes total)

- [ ] **`content/the-release/rev-rate.mdx`** (105 lines, ~5 min)
  - This is the canonical voice reference
  - Read it twice if anything feels unclear
  - Pay attention to: the opening hook style, the placement of the first SceneCue, the table format, the closing "What Style Are You?" pattern

- [ ] **`docs/specs/08-CONTENT-BATCHING-HANDOFF.md`** (869 lines, ~20 min)
  - The full content batching playbook
  - Section-by-section structure template (Part 5)
  - Voice rules (Part 3)
  - Forbidden phrases list (Part 3)
  - 8 common pitfalls (Part 10)
  - This handoff is the SPECIFIC application of that GENERIC playbook

- [ ] **`docs/specs/14-PRD.md`** (435 lines, ~10 min)
  - Persona section to internalize who you're writing for
  - Voice non-functional requirements (NFR-6)
  - Section 12 ("The Larger User Experience") to feel the full UX

- [ ] **`docs/GLOSSARY.md`** (291 lines, ~10 min)
  - Definitions for all terms you'll use
  - **Cross-check every bowling term in your draft against this file**
  - If you use a term that isn't here, either add it or rewrite

### Per-section reading (during writing, ~5 min per section)

For each of the 5 sections, you'll also need:

- [ ] **`docs/specs/07-INTERACTION-BLUEPRINTS.md`** — the section's blueprint entry (find via Grep, don't read the whole file)
- [ ] **The relevant research file** (a specific passage, not the whole file — use Grep then Read with offset)

---

## Part 3: The Voice Bible (Compressed for Application)

Lifted from spec 08 and condensed for ready application during writing.

### The Three Hard Rules

1. **Second person.** "Your ball" not "the bowler's ball."
2. **Conversational but precise.** Use exact numbers naturally. "Elite two-handers reach 600 RPM" — not "Research has demonstrated that elite-level two-handed bowlers achieve rotational velocities of approximately 600 revolutions per minute."
3. **End with action.** Every section closes with what the reader should DO with the knowledge.

### Forbidden Phrases (Search-and-Destroy)

Before committing any section, grep the file for these exact strings. Each occurrence is a rewrite.

- "In this section"
- "It is important to note"
- "Research has shown"
- "Studies have demonstrated"
- "As previously mentioned"
- "Let's dive into"
- "Let's explore"
- "Let's take a look"
- "Did you know"
- "In conclusion"
- "To summarize"
- "We will now discuss"
- "is considered to be" (passive voice flag)

### Approved Opening Patterns

Pick ONE for each section's first paragraph. Don't mix.

| Pattern | First Sentence Example |
|---------|----------------------|
| **Surprising fact** | "Most recreational bowlers think the coverstock is just the ball's color. It's actually the single biggest factor in how the ball moves." |
| **Misconception** | "Most bowlers think hook is about spinning the ball harder. It's not — it's about friction, and specifically the moment friction changes." |
| **Direct + stakes** | "Axis tilt controls one thing: how much of your ball actually touches the lane. And that controls everything else." |
| **The question** | "Why does a bowling ball hook? The answer isn't 'because you spin it.' The answer is friction." |

### The Voice Comparison Test

Read your draft sentence aloud. Does it sound like:

- A textbook? → REWRITE
- ChatGPT? → REWRITE
- A bowling forum post? → close, but probably TOO casual — TIGHTEN
- A knowledgeable friend at the bowling alley? → SHIP IT

---

## Part 4: Component API (Ready to Copy)

### `<Callout>` — 4 variants

```mdx
<Callout type="key">
[The single most important takeaway. Use ONCE near the top. 1-2 sentences.]
</Callout>

<Callout type="pro-tip">
[Practical advice the reader can apply today. Use 1-2 times per section.]
</Callout>

<Callout type="warning">
[Common mistake or gotcha. Use only when relevant.]
</Callout>

<Callout type="note">
[Side context. Use rarely — usually you can rewrite as prose instead.]
</Callout>
```

Rules:
- Plain prose only inside Callouts (no headings, no tables, no nested components)
- No markdown emphasis (`**bold**`) — use plain HTML `<strong>` if needed, or rewrite to remove emphasis

### `<SceneCue>` — interactive scene control

```mdx
<SceneCue
  label="See it: [Specific observable outcome]"
  description="[One sentence explaining what to watch for. Optional but recommended.]"
  params={{ key1: value1, key2: value2 }}
/>
```

Hard rules:
- **`label` always starts with "See it: "**
- **`params` comes verbatim from spec 07** (the interaction blueprint). Do not invent.
- **2-4 SceneCues per section**, no more, no less
- **First SceneCue within the first ~200 words** of the document
- **Dramatic contrast between cues** — RPM 150 → 600, not 400 → 420
- **Hex colors are double-quoted strings** inside the params object: `ballColor: "#22c55e"`

### MDX Syntax Gotchas

- Tables need a blank line above AND below
- `<` and `>` in prose must be escaped as `&lt;` `&gt;` or rewritten
- Headings inside JSX components don't render — use prose
- The `params` prop uses double curly braces: `params={{ rpm: 150 }}` (outer = JSX expression, inner = object)

---

## Part 5: The Atomic Task Template (Apply to Each Section)

This is the master per-section checklist. Apply it 5 times (once per section). Combined with Part 6 (per-section specifics), it gives you ~200 atomic tasks total for the batch.

### Phase A — Research & Orientation (~15-20 min per section)

- [ ] **A1.** Open `docs/specs/07-INTERACTION-BLUEPRINTS.md`
- [ ] **A2.** Use Grep or Read with offset to find the section's blueprint entry
- [ ] **A3.** Read the entire blueprint entry (load state, Leva controls, SceneCues, key animation, aha moment)
- [ ] **A4.** Copy each SceneCue's exact `params={{ ... }}` to a scratchpad (text file or memory)
- [ ] **A5.** Note the section's "Aha Moment" in your scratchpad — this is what the prose must build toward
- [ ] **A6.** Open the relevant research file (see Part 6 for which one and which section)
- [ ] **A7.** Use Grep to find the relevant subsection
- [ ] **A8.** Use Read with offset/limit to load that passage (don't read the whole file — they're too big)
- [ ] **A9.** Extract 5-8 key facts to scratchpad (not 30, not 3 — distill ruthlessly)
- [ ] **A10.** Note any specific numbers, ranges, or comparison data to use in tables
- [ ] **A11.** Open `docs/GLOSSARY.md` and find every bowling term you plan to use
- [ ] **A12.** Note any term that isn't in the glossary — you'll need to define it inline

### Phase B — Outline (~10 min per section)

- [ ] **B1.** Pick your opening pattern (surprising fact / misconception / direct+stakes / question)
- [ ] **B2.** Draft the 1-sentence "key takeaway" for the `<Callout type="key">`
- [ ] **B3.** Identify the 3-4 H2 section headings you'll use
- [ ] **B4.** Decide where each SceneCue goes in the prose flow
- [ ] **B5.** Decide whether to include a data table (most ball/release sections should — they're data-rich)
- [ ] **B6.** Sketch the 2-3 closing actions for the "What to Focus on as a Learner" section

### Phase C — Write (~30-45 min per section)

- [ ] **C1.** Use the Write tool to create the file at the exact path from Part 6
- [ ] **C2.** Write the H1 (page title)
- [ ] **C3.** Write the opening hook paragraph (2-4 sentences, no forbidden phrases)
- [ ] **C4.** Read the opening aloud — does it create curiosity or stakes?
- [ ] **C5.** Write the `<Callout type="key">` with the takeaway
- [ ] **C6.** Write the H2 "Why [Concept] Matters" section (2-3 paragraphs)
- [ ] **C7.** Place the FIRST `<SceneCue>` (within the first ~200 words)
- [ ] **C8.** Continue prose connecting cue 1 to cue 2
- [ ] **C9.** Place the SECOND `<SceneCue>` (dramatic contrast)
- [ ] **C10.** Add a bullet list or paragraph processing what the cues showed
- [ ] **C11.** Write the H2 for the data section (often a "Typical Ranges" or comparison heading)
- [ ] **C12.** Write the data table (4 columns max)
- [ ] **C13.** Add a `<Callout type="pro-tip">` after the table
- [ ] **C14.** Write the H2 for the "How [Thing] Is Measured" or "How To Recognize" section
- [ ] **C15.** Place the THIRD `<SceneCue>` (sweet spot or recommended state)
- [ ] **C16.** Add a `<Callout type="warning">` if there's a common mistake worth flagging
- [ ] **C17.** Write the H2 "What to Focus on as a Learner" section
- [ ] **C18.** Write the numbered list (2-3 items)
- [ ] **C19.** Write the closing motivational paragraph (honest about the learning curve)
- [ ] **C20.** Read the entire file aloud once — every paragraph

### Phase D — Quality Pass (~10 min per section)

- [ ] **D1.** Search the file for each forbidden phrase from Part 3 (use Grep)
- [ ] **D2.** Verify second-person voice throughout (search for "the bowler" — replace with "you")
- [ ] **D3.** Verify each SceneCue's `params={{ ... }}` matches the blueprint EXACTLY (re-check character by character)
- [ ] **D4.** Verify every bowling term is defined on first use
- [ ] **D5.** Verify file length is within target (use `wc -l` — 80-140 lines)
- [ ] **D6.** Verify the section ends with actionable advice
- [ ] **D7.** Cross-reference at least one specific fact against the original research source
- [ ] **D8.** Verify the table renders correctly (blank line before and after)

### Phase E — Register the Section (~3 min per section)

- [ ] **E1.** Open `src/lib/content-map.ts` with the Read tool
- [ ] **E2.** Add the new entry to the `contentMap` object using Edit
- [ ] **E3.** Use the exact entry from Part 6 (copy-paste, don't retype)
- [ ] **E4.** Place new entries in alphabetical or logical order (not critical, but consistent)

### Phase F — Verify (~5 min per section)

- [ ] **F1.** Run `npx tsc --noEmit` — verify zero errors
- [ ] **F2.** Run `npm run build` — verify build succeeds end-to-end
- [ ] **F3.** Run `curl -s -o /dev/null -w "%{http_code}" http://localhost:6200/learn/{path}` for the new route — verify 200
- [ ] **F4.** (Optional but recommended) Open the URL in a browser
- [ ] **F5.** Visual check: H1 visible, prose renders, callouts display with correct icons, SceneCues are clickable buttons
- [ ] **F6.** Click each SceneCue button — verify the Leva control panel updates (the 3D scene won't change much because the matching scene component doesn't exist yet — that's expected and OK)
- [ ] **F7.** Open browser console — verify no red errors

After Phase F passes, that section is complete. Move to the next section and repeat.

---

## Part 6: Per-Section Specifics

Each section below gives you the exact information needed to apply the Phase A-F template. Use these as the "source of truth" for the section you're working on.

---

### SECTION 1 of 5: Coverstock Types

**Goal**: A new bowler with a custom ball understands the 5 main coverstock types (plastic, urethane, reactive solid, reactive pearl, reactive hybrid), what each does to ball motion, and which one their custom ball probably has.

**File path**: `content/the-ball/coverstock-types.mdx`

**URL when shipped**: `http://localhost:6200/learn/the-ball/coverstock-types`

**Content map entry** (paste into `src/lib/content-map.ts` inside the `contentMap` object):

```typescript
"the-ball/coverstock-types": {
  title: "Coverstock Types",
  chapter: "The Ball",
  chapterNumber: 2,
  scene: "coverstock-types",
  description: "What the ball's surface is made of — and why it controls everything else",
},
```

**Blueprint reference**: `docs/specs/07-INTERACTION-BLUEPRINTS.md` — search for "Coverstock Types" or "2.1 Coverstock"

**Research source**: `docs/research/ball-physics-and-equipment-science.md`, section 1 (Coverstock materials)
- Grep pattern: `"Coverstock"` or `"coverstock"` in the file
- Look for: historical evolution, the 5-type comparison, visual identification cues

**Key concepts to convey** (the 5-8 facts to extract):
1. The 3 main categories: plastic (smoothest), urethane (in between), reactive resin (most aggressive). Reactive resin breaks down into 3 subtypes (solid, pearl, hybrid).
2. **Plastic** = nearly straight ball, used as a "spare ball" for corner pins. Glossy mirror finish.
3. **Urethane** = smooth predictable hook. Older technology that's making a comeback for dry lanes.
4. **Reactive solid** = most aggressive on heavy oil. Matte appearance. Hooks hardest.
5. **Reactive pearl** = longer skid then sharp angular snap. Shimmery/sparkly appearance (mica particles).
6. **Reactive hybrid** = blend of solid and pearl, balanced motion.
7. The coverstock IS "the ball's personality." Two balls with identical cores but different coverstocks behave completely differently.
8. A new custom-ball owner with a "reactive" ball almost certainly has reactive solid, pearl, or hybrid — ask the pro shop which.

**SceneCue params (from blueprint, COPY VERBATIM)**:

```mdx
<SceneCue
  label="See it: Glossy plastic spare ball"
  description="Mirror-shiny finish. The ball goes nearly straight."
  params={{ coverstock: "Plastic", showMotionPreview: true }}
/>

<SceneCue
  label="See it: Matte solid reactive"
  description="Completely flat surface. Aggressive smooth hook."
  params={{ coverstock: "Reactive Solid", showMotionPreview: true }}
/>

<SceneCue
  label="See it: Pearlescent reactive"
  description="Visible shimmer. Long straight skid then sharp angular snap."
  params={{ coverstock: "Reactive Pearl", showMotionPreview: true }}
/>
```

**Approved opening pattern**: "Surprising fact" — most bowlers think coverstock is just color. Open with the truth.

**Length target**: 100-120 lines of MDX

**Glossary terms used**: Coverstock, plastic, urethane, reactive resin, reactive solid, reactive pearl, reactive hybrid, hook, skid, breakpoint. All in `docs/GLOSSARY.md`.

**The "aha moment" the prose must build toward**: Three balls that look identical in shape and size produce three completely different paths. The coverstock IS the ball's personality.

**Apply Phases A-F now.** When this section's Phase F passes, mark this section complete and move to Section 2.

---

### SECTION 2 of 5: RG & Differential

**Goal**: A new bowler with a custom ball understands what those two numbers on their spec sheet (RG and differential) actually mean and how they affect ball motion.

**File path**: `content/the-ball/rg-and-differential.mdx`

**URL when shipped**: `http://localhost:6200/learn/the-ball/rg-and-differential`

**Content map entry**:

```typescript
"the-ball/rg-and-differential": {
  title: "RG & Differential",
  chapter: "The Ball",
  chapterNumber: 2,
  scene: "rg-differential",
  description: "How mass is distributed inside your ball — and why it matters",
},
```

**Blueprint reference**: `docs/specs/07-INTERACTION-BLUEPRINTS.md` — section 2.3 "RG & Differential"

**Research source**: `docs/research/ball-physics-and-equipment-science.md`, sections 3-4 (RG, differential, USBC ranges, flare, track migration)
- Grep for: `"differential"`, `"radius of gyration"`, `"RG"`, `"flare"`

**Key concepts to convey**:
1. **RG = how hard the ball is to get spinning.** Like a figure skater pulling arms in (low RG, fast spin) vs out (high RG, slow spin).
2. USBC legal RG range: 2.460 to 2.800 inches. Most balls fall in 2.50-2.65.
3. Low RG ball (like 2.50) = revs up fast = early hook. High RG ball (like 2.70) = takes longer to rev up = later hook.
4. **Differential = how much the ball flares (track migration) as it travels.** Higher differential = more flare rings = more total hook.
5. USBC legal differential range: 0.010 to 0.060. Most balls 0.020-0.050.
6. The two numbers work together. A "low RG, high differential" ball revs up early and flares aggressively — strong all-around motion.
7. On the spec sheet, look for both numbers. They're listed alongside coverstock as the ball's "shape" defining specs.
8. The figure skater analogy is the key mental model — internalize this and the rest is intuitive.

**SceneCue params (from blueprint, COPY VERBATIM)**:

```mdx
<SceneCue
  label="See it: Low RG — mass near center"
  description="The ball revs up visibly fast — early hook potential."
  params={{ rgValue: 2.460, showMassHeatmap: true }}
/>

<SceneCue
  label="See it: High RG — mass near shell"
  description="The ball takes longer to rev up — later hook, more skid."
  params={{ rgValue: 2.800, showMassHeatmap: true }}
/>

<SceneCue
  label="See it: High differential = massive flare"
  description="Track flare rings spread wide apart on the ball surface."
  params={{ differential: 0.060, showFlareRings: true }}
/>
```

**Approved opening pattern**: "Direct + stakes" — define both terms in one sentence each, then state why they matter together.

**Length target**: 110-130 lines (this is data-heavy, give it room)

**Glossary terms used**: RG (radius of gyration), differential, flare, track flare, USBC. All in glossary.

**The "aha moment"**: The figure skater analogy. Mass near the center = easy to spin = early hook. Mass at the shell = hard to spin = late hook. Same principle as a figure skater pulling their arms in for a faster spin. Pure physics, intuitive.

**Apply Phases A-F now.** When complete, move to Section 3.

---

### SECTION 3 of 5: Surface Preparation

**Goal**: A new bowler understands that the ball's surface roughness (grit) is the cheapest, fastest way to change how it reacts — and that pro shops can re-surface a ball in 5 minutes.

**File path**: `content/the-ball/surface-preparation.mdx`

**URL when shipped**: `http://localhost:6200/learn/the-ball/surface-preparation`

**Content map entry**:

```typescript
"the-ball/surface-preparation": {
  title: "Surface Preparation",
  chapter: "The Ball",
  chapterNumber: 2,
  scene: "surface-prep",
  description: "The cheapest, fastest way to change how your ball reacts",
},
```

**Blueprint reference**: `docs/specs/07-INTERACTION-BLUEPRINTS.md` — section 2.5 "Surface Preparation"

**Research source**: `docs/research/ball-physics-and-equipment-science.md`, section 6 (grit scale, sanded vs polished, degradation, maintenance)
- Grep for: `"grit"`, `"surface"`, `"polished"`, `"sanded"`, `"abralon"`

**Key concepts to convey**:
1. The ball's surface texture is measured in "grit" — same scale as sandpaper. Lower number = rougher.
2. The full range: 500 grit (very rough) to 5000+ (mirror polish).
3. **Lower grit = more friction = ball hooks earlier and smoother.** For heavy oil.
4. **Higher grit / polish = less friction = ball skids longer then snaps harder at the breakpoint.** For dry lanes.
5. Surface degrades with play. After 30-50 games, even a "2000 grit" ball is closer to 1500. Pro shops re-surface to restore.
6. A re-surface costs ~$15-30 and takes 5-10 minutes. It's the highest-ROI ball adjustment a bowler can make.
7. Surface change is REVERSIBLE. Layout changes are permanent. Always try surface adjustment first.
8. Most factory balls ship at 2000-3000 grit. Ask your pro shop what surface YOUR ball is at right now.

**SceneCue params (from blueprint, COPY VERBATIM)**:

```mdx
<SceneCue
  label="See it: 500 grit — sandpaper rough"
  description="Visible deep texture. Ball hooks early in a smooth arc."
  params={{ grit: 500, showTrajectory: true }}
/>

<SceneCue
  label="See it: Polished — glass smooth"
  description="Mirror finish, no visible texture. Long straight skid then sharp snap."
  params={{ grit: "Polish", showTrajectory: true }}
/>

<SceneCue
  label="See it: Same ball, different surface"
  description="Side-by-side: 500 grit (left) vs Polished (right). Two completely different motion shapes."
  params={{ surfaceView: "Side-by-Side", gritLeft: 500, gritRight: "Polish" }}
/>
```

**Approved opening pattern**: "Surprising fact" — most bowlers don't know surface adjustment exists. It's the cheapest and most dramatic change you can make.

**Length target**: 90-110 lines

**Glossary terms used**: Grit, polish, sanded ball, coverstock, hook, breakpoint, skid

**The "aha moment"**: Same ball. Different sandpaper. 10+ boards of difference in trajectory. A $0.50 abralon pad changes the ball's personality more than most equipment changes.

**Apply Phases A-F now.** When complete, move to Section 4.

---

### SECTION 4 of 5: Axis Tilt

**Goal**: A new bowler understands that axis tilt controls how much of the ball touches the lane — and that controls everything else (friction, hook, energy transfer).

**File path**: `content/the-release/axis-tilt.mdx`

**URL when shipped**: `http://localhost:6200/learn/the-release/axis-tilt`

**Content map entry**:

```typescript
"the-release/axis-tilt": {
  title: "Axis Tilt",
  chapter: "The Release",
  chapterNumber: 5,
  scene: "axis-tilt",
  description: "How much of your ball actually touches the lane — and why it matters",
},
```

**Blueprint reference**: `docs/specs/07-INTERACTION-BLUEPRINTS.md` — section 5.3 "Axis Tilt"

**Research source**: `docs/research/performance-metrics-and-ml-classification.md`, section 4 (axis tilt and axis rotation tables)
- Grep for: `"axis tilt"`, `"5-tier"`, `"tilt range"`

**Key concepts to convey**:
1. Axis tilt is the angle of the ball's spin axis relative to the lane surface. Measured in degrees from 0 (horizontal) to 90 (vertical).
2. **At 0°, the ball rolls like a car tire** — the equator is in contact with the lane, maximum friction, maximum hook.
3. **At 90°, the ball spins like a top** — only a tiny point at the bottom touches, almost no friction, almost no hook.
4. **Most bowlers fall between 5° and 25°.** That's where all the interesting stuff happens.
5. The 5-tier scale: <5° (full roller, very rare), 5-10° (low tilt), 10-20° (medium tilt — most common), 20-30° (high tilt), >30° (spinner — also rare).
6. Tilt is determined by your wrist position at release. Cupped wrist = more tilt. Flat wrist = less tilt.
7. More tilt = ball stores energy longer and snaps harder at the breakpoint. Less tilt = ball hooks earlier and more smoothly.
8. You can't really "choose" your tilt — it's a function of your physical release. But you can MEASURE yours and understand what it means.

**SceneCue params (from blueprint, COPY VERBATIM)**:

```mdx
<SceneCue
  label="See it: Zero tilt — full rolling contact"
  description="The ball rolls like a car tire. The contact ring at the equator is huge."
  params={{ axisTilt: 0, showMotionPreview: true }}
/>

<SceneCue
  label="See it: 90 degree tilt — the spinner"
  description="The ball spins like a top. Almost nothing touches the lane."
  params={{ axisTilt: 90, showMotionPreview: true }}
/>

<SceneCue
  label="See it: The sweet spot — 15 degree tilt"
  description="A balanced amount of contact and energy storage. Most one-handed bowlers live here."
  params={{ axisTilt: 15, showMotionPreview: true }}
/>
```

**Approved opening pattern**: "Direct + stakes" — define what axis tilt controls in one sentence, then state why it determines everything.

**Length target**: 90-110 lines

**Glossary terms used**: Axis, axis tilt, hook, friction, breakpoint, cupped wrist, equator. All in glossary.

**The "aha moment"**: The "contact ring" mental model. As tilt increases from 0 to 90, the band of ball touching the lane shrinks from a wide stripe (max friction) to a tiny point (no friction). The geometry is undeniable: more contact = more hook.

**Apply Phases A-F now.** When complete, move to Section 5.

---

### SECTION 5 of 5: Axis Rotation

**Goal**: A new bowler understands that axis rotation is the ANGLE between where the ball is going and how it's spinning — and that's the primary driver of hook shape.

**File path**: `content/the-release/axis-rotation.mdx`

**URL when shipped**: `http://localhost:6200/learn/the-release/axis-rotation`

**Content map entry**:

```typescript
"the-release/axis-rotation": {
  title: "Axis Rotation",
  chapter: "The Release",
  chapterNumber: 5,
  scene: "axis-rotation",
  description: "The direction of your spin — and why it creates hook",
},
```

**Blueprint reference**: `docs/specs/07-INTERACTION-BLUEPRINTS.md` — section 5.4 "Axis Rotation"

**Research source**: `docs/research/performance-metrics-and-ml-classification.md`, section 4 (axis rotation 5-tier table)
- Grep for: `"axis rotation"`, `"side spin"`

**Key concepts to convey**:
1. Axis rotation is the angle between the ball's spin axis and its direction of travel. From 0° to 90°.
2. **At 0°, the ball spins end-over-end** in the direction of travel. Pure forward roll. No hook.
3. **At 90°, the ball has pure side spin.** Like spinning a top while sliding it. Maximum hook potential.
4. **Most bowlers fall between 30° and 60°.** That's the angle that creates a controllable, productive hook.
5. The 5-tier scale: <20° (low rotation, weak hook), 20-40° (moderate), 40-60° (high — most common for crankers), 60-80° (very high), >80° (extreme — usually only two-handers).
6. Together with rev rate and axis tilt, axis rotation defines your hook shape. More rotation + more revs = more hook.
7. You can change your rotation by adjusting how much your hand "turns around" the ball at release. More turn = more rotation.
8. Don't confuse "more rotation" with "better." 90° rotation makes the ball hook hard but it also makes it harder to control. Most bowlers benefit from a balanced rotation around 45°.

**SceneCue params (from blueprint, COPY VERBATIM)**:

```mdx
<SceneCue
  label="See it: 0 degrees — end over end, no hook"
  description="The ball rolls straight forward like a wheel. Spin direction matches travel direction."
  params={{ axisRotation: 0, showHookPotential: true }}
/>

<SceneCue
  label="See it: 90 degrees — pure side spin, maximum hook"
  description="The ball has pure rotation perpendicular to its travel direction. Maximum friction differential."
  params={{ axisRotation: 90, showHookPotential: true }}
/>

<SceneCue
  label="See it: 45 degrees — the versatile middle"
  description="A balanced angle most one-handed bowlers naturally produce."
  params={{ axisRotation: 45, showHookPotential: true }}
/>
```

**Approved opening pattern**: "The question" — "Why does a bowling ball hook at all?" The answer is axis rotation.

**Length target**: 90-110 lines

**Glossary terms used**: Axis rotation, axis, hook, friction, two-handed, cranker. All in glossary.

**The "aha moment"**: Axis rotation is just the angle between two arrows: where the ball is going, and how it's spinning. When the arrows match (0°), no hook. When they're perpendicular (90°), max hook. Same ball, same speed, same RPM — only the rotation angle changes. Hook is just geometry.

**Apply Phases A-F now.** When this section's Phase F passes, ALL 5 SECTIONS ARE COMPLETE. Proceed to Part 7.

---

## Part 7: Cross-Section Quality Pass

After all 5 sections individually pass Phase F, do these cross-cutting checks before committing.

- [ ] **CS1.** Read all 5 sections in browser as a sequence. Does it feel like one author wrote them? Or do voices drift? Drift = revisit and tighten.
- [ ] **CS2.** Check that no section repeats the SAME analogy as another section. (Figure skater is RG-only. Car tire is axis-tilt-only.) Don't recycle.
- [ ] **CS3.** Verify that NO section uses bowling jargon undefined. Pull every term in any draft and check it appears in `docs/GLOSSARY.md`.
- [ ] **CS4.** Check that the `<SceneCue>` count per section is 2-4 (not 1, not 5+).
- [ ] **CS5.** Check total line count: ~480-580 lines across all 5 files. If significantly higher, you're over-explaining. If significantly lower, you're under-serving.
- [ ] **CS6.** Run final `npm run build` on the whole project — must succeed.
- [ ] **CS7.** Run final `npx tsc --noEmit` — must be clean.
- [ ] **CS8.** Verify all 5 routes return 200:
  ```bash
  for path in the-ball/coverstock-types the-ball/rg-and-differential the-ball/surface-preparation the-release/axis-tilt the-release/axis-rotation; do
    curl -s -o /dev/null -w "$path: %{http_code}\n" http://localhost:6200/learn/$path
  done
  ```
  All five should report 200.

---

## Part 8: Commit (Single Commit for the Whole Batch)

Use this exact commit message format:

```
content: chapter 2 ball + chapter 5 release — custom ball owner cluster (5 sections)

Adds the first production content batch — the "Custom Ball Owner Cluster":
- the-ball/coverstock-types — 5 main coverstock types and their motion
- the-ball/rg-and-differential — RG and differential explained via figure skater analogy
- the-ball/surface-preparation — grit scale and surface adjustment as the cheapest tuning
- the-release/axis-tilt — how much of the ball touches the lane
- the-release/axis-rotation — the angle that determines hook shape

All 5 sections target the primary persona (Joe — new custom-ball owner)
and follow the voice guide in spec 08. Scene components for the new
scene names (coverstock-types, rg-differential, surface-prep, axis-tilt,
axis-rotation) will be built in a future scene-building session — content
pages currently fall through to DefaultScene.

Site goes from 1 → 6 production content sections. PRD milestone M2 advanced.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

**Stage only the files this batch changed** (do NOT use `git add .`):

```bash
git add content/the-ball/coverstock-types.mdx
git add content/the-ball/rg-and-differential.mdx
git add content/the-ball/surface-preparation.mdx
git add content/the-release/axis-tilt.mdx
git add content/the-release/axis-rotation.mdx
git add src/lib/content-map.ts
```

Then commit with the message above using a HEREDOC.

**DO NOT push.** The user will review the commit and push it.

---

## Part 9: Update STATUS.md After Commit (One Final Atomic Task)

After the commit succeeds:

- [ ] **U1.** Read `docs/STATUS.md`
- [ ] **U2.** In "What's Done" → "Content Sections Written", add the 5 new sections
- [ ] **U3.** Update "Content sections shipped" count from `1 of 53` to `6 of 53`
- [ ] **U4.** In "Recent Activity", add the new commit hash and message at the top
- [ ] **U5.** Update "Last Updated" date at the top of STATUS.md
- [ ] **U6.** Update "Next 3 Sessions" — Session A is now complete; Session B (Lane Asset) becomes the new top priority
- [ ] **U7.** Save the file
- [ ] **U8.** Add and commit STATUS.md as a separate small commit:
  ```
  docs: status update after content batch 1
  ```

This second commit is fine — STATUS updates always commit separately so the content batch's history is clean.

---

## Part 10: Common Pitfalls (Bowling-Content-Specific)

Beyond the generic MDX gotchas in spec 08, watch for these batch-specific traps:

### Pitfall 1: Conflating axis tilt and axis rotation

These are TWO different concepts:
- **Tilt** = angle of axis vs the lane (how much of the ball touches)
- **Rotation** = angle between axis and travel direction (which way it's spinning)

A bowler can have low tilt (5°) and high rotation (60°), or vice versa. Treat them as fully independent variables. Don't write "axis tilt and rotation" as if they're one concept.

### Pitfall 2: Calling RG "weight" or "balance"

RG is NOT weight. The ball's weight is fixed (15 lbs typically). RG describes how that fixed weight is DISTRIBUTED inside the ball. Two 15-lb balls can have very different RG values.

Don't say "high-RG balls are heavier." Say "high-RG balls have their mass closer to the shell."

### Pitfall 3: Saying "low coverstock" or "high coverstock"

Coverstock is a TYPE (plastic/urethane/reactive), not a quantity. Don't write "more coverstock" or "lower coverstock." Write "more aggressive coverstock" or "smoother coverstock."

### Pitfall 4: Mixing up grit scale direction

LOWER grit number = ROUGHER surface. HIGHER grit number = SMOOTHER. This is counterintuitive (low number = more aggressive ball motion = more friction) but it's how sandpaper works. Double-check every grit reference.

### Pitfall 5: Implying the reader can directly choose their axis tilt or rotation

These are determined by the bowler's physical release mechanics. You can't just "choose" 15° tilt the way you choose a ball color. The right framing: "your release produces a certain tilt — measure it, understand it, then decide if you want to adjust your wrist position over time."

### Pitfall 6: Treating the "matched" or "balanced" bowler as the goal

Don't write "you should aim for 45° axis rotation" as if it's a target. The right framing: "most bowlers naturally land here, and that's okay — the extremes are for specialists."

### Pitfall 7: Using "side spin" without explaining

"Side spin" is a casual term that overlaps with axis rotation. Define what you mean on first use. Don't assume the reader knows the difference between "side spin" and "axis rotation" (they're related but the latter is the technical term).

### Pitfall 8: Long sentences with too much technical density

The voice rule is "conversational but precise." If a sentence has 3+ technical terms, break it into 2 sentences. Read each sentence aloud — if you have to take a breath in the middle, it's too long.

---

## Part 11: Stop Conditions

You should STOP and ask the user (NOT push, NOT commit) if any of these happen:

1. **The blueprint for a section can't be found in spec 07.** Don't invent params. Stop and ask.
2. **The research file doesn't have material for one of the key concepts.** Stop and ask whether to skip the concept or find alternative source material.
3. **`npm run build` fails and you can't fix it in one attempt.** Don't keep retrying. Stop and ask.
4. **A SceneCue param value would conflict with the blueprint specification.** Stop and ask whether the blueprint is correct.
5. **The voice feels off after multiple rewrites.** Stop and ask the user to read a sample.
6. **You've spent more than 90 minutes on a single section.** Stop and ask. Quality > volume.

You should COMMIT (and stop) when:

1. All 5 sections are written and pass Phase F individually
2. All cross-section checks (Part 7) pass
3. Final `npm run build` and `npx tsc --noEmit` are clean
4. STATUS.md update is queued for a follow-up commit

You should NEVER:

1. Push to main without explicit user approval
2. Force-push anything
3. Modify any file outside the explicit list (5 MDX files + content-map.ts + STATUS.md)
4. Add new dependencies
5. Modify spec docs (07, 08, 14, etc.) — those are stable
6. Build or modify 3D scene components
7. Write content for sections outside this batch

---

## Part 12: The Master Prompt (Copy This Verbatim)

This is the exact text to paste into the first message of a fresh Claude Code session opened in `/Users/joenash/github/roll-model`. It's intentionally long because nothing should be left to interpretation.

---

```
You are executing Handoff 01 — Content Batch 1: Custom Ball Owner Cluster.
The complete handoff document is at:
docs/handoffs/01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md

READ THAT FILE IN FULL FIRST. It is the only set of instructions you need
for this entire session. Do not skim it. Do not start writing content
until you have read all 12 parts.

Your goal: write 5 production MDX content sections in the "Custom Ball
Owner Cluster" — Coverstock Types, RG & Differential, Surface Preparation,
Axis Tilt, Axis Rotation. Total target output: 480-580 lines of polished
MDX across 5 files in the content/ directory.

Required reading order (do this BEFORE writing anything):

1. docs/handoffs/01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md (this file)
2. content/the-release/rev-rate.mdx (the canonical voice reference — read
   it twice if anything feels unclear)
3. docs/specs/08-CONTENT-BATCHING-HANDOFF.md (the generic content batching
   playbook)
4. docs/specs/14-PRD.md (the product north star — focus on the personas
   and user journeys)
5. docs/GLOSSARY.md (canonical bowling term definitions)

Per section, you'll also need to read:
- The relevant entry in docs/specs/07-INTERACTION-BLUEPRINTS.md (use
  Grep to find the section, don't read the whole 1624-line file)
- The relevant passage in docs/research/ball-physics-and-equipment-science.md
  or docs/research/performance-metrics-and-ml-classification.md (use Grep
  + Read with offset; the research files are too large to read whole)

Workflow:

For each of the 5 sections, work through Phases A-F as defined in Part 5
of the handoff doc:
- Phase A: Research & Orientation (~15-20 min)
- Phase B: Outline (~10 min)
- Phase C: Write (~30-45 min)
- Phase D: Quality Pass (~10 min)
- Phase E: Register in content-map.ts (~3 min)
- Phase F: Verify with build, tsc, and curl (~5 min)

Use the per-section specifics in Part 6 of the handoff for: file path,
content-map entry (copy-pasteable), research source, key concepts,
exact SceneCue params (from the blueprint), opening pattern, length
target, glossary terms, and the "aha moment" the prose must build toward.

After all 5 sections pass Phase F, do the cross-section quality pass
in Part 7, then commit using the exact message format in Part 8. Do
NOT push. Stop after the commit and announce completion.

After the content commit, do the STATUS.md update in Part 9 as a
separate small commit.

Stop conditions are in Part 11. If you hit any of them, stop and ask
me — do not improvise.

Voice rules and forbidden phrases are in Part 3 of the handoff.
The rev-rate.mdx file is your North Star — every section you write
should feel like it came from the same author. If it doesn't, rewrite.

Common pitfalls (especially the bowling-specific ones) are in Part 10.
Read them BEFORE writing the first section, not after you make the
mistake.

Quality matters more than speed. This is a depth-over-speed project.
Take your time. Read aloud. The user will review the commit before
pushing — they'll catch anything that feels off, but I'd rather you
catch it first.

Begin by reading the handoff doc. Confirm when you're ready to start
Section 1.
```

---

## Part 13: Cross-Reference to PRD

This handoff serves the following PRD requirements (`docs/specs/14-PRD.md`):

| PRD Reference | What This Session Contributes |
|---------------|------------------------------|
| **FR-1** (Educational content) | 5 of the 53 planned sections written |
| **NFR-6** (Voice consistency) | 5 sections matching the rev-rate.mdx canonical voice |
| **Persona: Joe** | 5 sections directly answering Joe's most pressing questions |
| **Journey 1** (First Visit) | After this session, Joe lands on coverstock-types and discovers an entire 5-section learning sequence |
| **Journey 2** (Return Visit) | After this session, returning users have 5 new chapters to explore |
| **Milestone M2** (Content Wave 1) | M2 requires 10 sections shipped + 10 scenes built. This session contributes 5 of the 10 sections. |

When the agent finishes this session, the project will have moved from "1 production section (proof of concept)" to "6 production sections (an actual learning resource)". That's the milestone leap this session unlocks.

---

## Final Notes

This handoff is intentionally exhaustive because content writing is the work most likely to drift in voice, miss the PRD vision, or treat sections as isolated artifacts instead of a coherent cluster. The atomic checklists exist to make every micro-decision visible — the agent can't accidentally skip a step because every step is named.

When this handoff has been executed successfully once, future content batch handoffs in this folder can be tighter (less voice teaching, more "apply the same template to these new sections"). This is the canonical version because it's the first one. Future handoffs follow its structure but trim the parts that have become muscle memory.

Good luck. Take your time.
