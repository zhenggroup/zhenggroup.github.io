/* Quiet, geometric light for the Art Deco hero. No external dependencies. */
(() => {
  'use strict';

  class DecoAtmosphere {
    constructor(canvas) {
      if (!canvas || !canvas.getContext) return;
      if (canvas.decoAtmosphere) return canvas.decoAtmosphere;
      this.canvas = canvas;
      this.context = canvas.getContext('2d', { alpha: true });
      if (!this.context) return;
      canvas.decoAtmosphere = this;
      this.width = 0;
      this.height = 0;
      this.time = 0;
      this.frame = null;
      this.lastTime = null;
      this.paused = false;
      this.inView = true;
      this.destroyed = false;
      this.motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

      // A fixed seed keeps resizing and pausing from changing the composition.
      let seed = 1947;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      this.particles = Array.from({ length: 23 }, () => ({
        x: 0.36 + random() * 0.65,
        y: random(),
        radius: 0.45 + random() * 0.85,
        speed: 0.004 + random() * 0.004,
        phase: random() * Math.PI * 2,
        opacity: 0.16 + random() * 0.32,
      }));

      this.tick = this.tick.bind(this);
      this.resize = this.resize.bind(this);
      this.updateActivity = this.updateActivity.bind(this);
      this.onPreferenceChange = () => {
        // The static composition is also a complete reduced-motion treatment.
        if (this.motionPreference.matches) {
          this.time = 0;
          this.draw();
        }
        this.updateActivity();
      };

      this.classObserver = new MutationObserver(this.updateActivity);
      this.classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      this.classObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      document.addEventListener('visibilitychange', this.updateActivity);
      this.motionPreference.addEventListener('change', this.onPreferenceChange);

      if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver(entries => {
          this.inView = entries[0].isIntersecting;
          this.updateActivity();
        }, { threshold: 0 });
        this.intersectionObserver.observe(canvas.closest('.hero') || canvas);
      }
      if ('ResizeObserver' in window) {
        this.resizeObserver = new ResizeObserver(this.resize);
        this.resizeObserver.observe(canvas);
      } else {
        window.addEventListener('resize', this.resize, { passive: true });
      }
      this.resize();
    }

    shouldRun() {
      if (this.destroyed || this.paused || !this.inView || document.hidden || this.motionPreference.matches) return false;
      const blocked = element => ['motion-paused', 'page-inactive', 'hero-away'].some(name => element.classList.contains(name));
      return this.width > 0 && this.height > 0 && !blocked(document.body) && !blocked(document.documentElement);
    }

    setPaused(value) {
      this.paused = Boolean(value);
      this.updateActivity();
    }

    updateActivity() {
      if (this.destroyed) return;
      if (this.shouldRun()) {
        if (this.frame === null) {
          this.lastTime = null;
          this.frame = window.requestAnimationFrame(this.tick);
        }
      } else {
        if (this.frame !== null) window.cancelAnimationFrame(this.frame);
        this.frame = null;
        this.lastTime = null;
      }
    }

    resize() {
      if (this.destroyed) return;
      const box = this.canvas.getBoundingClientRect();
      this.width = Math.max(0, box.width);
      this.height = Math.max(0, box.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.max(1, Math.round(this.width * dpr));
      this.canvas.height = Math.max(1, Math.round(this.height * dpr));
      this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.draw();
      this.updateActivity();
    }

    tick(timestamp) {
      this.frame = null;
      if (!this.shouldRun()) {
        this.lastTime = null;
        return;
      }
      if (this.lastTime !== null) this.time += Math.min((timestamp - this.lastTime) / 1000, 0.05);
      this.lastTime = timestamp;
      this.draw();
      this.frame = window.requestAnimationFrame(this.tick);
    }

    drawBeam(index) {
      const ctx = this.context;
      const w = this.width;
      const h = this.height;
      const phase = this.time * 0.11 + index * 1.9;
      const originX = w * (0.51 + index * 0.22);
      const originY = h * (1.08 - index * 0.07);
      const angle = -1.82 - index * 0.31 + Math.sin(phase) * 0.13;
      const spread = 0.09 + index * 0.012;
      const length = Math.hypot(w, h) * 1.5;
      const endX = originX + Math.cos(angle) * length;
      const endY = originY + Math.sin(angle) * length;
      const light = ctx.createLinearGradient(originX, originY, endX, endY);
      light.addColorStop(0, 'rgba(225,246,255,0.015)');
      light.addColorStop(0.18, 'rgba(190,225,255,0.17)');
      light.addColorStop(0.58, 'rgba(125,187,242,0.072)');
      light.addColorStop(1, 'rgba(163,216,255,0)');
      ctx.fillStyle = light;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + Math.cos(angle - spread) * length, originY + Math.sin(angle - spread) * length);
      ctx.lineTo(originX + Math.cos(angle + spread) * length, originY + Math.sin(angle + spread) * length);
      ctx.closePath();
      ctx.fill();

      // One silver edge evokes a cut-metal poster without a flashing flare.
      const edgeX = originX + Math.cos(angle + spread) * length;
      const edgeY = originY + Math.sin(angle + spread) * length;
      const edge = ctx.createLinearGradient(originX, originY, edgeX, edgeY);
      edge.addColorStop(0, 'rgba(205,238,255,0)');
      edge.addColorStop(0.24, 'rgba(213,238,255,0.20)');
      edge.addColorStop(0.8, 'rgba(164,216,255,0.025)');
      edge.addColorStop(1, 'rgba(164,216,255,0)');
      ctx.strokeStyle = edge;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(edgeX, edgeY);
      ctx.stroke();
    }

    drawStreamlines() {
      const ctx = this.context;
      const w = this.width;
      const h = this.height;
      const glow = ctx.createLinearGradient(w * 0.34, h * 0.9, w, h * 0.14);
      glow.addColorStop(0, 'rgba(190,216,249,0)');
      glow.addColorStop(0.4, 'rgba(185,221,246,0.17)');
      glow.addColorStop(0.8, 'rgba(210,225,246,0.10)');
      glow.addColorStop(1, 'rgba(190,216,249,0)');
      ctx.strokeStyle = glow;
      ctx.lineWidth = 0.75;
      for (let i = 0; i < 3; i += 1) {
        const drift = Math.sin(this.time * 0.09 + i * 0.6) * h * 0.012;
        const offset = i * h * 0.026;
        ctx.beginPath();
        ctx.moveTo(w * 0.31, h * 0.95 + offset + drift);
        ctx.bezierCurveTo(w * 0.79, h * 0.96 + offset, w * 0.56, h * 0.31 + offset + drift, w * 1.05, h * 0.18 + offset);
        ctx.stroke();
      }
    }

    drawParticles() {
      const ctx = this.context;
      const w = this.width;
      const h = this.height;
      const count = w < 600 ? 14 : this.particles.length;
      for (let i = 0; i < count; i += 1) {
        const particle = this.particles[i];
        const progress = ((particle.y - this.time * particle.speed) % 1 + 1) % 1;
        const edgeFade = Math.min(progress * 7, (1 - progress) * 7, 1);
        const x = particle.x * w + Math.sin(this.time * 0.12 + particle.phase) * w * 0.012;
        const y = progress * h;
        ctx.fillStyle = `rgba(236,209,146,${particle.opacity * edgeFade})`;
        ctx.beginPath();
        ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    draw() {
      if (this.destroyed || !this.context || !this.width || !this.height) return;
      const ctx = this.context;
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 3; i += 1) this.drawBeam(i);
      this.drawStreamlines();
      this.drawParticles();
      // Reserve the left side for reading even if the art spans the whole hero.
      ctx.globalCompositeOperation = 'destination-in';
      const textClearance = ctx.createLinearGradient(0, 0, this.width, 0);
      textClearance.addColorStop(0, 'rgba(0,0,0,0)');
      textClearance.addColorStop(0.29, 'rgba(0,0,0,0)');
      textClearance.addColorStop(0.55, 'rgba(0,0,0,1)');
      textClearance.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = textClearance;
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.restore();
    }

    destroy() {
      if (this.destroyed) return;
      this.destroyed = true;
      if (this.frame !== null) window.cancelAnimationFrame(this.frame);
      this.frame = null;
      this.classObserver.disconnect();
      this.intersectionObserver?.disconnect();
      this.resizeObserver?.disconnect();
      document.removeEventListener('visibilitychange', this.updateActivity);
      this.motionPreference.removeEventListener('change', this.onPreferenceChange);
      window.removeEventListener('resize', this.resize);
      this.context.clearRect(0, 0, this.width, this.height);
      delete this.canvas.decoAtmosphere;
    }
  }

  window.DecoAtmosphere = DecoAtmosphere;
  const init = () => {
    const canvas = document.getElementById('deco-atmosphere');
    if (canvas) new DecoAtmosphere(canvas);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
