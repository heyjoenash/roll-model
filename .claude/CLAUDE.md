# Roll Model — Interactive 3D Bowling Knowledge Site

## Project Overview
Roll Model is an interactive 3D bowling encyclopedia built with Next.js 15 + React Three Fiber + MDX. Each bowling concept is paired with a manipulable 3D visualization. Left panel: educational content. Right panel: interactive 3D scene.

**Read `docs/SESSION-KICKOFF.md` first** — it contains the complete project brief, vision, tech stack, content architecture, and implementation approach.

## Critical Rules
- Always make sure to test and check the local server is running when we need to relaunch the server before having me check recent changes
- **NEVER add keyboard shortcuts to the application** — all interactions should be mouse/touch based
- Always read every line of every file you plan to modify before editing
- This is a depth-over-speed project — comprehensive, not rushed

## Tech Stack
- **Framework**: Next.js 15 (App Router), TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **3D**: React Three Fiber + @react-three/drei + @react-three/postprocessing
- **Content**: MDX (next-mdx-remote or @next/mdx)
- **Animation**: @react-spring/three
- **Controls**: Leva (3D parameter controls)
- **Deployment**: Vercel

## Key Directories
- `docs/research/` — 11,908 lines of bowling science research (source content)
- `docs/SESSION-KICKOFF.md` — Complete project brief and implementation plan
- `content/` — MDX content files organized by chapter
- `src/components/3d/` — React Three Fiber scene components
- `src/components/3d/scenes/` — Composed scenes per content section
- `assets/models/` — GLB 3D model files

## Content Source
All educational content is derived from the research docs in `docs/research/`. Transform from dense research format to conversational, learner-friendly MDX. Every fact should be accurate to the research but written for someone learning bowling, not a researcher.

## 3D Scene Pattern
Every content section maps to a 3D scene. The scene should:
1. Illustrate the concept being discussed
2. Be interactive (orbit controls, parameter sliders)
3. Respond to user input (e.g., RPM slider changes ball spin speed)
4. Be contextual (changes when navigating between sections)

## Dark Theme
Default to dark theme. 3D scenes look better against dark backgrounds and match bowling alley ambient.
