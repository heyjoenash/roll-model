# Roll Model — Product Requirements Document

> **Status**: CANONICAL
> **Created**: 2026-04-13
> **Purpose**: The single source of truth for what Roll Model is, who it's for, what success looks like, and what's explicitly out of scope. Every session handoff cross-references back to this document.

---

## 1. Product Vision

Roll Model is **the interactive 3D bowling encyclopedia that doesn't exist anywhere yet**. Every bowling concept — rev rate, axis tilt, oil patterns, pin action, the 4-step approach — paired with a manipulable 3D visualization. The reader scrolls through educational content and clicks inline buttons that change what the 3D scene shows.

Think: **the best bowling textbook that never existed, but interactive and in 3D.**

### Why It Has to Exist

1. **Bowling is genuinely 3D.** Text descriptions of "axis tilt" or "ball motion phases" are hard to understand without seeing them. A 3D ball with a visible axis line and a 0°→90° slider creates instant understanding that no paragraph can match.

2. **The content gap is real.** Bowling instruction is stuck in YouTube videos (passive, hard to navigate), text articles with 2D diagrams (hard to visualize 3D concepts), and in-person coaching (expensive, not scalable). Nothing combines depth + interactivity + browseability.

3. **The research already exists.** 11,908 lines of deeply-sourced bowling science from biomechanics to lane physics to coaching pedagogy. The hard part (research) is done. The opportunity is delivery.

4. **It's free and open.** Could become the canonical learning resource for the 67.3 million annual bowlers in the US alone.

### Strategic Position

Roll Model is **content-first 3D**, not "3D-first technology demo." Every visual effect serves the explanation. The design north stars are Shopify Editions and Stripe Press: premium quality, restraint over flash, the 3D illustrates the words rather than competing with them.

---

## 2. Personas

### Primary: The New Custom-Ball Owner ("Joe")

- **Who**: A recreational bowler (avg ~150) who just bought their first custom-drilled reactive ball. Wants to understand what they bought and how it works.
- **Context**: Reads Roll Model on their phone at the bowling alley between games, or on a laptop at home in the evenings.
- **Pain**: Their pro shop explained "this ball has 2.51 RG and 0.045 differential" but they have no idea what those numbers mean. YouTube tutorials are 30 minutes long and they only need 5 minutes of one. Bowling forums are full of jargon they can't decode.
- **Goal**: Understand their ball + their release well enough to talk knowledgeably with a coach and improve faster.
- **Quote**: "I bought this thing for $250 and I want to actually understand what it does."

### Secondary: The Returning Bowler ("Pat")

- **Who**: Someone who used to bowl in high school or college, hasn't bowled in 10 years, just joined a league. Knows the basics but the equipment world has changed completely.
- **Context**: Coming back to the sport, wants a refresher plus updates on what's new.
- **Pain**: "Two-handed" wasn't really a thing when they last bowled. Modern coverstocks are confusing. Oil patterns were never something they had to think about. Wants to ramp up quickly.
- **Goal**: Modernize their understanding without starting from scratch.

### Tertiary: The Coach or Teacher ("Coach Mike")

- **Who**: A local league coach or junior bowling instructor who needs visual aids to explain concepts to students.
- **Context**: Pulls up Roll Model on a tablet during practice to show a student "this is what your axis tilt looks like."
- **Pain**: Whiteboards and stick-figure drawings only go so far. Wants something that students can also use independently between lessons.
- **Goal**: A free teaching tool that reinforces what they explain in person.

### Anti-Personas (NOT the target)

- **Pro tour bowlers** — they already know all this; they don't need a textbook
- **People who only bowl once a year at a birthday party** — they don't care enough to invest in learning
- **Pure tech enthusiasts looking for a 3D demo** — Roll Model is content-first; if you want a tech demo, look elsewhere

---

## 3. User Journeys

### Journey 1: First Visit (Discovery)

```
1. User lands on roll-model.vercel.app
2. Sees the landing page: title, brief tagline, "Start Learning" CTA
3. Clicks "Start Learning"
4. Lands on /learn/the-release/rev-rate (default first section)
5. Sees split layout: content on left, spinning bowling ball on right
6. Reads the opening paragraph about rev rate
7. Clicks first SceneCue button: "See it: Gentle 150 RPM roll"
8. Watches the ball slow down dramatically, ball turns green
9. Has a "wait, that's cool" moment — the content reacts to what they read
10. Continues reading, clicks more SceneCues, plays with Leva controls
11. Spends 5-8 minutes on the page
12. Either: navigates to another section via sidebar, or closes the tab and remembers it
```

**Success state**: User experiences the "aha moment" within the first 60 seconds of seeing the rev-rate page. They understand the SceneCue interaction model without instruction.

**Failure states**:
- Page takes >3 seconds to load → user bounces
- 3D scene fails to render → user sees an empty panel and leaves
- SceneCue buttons aren't visually obvious → user reads without interacting
- Mobile experience is broken → 50% of traffic lost

### Journey 2: Return Visit (Self-Directed Learning)

```
1. User comes back the next day, having remembered the site from yesterday
2. Lands on the homepage or directly on a previously-visited section
3. Uses the sidebar to navigate to a new chapter (e.g. "The Ball")
4. Reads through 2-3 sections in one sitting
5. Returns to a previous section to re-check a fact
6. Uses Leva controls to explore parameter ranges they didn't try the first time
7. Total session: 15-25 minutes
```

**Success state**: User has a personal learning loop — the site is sticky enough that they come back without prompting.

### Journey 3: At-the-Alley Reference

```
1. User is at the bowling alley between games
2. Pulls up Roll Model on their phone
3. Wants to look up "what's a flat 10 again?"
4. Either: searches/navigates to Chapter 8 → Common Pin Leaves
5. Reads the explanation in <2 minutes
6. Returns to the lane with the answer
```

**Success state**: Mobile experience works. Content is scannable. Sections are short enough to consume in <5 minutes.

### Journey 4: The Coach Demonstration

```
1. Coach pulls up Roll Model on a tablet during a coaching session
2. Has student stand next to them
3. Navigates to the section relevant to the lesson (e.g. "Axis Tilt")
4. Hands the tablet to the student to manipulate the 3D scene
5. Student plays with the tilt slider while coach explains
6. They move on to the next concept
```

**Success state**: The site enhances real-world coaching rather than replacing it. The 3D is touch-friendly enough for tablet use.

---

## 4. Functional Requirements

### FR-1: Educational Content
- 53 content sections across 12 chapters covering bowling science end-to-end
- Each section is a `.mdx` file in the `content/` directory
- Content rendered via Next.js App Router dynamic route `/learn/[chapter]/[section]`
- Custom MDX components: `<Callout>` (key/pro-tip/warning/note variants) and `<SceneCue>` (interactive scene control buttons)
- Content map registers every section with title, chapter, scene name, and description

### FR-2: Interactive 3D Scenes
- Each content section paired with a corresponding 3D scene
- Scenes reuse a small library of assets: Ball, Pins, Lane, Figure
- Each scene exposes Leva controls for runtime parameter manipulation
- SceneCue buttons in MDX content push parameters into the active scene's Leva controls
- Premium visual quality: clearcoat materials, Lightformer studio environment, post-processing (N8AO, Bloom, AgX tone mapping), adaptive DPR

### FR-3: Split-Panel Reading Experience
- Desktop: resizable two-column layout with content left, 3D scene right
- Three layout modes: Read (content only), Split (default 55/45), Explore (3D dominant 30/70)
- Tablet: stacked layout with 3D on top (~35vh), content below
- Mobile: content only, no 3D, mobile sidebar drawer
- Sidebar: collapsible chapter navigation, persists across sessions

### FR-4: Cross-Section Navigation
- Sidebar lists all 12 chapters with expandable sections
- Active section highlighted
- Each section's URL is shareable (`/learn/the-release/rev-rate`)
- Static-site generation pre-renders every section at build time

### FR-5: Asset Architecture for Future Upgrades
- Reusable 3D assets behind stable interfaces (`<Ball />`, `<Pins />`, `<Lane />`, `<Bowler />`)
- Implementation-swap pattern: today's primitive prototypes → tomorrow's GLB models from a 3D team, without touching scenes or content

---

## 5. Non-Functional Requirements

### NFR-1: Performance
- **First Contentful Paint** under 1.5 seconds on a mid-range laptop on broadband
- **Time to Interactive** under 3 seconds
- **Frame rate** in 3D scenes: maintain 60fps on a 2020-era laptop GPU
- **Adaptive degradation**: PerformanceMonitor drops DPR from 2 to 1 if frame rate falls below 90% of refresh rate
- **JavaScript first-load** under 800KB (Three.js stack is heavy; this is the upper bound)
- **Mobile**: 3D is hidden on mobile to keep the experience fast and reduce bandwidth

### NFR-2: Browser Support
- **Tier 1** (full experience): Chrome/Edge/Brave latest, Safari 16+, Firefox latest. WebGL2 required.
- **Tier 2** (graceful degradation): older browsers see content but may have rendering issues — they get the text, lose the 3D
- **No support** for IE11 or anything pre-WebGL2

### NFR-3: Accessibility
- Content is real semantic HTML (headings, paragraphs, lists, tables) — screen readers work
- 3D scenes are decorative enhancement, not the only path to information; the prose carries the content
- Keyboard navigation works for sidebar and all content links
- Color contrast meets WCAG AA on text and interactive elements
- `prefers-reduced-motion` respected (animations slowed or disabled)
- Note: The 3D scenes themselves are NOT accessible to screen readers — that's an acceptable tradeoff because the content panel carries all the educational value

### NFR-4: Visual Quality
- "Shopify Editions / Stripe Press level" — premium feel, restrained polish
- All 3D uses MeshPhysicalMaterial with clearcoat where applicable
- Lightformer-based environment for studio-quality reflections
- Post-processing pipeline: N8AO ambient occlusion, Bloom, Vignette, AgX tone mapping, SMAA
- Dynamic accent lighting that responds to content state (the Stripe Press trick)

### NFR-5: Maintainability
- Every asset behind a swappable interface (see spec 09)
- Spec documentation kept current (spec 00 acts as master index)
- Self-contained session handoffs for every recurring session type
- TypeScript strict mode; zero `any` in production code
- Build (`npm run build`) and type-check (`npx tsc --noEmit`) must pass before any commit

### NFR-6: Content Voice Consistency
- Every section follows the voice rules in spec 08 (Content Batching Handoff)
- The `rev-rate.mdx` file is the canonical voice reference
- 11 forbidden phrases (academic language) explicitly banned

---

## 6. Success Metrics

### Launch Metrics (v1.0 release)
- All 53 content sections written and published
- All 12 chapter sidebar items navigable
- Top 10 most important scenes built (per session-13 priority order)
- All 4 reusable assets shipped (Ball, Pins, Lane, Figure)
- Mobile-friendly (responsive layout works)
- `npm run build` clean, no console errors in production

### Quality Metrics
- A reader can complete Journey 1 (first visit aha moment) without confusion
- A reader can complete Journey 3 (at-alley reference) on mobile
- Content reads aloud naturally (not academic)
- 3D scenes never crash or fail to render
- Performance budget met on a mid-range device

### Growth Metrics (post-launch, aspirational)
- 10,000 unique visitors in the first 6 months
- 50% return visit rate within 30 days
- Average session duration > 5 minutes
- Featured in r/bowling, BowlingDigital, BTM, USBC newsletter
- Mentioned by at least one PBA pro on social media

---

## 7. Definition of Done

### What "Done" means for v1.0 launch

A reader landing on roll-model.vercel.app must be able to:

1. **Read** at least one production content section (rev-rate already qualifies)
2. **Navigate** to any chapter via the sidebar
3. **See** a 3D scene next to every content section (even if the scene is the default ball, no broken pages)
4. **Interact** with 3D scenes via SceneCue buttons and Leva controls
5. **Resize** the content/3D split on desktop
6. **Use** the site on mobile (content only, no broken layout)
7. **Share** any URL and have it load directly to that section

For full v1.0, ALL 53 sections must be written and ALL their primary 3D scenes built. Until then, the site is in pre-launch / closed beta.

### What's NOT required for v1.0

- Search functionality (post-launch)
- User accounts or saved progress (post-launch)
- Comments or community features (post-launch)
- Multi-language support (English only)
- Print stylesheets (skip)
- PDF export (skip)
- AR/VR mode (skip)
- Embedded video tutorials (skip — the 3D IS the tutorial)
- Quizzes or interactive exercises (post-launch consideration)
- Comparison with the user's own video (that's Bowling Buddy, the parent project)

### Out of Scope (Hard Boundaries)

These will NOT be part of Roll Model under any circumstances:

- **Personalized ball recommendations** (legal/liability concerns)
- **Pro shop or equipment retail integration** (commercial conflict of interest)
- **Live PBA tournament data** (out of scope, separate domain)
- **Bowling form analysis from user video** (that's Bowling Buddy)
- **Social features** (focused educational tool, not a community platform)
- **Native mobile apps** (web-only)

---

## 8. Milestones and Roadmap

### Milestone 0: Foundation (DONE)
- Repo, deployment, premium 3D rendering pipeline, one production content section, prototype sandbox with Pins
- Status: ✅ Complete as of 2026-04-12

### Milestone 1: Asset Foundation (NEXT — ~3 sessions)
- Build the Lane asset (session 10)
- Build the oil pattern data library (session 12)
- Build the Figure asset (session 11)
- **Definition of Done**: All 4 reusable assets exist, swappable interface pattern verified, prototype sandbox shows all assets together

### Milestone 2: Content Wave 1 — The Easy Stuff (~4 sessions)
- Content Batch 1: Custom Ball Owner Cluster (5 sections, session 08)
- Scene Building: Chapter 2 (6 scenes, session 13)
- Content Batch 2: Foundation Cluster (4 sections, session 08)
- Scene Building: Chapter 1 (4 scenes, session 13)
- **Definition of Done**: 10 content sections live, 10 scenes built, ~20% of project shipped

### Milestone 3: The Strike Chapter (~3 sessions)
- Content Batch 4: Strike Physics Cluster (4 sections)
- Content Batch 5: Pin Leaves + Perfect Game (2 sections)
- Scene Building: Chapter 8 (6 scenes)
- **Definition of Done**: Chapter 8 fully shipped — this is the most "wow" chapter (entry angle, pin action, pocket physics)

### Milestone 4: Lane Conditions (~3 sessions)
- Content Batch 6: Oil & Lane Reading (4 sections)
- Content Batch 7: PBA Patterns (5 sections)
- Scene Building: Chapter 7 (6 scenes), Chapter 11 (3 scenes)
- **Definition of Done**: All lane-related content and scenes shipped

### Milestone 5: The Body Mechanics (~5 sessions)
- Content Batch 8: Release Refinement (3 sections)
- Content Batch 9: Approach (5 sections)
- Content Batch 10: Swing (5 sections)
- Scene Building: Chapter 3 (5 scenes), Chapter 4 (5 scenes), Chapter 5 (4 remaining scenes)
- **Definition of Done**: All figure-dependent chapters shipped

### Milestone 6: Ball Motion + Spares + Equipment + Two-Handed (~4 sessions)
- Content Batch 11: Ball Motion (5 sections)
- Content Batch 12: Spares (4 sections)
- Content Batch 13: Equipment Strategy (4 sections)
- Content Batch 14: Two-Handed (4 sections)
- Scene Building: Ch 6, 9, 10, 12 (~17 scenes total)
- **Definition of Done**: All 53 sections complete

### Milestone 7: v1.0 Launch (~2 sessions)
- Polish pass: visual QA, content edit pass for voice consistency
- Mobile testing on real devices
- Performance audit
- Pre-launch checklist (analytics if added, social meta tags, OG images)
- Public announcement
- **Definition of Done**: roll-model.vercel.app announced publicly, listed in r/bowling, mentioned to BowlingDigital, USBC

### Total Estimate

~24 focused sessions to v1.0. At one session per week, that's ~6 months. At two sessions per week, ~3 months.

---

## 9. Risk Register

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-1 | 3D performance falls below 60fps on lower-end devices | Medium | High | PerformanceMonitor adaptive DPR (already implemented). Asset complexity budget enforced. Mobile has 3D disabled. |
| R-2 | Content voice drifts as different sessions write different sections | High | Medium | Spec 08 voice guide; rev-rate.mdx as canonical reference; explicit forbidden-phrases list. Periodic edit pass to normalize. |
| R-3 | Asset complexity escalates and Lane/Figure take much longer than estimated | Medium | High | Spec 09 explicitly chose primitive prototypes over realism; sessions 10-11 enforce scope discipline. Can defer features without blocking content. |
| R-4 | Browser compatibility issues with R3F 9.0.0-rc.10 (release candidate) | Low | Medium | Pin to a stable version; test on Chrome, Safari, Firefox before each release. Watch for R3F GA release. |
| R-5 | The interaction blueprints (spec 07) prove unbuildable in some sections | Medium | Medium | Each blueprint has been roughly checked for feasibility but not stress-tested. Adjust blueprint if scene proves infeasible — blueprint is canonical until contradicted. |
| R-6 | Content reads as AI-generated despite voice guide | High | High | Voice guide explicitly addresses this. Each section gets a manual read-aloud test. The user (a bowler) reviews each batch. |
| R-7 | Mobile experience is afterthought and fails Journey 3 | Medium | High | Mobile sidebar drawer already implemented. Content is real markdown so it inherently works. Test on actual phone before each milestone. |
| R-8 | Vercel free tier limits hit (build minutes, bandwidth) | Low | Low | Static SSG site is extremely Vercel-friendly. Could move to Cloudflare Pages if needed. |
| R-9 | The 11,908 lines of research aren't enough to write 53 sections | Low | High | Verified during spec 08 creation — every section has source material. Some thinner sections noted; can be supplemented from `01-bowling-science-reference.md`. |
| R-10 | Solo developer burnout / project stalls mid-build | High | Critical | Session-based architecture means project can pause and resume cleanly. Self-contained handoffs mean a future Joe can pick up where left off without losing context. |
| R-11 | High-end 3D team deliverables never arrive | Low | Low | The interface pattern means the prototype assets ARE shippable. Roll Model can launch with primitives; 3D upgrades are pure polish. |
| R-12 | Bowling community rejects it as "for beginners" | Low | Medium | Position correctly: it's an encyclopedia, not a tutorial. Even pros can use the interactive references. |

---

## 10. Cross-Reference: How Sessions Map to Requirements

Every session handoff doc contributes to specific PRD requirements. This mapping ensures no session is "make-work" — every session ships verifiable progress against this PRD.

| Session Doc | Serves Requirement(s) | Milestone |
|-------------|----------------------|-----------|
| **08 — Content Batching** | FR-1 (educational content), NFR-6 (voice consistency) | M2, M3, M4, M5, M6 |
| **10 — Lane Asset** | FR-2 (interactive 3D scenes), FR-5 (asset architecture), NFR-4 (visual quality) | M1 |
| **11 — Figure Asset** | FR-2, FR-5, NFR-4 | M1 |
| **12 — Oil Pattern Data** | FR-2 (lane scene functionality) | M1 |
| **13 — Scene Building** | FR-2 (interactive 3D scenes per section) | M2, M3, M4, M5, M6 |

When a future session is unclear about its purpose, the answer is always: it serves these requirements toward this milestone toward this user journey toward this persona's success.

### Acceptance Criteria Per Session Type

Beyond each handoff doc's verification checklist, sessions must satisfy these acceptance criteria tied to the PRD:

**Content Batching session (doc 08)**
- All 5 sections in the batch follow the voice guide
- All SceneCue params match the interaction blueprint verbatim
- Each section answers a specific question the primary persona ("Joe") would ask
- `npm run build` clean

**Asset Building session (docs 10, 11)**
- The asset's public interface matches the spec in doc 09
- The asset can be used by future scene components without internal knowledge
- The prototype sandbox at `/learn/prototypes` visually demonstrates the asset
- TypeScript clean, build clean

**Oil Data session (doc 12)**
- All 11 patterns defined with plausible data
- TypeScript types prevent invalid usage at compile time
- `getPattern("house-shot")` and `ruleOf31(40)` return correct values

**Scene Building session (doc 13)**
- Every scene in the target chapter is registered in the scene-switcher
- Every scene's Leva controls and SceneCue params match the interaction blueprint
- The corresponding content section's SceneCue buttons visibly affect the scene
- Camera angle matches the blueprint's "What the user sees on load" description

---

## 11. Verification — How We Always Check the Work

Every session, regardless of type, verifies in this order:

1. **`npx tsc --noEmit`** — TypeScript clean. Catches type errors before runtime.
2. **`npm run build`** — Production build clean. Catches MDX parse errors, SSG issues, import errors that the dev server might miss.
3. **`curl -s -o /dev/null -w "%{http_code}" http://localhost:6200/learn/{route}`** — HTTP 200 on every new route.
4. **Visual inspection at `http://localhost:6200`** — The dev server is always on port 6200. Open it. Look at the page. Click things.
5. **Browser console check** — DevTools open, no red errors.
6. **Mobile responsive check** — Resize the window narrow. Layout shouldn't break.
7. **Read content aloud** (for content sessions) — Sounds conversational? Doesn't sound like ChatGPT?

The user reviews every commit before pushing. Pushes go to main, which auto-deploys to roll-model.vercel.app via Vercel's GitHub integration.

---

## 12. The Larger User Experience (How It All Fits)

Imagine a user hitting `roll-model.vercel.app` for the first time, six months from now when v1.0 is shipped:

1. They land on the homepage. Clean dark theme, single CTA.
2. They click "Start Learning" and land on Rev Rate (or whatever section is the default first).
3. The split layout immediately shows them the connection: text on the left, spinning ball on the right.
4. They read for ~30 seconds. The opening hook makes them care.
5. They see the first SceneCue button: "See it: Gentle 150 RPM roll." They click it. The ball dramatically slows, turns green. The accent light shifts. They have their first "wait, that's cool" moment within 60 seconds.
6. They read on. More SceneCues. They start dragging the Leva slider themselves.
7. After 5-8 minutes they've finished the section and learned something concrete. They hit the sidebar and explore another chapter.
8. They spend 15-25 minutes on the site. They bookmark it. They come back tomorrow.
9. Two weeks later they pull it up on their phone at the bowling alley to look up "what's a flat 10 again?" and find the answer in 90 seconds.
10. They tell another bowler. They share a URL on r/bowling.
11. The site has earned a place in their actual bowling life — not just a thing they read once, but a reference they return to.

**That's the user experience we're building toward.** Every session, every line of MDX, every Leva slider, every SceneCue param exists to serve that experience.

When a future session asks "is this the right thing to build?" the answer is: does it move us closer to the moment when a real bowler bookmarks roll-model.vercel.app and comes back the next day? If yes, ship it. If no, defer it.
