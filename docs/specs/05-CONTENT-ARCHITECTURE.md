# Roll Model — Content Architecture Specification

> **Status**: CANONICAL
> **Last Updated**: 2026-04-11

---

## Content Pipeline

### MDX Rendering

Content is authored as `.mdx` files in the `content/` directory. The dynamic route `src/app/learn/[...slug]/page.tsx` is a React Server Component that:

1. Resolves the slug against `content-map.ts`
2. Reads the `.mdx` file from disk via `fs/promises`
3. Renders via `next-mdx-remote-client/rsc` with `remarkGfm` and custom components
4. Wraps in `<SceneSetter scene={entry.scene} />` to activate the correct 3D scene

### File Structure

```
content/
├── the-release/
│   └── rev-rate.mdx          # ✅ Complete (Phase 1)
├── the-basics/                # Future chapters follow same pattern
│   ├── the-lane.mdx
│   ├── the-pins.mdx
│   └── scoring.mdx
├── the-ball/
│   ├── coverstock-types.mdx
│   └── ...
└── ... (12 chapters total)
```

URL pattern: `/learn/{chapter-slug}/{section-slug}` → reads `content/{chapter-slug}/{section-slug}.mdx`

### Custom MDX Components

**File**: `src/components/content/mdx-components.tsx`

All standard MDX elements are styled with Tailwind classes. Two custom components are available:

#### Callout

```mdx
<Callout type="key">
Higher rev rates create more hook potential.
</Callout>
```

Types: `key` (blue), `pro-tip` (green), `warning` (amber), `note` (zinc)

#### SceneCue

```mdx
<SceneCue
  label="See it: Gentle 150 RPM roll"
  description="Watch how slowly a beginner's ball rotates"
  params={{ rpm: 150, showAxis: true, ballColor: "#22c55e" }}
/>
```

When clicked, pushes `params` into SceneContext with a `_t: Date.now()` timestamp to ensure updates fire even when values match previous state.

---

## Content Map

**File**: `src/lib/content-map.ts`

### Content Registry

Each content section is registered with:

```typescript
interface ContentEntry {
  title: string;          // Display title
  chapter: string;        // Parent chapter name
  chapterNumber: number;  // For ordering
  scene: string;          // Which 3D scene to activate
  description: string;    // Meta description
}
```

Currently registered:

| Slug | Scene | Status |
|------|-------|--------|
| `the-release/rev-rate` | `rev-rate` | Complete |

### Chapter Registry

12 chapters with ~50 sections total are defined in the `chapters` array. These drive the sidebar navigation. Only sections with matching entries in `contentMap` and `.mdx` files will render — others will 404 until content is written.

---

## Full Chapter Map

### Chapter 1: The Basics (`the-basics/`)

| Section | Slug | 3D Scene | Research Source |
|---------|------|----------|----------------|
| The Lane | `the-lane` | Full lane with markings | lane-science §1 |
| The Pins | `the-pins` | 10-pin triangle, hover for numbers | strike-physics §1 |
| How Scoring Works | `scoring` | Animated scorecard | strike-physics §8 |
| Board Numbering | `board-numbering` | Top-down lane, numbered boards | lane-science §1.2 |

### Chapter 2: The Ball (`the-ball/`)

| Section | Slug | 3D Scene | Research Source |
|---------|------|----------|----------------|
| Coverstock Types | `coverstock-types` | Toggle: plastic/urethane/reactive | ball-physics §1 |
| Core Design | `core-design` | Cutaway: symmetric vs asymmetric core | ball-physics §2 |
| RG & Differential | `rg-and-differential` | Mass distribution animation | ball-physics §3-4 |
| Ball Motion: Skid-Hook-Roll | `ball-motion` | Lane animation with phases | ball-physics §5 |
| Surface Preparation | `surface-preparation` | Close-up with grit slider | ball-physics §6 |
| Weight & Drilling | `weight-and-drilling` | Pin, CG, mass bias markers | ball-physics §7-8 |

### Chapter 3: The Approach (`the-approach/`)

| Section | Slug | 3D Scene | Research Source |
|---------|------|----------|----------------|
| Stance & Setup | `stance-and-setup` | Figure at approach dots | biomechanics §6 |
| The 4-Step Approach | `four-step-approach` | Animated 4-step walk | biomechanics §2 |
| The 5-Step Approach | `five-step-approach` | Animated 5-step walk | biomechanics §2 |
| Timing | `timing` | Split: feet + arm sync | biomechanics §2 |
| Drift | `drift` | Top-down lateral movement | biomechanics §2 |

### Chapter 4: The Swing (`the-swing/`)

| Section | Slug | 3D Scene | Research Source |
|---------|------|----------|----------------|
| The Pushaway | `pushaway` | Side view: ball pushed forward | biomechanics §3 |
| The Backswing | `backswing` | Side view: ball rises behind | biomechanics §3 |
| The Forward Swing | `forward-swing` | Side view: ball forward | biomechanics §3 |
| Free vs Muscled Swing | `free-vs-muscled` | Pendulum vs forced comparison | biomechanics §3 |
| Swing Plane | `swing-plane` | Behind: straight/inside-out/outside-in | biomechanics §3 |

### Chapter 5: The Release (`the-release/`)

| Section | Slug | 3D Scene | Research Source |
|---------|------|----------|----------------|
| Wrist Position | `wrist-position` | Hand/ball: cupped/straight/broken | biomechanics §4 |
| **Rev Rate** | **`rev-rate`** | **Spinning ball, RPM slider** | **metrics §3** |
| Axis Tilt | `axis-tilt` | Ball with axis line, tilt slider | metrics §4 |
| Axis Rotation | `axis-rotation` | Ball with rotation arrow | metrics §4 |
| One-Handed vs Two-Handed | `one-vs-two-handed` | Side-by-side comparison | biomechanics §1 |
| Follow-Through | `follow-through` | Hand positions after release | biomechanics §5 |

### Chapter 6: Ball Motion Down the Lane (`ball-motion-down-the-lane/`)

| Section | Slug | 3D Scene | Research Source |
|---------|------|----------|----------------|
| The Three Phases | `three-phases` | Lane: skid→hook→roll colored | ball-physics §5 |
| Speed & Rev Rate Interaction | `speed-rev-interaction` | Dual sliders: speed + revs | strike-physics §4 |
| Breakpoint | `breakpoint` | Bird's-eye: trajectory + breakpoint | metrics §6 |
| Total Hook | `total-hook` | Overlay of hook amounts | metrics §7 |
| Loft | `loft` | Side view: ball arcing to lane | metrics §5 |

### Chapter 7: The Lane (`the-lane-conditions/`)

| Section | Slug | 3D Scene | Research Source |
|---------|------|----------|----------------|
| Oil Pattern Basics | `oil-pattern-basics` | Lane with colored oil overlay | lane-science §3 |
| House Shot | `house-shot` | House pattern with 10:1 ratio | lane-science §4 |
| PBA Patterns | `pba-patterns` | Dropdown: all PBA animal patterns | lane-science §5 |
| Sport Shots | `sport-shots` | Sport pattern flat distribution | lane-science §6 |
| Lane Transition | `lane-transition` | Time-lapse: oil breakdown | lane-science §7 |
| Lane Surfaces | `lane-surfaces` | Toggle: wood vs synthetic | lane-science §9 |

### Chapter 8: The Strike (`the-strike/`)

| Section | Slug | 3D Scene | Research Source |
|---------|------|----------|----------------|
| The Pocket | `the-pocket` | Overhead: ball entering 1-3 | strike-physics §2 |
| Entry Angle | `entry-angle` | Slider: 1°-8° angle | strike-physics §2 |
| Pin Action | `pin-action` | Animated: chain reaction | strike-physics §3 |
| Speed at the Pins | `speed-at-pins` | Speed slider vs carry | strike-physics §4 |
| Common Pin Leaves | `common-pin-leaves` | Dropdown: 10-pin, 7-10 split | strike-physics §5 |
| The Perfect Game | `perfect-game` | 12 consecutive strikes | strike-physics §6 |

### Chapter 9: Spares (`spares/`)

| Section | Slug | 3D Scene | Research Source |
|---------|------|----------|----------------|
| Why Spares Matter | `why-spares-matter` | Score impact visualization | strike-physics §7 |
| The 3-6-9 System | `three-six-nine-system` | Move feet 3-6-9 boards | strike-physics §7 |
| Corner Pin Spares | `corner-pin-spares` | Cross-lane angles for 7/10 | strike-physics §7 |
| Split Conversions | `split-conversions` | Difficult spare angles | strike-physics §5 |

### Chapter 10: Equipment Strategy (`equipment-strategy/`)

| Section | Slug | 3D Scene | Research Source |
|---------|------|----------|----------------|
| Choosing Your First Ball | `first-ball` | Plastic vs reactive comparison | ball-physics §10 |
| Building an Arsenal | `building-arsenal` | 3-6 ball display | ball-physics §10 |
| Matching Ball to Oil | `matching-ball-to-oil` | Oil pattern + ball selector | ball-physics §10 |
| Surface Adjustments | `surface-adjustments` | Same ball, different grit | ball-physics §6 |

### Chapter 11: Reading the Lane (`reading-the-lane/`)

| Section | Slug | 3D Scene | Research Source |
|---------|------|----------|----------------|
| Rule of 31 | `rule-of-31` | Pattern length → breakpoint calc | lane-science §8 |
| Watching Ball Reaction | `watching-ball-reaction` | Fresh vs transitioned trajectory | lane-science §7 |
| Making Adjustments | `making-adjustments` | Animated: move feet/target/speed | coaching §3 |

### Chapter 12: Two-Handed Bowling (`two-handed-bowling/`)

| Section | Slug | 3D Scene | Research Source |
|---------|------|----------|----------------|
| The Two-Handed Revolution | `two-handed-revolution` | Side-by-side approach comparison | biomechanics §1 |
| Grip & Release | `grip-and-release` | Two-handed grip, support release | biomechanics §1, §4 |
| Extra Rev Rate & Rotation | `extra-rev-rate` | 350 vs 550 RPM comparison | biomechanics §1 |
| Body Mechanics | `body-mechanics` | Spine tilt: 30° vs 80° | biomechanics §1, §6 |

---

## Content Writing Guidelines

### Tone

Transform research docs (dense, citation-heavy) into conversational, learner-friendly prose. Write for someone learning bowling, not a researcher. Every fact must be accurate to the research but accessible.

### Structure per Section

1. Opening paragraph explaining the concept
2. `<Callout type="key">` with the single most important takeaway
3. "Why it matters" section connecting to practical bowling
4. `<SceneCue>` buttons at key moments (2-4 per section)
5. Data table where applicable (RPM ranges, comparisons)
6. `<Callout type="pro-tip">` with practical advice
7. Measurement/analysis section (how to measure this yourself)
8. Closing paragraph on "what to focus on as a learner"

### SceneCue Placement

SceneCues should appear at moments where "seeing it" creates instant understanding:
- After describing a specific value ("At 150 RPM, the ball barely turns")
- When comparing extremes ("Now watch elite 600 RPM")
- At the "sweet spot" or recommended value
- Never more than 4 per section — they lose impact if overused

---

## Research Source Files

| File | Lines | Content |
|------|-------|---------|
| `01-bowling-science-reference.md` | 3,869 | Comprehensive bowling science overview |
| `02-existing-tools-gap-analysis.md` | 2,958 | Analysis of existing bowling tools/tech |
| `08-coaching-pedagogy-and-feedback.md` | 1,342 | Coaching methods and feedback systems |
| `ball-physics-and-equipment-science.md` | 673 | Ball materials, cores, drilling, surface |
| `biomechanics-and-form.md` | 644 | Approach, swing, release mechanics |
| `lane-science-and-oil-patterns.md` | 743 | Lane conditions, oil patterns, transitions |
| `performance-metrics-and-ml-classification.md` | 931 | Rev rate, axis tilt/rotation, breakpoint |
| `strike-physics-and-scoring-science.md` | 748 | Strike pocket, pin action, scoring |
