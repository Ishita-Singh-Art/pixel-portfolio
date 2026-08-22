# Pixel Portfolio — Site-Wide Upgrade Plan

> Phase: **"Creative Polish"** — a page-wise upgrade of the whole site to add
> motion, personality, and micro-interactions while staying inside the existing
> pastel theme (pink/blue/mint, glass cards, glow shadows, Space Grotesk + Inter,
> light/dark).
>
> This file is the single source of truth for this phase. It is updated after
> **every** page upgrade is executed. Check the status table before starting work.

---

## Status

| #   | Page / Area                | File(s)                                           | Status  | Notes                                |
| --- | -------------------------- | ------------------------------------------------- | ------- | ------------------------------------ |
| 1   | Skills                     | `src/routes/skills.tsx`                           | ✅ Done | Stat-sheet + hover-reveal + marquee  |
| 2   | Home                       | `src/routes/index.tsx`                            | ✅ Done | Hero polish, animated stats          |
| 3   | Projects list              | `src/routes/projects.index.tsx`                   | ✅ Done | Filter animation, card hover         |
| 4   | Project detail             | `src/routes/projects.$slug.tsx`                   | ✅ Done | Gallery lightbox, scroll reveal      |
| 5   | Experience                 | `src/routes/experience.tsx`                       | ✅ Done | Animated timeline                    |
| 6   | Resume                     | `src/routes/resume.tsx`                           | ✅ Done | Contact card polish                  |
| 7   | Shared (nav/footer/header) | `SiteNav.tsx`, `SiteFooter.tsx`, `PageHeader.tsx` | ✅ Done | Active-link indicator, scroll reveal |
| 8   | Theme / utilities          | `src/styles.css`                                  | ✅ Done | Shared animation utilities           |

Legend: ⬜ Planned · 🟡 In progress · ✅ Done

---

## Design Principles (apply to every page)

1. **Motion is earned** — animate on scroll-into-view (IntersectionObserver, the
   pattern already used in `OptimizedImage`), never on page load alone.
2. **Respect `prefers-reduced-motion`** — every animation must have a static fallback.
3. **Reuse the palette** — pink = primary, blue = secondary, mint = accent. No new colors.
4. **No new dependencies** — Tailwind + a little CSS + existing components only.
5. **Light + dark + mobile** — every change must work in all three.
6. **Data stays in `src/data/portfolio.ts`** — content edits never touch components.

---

## Page-by-page plan

### 1. Skills — `src/routes/skills.tsx` ⬜

**Concept:** "Game-artist stat sheet" — proficiency bars + hover-reveal specimen cards,
with an optional marquee hero band.

- [x] **Approach decision:** use a _sidecar_ `skillMeta` map (additive) instead of restructuring `skillGroups` — keeps `index.tsx` and the existing data shape untouched.
- [x] Add `skillMeta` sidecar map to `portfolio.ts` (optional `{ level, tag }` per skill name; fallback default).
- [x] New `SkillBar` component — icon + name + tag + animated gradient bar (IO-gated fill).
- [x] New `SkillMarquee` component — two counter-scrolling rows of icon chips (pause on hover).
- [x] Rewrite `skills.tsx` — specimen cards with ghost watermark icon, lift + glow on hover.
- [x] Add CSS utilities: `.skill-bar-fill`, `.marquee-track`, `.skill-card-hover`, `.ghost-icon`.
- [x] Add shared `Reveal` component + keyframes (foundation, also used by later pages).

### 2. Home — `src/routes/index.tsx` ✅

**Concept:** Keep the strong hero, add life to the sections below.

- [x] Hero: subtle entrance animation (fade + rise) on the headline/CTA.
- [x] "Quick stats" cards: staggered reveal + hover lift (count-up deferred — low value vs. effort).
- [x] Featured Work: hover lift + image zoom + a "view project" overlay.
- [x] CTA: soft gradient shimmer on hover.

### 3. Projects list — `src/routes/projects.index.tsx` ⬜

**Concept:** Smoother filtering + richer cards.

- [x] Filter buttons: animated active pill (transition), count per filter, hover border.
- [x] Cards: staggered fade-in on filter change (remount via `key={filter}`), hover lift + border glow.
- [x] Carousel: crossfade between media on swap (remount via `key={idx}`).

### 4. Project detail — `src/routes/projects.$slug.tsx` ⬜

**Concept:** ArtStation-style polish.

- [x] Hero: fade-in on load.
- [x] Gallery: click-to-enlarge lightbox (images) + scroll reveal per block.
- [x] Process blocks: reveal on scroll with a stagger.
- [ ] Sidebar: sticky already; add active-section highlight (optional).

### 5. Experience — `src/routes/experience.tsx` ⬜

**Concept:** Animated timeline.

- [x] Timeline dots: pulse/glow; entries slide in from the left on scroll.
- [x] Education cards: hover lift + accent border.
- [x] Connecting-line: reverted to a clean static line (scroll-draw looked janky); dots re-aligned dead-center on the line.

### 6. Resume — `src/routes/resume.tsx` ⬜

**Concept:** Contact card polish.

- [x] Contact rows: icon hover color shift + underline reveal.
- [x] Download button: add a subtle glow pulse.
- [x] PDF preview: add a loading skeleton / nicer frame border.

### 7. Shared components ✅

- [x] `SiteNav`: animated active-link underline + scroll-aware shadow.
- [x] `PageHeader`: fade + rise entrance on every page (single shared change).
- [x] `SiteFooter`: back-to-top button + hover transitions.

### 8. Theme / utilities — `src/styles.css` ✅

- [x] Add shared keyframes: `fade-up`, `fade-in`, `marquee`, `shimmer`, `pulse-glow`.
- [x] Add `@media (prefers-reduced-motion: reduce)` global guard.
- [x] Add a reusable `Reveal` wrapper component (IO-gated) to avoid repeating logic.

---

## Execution order

1. **Theme/utilities + `Reveal` component** (foundation everything else uses).
2. **Skills** (the original request — highest priority).
3. **Home** → **Projects list** → **Project detail** → **Experience** → **Resume**.
4. **Shared components** (nav/header/footer) last, so they inherit the final look.

---

## Verification checklist (run after every page)

- [ ] `bun run lint`
- [ ] `bun run build`
- [ ] `bun run format`
- [ ] Manual: light + dark, mobile collapse, `prefers-reduced-motion`, no CLS regressions.

---

## Change log (this phase)

<!-- Append an entry after each page upgrade is executed. -->

- **Skills page** — Rebuilt as a "game-artist stat sheet":
  - Added `skillMeta` sidecar map (`src/data/portfolio.ts`) — optional `{ level, tag }` per skill, additive/non-breaking.
  - New `SkillBar` component — icon + name + tag + animated gradient proficiency bar (IntersectionObserver-gated fill).
  - New `SkillMarquee` component — two counter-scrolling rows of skill chips (pause on hover, seamless loop).
  - New `Reveal` component — reusable IO-gated fade/rise wrapper (foundation for later pages).
  - Rewrote `skills.tsx` — specimen cards with ghost watermark icon, per-group accent hover border, staggered reveal.
  - Added CSS utilities + keyframes (`skill-bar-fill`, `marquee-track`, `skill-card-hover`, `ghost-icon`, `reveal`, `fade-up`, `pulse-glow`) and a global `prefers-reduced-motion` guard.
  - Verified: `bun run lint` (0 errors), `bun run build` (passes), `bun run format` (normalized CRLF → LF).

- **Home page** — Added motion and polish:
  - Hero: staggered fade-up entrance on eyebrow, name, title, tagline, and CTAs (`.animate-fade-up`).
  - "Quick stats" cards: staggered `Reveal` + hover lift (reused `.skill-card-hover`).
  - Featured Work: hover lift + image zoom + a "View project" overlay that fades in.
  - CTA: gradient shimmer sweep on the email button (`.shimmer`).
  - Added `.animate-fade-up` and `.shimmer` utilities to `styles.css`.
  - Verified: `bun run lint` (0 errors), `bun run build` (passes).

- **Projects list** — Smoother filtering + richer cards:
  - Filter buttons: animated active pill, per-filter count badge, hover border.
  - Cards: staggered fade-in on filter change (list remounts via `key={filter}`), hover lift + border glow.
  - Carousel: crossfade between media on swap (media remounts via `key={idx}`).
  - Added `.animate-fade-in` utility + `fade-in` keyframe to `styles.css`.
  - Verified: `bun run lint` (0 errors), `bun run build` (passes).

- **Project detail** — ArtStation-style polish:
  - Hero: fade-in on load.
  - Gallery: images are now click-to-enlarge (lightbox with backdrop blur + close button); each block reveals on scroll with a stagger.
  - Process blocks: reveal on scroll with a stagger.
  - Sidebar active-section highlight deferred (optional, low value).
  - Verified: `bun run lint` (0 errors), `bun run build` (passes).

- **Experience** — Animated timeline:
  - Timeline dots: pulsing glow (`.animate-pulse-glow`); entries reveal on scroll with a stagger.
  - Education cards: hover lift + accent border.
  - Connecting-line: reverted the scroll-draw gradient line (looked janky) to a clean static line; dots re-aligned dead-center on the line.
  - Added `.animate-pulse-glow` utility to `styles.css`.
  - Verified: `bun run lint` (0 errors), `bun run build` (passes).

- **Resume** — Contact card polish:
  - Contact rows: extracted a `ContactRow` component with icon + text color shift and a subtle background highlight on hover.
  - Download button: pulsing glow (`.animate-pulse-glow`).
  - Cards: staggered reveal (contact card + PDF preview).
  - Verified: `bun run lint` (0 errors), `bun run build` (passes).

- **Shared components** — Nav, header, footer:
  - `SiteNav`: animated active-link underline (slides in on hover, stays on active via `data-active`), scroll-aware shadow on the header.
  - `PageHeader`: staggered fade-up entrance on eyebrow/title/description (upgrades every page at once).
  - `SiteFooter`: back-to-top button + hover transitions.
  - Verified: `bun run lint` (0 errors), `bun run build` (passes).

- **Theme / utilities** — Marked complete (keyframes, reduced-motion guard, and `Reveal` were added earlier in this phase).
