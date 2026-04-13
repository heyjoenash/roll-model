# Roll Model — Master Handoff Roadmap

> **Status**: CANONICAL
> **Last Updated**: 2026-04-13
> **Purpose**: The complete list of every session needed to ship Roll Model v1.0. Each entry has status, dependencies, effort estimate, and a link to its full atomic handoff (if one exists yet).

---

## The Promise

This document lists EVERY session needed to take Roll Model from its current state (1 production content section, 2 of 4 reusable assets) to v1.0 launch (53 content sections, all 4 assets, all scene components, polished and shipped).

Nothing is missing from this list. If a session isn't on this roadmap, it's not part of v1.0. If a session IS on this roadmap but its full handoff doc doesn't exist yet, it's a STUB — meaning the scope is defined here but the atomic-task flight plan will be promoted to a full handoff in `docs/handoffs/##-NAME.md` when we approach it.

**You will never reach a point where "we don't know what session to run next."** Every session has an entry here with its dependencies and status.

---

## Status Key

| Status | Meaning |
|--------|---------|
| ✅ **DONE** | Session has shipped, commit is in main |
| 🟢 **READY** | Full atomic handoff exists at `docs/handoffs/##-NAME.md`, can be executed in a fresh session right now |
| 🟡 **STUB** | Scope defined in this roadmap, but no full handoff doc yet; needs promotion before execution |
| 🔴 **BLOCKED** | Cannot start until other sessions ship their dependencies |

---

## The Complete Session Roadmap

### Milestone M1: Asset Foundation (4 sessions)

**Goal**: All 4 reusable 3D assets exist + oil pattern data + Lane oil overlay rendering

| # | Session | Type | Status | Effort | Depends on | Handoff |
|---|---------|------|--------|--------|-----------|---------|
| M1.1 | Lane Asset Build | 3D asset | 🟢 READY | 4-6h | none | [02](02-LANE-ASSET-BUILD.md) |
| M1.2 | Oil Pattern Data Library | TS data | 🟢 READY | 1.5-2h | none | [03](03-OIL-PATTERN-DATA.md) |
| M1.3 | Figure (Bowler) Asset Build | 3D asset | 🟢 READY | 5-7h | none | [05](05-FIGURE-ASSET-BUILD.md) |
| M1.4 | Lane Oil Overlay Rendering | 3D feature | 🟡 STUB | 3-4h | M1.1, M1.2 | (will create after M1.1+M1.2 ship) |

**Definition of Done**: All 4 reusable assets exist (Ball ✅, Pins ✅, Lane, Figure), oil pattern data ships, the Lane component renders oil patterns from the data file, the prototype sandbox shows everything together.

---

### Milestone M2: Content Wave 1 (4 sessions)

**Goal**: 10 content sections + 10 scene components live (~20% of project shipped)

| # | Session | Type | Status | Effort | Depends on | Handoff |
|---|---------|------|--------|--------|-----------|---------|
| M2.1 | Content Batch 1: Custom Ball Owner | Content (5) | 🟢 READY (running) | 5-7h | none | [01](01-CONTENT-BATCH-1-CUSTOM-BALL-OWNER.md) |
| M2.2 | Scene Building Chapter 2 (The Ball) | Scenes (5-6) | 🟢 READY | 4-6h | M2.1 | [04](04-SCENE-BUILDING-CHAPTER-2.md) |
| M2.3 | Content Batch 2: Foundation Cluster (Ch 1) | Content (4) | 🟢 READY | 4-6h | M1.1, Pins ✅ | [06](06-CONTENT-BATCH-2-FOUNDATION.md) |
| M2.4 | Scene Building Chapter 1 (The Basics) | Scenes (4) | 🟡 STUB | 3-5h | M1.1, M2.3 | (promote when ready) |

**Definition of Done**: 10 content sections written, 10 scenes built, the site has a coherent Ch 1 → Ch 2 → Ch 5 learning path through 10 production sections.

---

### Milestone M3: The Strike Chapter (3 sessions)

**Goal**: Chapter 8 fully shipped — the highest-impact "wow" chapter (entry angle, pin action, pocket physics)

| # | Session | Type | Status | Effort | Depends on | Handoff |
|---|---------|------|--------|--------|-----------|---------|
| M3.1 | Content Batch 4: Strike Physics Cluster | Content (4) | 🟡 STUB | 5-7h | none (uses existing pins) | (promote when ready) |
| M3.2 | Content Batch 5: Pin Leaves + Perfect Game | Content (2) | 🟡 STUB | 3-4h | none | (promote when ready) |
| M3.3 | Scene Building Chapter 8 (The Strike) | Scenes (6) | 🟡 STUB | 6-8h | M1.1 (Lane), Pins ✅, **Pin Action animation feature** | (promote when ready) |

**Sections in M3.1**: The Pocket, Entry Angle, Pin Action, Speed at the Pins
**Sections in M3.2**: Common Pin Leaves, The Perfect Game

**Note**: The Scene Building Ch 8 session has a sub-dependency on a "Pin Action animation feature" — the slow-motion chain reaction animation (see interaction blueprint §8.3). This feature doesn't exist as part of the Pins asset yet; it's a new component that needs to be built as part of the Ch 8 scene-building session OR as a separate sub-feature handoff. Decision deferred until M3.3 is approached.

**Definition of Done**: Chapter 8 fully visible — readers can experience the entry angle "aha moment" (USBC's 6° finding) and the slow-motion strike chain reaction.

---

### Milestone M4: Lane Conditions (4 sessions)

**Goal**: All lane-related content and scenes shipped (Ch 7 + Ch 11)

| # | Session | Type | Status | Effort | Depends on | Handoff |
|---|---------|------|--------|--------|-----------|---------|
| M4.1 | Content Batch 6: Oil & Lane Reading | Content (4) | 🟡 STUB | 5-7h | M1.4 (oil overlay) | (promote when ready) |
| M4.2 | Content Batch 7: PBA Patterns | Content (5) | 🟡 STUB | 5-7h | M1.2 (oil data) | (promote when ready) |
| M4.3 | Scene Building Chapter 7 (Lane Conditions) | Scenes (6) | 🟡 STUB | 5-7h | M1.4 | (promote when ready) |
| M4.4 | Scene Building Chapter 11 (Reading the Lane) | Scenes (3) | 🟡 STUB | 3-4h | M1.4 | (promote when ready) |

**Sections in M4.1**: Oil Pattern Basics, House Shot, Rule of 31, Making Adjustments
**Sections in M4.2**: PBA Patterns, Sport Shots, Lane Transition, Lane Surfaces, Watching Ball Reaction
**Sections in M4.4 scenes**: Rule of 31, Watching Ball Reaction, Making Adjustments

**Definition of Done**: Readers can explore all 12 PBA patterns, see lane transition over games, and use the Rule of 31 calculator interactively.

---

### Milestone M5: Body Mechanics (6 sessions)

**Goal**: All figure-dependent chapters shipped (Ch 3, Ch 4, remaining Ch 5)

| # | Session | Type | Status | Effort | Depends on | Handoff |
|---|---------|------|--------|--------|-----------|---------|
| M5.1 | Content Batch 8: Release Refinement | Content (3) | 🟡 STUB | 4-6h | M1.3 (Figure) | (promote when ready) |
| M5.2 | Content Batch 9: Approach | Content (5) | 🟡 STUB | 5-7h | M1.3 | (promote when ready) |
| M5.3 | Content Batch 10: Swing | Content (5) | 🟡 STUB | 5-7h | M1.3 | (promote when ready) |
| M5.4 | Scene Building Chapter 3 (Approach) | Scenes (5) | 🟡 STUB | 5-7h | M1.3, M5.2 | (promote when ready) |
| M5.5 | Scene Building Chapter 4 (Swing) | Scenes (5) | 🟡 STUB | 5-7h | M1.3, M5.3 | (promote when ready) |
| M5.6 | Scene Building Chapter 5 (remaining release scenes) | Scenes (4) | 🟡 STUB | 4-6h | M1.3, M5.1 | (promote when ready) |

**Sections in M5.1**: Wrist Position, Follow-Through, One-Handed vs Two-Handed
**Sections in M5.2**: Stance & Setup, 4-Step Approach, 5-Step Approach, Timing, Drift
**Sections in M5.3**: The Pushaway, The Backswing, The Forward Swing, Free vs Muscled Swing, Swing Plane
**Scenes in M5.6**: Wrist Position, Follow-Through, One vs Two-Handed (axis-tilt and axis-rotation are already in M2.2)

**Definition of Done**: A reader can experience the full bowler journey — stance, approach, swing, release, follow-through — with figure visualizations at every step.

---

### Milestone M6: Ball Motion + Spares + Equipment + Two-Handed (9 sessions)

**Goal**: All remaining chapters shipped (Ch 2 remaining, Ch 6, Ch 9, Ch 10, Ch 12)

| # | Session | Type | Status | Effort | Depends on | Handoff |
|---|---------|------|--------|--------|-----------|---------|
| M6.1 | Content Batch 3: Ball Internals | Content (3) | 🟡 STUB | 4-6h | none | (promote when ready) |
| M6.2 | Content Batch 11: Ball Motion Down the Lane | Content (5) | 🟡 STUB | 5-7h | M1.1 | (promote when ready) |
| M6.3 | Content Batch 12: Spares | Content (4) | 🟡 STUB | 5-7h | none | (promote when ready) |
| M6.4 | Content Batch 13: Equipment Strategy | Content (4) | 🟡 STUB | 5-7h | none | (promote when ready) |
| M6.5 | Content Batch 14: Two-Handed | Content (4) | 🟡 STUB | 5-7h | M1.3 | (promote when ready) |
| M6.6 | Scene Building Chapter 6 (Ball Motion) | Scenes (5) | 🟡 STUB | 5-7h | M1.1, **BallPath component** | (promote when ready) |
| M6.7 | Scene Building Chapter 9 (Spares) | Scenes (4) | 🟡 STUB | 4-6h | M1.1, Pins ✅ | (promote when ready) |
| M6.8 | Scene Building Chapter 10 (Equipment) | Scenes (4) | 🟡 STUB | 4-6h | none | (promote when ready) |
| M6.9 | Scene Building Chapter 12 (Two-Handed) | Scenes (4) | 🟡 STUB | 4-6h | M1.3 | (promote when ready) |

**Sections in M6.1**: Core Design, Ball Motion: Skid-Hook-Roll, Weight & Drilling
**Sections in M6.2**: The Three Phases, Speed & Rev Rate Interaction, Breakpoint, Total Hook, Loft
**Sections in M6.3**: Why Spares Matter, The 3-6-9 System, Corner Pin Spares, Split Conversions
**Sections in M6.4**: Choosing Your First Ball, Building an Arsenal, Matching Ball to Oil, Surface Adjustments
**Sections in M6.5**: The Two-Handed Revolution, Grip & Release, Extra Rev Rate & Rotation, Body Mechanics

**Note**: M6.6 (Ball Motion scenes) requires a `<BallPath>` component that animates the ball traveling down the lane. This is a sub-feature that doesn't exist yet. Decision: build it as part of M6.6 OR as a separate sub-feature handoff. Defer the call until M6.6 is approached.

**Definition of Done**: All 53 content sections written, all corresponding scene components built. Roll Model is feature-complete.

---

### Milestone M7: v1.0 Launch (2-4 sessions)

**Goal**: Polish pass + mobile QA + performance audit + public announcement

| # | Session | Type | Status | Effort | Depends on | Handoff |
|---|---------|------|--------|--------|-----------|---------|
| M7.1 | Content Edit Pass (voice consistency review) | Polish | 🟡 STUB | 4-6h | M6 complete | (promote when ready) |
| M7.2 | Visual QA Pass + Mobile Testing | Polish | 🟡 STUB | 3-5h | M6 complete | (promote when ready) |
| M7.3 | Performance Audit + Optimization | Polish | 🟡 STUB | 3-5h | M6 complete | (promote when ready) |
| M7.4 | Pre-Launch Checklist + Public Announcement | Launch | 🟡 STUB | 2-3h | M7.1, M7.2, M7.3 | (promote when ready) |

**M7.1 scope**: Read every section, normalize voice across all 53 sections. Catch drift between batches. Ensure rev-rate.mdx feel is consistent everywhere.

**M7.2 scope**: Test on real iPhone, real Android, real iPad. Verify mobile content layout, tablet stacked layout, desktop split layout. Test in Safari, Chrome, Firefox.

**M7.3 scope**: Lighthouse audit. Bundle size analysis. 3D performance benchmarking on a mid-range laptop. Fix anything below the PRD performance budget.

**M7.4 scope**: Custom domain decision. Social meta tags. OG image. Sitemap. Robots.txt. Analytics decision (or skip). Announcement post for r/bowling. BowlingDigital outreach. USBC newsletter pitch.

**Definition of Done**: roll-model.vercel.app announced publicly, listed in r/bowling, mentioned to BowlingDigital and USBC. v1.0 shipped.

---

## Summary

| Milestone | Sessions | Status |
|-----------|----------|--------|
| M0 Foundation | (done) | ✅ |
| M1 Asset Foundation | 4 | 3 READY, 1 STUB |
| M2 Content Wave 1 | 4 | 3 READY, 1 STUB |
| M3 The Strike Chapter | 3 | 0 READY, 3 STUB |
| M4 Lane Conditions | 4 | 0 READY, 4 STUB |
| M5 Body Mechanics | 6 | 0 READY, 6 STUB |
| M6 Ball Motion + Spares + Equipment + 2H | 9 | 0 READY, 9 STUB |
| M7 v1.0 Launch | 4 | 0 READY, 4 STUB |
| **TOTAL** | **34** | **6 READY, 28 STUB** |

**Currently shipped**: 0 of 34 sessions (Handoff 01 is running but not yet committed)
**Currently READY**: 6 of 34 (handoffs 01-06 in `docs/handoffs/`)
**Currently STUB**: 28 of 34 (defined in this roadmap, full handoffs to be created on demand)

---

## How "Promotion" Works

When you're ready to run a STUB session, it gets PROMOTED to a full atomic-task handoff doc. The promotion process:

1. Pick the next STUB to run from this roadmap
2. Verify its dependencies are met (other sessions shipped, features built)
3. Open a fresh Claude Code session
4. Ask Claude to "promote roadmap entry M{X.Y} to a full handoff at `docs/handoffs/##-NAME.md`"
5. Claude reads this roadmap, the relevant spec docs, the relevant blueprints, and creates the full atomic handoff (~500-900 lines)
6. Claude commits the new handoff (separate commit from any actual work)
7. You then start a SECOND fresh session and run the new handoff using its master prompt
8. Update this roadmap to mark the entry as 🟢 READY (and eventually ✅ DONE)

**Why two-step instead of one-step**: Promoting a stub to a handoff is a research/design task. Executing the handoff is an implementation task. They're different cognitive modes and benefit from separate context windows.

**Why on-demand instead of all-upfront**: Many STUBs depend on features or learnings from earlier sessions. Promoting them prematurely creates handoffs that need rewriting after the dependent sessions ship. On-demand promotion incorporates lessons learned.

---

## Conductor Tasks (Handled by Handoff 07 in a Parallel Window)

Beyond the 34 sessions in the milestone roadmap above, there's a category of work that doesn't fit any single-purpose session handoff: sub-features, STUB promotions, status updates, refactoring, bug fixes, and documentation hygiene. **All of this is owned by Handoff 07 — the Conductor / Main Agent role.**

The conductor runs as a CONTINUOUS role in its own dedicated context window, in parallel with whichever single-purpose sessions (01-06) are active. It handles the connective tissue between dedicated sessions.

**See `07-CONDUCTOR-MAIN-AGENT.md`** for the full conductor role definition, sub-feature playbooks (8 of them: A-H), parallel-safety matrix, decision tree, and master prompt.

The conductor's playbook menu:

| Playbook | Task | Effort | Trigger |
|----------|------|--------|---------|
| A | Lane Oil Overlay Shader | 3-4h | After Handoffs 02 + 03 ship |
| B | BallPath Component | 3-4h | Before M6.6 |
| C | Pin Action Animation | 5-7h | Before M3.3 (BLOCKING) |
| D1 | Ball Coverstock Material Variants | 2h | Before M2.2 finishes |
| D2 | Ball Cutaway Visualization | 2h | Before Core Design scene |
| D3 | Ball Axis Arrow Visualization | 1.5h | Before Axis Rotation scene |
| E | Scorecard Component | 3-4h | Before M2.4 (Scene Building Ch 1) |
| F | Scene-Switcher Refactor | 3-4h | When scene count > 15 (around M4) |
| G | STATUS.md + Roadmap Update | 10-15min | After ANY session ships |
| H | STUB → Full Handoff Promotion | 1-2h | When a STUB's dependencies are met |

**Promotion process replaced**: The promotion process described elsewhere in this roadmap is now formally Playbook H of the conductor handoff. When you want a STUB promoted to a full handoff, invoke the conductor (Handoff 07) and tell it which entry to promote.

---

## Sub-Features That May Need Their Own Handoffs

Some scene-building sessions have sub-feature dependencies that aren't reusable assets. These may need their own mini-handoffs:

| Sub-Feature | Required by | Complexity | Approach |
|-------------|-------------|-----------|----------|
| **Lane Oil Overlay shader** | M1.4, M4 sessions | Medium | Could be part of M1.4 or its own handoff |
| **`<BallPath>` component** | M6.6 (Ball Motion scenes) | Medium | Likely its own mini-handoff |
| **Pin Action animation** | M3.3 (Strike scenes) | High | Definitely its own mini-handoff |
| **Ball cutaway visualization** | Core Design scene | Medium | Could enhance Ball component |
| **Ball coverstock material variants** | Coverstock Types scene | Low | Could enhance Ball component |
| **Ball axis arrow visualization** | Axis Rotation scene | Low | Could enhance Ball component |
| **Scorecard component** | How Scoring Works scene | Medium | Likely its own mini-handoff |
| **Animated approach figure cycling** | Ch 3 scenes | High | Built within scene-building session |

These are noted here so they're not forgotten. As we approach the sessions that need them, the corresponding promotion will surface the sub-feature as either part of the parent handoff or as its own dedicated handoff.

---

## Estimated Path to v1.0

If you run sessions sequentially at one per week:
- Total sessions: 34
- Time to v1.0: ~34 weeks (~8 months)

If you run sessions in parallel where possible (the parallel-safety matrix in `docs/handoffs/README.md` shows which can co-run):
- Effective sessions: ~22-26 wall-clock units
- Time to v1.0: ~6 months at one wall-clock unit per week

If two sessions per week with parallelism:
- Time to v1.0: ~3 months

The bottleneck is content batching — those serialize because they all touch `content-map.ts`. Asset and scene work parallelizes well.

---

## How to Use This Roadmap

### When starting a new session

1. Read `docs/STATUS.md` first (current state)
2. Read this roadmap to find what's next
3. Pick a 🟢 READY entry — open the linked handoff and run it
4. OR pick a 🟡 STUB whose dependencies are met — promote it first, then run it

### When finishing a session

1. Update this roadmap: mark the entry as ✅ DONE
2. Check if any 🟡 STUBs have had their dependencies met — they're now eligible
3. Update `docs/STATUS.md` with the new state

### When something is unclear

1. Read the relevant generic playbook in `docs/specs/` (08, 10, 11, 12, 13)
2. Read the PRD (`docs/specs/14-PRD.md`) for the broader context
3. Read this roadmap entry's "Depends on" column to verify dependencies
4. If still unclear, ASK before promoting/running

### When something blocks a session

1. Update its status to 🔴 BLOCKED in this roadmap
2. Add a note explaining what's blocking it
3. Identify and run the blocking session first
4. When unblocked, return to 🟡 STUB or 🟢 READY

---

## What's NOT in This Roadmap

These are deliberately out of scope for v1.0 (per PRD §7):

- Search functionality
- User accounts or saved progress
- Comments or community features
- Multi-language support
- Print stylesheets
- PDF export
- AR/VR mode
- Embedded video tutorials
- Quizzes or interactive exercises
- Native mobile apps
- Personalized ball recommendations
- Pro shop or equipment retail integration
- Live PBA tournament data
- Bowling form analysis from user video (that's Bowling Buddy)
- Social features

If you're tempted to add a session for any of these, STOP. They're explicitly out of scope. They become post-v1.0 considerations.

---

## The Master Promise

**Every session needed to ship Roll Model v1.0 is in this document.** If you're ever uncertain "what's next?" or "have we forgotten anything?", the answer is here. There is no work outside this roadmap that contributes to v1.0.

When v1.0 ships, this roadmap becomes a historical record. Post-v1.0 work gets its own roadmap (v1.1 considerations, new chapters, advanced features, etc.).

For now: 34 sessions stand between Roll Model and a public launch. 6 are READY. 28 are STUB. Nothing is missing. Nothing is lost.
