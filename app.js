/* Shared behavior for the Zheng Group website. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const content = window.CONCEPT_CONTENT;
  if (!content) return;
  const page = document.body.dataset.page || 'home';
  const theme = document.body.dataset.theme === 'deco' ? 'deco' : 'a2';
  const storagePrefix = theme === 'deco' ? 'deco-lab' : 'sky-lab';
  const readSetting = key => { try { return localStorage.getItem(`${storagePrefix}-${key}`); } catch { return null; } };
  const saveSetting = (key, value) => { try { localStorage.setItem(`${storagePrefix}-${key}`, value); } catch { /* Optional storage. */ } };
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  let language = ['en','zh'].includes(requestedLanguage) ? requestedLanguage : (readSetting('language') === 'zh' ? 'zh' : 'en');
  let scene = 'double';
  let userPaused = readSetting('paused') === 'true';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const motionPaused = () => userPaused || reducedMotion.matches;
  const originalText = new Map($$('[data-i18n], [data-zh]').map(el => [el, el.innerHTML]));
  const zh = {
    skip:'跳至正文',
    navResearch:'研究', navPublications:'论文', navPeople:'团队', navNews:'新闻', navResources:'资源', letsTalk:'联系',
    brandSub:'电化学界面与转化实验室', heroInstitution:'广东以色列理工学院', heroLocation:'中国 · 汕头',
    sceneDouble:'双电层', sceneGas:'气泡析出', sceneProbe:'表面探测', conceptAnimation:'定性示意动画',
    positiveIons:'阳离子', negativeIons:'阴离子', speed:'动画速度',
    scienceCaption:'定性示意动画，不代表实验数据或定量模型。',
    empty:'没有匹配的论文，请尝试其他关键词或年份。',
    piName:'郑蔚然 副教授', piRole:'课题组负责人 · 化学系',
    footerLab:'电化学界面与转化实验室 · 广东以色列理工学院', backTop:'返回顶部'
  };
  const pageNames = {
    home:['Home','首页'], research:['Research','研究'], publications:['Publications','论文'],
    team:['Team','团队'], news:['News','新闻'], resources:['Resources','资源'], contact:['Contact','联系'], services:['Services & Consulting','服务与咨询']
  };
  const sceneText = {
    double:{en:'Counterions gather near a charged electrode. This simplified scene illustrates the electrical double layer.',zh:'带电电极附近聚集反离子。此简化场景用于示意双电层。'},
    gas:{en:'Bubbles nucleate at the electrode, grow, and detach into the electrolyte.',zh:'气泡在电极表面成核、长大，随后脱离并进入电解液。'},
    probe:{en:'A scanning probe follows the surface, illustrating local topography measurements with electrochemical atomic force microscopy.',zh:'扫描探针沿表面移动，示意电化学原子力显微镜对局部形貌的测量。'}
  };
  const text = value => typeof value === 'object' && value !== null ? (value[language] || value.en || '') : (value ?? '');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const plain = value => new DOMParser().parseFromString(String(value || ''), 'text/html').body.textContent;
  function inlineHTML(value) {
    const doc = new DOMParser().parseFromString(String(value || ''), 'text/html');
    const allowed = new Set(['B','U','I','EM','STRONG','SUB','SUP']);
    function serialize(node) {
      if (node.nodeType === Node.TEXT_NODE) return escape(node.textContent);
      const children = [...node.childNodes].map(serialize).join('');
      return allowed.has(node.nodeName) ? `<${node.nodeName.toLowerCase()}>${children}</${node.nodeName.toLowerCase()}>` : children;
    }
    return [...doc.body.childNodes].map(serialize).join('');
  }
  const safeURL = value => /^(https:\/\/|(?:img|downloads|assets)\/|[a-z][a-z0-9-]*\.html(?:#|$)|#)/i.test(value || '') ? escape(value) : 'contact.html';
  const external = href => /^https:\/\//.test(href || '') ? ' target="_blank" rel="noopener noreferrer"' : '';
  const svgShell = (body) => `<svg viewBox="0 0 240 135" fill="none" aria-hidden="true">${body}</svg>`;
  const illustrations = [
    svgShell('<path d="M39 17v92h165" stroke="#719b86" stroke-width="1.2"/><path d="M53 94h148" stroke="#b7cec0" stroke-dasharray="3 5"/><rect x="53" y="99" width="147" height="11" rx="4" fill="#aac8b7"/><path d="M67 22v54m45-54v54m45-54v54" stroke="#91b7a1" stroke-dasharray="3 4"/><path class="scan" d="M56 13h128l-27 19H80Z" fill="#d5e7dc" stroke="#83a992"/><g class="ion"><circle cx="74" cy="56" r="9" fill="#8dbca3"/><path d="M70 56h8m-4-4v8" stroke="white"/></g><g class="ion"><circle cx="122" cy="72" r="9" fill="#d2a087"/><path d="M118 72h8" stroke="white"/></g><g class="ion"><circle cx="165" cy="51" r="9" fill="#8dbca3"/><path d="M161 51h8m-4-4v8" stroke="white"/></g><circle cx="98" cy="85" r="5" fill="#b6d1c1"/><circle cx="179" cy="86" r="5" fill="#b6d1c1"/>'),
    svgShell('<path d="m62 75 30-44 43 12 33 42-46 27Z" stroke="#9eb6c6" stroke-width="1.5"/><path d="m92 31 30 81m13-69L62 75m60 37 46-27" stroke="#b3c6d2"/><circle cx="62" cy="75" r="15" fill="#8aaebe"/><circle cx="92" cy="31" r="11" fill="#a8c7d1"/><circle cx="135" cy="43" r="16" fill="#86b0c2"/><circle cx="168" cy="85" r="12" fill="#acc9d5"/><circle cx="122" cy="112" r="13" fill="#799eaf"/><circle cx="96" cy="75" r="12" fill="#cee0e6"/><g class="ion"><circle cx="198" cy="34" r="6" fill="#d3a68d"/><path d="m153 39 26-2" stroke="#c7bfb7" stroke-dasharray="3 4"/></g><path d="M31 45a64 64 0 0 1 99-30m-1-7 3 9-10 1" stroke="#99b3c1"/><path d="M197 96a73 73 0 0 1-42 29" stroke="#99b3c1" stroke-dasharray="3 4"/>'),
    svgShell('<path d="M35 16v98h177" stroke="#a39b85" stroke-width="1.2"/><path d="M42 86h162M42 57h162M42 28h162" stroke="#ded5c4" stroke-dasharray="3 5"/><path d="M43 102C73 102 78 98 94 69s15-47 29-44 13 57 30 65 26 3 52 2" stroke="#54846c" stroke-width="2"/><path d="M43 104c31 0 33-7 55-33s22-28 33-9 24 40 74 34" stroke="#c99579" stroke-width="1.7"/><path d="M43 106c38-1 44-13 64-27s28 3 48 12 32 6 50 7" stroke="#8eaabb" stroke-width="1.5"/><circle class="ion" cx="119" cy="26" r="5" fill="#b8ccb9" stroke="#54846c"/>')
  ];
  let revealObserver;
  function observeReveals() {
    $$('.reveal:not(.visible)').forEach(el => {
      if (motionPaused() || !revealObserver) el.classList.add('visible');
      else revealObserver.observe(el);
    });
  }
  function renderResearch() {
    const grid = $('#research-grid');
    if (!grid) return;
    grid.innerHTML = content.research.map((r,i) => `<article class="research-card reveal" id="${escape(r.id)}"><div class="research-topline"><span>0${i+1}</span></div><div class="research-illustration">${illustrations[i] || ''}</div><h3>${escape(text(r.title))}</h3><p>${escape(text(r.description))}</p><div class="tags">${(r.tags || []).map(tag=>`<span>${escape(tag)}</span>`).join('')}</div><a class="text-link" href="${safeURL('research.html#' + r.href.split('#')[1])}">${language === 'zh' ? '研究详情' : 'Research details'} ↗</a></article>`).join('');
  }
  function renderPublications() {
    const grid = $('#publication-grid');
    if (!grid) return;
    const query = ($('#publication-search')?.value || '').trim().toLocaleLowerCase();
    const year = $('#publication-year')?.value || 'all';
    const selected = content.publications.filter(p => (year === 'all' || String(p.year) === year) && plain([p.title,p.authors,p.journal,p.doi].join(' ')).toLocaleLowerCase().includes(query));
    let beforeGTIITShown = false;
    grid.innerHTML = selected.map(p => {
      const doi = `https://doi.org/${encodeURI(p.doi)}`;
      const number = p.number ?? content.publications.length - content.publications.indexOf(p);
      const badgeDoi = p.dimensionsDoi || p.doi;
      const legacyAnchor = 'pub-' + (p.anchor || p.doi || p.title).toLowerCase().replace(/<[^>]*>/g,'').replace(/&[a-z0-9#]+;/gi,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
      const eraHeading = Number(number) <= 35 && !beforeGTIITShown
        ? '<h3 class="publication-era-heading" id="before-gtiit">Before GTIIT</h3>' : '';
      if (Number(number) <= 35) beforeGTIITShown = true;
      return `${eraHeading}<article class="publication-card${p.image ? '' : ' no-image'}" id="paper-${number}" aria-labelledby="paper-title-${number}">${p.image ? `<button type="button" class="publication-image toc-open" data-paper-number="${number}" aria-haspopup="dialog" aria-label="${escape((language === 'zh' ? '放大 TOC 图：' : 'Enlarge TOC: ') + plain(p.title))}"><img src="${safeURL(p.image)}" alt="${escape(p.imageAlt || plain(p.title))}" loading="lazy" width="500" height="280"></button>` : ''}<div class="publication-copy" id="${escape(legacyAnchor)}"><span class="publication-number">${number}.</span><h3 id="paper-title-${number}"><a href="${escape(doi)}" target="_blank" rel="noopener noreferrer">${inlineHTML(p.title)}</a></h3><p class="paper-authors">${inlineHTML(p.authors)}</p><p class="paper-citation">${inlineHTML(p.journal)}</p>${p.comments?.length ? `<div class="paper-notes">${p.comments.map(note=>`<p>${escape(note)}</p>`).join('')}</div>` : ''}${p.featuredIn?.length ? `<div class="paper-related">${p.featuredIn.map(link=>`<a href="${safeURL(link.url)}"${external(link.url)}>${escape(link.text)} ↗</a>`).join('')}</div>` : ''}<div class="paper-bottom"><span class="paper-type">${escape(p.type)}</span><span class="paper-identifiers"><a class="paper-doi" href="${escape(doi)}" target="_blank" rel="noopener noreferrer">DOI: ${escape(p.doi)}</a><span class="dimensions-badge-inline" aria-label="Dimensions citations"><span class="__dimensions_badge_embed__" data-doi="${escape(badgeDoi)}" data-style="small_rectangle" data-legend="hover-bottom"></span></span></span>${p.pdfLink ? `<a href="${safeURL(p.pdfLink)}" target="_blank" rel="noopener noreferrer">PDF ↗</a>` : ''}</div></div></article>`;
    }).join('');
    grid.querySelectorAll('[data-paper-number]').forEach(button=>button.addEventListener('click',()=>{const paper = content.publications.find(p=>String(p.number) === button.dataset.paperNumber);if(paper) openImage({image:paper.image,alt:paper.imageAlt,title:plain(paper.title)});}));
    // Dimensions automatically handles initial load; refresh after filters or language changes.
    window.__dimensions_embed?.addBadges();
    if ($('#empty-state')) $('#empty-state').hidden = selected.length > 0;
    if ($('#publication-count')) $('#publication-count').textContent = language === 'zh' ? `显示 ${selected.length} 篇论文，共 ${content.publications.length} 篇` : `${selected.length} of ${content.publications.length} publications`;
  }
  function populateYears() {
    const select = $('#publication-year');
    if (!select) return;
    const previous = select.value || 'all';
    const years = [...new Set(content.publications.map(p => p.year))].sort((a,b) => b-a);
    select.innerHTML = `<option value="all">${language === 'zh' ? '全部年份' : 'All years'}</option>` + years.map(year=>`<option value="${year}">${year}</option>`).join('');
    select.value = previous;
    select.setAttribute('aria-label', language === 'zh' ? '按年份筛选论文' : 'Filter publications by year');
  }
  function renderPeople() {
    for (const [selector,members] of [['#member-portraits',content.lab.members],['#alumni-grid',content.lab.alumni]]) {
      const grid = $(selector);
      if (!grid) continue;
      grid.innerHTML = (members || []).map(m=>`<article class="member-portrait"><div>${m.image ? `<img src="${safeURL(m.image)}" alt="${escape(text(m.name))}" width="260" height="270" loading="lazy">` : ''}</div><strong>${escape(text(m.name))}</strong><span>${escape(text(m.role))}</span></article>`).join('');
    }
  }
  function renderNews() {
    const list = $('#news-list');
    if (!list) return;
    list.innerHTML = content.news.map(n=>`<article class="news-item" id="${escape(n.id || '')}"><time class="news-date" datetime="${escape(n.date)}">${escape(n.date.replaceAll('-','.'))}</time><div class="news-body"><h2>${escape(text(n.title))}</h2><div class="news-story"><div class="news-copy">${String(text(n.body || n.summary)).split(/\n\s*\n/).map(paragraph=>`<p>${escape(paragraph)}</p>`).join('')}${n.links?.length ? `<div class="news-related">${n.links.map(link=>`<a href="${safeURL(link.href)}"${external(link.href)}>${escape(text(link.title))} ↗</a>`).join('')}</div>` : ''}</div>${n.image ? `<img class="news-image" src="${safeURL(n.image)}" alt="${escape(n.imageAlt || text(n.title))}" loading="lazy">` : ''}</div></div></article>`).join('');
  }
  function renderResources() {
    const grid = $('#resource-grid');
    if (!grid) return;
    const symbols = {code:'{ }',learning:'⌘',video:'▷',tools:'↗'};
    const kinds = {code:['CODE','代码'],learning:['LEARNING','学习'],video:['VIDEO','视频'],tools:['RESOURCES','资源']};
    const renderItem = r=>`<article class="resource-item" id="${escape(r.id || '')}"><h3><a href="${safeURL(r.href)}"${external(r.href)}>${escape(text(r.title))} ↗</a></h3><p>${escape(text(r.description))}</p>${r.details ? `<ul class="resource-details">${(text(r.details) || []).map(detail=>`<li>${escape(detail)}</li>`).join('')}</ul>` : ''}${r.note ? `<p class="resource-note">${escape(text(r.note))}</p>` : ''}${r.links?.length ? `<div class="resource-links">${r.links.map(link=>`<a href="${safeURL(link.href)}"${external(link.href)}>${escape(text(link.title))} ↗</a>`).join('')}</div>` : ''}</article>`;
    if (content.resourceGroups?.length) {
      grid.innerHTML = content.resourceGroups.map(group=>`<section class="resource-group" aria-labelledby="group-${escape(group.id)}"><h2 id="group-${escape(group.id)}">${escape(text(group.title))}</h2>${group.description ? `<p class="resource-group-description">${escape(text(group.description))}</p>` : ''}<div class="resource-items">${content.resources.filter(r=>r.group === group.id).map(renderItem).join('')}</div></section>`).join('');
    } else grid.innerHTML = content.resources.map(renderItem).join('');
  }
  function renderCovers() {
    const grid = $('#cover-grid');
    if (!grid) return;
    const covers = content.covers || [];
    const limit = Number(grid.dataset.limit) || covers.length;
    grid.innerHTML = covers.slice(0,limit).map((c,i)=>`<figure class="cover-card"><button type="button" class="cover-open" data-cover-index="${i}" aria-label="${escape((language === 'zh' ? '放大封面：' : 'Enlarge cover: ') + text(c.title))}" aria-haspopup="dialog"><img src="${safeURL(c.image)}" alt="${escape(c.alt || text(c.title))}" loading="lazy"></button><figcaption class="cover-caption">${escape(text(c.title))}${(c.issue || c.detail) ? `<span>${escape(text(c.issue || c.detail))}</span>` : ''}</figcaption></figure>`).join('');
    grid.querySelectorAll('[data-cover-index]').forEach(button=>button.addEventListener('click',()=>openCover(Number(button.dataset.coverIndex))));
  }
  let coverDialog;
  function openCover(index) {
    const cover = content.covers[index];
    if (cover) openImage(cover);
  }
  function openImage(cover) {
    if (!coverDialog) {
      coverDialog = document.createElement('dialog');
      coverDialog.id = 'cover-dialog';
      coverDialog.className = 'cover-dialog';
      coverDialog.setAttribute('aria-labelledby','cover-dialog-caption');
      coverDialog.innerHTML = '<button type="button" class="cover-dialog-close">×</button><figure><img alt=""><figcaption id="cover-dialog-caption"></figcaption></figure>';
      document.body.append(coverDialog);
      coverDialog.querySelector('button').addEventListener('click',()=>coverDialog.close());
      coverDialog.addEventListener('click',event=>{if(event.target === coverDialog) { const rect = coverDialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) coverDialog.close(); }});
      coverDialog.addEventListener('close',()=>document.body.classList.remove('cover-opened'));
    }
    const img = coverDialog.querySelector('img');
    img.src = cover.image;
    img.alt = cover.alt || text(cover.title);
    coverDialog.querySelector('figcaption').textContent = text(cover.title) + ((cover.issue || cover.detail) ? ` · ${text(cover.issue || cover.detail)}` : '');
    coverDialog.querySelector('button').setAttribute('aria-label', language === 'zh' ? '关闭图片' : 'Close image');
    document.body.classList.add('cover-opened');
    coverDialog.showModal();
  }
  const canvas = $('#interface-canvas');
  const animation = canvas && window.InterfaceAnimation ? new window.InterfaceAnimation(canvas,{scene,speed:1,paused:motionPaused(),language}) : null;
  function updateScene() {
    if (!canvas) return;
    $$('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scene === scene)));
    if ($('#scene-description')) $('#scene-description').textContent = sceneText[scene][language];
    if ($('#scene-code')) $('#scene-code').textContent = `EC / 0${['double','gas','probe'].indexOf(scene)+1}`;
    if ($('.canvas-legend')) $('.canvas-legend').hidden = scene !== 'double';
    canvas.setAttribute('aria-label',sceneText[scene][language]);
    animation?.setScene(scene);
    animation?.setLanguage(language);
  }
  function updateMotion() {
    const paused = motionPaused();
    document.body.classList.toggle('motion-paused',paused);
    document.documentElement.classList.toggle('motion-paused',paused);
    const button = $('#motion-toggle');
    if (button) {
      button.setAttribute('aria-pressed',String(paused));
      button.disabled = reducedMotion.matches;
      const label = reducedMotion.matches ? (language === 'zh' ? '已遵循系统的减少动态效果设置' : 'Animations reduced by your system preference') : (paused ? (language === 'zh' ? '播放动画' : 'Play animations') : (language === 'zh' ? '暂停动画' : 'Pause animations'));
      button.setAttribute('aria-label',label);
      button.title = label;
      if (button.querySelector('span')) button.querySelector('span').textContent = paused ? '▷' : 'Ⅱ';
    }
    animation?.setPaused(paused);
    observeReveals();
  }
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    originalText.forEach((original,el)=>{el.innerHTML = language === 'zh' ? (el.dataset.zh ?? zh[el.dataset.i18n] ?? original) : original;});
    if ($('#language-toggle')) {
      $('#language-toggle').textContent = language === 'zh' ? 'EN' : '中文';
      $('#language-toggle').setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
    }
    if ($('#publication-search')) {
      $('#publication-search').placeholder = language === 'zh' ? '搜索标题、作者、期刊或 DOI…' : 'Search title, author, journal or DOI…';
      $('#publication-search').setAttribute('aria-label', language === 'zh' ? '搜索论文' : 'Search publications');
    }
    $('.main-nav')?.setAttribute('aria-label', language === 'zh' ? '主导航' : 'Main navigation');
    $('.scene-controls')?.setAttribute('aria-label', language === 'zh' ? '选择界面动画场景' : 'Choose an interface scene');
    const name = (pageNames[page] || pageNames.home)[language === 'zh' ? 1 : 0];
    document.title = language === 'zh' ? `${name} · 郑蔚然课题组` : `${name} · The Zheng Group`;
    populateYears();
    renderResearch();renderPublications();renderPeople();renderNews();renderResources();renderCovers();
    updateScene();updateMotion();setMenu(false);observeReveals();
    saveSetting('language',language);
    const url = new URL(location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang',language);
      history.replaceState(null,'',url);
    }
  }
  function setMenu(open,restoreFocus=false) {
    document.body.classList.toggle('menu-open',open);
    const button = $('#menu-toggle');
    if (!button) return;
    button.setAttribute('aria-expanded',String(open));
    button.setAttribute('aria-label', open ? (language === 'zh' ? '关闭菜单' : 'Close menu') : (language === 'zh' ? '打开菜单' : 'Open menu'));
    if (open) $('.main-nav a')?.focus();
    if (restoreFocus) button.focus();
  }
  const hero = $('#home'), art = $('#hero-art');
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.05});
    document.body.classList.add('js-ready');
    if (hero) new IntersectionObserver(entries=>document.body.classList.toggle('hero-away',!entries[0].isIntersecting)).observe(hero);
  }
  $('#language-toggle')?.addEventListener('click',()=>setLanguage(language === 'en' ? 'zh' : 'en'));
  $('#motion-toggle')?.addEventListener('click',()=>{userPaused = !userPaused;saveSetting('paused',String(userPaused));updateMotion();});
  reducedMotion.addEventListener('change',updateMotion);
  $('#menu-toggle')?.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
  $$('.main-nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{if(event.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false,true);});
  document.addEventListener('click',event=>{if(document.body.classList.contains('menu-open') && !event.target.closest('.site-header')) setMenu(false);});
  document.addEventListener('focusin',event=>{if(document.body.classList.contains('menu-open') && !event.target.closest('.site-header')) setMenu(false);});
  matchMedia('(max-width:1050px)').addEventListener('change',event=>{if(!event.matches) setMenu(false);});
  $('#publication-search')?.addEventListener('input',renderPublications);
  $('#publication-year')?.addEventListener('change',renderPublications);
  $$('[data-scene]').forEach(button=>button.addEventListener('click',()=>{scene = button.dataset.scene;updateScene();}));
  $('#animation-speed')?.addEventListener('input',event=>{const speed = Number(event.target.value);$('#speed-value').textContent = `${speed.toFixed(1)}×`;animation?.setSpeed(speed);});
  if (hero && art) {
    hero.addEventListener('pointermove',event=>{
      if(motionPaused() || event.pointerType !== 'mouse' || innerWidth <= 760) return;
      const bounds = hero.getBoundingClientRect();
      art.style.setProperty('--parallax-x',`${((event.clientX-bounds.left)/bounds.width-.5)*8}px`);
      art.style.setProperty('--parallax-y',`${((event.clientY-bounds.top)/bounds.height-.5)*5}px`);
    });
    hero.addEventListener('pointerleave',()=>{art.style.setProperty('--parallax-x','0px');art.style.setProperty('--parallax-y','0px');});
  }
  document.addEventListener('visibilitychange',()=>document.body.classList.toggle('page-inactive',document.hidden));
  setLanguage(language);
  // Preserve shared links from the previous website and the early preview.
  const legacyPages = {covers:'publications.html',research:'research.html',playground:'research.html#playground',publications:'publications.html',people:'team.html',updates:'news.html',resources:'resources.html',contact:'contact.html'};
  Object.assign(legacyPages,{team:'team.html',services:'services.html',news:'news.html','recruitment-alert':'contact.html#recruitment-title'});
  if (page === 'home' && legacyPages[location.hash.slice(1)]) {
    const destination = new URL(legacyPages[location.hash.slice(1)],location.href);
    destination.search = location.search;
    location.replace(destination.href);
  } else {
    const scrollToHash = () => {
      let id;
      try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
      if (id === 'hero') id = 'home';
      document.getElementById(id)?.scrollIntoView({block:'start',behavior:'instant'});
    };
    requestAnimationFrame(scrollToHash);
    window.addEventListener('load',scrollToHash,{once:true});
    window.addEventListener('hashchange',scrollToHash);
  }
})();
