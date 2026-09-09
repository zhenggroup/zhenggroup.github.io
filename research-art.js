/* Restrained Art Deco–Cubist illumination follows the subjects in each image. */
(() => {
  'use strict';

  class ResearchArtAnimation {
    constructor(figure) {
      this.figure = figure;
      this.kind = figure.dataset.art;
      this.canvas = figure.querySelector('.research-art-canvas');
      this.image = figure.querySelector('img');
      try { this.context = this.canvas?.getContext?.('2d', { alpha: true }); }
      catch { this.context = null; }
      this.frame = null;
      this.time = 0;
      this.lastTime = null;
      this.width = 0;
      this.height = 0;
      this.paused = false;
      this.inView = false;
      this.destroyed = false;
      if (!this.context) {
        if (this.canvas) this.canvas.hidden = true;
        return;
      }
      this.canvas.researchArtAnimation = this;
      this.motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.tick = this.tick.bind(this);
      this.resize = this.resize.bind(this);
      this.updateActivity = this.updateActivity.bind(this);
      this.checkViewport = this.checkViewport.bind(this);
      this.onPreferenceChange = () => {
        if (this.motionPreference.matches) this.clear();
        this.updateActivity();
      };
      this.classObserver = new MutationObserver(this.updateActivity);
      for (const element of [document.body, document.documentElement]) {
        this.classObserver.observe(element, { attributes: true, attributeFilter: ['class'] });
      }
      this.motionPreference.addEventListener('change', this.onPreferenceChange);
      document.addEventListener('visibilitychange', this.updateActivity);
      this.image.addEventListener('load', this.updateActivity);
      this.image.addEventListener('error', this.updateActivity);
      if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver(entries => {
          this.inView = entries.some(entry => entry.isIntersecting && entry.intersectionRatio > 0);
          this.updateActivity();
        }, { threshold: 0.01 });
        this.intersectionObserver.observe(figure);
      } else {
        window.addEventListener('scroll', this.checkViewport, { passive: true });
        this.checkViewport();
      }
      if ('ResizeObserver' in window) {
        this.resizeObserver = new ResizeObserver(this.resize);
        this.resizeObserver.observe(figure);
      } else {
        window.addEventListener('resize', this.resize, { passive: true });
      }
      this.resize();
    }

    get running() { return this.frame !== null; }

    shouldRun() {
      const blocked = element => element.classList.contains('motion-paused') || element.classList.contains('page-inactive');
      return !this.destroyed && Boolean(this.context) && !this.paused && this.inView && !document.hidden &&
        !this.motionPreference.matches && !blocked(document.body) && !blocked(document.documentElement) &&
        this.image.complete && this.image.naturalWidth > 0 && this.width > 0 && this.height > 0;
    }

    setPaused(value) { this.paused = Boolean(value); this.updateActivity(); }
    pause() { this.setPaused(true); }
    resume() { this.setPaused(false); }

    checkViewport() {
      const box = this.figure.getBoundingClientRect();
      this.inView = box.bottom > 0 && box.top < window.innerHeight && box.right > 0 && box.left < window.innerWidth;
      this.updateActivity();
    }

    updateActivity() {
      if (this.destroyed || !this.context) return;
      if (this.shouldRun()) {
        if (this.frame === null) {
          this.lastTime = null;
          this.frame = requestAnimationFrame(this.tick);
        }
      } else {
        if (this.frame !== null) cancelAnimationFrame(this.frame);
        this.frame = null;
        this.lastTime = null;
      }
    }

    resize() {
      if (this.destroyed || !this.context) return;
      const box = this.figure.getBoundingClientRect();
      this.width = box.width;
      this.height = box.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.max(1, Math.round(this.width * dpr));
      this.canvas.height = Math.max(1, Math.round(this.height * dpr));
      this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!this.motionPreference.matches) this.draw();
      if (!this.intersectionObserver) this.checkViewport();
      this.updateActivity();
    }

    tick(timestamp) {
      this.frame = null;
      if (!this.shouldRun()) { this.lastTime = null; return; }
      if (this.lastTime !== null) this.time += Math.min((timestamp - this.lastTime) / 1000, 0.06);
      this.lastTime = timestamp;
      this.draw();
      this.frame = requestAnimationFrame(this.tick);
    }

    clear() { this.context?.clearRect(0, 0, this.width, this.height); }

    glow(x, y, radius, color, opacity) {
      const ctx = this.context;
      const halo = ctx.createRadialGradient(x, y, 0, x, y, radius);
      halo.addColorStop(0, `rgba(${color},${opacity})`);
      halo.addColorStop(0.2, `rgba(${color},${opacity * 0.55})`);
      halo.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
    }

    drawOperando() {
      const ctx = this.context;
      // Change the light within the existing wedge, keeping its contact fixed.
      const pulse = 0.5 + Math.sin(this.time * Math.PI / 7) * 0.5;
      const targetX = 556, targetY = 633;
      const beam = ctx.createLinearGradient(140, 0, targetX, targetY);
      beam.addColorStop(0, 'rgba(225,220,206,0)');
      beam.addColorStop(0.45, `rgba(215,215,206,${0.012 + pulse * 0.018})`);
      beam.addColorStop(1, `rgba(235,225,203,${0.035 + pulse * 0.055})`);
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(90, 0); ctx.lineTo(194, 0);
      ctx.lineTo(targetX, targetY); ctx.closePath(); ctx.fill();
      this.glow(targetX, targetY, 17, '231,222,200', 0.10 + pulse * 0.12);
      this.glow(556, 601, 7, '224,216,198', 0.06 + pulse * 0.09);
    }

    drawStability() {
      const ctx = this.context;
      // Light the four existing detached species; do not add particles or trails.
      const sites = [
        { x: 632, y: 546, radius: 16 }, { x: 735, y: 483, radius: 14 },
        { x: 694, y: 587, radius: 11 }, { x: 668, y: 646, radius: 8 },
      ];
      sites.forEach((site, index) => {
        const pulse = (1 + Math.sin(this.time * Math.PI / 7 - index * 0.8)) / 2;
        ctx.fillStyle = `rgba(230,219,192,${0.025 + pulse * 0.13})`;
        const { x, y, radius: r } = site;
        ctx.beginPath(); ctx.moveTo(x - r * 0.7, y - r * 0.45);
        ctx.lineTo(x + r * 0.2, y - r * 0.8); ctx.lineTo(x + r * 0.55, y);
        ctx.lineTo(x - r * 0.35, y + r * 0.4); ctx.closePath(); ctx.fill();
      });
      const pulse = (1 + Math.sin(this.time * Math.PI / 9)) / 2;
      ctx.fillStyle = `rgba(224,222,211,${0.015 + pulse * 0.07})`;
      ctx.beginPath(); ctx.moveTo(618, 630); ctx.lineTo(637, 656);
      ctx.lineTo(618, 676); ctx.closePath(); ctx.fill();
    }

    signalPoint(progress, offset = 0) {
      // Follow the gold ribbon already painted in the illustration.
      const segments = [
        { end: 0.24, points: [[0, 866], [90, 850], [156, 735], [243, 725]] },
        { end: 0.44, points: [[243, 725], [315, 720], [364, 782], [444, 737]] },
        { end: 0.67, points: [[444, 737], [531, 693], [578, 590], [670, 590]] },
        { end: 0.9, points: [[670, 590], [749, 582], [812, 671], [897, 674]] },
        { end: 1, points: [[897, 674], [944, 680], [979, 645], [1000, 627]] },
      ];
      let lower = 0;
      const segment = segments.find(item => {
        if (progress <= item.end) return true;
        lower = item.end;
        return false;
      }) || segments[segments.length - 1];
      const t = Math.max(0, Math.min(1, (progress - lower) / (segment.end - lower)));
      const u = 1 - t;
      const [a, b, c, d] = segment.points;
      return {
        x: u ** 3 * a[0] + 3 * u ** 2 * t * b[0] + 3 * u * t ** 2 * c[0] + t ** 3 * d[0],
        y: u ** 3 * a[1] + 3 * u ** 2 * t * b[1] + 3 * u * t ** 2 * c[1] + t ** 3 * d[1] + offset * Math.pow(Math.sin(Math.PI * progress), 0.65),
      };
    }

    drawMethods() {
      const ctx = this.context;
      const head = (this.time / 16) % 1;
      for (let channel = 0; channel < 2; channel += 1) {
        const offset = channel ? 0 : 28;
        const color = channel ? '221,207,177' : '178,194,205';
        const progress = (head + channel * 0.12) % 1;
        const opacity = Math.min(progress * 10, (1 - progress) * 10, 1);
        const point = this.signalPoint(progress, offset);
        this.glow(point.x, point.y, 10, color, opacity * 0.30);
        ctx.beginPath();
        for (let index = 0; index <= 18; index += 1) {
          const p = Math.max(0, progress - 0.085 + index / 18 * 0.085);
          const tail = this.signalPoint(p, offset);
          if (!index) ctx.moveTo(tail.x, tail.y); else ctx.lineTo(tail.x, tail.y);
        }
        ctx.strokeStyle = `rgba(${color},${opacity * 0.28})`; ctx.lineWidth = 1.7; ctx.stroke();
      }
    }

    draw() {
      if (!this.context || !this.width || !this.height) return;
      this.clear();
      this.context.save();
      this.context.scale(this.width / 1000, this.height / 1000);
      if (this.kind === 'operando') this.drawOperando();
      else if (this.kind === 'stability') this.drawStability();
      else if (this.kind === 'methods') this.drawMethods();
      this.context.restore();
    }

    destroy() {
      if (this.destroyed) return;
      this.destroyed = true;
      if (this.frame !== null) cancelAnimationFrame(this.frame);
      this.frame = null;
      this.classObserver?.disconnect();
      this.intersectionObserver?.disconnect();
      this.resizeObserver?.disconnect();
      this.motionPreference?.removeEventListener('change', this.onPreferenceChange);
      document.removeEventListener('visibilitychange', this.updateActivity);
      this.image?.removeEventListener('load', this.updateActivity);
      this.image?.removeEventListener('error', this.updateActivity);
      window.removeEventListener('scroll', this.checkViewport);
      window.removeEventListener('resize', this.resize);
      this.clear();
    }
  }

  function start() {
    window.ResearchArtAnimations = Array.from(document.querySelectorAll('.research-art[data-art]'), figure => new ResearchArtAnimation(figure));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
