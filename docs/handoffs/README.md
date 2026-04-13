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

| # | Handoff | Type | Status | Estimated Effort |
|---|---------|------|--------|-----------------|
| 01 | [Content Batch 1: Custom Ball Owner Cluster](01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md) | Content writing (5 sections) | READY | ~5-7 hours |

### Coming next (will be added as we approach them)

- 02: Lane Asset Build (use `docs/specs/10-SESSION-LANE-ASSET.md` as the source — handoff version pending)
- 03: Oil Pattern Data (use `docs/specs/12-SESSION-OIL-DATA.md` — handoff version pending)
- 04: Scene Building — Chapter 2 (use `docs/specs/13-SESSION-SCENE-BUILDING.md` — handoff version pending)
- 05: Content Batch 2 — Foundation Cluster (Ch 1 sections) — pending
- 06: Figure Asset Build (use `docs/specs/11-SESSION-FIGURE-ASSET.md` — handoff version pending)

The pattern: as we get close to running each session, we generate its specific atomic-checklist handoff in this folder, derived from the generic playbook in `docs/specs/`.

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
