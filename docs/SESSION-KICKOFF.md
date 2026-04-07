# Roll Model — Session Kickoff & Project Brief

> **Project**: Roll Model — An interactive 3D bowling knowledge site
> **Created**: 2026-04-02
> **Context**: Spun off from the Bowling Buddy project (video analysis tool). The research phase for Bowling Buddy produced 16,218 lines of deeply-sourced bowling science content. This project turns that content into a modern, interactive learning experience with 3D visualizations.
> **Parent Project**: /Users/joenash/github/bowling-buddy (40,801 lines of docs — research, spec, PRD, implementation plans for the analysis tool)

---

## What This Project Is

Roll Model is an **interactive 3D bowling encyclopedia** — a modern web experience where every bowling concept is paired with a manipulable 3D visualization. Left side: beautifully formatted educational content (chapters, sections). Right side: interactive 3D scenes (spinning bowling balls, lane cross-sections, pin action simulations, oil pattern visualizations) that respond to the content you're reading and controls you adjust.

Think: **the best bowling textbook that never existed, but interactive and in 3D.**

## Why It Exists

1. **Personal learning**: The creator is a new bowler who just got a custom-drilled ball. They want to deeply understand bowling science to accelerate improvement. Having this as a reference they can read on the go (at the bowling alley, between games) is immediately valuable.

2. **The content already exists**: 11,908 lines of deeply-researched, web-sourced bowling science covering biomechanics, equipment physics, lane conditions, strike mechanics, coaching pedagogy, and performance metrics. It just needs a delivery vehicle.

3. **Bowling concepts are inherently 3D**: Text descriptions of "axis tilt" or "ball motion phases" are genuinely hard to understand without seeing them. A 3D ball with a visible axis line and a slider from 0° to 90° creates instant understanding that no paragraph can match.

4. **Nothing like this exists**: Bowling instruction is stuck in YouTube videos (passive), text articles with 2D diagrams (hard to visualize), and in-person coaching (expensive). An interactive 3D encyclopedia doesn't exist anywhere for bowling.

5. **Community value**: Could become a free, open-source resource for the entire bowling community — 67.3 million annual bowlers in the US alone.

---

## The Vision — UX and Layout

### The Core Pattern: Documentation + 3D Split

```
+-------------------+------------------------------------------+
| CHAPTER NAV       |                                          |
| (collapsible)     |        3D SCENE (sticky)                 |
|                   |        React Three Fiber canvas           |
| The Basics        |                                          |
|   The Lane        |        [Interactive 3D visualization     |
|   The Pins        |         that matches current content]     |
|   Scoring         |                                          |
| The Ball          |        Controls:                          |
|   Coverstock      |        [Slider: Rev Rate 200-600 RPM]    |
|   Core Design     |        [Toggle: Show axis line]           |
|   RG & Diff       |        [Dropdown: Ball type]              |
| > The Release     |                                          |
|   ● Rev Rate   ← |                                          |
|     Axis Tilt     |                                          |
|     Axis Rotation |                                          |
| The Lane          |                                          |
|   Oil Patterns    |                                          |
+-------------------+------------------------------------------+
| CONTENT PANEL (scrollable, expandable)                       |
|                                                              |
| ## Rev Rate (Revolutions Per Minute)                         |
|                                                              |
| Rev rate measures how many times the bowling ball rotates    |
| per minute. Elite one-handers reach 400-550 RPM, while      |
| two-handers can hit 600+.                                    |
|                                                              |
| | Style     | Typical RPM | Hook Potential |                  |
| |-----------|-------------|----------------|                  |
| | Stroker   | 200-300     | Low-Medium     |                  |
| | Cranker   | 400-500+    | High           |                  |
| | Two-Hand  | 450-600+    | Very High      |                  |
+--------------------------------------------------------------+
```

### Key UX Principles

1. **The 3D scene is contextual** — it changes based on which chapter/section is active. Navigate to "Oil Patterns" → lane with colored oil overlay appears. Navigate to "The Approach" → stick figure walks through steps.

2. **The 3D scene is interactive** — orbit controls (rotate/zoom/pan), parameter sliders (rev rate, axis tilt, speed), toggles (show/hide axis line, show/hide trajectory). User can explore.

3. **Content reads like a book** — chapters and sections, clean typography, tables, callout boxes. Not a cluttered docs site — a beautiful reading experience.

4. **Mobile-friendly content** — 3D scenes hide on mobile, content stacks vertically. Learning still works without 3D, it's just enhanced by it.

5. **Dark theme default** — matches bowling alley ambient, looks modern, 3D scenes pop against dark backgrounds.

### Design References (from conversation)

The user shared these visual references:
- **dany.works GLB Viewer**: Left panel with controls/text, right panel with 3D model. Collapsible panels. Clean, minimal UI.
- **Emblemo/Playground**: Dark theme, sidebar navigation with collapsible sections. Modern minimal aesthetic.
- **thiings.co**: Grid of 3D objects, click to view detail with 3D model + description. Clean presentation.
- **thiings.co detail**: Large 3D model on left, text description on right. Simple, focused layout.

The first reference (GLB viewer with sidebar) is closest to what we want, but instead of technical GLB controls, the left panel has educational content and the 3D scene illustrates the concept.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 15 (App Router) | SSG for content pages, fast, React-based |
| **Styling** | Tailwind CSS + shadcn/ui | Consistent, fast to build, dark theme support |
| **3D Engine** | React Three Fiber (@react-three/fiber) | THE standard for 3D in React — declarative, composable |
| **3D Helpers** | @react-three/drei | OrbitControls, Stage, Environment, useGLTF, PresentationControls, Float, Text3D |
| **3D Controls** | Leva | GUI control panels (sliders, toggles, dropdowns) — like the GLB viewer screenshot |
| **3D Animation** | @react-spring/three | Smooth physics-based animations for 3D state changes |
| **3D Post-processing** | @react-three/postprocessing | Bloom, depth of field, ambient occlusion for polish |
| **Content** | MDX (next-mdx-remote or @next/mdx) | Markdown + embedded React components (3D scenes, sliders, callouts) |
| **Content Framework** | Fumadocs or Nextra (evaluate both) | Documentation structure, TOC generation, search, navigation |
| **Typography** | @tailwindcss/typography | Beautiful prose rendering for the content panels |
| **Icons** | Lucide React | Consistent iconography |
| **Deployment** | Vercel | Zero-config Next.js hosting, free tier |

### Why React Three Fiber

React Three Fiber (R3F) lets you write Three.js scenes as React components. This matters because:

```tsx
// A spinning bowling ball with adjustable rev rate — this is real R3F code
function BowlingBall({ rpm = 400, axisTilt = 15 }) {
  const meshRef = useRef()
  
  useFrame((_, delta) => {
    // Rotate based on RPM
    meshRef.current.rotation.z += (rpm / 60) * delta * Math.PI * 2
  })
  
  return (
    <mesh ref={meshRef} rotation={[0, 0, degreesToRadians(axisTilt)]}>
      <sphereGeometry args={[0.108, 64, 64]} /> {/* 8.5" diameter ball */}
      <meshStandardMaterial map={ballTexture} roughness={0.3} />
    </mesh>
  )
}

// Usage in a page
<Canvas>
  <Stage environment="studio" shadows>
    <BowlingBall rpm={revRateSlider} axisTilt={tiltSlider} />
  </Stage>
  <OrbitControls />
</Canvas>
```

It's declarative, reactive (props change → scene updates), and the ecosystem (@react-three/drei has 100+ ready-made helpers) is massive.

---

## Content Architecture

### Chapters and Sections

Map the research content to learning chapters. Each section gets a 3D scene.

#### Chapter 1: The Basics
| Section | Content Source | 3D Scene |
|---------|--------------|----------|
| The Lane | lane-science-and-oil-patterns.md §1 | Full 60ft lane with labeled markings (arrows, dots, boards, foul line) |
| The Pins | strike-physics-and-scoring-science.md §1 | 10-pin triangle arrangement, hover to see pin numbers |
| How Scoring Works | strike-physics-and-scoring-science.md §8 | Animated scorecard with strike/spare examples |
| Board Numbering | lane-science-and-oil-patterns.md §1.2 | Top-down lane view with numbered boards highlighted |

#### Chapter 2: The Ball
| Section | Content Source | 3D Scene |
|---------|--------------|----------|
| Coverstock Types | ball-physics-and-equipment-science.md §1 | Ball with toggleable surface material (glossy plastic → matte urethane → textured reactive) |
| Core Design | ball-physics-and-equipment-science.md §2 | Cutaway ball showing symmetric vs asymmetric core shapes |
| RG & Differential | ball-physics-and-equipment-science.md §3-4 | Animated ball showing mass distribution shifting with RG slider |
| Ball Motion: Skid-Hook-Roll | ball-physics-and-equipment-science.md §5 | Animated ball traveling lane with colored phases, speed/rev sliders |
| Surface Preparation | ball-physics-and-equipment-science.md §6 | Ball surface close-up, grit slider from 500 (rough) to polished |
| Weight & Drilling | ball-physics-and-equipment-science.md §7-8 | Ball with pin, CG, and mass bias markers visible |

#### Chapter 3: The Approach
| Section | Content Source | 3D Scene |
|---------|--------------|----------|
| Stance & Setup | biomechanics-and-form.md §6 | Figure at approach dots, ball held position |
| The 4-Step Approach | biomechanics-and-form.md §2 | Animated figure walking 4 steps with timing markers |
| The 5-Step Approach | biomechanics-and-form.md §2 | Same but 5-step with trigger step highlighted |
| Timing | biomechanics-and-form.md §2 | Split view: feet stepping + arm swinging, sync markers |
| Drift | biomechanics-and-form.md §2 | Top-down view showing lateral movement during approach |

#### Chapter 4: The Swing
| Section | Content Source | 3D Scene |
|---------|--------------|----------|
| The Pushaway | biomechanics-and-form.md §3 | Side view: ball pushed forward from body |
| The Backswing | biomechanics-and-form.md §3 | Side view: ball rises behind bowler, height slider |
| The Forward Swing | biomechanics-and-form.md §3 | Side view: ball accelerates forward |
| Free vs Muscled Swing | biomechanics-and-form.md §3 | Comparison: pendulum (correct) vs forced (incorrect) |
| Swing Plane | biomechanics-and-form.md §3 | Behind view: straight vs inside-out vs outside-in paths |

#### Chapter 5: The Release
| Section | Content Source | 3D Scene |
|---------|--------------|----------|
| Wrist Position | biomechanics-and-form.md §4 | Close-up hand/ball: cupped vs straight vs broken wrist |
| Rev Rate | performance-metrics-and-ml-classification.md §3 | Spinning ball, RPM slider, rotation speed changes |
| Axis Tilt | performance-metrics-and-ml-classification.md §4 | Ball with visible axis line, tilt slider 0°-90° |
| Axis Rotation | performance-metrics-and-ml-classification.md §4 | Ball with rotation direction arrow, rotation slider |
| One-Handed vs Two-Handed | biomechanics-and-form.md §1 | Side-by-side comparison of release mechanics |
| Follow-Through | biomechanics-and-form.md §5 | Hand position after release: handshake, suitcase, helicopter |

#### Chapter 6: Ball Motion Down the Lane
| Section | Content Source | 3D Scene |
|---------|--------------|----------|
| The Three Phases | ball-physics-and-equipment-science.md §5 | Full lane animation: skid (blue) → hook (yellow) → roll (green) |
| Speed & Rev Rate Interaction | strike-physics-and-scoring-science.md §4 | Dual sliders: speed + revs, watch breakpoint shift |
| Breakpoint | performance-metrics-and-ml-classification.md §6 | Bird's-eye lane with trajectory, breakpoint marked |
| Total Hook | performance-metrics-and-ml-classification.md §7 | Overlay of different hook amounts on lane |
| Loft | performance-metrics-and-ml-classification.md §5 | Side view: ball arcing from hand to lane contact |

#### Chapter 7: The Lane
| Section | Content Source | 3D Scene |
|---------|--------------|----------|
| Oil Pattern Basics | lane-science-and-oil-patterns.md §3 | Lane with oil shown as colored overlay, cross-section view |
| House Shot | lane-science-and-oil-patterns.md §4 | House pattern overlay with 10:1 ratio visible |
| PBA Patterns | lane-science-and-oil-patterns.md §5 | Dropdown to switch between all PBA animal patterns |
| Sport Shots | lane-science-and-oil-patterns.md §6 | Sport pattern overlay showing flat distribution |
| Lane Transition | lane-science-and-oil-patterns.md §7 | Time-lapse animation: oil breaking down over games |
| Lane Surfaces | lane-science-and-oil-patterns.md §9 | Toggle: wood lanes vs synthetic, texture difference |

#### Chapter 8: The Strike
| Section | Content Source | 3D Scene |
|---------|--------------|----------|
| The Pocket | strike-physics-and-scoring-science.md §2 | Overhead view: ball entering 1-3 pocket, angle line |
| Entry Angle | strike-physics-and-scoring-science.md §2 | Slider: 1°-8° entry angle, see ball path change |
| Pin Action | strike-physics-and-scoring-science.md §3 | Animated: ball hits pins, chain reaction, all 10 fall |
| Speed at the Pins | strike-physics-and-scoring-science.md §4 | Speed slider: too fast (pins fly but no carry) vs optimal |
| Common Pin Leaves | strike-physics-and-scoring-science.md §5 | Dropdown: flat 10, ringing 10, 7-10 split — see why each happens |
| The Perfect Game | strike-physics-and-scoring-science.md §6 | 12 consecutive strike animations, consistency visualization |

#### Chapter 9: Spares
| Section | Content Source | 3D Scene |
|---------|--------------|----------|
| Why Spares Matter | strike-physics-and-scoring-science.md §7 | Score impact visualization: +10 per converted spare |
| The 3-6-9 System | strike-physics-and-scoring-science.md §7 | Overhead lane: show move feet 3-6-9 boards for different pins |
| Corner Pin Spares | strike-physics-and-scoring-science.md §7 | Cross-lane angles for 7-pin and 10-pin |
| Split Conversions | strike-physics-and-scoring-science.md §5 | Difficult spare angles visualized |

#### Chapter 10: Equipment Strategy
| Section | Content Source | 3D Scene |
|---------|--------------|----------|
| Choosing Your First Ball | ball-physics-and-equipment-science.md §10 | Ball comparison: plastic vs reactive, see motion difference |
| Building an Arsenal | ball-physics-and-equipment-science.md §10 | 3-6 ball display: strong, medium, weak, spare |
| Matching Ball to Oil | ball-physics-and-equipment-science.md §10 | Oil pattern + ball selector: see how each ball reacts |
| Surface Adjustments | ball-physics-and-equipment-science.md §6 | Same ball, different grit: watch motion shape change |

#### Chapter 11: Reading the Lane
| Section | Content Source | 3D Scene |
|---------|--------------|----------|
| Rule of 31 | lane-science-and-oil-patterns.md §8 | Pattern length input → breakpoint board auto-calculated |
| Watching Ball Reaction | lane-science-and-oil-patterns.md §7 | Trajectory comparison: fresh lane vs transitioned |
| Making Adjustments | 08-coaching-pedagogy-and-feedback.md §3 | Animated: move feet, change target, adjust speed |

#### Chapter 12: Two-Handed Bowling
| Section | Content Source | 3D Scene |
|---------|--------------|----------|
| The Two-Handed Revolution | biomechanics-and-form.md §1 | Side-by-side: one-hand vs two-hand approach |
| Grip & Release | biomechanics-and-form.md §1, §4 | Close-up: two-handed grip, support hand release |
| Extra Rev Rate & Rotation | biomechanics-and-form.md §1 | Comparison: 350 RPM (one-hand) vs 550 RPM (two-hand) spinning |
| Body Mechanics | biomechanics-and-form.md §1, §6 | Spine tilt comparison: 30° (one-hand) vs 80° (two-hand) |

---

## 3D Assets Plan

### Models to Create / Source

| Asset | Complexity | Approach | Notes |
|-------|-----------|----------|-------|
| **Bowling Ball** | Simple | Procedural (sphere + material) | Just a sphere with configurable color/texture. Add logo decal. |
| **Bowling Pin** | Simple | GLB from Sketchfab or procedural | Classic pin shape. Need 10 instances with physics for pin action. |
| **Lane Surface** | Medium | Procedural (plane + texture) | Textured rectangle with painted markings (arrows, dots, foul line). 60ft × 41.5in proportions. |
| **Lane Markings** | Simple | Decals or geometry on lane | Arrows at 15ft, dots at 7.5ft, foul line. Could be painted texture or separate meshes. |
| **Oil Pattern Overlay** | Medium | Shader/material | Semi-transparent colored overlay on lane surface. Adjustable per pattern. |
| **Pin Deck** | Medium | 10 pin instances + positions | Triangle arrangement with correct 12" spacing. Need collision for pin action sim. |
| **Bowler Figure** | Hard | Mixamo skeleton OR simple stick figure | Full body is hard. Stick figure with joints might be better pedagogically — shows keypoints clearly. |
| **Hand/Wrist** | Medium | GLB from Sketchfab | For release mechanics close-ups. Need wrist articulation. |
| **Approach Area** | Simple | Extension of lane geometry | The area behind foul line with dots. |
| **Ball Core (cutaway)** | Medium | Custom Blender model or procedural | Cross-section showing symmetric vs asymmetric core. Cool visual. |
| **Gutter** | Simple | Geometry alongside lane | Two channels beside the lane. |
| **Ball Return** | Optional | GLB | Nice-to-have for context, not essential. |

### Sources for Free 3D Models
- **Sketchfab**: Search "bowling ball", "bowling pin", "bowling lane" — many free CC-licensed models
- **thiings.co**: 10,000+ free 3D models (from the user's screenshot)
- **Poly Pizza / Google Poly archive**: Simple low-poly bowling assets
- **Blender**: Create custom models (ball core cutaway, lane with markings)
- **Procedural in Three.js**: Sphere (ball), cylinder (pin body), plane (lane) — most bowling geometry is simple

### Asset Pipeline
1. Source or create GLB files
2. Optimize with gltf-transform (reduce poly count, compress textures)
3. Store in /assets/models/
4. Load with useGLTF from @react-three/drei
5. Keep total asset size under 5-10 MB for fast page loads

---

## Research Needed Before Building

The following research should be done in the first session (deep-research style, comprehensive):

### 1. React Three Fiber Ecosystem
- How R3F works (Canvas, useFrame, useThree, mesh, materials)
- @react-three/drei components most useful for this project
- Performance optimization (instancing, LOD, lazy loading scenes)
- Examples of R3F + documentation sites

### 2. Interactive Documentation Frameworks
- **Fumadocs** vs **Nextra** vs **Docusaurus** vs custom MDX — which best supports embedded 3D?
- MDX setup in Next.js 15 (App Router) — current best practice
- Sidebar navigation patterns
- Search integration
- Content organization with frontmatter

### 3. GLB/glTF Workflow
- Creating models in Blender → exporting GLB
- Optimizing GLB files for web (gltf-transform, Draco compression)
- Loading GLB in R3F (useGLTF, Suspense, preloading)
- Procedural geometry in Three.js vs pre-made GLB tradeoffs

### 4. 3D Animation Patterns
- useFrame for continuous animation (spinning, orbiting)
- @react-spring/three for state transitions (morph between scenes)
- Scroll-linked animation (scrollytelling — 3D changes as you scroll content)
- GSAP + Three.js for timeline-based animation

### 5. 3D Physics for Pin Action
- @react-three/rapier (physics engine for R3F) or cannon-es
- Can we simulate realistic pin scatter?
- How heavy is physics computation in the browser?

### 6. Available Bowling 3D Models
- Search Sketchfab, Poly Pizza, thiings.co for bowling assets
- Evaluate quality, file size, licensing
- Identify what needs to be custom-built

### 7. Design References — Modern Interactive Knowledge Sites
- Websites that combine content + 3D well
- Three.js showcase examples
- Interactive textbook / encyclopedia examples
- Dark theme documentation sites with visual flair

---

## Project Structure

```
roll-model/
├── .claude/
│   └── CLAUDE.md              # Project instructions for Claude Code
├── docs/
│   ├── research/              # Copied from bowling-buddy (11,908 lines)
│   ├── specs/                 # Spec for this project (to be created)
│   ├── plans/                 # Implementation plan (to be created)
│   └── reference/             # Design references, screenshots
├── content/                   # MDX content files (chapters/sections)
│   ├── 01-the-basics/
│   │   ├── the-lane.mdx
│   │   ├── the-pins.mdx
│   │   └── scoring.mdx
│   ├── 02-the-ball/
│   │   ├── coverstock.mdx
│   │   ├── core-design.mdx
│   │   └── rg-and-differential.mdx
│   ├── ... (all chapters)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Landing page
│   │   └── learn/
│   │       └── [...slug]/
│   │           └── page.tsx   # Dynamic content pages
│   ├── components/
│   │   ├── layout/            # Shell, sidebar, navigation
│   │   ├── content/           # MDX rendering, callouts, tables
│   │   ├── 3d/                # All React Three Fiber components
│   │   │   ├── BowlingBall.tsx
│   │   │   ├── BowlingLane.tsx
│   │   │   ├── PinDeck.tsx
│   │   │   ├── OilPattern.tsx
│   │   │   ├── BowlerFigure.tsx
│   │   │   ├── BallMotion.tsx
│   │   │   ├── PinAction.tsx
│   │   │   └── scenes/        # Composed scenes per chapter
│   │   │       ├── RevRateScene.tsx
│   │   │       ├── AxisTiltScene.tsx
│   │   │       ├── OilPatternScene.tsx
│   │   │       ├── StrikeScene.tsx
│   │   │       └── ...
│   │   └── ui/                # shadcn + custom UI components
│   ├── lib/                   # Utilities, content loading
│   └── styles/                # Global styles
├── assets/
│   ├── models/                # GLB files
│   ├── textures/              # Ball textures, lane textures
│   └── hdri/                  # Environment maps for 3D lighting
├── public/                    # Static assets
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Implementation Approach

### Phase 1: Foundation + Proof of Concept (1-2 sessions)
1. Initialize Next.js + Tailwind + shadcn project
2. Set up React Three Fiber with a basic spinning bowling ball
3. Set up MDX content pipeline (one test chapter)
4. Build the split layout (sidebar nav + content panel + 3D canvas)
5. Wire one complete section end-to-end: "Rev Rate" with spinning ball + RPM slider

**If this single section feels right, scale to all chapters.**

### Phase 2: Content + 3D Scenes (3-5 sessions)
1. Write all MDX content (transform research into learning-friendly prose)
2. Build all 3D scene components (one per section)
3. Add interactive controls (Leva sliders, toggles)
4. Add navigation between chapters/sections
5. 3D scene swaps when navigating

### Phase 3: Polish (1-2 sessions)
1. Animations and transitions between scenes
2. Dark theme refinement
3. Search functionality
4. Mobile responsive (content only, hide 3D)
5. Performance optimization (lazy load 3D scenes)
6. Deploy to Vercel

### Total: ~5-9 sessions to a complete, deployable knowledge site

---

## Content Source Mapping

All content comes from the research docs in /docs/research/. Here's where each chapter pulls from:

| Chapter | Primary Source | Lines |
|---------|---------------|-------|
| The Basics | lane-science-and-oil-patterns.md + strike-physics-and-scoring-science.md | ~200 |
| The Ball | ball-physics-and-equipment-science.md | 673 |
| The Approach | biomechanics-and-form.md §2, §6 | ~150 |
| The Swing | biomechanics-and-form.md §3 | ~100 |
| The Release | biomechanics-and-form.md §4-5 + performance-metrics-and-ml-classification.md §3-4 | ~200 |
| Ball Motion | ball-physics-and-equipment-science.md §5 + performance-metrics-and-ml-classification.md §5-8 | ~200 |
| The Lane | lane-science-and-oil-patterns.md | 743 |
| The Strike | strike-physics-and-scoring-science.md §1-6 | ~400 |
| Spares | strike-physics-and-scoring-science.md §7 | ~100 |
| Equipment Strategy | ball-physics-and-equipment-science.md §10 | ~100 |
| Reading the Lane | lane-science-and-oil-patterns.md §7-8 | ~150 |
| Two-Handed | biomechanics-and-form.md §1 | ~100 |

The content transformation is: research doc (dense, citation-heavy) → MDX (conversational, learner-friendly, with embedded 3D component references).

---

## Key Decision: Content Framework

Evaluate these options early:

| Option | Pros | Cons |
|--------|------|------|
| **Fumadocs** | Built for docs, great sidebar/TOC/search, MDX-native, actively maintained | May be opinionated about layout |
| **Nextra** | By Vercel, Next.js-native, MDX, great for docs | Fewer customization options for 3D split |
| **Custom MDX** | Full control over layout, no framework constraints | More work for navigation, search, TOC |
| **Contentlayer** | Type-safe MDX, great DX | Less maintained recently |

Recommendation: Start with **custom MDX setup** (next-mdx-remote) for maximum layout flexibility, especially for the unique 3D split panel. Add Fumadocs if you want built-in search/TOC later.

---

## Relationship to Bowling Buddy

Roll Model is a **companion project**, not a replacement for Bowling Buddy.

- **Bowling Buddy**: Video analysis tool (film yourself → ML pipeline → coaching feedback). Complex backend, ML models, video processing.
- **Roll Model**: Interactive knowledge site (read about bowling science → 3D visualizations). Static content, no backend, purely frontend.

Future integration: Bowling Buddy's coaching feedback can deep-link to Roll Model: "Your axis tilt is 12° — [Learn about axis tilt →](https://roll-model.vercel.app/learn/the-release/axis-tilt)"

---

## First Prompt for Fresh Claude Code Session

When opening a fresh Claude Code session in the /Users/joenash/github/roll-model directory, use this prompt to kick things off:

```
Read docs/SESSION-KICKOFF.md — this is the complete project brief for Roll Model, 
an interactive 3D bowling knowledge site. It contains:
- The full vision and UX pattern
- Tech stack (Next.js + React Three Fiber + MDX)
- Content architecture (12 chapters mapped to research docs)
- 3D scene assignments per section
- Asset plan
- Project structure
- Implementation approach

All the bowling science content is in docs/research/ (11,908 lines across 8 files).

Phase 1: Do deep research on React Three Fiber, MDX in Next.js 15, interactive 
documentation patterns, and available bowling 3D assets. Then build the foundation:
Next.js + R3F + MDX pipeline + the split layout + one complete section ("Rev Rate" 
with spinning ball and RPM slider) as proof of concept.
```
