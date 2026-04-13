# Roll Model — Current Status

> **Last Updated**: 2026-04-13
> **Purpose**: The single source of truth for "where are we right now?" Updated at the end of each session. If you're starting a new session, read this first.

---

## TL;DR

**Phase**: Pre-launch / asset foundation
**Milestone**: M0 complete (Foundation), M1 in progress (Asset Foundation)
**Live**: roll-model.vercel.app
**Repo**: github.com/heyjoenash/roll-model
**Content sections shipped**: 1 of 53 (Rev Rate)
**Total sessions to v1.0**: 34 (6 READY, 28 STUB) — see [`docs/handoffs/00-MASTER-ROADMAP.md`](handoffs/00-MASTER-ROADMAP.md) for the complete list
**Next session**: Either (a) Content Batch 1 via handoff 01, or (b) Lane Asset via handoff 02

---

## What's Done (Cumulative)

### Infrastructure
- ✅ GitHub repo (public, MIT licensed)
- ✅ Vercel project linked, auto-deploys from main branch
- ✅ GitHub Actions CI (lint + type check + build on push/PR)
- ✅ Next.js 16 + Turbopack dev server on port 6200
- ✅ TypeScript strict mode, zero errors
- ✅ Tailwind CSS 4 + shadcn/ui dark theme

### 3D Rendering Pipeline
- ✅ MeshPhysicalMaterial with clearcoat for the bowling ball
- ✅ Lightformer-based Environment (5-light studio rig, no CDN dependency)
- ✅ Post-processing stack: N8AO + Bloom + Vignette + AgX ToneMapping + SMAA
- ✅ ContactShadows for object grounding
- ✅ Dynamic accent lighting that lerps to match content state
- ✅ PerformanceMonitor with adaptive DPR (caps at 2x, drops to 1x on weak GPUs)
- ✅ Float wrapper for organic ball motion
- ✅ Camera: 45° FOV, OrbitControls with polar limits

### Layout System
- ✅ Resizable split panels (react-resizable-panels)
- ✅ Read / Split / Explore mode toggle
- ✅ Responsive: lg = resizable, md = stacked, sm = content only
- ✅ Sidebar with chapter navigation, collapsible
- ✅ Mobile drawer sidebar

### Content System
- ✅ MDX pipeline (next-mdx-remote-client + remark-gfm)
- ✅ Custom MDX components: `<Callout>` (4 variants), `<SceneCue>` (interactive)
- ✅ Dynamic route `/learn/[...slug]` with static generation
- ✅ Content map registry (`src/lib/content-map.ts`)
- ✅ SceneContext for cross-component scene state

### 3D Assets Built
- ✅ **Ball** — premium clearcoat sphere, finger holes, equator stripe, pin dot, axis line, spin animation, Float motion
- ✅ **Pins** — 16-point USBC profile lathe geometry, 10-pin equilateral triangle, per-pin highlight/dim/hidden controls

### Scene Components Built
- ✅ `rev-rate-scene.tsx` — production scene for the Rev Rate page
- ✅ `default-scene.tsx` — fallback when scene name doesn't match
- ✅ `prototype-scene.tsx` — dev sandbox at `/learn/prototypes`

### Content Sections Written
- ✅ **Rev Rate** (Ch 5.2) — `content/the-release/rev-rate.mdx`, 105 lines
- ✅ **Prototype Sandbox** (dev only, not production content)

### Documentation
- ✅ 14 spec docs in `docs/specs/` (~7,800 lines)
- ✅ README.md and LICENSE at project root
- ✅ This STATUS.md
- ✅ Glossary at `docs/GLOSSARY.md`
- ✅ Original SESSION-KICKOFF.md preserved as vision reference
- ✅ 8 research files preserved at `docs/research/` (11,908 lines, untouched)

---

## What's In Progress

Nothing currently in progress. Last session ended at a clean state.

---

## What's Next (Next 3 Sessions)

### Session A: Content Batch 1 — RUNNING
- **Handoff doc**: `docs/handoffs/01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md` ⭐
- **Goal**: Write 5 MDX content sections in the "Custom Ball Owner Cluster"
- **Sections**: Coverstock Types, RG & Differential, Surface Preparation, Axis Tilt, Axis Rotation
- **Status**: Currently running in another session window
- **Outcome on completion**: Site goes from 1 → 6 content sections (~12% complete)

### Session B: Lane Asset Build — READY (parallel-safe with Session A)
- **Handoff doc**: `docs/handoffs/02-LANE-ASSET-BUILD.md` ⭐
- **Goal**: Build the reusable Lane component (textured plane, markings, zones, highlights)
- **Why next**: Unlocks ~22 future scenes. Highest-leverage asset. Different files than Session A — no conflict.
- **Effort**: 4-6 focused hours
- **How to start**: Open a fresh Claude Code session and paste the master prompt from Part 8 of the handoff doc

### Session C: Oil Pattern Data — READY (parallel-safe with A and B)
- **Handoff doc**: `docs/handoffs/03-OIL-PATTERN-DATA.md` ⭐
- **Goal**: Build oil pattern data library (TypeScript, 11 named patterns)
- **Why next**: Half-session. Unblocks Lane's oil overlay. Pure data, low risk.
- **Effort**: 1.5-2 hours

### Other ready handoffs

- **Session D**: Scene Building Chapter 2 — `docs/handoffs/04-SCENE-BUILDING-CHAPTER-2.md` (depends on Session A finishing)
- **Session E**: Figure (Bowler) Asset Build — `docs/handoffs/05-FIGURE-ASSET-BUILD.md` (independent)
- **Session F**: Content Batch 2 — Foundation Cluster — `docs/handoffs/06-CONTENT-BATCH-2-FOUNDATION.md` (depends on Lane + Pins)

See `docs/handoffs/README.md` for the full handoff index, parallel-safety matrix, and recommended execution order.

### Session B: Lane Asset Build
- **Handoff doc**: `docs/specs/10-SESSION-LANE-ASSET.md`
- **Goal**: Build the reusable `<Lane>` component (Option A: textured plane with procedural markings)
- **Why this second**: Unlocks ~22 future scene components across Chapters 1, 6, 7, 8, 9, 11. The single highest-leverage asset.
- **Outcome**: Lane asset shipped, prototype sandbox shows ball + pins + lane together
- **Estimated effort**: 1 focused session (~4-6 hours)

### Session C: Oil Pattern Data
- **Handoff doc**: `docs/specs/12-SESSION-OIL-DATA.md`
- **Goal**: Build the oil pattern data library (`src/lib/oil-patterns.ts`)
- **Why this third**: Half-session. Unblocks Lane's oil overlay rendering and all Chapter 7 scenes. Pure data, no 3D risk.
- **Outcome**: 11 named patterns (house shot + 10 PBA animals) defined with shape data and helpers
- **Estimated effort**: Half session (~2 hours)

After these three: Figure asset (session 11), then alternating content batches and scene-building per chapter.

---

## Blockers

None. The project is unblocked and ready to advance. Each upcoming session is independent of the others (within the recommended order).

---

## Recent Activity (Last 5 Commits)

```
a483abc  docs: README, LICENSE, and session handoffs for all upcoming session types
23ae8b0  docs: expand content batching handoff to comprehensive v2 briefing
73634ca  feat: pins asset + prototype sandbox at /learn/prototypes
dbeb908  docs: interaction blueprints, content handoff, asset architecture
4bdd2ab  feat: premium 3D visual fidelity + comprehensive spec documentation
```

---

## Build / Deploy State

| System | State | URL |
|--------|-------|-----|
| Local dev server | Currently running on port 6200 | http://localhost:6200 |
| GitHub | main branch up to date | https://github.com/heyjoenash/roll-model |
| Vercel production | Auto-deploys from main | https://roll-model.vercel.app |
| Last build | ✅ Successful | TypeScript clean, all routes generate |
| Test suite | None yet (deferred — see PRD) | — |

---

## Quick Health Check Commands

Run these to verify the project is in a healthy state before starting a session:

```bash
# Server alive on port 6200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:6200

# Type check clean
npx tsc --noEmit

# Production build clean
npm run build

# Content map current
cat src/lib/content-map.ts | grep -c '":'
# Should equal: number of content entries currently registered (currently 2: rev-rate + prototypes)

# Spec docs count
ls docs/specs/*.md | wc -l
# Should equal: 14 (00 through 14 at the time of this writing)

# Session handoff docs available
ls docs/specs/[01][0-9]*.md docs/specs/08-*.md
```

---

## How to Update This File

At the end of each session, the session itself should update STATUS.md to reflect:
1. Move completed work from "In Progress" or "What's Next" to "What's Done"
2. Update the "Phase" and "Milestone" lines if they shifted
3. Update the "Next 3 Sessions" if priorities reordered
4. Add the new commits to "Recent Activity"
5. Update the "Last Updated" date at the top
6. Update the doc count in "Quick Health Check Commands" if specs were added

This file IS the project's running state. Keep it accurate and it removes the need for any session to read 13 spec files just to figure out where things stand.

---

## Project Context Quick Reference

For a fresh session that needs a 30-second orientation:

| Question | Answer |
|----------|--------|
| What is this project? | Interactive 3D bowling encyclopedia, 53 content sections paired with 3D scenes |
| Who is it for? | New custom-ball owner ("Joe") — see PRD Persona section |
| What's the tech stack? | Next.js 15 + R3F 9 + MDX + Tailwind, deployed to Vercel |
| What port does the dev server run on? | 6200, ALWAYS |
| What's the spec index? | `docs/specs/00-INDEX.md` |
| What's the PRD? | `docs/specs/14-PRD.md` |
| Where are the dedicated handoffs? | `docs/handoffs/` (start with `01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md`) |
| What's the voice reference for content? | `content/the-release/rev-rate.mdx` |
| How do I write content? | Read `docs/handoffs/01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md` (specific) or `docs/specs/08-CONTENT-BATCHING-HANDOFF.md` (generic) |
| How do I build an asset? | Read the matching session handoff doc in `docs/specs/` (10, 11, or 12) |
| How do I build scenes? | Read `docs/specs/13-SESSION-SCENE-BUILDING.md` |
| Where do bowling terms live? | `docs/GLOSSARY.md` |
