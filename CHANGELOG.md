# Changelog

All notable changes to the Pixel Portfolio project.

## [Unreleased] — 2026-08-21

### Added
- **`OptimizedImage` component** (`src/components/OptimizedImage.tsx`) — Drop-in `<img>` replacement that enforces modern performance hints:
  - `loading="lazy"` by default (opt out with `eager` for above-fold/LCP images)
  - `decoding="async"` so image decode never blocks the main thread
  - `fetchPriority` forwarding (React's JSX type system drops `fetchpriority` unless forwarded manually)
  - Explicit `width`/`height` to prevent CLS layout shift
  - IntersectionObserver gating — defers the real `src` attach until ~200px from the viewport (stricter than native lazy on mobile Safari / older Chromium)
  - Fade-in on load (200ms opacity transition) to eliminate FOUC on slow Drive thumbnails
  - User-gesture safety net (scroll/touch/mousemove) so wrapped anchor clicks aren't missed
  - `onError` fallback that reveals the image so layout doesn't collapse on transient Drive failures
- **`LazyIframe` component** (`src/components/LazyIframe.tsx`) — Lazy-mounting iframe for Google Drive `/preview` embeds. Holds a skeleton placeholder ("Loading video…") until the element scrolls within 200px of the viewport, then attaches the real `src`. Drive's player + control bar pulls ~300KB of JS, so eager-mounting several starves the image bandwidth budget. Defaults to 4:3 aspect ratio (matches Drive's native 640×480 player + controls).
- **New project: "Low-Poly Boiler — Stylized Game Prop"** — Added to `src/data/portfolio.ts` as a featured 3D project with full description, challenge/solution breakdown, Drive folder link, and two thumbnail images.
- **Drive image preconnect** — Added `preconnect` + `dns-prefetch` for `drive.google.com` and `lh3.googleusercontent.com` in `__root.tsx`, cutting DNS+TLS+TCP cost from ~300–800ms to ~50ms on first paint.

### Changed
- **`MediaRenderer` now uses `OptimizedImage` / `LazyIframe`** — Images route through `OptimizedImage` (with a muted background color to prevent CLS while thumbnails stream in), and framable videos route through `LazyIframe` (lazy-mounted via IntersectionObserver). Added a `fetchPriority` prop.
- **Home page hero** — Switched to `OptimizedImage` with `loading="eager"`, `fetchPriority="high"`, and `skipLazyMount` (it's the LCP image).
- **Featured Work cards** — First card's thumbnail is eager + high priority; the rest stay lazy. Added explicit `width`/`height` (1280×720) to prevent CLS. Video iframes now set `loading="lazy"`.
- **Projects list carousel** — First project's media is eager + high priority; the rest lazy. Images switched from `object-cover` to `object-contain` (with `bg-muted` letterbox bars) so full paintings are visible instead of cropped. Added explicit `width`/`height` (1920×1920). Videos now use `LazyIframe`.
- **Project detail gallery** — All gallery items below the hero are now lazy + IO-gated (previously the first gallery item was eager).
- **"Old School Signal" radio project** — Removed "Marmoset Toolbag" from its tools list; added three more thumbnail images to its media array.

## [Unreleased] — 2026-08-15

### Added
- **Featured Work thumbnails on the landing page** — Each featured card now shows a media preview (image or video) above the title/description. Cards fall back to text-only when a project has no embeddable media.
- **`featured` flag on projects** — Added an optional `featured?: boolean` field to the `Project` type in `src/data/portfolio.ts`. The landing page's "Featured Work" section now renders `projects.filter((p) => p.featured)` instead of the first 3 projects, so you control exactly which projects appear (and how many). Works for both 3D and 2D projects. The existing three projects (Radio, Chair, Tank) were marked `featured: true` to preserve current behavior.

### Fixed
- **Featured Work video not rendering** — The card only looked for an `image` in `media`, so video-only projects (e.g. the 2D cat) showed nothing. It now falls back to a `video` and renders it in an iframe, while still skipping unframeable Drive URLs (`embeddedfolderview` / `accounts.google.com`).
- **Video player controls clipped in Featured Work** — Google Drive's `/preview` player renders the 16:9 video plus a control bar below it, so a strict 16:9 frame buried the progress bar/controls into the description. Video frames now use a 4:3 aspect ratio (matching Drive's native 640×480 embed) so the full player fits. Images keep 16:9.
- **`MediaRenderer` video frame ratio** — The shared renderer (used on project detail hero + gallery) had the same latent 16:9 clipping bug; its default is now 4:3, and it now honors the `className` prop (e.g. `max-h-[70vh]`) instead of ignoring it.

### Changed
- **Featured Work card layout** — Media container is now `relative` with `absolute inset-0` media, matching the projects-list carousel pattern so images/videos fill their frame consistently.

## [Unreleased] — 2026-08-13

### Added
- **ArtStation-style project detail pages** — Each project now has its own dedicated page at `/projects/:slug` with:
  - Full-width hero media (image or video)
  - Metadata bar (category badge + tool pills)
  - Two-column layout: main content (About, Gallery, Process) + sticky sidebar (Category, Tools, Drive link, Prev/Next)
  - Full gallery — all media items displayed stacked (not a carousel)
  - Process breakdown — Challenge and Solution in styled cards
  - Previous/Next project navigation (desktop sidebar + mobile bottom bar)
  - Back link to return to `/projects`
- **`MediaRenderer` shared component** (`src/components/MediaRenderer.tsx`) — Handles images, framable videos, and unframeable Google Drive folder embeds (shows fallback card with "Open in Drive" button instead of CSP-blocked iframe)
- **`projects.index.tsx`** — Project list page extracted from the layout route

### Fixed
- **Google Drive thumbnail URL typo** — "Old School Signal" had `=w1920` instead of `&sz=w1920`, causing a broken image
- **CSP `frame-ancestors` error** — Two projects used `embeddedfolderview` URLs as `type: "video"` media; Google blocks folder embeds on external sites. `MediaRenderer` now detects these and shows a fallback card with a direct Drive link
- **Video iframe "thin strip"** — `MediaRenderer` was wrapping videos in a container with `aspectRatio: "16/9"` which forced a fixed ratio even when the parent was already sized. Videos now use `absolute inset-0 w-full h-full` to fill the container
- **Project detail pages not opening** — `projects.tsx` had a child route (`projects.$slug.tsx`) but didn't render `<Outlet />`. Split into layout route (`projects.tsx` → renders `<Outlet />`) + index route (`projects.index.tsx` → list page)
- **Gray bars below carousel images** — `aspect-video` forced a fixed 16:9 ratio while the text column was taller. Changed to `items-stretch` on the grid with `absolute inset-0 object-cover` on images so they fill the full row height

### Changed
- **Projects list page** — Project titles now link to detail pages; added "View Details" button; text truncated with `line-clamp` to keep cards compact
- **Home page featured projects** — Now link to `/projects/$slug` instead of `/projects`
- **Carousel video rendering** — Inlined `<iframe>` directly in the carousel instead of going through `MediaRenderer` to avoid the fixed aspect-ratio wrapper

## [Unreleased] — 2026-08-02

### Fixed
- **Missing `vite/client` type definitions** — `node_modules` was absent; ran `npm install` to restore all dependencies and resolve the TypeScript error.
- **CORS blocking Google Drive images** — Switched from `uc?export=view&id=FILE_ID` to `thumbnail?id=FILE_ID&sz=w1920`. The thumbnail endpoint sets `Access-Control-Allow-Origin: *`; the old endpoint does not.
- **Images cropped in carousel** — Changed `object-cover` to `object-contain` on the `<img>` tag in `ProjectCard` so artwork displays fully without cropping.
- **CRLF line endings** — Ran `prettier --write` across the entire codebase to normalize Windows line endings, fixing 5466 lint errors.

### Changed
- **"2D Illustrations & Canvas Paintings" project** — Replaced the Google Drive folder iframe embed with 4 individual image entries using the thumbnail endpoint, creating a browsable carousel.
- **"2D Cat Character — Spine Animation" project** — Replaced the Drive folder embed with the actual video preview (`/file/d/FILE_ID/preview`).
- **`portfolio.ts` documentation** — Updated the media format comments to document the correct thumbnail URL pattern and CORS caveat.

### Added
- **CHANGELOG.md** — This file.

## [Unreleased] — 2026-05-12

### Added
- **Initial portfolio site build** — Built out the full site from the TanStack Start template:
  - `SiteNav`, `SiteFooter`, and `PageHeader` shared layout components
  - Pages: Home (`index.tsx`), Projects (`projects.tsx`), Skills (`skills.tsx`), Experience (`experience.tsx`), Resume (`resume.tsx`)
  - `src/data/portfolio.ts` — project, experience, and skill data
  - Hero image (`src/assets/hero.jpg`) and resume PDF (`public/IshitaSingh_Resume.pdf`)
  - 2D/3D Google Drive folder embeds for project media
- **Skill icons & map** — Added `SkillIcon` component and `src/data/skillIcons.ts` mapping skills to icons, wired into the Skills page.
- **Theme toggle** — Added `ThemeToggle` component and dark/light theme support in `SiteNav` and `styles.css`.

### Changed
- **Hero theme** — Switched the hero image to a pastel theme.
- **Experience locations** — Updated the location for all experience entries to "Raipur, Chhattisgarh, India".
- **Wrangler worker name** — Renamed the Cloudflare worker from `tanstack-start-app` to `ishita-singh-portfolio` (later adjusted to `ishita-singh-` for the Pages deployment).

### Fixed
- **Dark mode toggle** — Fixed the dark mode toggle behavior.

### Deployment
- **Cloudflare Pages deployment** — Merged PR #2 (`Pages_Deployment` branch) to deploy the site to Cloudflare Pages, including `package-lock.json` and `wrangler.jsonc` updates.
