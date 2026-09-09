/* Signals originate at the working electrode; all positions follow the image crop. */
(() => {
  'use strict';
  class ElectrodeSignals {
    constructor(canvas) {
      this.canvas = canvas;
      this.figure = canvas.closest('.hero-art');
      this.slide = canvas.closest('.hero-background-slide');
      this.image = this.figure.querySelector('img');
      try { this.context = canvas.getContext('2d', { alpha: true }); } catch { this.context = null; }
      if (!this.context) canvas.hidden = true;
      canvas.electrodeSignals = this;
      this.width = 0; this.height = 0; this.time = 0;
      this.frame = null; this.lastTime = null; this.paused = false;
      this.inView = false; this.destroyed = false;
      this.fit = { width: 0, height: 0, x: 0, y: 0 };
      this.origin = { x: 674, y: 647 };
      this.motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.tick = this.tick.bind(this); this.resize = this.resize.bind(this);
      this.updateActivity = this.updateActivity.bind(this); this.checkViewport = this.checkViewport.bind(this);
      this.onPreferenceChange = () => { this.draw(); this.updateActivity(); };
      this.motionPreference.addEventListener('change', this.onPreferenceChange);
      this.classObserver = new MutationObserver(this.updateActivity);
      for (const node of [document.body, document.documentElement]) this.classObserver.observe(node, { attributes: true, attributeFilter: ['class'] });
      if (this.slide) this.classObserver.observe(this.slide, { attributes: true, attributeFilter: ['class'] });
      document.addEventListener('visibilitychange', this.updateActivity);
      this.image.addEventListener('load', this.resize); this.image.addEventListener('error', this.updateActivity);
      window.addEventListener('resize', this.resize, { passive: true });
      if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver(entries => {
          this.inView = entries.some(entry => entry.isIntersecting && entry.intersectionRatio > 0);
          this.updateActivity();
        }, { threshold: 0.01 });
        this.intersectionObserver.observe(this.figure);
      } else {
        window.addEventListener('scroll', this.checkViewport, { passive: true }); this.checkViewport();
      }
      if ('ResizeObserver' in window) { this.resizeObserver = new ResizeObserver(this.resize); this.resizeObserver.observe(this.figure); }
      this.resize();
    }
    get running() { return this.frame !== null; }
    shouldRun() {
      const blocked = node => node.classList.contains('motion-paused') || node.classList.contains('page-inactive');
      return !this.destroyed && Boolean(this.context) && !this.paused && this.inView && !document.hidden &&
        (!this.slide || this.slide.classList.contains('is-active')) &&
        !this.motionPreference.matches && !blocked(document.body) && !blocked(document.documentElement) &&
        this.image.complete && this.image.naturalWidth > 0 && this.width > 0 && this.height > 0;
    }
    setPaused(value) { this.paused = Boolean(value); this.updateActivity(); }
    pause() { this.setPaused(true); }
    resume() { this.setPaused(false); }
    checkViewport() {
      const box = this.figure.getBoundingClientRect();
      this.inView = box.bottom > 0 && box.top < innerHeight && box.right > 0 && box.left < innerWidth;
      this.updateActivity();
    }
    updateActivity() {
      if (this.destroyed) return;
      if (this.shouldRun()) {
        if (this.frame === null) { this.lastTime = null; this.frame = requestAnimationFrame(this.tick); }
      } else {
        if (this.frame !== null) cancelAnimationFrame(this.frame);
        this.frame = null; this.lastTime = null;
      }
    }
    resize() {
      if (this.destroyed) return;
      const box = this.figure.getBoundingClientRect();
      this.width = box.width; this.height = box.height;
      const sourceWidth = this.image.naturalWidth || 1536;
      const sourceHeight = this.image.naturalHeight || 1024;
      const fitMode = getComputedStyle(this.image).objectFit;
      const dimensions = [this.width / sourceWidth, this.height / sourceHeight];
      const scale = fitMode === 'contain' ? Math.min(...dimensions) : Math.max(...dimensions);
      // Matches the responsive CSS fit and right-center position exactly.
      this.fit = { width: sourceWidth * scale, height: sourceHeight * scale, x: this.width - sourceWidth * scale, y: (this.height - sourceHeight * scale) / 2 };
      if (this.context) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = Math.max(1, Math.round(this.width * dpr));
        this.canvas.height = Math.max(1, Math.round(this.height * dpr));
        this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (this.image.complete && this.image.naturalWidth > 0) this.draw();
      }
      if (!this.intersectionObserver) this.checkViewport();
      this.updateActivity();
    }
    tick(timestamp) {
      this.frame = null;
      if (!this.shouldRun()) { this.lastTime = null; return; }
      if (this.lastTime !== null) this.time += Math.min((timestamp - this.lastTime) / 1000, 0.06);
      this.lastTime = timestamp; this.draw(); this.frame = requestAnimationFrame(this.tick);
    }
    clear() { this.context?.clearRect(0, 0, this.width, this.height); }
    glow(x, y, radius, color, opacity) {
      const ctx = this.context;
      const light = ctx.createRadialGradient(x, y, 0, x, y, radius);
      light.addColorStop(0, `rgba(${color},${opacity})`);
      light.addColorStop(0.2, `rgba(${color},${opacity * 0.58})`);
      light.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = light; ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
    }
    drawMetalAtoms() {
      const ctx = this.context;
      // Muted brass surface atoms remain attached to the working-electrode face.
      for (let row = 0; row < 6; row += 1) {
        for (let column = 0; column < 3; column += 1) {
          const phase = this.time * (1.22 + row * 0.07) + row * 0.87 + column * 1.63;
          const x = 687 + column * 23 + Math.sin(phase) * 2.6;
          const y = 489 + row * 56 + column * 8 + Math.cos(phase * 0.91) * 3.3;
          const radius = 4.6 + (row + column) % 3 * 0.36;
          ctx.save(); ctx.translate(x, y); ctx.scale(1, 1.5);
          const sphere = ctx.createLinearGradient(-radius, -radius, radius, radius);
          sphere.addColorStop(0, '#ded4bf'); sphere.addColorStop(0.5, '#b2a181'); sphere.addColorStop(1, '#736d61');
          ctx.fillStyle = sphere; ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = 'rgba(229,218,195,.38)'; ctx.lineWidth = 0.65; ctx.stroke(); ctx.restore();
        }
      }
    }
    drawBubbles() {
      const ctx = this.context;
      // Bubbles grow at the working surface, detach, and rise through the electrolyte.
      for (let index = 0; index < 8; index += 1) {
        const phase = (this.time / (10.5 + index % 3 * 1.15) + index * 0.137) % 1;
        const growth = Math.min(phase / 0.15, 1);
        const rise = Math.max(0, (phase - 0.15) / 0.85);
        const startY = 601 + index % 4 * 58;
        const x = 677 - rise * (28 + index % 3 * 14) + Math.sin(rise * Math.PI * 2 + index) * rise * 4;
        const y = startY - rise * (startY - 466);
        const radius = (5.3 + index % 3 * 1.7) * (0.18 + growth * 0.82);
        const opacity = Math.min(1, phase / 0.06) * Math.min(1, (1 - phase) / 0.13);
        ctx.save(); ctx.translate(x, y); ctx.scale(1, 1.5); ctx.globalAlpha = opacity;
        const film = ctx.createRadialGradient(-radius * 0.28, -radius * 0.32, 0, 0, 0, radius);
        film.addColorStop(0, 'rgba(215,222,224,.08)'); film.addColorStop(0.7, 'rgba(150,166,177,.015)');
        film.addColorStop(0.9, 'rgba(193,204,211,.12)'); film.addColorStop(1, 'rgba(225,226,219,.26)');
        ctx.fillStyle = film; ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.fill();
        ctx.lineWidth = 0.9; ctx.strokeStyle = 'rgba(218,224,222,.48)'; ctx.stroke();
        ctx.lineWidth = 1.1; ctx.strokeStyle = 'rgba(237,233,219,.56)';
        ctx.beginPath(); ctx.arc(0, 0, radius * 0.78, Math.PI * 1.08, Math.PI * 1.51); ctx.stroke();
        ctx.restore();
      }
    }
    draw() {
      if (!this.context || !this.width || !this.height) return;
      this.clear(); const ctx = this.context;
      ctx.save(); ctx.translate(this.fit.x, this.fit.y); ctx.scale(this.fit.width / 1000, this.fit.height / 1000);
      this.drawMetalAtoms(); this.drawBubbles();
      // The source raster retains the measurement paths. Only their existing
      // interface focus changes luminance; no extra species or paths are drawn.
      const breath = 0.12 + Math.sin(this.time / 4) * 0.025;
      this.glow(this.origin.x, this.origin.y, 13, '231,222,200', breath);
      ctx.restore();
    }
    destroy() {
      if (this.destroyed) return; this.destroyed = true;
      if (this.frame !== null) cancelAnimationFrame(this.frame); this.frame = null;
      this.classObserver?.disconnect(); this.intersectionObserver?.disconnect(); this.resizeObserver?.disconnect();
      this.motionPreference.removeEventListener('change', this.onPreferenceChange);
      document.removeEventListener('visibilitychange', this.updateActivity);
      this.image.removeEventListener('load', this.resize); this.image.removeEventListener('error', this.updateActivity);
      window.removeEventListener('resize', this.resize); window.removeEventListener('scroll', this.checkViewport);
      this.clear();
    }
  }
  function start() { const canvas = document.querySelector('#electrode-signals'); if (canvas) window.ElectrodeSignals = new ElectrodeSignals(canvas); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
