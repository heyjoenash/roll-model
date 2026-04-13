# Roll Model — Docs Folder Structure

> **Last Updated**: 2026-04-13
> **Purpose**: This file is the canonical guide for what goes where in `docs/`. If you're about to create a new doc, find its category below FIRST. Nothing should ever be in the wrong folder.

---

## Quick Lookup: "Where does X go?"

| If you're creating... | Put it in... | Example |
|----------------------|-------------|---------|
| A reference spec (architecture, rendering, deployment) | `docs/specs/` | `04-3D-RENDERING.md` |
| A self-contained session handoff with atomic checklists | `docs/handoffs/` | `02-LANE-ASSET-BUILD.md` |
| An implementation plan for a specific feature | `docs/plans/` | `03-RESIZABLE-PANELS-IMPLEMENTATION.md` |
| Bowling science source material | `docs/research/` | `ball-physics-and-equipment-science.md` |
| Historical conversation logs / past references | `docs/reference/` | `convoprior.md` |
| Living dashboard updated every session | `docs/` (root) | `STATUS.md` |
| Canonical bowling terminology | `docs/` (root) | `GLOSSARY.md` |
| The original project vision brief | `docs/` (root) | `SESSION-KICKOFF.md` |

If you don't know which category something belongs in, **read this entire README** before creating the file. If it still doesn't fit, ASK before creating — don't invent a new folder.

---

## Folder-by-Folder

### `docs/specs/` — Reference Specifications

**Purpose**: The textbook. Generic, stable documents describing how the system works and how to do things in general.

**Naming convention**: `{number}-{KEBAB-CASE-NAME}.md` (numbers assigned at creation, never renumbered)

**Current contents**:
- `00-INDEX.md` — master index of all specs
- `01-ARCHITECTURE.md` — tech stack, project structure, data flow
- `02-LAYOUT-AND-SCENE-CUES.md` — split layout + SceneCue system
- `03-3D-ARTIST-BRIEF.md` — GLB model specs for external 3D team
- `04-3D-RENDERING.md` — lighting, materials, post-processing
- `05-CONTENT-ARCHITECTURE.md` — MDX pipeline, full chapter/section map
- `06-DEPLOYMENT-CICD.md` — Vercel + GitHub Actions
- `07-INTERACTION-BLUEPRINTS.md` — interaction design for all 53 sections
- `08-CONTENT-BATCHING-HANDOFF.md` — generic content-writing playbook
- `09-ASSET-ARCHITECTURE.md` — Lane/Figure/Pins prototype options + swappable interface pattern
- `10-SESSION-LANE-ASSET.md` — generic lane-build playbook
- `11-SESSION-FIGURE-ASSET.md` — generic figure-build playbook
- `12-SESSION-OIL-DATA.md` — generic oil-data playbook
- `13-SESSION-SCENE-BUILDING.md` — generic scene-building playbook
- `14-PRD.md` — Product Requirements Document (the north star)

**Update frequency**: Rarely. Once a spec is CANONICAL, it's stable. Updates require justification.

**Don't put here**: Specific session flight plans (those go in `handoffs/`), implementation plans for one-off features (those go in `plans/`), living state (that goes at `docs/` root).

---

### `docs/handoffs/` — Session Flight Plans

**Purpose**: Concrete, ready-to-execute handoff documents with atomic task checklists. Each file is a complete flight plan for ONE specific session that a fresh Claude Code context window can execute end-to-end.

**Naming convention**: `{number}-{KEBAB-CASE-NAME}.md`. Numbers reflect the **suggested execution order**, not the creation order. Numbers don't change once assigned.

**Current contents**:
- `00-MASTER-ROADMAP.md` ⭐ — **THE complete list of all 34 sessions needed for v1.0**, organized by milestone, with status (READY/STUB), dependencies, and effort estimates. Read this to understand the full path.
- `README.md` — folder index + parallel-safety matrix + execution order
- `01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md` — 5 MDX sections (Ch 2 + Ch 5)
- `02-LANE-ASSET-BUILD.md` — Lane reusable asset (textured plane)
- `03-OIL-PATTERN-DATA.md` — Oil pattern data library (half-session)
- `04-SCENE-BUILDING-CHAPTER-2.md` — Chapter 2 scene components
- `05-FIGURE-ASSET-BUILD.md` — Bowler figure (primitive scientific-diagram)
- `06-CONTENT-BATCH-2-FOUNDATION.md` — Chapter 1 MDX content (4 sections)
- `07-CONDUCTOR-MAIN-AGENT.md` ⭐ — **Continuous orchestrator role** (NOT a single-purpose session). Re-invokable in its own window in parallel with other sessions. Builds sub-features, promotes STUBs, updates STATUS, fixes bugs, maintains docs. The "everything else" role.

**Important distinction**: Handoffs 01-06 are SINGLE-PURPOSE flight plans for one specific deliverable each. Handoff 07 is a CONTINUOUS role you re-invoke as needed. The conductor role is the connective tissue between dedicated sessions.

**Total handoffs needed for v1.0**: 34 (6 READY, 28 STUB) for the dedicated sessions. The conductor (07) handles the work that doesn't fit any of those 34 — STUBs are promoted by the conductor as we approach them.

**Update frequency**: Each file is mostly write-once. After the session runs, the handoff stays as historical record. Don't edit a handoff that's already been executed.

**The relationship to `specs/`**: A handoff in `handoffs/` is the SPECIFIC application of a generic playbook in `specs/`. Example:
- `specs/10-SESSION-LANE-ASSET.md` is the generic lane-build playbook
- `handoffs/02-LANE-ASSET-BUILD.md` is the specific atomic flight plan for the next lane build

When you create a new handoff, derive it from a spec playbook. Don't duplicate spec content into the handoff — reference it.

**Don't put here**: Generic playbooks (those go in `specs/`), implementation plans for non-session work (those go in `plans/`).

---

### `docs/plans/` — Implementation Plans

**Purpose**: One-off implementation plans for specific features that aren't session handoffs. Used when a piece of work is too small for a full session handoff but too detailed to capture in a commit message.

**Naming convention**: `{number}-{KEBAB-CASE-NAME}.md`

**Current contents**:
- `03-RESIZABLE-PANELS-IMPLEMENTATION.md` — react-resizable-panels integration (already shipped)

**Update frequency**: Write once when planning, leave as historical record after shipping.

**When to use plans/ instead of handoffs/**:
- The work is too small to need atomic task checklists
- The work doesn't follow a repeating session pattern
- It's a one-off architectural decision implementation
- It's a refactor with a specific plan but no need for a full handoff

**When to use handoffs/ instead of plans/**:
- It's a session that follows a repeating pattern (content batch, asset build, scene build, etc.)
- It needs atomic task checklists to execute
- It needs a master prompt for a fresh context window
- The work is substantial (~3+ hours)

**Don't put here**: Session handoffs, generic playbooks, living state docs.

---

### `docs/research/` — Bowling Science Source Material

**Purpose**: 11,908 lines of dense, citation-heavy bowling science research from the Bowling Buddy parent project. This is the SOURCE material that gets transformed into MDX content by content batching sessions.

**Naming convention**: descriptive names (no numbering convention)

**Current contents**:
- `01-bowling-science-reference.md` (3,869 lines — comprehensive superset)
- `02-existing-tools-gap-analysis.md` (2,958 lines — competitive analysis)
- `08-coaching-pedagogy-and-feedback.md` (1,342 lines — coaching methodology)
- `ball-physics-and-equipment-science.md` (673 lines)
- `biomechanics-and-form.md` (644 lines)
- `lane-science-and-oil-patterns.md` (743 lines)
- `performance-metrics-and-ml-classification.md` (931 lines)
- `strike-physics-and-scoring-science.md` (748 lines)

**Update frequency**: NEVER. This is source material from an upstream project. If new research is needed, add new files but DO NOT modify existing ones.

**How to read these**: They're large. Use Grep to find the section you need, then Read with offset/limit. Don't try to read whole files.

**Don't put here**: Original content for Roll Model (that goes in `content/` at the project root, not in `docs/`). Notes about the research (those should be cited from MDX content directly).

---

### `docs/reference/` — Historical Reference

**Purpose**: Historical documents, conversation logs, design references, and other things that aren't actively maintained but are worth keeping for context.

**Current contents**:
- `convoprior.md` — log of an earlier conversation that informed the project's direction

**Update frequency**: Append-only. Don't edit existing files.

**Don't put here**: Active living docs (those go at `docs/` root), specs (those go in `specs/`).

---

### `docs/` (root) — Living Documents

**Purpose**: Documents that are updated frequently and need to be discoverable at the top level.

**Current contents**:
- `README.md` (this file) — the folder structure guide
- `STATUS.md` — current state dashboard, **updated every session**
- `GLOSSARY.md` — canonical bowling terminology, updated when new terms appear
- `SESSION-KICKOFF.md` — the original project vision brief (kept here, not moved to specs, because it's the historical "where it all started" doc)

**Update frequency**: STATUS.md every session. GLOSSARY.md when new terms enter content. README.md when the folder structure changes. SESSION-KICKOFF.md never (preserved as the original vision).

**Don't put here**: Specs (those go in `specs/`), session handoffs (those go in `handoffs/`), implementation plans (those go in `plans/`).

---

## Decision Tree: "I'm about to create a doc — where should it go?"

```
Is the doc...

├─ ...the original vision or kickoff?
│  └─ docs/SESSION-KICKOFF.md (already exists; don't add more)
│
├─ ...a current state dashboard or living tracker?
│  └─ docs/ root (STATUS.md, GLOSSARY.md, README.md)
│
├─ ...source research material (bowling science from Bowling Buddy)?
│  └─ docs/research/
│
├─ ...a historical conversation log or design reference?
│  └─ docs/reference/
│
├─ ...a stable reference spec (architecture, rendering, deployment, content pipeline)?
│  └─ docs/specs/
│
├─ ...a generic playbook for a recurring session type (write any content batch, build any asset)?
│  └─ docs/specs/ (e.g. specs/08, 10, 11, 12, 13)
│
├─ ...a self-contained flight plan for ONE specific upcoming session with atomic checklists?
│  └─ docs/handoffs/
│
├─ ...an implementation plan for a one-off feature (not a recurring session pattern)?
│  └─ docs/plans/
│
└─ ...something else entirely?
   └─ STOP. Ask. Don't invent a new folder.
```

---

## Naming Conventions

### Numbered files (specs/, handoffs/, plans/)
```
{number}-{KEBAB-CASE-NAME}.md
```

Examples:
- `01-ARCHITECTURE.md`
- `02-LANE-ASSET-BUILD.md`
- `14-PRD.md`

Numbers are assigned at creation time and **never renumbered**. If a doc is deprecated, its number stays reserved (don't reuse).

### Unnumbered files (research/, reference/, root)
Descriptive lowercase or PascalCase, choose what fits the context. No strict pattern because these aren't sequenced.

Examples:
- `STATUS.md`
- `GLOSSARY.md`
- `ball-physics-and-equipment-science.md`
- `convoprior.md`

---

## What "Nothing Gets Lost" Means

Every doc lives in exactly ONE folder. There are no duplicates. There is no "I think this might be in two places."

Discoverability is guaranteed by:

1. **`docs/README.md`** (this file) — the folder structure guide
2. **`docs/STATUS.md`** — the current state dashboard, always up to date
3. **`docs/specs/00-INDEX.md`** — the master spec index
4. **`docs/handoffs/README.md`** — the handoff index with parallel-safety matrix
5. **`docs/specs/14-PRD.md`** — the PRD that everything else references

A fresh context window dropped into the project can read README → STATUS → PRD → relevant handoff or spec, and have full context in under 30 minutes.

If you ever can't find a doc, the answer is in one of these 5 files. If it isn't, the doc doesn't exist — create it in the right folder per the decision tree above.

---

## What's Currently in `docs/`

```
docs/
├── README.md                          # this file — folder structure guide
├── STATUS.md                          # current state dashboard
├── GLOSSARY.md                        # bowling terminology
├── SESSION-KICKOFF.md                 # original project vision
├── specs/                             # reference specifications
│   ├── 00-INDEX.md
│   ├── 01-ARCHITECTURE.md
│   ├── 02-LAYOUT-AND-SCENE-CUES.md
│   ├── 03-3D-ARTIST-BRIEF.md
│   ├── 04-3D-RENDERING.md
│   ├── 05-CONTENT-ARCHITECTURE.md
│   ├── 06-DEPLOYMENT-CICD.md
│   ├── 07-INTERACTION-BLUEPRINTS.md
│   ├── 08-CONTENT-BATCHING-HANDOFF.md
│   ├── 09-ASSET-ARCHITECTURE.md
│   ├── 10-SESSION-LANE-ASSET.md
│   ├── 11-SESSION-FIGURE-ASSET.md
│   ├── 12-SESSION-OIL-DATA.md
│   ├── 13-SESSION-SCENE-BUILDING.md
│   └── 14-PRD.md
├── handoffs/                          # ready-to-execute session flight plans
│   ├── README.md
│   ├── 01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md
│   ├── 02-LANE-ASSET-BUILD.md
│   ├── 03-OIL-PATTERN-DATA.md
│   ├── 04-SCENE-BUILDING-CHAPTER-2.md
│   ├── 05-FIGURE-ASSET-BUILD.md
│   └── 06-CONTENT-BATCH-2-FOUNDATION.md
├── plans/                             # one-off implementation plans
│   └── 03-RESIZABLE-PANELS-IMPLEMENTATION.md
├── research/                          # bowling science source material (from Bowling Buddy)
│   ├── 01-bowling-science-reference.md
│   ├── 02-existing-tools-gap-analysis.md
│   ├── 08-coaching-pedagogy-and-feedback.md
│   ├── ball-physics-and-equipment-science.md
│   ├── biomechanics-and-form.md
│   ├── lane-science-and-oil-patterns.md
│   ├── performance-metrics-and-ml-classification.md
│   └── strike-physics-and-scoring-science.md
└── reference/                         # historical conversation logs / design references
    └── convoprior.md
```

That's the entire `docs/` tree. If you create a new file, it goes in one of the existing folders. Don't create new top-level folders without a strong justification — ask first.
