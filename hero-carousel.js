/* Muted background videos play in order; posters remain available without motion. */
(() => {
  'use strict';
  class HeroCarousel {
    constructor(hero) {
      this.hero = hero;
      this.stage = hero.querySelector('.hero-art');
      this.slides = [...hero.querySelectorAll('.hero-background-slide')];
      this.videos = this.slides.map(slide => slide.querySelector('video'));
      this.controls = hero.querySelector('.hero-carousel-controls');
      this.buttons = [...hero.querySelectorAll('[data-hero-slide]')];
      this.progress = hero.querySelector('.hero-carousel-progress>span');
      this.announcement = hero.querySelector('.hero-carousel-announcement');
      this.currentIndex = 0;
      this.frame = null; this.inView = false; this.focused = false;
      this.paused = false; this.pending = false; this.destroyed = false; this.request = 0;
      this.autoplayBlocked = false;
      this.ready = this.slides.map(() => false);
      this.failed = this.slides.map(() => false);
      this.loads = []; this.listeners = []; this.playRequests = new Map();
      this.preference = matchMedia('(prefers-reduced-motion: reduce)');
      this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      this.tick = this.tick.bind(this); this.updateActivity = this.updateActivity.bind(this);
      this.checkViewport = this.checkViewport.bind(this);
      this.videos.forEach((video, index) => {
        video.muted = true;
        this.listen(video, 'ended', () => {
          if (index === this.currentIndex && this.shouldRun()) this.step(1);
        });
        this.listen(video, 'playing', () => {
          if (index !== this.currentIndex || !this.shouldRun()) video.pause();
        });
        this.listen(video, 'error', () => {
          this.failed[index] = true; this.ready[index] = false;
          if (index === this.currentIndex && !this.pending && this.wantsPlayback()) this.step(1);
        });
      });
      this.buttons.forEach((button, index) => this.listen(button, 'click', () => this.show(index, true)));
      hero.querySelectorAll('[data-hero-direction]').forEach(button => this.listen(button, 'click', () => this.step(Number(button.dataset.heroDirection), true)));
      // Pointer focus must not leave autoplay stopped after a manual selection.
      this.listen(this.controls, 'pointerdown', () => { this.focused = false; this.updateActivity(); });
      this.listen(this.controls, 'focusin', event => {
        this.focused = event.target.matches(':focus-visible');
        this.updateActivity();
      });
      this.listen(this.controls, 'focusout', event => {
        if (!this.controls.contains(event.relatedTarget)) { this.focused = false; this.updateActivity(); }
      });
      this.listen(this.controls, 'keydown', event => {
        const destinations = { ArrowLeft: this.currentIndex - 1, ArrowRight: this.currentIndex + 1, Home: 0, End: this.slides.length - 1 };
        if (!(event.key in destinations)) return;
        event.preventDefault(); this.focused = true;
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
      const motionToggle = document.querySelector('#motion-toggle');
      if (motionToggle) this.listen(motionToggle, 'click', () => {
        this.autoplayBlocked = false; this.updateActivity();
      });
      this.listen(document, 'visibilitychange', this.updateActivity);
      this.listen(this.preference, 'change', this.updateActivity);
      if (this.connection?.addEventListener) this.listen(this.connection, 'change', this.updateActivity);
      this.classObserver = new MutationObserver(records => {
        if (records.some(record => record.attributeName === 'lang')) this.translate();
        this.updateActivity();
      });
      this.classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'lang'] });
      this.classObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(entries => {
          this.inView = entries.some(entry => entry.isIntersecting && entry.intersectionRatio > 0);
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
    dataSavingEnabled() { return Boolean(this.connection?.saveData); }
    wantsPlayback() {
      return !this.destroyed && this.inView && !document.hidden && !this.motionBlocked() && !this.dataSavingEnabled() && !this.paused && !this.focused && !this.autoplayBlocked;
    }
    shouldRun() { return this.wantsPlayback() && !this.pending && this.ready[this.currentIndex] && !this.failed[this.currentIndex]; }
    setPaused(value) { this.paused = Boolean(value); this.updateActivity(); }
    checkViewport() {
      const rect = this.stage.getBoundingClientRect();
      this.inView = rect.bottom > 0 && rect.top < innerHeight;
      this.updateActivity();
    }
    ensureLoaded(index) {
      if (this.loads[index]) return this.loads[index];
      const video = this.videos[index];
      this.loads[index] = new Promise(resolve => {
        const cleanup = () => {
          video.removeEventListener('loadeddata', finish);
          video.removeEventListener('canplay', finish);
          video.removeEventListener('error', fail);
        };
        const finish = () => {
          if (video.readyState < 2) return;
          cleanup(); this.ready[index] = true; resolve(true);
        };
        const fail = () => {
          cleanup(); this.failed[index] = true; resolve(false);
        };
        video.addEventListener('loadeddata', finish);
        video.addEventListener('canplay', finish);
        video.addEventListener('error', fail, { once: true });
        video.preload = 'auto';
        video.src = video.dataset.src;
        video.load();
      });
      return this.loads[index];
    }
    nextAvailable(direction) {
      for (let distance = 1; distance <= this.slides.length; distance += 1) {
        const index = this.normalize(this.currentIndex + direction * distance);
        if (!this.failed[index]) return index;
      }
      return null;
    }
    async show(index, manual = false) {
      index = this.normalize(index);
      if (manual) this.autoplayBlocked = false;
      const request = ++this.request;
      this.pending = true; this.updateActivity();
      // Keep the current frame visible until the incoming video has a frame.
      // Paused, reduced-motion and data-saving visitors can switch posters directly.
      if (this.wantsPlayback() && !this.failed[index]) {
        const loaded = await this.ensureLoaded(index);
        if (this.destroyed || request !== this.request) return;
        if (!loaded && !manual) { this.pending = false; this.step(1); return; }
      }
      if (this.destroyed || request !== this.request) return;
      this.currentIndex = index; this.pending = false;
      const video = this.videos[index];
      if (video.readyState >= 1) video.currentTime = 0;
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
      if (manual && this.announcement) this.announcement.textContent = this.label(index);
      this.updateActivity();
    }
    step(direction, manual = false) {
      const index = manual ? this.normalize(this.currentIndex + direction) : this.nextAvailable(direction);
      if (index === null) { this.updateActivity(); return; }
      this.show(index, manual);
    }
    playCurrent() {
      const index = this.currentIndex, video = this.videos[index];
      if (!video.paused || this.playRequests.has(video)) return;
      if (video.ended) { this.step(1); return; }
      const request = video.play();
      this.playRequests.set(video, request);
      request.then(() => {
        if (index !== this.currentIndex || !this.shouldRun()) video.pause();
      }).catch(error => {
        if (this.destroyed || error.name === 'AbortError' || index !== this.currentIndex) return;
        if (error.name === 'NotAllowedError') {
          this.autoplayBlocked = true; this.updateActivity();
        } else {
          this.failed[index] = true; this.step(1);
        }
      }).finally(() => {
        this.playRequests.delete(video);
        // A quick pause/resume can cancel play before its promise settles.
        if (index === this.currentIndex && this.shouldRun() && video.paused) this.updateActivity();
      });
    }
    updateActivity() {
      if (this.destroyed) return;
      this.hero.classList.toggle('hero-motion-paused', this.motionBlocked() || this.paused);
      this.hero.classList.toggle('hero-motion-suspended', !this.shouldRun());
      this.hero.classList.toggle('is-out-of-view', !this.inView || document.hidden);
      this.videos.forEach((video, index) => {
        if (index !== this.currentIndex || !this.shouldRun()) video.pause();
      });
      if (this.wantsPlayback() && !this.pending && !this.loads[this.currentIndex] && !this.failed[this.currentIndex]) {
        this.ensureLoaded(this.currentIndex).then(() => this.updateActivity());
      }
      if (this.shouldRun()) {
        this.playCurrent();
        if (this.frame === null) this.frame = requestAnimationFrame(this.tick);
      } else {
        if (this.frame !== null) cancelAnimationFrame(this.frame);
        this.frame = null;
      }
    }
    tick() {
      this.frame = null;
      if (!this.shouldRun()) return;
      const video = this.videos[this.currentIndex];
      const fraction = Number.isFinite(video.duration) && video.duration > 0 ? video.currentTime / video.duration : 0;
      if (this.progress) this.progress.style.transform = `scaleX(${Math.min(fraction, 1)})`;
      // Download only the following clip, once the current one is halfway through.
      if (fraction >= 0.5) {
        const next = this.nextAvailable(1);
        if (next !== null && next !== this.currentIndex && !this.loads[next]) this.ensureLoaded(next);
      }
      if (video.ended) { this.step(1); return; }
      this.frame = requestAnimationFrame(this.tick);
    }
    label(index) {
      const zh = document.documentElement.lang.startsWith('zh');
      const slide = this.slides[index];
      const name = zh ? slide.dataset.zhLabel : slide.dataset.label;
      return zh ? `视频背景 ${index + 1} / ${this.slides.length}：${name}` : `Video background ${index + 1} of ${this.slides.length}: ${name}`;
    }
    translate() {
      const zh = document.documentElement.lang.startsWith('zh');
      this.controls.setAttribute('aria-label', zh ? '首页视频背景切换' : 'Homepage video background controls');
      this.buttons.forEach((button, i) => button.setAttribute('aria-label', this.label(i)));
      this.hero.querySelector('[data-hero-direction="-1"]').setAttribute('aria-label', zh ? '上一个视频背景' : 'Previous video background');
      this.hero.querySelector('[data-hero-direction="1"]').setAttribute('aria-label', zh ? '下一个视频背景' : 'Next video background');
    }
    destroy() {
      if (this.destroyed) return;
      this.destroyed = true; this.request += 1;
      if (this.frame !== null) cancelAnimationFrame(this.frame);
      this.frame = null; this.videos.forEach(video => video.pause());
      this.listeners.forEach(remove => remove()); this.classObserver.disconnect(); this.observer?.disconnect();
    }
  }
  const start = () => {
    const hero = document.querySelector('#home');
    if (!hero?.querySelector('.hero-background-slide video')) return;
    window.HeroCarousel = new HeroCarousel(hero);
    if (location.hash === '#cover-art') {
      history.replaceState(null, '', `${location.pathname}${location.search}#home`);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
