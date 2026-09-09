/* Qualitative, dependency-free interface illustrations for the Art Deco test edition. */
(function () {
  'use strict';

  const COLORS = {
    ink: '#142a4d', muted: '#64728b', green: '#386da8', mint: '#d7e2ef',
    paper: '#edf1f7', blue: '#8da8ca', paleBlue: '#e3ebf5',
    orange: '#b39864', paleOrange: '#f0e7d7', line: '#c1cedd'
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const words = {
    en: { electrode: 'Electrode', electrolyte: 'Electrolyte', surface: 'Surface', probe: 'Probe' },
    zh: { electrode: '电极', electrolyte: '电解液', surface: '表面', probe: '探针' }
  };

  class InterfaceAnimation {
    constructor(canvas, options = {}) {
      if (!canvas || typeof canvas.getContext !== 'function') {
        throw new TypeError('InterfaceAnimation requires a canvas element.');
      }
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      if (!this.ctx) throw new Error('The 2D canvas context is unavailable.');
      this.scene = ['double', 'gas', 'probe'].includes(options.scene) ? options.scene : 'double';
      this.speed = Number.isFinite(Number(options.speed)) ? clamp(Number(options.speed), 0, 3) : 1;
      this.language = String(options.language || 'en').startsWith('zh') ? 'zh' : 'en';
      const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.paused = options.paused === undefined ? Boolean(reducedMotion) : Boolean(options.paused);
      this.elapsed = 0;
      this.lastTimestamp = null;
      this.frameId = null;
      this.disposed = false;
      this.width = 0;
      this.height = 0;
      this.dpr = 1;
      this.inView = this._isInViewport();
      this._tick = this._tick.bind(this);
      this._onVisibility = () => this._sync();
      this._onResize = () => {
        this.inView = this._isInViewport();
        this._resize();
      };
      this._onScroll = () => {
        const visible = this._isInViewport();
        if (visible !== this.inView) {
          this.inView = visible;
          this._sync();
        }
      };

      document.addEventListener('visibilitychange', this._onVisibility);
      window.addEventListener('resize', this._onResize, { passive: true });
      if ('ResizeObserver' in window) {
        this.resizeObserver = new ResizeObserver(() => this._resize());
        this.resizeObserver.observe(canvas.parentElement || canvas);
      }
      if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver(entries => {
          for (const entry of entries) {
            if (entry.target === this.canvas) {
              this.inView = entry.isIntersecting && entry.intersectionRatio > 0;
              this._sync();
            }
          }
        }, { threshold: 0.01 });
        this.intersectionObserver.observe(canvas);
      } else {
        window.addEventListener('scroll', this._onScroll, { passive: true, capture: true });
      }
      this._resize();
    }

    setScene(scene) {
      if (this.disposed || !['double', 'gas', 'probe'].includes(scene) || scene === this.scene) return;
      this.scene = scene;
      this.elapsed = 0;
      this.lastTimestamp = null;
      this._draw();
      this._sync();
    }

    setSpeed(speed) {
      if (this.disposed || !Number.isFinite(Number(speed))) return;
      this.speed = clamp(Number(speed), 0, 3);
      this._sync();
    }

    setPaused(paused) {
      if (this.disposed) return;
      this.paused = Boolean(paused);
      this._sync();
      this._draw();
    }

    setLanguage(language) {
      if (this.disposed) return;
      this.language = String(language).startsWith('zh') ? 'zh' : 'en';
      this._draw();
    }

    destroy() {
      if (this.disposed) return;
      this.disposed = true;
      this._stop();
      this.resizeObserver?.disconnect();
      this.intersectionObserver?.disconnect();
      document.removeEventListener('visibilitychange', this._onVisibility);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('scroll', this._onScroll, true);
    }

    _isInViewport() {
      const rect = this.canvas.getBoundingClientRect();
      return rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth;
    }

    _resize() {
      if (this.disposed) return;
      const rect = this.canvas.getBoundingClientRect();
      this.width = Math.max(0, rect.width);
      this.height = Math.max(0, rect.height);
      this.dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      const pixelWidth = Math.max(1, Math.round(this.width * this.dpr));
      const pixelHeight = Math.max(1, Math.round(this.height * this.dpr));
      if (this.canvas.width !== pixelWidth || this.canvas.height !== pixelHeight) {
        this.canvas.width = pixelWidth;
        this.canvas.height = pixelHeight;
      }
      this._draw();
      this._sync();
    }

    _canAnimate() {
      return !this.disposed && !this.paused && !document.hidden && this.inView &&
        this.speed > 0 && this.width > 0 && this.height > 0;
    }

    _stop() {
      if (this.frameId !== null) window.cancelAnimationFrame(this.frameId);
      this.frameId = null;
      this.lastTimestamp = null;
    }

    _sync() {
      if (!this._canAnimate()) {
        this._stop();
      } else if (this.frameId === null) {
        this.frameId = window.requestAnimationFrame(this._tick);
      }
    }

    _tick(timestamp) {
      this.frameId = null;
      if (!this._canAnimate()) {
        this.lastTimestamp = null;
        return;
      }
      if (this.lastTimestamp !== null) {
        this.elapsed += clamp((timestamp - this.lastTimestamp) / 1000, 0, 0.05) * this.speed;
      }
      this.lastTimestamp = timestamp;
      this._draw();
      this._sync();
    }

    _draw() {
      if (this.disposed || !this.width || !this.height) return;
      const c = this.ctx;
      c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      c.clearRect(0, 0, this.width, this.height);
      c.save();
      c.lineCap = 'round';
      c.lineJoin = 'round';
      if (this.scene === 'probe') this._drawProbe();
      else {
        this._drawElectrode(this.scene === 'double');
        if (this.scene === 'gas') this._drawGas();
        else this._drawDoubleLayer();
      }
      c.restore();
    }

    _label(text, x, y, align = 'center', color = COLORS.muted) {
      const c = this.ctx;
      c.font = '500 10px "Avenir Next", "Segoe UI", "PingFang SC", sans-serif';
      c.fillStyle = color;
      c.textAlign = align;
      c.textBaseline = 'middle';
      c.fillText(text, x, y);
    }

    _line(x1, y1, x2, y2, color, width = 1) {
      const c = this.ctx;
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      c.strokeStyle = color;
      c.lineWidth = width;
      c.stroke();
    }

    _circle(x, y, radius, fill, stroke, lineWidth = 1) {
      const c = this.ctx;
      c.beginPath();
      c.arc(x, y, radius, 0, Math.PI * 2);
      if (fill) {
        c.fillStyle = fill;
        c.fill();
      }
      if (stroke) {
        c.lineWidth = lineWidth;
        c.strokeStyle = stroke;
        c.stroke();
      }
    }

    _electrodeBounds() {
      return { x: this.width * 0.16, right: this.width * 0.285, top: 72, bottom: this.height - 32 };
    }

    _drawElectrode(charged) {
      const c = this.ctx;
      const w = this.width;
      const { x, right, top, bottom } = this._electrodeBounds();
      const grad = c.createLinearGradient(x, 0, right, 0);
      grad.addColorStop(0, '#e6ebf2');
      grad.addColorStop(0.76, '#ccd8e7');
      grad.addColorStop(1, '#a8bbd4');
      c.fillStyle = grad;
      c.fillRect(x, top, right - x, bottom - top);
      this._line(x, top, x, bottom, '#c3cfdf');
      this._line(x, top, right, top, '#b2c4dc');
      this._line(x, bottom, right, bottom, '#b2c4dc');
      this._line(right, top, right, bottom, COLORS.green, 2);

      const wash = c.createLinearGradient(right, 0, right + w * 0.19, 0);
      wash.addColorStop(0, 'rgba(208,222,241,.5)');
      wash.addColorStop(1, 'rgba(208,222,241,0)');
      c.fillStyle = wash;
      c.fillRect(right + 2, top, w * 0.19, bottom - top);
      if (charged) {
        for (let i = 0; i < 5; i += 1) {
          const y = top + (bottom - top) * (i + 0.5) / 5;
          this._line(right - 13, y, right - 7, y, '#365d91', 1.3);
        }
      }
      const labels = words[this.language];
      this._label(labels.electrode, (x + right) / 2, 47);
      this._line((x + right) / 2, 56, (x + right) / 2, top - 8, COLORS.line);
      this._label(labels.electrolyte, w * 0.64, 47);
    }

    _ion(x, y, positive, radius) {
      const c = this.ctx;
      c.save();
      c.shadowColor = positive ? 'rgba(168,143,91,.08)' : 'rgba(74,108,157,.07)';
      c.shadowBlur = 8;
      c.shadowOffsetY = 3;
      this._circle(x, y, radius, positive ? COLORS.paleOrange : COLORS.paleBlue,
        positive ? COLORS.orange : COLORS.blue, 1);
      c.shadowBlur = 0;
      c.shadowOffsetY = 0;
      const color = positive ? '#9f8659' : '#688cb5';
      const arm = radius * 0.34;
      this._line(x - arm, y, x + arm, y, color, 1);
      if (positive) this._line(x, y - arm, x, y + arm, color, 1);
      c.restore();
    }

    _drawDoubleLayer() {
      const w = this.width;
      const { top, bottom } = this._electrodeBounds();
      const h = bottom - top;
      const r = clamp(w * 0.017, 7, 9);
      const t = this.elapsed;
      // Positions are composed for a qualitative distribution, not a numerical model.
      const ions = [
        [.355, .11, 1], [.36, .38, 1], [.35, .65, 1], [.365, .91, 1],
        [.465, .22, 1], [.465, .75, 1], [.60, .49, 1], [.80, .19, 1],
        [.81, .79, 1], [.59, .04, 0], [.72, .42, 0], [.61, .90, 0],
        [.90, .45, 0], [.91, .96, 0], [.92, .05, 0]
      ];
      ions.forEach(([px, py, positive], index) => {
        const near = px < 0.4;
        const amplitude = near ? 1.8 : 4.5;
        const dx = Math.sin(t * 0.53 + index * 2.17) * amplitude;
        const dy = Math.cos(t * 0.43 + index * 1.61) * (near ? 2.2 : 5.5);
        this._ion(px * w + dx, top + py * h + dy, Boolean(positive), r);
      });
    }

    _bubble(x, y, radius, opacity = 1) {
      const c = this.ctx;
      c.save();
      c.globalAlpha = opacity;
      const grad = c.createRadialGradient(x - radius * .3, y - radius * .3, 0, x, y, radius);
      grad.addColorStop(0, 'rgba(255,255,255,.68)');
      grad.addColorStop(.72, 'rgba(225,234,247,.21)');
      grad.addColorStop(1, 'rgba(171,194,227,.32)');
      this._circle(x, y, radius, grad, '#8ca5c8', 1);
      c.beginPath();
      c.arc(x, y, Math.max(1, radius - 3), Math.PI * 1.05, Math.PI * 1.46);
      c.strokeStyle = 'rgba(255,255,255,.96)';
      c.lineWidth = radius > 9 ? 2 : 1;
      c.stroke();
      c.restore();
    }

    _drawGas() {
      const c = this.ctx;
      const w = this.width;
      const { right, top, bottom } = this._electrodeBounds();
      const h = bottom - top;
      const t = this.elapsed;
      c.save();
      c.beginPath();
      c.rect(right + 2, 65, w - right - 12, this.height - 78);
      c.clip();
      // The staggered phases keep the first, paused frame informative as well.
      for (let i = 0; i < 7; i += 1) {
        const phase = (t * (0.070 + (i % 3) * 0.008) + i * 0.143) % 1;
        const siteY = top + h * (0.42 + (i % 3) * 0.22);
        const detach = clamp((phase - 0.16) / 0.84, 0, 1);
        const radius = clamp(w * 0.027, 9, 15) * (0.26 + Math.min(phase * 3.9, 1));
        const drift = detach * w * (0.25 + (i % 3) * 0.09);
        const x = right + radius + 2 + drift + Math.sin(detach * 5 + i) * detach * 5;
        const y = siteY - Math.pow(detach, 1.2) * h * 1.12;
        const fade = clamp((phase < .08 ? phase / .08 : (1 - phase) / .18), 0, 1);
        this._bubble(x, y, radius, fade);
      }
      // A small attached bubble makes the surface origin clear throughout a cycle.
      this._bubble(right + 5, bottom - h * .13, 4.5 + Math.sin(t * .7) * .7, .7);
      c.restore();
    }

    _surfaceAt(x) {
      const w = this.width;
      return this.height * .72 + Math.sin(x / w * Math.PI * 3.6) * 7 +
        Math.cos(x / w * Math.PI * 8.5) * 2.3;
    }

    _drawProbe() {
      const c = this.ctx;
      const w = this.width;
      const h = this.height;
      const left = w * .10;
      const right = w * .90;
      const base = h - 30;
      const atoms = Math.max(10, Math.round((right - left) / 17));
      const spacing = (right - left) / atoms;
      const radius = Math.min(8, spacing * .45);
      const positions = Array.from({ length: atoms + 1 }, (_, i) => left + i * spacing);

      c.beginPath();
      c.moveTo(left - radius, base);
      positions.forEach(x => c.lineTo(x, this._surfaceAt(x)));
      c.lineTo(right + radius, base);
      c.closePath();
      const grad = c.createLinearGradient(0, h * .69, 0, base);
      grad.addColorStop(0, '#d3deed');
      grad.addColorStop(1, 'rgba(221,232,245,.15)');
      c.fillStyle = grad;
      c.fill();

      for (const x of positions) {
        const y = this._surfaceAt(x);
        if (y + spacing * .82 < base - 4) {
          this._circle(x + spacing * .4, y + spacing * .82, radius * .81, '#e7ecf4', '#c7d3e4');
        }
        this._circle(x, y, radius, '#d7e1ef', '#93accb');
        this._circle(x - radius * .25, y - radius * .31, radius * .18, 'rgba(255,255,255,.8)');
      }

      const phase = (Math.sin(this.elapsed * .35 - Math.PI / 2) + 1) / 2;
      const scanX = left + (right - left) * (.16 + phase * .68);
      const tipY = this._surfaceAt(scanX) - radius - 9;
      // A fading trace follows the drawn surface; it carries no measurement values.
      const traceLength = (right - left) * .22;
      const direction = Math.cos(this.elapsed * .35 - Math.PI / 2) < 0 ? -1 : 1;
      c.save();
      for (let i = 20; i > 0; i -= 1) {
        const x1 = clamp(scanX - direction * traceLength * i / 20, left, right);
        const x2 = clamp(scanX - direction * traceLength * (i - 1) / 20, left, right);
        c.globalAlpha = (1 - i / 22) * .55;
        this._line(x1, this._surfaceAt(x1) - radius - 7,
          x2, this._surfaceAt(x2) - radius - 7, '#678dbb', 1.7);
      }
      c.restore();

      const beamY = tipY - 35;
      const beamLeft = Math.max(22, scanX - w * .18);
      const beamRight = Math.min(w - 22, scanX + w * .12);
      const tipHalf = clamp(w * .023, 7, 12);
      c.beginPath();
      c.moveTo(scanX - tipHalf, beamY + 6);
      c.lineTo(scanX + tipHalf, beamY + 6);
      c.lineTo(scanX, tipY);
      c.closePath();
      c.fillStyle = '#c8d6e8';
      c.fill();
      c.strokeStyle = '#8ca3c2';
      c.lineWidth = 1;
      c.stroke();
      c.fillStyle = '#e3eaf3';
      c.fillRect(beamLeft, beamY - 1, beamRight - beamLeft, 7);
      this._line(beamLeft, beamY - 1, beamRight, beamY - 1, '#97aecb', 1.3);
      this._line(beamLeft, beamY + 6, beamRight, beamY + 6, '#97aecb', 1);
      this._circle(scanX, tipY + 3, 2, COLORS.orange);

      const labels = words[this.language];
      this._label(labels.probe, w * .50, 48);
      this._label(labels.surface, w * .50, h - 15);
      const arrowY = 81;
      const arrowStart = w * .40;
      const arrowEnd = w * .60;
      this._line(arrowStart, arrowY, arrowEnd, arrowY, '#bdcbdc');
      this._line(arrowStart, arrowY, arrowStart + 4, arrowY - 3, '#bdcbdc');
      this._line(arrowStart, arrowY, arrowStart + 4, arrowY + 3, '#bdcbdc');
      this._line(arrowEnd, arrowY, arrowEnd - 4, arrowY - 3, '#bdcbdc');
      this._line(arrowEnd, arrowY, arrowEnd - 4, arrowY + 3, '#bdcbdc');
    }
  }

  window.InterfaceAnimation = InterfaceAnimation;
}());
