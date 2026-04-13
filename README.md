# Roll Model

Interactive 3D bowling encyclopedia. Every bowling concept paired with a manipulable 3D visualization. Left panel: educational content. Right panel: spinning balls, oil patterns, pin action, bowler figures — all reacting to what you read.

**Live**: [roll-model.vercel.app](https://roll-model.vercel.app)

**Tech**: Next.js 15 (App Router) · React 19 · React Three Fiber 9 · MDX · Tailwind CSS · Vercel

---

## Quick Start

```bash
# Install
npm install

# Dev server (always port 6200)
npm run dev

# Production build
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

If port 6200 is occupied:

```bash
lsof -ti :6200 | xargs kill
npm run dev
```

**Never use `pkill -f "next dev"`** — it kills all Next.js servers on the machine, not just this one.

---

## Project Structure

```
roll-model/
├── content/                    # MDX content files (chapter/section .mdx)
│   ├── the-release/
│   │   └── rev-rate.mdx        # The production reference section
│   └── prototypes.mdx          # Dev sandbox
├── docs/
│   ├── SESSION-KICKOFF.md      # Original project brief
│   ├── research/               # 11,908 lines of bowling science source material
│   ├── specs/                  # Technical specifications (read 00-INDEX.md first)
│   ├── plans/                  # Implementation plans
│   └── reference/              # Historical reference material
├── src/
│   ├── app/                    # Next.js App Router
│   │   └── learn/[...slug]/    # Dynamic MDX content renderer
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── bowling-ball.tsx           # Hero ball asset (clearcoat + spin)
│   │   │   ├── scene-lighting.tsx         # Lightformer studio environment
│   │   │   ├── post-processing.tsx        # N8AO + Bloom + AgX tone mapping
│   │   │   ├── assets/
│   │   │   │   └── pins/                  # Pin deck (lathe geometry)
│   │   │   └── scenes/                    # Per-section scene components
│   │   ├── content/            # MDX custom components (Callout, SceneCue)
│   │   └── layout/             # Resizable panels, sidebar, scene canvas
│   └── lib/
│       ├── content-map.ts      # Chapter/section registry
│       ├── scene-context.tsx   # React Context for 3D scene state
│       └── constants.ts        # Bowling ball dimensions, RPM ranges
├── assets/                     # GLB models, HDRI, textures (currently empty — procedural)
└── public/                     # Static assets
```

---

## Documentation

**If you're starting a new session, read these in order:**

1. **[docs/STATUS.md](docs/STATUS.md)** — Current state dashboard. What's done, what's next, what's blocking.
2. **[docs/specs/14-PRD.md](docs/specs/14-PRD.md)** — The product requirements doc. Vision, personas, requirements, milestones, definition of done. Every session works toward something in here.
3. **[docs/handoffs/README.md](docs/handoffs/README.md)** — The dedicated session handoffs folder. Pick the next handoff and follow its master prompt.
4. **[docs/specs/00-INDEX.md](docs/specs/00-INDEX.md)** — Master index of all reference specs.

**Next session ready to run**: [Content Batch 1 — Custom Ball Owner Cluster](docs/handoffs/01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md). Open a fresh Claude Code session and paste the master prompt from Part 12 of that doc.

### Reference Specs

| Doc | What |
|-----|------|
| [01-ARCHITECTURE](docs/specs/01-ARCHITECTURE.md) | Tech stack, file structure, data flow, component hierarchy |
| [04-3D-RENDERING](docs/specs/04-3D-RENDERING.md) | Lighting, materials, post-processing, performance |
| [05-CONTENT-ARCHITECTURE](docs/specs/05-CONTENT-ARCHITECTURE.md) | MDX pipeline, full chapter/section map |
| [07-INTERACTION-BLUEPRINTS](docs/specs/07-INTERACTION-BLUEPRINTS.md) | Complete interaction design for all 53 sections |
| [09-ASSET-ARCHITECTURE](docs/specs/09-ASSET-ARCHITECTURE.md) | Swappable asset pattern + Lane/Figure/Pins prototypes |
| [GLOSSARY](docs/GLOSSARY.md) | Canonical bowling terminology |

### Session Handoff Docs (for fresh Claude Code context windows)

When starting a new focused session, point Claude at the matching handoff:

| Session Type | Handoff Doc |
|--------------|-------------|
| Write MDX content (5-section batches) | [08-CONTENT-BATCHING-HANDOFF](docs/specs/08-CONTENT-BATCHING-HANDOFF.md) |
| Build the Lane asset | [10-SESSION-LANE-ASSET](docs/specs/10-SESSION-LANE-ASSET.md) |
| Build the Figure asset | [11-SESSION-FIGURE-ASSET](docs/specs/11-SESSION-FIGURE-ASSET.md) |
| Build the oil pattern data library | [12-SESSION-OIL-DATA](docs/specs/12-SESSION-OIL-DATA.md) |
| Build scene components for content | [13-SESSION-SCENE-BUILDING](docs/specs/13-SESSION-SCENE-BUILDING.md) |

Each handoff is self-contained: read the doc, follow the instructions, ship the work.

---

## Vision

Roll Model is an interactive 3D bowling encyclopedia — "the best bowling textbook that never existed, but interactive and in 3D." 12 chapters, 53 sections, each paired with a manipulable 3D visualization. Built as a personal learning resource for a new bowler with a custom ball, designed to become a free community resource for the 67.3 million annual bowlers in the US.

The design philosophy follows Shopify Editions and Stripe Press: **content-first 3D**. Every visual effect illustrates a concept instantly. Readers interact with the 3D scene via inline `<SceneCue>` buttons that change what they see as they read about rev rate, oil patterns, entry angles, pin action.

Only 1 of 53 content sections is written. The rest is architected and blueprinted, ready to produce.

---

## Deployment

Production auto-deploys from `main` to Vercel. Preview deployments on every PR. See [06-DEPLOYMENT-CICD](docs/specs/06-DEPLOYMENT-CICD.md) for details.

## License

MIT — see [LICENSE](LICENSE).
