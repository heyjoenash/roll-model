# Implementation Plan: Hybrid Resizable Panels + Layout Toggle

> **Status**: ACTIVE
> **Created**: 2026-04-07
> **Depends on**: docs/specs/02-LAYOUT-AND-SCENE-CUES.md (scene context expansion — already shipped)
> **Supersedes**: The fixed side-by-side layout from the Phase 2 commit (41dd94a)

---

## Context

The fixed side-by-side layout (content 55% / 3D 45%) feels squished on laptop screens (1366-1440px). The 3D ball disappeared due to a CSS conflict (`lg:h-screen` vs `lg:h-auto` on the same element). Rather than fix the fixed split, we're upgrading to user-resizable panels with preset snap points and a toggle button.

## What We're Building

A three-panel layout using `react-resizable-panels`:

```
+----------+--- drag handle ---+----- drag handle -----+
| SIDEBAR  |  CONTENT          ‖  3D SCENE             |
| (fixed)  |  (resizable)      ‖  (resizable,          |
| 280px    |                   ‖   collapsible)         |
|          |  Scrolls          ‖  Sticky, fills height  |
|          |  independently    ‖  Leva controls inside  |
+----------+-------------------+------------------------+
```

- Drag handle between content and 3D lets users resize
- 3D panel is collapsible — drag past minimum to hide it
- Toggle button cycles between presets: Read / Split / Explore
- Layout persists to localStorage via `autoSaveId`
- Below `lg` breakpoint: stacked layout (3D on top, content below) — no resizing
- Below `md`: content only, mobile drawer sidebar

## Dependencies

```
npm install react-resizable-panels
```

- Version 4.9.0+ (current)
- ~4-5kb gzipped, zero peer deps beyond React
- React 19 compatible (hooks-based, no deprecated APIs)
- Requires `"use client"` (uses browser event listeners)

---

## Implementation Steps

### Step 1: Install react-resizable-panels

```bash
npm install react-resizable-panels
```

### Step 2: Create ResizableLayout client component

**File**: `src/components/layout/resizable-layout.tsx`

This is the core new component. It wraps `PanelGroup`, `Panel`, and `PanelResizeHandle` from the library.

```
"use client"

PanelGroup (direction="horizontal", autoSaveId="roll-model-layout")
  ├─ Panel (content — defaultSize=55, minSize=35)
  │    └─ scrollable content area with {children}
  ├─ PanelResizeHandle (styled drag handle, 6px wide)
  └─ Panel (3D scene — defaultSize=45, minSize=25, collapsible, collapsedSize=0)
       └─ SceneContainer (fills panel)
```

Key implementation details:
- `PanelGroup` uses `autoSaveId="roll-model-layout"` for localStorage persistence
- 3D Panel has `collapsible={true}`, `collapsedSize={0}`, `minSize={25}`
- When collapsed, the 3D panel is fully hidden and content gets 100%
- Use `ref` on both panels for programmatic resize (toggle button)
- Use `ref` on PanelGroup for `setLayout()` (preset snaps)

### Step 3: Create LayoutToggle component

**File**: `src/components/layout/layout-toggle.tsx`

A small button bar that sits in the content panel header (or floating). Three modes:

| Mode | Content % | 3D % | Behavior |
|------|-----------|------|----------|
| Read | 100 | 0 (collapsed) | Content full-width, 3D hidden |
| Split | 55 | 45 | Default balanced view |
| Explore | 30 | 70 | 3D dominant, content narrow |

Implementation:
- Uses `panelGroupRef.current.setLayout([contentSize, sceneSize])` for Split/Explore
- Uses `scenePanelRef.current.collapse()` for Read mode
- Uses `scenePanelRef.current.expand()` when leaving Read mode
- Active mode highlighted visually
- Passes refs down from ResizableLayout via context or props

### Step 4: Style the resize handle

**File**: part of `resizable-layout.tsx`

The drag handle needs to be visually discoverable but not distracting:
- 6px wide, subtle vertical line
- On hover: widen slightly, change color to primary/40
- On drag: change cursor to `col-resize`
- A small dot or grip indicator in the center

### Step 5: Update learn/layout.tsx

**File**: `src/app/learn/layout.tsx`

The learn layout becomes simpler — it delegates panel management to ResizableLayout:

```
Desktop (lg+):
  <div className="flex h-screen">
    <Sidebar />
    <ResizableLayout>{children}</ResizableLayout>
  </div>

Tablet (md to lg):
  Stacked: 3D on top (35vh), content below (scrollable)
  No resizing — fixed layout

Mobile (below md):
  Content only, MobileSidebar drawer
```

The ResizableLayout component only renders the PanelGroup on `lg+`. Below that, it renders a simple stacked layout.

### Step 6: Fix SceneContainer sizing

**File**: `src/components/layout/scene-container.tsx`

The scene container must fill its parent panel completely:
- `w-full h-full` — no fixed heights
- The parent Panel from react-resizable-panels gives it explicit dimensions
- Remove the old `h-[50vh]` / `h-[35vh]` / `lg:h-auto` confusion

### Step 7: Verify and test

- [ ] `npx tsc --noEmit` — zero errors
- [ ] Dev server: ball renders in the 3D panel (no disappearing)
- [ ] Drag handle resizes panels smoothly
- [ ] Drag 3D panel past minimum → collapses to 0
- [ ] Toggle: Read mode → content full-width, 3D hidden
- [ ] Toggle: Split mode → 55/45 split
- [ ] Toggle: Explore mode → 30/70 split
- [ ] Refresh page → layout persists from localStorage
- [ ] Resize window below lg → falls back to stacked layout
- [ ] Resize below md → content only with mobile drawer
- [ ] SceneCue clicks still work (context params → Leva)
- [ ] Leva controls still work independently
- [ ] `npm run build` succeeds

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/resizable-layout.tsx` | CREATE | PanelGroup + Panels + ResizeHandle |
| `src/components/layout/layout-toggle.tsx` | CREATE | Read/Split/Explore toggle button |
| `src/app/learn/layout.tsx` | MODIFY | Use ResizableLayout, simplify |
| `src/components/layout/scene-container.tsx` | MODIFY | Remove fixed heights, fill parent |
| `package.json` | MODIFY | Add react-resizable-panels dep |

## Files NOT Modified (preserved as-is)

- `src/components/layout/sidebar.tsx` — unchanged
- `src/components/layout/scene-canvas.tsx` — unchanged
- `src/components/layout/scene-switcher.tsx` — unchanged
- `src/components/3d/*` — all 3D components unchanged
- `src/components/content/*` — SceneCue, Callout, mdx-components unchanged
- `src/lib/scene-context.tsx` — unchanged (sceneParams already implemented)
- `content/the-release/rev-rate.mdx` — unchanged
- `src/app/learn/[...slug]/page.tsx` — unchanged

---

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| react-resizable-panels React 19 issue | Low | Test immediately after install; library uses standard hooks API |
| Canvas sizing inside Panel | Medium | Panel provides explicit pixel dimensions; Canvas needs parent with explicit height |
| Leva panel z-index with drag handle | Low | Leva renders in portal outside Canvas; z-index is independent |
| autoSaveId SSR flicker | Low | defaultSize provides server-rendered layout; localStorage override on client is instant |
| Stacked fallback on tablet loses resize | None | Intentional — resizing requires pointer precision that touch lacks |
