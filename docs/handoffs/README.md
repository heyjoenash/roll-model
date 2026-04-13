# Roll Model — Session Handoffs

> **Last Updated**: 2026-04-13
> **Purpose**: Concrete, ready-to-execute session handoff documents with atomic task checklists. Each file in this folder is a complete flight plan for one specific session.

---

## What This Folder Is

`docs/specs/` contains **reference handoff docs** — generic playbooks like "how to write any content batch" or "how to build any scene." They're the textbook.

`docs/handoffs/` (this folder) contains **specific, ready-to-execute handoffs** for the next concrete sessions. Each file:

- Names the exact session (e.g. "Content Batch 1: Custom Ball Owner Cluster")
- Lists every atomic task as a checkbox
- Includes the exact prompt to copy into a fresh Claude Code window
- Defines the stop conditions (when to commit, when to ask for help)
- Cross-references the relevant spec docs and research files
- Self-contained: a fresh context window can execute end-to-end without any prior conversation

The relationship: spec 08 is the handbook for content batching in general. `handoffs/01-CONTENT-BATCH-1.md` is the actual flight plan for the next specific batch you'll run.

---

## How to Use a Handoff

1. Pick the next handoff in the order list below.
2. Open a fresh Claude Code session in `/Users/joenash/github/roll-model`
3. Open the matching handoff file in your editor (so you can reference it).
4. Copy the **"Master Prompt"** section from the handoff into the fresh Claude window as your first message.
5. Watch the session execute. The handoff includes its own atomic task checklist for the agent to follow.
6. When the agent finishes, it will commit (NOT push). Review the commit yourself.
7. Push to main when satisfied. Update `docs/STATUS.md` with what shipped.
8. Move to the next handoff.

---

## Available Handoffs

All 6 core session types now have dedicated atomic-task handoffs ready to execute.

| # | Handoff | Type | Status | Effort | Asset Deps | Parallel-Safe With |
|---|---------|------|--------|--------|-----------|-------------------|
| 01 | [Content Batch 1: Custom Ball Owner Cluster](01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md) | Content (5 sections) | READY | 5-7h | None | 02, 03, 05 |
| 02 | [Lane Asset Build](02-LANE-ASSET-BUILD.md) | 3D asset | READY | 4-6h | None | 01, 03, 05 |
| 03 | [Oil Pattern Data Library](03-OIL-PATTERN-DATA.md) | Data (TypeScript) | READY | 1.5-2h (half) | None | 01, 02, 04, 05 |
| 04 | [Scene Building: Chapter 2 (The Ball)](04-SCENE-BUILDING-CHAPTER-2.md) | Scenes (5-6 components) | READY | 4-6h | Ball (built); Lane optional | 02, 03, 05 |
| 05 | [Figure (Bowler) Asset Build](05-FIGURE-ASSET-BUILD.md) | 3D asset | READY | 5-7h | None | 01, 02, 03, 04 |
| 06 | [Content Batch 2: Foundation Cluster (Ch 1)](06-CONTENT-BATCH-2-FOUNDATION.md) | Content (4 sections) | READY | 4-6h | Lane (built), Pins (built) | 02, 03, 05 |

### Recommended Execution Order

Each handoff explicitly lists which other handoffs it conflicts with. Most are parallel-safe.

**Highest leverage first sequence:**

1. **01** — Content Batch 1 (no asset deps, ships content fast)
2. **02** — Lane Asset Build (unlocks 22 future scenes)
3. **03** — Oil Pattern Data (half-session, unblocks Lane oil overlay)
4. **04** — Scene Building Ch 2 (depends on 01 finishing first; uses existing ball)
5. **05** — Figure Asset (last reusable asset; completes M1)
6. **06** — Content Batch 2 (depends on Lane + Pins existing)

You can run sessions in parallel where the conflict matrix allows. For example, Handoff 01 (content writing) and Handoff 02 (Lane asset) touch completely different files — they can run simultaneously in two fresh Claude Code windows.

### Cannot run in parallel

These pairs touch the same files and would conflict:
- 01 ↔ 06 (both touch `src/lib/content-map.ts` for content registration)
- 04 ↔ 02 (both might touch `src/components/3d/scenes/prototype-scene.tsx`)
- Any two content batch sessions

### Future Handoffs (will be added as needed)

- 07: Content Batch 3 — Ball Internals Cluster (Ch 2 sections core-design, ball-motion, weight-and-drilling)
- 08: Scene Building Ch 1 (uses Lane + Pins)
- 09: Content Batch 4 — Strike Physics Cluster (Ch 8)
- 10: Scene Building Ch 8 (Strike chapter — needs Pin Action animation)
- ...

These will be created when their dependencies are ready and you're approaching them in the execution order.

---

## What Makes a Handoff "Ready"

A handoff is READY when it includes ALL of:

- [x] Strategic context (why this session, what it produces, who it serves)
- [x] Pre-flight reading checklist (every file the agent must read, in order)
- [x] Voice/style guide compressed for ready application (if content)
- [x] Component API reference (the JSX components and how to use them)
- [x] Atomic task checklist for every section/asset/scene
- [x] Per-section/per-asset specifics (research sources, key concepts, params)
- [x] Quality checklist (voice, structure, technical, verification)
- [x] Common pitfalls (the bugs that will bite)
- [x] Stop conditions (when to commit, when to ask, when not to push)
- [x] The exact "first prompt" to paste into the fresh session
- [x] Commit message template
- [x] Cross-reference back to the PRD requirements being served

If any of these are missing, the handoff is DRAFT, not READY.

---

## File Naming Convention

```
{order-number}-{kebab-case-descriptive-name}.md
```

Examples:
- `01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md`
- `02-LANE-ASSET-BUILD.md`
- `03-OIL-PATTERN-DATA.md`

The order number is the suggested execution order. Numbers are assigned at handoff creation time and don't change.

---

## Cross-References

- **Generic playbooks (the textbook)**: `docs/specs/08-CONTENT-BATCHING-HANDOFF.md`, `10-SESSION-LANE-ASSET.md`, `11-SESSION-FIGURE-ASSET.md`, `12-SESSION-OIL-DATA.md`, `13-SESSION-SCENE-BUILDING.md`
- **PRD (the north star)**: `docs/specs/14-PRD.md`
- **Current status**: `docs/STATUS.md`
- **Bowling glossary**: `docs/GLOSSARY.md`
- **Interaction blueprints**: `docs/specs/07-INTERACTION-BLUEPRINTS.md`

---

## After Running a Handoff

Update `docs/STATUS.md` to reflect the new state. Move completed work from "What's Next" to "What's Done." Add the new commit to "Recent Activity." This keeps the project's running ledger accurate.

If the handoff revealed any gaps in the spec docs or playbooks, update those too. Handoffs are living documents — when one runs successfully, future ones can be more confident.
