# Roll Model — Specification Index

> **Last Updated**: 2026-04-13
> **Project**: Roll Model — Interactive 3D Bowling Encyclopedia

## Document Status Key

| Status | Meaning |
|--------|---------|
| **CANONICAL** | Single source of truth, always current |
| **STABLE** | Rarely changes, verify "Last Updated" date |
| **ACTIVE** | Living doc, may be in flux |
| **SUPERSEDED** | Historical only, see replacement doc |

---

## Reference Specifications

These describe HOW the system works. Read for context, don't modify casually.

| # | Document | Status | Last Updated | Description |
|---|----------|--------|--------------|-------------|
| 00 | [Index](00-INDEX.md) | CANONICAL | 2026-04-13 | This file — master index of all specs and session handoffs |
| 01 | [Architecture](01-ARCHITECTURE.md) | CANONICAL | 2026-04-11 | Tech stack, project structure, data flow, component hierarchy |
| 02 | [Layout & Scene Cues](02-LAYOUT-AND-SCENE-CUES.md) | STABLE | 2026-04-07 | Resizable split layout, SceneCue system, responsive breakpoints |
| 03 | [3D Artist Brief](03-3D-ARTIST-BRIEF.md) | STABLE | 2026-04-07 | GLB model specs for external 3D team |
| 04 | [3D Rendering](04-3D-RENDERING.md) | CANONICAL | 2026-04-11 | Lighting, materials, post-processing, performance strategy |
| 05 | [Content Architecture](05-CONTENT-ARCHITECTURE.md) | CANONICAL | 2026-04-11 | MDX pipeline, chapter/section map, content-to-scene binding |
| 06 | [Deployment & CI/CD](06-DEPLOYMENT-CICD.md) | CANONICAL | 2026-04-11 | Vercel setup, GitHub Actions, build verification |
| 07 | [Interaction Blueprints](07-INTERACTION-BLUEPRINTS.md) | CANONICAL | 2026-04-12 | Complete interaction design for all 53 sections — the production bible |
| 09 | [Asset Architecture](09-ASSET-ARCHITECTURE.md) | CANONICAL | 2026-04-12 | Lane/Figure/Pins prototype options + swappable interface pattern |
| **14** | **[PRD (Product Requirements Document)](14-PRD.md)** | **CANONICAL** | **2026-04-13** | **Vision, personas, user journeys, requirements, success metrics, milestones, risk register, definition of done — the north star every session works toward** |

---

## Session Handoff Documents

These are **self-contained briefings** for fresh Claude Code context windows. When starting a new focused session, point Claude at the matching handoff doc — each one contains everything a fresh session needs to ship its work without back-and-forth.

| # | Session Type | Status | Scope | Doc |
|---|--------------|--------|-------|-----|
| 08 | Content Batching (5-section MDX cluster) | CANONICAL | Full session | [08-CONTENT-BATCHING-HANDOFF.md](08-CONTENT-BATCHING-HANDOFF.md) |
| 10 | Build Lane Asset | CANONICAL | Full session | [10-SESSION-LANE-ASSET.md](10-SESSION-LANE-ASSET.md) |
| 11 | Build Figure (Bowler) Asset | CANONICAL | Full session | [11-SESSION-FIGURE-ASSET.md](11-SESSION-FIGURE-ASSET.md) |
| 12 | Build Oil Pattern Data Library | CANONICAL | Half session | [12-SESSION-OIL-DATA.md](12-SESSION-OIL-DATA.md) |
| 13 | Build Scene Components for a Chapter | CANONICAL | Full session per chapter | [13-SESSION-SCENE-BUILDING.md](13-SESSION-SCENE-BUILDING.md) |

### How to Use a Session Handoff

1. Open a fresh Claude Code session in `/Users/joenash/github/roll-model`
2. Paste the "First Prompt for the Fresh Session" from the matching handoff doc
3. The fresh session reads the doc, executes the work, commits, and stops
4. You review the commit and push when satisfied

### Recommended Session Order

If you're trying to ship the project, here's the optimal next-session sequence:

1. **Session A** — Run handoff `08` (Content Batching) to write Batch 1: the "Custom Ball Owner Cluster" (5 MDX sections). Doesn't depend on any new assets.

2. **Session B** — Run handoff `10` (Lane Asset). Unblocks ~22 future scenes.

3. **Session C** — Run handoff `12` (Oil Pattern Data). Half session. Unblocks Lane's oil overlay.

4. **Session D** — Run handoff `13` for Chapter 2 (The Ball). Builds 6 scene components against the existing ball asset. No new asset dependencies.

5. **Session E** — Run handoff `08` for Batch 2 ("Foundation Cluster"). Writes Ch 1 content (4 sections).

6. **Session F** — Run handoff `13` for Chapter 1 (uses Lane and Pins assets).

7. **Session G** — Run handoff `11` (Figure Asset). Unblocks Chapters 3, 4, 5, 12.

8. **Sessions H+** — Continue alternating content (08) and scene-building (13) sessions per chapter, with asset sessions interleaved as dependencies arise.

The total project is ~12 content sessions + 4 asset sessions + 12 scene-building sessions = ~28 focused sessions to a complete site.

---

## Plans (Implementation Notes)

| # | Document | Status | Description |
|---|----------|--------|-------------|
| 03 | [Resizable Panels Implementation](../plans/03-RESIZABLE-PANELS-IMPLEMENTATION.md) | STABLE | react-resizable-panels integration plan (already shipped) |

---

## Living Documents (Updated Frequently)

These live at `docs/` root (not in `specs/`) because they change often:

| Doc | Purpose | Updated |
|-----|---------|---------|
| **[STATUS.md](../STATUS.md)** | Current state dashboard — what's done, in progress, next 3 sessions, blockers, recent commits. **Read this first when starting a new session.** | Every session |
| **[GLOSSARY.md](../GLOSSARY.md)** | Canonical definitions for every bowling term used in content. Single source of truth for jargon. | When new terms appear |

## Dedicated Session Handoffs

`docs/handoffs/` contains **ready-to-execute** handoffs for specific upcoming sessions. Each has atomic task checklists and a copy-pasteable master prompt.

| Handoff | Status | Doc |
|---------|--------|-----|
| 01: Content Batch 1 — Custom Ball Owner Cluster | READY | [docs/handoffs/01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md](../handoffs/01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md) |

The relationship: spec docs 08, 10, 11, 12, 13 are **generic playbooks** (the textbook). The handoffs in `docs/handoffs/` are **specific flight plans** for the next concrete sessions, derived from those playbooks. See [docs/handoffs/README.md](../handoffs/README.md) for the full index and explanation.

## Other Documentation

- **`docs/SESSION-KICKOFF.md`** — Original project brief and vision document. Authoritative on intent, superseded on technical details by the numbered specs and the PRD.
- **`docs/research/`** — 11,908 lines of bowling science source material across 8 files. Reference material for content writing.
- **`docs/reference/`** — Historical conversation logs and design references.
- **`README.md`** (project root) — Quick-start guide for developers landing on the repo.
- **`LICENSE`** (project root) — MIT license.

---

## Quick Project State

- **Repo**: github.com/heyjoenash/roll-model (public)
- **Production**: roll-model.vercel.app (auto-deploys from main)
- **Content sections complete**: 1 of 53 (Rev Rate)
- **3D assets built**: Ball (premium clearcoat), Pins (lathe procedural)
- **3D assets pending**: Lane, Figure, Oil pattern data, Ball upgrades
- **Scene components built**: rev-rate, default, prototype (3 of ~53 planned)
- **Spec documents**: 14 (this index + 13 numbered specs)
- **Living docs**: 2 (STATUS.md, GLOSSARY.md)
- **Total documentation**: ~10,000 lines across all specs, handoffs, and living docs

Last build verified: 2026-04-13, all routes 200, no errors.

For the most current state, always read [`docs/STATUS.md`](../STATUS.md) — it's updated every session.
