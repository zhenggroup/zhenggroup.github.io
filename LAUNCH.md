# Art Deco launch — 2026-09-09

The approved Art Deco design replaces the old website at the existing root and domain. The A2 alternate is removed; the old site is archived at `archive/pre-deco-2026-09-09` and in an ignored local ZIP.

## Pre-publication checks

- The latest remote changes were fast-forwarded before migration; only the citation cache changed. The original 218-file ZIP passed integrity verification.
- Eight production pages preserve the approved main content, header controls, footer, imagery, hidden research simulation, and language behavior. Preview links/labels and `noindex` metadata are removed; canonical links and the sitemap use the existing HTTPS domain.
- The five homepage background images load at the root path; manual switching and the shared animation pause work. Three research illustrations remain present.
- Publications retain 64 records, 60 real TOCs, eight journal covers, two PDF links, the Before GTIIT heading, and all 64 native Dimensions badges. DOI search rebuilds the live badge. News retains 20 entries; the team lists four members and seven alumni.
- All eight pages were checked in English and Chinese at 1440, 390, and 320px: no horizontal overflow, broken loaded images, browser script errors, or failed local resources. Representative desktop/mobile screenshots were reviewed locally.
- Old section URLs, Chinese section links, original DOI-based publication anchors, and news anchors redirect or resolve correctly. Original image and download paths remain available.
- Local screenshots and backups are excluded from the published repository; only the eight approved generated illustrations are included.

Deployment completion is recorded by the GitHub Pages build status and live-domain checks after pushing the launch commit.
