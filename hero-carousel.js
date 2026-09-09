/* Five backgrounds share one title hero; only the active scene is animated. */
(() => {
  'use strict';
  class HeroCarousel {
    constructor(hero) {
      this.hero = hero;
      this.stage = hero.querySelector('.hero-art');
      this.slides = [...hero.querySelectorAll('.hero-background-slide')];
      this.images = this.slides.map(slide => slide.querySelector('img'));
      this.controls = hero.querySelector('.hero-carousel-controls');
      this.buttons = [...hero.querySelectorAll('[data-hero-slide]')];
      this.progress = hero.querySelector('.hero-carousel-progress>span');
      this.announcement = hero.querySelector('.hero-carousel-announcement');
      this.names = ['Three-electrode system', 'ACS Electrochemistry', 'Chemistry of Materials', 'JPCC', 'JACS Au'];
      this.currentIndex = 0; this.elapsed = 0; this.visualTime = 0; this.duration = 8;
      this.frame = null; this.lastTime = null; this.inView = false; this.focused = false;
      this.paused = false; this.pending = false; this.destroyed = false; this.request = 0;
      this.ready = this.slides.map(() => false); this.loads = []; this.listeners = [];
      this.preference = matchMedia('(prefers-reduced-motion: reduce)');
      this.tick = this.tick.bind(this); this.updateActivity = this.updateActivity.bind(this);
      this.checkViewport = this.checkViewport.bind(this);
      this.buttons.forEach((button, index) => this.listen(button, 'click', () => this.show(index, true)));
      hero.querySelectorAll('[data-hero-direction]').forEach(button => this.listen(button, 'click', () => this.step(Number(button.dataset.heroDirection), true)));
      this.listen(this.controls, 'focusin', () => { this.focused = true; this.updateActivity(); });
      this.listen(this.controls, 'focusout', event => {
        if (!this.controls.contains(event.relatedTarget)) { this.focused = false; this.updateActivity(); }
      });
      this.listen(this.controls, 'keydown', event => {
        const destinations = { ArrowLeft: this.currentIndex - 1, ArrowRight: this.currentIndex + 1, Home: 0, End: this.slides.length - 1 };
        if (!(event.key in destinations)) return;
        event.preventDefault();
        const index = this.normalize(destinations[event.key]);
        this.show(index, true);
        if (event.target.matches('[data-hero-slide]')) this.buttons[index].focus();
      });
      this.listen(this.stage, 'pointerdown', event => {
        if (event.pointerType !== 'mouse') this.touchStart = { x: event.clientX, y: event.clientY };
      });
      this.listen(this.stage, 'pointerup', event => {
        if (!this.touchStart) return;
        const dx = event.clientX - this.touchStart.x, dy = event.clientY - this.touchStart.y;
        this.touchStart = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) this.step(dx < 0 ? 1 : -1, true);
      });
      this.listen(this.stage, 'pointercancel', () => { this.touchStart = null; });
      this.listen(document, 'visibilitychange', this.updateActivity);
      this.listen(this.preference, 'change', this.updateActivity);
      this.classObserver = new MutationObserver(records => {
        if (records.some(record => record.attributeName === 'lang')) this.translate();
        this.updateActivity();
      });
      this.classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'lang'] });
      this.classObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(entries => {
          this.inView = entries.some(entry => entry.isIntersecting && entry.intersectionRatio > 0);
          if (this.inView) this.loadAll();
          this.updateActivity();
        }, { threshold: 0.01 });
        this.observer.observe(this.stage);
      } else {
        this.listen(window, 'scroll', this.checkViewport, { passive: true });
        this.listen(window, 'resize', this.checkViewport, { passive: true });
        this.checkViewport();
      }
      this.stage.dataset.activeScene = this.slides[0].dataset.scene;
      this.translate(); this.updateActivity();
      this.ensureLoaded(0).then(loaded => {
        if (this.destroyed) return;
        if (loaded) this.updateActivity();
        this.loadAll();
      });
    }
    listen(node, event, listener, options) {
      node.addEventListener(event, listener, options);
      this.listeners.push(() => node.removeEventListener(event, listener, options));
    }
    get running() { return this.frame !== null; }
    normalize(index) { return (index % this.slides.length + this.slides.length) % this.slides.length; }
    motionBlocked() {
      return this.preference.matches || [document.body, document.documentElement].some(node => node.classList.contains('motion-paused') || node.classList.contains('page-inactive'));
    }
    shouldRun() { return !this.destroyed && this.inView && !document.hidden && !this.motionBlocked() && !this.paused && !this.focused && !this.pending && this.ready[this.currentIndex]; }
    setPaused(value) { this.paused = Boolean(value); this.updateActivity(); }
    checkViewport() {
      const rect = this.stage.getBoundingClientRect();
      this.inView = rect.bottom > 0 && rect.top < innerHeight;
      if (this.inView) this.loadAll();
      this.updateActivity();
    }
    ensureLoaded(index) {
      if (this.loads[index]) return this.loads[index];
      const img = this.images[index];
      this.loads[index] = new Promise(resolve => {
        const fail = () => { this.buttons[index].disabled = true; img.style.visibility = 'hidden'; resolve(false); };
        const finish = async () => {
          if (!img.complete || !img.naturalWidth) { fail(); return; }
          try { await img.decode(); } catch { /* The loaded raster can still be used. */ }
          this.ready[index] = true; resolve(true);
        };
        img.addEventListener('load', finish, { once: true });
        img.addEventListener('error', fail, { once: true });
        const deferred = img.dataset.src;
        if (deferred) { img.loading = 'eager'; img.src = deferred; delete img.dataset.src; }
        if (img.complete && img.naturalWidth) finish();
        else if (!deferred && img.complete && img.getAttribute('src')) fail();
      });
      return this.loads[index];
    }
    loadAll() {
      if (this.loadingAll || this.destroyed) return;
      this.loadingAll = true;
      Promise.all(this.images.map((_, index) => this.ensureLoaded(index))).then(results => {
        if (this.destroyed) return;
        if (!this.ready[this.currentIndex]) {
          const alternative = results.indexOf(true);
          if (alternative >= 0) this.show(alternative);
        }
        this.updateActivity();
      });
    }
    async show(index, manual = false) {
      index = this.normalize(index);
      const request = ++this.request;
      this.pending = true; this.updateActivity();
      const loaded = await this.ensureLoaded(index);
      if (this.destroyed || request !== this.request) return;
      this.pending = false;
      if (!loaded) { this.elapsed = 0; this.updateActivity(); return; }
      this.currentIndex = index; this.elapsed = 0;
      this.slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
        slide.setAttribute('aria-hidden', String(i !== index)); slide.inert = i !== index;
      });
      this.buttons.forEach((button, i) => {
        button.classList.toggle('is-active', i === index);
        button.setAttribute('aria-pressed', String(i === index));
      });
      this.stage.dataset.activeScene = this.slides[index].dataset.scene;
      if (this.progress) this.progress.style.transform = 'scaleX(0)';
      const status = this.hero.querySelector('.hero-carousel-status');
      if (status) status.textContent = `${String(index + 1).padStart(2, '0')} / 05`;
      if (manual && this.announcement) this.announcement.textContent = this.label(index);
      this.updateActivity();
    }
    step(direction, manual = false) {
      for (let distance = 1; distance <= this.slides.length; distance += 1) {
        const index = this.normalize(this.currentIndex + direction * distance);
        if (!this.buttons[index].disabled) { this.show(index, manual); break; }
      }
    }
    updateActivity() {
      if (this.destroyed) return;
      this.hero.classList.toggle('hero-motion-paused', this.motionBlocked() || this.paused);
      this.hero.classList.toggle('hero-motion-suspended', !this.shouldRun());
      this.hero.classList.toggle('is-out-of-view', !this.inView || document.hidden);
      if (this.shouldRun()) {
        if (this.frame === null) { this.lastTime = null; this.frame = requestAnimationFrame(this.tick); }
      } else {
        if (this.frame !== null) cancelAnimationFrame(this.frame);
        this.frame = null; this.lastTime = null;
      }
    }
    tick(timestamp) {
      this.frame = null;
      if (!this.shouldRun()) { this.lastTime = null; return; }
      const dt = this.lastTime === null ? 0 : Math.min((timestamp - this.lastTime) / 1000, 0.08);
      this.lastTime = timestamp; this.elapsed += dt; this.visualTime += dt;
      const phase = this.visualTime / 14;
      this.stage.style.setProperty('--hero-pan-x', `${Math.sin(phase) * 0.13}%`);
      this.stage.style.setProperty('--hero-pan-y', `${Math.cos(phase * 0.8) * 0.1}%`);
      this.stage.style.setProperty('--hero-zoom', String(1.008 + Math.sin(phase * 0.65) * 0.004));
      const sweep = (this.visualTime / 18) % 1;
      this.stage.style.setProperty('--hero-sweep', `${-65 + sweep * 130}%`);
      this.stage.style.setProperty('--hero-glint-opacity', String(Math.sin(sweep * Math.PI) ** 2 * 0.045));
      if (this.progress) this.progress.style.transform = `scaleX(${Math.min(this.elapsed / this.duration, 1)})`;
      if (this.elapsed >= this.duration) { this.step(1); return; }
      this.frame = requestAnimationFrame(this.tick);
    }
    label(index) {
      const zh = document.documentElement.lang.startsWith('zh');
      const name = index === 0 && zh ? '三电极体系' : this.names[index];
      return zh ? `背景 ${index + 1} / 5：${name}` : `Background ${index + 1} of 5: ${name}`;
    }
    translate() {
      const zh = document.documentElement.lang.startsWith('zh');
      this.controls.setAttribute('aria-label', zh ? '首页背景切换' : 'Homepage background controls');
      this.buttons.forEach((button, i) => button.setAttribute('aria-label', this.label(i)));
      this.hero.querySelector('[data-hero-direction="-1"]').setAttribute('aria-label', zh ? '上一幅背景' : 'Previous background');
      this.hero.querySelector('[data-hero-direction="1"]').setAttribute('aria-label', zh ? '下一幅背景' : 'Next background');
    }
    destroy() {
      if (this.destroyed) return; this.destroyed = true;
      if (this.frame !== null) cancelAnimationFrame(this.frame); this.frame = null;
      this.listeners.forEach(remove => remove()); this.classObserver.disconnect(); this.observer?.disconnect();
    }
  }
  const start = () => {
    const hero = document.querySelector('#home');
    if (!hero?.querySelector('.hero-background-slide')) return;
    window.HeroCarousel = new HeroCarousel(hero);
    if (location.hash === '#cover-art') {
      history.replaceState(null, '', `${location.pathname}${location.search}#home`);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
