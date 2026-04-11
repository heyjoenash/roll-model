# Roll Model — Deployment & CI/CD Specification

> **Status**: CANONICAL
> **Last Updated**: 2026-04-11

---

## Hosting

| Component | Platform | URL |
|-----------|----------|-----|
| Frontend + SSG | Vercel | roll-model.vercel.app (pending) |
| Repository | GitHub | github.com/heyjoenash/roll-model |
| Domain | Vercel | (custom domain TBD) |

## Vercel Configuration

### Project Setup

- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `next build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)
- **Node.js Version**: 20.x (LTS)
- **Team**: `team_ZY4gLEF15uPzcdstcK0YXc3d`

### Environment Variables

None required. Roll Model is a fully static/SSG site with no backend, no API keys, no database.

### Build Settings

The `next.config.ts` configures:
- MDX page extensions: `['ts', 'tsx', 'mdx']`
- Transpiled packages: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `leva`

### Vercel-Specific Considerations

1. **3D assets**: All currently procedural (no large files). When GLB models are added, they'll be in `public/models/` and served from Vercel's CDN.
2. **SSG**: All learn pages use `generateStaticParams()` for static generation. No server-side rendering at request time.
3. **Bundle size**: Three.js ecosystem is large (~500KB). Vercel's edge network mitigates this via CDN caching.

---

## GitHub Repository

### Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production branch, deploys to Vercel |
| Feature branches | Development work, PRs into main |

### Repository Settings

- **Default branch**: `main`
- **Visibility**: Public
- **GitHub Pages**: Disabled (using Vercel)

---

## CI/CD Pipeline

### GitHub Actions Workflow

**File**: `.github/workflows/ci.yml`

Runs on every push and PR to `main`:

1. **Lint**: `npm run lint` (ESLint)
2. **Type Check**: `npx tsc --noEmit` (TypeScript strict mode)
3. **Build**: `npm run build` (Next.js production build — catches SSG errors, MDX parse errors, import issues)

### Vercel Integration

Vercel auto-deploys from GitHub:

| Trigger | Deployment |
|---------|-----------|
| Push to `main` | Production deployment |
| PR opened/updated | Preview deployment (unique URL per PR) |
| PR merged to `main` | Production deployment |

Preview deployments allow testing 3D rendering and content changes before merging.

---

## Local Development

### Prerequisites

- Node.js 20+ 
- npm 10+

### Commands

```bash
npm install              # Install dependencies
npm run dev              # Dev server on port 6200 (Turbopack)
npm run build            # Production build
npm run start            # Production server on port 6200
npm run lint             # ESLint
npx tsc --noEmit         # Type check
```

### Port

**Always port 6200.** Configured in `package.json` scripts. If occupied:

```bash
lsof -ti :6200 | xargs kill   # Kill whatever's on 6200
npm run dev                     # Start fresh
```

Never use `pkill -f "next dev"` — it kills ALL Next.js servers across all projects.

---

## Build Verification Checklist

Before creating a PR:

- [ ] `npm run lint` — zero errors
- [ ] `npx tsc --noEmit` — zero errors  
- [ ] `npm run build` — successful build
- [ ] Dev server starts and pages load on http://localhost:6200
- [ ] 3D scene renders (ball visible, spinning, Leva controls work)
- [ ] SceneCue buttons work (click changes ball in 3D scene)
- [ ] Responsive: lg (split), md (stacked), sm (content only)
- [ ] No console errors in browser DevTools

---

## Asset Size Budget

| Category | Current | Target Max |
|----------|---------|-----------|
| JavaScript (first load) | ~600KB (Three.js heavy) | <800KB |
| CSS | ~30KB | <50KB |
| 3D models (GLB) | 0 (procedural) | <5MB total when added |
| HDRI/textures | 0 (Lightformers) | <3MB when added |
| MDX content | ~4KB (1 section) | Unlimited (SSG) |
| Total first load | ~650KB | <1MB (before 3D models) |

### Optimization Strategies

1. **Dynamic import** for SceneCanvas (`ssr: false`) — 3D code is code-split
2. **Turbopack** dev server for fast HMR
3. **Static generation** for all content pages
4. **PerformanceMonitor** drops DPR on weak GPUs
5. Future: lazy-load 3D scenes per chapter, tree-shake unused drei exports
