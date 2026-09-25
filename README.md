# The Zheng Group website

The production website is the approved Art Deco–Cubist edition at **https://www.thezhenggroup.com/**. GitHub Pages publishes the root of `main`; `CNAME` and `.nojekyll` are retained. There is no build step.

## Pages and content

- `index.html`, `research.html`, `publications.html`, `team.html`, `news.html`, `resources.html`, `services.html`, and `contact.html` are the live pages. Static page text and its Chinese translation are stored together using `data-zh`.
- **`content.js` is the active content source** for publications, news, covers, members, and resource lists. Update it when changing these lists; retain its JSON-compatible `window.CONCEPT_CONTENT = {...};` format. Research details and PI biography are also present in their respective HTML pages.
- `publication/publications.md`, `news/news.md`, `resource/resources.md`, and old `js/*-data.js` files are retained as historical source/reference files. Editing them alone does not update the new website. The daily citation-cache updater reads the publication DOI list from `content.js`.
- `img/` and `downloads/` retain the original photos, logos, journal covers, TOCs, and papers. `assets/` contains the eight approved Art Deco–Cubist illustrations.
- Dimensions provides live citation badges on the publications page. `publication-refinement.css` changes their appearance; the official widget supplies counts and details. The existing citation-cache workflow remains available separately.
- English and Chinese share the same pages. `?lang=en` and `?lang=zh` choose the initial language; the language button saves the preference for other pages.

## Homepage video backgrounds

The homepage plays the silent H.264 clips in `assets/videos/` in order, advancing when each clip ends. JPEG posters appear before playback and when automatic playback is disabled. Pausing keeps the current video frame. Only the active video plays; the following video loads halfway through the active clip. The existing motion button, arrows, dots, keyboard navigation, and touch swipes control playback.

To add a clip, place its web-optimized MP4 and poster in `assets/videos/`, add a `.hero-background-slide` with its English/Chinese labels and a `video` with `data-src` in `index.html`, and add the matching numbered `data-hero-slide` button. `hero-carousel.js` derives the count from those slides. On smaller screens, the video retains its full 16:9 frame.

## Compatibility and backup

The old `/research/`, `/publication/`, `/team/`, `/news/`, `/resource/`, `/service/`, and `/zh/` entry points now redirect to the corresponding new page. Existing news/research anchors and per-publication DOI anchors remain usable. `legacy-redirect.js` handles these entry points.

The complete original website is retained at Git tag **`archive/pre-deco-2026-09-09`**, commit `33e16f94592c0289ecc7bc5178f75bcadad49ae1`. This tag is a recovery reference and is not a GitHub Pages publishing source. To inspect it without changing production, create a separate working directory:

```sh
git worktree add ../zhenggroup-original archive/pre-deco-2026-09-09
```

A verified local ZIP also exists at `.site-backups/original-site-2026-09-09.zip` (218 original files). `.site-backups/`, the retained local `concept-deco/` working material, and `.site-verification/` are ignored by Git and not deployed. The A2 directory has been deleted.

## Local review and publishing

Run `python3 -m http.server 8765 --bind 127.0.0.1` in this directory, then visit `http://127.0.0.1:8765/`. Check changed pages in both languages and at desktop/mobile sizes. If changing a script or stylesheet, update its version query in the relevant HTML pages to avoid stale browser caches.

After an authorized publish, push `main` and verify both the GitHub Pages deployment and the actual HTTPS website. A local check or successful Git push alone is not deployment confirmation.
