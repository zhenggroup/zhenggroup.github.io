/* Keep bookmarks to the previous site working after the Art Deco launch. */
(() => {
  const root = document.documentElement;
  let page = root.dataset.destination || 'index.html';
  let hash;
  try { hash = decodeURIComponent(location.hash.slice(1)); } catch { hash = ''; }
  const params = new URLSearchParams(location.search);
  if (root.dataset.language === 'zh') {
    params.set('lang','zh');
    const sections = {research:'research.html',publications:'publications.html',team:'team.html',services:'services.html',resources:'resources.html',contact:'contact.html',news:'news.html'};
    const section = hash.replace(/^zh-/,'').replace(/-heading$/,'');
    if (sections[section]) { page = sections[section]; hash = ''; }
  }
  const anchors = {
    'publications.html': {'featured-covers':'covers-title','publicationsAccordion':'publications','headingBefore2022':'before-gtiit','collapseBefore2022':'before-gtiit','card-body-before2022':'before-gtiit'},
    'team.html': {'pi-container':'pi-title','current-members-grid':'member-portraits','previous-members-grid':'alumni-grid'},
    'resources.html': {'resource-content':'resources'},
    'research.html': {'research-areas':'page-title','research-overview-heading':'page-title'}
  };
  hash = anchors[page]?.[hash] || hash;
  if (page === 'publications.html' && /^(?:heading|collapse|card-body)-?\d{4}$/.test(hash)) hash = 'publications';
  const destination = new URL('/'+page, location.origin);
  destination.search = params.toString();
  destination.hash = hash;
  location.replace(destination.href);
})();
