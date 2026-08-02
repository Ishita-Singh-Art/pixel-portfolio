# Changelog

All notable changes to the Pixel Portfolio project.

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
