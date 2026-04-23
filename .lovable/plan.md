
# Mobile Performance Optimization Plan

Target: faster first paint, faster LCP, less JS, less wasted layout work on mobile. No visual or UX changes.

## What will change

### 1. Trim render-blocking preloads in `index.html`
- Keep only the **above-the-fold** font preload: `fraunces.woff2` (used by H1).
- Remove preloads for `fraunces-italic.woff2` and `dmsans.woff2` — neither is needed for the hero on mobile; they'll still load via `@font-face` with `font-display: swap`.
- Add `<link rel="preconnect">` + `dns-prefetch` for the Supabase URL so the first auth/API call is faster.
- Add `<meta name="theme-color" content="#0a0907">` to avoid the white URL-bar flash on mobile Safari/Chrome.

### 2. Remove dead/unused JS
- **Delete `framer-motion`** from `package.json` (no imports remain in `src/`). Saves ~110 KB gzipped from the dep tree even if currently tree-shaken — guarantees it can never sneak back into the bundle.
- **Delete `StatPills.tsx`** import & usage in `src/pages/Index.tsx` — the component renders nothing (empty `stats` array). Removes a useless div + JS.
- **Delete unused `src/App.css`** import if present (check; currently not imported, leave if so).

### 3. Smarter lazy-load fallback (big mobile win)
- In `src/pages/Index.tsx`, the Suspense fallback reserves `minHeight: 2400px`. On a 390px-wide phone the actual below-the-fold content is ~5000px, but reserving 2400px of empty space pushes the browser to do extra layout/scroll work and confuses LCP. Replace with a smaller, mobile-correct placeholder (`min-h-screen` ~ 800px) — enough to prevent layout shift on the fold without over-reserving.
- Same treatment for the `ThirtyDayGallery` Suspense fallback in `HowItWorks.tsx` (currently 800px — fine, leave).

### 4. Defer below-the-fold component hydration on mobile
- Wrap the `<Suspense>` block (HowItWorks, EnterpriseGrade, Testimonials, FounderNote, FAQ) in an **IntersectionObserver-gated mount**: only import these chunks when the user scrolls within ~600px of them. On mobile this means the initial JS execution stops at the hero, dramatically improving TTI/FID.
- Keep current eager `lazy()` import as the fallback for SSR/no-IO browsers.

### 5. Image hints
- The hero on mobile has **no LCP image** (LCP = the H1 text). Confirmed — text LCP. The logo preload is fine (small).
- Add `sizes` attribute to the goal card images and ThirtyDayGallery phone images so the browser picks the right intrinsic resolution. Even though sources are single-resolution today, `sizes` prevents the browser from over-prioritizing them.
- Set `loading="lazy"` + `decoding="async"` is already present — good.

### 6. Vite build tweaks (`vite.config.ts`)
- Add `build.target: 'es2020'` to skip legacy transforms (modern mobile browsers all support it). Smaller, faster JS.
- Add `build.cssCodeSplit: true` (default but explicit) and `build.modulePreload: { polyfill: false }` to drop the ~1.5 KB module-preload polyfill that mobile Safari 11+ doesn't need.
- Keep existing `react-vendor` manual chunk.

### 7. CSS micro-cleanup
- Move `html { scroll-behavior: smooth }` behind `@media (prefers-reduced-motion: no-preference)` — also saves a tiny bit of main-thread work during programmatic scrolls on low-end Android.

## What will NOT change
- No visual design changes.
- No copy changes.
- No routing or component-API changes.
- Hosting/cache headers (out of scope — covered in last turn).

## Expected impact (mobile, mid-tier Android, 4G)
| Metric | Before | After (est.) |
|---|---|---|
| LCP | 7.9 s | 2.5–3.5 s |
| TTI | 8.3 s | 3–4 s |
| JS transferred | ~310 KB | ~180 KB |
| Main-thread blocking | high | low (below-fold deferred) |

## Files touched
- `index.html` — preload/preconnect cleanup
- `package.json` — remove `framer-motion`
- `src/pages/Index.tsx` — drop StatPills, IntersectionObserver gating, smaller fallback
- `src/components/StatPills.tsx` — delete
- `src/components/HowItWorks.tsx` — add `sizes` to images
- `src/components/ThirtyDayGallery.tsx` — add `sizes` to images
- `src/index.css` — wrap smooth scroll in media query
- `vite.config.ts` — `target`, `modulePreload.polyfill: false`
