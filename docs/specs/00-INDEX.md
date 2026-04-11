# Roll Model — Specification Index

> **Last Updated**: 2026-04-11
> **Project**: Roll Model — Interactive 3D Bowling Encyclopedia

## Document Status Key

| Status | Meaning |
|--------|---------|
| **CANONICAL** | Single source of truth, always current |
| **STABLE** | Rarely changes, verify "Last Updated" date |
| **ACTIVE** | Living doc, may be in flux |
| **SUPERSEDED** | Historical only, see replacement doc |

## Specifications

| # | Document | Status | Last Updated | Description |
|---|----------|--------|--------------|-------------|
| 00 | [Index](00-INDEX.md) | CANONICAL | 2026-04-11 | This file — master index of all specs |
| 01 | [Architecture](01-ARCHITECTURE.md) | CANONICAL | 2026-04-11 | Tech stack, project structure, data flow, component hierarchy |
| 02 | [Layout & Scene Cues](02-LAYOUT-AND-SCENE-CUES.md) | STABLE | 2026-04-07 | Resizable split layout, SceneCue system, responsive breakpoints |
| 03 | [3D Artist Brief](03-3D-ARTIST-BRIEF.md) | STABLE | 2026-04-07 | GLB model specs, material setup, HDRI requirements |
| 04 | [3D Rendering](04-3D-RENDERING.md) | CANONICAL | 2026-04-11 | Lighting, materials, post-processing, performance strategy |
| 05 | [Content Architecture](05-CONTENT-ARCHITECTURE.md) | CANONICAL | 2026-04-11 | MDX pipeline, chapter/section map, content-to-scene binding |
| 06 | [Deployment & CI/CD](06-DEPLOYMENT-CICD.md) | CANONICAL | 2026-04-11 | Vercel setup, GitHub Actions, build config, environment |

## Plans (Implementation Details)

| # | Document | Status | Description |
|---|----------|--------|-------------|
| 03 | [Resizable Panels](../plans/03-RESIZABLE-PANELS-IMPLEMENTATION.md) | STABLE | react-resizable-panels implementation plan |

## Research

All source research lives in `docs/research/` (11,908 lines across 8 files). These are reference material from the Bowling Buddy parent project — dense, citation-heavy bowling science that gets transformed into conversational MDX content.

## Session Kickoff

`docs/SESSION-KICKOFF.md` is the original project brief. It remains the authoritative vision document but specific technical details are superseded by the numbered specs above.
