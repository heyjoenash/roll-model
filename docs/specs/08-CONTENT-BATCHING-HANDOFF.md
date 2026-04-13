# Roll Model — Content Batching Session Handoff

> **Status**: CANONICAL
> **Created**: 2026-04-12
> **Last Updated**: 2026-04-12 (v2 — expanded)
> **Purpose**: Self-contained briefing for a fresh Claude Code session to write MDX content in batches of 3-5 related sections per session
> **Read this first, then read the files it references, then start writing**

---

## Part 1: What You Are Doing

You are writing educational MDX content for **Roll Model** — an interactive 3D bowling encyclopedia at `github.com/heyjoenash/roll-model`, deployed at `roll-model.vercel.app`.

### The User Experience

The site has a split layout: the left panel is scrollable MDX content (the stuff you're writing), the right panel is an interactive 3D scene (built elsewhere). Readers can drag the divider to resize. At key moments in the content, readers click `<SceneCue>` buttons which trigger the 3D scene to change — a ball's RPM jumps from 150 to 600, a lane's oil pattern shifts, a figure poses differently. The reading and the visualization are connected.

### Why You're Writing in Batches

There are 53 planned content sections across 12 chapters. Writing them one at a time loses voice consistency and creates context thrashing. Writing all 53 at once exhausts context and drops quality. The compromise: **batches of 3-5 related sections per session**, where "related" means they share a research source file, a scene type, and a topic area.

### What You Are NOT Doing

- **Not building 3D scenes.** That's a separate type of session. Scene code lives in `src/components/3d/scenes/` and `src/components/3d/assets/`. You never touch those files.
- **Not inventing SceneCue parameters.** The exact `params={{ ... }}` values are specified in `docs/specs/07-INTERACTION-BLUEPRINTS.md`. Use them verbatim.
- **Not writing code, components, or infrastructure.** Only MDX content files and one edit to `src/lib/content-map.ts` to register the routes.
- **Not writing documentation.** No README updates, no spec edits, no plan files. Only `.mdx` files in `content/` and the content map entry.
- **Not rushing.** This is a depth-over-speed project. A single well-written section is worth more than five mediocre ones.

---

## Part 2: Required Reading Before You Start

Read these files IN THIS ORDER before writing anything. Do not skim. Read them fully.

### Essential (always)

1. **`content/the-release/rev-rate.mdx`** (105 lines) — The one existing production section. This is your style bible. Every section you write should feel like it came from the same author as this one. You will refer back to this file constantly. Read it twice.

2. **`docs/specs/07-INTERACTION-BLUEPRINTS.md`** (1,624 lines) — For each of the 53 sections: the 3D scene's load state, Leva controls, exact SceneCue params, key animation, and the "aha moment." Find the entries for your batch and read them in full. DO NOT invent SceneCue params — copy them verbatim from this file.

3. **`docs/specs/05-CONTENT-ARCHITECTURE.md`** (257 lines) — The content pipeline. Explains file naming, URL routing, research source mapping, the custom MDX components, and content writing guidelines.

4. **`src/lib/content-map.ts`** — The chapter/section registry. You'll add entries here when you complete sections.

### Per-Section (for whichever sections you're writing)

5. **The research source file(s)** in `docs/research/` — Dense, citation-heavy source material. See "Research Source Mapping" in Part 4 below. Read ONLY the section(s) relevant to the topic you're writing, not the whole file.

### Reference (consult as needed)

6. **`docs/specs/01-ARCHITECTURE.md`** — Full tech stack and project structure. Read if you need to understand how the pieces connect.
7. **`docs/SESSION-KICKOFF.md`** — The original project vision. Read if you need motivational context.

---

## Part 3: The Writing Voice — STUDY THIS CAREFULLY

The voice is the most important thing. If your new section sounds like a textbook or a Wikipedia article, rewrite it. If it sounds like a knowledgeable friend explaining bowling at the alley, you're doing it right.

### The Rev Rate Reference Anatomy

Study `content/the-release/rev-rate.mdx` as a structural template. Here's how it breaks down:

**Lines 1-3: The hook.** One-sentence definition that frames the concept practically. Not "Rev rate is defined as..." but "Rev rate — revolutions per minute — measures how fast the bowling ball spins on its axis after you release it. Along with ball speed, it's one of the two most important factors controlling what your ball does on the lane."

**Lines 5-7: The key callout.** A `<Callout type="key">` with the single most important takeaway. This is the one thing the reader should remember if they forget everything else.

**Lines 9-11: "Why it matters" opener.** A concrete analogy or stakes-raising comparison. "Think of rev rate as your ball's 'engine.' A ball thrown at 15 mph with 200 RPM will roll in a gentle arc. That same ball thrown at 15 mph with 500 RPM will hook aggressively and hit the pins with significantly more energy." This is where you create the "I need to know this" feeling.

**Lines 13-23: Two dramatic-contrast SceneCues.** Placed before the rest of the explanation so readers interact with the 3D scene EARLY. The first SceneCue should always be within the first ~200 words of the document. The two cues here contrast 150 RPM (gentle) with 600 RPM (aggressive) — dramatic visual difference that creates instant understanding.

**Lines 25-31: The "what it does" bullet list + paragraph.** Now that readers have SEEN the concept, explain what it actually controls. Use a bullet list for parallel facts (hook potential, pin action, ball motion shape). Follow with a paragraph that ties it together.

**Lines 33-48: Data table section.** A comparison table with enough columns to be informative but not overwhelming (4 columns max). Follow immediately with a `<Callout type="pro-tip">` that tells the reader what to DO with the table.

**Lines 50-56: Expert callout + third SceneCue.** Mentioning a specific pro bowler (Jesper Svensson at 600 RPM) grounds the concept in reality. Follow with a SceneCue showing the elite state.

**Lines 58-79: How-to section.** "How Rev Rate Is Measured" — both the pro equipment names (Specto, BOLTS, DigiTrax) and the at-home method (tape + phone). This is where the section becomes actionable. Include a warning callout about common measurement errors.

**Lines 81-95: Conceptual deepening.** Speed-to-rev ratio discussion. A fourth SceneCue at the "sweet spot" (350 RPM). Introduces nuance after the basics.

**Lines 97-105: The "what to focus on as a learner" close.** A numbered list of 2-3 concrete actions a reader can take. End with a motivational, honest note about the learning curve. "Your rev rate will change over time as you refine your release. Most bowlers see a 50–100 RPM increase in their first year of focused practice. Two-handed converts often see even larger jumps."

### Voice Rules (Hard Rules)

1. **Second person always.** Write TO the reader. "Your rev rate..." not "The bowler's rev rate..." or "Rev rates among bowlers..."

2. **Conversational but precise.** Use exact numbers naturally. These are good:
   - "Elite two-handers reach 400-550 RPM"
   - "The optimal entry angle is 6 degrees"
   - "Most bowlers live between 5 and 25 degrees"

   These are bad:
   - "Research has established that elite-level two-handed bowlers typically generate rotational velocities in the range of 400 to 550 revolutions per minute"
   - "The optimal angle of entry has been determined to be approximately 6 degrees"

3. **Build understanding progressively.** Concept first, then data, then practical application. Never drop a table before explaining what the table shows. Never use jargon before defining it.

4. **Define jargon on first use.** The first time you say "coverstock" or "PAP" or "breakpoint" in a section, define it in the same sentence. Don't assume prior reading.

5. **No academic language.** Strip all citations, "research has shown," "studies indicate," "it has been demonstrated." Just state the fact.

6. **End with application.** Every section ends with "what should you do with this knowledge." Not facts, but actionable next steps.

7. **Opening hook required.** First paragraph must create stakes or curiosity. Never lead with a dictionary definition.

### Forbidden Phrases (Never Use)

- "In this section, we will..."
- "It is important to note that..."
- "Research has shown that..."
- "Studies have demonstrated..."
- "As previously mentioned..."
- "Let's dive into..."
- "Let's explore..."
- "Let's take a look at..."
- Any form of "Did you know..."
- "In conclusion..." / "To summarize..."
- "In this article..." / "In this page..."
- "We will now discuss..."
- Passive voice patterns like "is considered to be" — use active voice

### Approved Opening Patterns

Pick one of these patterns for each section's first paragraph:

**Pattern A: The surprising fact.** Open with a specific number or fact that contradicts intuition. Example: "USBC researchers tested thousands of strikes and found something surprising: the ball only directly touches 4 of the 10 pins."

**Pattern B: The common misconception.** Open by naming the wrong assumption the reader probably has. Example: "Most recreational bowlers think hook is about spinning the ball harder. It's not — it's about where the ball stops sliding and starts rolling."

**Pattern C: The direct definition with stakes.** Define the concept in one sentence, then immediately state why it matters. Example: "Rev rate measures how fast your ball spins — and it's one of two things that determines whether the pins fall."

**Pattern D: The question the section answers.** Open by asking the exact question the reader is already wondering. Example: "Why does a bowling ball hook? The answer isn't 'because you spin it.' The answer is friction — and specifically, the moment friction changes."

### Example Voice Comparison

Here's the same concept written badly and well.

**❌ BAD (academic, detached, forbidden patterns):**
> "In this section, we will explore the concept of axis tilt. Axis tilt refers to the angle at which the rotational axis of the bowling ball is oriented relative to the horizontal plane of the lane surface. Research has established that typical axis tilt values among professional bowlers range from 5 to 25 degrees. It is important to note that higher axis tilt values result in reduced contact between the ball and the lane surface, which in turn affects friction and hook potential."

**✅ GOOD (Roll Model voice):**
> "Axis tilt controls one thing: how much of your ball actually touches the lane. At 0 degrees, the ball rolls like a car tire — wide contact, maximum friction, maximum hook. At 90 degrees, it spins like a top with almost nothing touching — no hook at all. Most bowlers live between 5 and 25 degrees, and that range is where all the interesting stuff happens."

Notice what changed:
- No "in this section" scaffolding
- Direct statement of what the concept actually does ("controls one thing: how much...")
- Concrete comparison ("like a car tire") instead of abstract definition
- Practical stakes ("that range is where all the interesting stuff happens")
- Readable out loud without sounding weird

---

## Part 4: The Components You Can Use

### Standard Markdown

All standard MDX/markdown elements work and are pre-styled in `src/components/content/mdx-components.tsx`:

- Headings: `#` (page title), `##` (major sections), `###` (subsections). Use `##` for most section breaks. Use `###` sparingly, only when a `##` section has multiple distinct subsections.
- Paragraphs, bold, italic, inline code
- Lists (bullet and numbered)
- Tables — GitHub-flavored markdown syntax, styled with dark theme
- Blockquotes (use rarely — Callouts are usually better)
- Horizontal rules (`---`) — rarely needed

### `<Callout>` Component

Four types, each with different icon/color:

```mdx
<Callout type="key">
The single most important concept in this section. Use ONCE per page near the top
(right after the opening paragraph). 1-2 sentences max.
</Callout>

<Callout type="pro-tip">
Practical advice a reader can apply immediately. Use 1-2 times per section.
Should feel like a "by the way, try this" from an experienced friend.
</Callout>

<Callout type="warning">
Common mistake or something to avoid. Use when relevant, not every section.
Should warn about something the reader will otherwise get wrong.
</Callout>

<Callout type="note">
Additional context or side information. Use sparingly. If you find yourself
reaching for "note" a lot, the content probably belongs in the main prose.
</Callout>
```

Callouts must contain prose only — no nested tables, no headings, no lists.

### `<SceneCue>` Component — The Interactive Heart of the Section

```mdx
<SceneCue
  label="See it: Gentle 150 RPM roll"
  description="Watch how slowly a beginner's ball rotates — the ball barely turns."
  params={{ rpm: 150, showAxis: true, ballColor: "#22c55e" }}
/>
```

**Props:**
- `label` — **Required.** Must start with "See it:" followed by the specific thing the user will observe. Keep it short (3-7 words after "See it:").
- `description` — Optional but recommended. One sentence explaining what the reader should watch for when they click. Helps focus attention.
- `params` — **Required.** The exact parameters from the interaction blueprint (spec 07). These are the values that will be pushed into the 3D scene's Leva controls when the button is clicked.

**Rules:**
- **Use 2-4 per section.** Not more. Not fewer (unless the section is genuinely short).
- **First SceneCue within the first ~200 words.** Hook the interaction early.
- **Dramatic contrast between cues.** If cue 1 sets RPM to 400, cue 2 should set it to 150 or 600, not 420. Make the visual jump obvious.
- **Params come from the blueprint.** Find your section in `docs/specs/07-INTERACTION-BLUEPRINTS.md` and copy the params object verbatim. Do not invent your own.
- **Label with a verb.** "See it: Gentle 150 RPM roll" is good. "See it: Rev rate" is bad (no verb, no specificity).

### What You Cannot Do

- No custom React components — only `<Callout>` and `<SceneCue>` exist
- No inline styling — all formatting comes from the component system
- No images (not set up)
- No videos (not set up)
- No external links to research citations — strip them

---

## Part 5: The Section Structure Template

Every section should follow roughly this structure. The rev-rate.mdx reference file is the canonical example.

```markdown
# [Section Title]

[Opening hook paragraph — 2-4 sentences, uses one of the approved opening patterns,
creates stakes or curiosity, ends with why this matters.]

<Callout type="key">
[Single most important takeaway, 1-2 sentences]
</Callout>

## Why [Concept] Matters

[Practical explanation of why this concept affects the reader's bowling.
2-3 paragraphs max. Should feel like building an argument: "here's what it is,
here's why you should care, here's what it does."]

<SceneCue
  label="See it: [First extreme state]"
  description="[What to watch for]"
  params={{ /* from blueprint */ }}
/>

<SceneCue
  label="See it: [Second extreme state — dramatic contrast]"
  description="[What to watch for]"
  params={{ /* from blueprint */ }}
/>

[More explanation, now that the reader has seen the two extremes.
Use a bullet list if you have parallel facts. Use a paragraph if you're
building toward a single insight.]

## [Second major heading — often a comparison or data section]

[Explanation that leads into a data table]

| Column | Column | Column | Column |
|--------|--------|--------|--------|
| [row 1] | | | |
| [row 2] | | | |

<Callout type="pro-tip">
[Specific practical advice the reader can act on today]
</Callout>

[Transition to the "how to measure/recognize/apply this" section]

## [Third major heading — often "How [thing] Is Measured" or similar]

[The measurement or application discussion. Pro equipment names if relevant.
At-home methods if applicable.]

<SceneCue
  label="See it: [Third state — usually the sweet spot or recommended value]"
  description="[What to watch for]"
  params={{ /* from blueprint */ }}
/>

<Callout type="warning">
[Common mistake — only if relevant to this concept]
</Callout>

## What to Focus on as a Learner

[The closing application section. A numbered list works well here.]

1. **[First action]** — specific thing to try or measure
2. **[Second action]** — specific thing to observe in your own game
3. **[Third action]** — specific thing to ask a coach or pro shop about

[Closing paragraph — motivational, honest about the learning curve.
Ends the section on a "you can do this" note without being saccharine.]
```

### Length Targets

| Content Density | Target MDX Lines |
|-----------------|-----------------|
| Thin research (concept-only sections) | 60-80 |
| Average research (most sections) | 80-110 |
| Rich research (data-heavy sections) | 110-140 |
| Very rich research (flagship sections like Rev Rate) | 100-140 |

If you're going over 140 lines, you're probably over-explaining. If you're under 60, you're probably under-serving the topic.

---

## Part 6: The Batching Strategy

Do not write sections in random order. Do not write one section at a time. Write in **clusters of 3-5 related sections.**

### What Makes a Good Cluster

- **Shared research file** — minimizes reading-switching cost
- **Shared scene type** — maintains design consistency in the reader's experience
- **Shared topic area** — voice stays coherent across the cluster
- **Natural learning progression** — a reader could follow all 5 sections in order and feel like they're learning progressively

### The Recommended First Batch: "Custom Ball Owner Cluster"

**Why this batch first:**
- All 5 sections use the existing bowling ball component (no new 3D assets needed)
- All research comes from 2 files: `ball-physics-and-equipment-science.md` and `performance-metrics-and-ml-classification.md`
- Target user (a new bowler with a custom ball) would read these 5 sections together
- Every scene is Tier 1 complexity (already built or trivial extension of existing ball)
- The cluster answers the #1 question a new custom-ball owner has: "What did I just buy and how does it work?"

**The 5 sections:**

#### Section 1: Coverstock Types

- **URL**: `/learn/the-ball/coverstock-types`
- **File**: `content/the-ball/coverstock-types.mdx` (create)
- **Content map entry**:
  ```typescript
  "the-ball/coverstock-types": {
    title: "Coverstock Types",
    chapter: "The Ball",
    chapterNumber: 2,
    scene: "coverstock-types",
    description: "Plastic, urethane, and reactive resin — what the ball's surface actually is",
  },
  ```
- **Research source**: `docs/research/ball-physics-and-equipment-science.md` §1 (coverstock materials, historical evolution, 6-type comparison table, visual ID cues)
- **Blueprint reference**: `docs/specs/07-INTERACTION-BLUEPRINTS.md` §2.1 "Coverstock Types"
- **Key concepts to convey**: 3 main coverstock categories (plastic/urethane/reactive), what each does on the lane, why the coverstock is "the ball's personality," when to use each type
- **Approximate length**: 100-120 lines

#### Section 2: RG & Differential

- **URL**: `/learn/the-ball/rg-and-differential`
- **File**: `content/the-ball/rg-and-differential.mdx` (create)
- **Content map entry**:
  ```typescript
  "the-ball/rg-and-differential": {
    title: "RG & Differential",
    chapter: "The Ball",
    chapterNumber: 2,
    scene: "rg-differential",
    description: "How mass is distributed inside your ball, and why it matters",
  },
  ```
- **Research source**: `docs/research/ball-physics-and-equipment-science.md` §3-4 (USBC legal ranges 2.460-2.800, differential 0.010-0.060, classification tables, flare rings, track migration)
- **Blueprint reference**: `docs/specs/07-INTERACTION-BLUEPRINTS.md` §2.3 "RG & Differential"
- **Key concepts**: RG = how hard the ball is to get spinning (figure skater analogy), Differential = track flare potential, the USBC legal ranges, how to read these numbers on a pro shop spec sheet
- **Approximate length**: 110-130 lines

#### Section 3: Surface Preparation

- **URL**: `/learn/the-ball/surface-preparation`
- **File**: `content/the-ball/surface-preparation.mdx` (create)
- **Content map entry**:
  ```typescript
  "the-ball/surface-preparation": {
    title: "Surface Preparation",
    chapter: "The Ball",
    chapterNumber: 2,
    scene: "surface-prep",
    description: "The cheapest, fastest way to change how your ball reacts",
  },
  ```
- **Research source**: `docs/research/ball-physics-and-equipment-science.md` §6 (grit scale 500-5000, sanded vs polished behavior, degradation, maintenance schedule)
- **Blueprint reference**: `docs/specs/07-INTERACTION-BLUEPRINTS.md` §2.5 "Surface Preparation"
- **Key concepts**: Grit scale (500 rough to 5000+polished), what each range does to ball motion, surface changes vs core changes (surface is the cheapest adjustment), maintenance (surface degrades over games)
- **Approximate length**: 90-110 lines

#### Section 4: Axis Tilt

- **URL**: `/learn/the-release/axis-tilt`
- **File**: `content/the-release/axis-tilt.mdx` (create — folder already exists)
- **Content map entry**:
  ```typescript
  "the-release/axis-tilt": {
    title: "Axis Tilt",
    chapter: "The Release",
    chapterNumber: 5,
    scene: "axis-tilt",
    description: "How much of your ball actually touches the lane",
  },
  ```
- **Research source**: `docs/research/performance-metrics-and-ml-classification.md` §4 (5-tier tilt table, typical 5-25 degree range for most bowlers)
- **Blueprint reference**: `docs/specs/07-INTERACTION-BLUEPRINTS.md` §5.3 "Axis Tilt"
- **Key concepts**: Axis tilt is the angle of the spin axis relative to the lane surface, controls ball-lane contact area, 0° = car tire (max friction), 90° = spinning top (min friction), most bowlers 5-25°
- **Approximate length**: 90-110 lines

#### Section 5: Axis Rotation

- **URL**: `/learn/the-release/axis-rotation`
- **File**: `content/the-release/axis-rotation.mdx` (create)
- **Content map entry**:
  ```typescript
  "the-release/axis-rotation": {
    title: "Axis Rotation",
    chapter: "The Release",
    chapterNumber: 5,
    scene: "axis-rotation",
    description: "The direction of your spin — and why it creates hook",
  },
  ```
- **Research source**: `docs/research/performance-metrics-and-ml-classification.md` §4 (5-tier rotation table, direction-of-spin vs direction-of-travel angle)
- **Blueprint reference**: `docs/specs/07-INTERACTION-BLUEPRINTS.md` §5.4 "Axis Rotation"
- **Key concepts**: Axis rotation is the angle between spin direction and travel direction, 0° = end-over-end roll (no hook), 90° = pure side spin (max hook), most bowlers 30-60°, this is the PRIMARY driver of hook shape
- **Approximate length**: 90-110 lines

### Batch Writing Order

Within this batch, write in this order:

1. **Coverstock Types first** — it's the most distinct topic and makes a strong opening. Reading it first doesn't require prior knowledge.
2. **RG & Differential second** — naturally follows coverstock (still in the ball chapter), adds technical depth.
3. **Surface Preparation third** — completes the ball-equipment trio. Shows the reader how to adjust what they already own.
4. **Axis Tilt fourth** — shifts topics from equipment to release mechanics. Natural transition via "now that you know your ball, let's talk about what you do to it."
5. **Axis Rotation fifth** — completes the release mechanics pair. Pairs naturally with Axis Tilt.

### Scene Registration Note

All 5 sections reference scene names (`coverstock-types`, `rg-differential`, `surface-prep`, `axis-tilt`, `axis-rotation`) that **do not exist yet as scene components**. When the reader navigates to these pages, the 3D panel will fall through to the `DefaultScene` (just the default bowling ball). That is okay — the content still works, and the SceneCue params just won't do anything visible until someone builds the matching scene components in a future session.

**You do not need to build the scenes.** That is a separate session's work. Just register the scene name in `content-map.ts` and write the content.

---

## Part 7: Research Source Mapping

When writing a section, read the corresponding research passage first. Extract the 5-8 key facts a learner needs. Transform them into conversational prose following the voice guide.

### Chapter → Research File Mapping

| Chapter | Primary Research File(s) |
|---------|--------------------------|
| Ch 1: The Basics | `lane-science-and-oil-patterns.md` §1-2 + `strike-physics-and-scoring-science.md` §1, §8 |
| Ch 2: The Ball | `ball-physics-and-equipment-science.md` (entire file) |
| Ch 3: The Approach | `biomechanics-and-form.md` §2, §6 |
| Ch 4: The Swing | `biomechanics-and-form.md` §3 |
| Ch 5: The Release | `biomechanics-and-form.md` §4-5 + `performance-metrics-and-ml-classification.md` §3-4 |
| Ch 6: Ball Motion Down the Lane | `ball-physics-and-equipment-science.md` §5 + `performance-metrics-and-ml-classification.md` §5-9 |
| Ch 7: The Lane (Conditions) | `lane-science-and-oil-patterns.md` §3-10 |
| Ch 8: The Strike | `strike-physics-and-scoring-science.md` §1-6 |
| Ch 9: Spares | `strike-physics-and-scoring-science.md` §5, §7 |
| Ch 10: Equipment Strategy | `ball-physics-and-equipment-science.md` §10 |
| Ch 11: Reading the Lane | `lane-science-and-oil-patterns.md` §7-8 + `08-coaching-pedagogy-and-feedback.md` §3 |
| Ch 12: Two-Handed Bowling | `biomechanics-and-form.md` §1 + `performance-metrics-and-ml-classification.md` §3 |

### Research File Sizes (so you know what you're opening)

| File | Lines | Density |
|------|-------|---------|
| `01-bowling-science-reference.md` | 3,869 | Comprehensive superset — use as backup reference |
| `02-existing-tools-gap-analysis.md` | 2,958 | Competitive analysis — mostly not useful for content writing |
| `08-coaching-pedagogy-and-feedback.md` | 1,342 | Coaching methodology, mental game |
| `performance-metrics-and-ml-classification.md` | 931 | Rev rate, axis tilt/rotation, breakpoint, metrics |
| `strike-physics-and-scoring-science.md` | 748 | Pins, pocket, entry angle, scoring, pin action |
| `lane-science-and-oil-patterns.md` | 743 | Lane dimensions, oil patterns, PBA patterns, transitions |
| `ball-physics-and-equipment-science.md` | 673 | Coverstock, core, RG/diff, motion phases, surface, drilling |
| `biomechanics-and-form.md` | 644 | Approach, swing, release, wrist, follow-through |

### Research Files Are Too Big to Read in One Shot

The research files regularly exceed 10,000 tokens when read whole. Use the Read tool with `offset` and `limit` parameters to read the specific section you need, or use Grep to find the exact passage for the topic you're writing.

Example workflow for writing the Axis Tilt section:
```
Grep pattern: "axis tilt" in performance-metrics-and-ml-classification.md
→ Find the line number range of the relevant section
→ Read that file with offset=X, limit=100
→ Extract the 5-8 key facts
→ Write the MDX
```

---

## Part 8: Session Workflow (Step by Step)

### Step 1: Orient (first 5-10 minutes)

- Read `content/the-release/rev-rate.mdx` fully. Twice if you haven't internalized the voice.
- Read the interaction blueprint entries for your batch in `docs/specs/07-INTERACTION-BLUEPRINTS.md`. Copy the SceneCue params into a scratchpad for reference.
- Grep/Read the research passages for your batch's sections. Take notes on the key facts.

### Step 2: Write Each Section (main work)

For each section in the batch:

1. Open the research passage alongside the blueprint entry
2. Draft the MDX file using the structure template in Part 5
3. Make sure each SceneCue's `params={{ ... }}` matches the blueprint exactly
4. Check length is in the target range (80-140 lines for most sections)
5. Save the file to `content/{chapter-slug}/{section-slug}.mdx`

### Step 3: Register the Sections

Edit `src/lib/content-map.ts`:

- Add entries for each section in the `contentMap` object
- Use the exact `scene` name from the blueprint
- Place entries in alphabetical or logical order in the object (not critical, but consistency helps)

### Step 4: Verify

After writing all 5 sections:

```bash
# Catches MDX parse errors, JSX errors, import errors
npm run build

# Catches any type issues in the content-map edits
npx tsc --noEmit
```

Both should pass. If `npm run build` fails on an MDX parse error, fix the MDX file and re-run. The most common MDX errors are:
- Unescaped `<` or `>` characters in prose (use `&lt;` / `&gt;` or rewrite)
- Unclosed JSX tags
- Missing curly braces in `params={{ ... }}`
- Missing quotes around string values in `params`

### Step 5: Test the Routes (optional but recommended)

Start the dev server if not running:
```bash
lsof -ti :6200 | xargs kill 2>/dev/null  # clear port
npm run dev
```

Navigate to each new route in the browser and verify:
- The page loads (200, not 404 or 500)
- The content renders (headings, callouts, SceneCues visible)
- The SceneCue buttons are clickable (even if the 3D scene doesn't change — that's expected since most scenes don't exist yet)

### Step 6: Commit

Create ONE commit for the entire batch. Commit message format:

```
content: chapter 2 ball equipment + release mechanics cluster (5 sections)

Adds the first content batch — the "Custom Ball Owner Cluster":
- Coverstock Types (Ch 2.1)
- RG & Differential (Ch 2.3)
- Surface Preparation (Ch 2.5)
- Axis Tilt (Ch 5.3)
- Axis Rotation (Ch 5.4)

All 5 sections use the existing ball component (Tier 1 scene complexity).
Scene components for the new scene names (coverstock-types, rg-differential,
surface-prep, axis-tilt, axis-rotation) will be built in a future session —
content pages fall through to DefaultScene until then.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

**Do NOT push, do NOT create a PR.** Just commit. The user will review and push.

---

## Part 9: Quality Checklist (Per Section)

Before marking a section complete, verify:

### Content quality
- [ ] Opening hook is present (not "In this section...")
- [ ] Opens with one of the approved patterns (surprising fact, misconception, direct+stakes, question)
- [ ] `<Callout type="key">` appears in the first ~300 words
- [ ] Second person voice throughout ("your ball," not "the bowler's ball")
- [ ] No forbidden phrases (see Part 3)
- [ ] Every jargon term defined on first use
- [ ] Ends with "what to focus on" or equivalent actionable section

### Structure
- [ ] 2-4 SceneCues, spaced through the content
- [ ] First SceneCue within first ~200 words
- [ ] SceneCue params match blueprint verbatim
- [ ] `<Callout type="pro-tip">` somewhere in the middle
- [ ] At least one data table or comparison (if the topic has data)
- [ ] Length 80-140 lines

### Technical
- [ ] File saved to correct path: `content/{chapter-slug}/{section-slug}.mdx`
- [ ] Entry added to `src/lib/content-map.ts`
- [ ] `scene` field in content map matches planned scene name from blueprint
- [ ] `npm run build` succeeds
- [ ] `npx tsc --noEmit` clean
- [ ] Route loads in browser (200 status)

### Voice (read it aloud)
- [ ] Sounds conversational when read aloud
- [ ] Doesn't sound like a textbook
- [ ] Doesn't sound like ChatGPT
- [ ] Would a bowler at a bowling alley actually read this?
- [ ] Does the reader leave feeling smarter AND motivated?

---

## Part 10: Common Pitfalls and Gotchas

### Gotcha 1: The SceneCue params format

SceneCue params use **double curly braces** because it's JSX-inside-Markdown. The inner braces define the object, the outer braces are JSX expression syntax.

```mdx
<!-- CORRECT -->
<SceneCue params={{ rpm: 150, showAxis: true }} />

<!-- WRONG -->
<SceneCue params={ rpm: 150, showAxis: true } />
<SceneCue params="{rpm: 150}" />
```

### Gotcha 2: Markdown inside JSX

Markdown does NOT render inside JSX component children. These DON'T work:

```mdx
<!-- WRONG — **bold** won't render -->
<Callout type="key">
This is **not bold**.
</Callout>
```

Use HTML or restructure:
```mdx
<!-- CORRECT -->
<Callout type="key">
This is <strong>bold</strong>.
</Callout>

<!-- OR — plain prose, no emphasis needed -->
<Callout type="key">
The most important thing to remember.
</Callout>
```

In practice, Callouts should be plain prose without emphasis. If you need emphasis, rewrite the sentence.

### Gotcha 3: The content-map object key

Content map keys do NOT start with `/`. They're the path segments joined with `/`:

```typescript
// CORRECT
"the-ball/coverstock-types": { ... }

// WRONG
"/learn/the-ball/coverstock-types": { ... }
"/the-ball/coverstock-types": { ... }
```

The `/learn/` prefix is added by the route handler, not the content map key.

### Gotcha 4: File location must match content-map key

If the content map key is `"the-ball/coverstock-types"`, the file must be at `content/the-ball/coverstock-types.mdx`. The route handler reads the file from `content/${slugPath}.mdx`. A mismatch = 404.

### Gotcha 5: Scene names should be kebab-case

The `scene` field in the content map is a string that's matched against cases in `src/components/layout/scene-switcher.tsx`. Use kebab-case:

```typescript
// GOOD
scene: "coverstock-types"
scene: "rg-differential"
scene: "axis-tilt"

// BAD (won't match future scene switcher cases)
scene: "coverstockTypes"
scene: "RG_Differential"
scene: "axis tilt"
```

If the scene doesn't exist yet, the switcher falls through to `DefaultScene`. That's fine — the content still works.

### Gotcha 6: GFM tables need blank lines around them

```mdx
<!-- CORRECT -->
Here is some prose.

| Column | Column |
|--------|--------|
| data   | data   |

More prose follows.

<!-- WRONG — table may not render -->
Here is some prose.
| Column | Column |
|--------|--------|
| data   | data   |
More prose follows.
```

Always put a blank line before and after tables.

### Gotcha 7: Don't double-quote hex colors in SceneCue params

```mdx
<!-- CORRECT — JavaScript object literal syntax -->
<SceneCue params={{ ballColor: "#22c55e" }} />

<!-- WRONG — the outer braces make this an object, not a string -->
<SceneCue params={{{ ballColor: '#22c55e' }}} />
```

### Gotcha 8: Don't use markdown headings inside Callouts or SceneCues

```mdx
<!-- WRONG — will break rendering -->
<Callout type="key">
## A heading
Some prose.
</Callout>
```

Callouts are for prose only.

---

## Part 11: Future Batches (After Batch 1)

Once Batch 1 is complete and committed, subsequent sessions should tackle these clusters. Each batch gets its own session.

- **Batch 2: "Foundation Cluster"** — Ch 1 sections (The Lane, The Pins, How Scoring Works, Board Numbering). Mix of Tier 1 and Tier 2 scenes. Research source: `lane-science-and-oil-patterns.md` §1-2 + `strike-physics-and-scoring-science.md` §1, §8.

- **Batch 3: "Ball Internals Cluster"** — Core Design, Ball Motion: Skid-Hook-Roll, Weight & Drilling. Completes Chapter 2. Research: `ball-physics-and-equipment-science.md` §2, §5, §7-8.

- **Batch 4: "Strike Physics Cluster"** — The Pocket, Entry Angle, Pin Action, Speed at the Pins. Research: `strike-physics-and-scoring-science.md` §1-4. The Entry Angle section in this batch is one of the most important — USBC's 6-degree finding is a flagship "aha moment."

- **Batch 5: "Pin Leaves + Perfect Game Cluster"** — Common Pin Leaves, The Perfect Game. Short batch (2 sections), data-heavy. Research: `strike-physics-and-scoring-science.md` §5-6.

- **Batch 6: "Oil & Lane Reading Cluster"** — Oil Pattern Basics, House Shot, Rule of 31, Making Adjustments. Research: `lane-science-and-oil-patterns.md` §3-4, §8 + `08-coaching-pedagogy-and-feedback.md` §3.

- **Batch 7: "PBA Patterns Cluster"** — PBA Patterns, Sport Shots, Lane Transition, Lane Surfaces, Watching Ball Reaction. Research: `lane-science-and-oil-patterns.md` §5-7, §9-10. Data-heavy batch.

- **Batch 8: "The Release Refinement Cluster"** — Wrist Position, Follow-Through, One vs Two-Handed. Research: `biomechanics-and-form.md` §4-5 + §1.

- **Batch 9: "Approach Cluster"** — Stance & Setup, 4-Step Approach, 5-Step Approach, Timing, Drift. Research: `biomechanics-and-form.md` §2, §6. Figure-dependent scenes.

- **Batch 10: "Swing Cluster"** — Pushaway, Backswing, Forward Swing, Free vs Muscled, Swing Plane. Research: `biomechanics-and-form.md` §3. Figure-dependent scenes.

- **Batch 11: "Ball Motion Cluster"** — Three Phases, Speed & Rev Rate Interaction, Breakpoint, Total Hook, Loft. Research: `performance-metrics-and-ml-classification.md` §5-9.

- **Batch 12: "Spares Cluster"** — Why Spares Matter, The 3-6-9 System, Corner Pin Spares, Split Conversions. Research: `strike-physics-and-scoring-science.md` §5, §7.

- **Batch 13: "Equipment Strategy Cluster"** — Choosing Your First Ball, Building an Arsenal, Matching Ball to Oil, Surface Adjustments. Research: `ball-physics-and-equipment-science.md` §10.

- **Batch 14: "Two-Handed Cluster"** — Two-Handed Revolution, Grip & Release, Extra Rev Rate & Rotation, Body Mechanics. Research: `biomechanics-and-form.md` §1 + `performance-metrics-and-ml-classification.md` §3.

**Total**: 14 batches covering all 52 remaining sections. If each batch = one focused session, the full content corpus could be complete in ~14 sessions.

---

## Part 12: The First Prompt to Use in the Fresh Session

Copy this prompt verbatim into a fresh Claude Code session opened in `/Users/joenash/github/roll-model`:

```
Read docs/specs/08-CONTENT-BATCHING-HANDOFF.md fully. That's your complete briefing 
for this session. After reading it, read the other files it references (the existing 
rev-rate.mdx, the interaction blueprint 07, the content map, and the research files 
for Batch 1). 

Then write the first batch: the "Custom Ball Owner Cluster" — 5 sections:
1. Coverstock Types (content/the-ball/coverstock-types.mdx)
2. RG & Differential (content/the-ball/rg-and-differential.mdx)
3. Surface Preparation (content/the-ball/surface-preparation.mdx)
4. Axis Tilt (content/the-release/axis-tilt.mdx)
5. Axis Rotation (content/the-release/axis-rotation.mdx)

Write each section fully and carefully. This is a depth-over-speed project. Take 
your time, nail the voice, match the blueprint exactly. After each section, verify 
with `npm run build`. After all 5 sections, create ONE commit with a clear message. 
Do NOT push — I'll review first.

Do not build or modify 3D scenes. Do not rush. Do not skip the research reading.
The rev-rate.mdx file is your North Star for voice — if your section doesn't feel 
like it came from the same author, rewrite it.
```

---

## Part 13: Current Project State (as of 2026-04-12)

So you know what you're walking into:

### Repo Stats
- **GitHub**: github.com/heyjoenash/roll-model (public)
- **Production**: roll-model.vercel.app (auto-deploys from main)
- **Branch**: main only
- **Commits**: 12 as of this doc

### Content Status
- **Production content sections complete**: 1 (Rev Rate)
- **Prototype sections**: 1 (`/learn/prototypes` — dev sandbox, not production content)
- **Planned sections**: 53
- **Remaining**: 52

### 3D Assets Status
- **Ball** (hero asset): Built, premium rendering with clearcoat + post-processing
- **Pins**: Built as `<Lathe>` with USBC profile, available at `src/components/3d/assets/pins/`
- **Lane**: Not yet built
- **Figure**: Not yet built
- **Oil pattern data**: Not yet built

### Scene Components Built
- `rev-rate-scene.tsx` — the current rev-rate page scene
- `default-scene.tsx` — fallback when scene name doesn't match
- `prototype-scene.tsx` — dev sandbox
- All other scene names in content-map will fall through to default until built

### Documentation Status
- 10 spec documents in `docs/specs/` (~4,200 lines total)
- Full interaction blueprints for all 53 sections
- Asset architecture defined
- Content voice guide (this document)

### Dev Server
- Port 6200 (always — configured in package.json)
- Start with: `cd /Users/joenash/github/roll-model && npm run dev`
- Kill existing: `lsof -ti :6200 | xargs kill`
- **Never use `pkill -f "next dev"`** — it kills all Next.js servers on the machine

---

## Part 14: Remember

This is an encyclopedia someone reads at a bowling alley between games. It needs to be:

1. **Immediately useful** — Actionable knowledge, not academic theory
2. **Instantly interactive** — SceneCues hook the reader into the 3D scene early
3. **Trustworthy** — Every fact accurate to the research, no hallucination
4. **Fast to read** — A single section should take 5-8 minutes, tops
5. **Motivating** — The reader should close each section ready to try something

Quality matters more than speed. Voice matters more than volume. If you're not sure whether a sentence feels right, read it aloud. If it sounds like a textbook, rewrite it. If it sounds like a knowledgeable friend, keep it.

The `rev-rate.mdx` file is your North Star. Every section should feel like it came from the same author. If it doesn't, rewrite.

Good luck. Take your time.
