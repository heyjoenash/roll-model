# Roll Model — Architecture Specification

> **Status**: CANONICAL
> **Last Updated**: 2026-04-11
> **Phase**: 1 complete, Phase 2 in progress

---

## Overview

Roll Model is an interactive 3D bowling encyclopedia built with Next.js 15 + React Three Fiber + MDX. Educational content (left panel) is paired with manipulable 3D visualizations (right panel). The content drives the 3D scene — inline SceneCue buttons change what the 3D shows as the user reads.

## Tech Stack

| Layer | Package | Version | Purpose |
|-------|---------|---------|---------|
| Framework | `next` | 16.2.2 | App Router, SSG, Turbopack dev |
| React | `react` / `react-dom` | 19.2.4 | UI framework |
| Styling | `tailwindcss` | 4.x | Utility-first CSS |
| UI Components | `shadcn` | 4.1.2 | Button, ScrollArea, Separator, Tooltip |
| Typography | `@tailwindcss/typography` | 0.5.19 | Prose rendering in content panel |
| 3D Engine | `three` | 0.183.2 | WebGL rendering |
| 3D React | `@react-three/fiber` | 9.0.0-rc.10 | Declarative Three.js in React |
| 3D Helpers | `@react-three/drei` | 10.7.7 | OrbitControls, Environment, Lightformer, ContactShadows, Float, PerformanceMonitor, Line |
| 3D Post-processing | `@react-three/postprocessing` | 3.0.4 | N8AO, Bloom, Vignette, ToneMapping, SMAA |
| 3D Animation | `@react-spring/three` | 10.0.3 | Spring-based 3D animations (available, not yet used) |
| 3D Controls UI | `leva` | 0.10.1 | Runtime parameter sliders/toggles |
| Content | `next-mdx-remote-client` | 2.1.10 | Server-side MDX rendering |
| Content (alt) | `@next/mdx` + `@mdx-js/loader` | 3.1.1 | MDX page support |
| Markdown | `remark-gfm` | 4.0.1 | GitHub-flavored markdown (tables) |
| Layout | `react-resizable-panels` | 4.9.0 | Draggable content/3D split |
| Icons | `lucide-react` | 1.7.0 | Icon library |
| Utilities | `clsx` + `tailwind-merge` | via `cn()` | Conditional class merging |

## Project Structure

```
roll-model/
├── .claude/
│   └── CLAUDE.md                    # AI assistant instructions
├── content/
│   └── the-release/
│       └── rev-rate.mdx             # First content section (Phase 1)
├── docs/
│   ├── SESSION-KICKOFF.md           # Original project brief & vision
│   ├── specs/                       # Technical specifications
│   │   ├── 00-INDEX.md
│   │   ├── 01-ARCHITECTURE.md       # (this file)
│   │   ├── 02-LAYOUT-AND-SCENE-CUES.md
│   │   ├── 03-3D-ARTIST-BRIEF.md
│   │   ├── 04-3D-RENDERING.md
│   │   ├── 05-CONTENT-ARCHITECTURE.md
│   │   └── 06-DEPLOYMENT-CICD.md
│   ├── plans/                       # Implementation plans
│   └── research/                    # 11,908 lines of bowling science
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout (dark theme, fonts)
│   │   ├── page.tsx                 # Landing page with CTA
│   │   ├── globals.css              # Tailwind + shadcn theme vars
│   │   └── learn/
│   │       ├── layout.tsx           # SceneProvider + Sidebar + ResizableLayout
│   │       ├── page.tsx             # /learn index page
│   │       └── [...slug]/
│   │           ├── page.tsx         # Dynamic MDX content renderer (RSC)
│   │           └── scene-setter.tsx # Sets activeScene on mount
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── bowling-ball.tsx     # Hero 3D asset — procedural ball with clearcoat
│   │   │   ├── scene-lighting.tsx   # Lightformer Environment + dynamic accent light
│   │   │   ├── post-processing.tsx  # N8AO + Bloom + Vignette + ToneMapping + SMAA
│   │   │   └── scenes/
│   │   │       ├── rev-rate-scene.tsx   # Rev rate visualization with Leva controls
│   │   │       └── default-scene.tsx    # Fallback scene
│   │   ├── content/
│   │   │   ├── mdx-components.tsx   # Custom MDX component map (headings, tables, etc.)
│   │   │   ├── scene-cue.tsx        # Inline button that controls 3D from content
│   │   │   └── callout.tsx          # Styled info/tip/warning boxes
│   │   ├── layout/
│   │   │   ├── resizable-layout.tsx # react-resizable-panels with Read/Split/Explore
│   │   │   ├── layout-toggle.tsx    # Read/Split/Explore mode switcher
│   │   │   ├── scene-canvas.tsx     # R3F Canvas + Leva + PostProcessing + PerfMonitor
│   │   │   ├── scene-container.tsx  # SSR-safe dynamic import wrapper
│   │   │   ├── scene-switcher.tsx   # Routes activeScene to scene component
│   │   │   └── sidebar.tsx          # Chapter navigation (desktop + mobile drawer)
│   │   └── ui/                      # shadcn primitives
│   └── lib/
│       ├── constants.ts             # Bowling ball dimensions, RPM ranges
│       ├── content-map.ts           # Chapter/section registry, content→scene mapping
│       ├── scene-context.tsx         # React Context for 3D scene state
│       └── utils.ts                 # cn(), degreesToRadians(), rpmToRadsPerSecond()
├── assets/
│   ├── hdri/                        # (empty — using Lightformer environment instead)
│   ├── models/                      # (empty — procedural geometry for now)
│   └── textures/                    # (empty — future ball textures)
├── public/
│   └── hdri/                        # (empty)
├── next.config.ts                   # MDX + transpilePackages config
├── mdx-components.tsx               # Global MDX component registration
├── components.json                  # shadcn configuration
├── package.json
└── tsconfig.json
```

## Data Flow

### Content → 3D Scene Communication

```
1. User navigates to /learn/the-release/rev-rate
2. [...slug]/page.tsx (RSC) reads content-map → finds scene="rev-rate"
3. SceneSetter (client) calls setActiveScene("rev-rate") on mount
4. SceneSwitcher reads activeScene → renders <RevRateScene />
5. RevRateScene initializes Leva controls (RPM, showAxis, ballColor)

6. User clicks <SceneCue params={{ rpm: 600, ballColor: "#ef4444" }}> in MDX
7. SceneCue calls setSceneParams({ rpm: 600, ballColor: "#ef4444", _t: Date.now() })
8. RevRateScene's useEffect detects sceneParams change → calls Leva set()
9. Leva updates → BowlingBall re-renders with new RPM/color
10. SceneLighting receives new accentColor → lerps accent light over ~2 seconds
```

### Component Hierarchy (Learn Pages)

```
RootLayout (dark theme, fonts)
└── LearnLayout
    ├── SceneProvider (React Context)
    │   ├── Sidebar / MobileSidebar
    │   └── ResizableLayout
    │       ├── Panel (content)
    │       │   └── [...slug]/page.tsx (RSC)
    │       │       ├── SceneSetter (sets activeScene)
    │       │       └── MDXRemote
    │       │           ├── <h1>, <h2>, <p>, <table> (styled)
    │       │           ├── <Callout> (info boxes)
    │       │           └── <SceneCue> (3D control buttons)
    │       └── Panel (3D scene)
    │           └── SceneContainer (dynamic, ssr: false)
    │               └── SceneCanvas
    │                   ├── Leva (control panel overlay)
    │                   └── Canvas (R3F)
    │                       ├── PerformanceMonitor
    │                       │   ├── SceneSwitcher
    │                       │   │   └── RevRateScene / DefaultScene
    │                       │   │       ├── SceneLighting (Environment + Lightformers)
    │                       │   │       ├── BowlingBall (Float + clearcoat sphere)
    │                       │   │       ├── ContactShadows
    │                       │   │       └── OrbitControls
    │                       │   └── PostProcessing
    │                       │       ├── N8AO
    │                       │       ├── Bloom
    │                       │       ├── Vignette
    │                       │       ├── ToneMapping (AgX)
    │                       │       └── SMAA
```

## Responsive Breakpoints

| Breakpoint | Layout | 3D Scene |
|------------|--------|----------|
| `lg` (1024px+) | Sidebar + resizable content/3D split | Full interactive, Leva controls |
| `md` (768-1023px) | 3D stacked above (35vh), content below | Visible but non-resizable |
| `sm` (<768px) | Content only, mobile sidebar drawer | Hidden |

## Key Architectural Decisions

1. **Custom MDX over Fumadocs/Nextra** — Maximum layout flexibility for the unique content+3D split. The 3D panel integration doesn't fit documentation framework assumptions.

2. **Lightformer Environment over HDRI files** — Previous attempts with `<Environment preset="...">` caused instability due to CDN fetches. Lightformer-based environments are fully self-contained (zero network requests) and render procedurally into an internal cube camera.

3. **SceneContext as bridge** — Keeps content (RSC) and 3D (client) decoupled. Content sets params via context; scenes read params and sync to Leva. Neither knows about the other's implementation.

4. **Leva as 3D source of truth** — Leva controls own the runtime parameter values. SceneCues push values into Leva via its `set()` API. This means users can always manually override via the control panel.

5. **Procedural geometry over GLB models (Phase 1)** — The bowling ball is a sphere with cylinders for finger holes. Good enough for the proof of concept. GLB upgrade path is documented in `03-3D-ARTIST-BRIEF.md`.

6. **SSR: false for all 3D** — Three.js requires `window`/`document`. SceneContainer uses Next.js `dynamic(() => import(...), { ssr: false })` to isolate the entire 3D tree.

7. **Dark theme default** — Hardcoded `className="dark"` on `<html>`. 3D scenes look dramatically better against dark backgrounds. Canvas background is `#09090b`.

## Dev Server

```bash
npm run dev          # Starts on port 6200 (configured in package.json)
npm run build        # Production build
npm run start        # Production server on port 6200
```

**Port 6200 is required** — never use another port. If port 6200 is occupied, kill the existing process with `lsof -ti :6200 | xargs kill` before starting.
