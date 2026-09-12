# Delivery assets

`optimize-assets.py` creates the WebP artwork/logo copies and the Noto WOFF2
subsets used by the live HTML/CSS. Original PNGs, fonts and OFL licenses remain
in place. It requires Python with `fonttools`, `brotli` and `Pillow` installed:

```sh
python scripts/optimize-assets.py
```

The font rules at the start of `style.css` are generated. The script preserves
the stylesheet from `:root{` onward, all source font Unicode mappings and all
variable axes. Subsets have disjoint `unicode-range` declarations: the browser
loads only the characters used on the current page. Characters added in future
content still resolve through the fallback subsets; routine text edits do not
require a rebuild. Rebuild to optimize new text or replace source assets.

The homepage has its own HTML text and does not load `content.js` or the research
playground's animation script. Keep the shared navigation/translation code in
`app.js` functional without a content catalogue on `data-page="home"`.

Carousel images after the first use `data-src` and `data-srcset`. They are loaded
only when selected, including automatic rotation. Do not preload all slides.
Browsers reporting Save Data or a slow effective connection keep automatic
rotation off; manual controls still work. Without that browser API, the carousel
continues loading one image at a time. A failed first image tries alternatives
sequentially.

After rebuilding, update the `style.css` cache version in all eight current HTML
pages. Also update the `app.js` or `hero-carousel.js` versions when those change.
Verify desktop/mobile English/Chinese layouts, the other pages, and carousel
controls before publishing. Local checks do not establish live deployment.
