// neovision_theme/public/js/particle-effects.js

class ParticleSystem {
  constructor(options = {}) {
    this.options = {
      particleCount: 100,
      particleSize: { min: 1, max: 3 },
      speed: { min: 0.5, max: 2 },
      colors: ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981"],
      opacity: { min: 0.1, max: 0.8 },
      connectionDistance: 100,
      enableConnections: true,
      enableMouse: true,
      mouseRadius: 150,
      ...options,
    };

    this.particles = [];
    this.mouse = { x: null, y: null };
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
    this.isEnabled = localStorage.getItem("neovision-particles") !== "false";

    if (this.isEnabled) {
      this.init();
    }
  }

  init() {
    this.createCanvas();
    this.createParticles();
    this.setupEventListeners();
    this.animate();
  }

  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "particle-canvas";
    this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
        `;

    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push(new Particle(this.canvas, this.options));
    }
  }

  setupEventListeners() {
    window.addEventListener("resize", () => this.resize());

    if (this.options.enableMouse) {
      document.addEventListener("mousemove", (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });

      document.addEventListener("mouseleave", () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }

    // Theme change listener
    const observer = new MutationObserver(() => {
      this.updateTheme();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update particles
    this.particles.forEach((particle) => {
      particle.update(this.mouse, this.options.mouseRadius);
      particle.draw(this.ctx);
    });

    // Draw connections
    if (this.options.enableConnections) {
      this.drawConnections();
    }

    // Draw mouse connections
    if (this.options.enableMouse && this.mouse.x !== null) {
      this.drawMouseConnections();
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.options.connectionDistance) {
          const opacity =
            (1 - distance / this.options.connectionDistance) * 0.3;

          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  drawMouseConnections() {
    this.particles.forEach((particle) => {
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.options.mouseRadius) {
        const opacity = (1 - distance / this.options.mouseRadius) * 0.5;

        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(236, 72, 153, ${opacity})`;
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
      }
    });
  }

  updateTheme() {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    this.options.colors = isDark
      ? ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981"]
      : ["#4f46e5", "#7c3aed", "#db2777", "#0891b2", "#059669"];

    this.particles.forEach((particle) => {
      particle.color =
        this.options.colors[
          Math.floor(Math.random() * this.options.colors.length)
        ];
    });
  }

  toggle() {
    if (this.isEnabled) {
      this.destroy();
    } else {
      this.init();
    }
    this.isEnabled = !this.isEnabled;
    localStorage.setItem("neovision-particles", this.isEnabled);
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas) {
      this.canvas.remove();
    }
  }
}

class Particle {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.options = options;
    this.reset();
    this.color =
      options.colors[Math.floor(Math.random() * options.colors.length)];
    this.originalSize = this.size;
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.vx = (Math.random() - 0.5) * 2 * this.options.speed.max;
    this.vy = (Math.random() - 0.5) * 2 * this.options.speed.max;
    this.size =
      Math.random() *
        (this.options.particleSize.max - this.options.particleSize.min) +
      this.options.particleSize.min;
    this.opacity =
      Math.random() * (this.options.opacity.max - this.options.opacity.min) +
      this.options.opacity.min;
    this.life = Math.random() * 100;
  }

  update(mouse, mouseRadius) {
    // Life cycle
    this.life += 0.5;

    // Breathing effect
    this.size = this.originalSize + Math.sin(this.life * 0.05) * 0.5;

    // Mouse interaction
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseRadius) {
        const force = (mouseRadius - distance) / mouseRadius;
        const angle = Math.atan2(dy, dx);
        this.vx += Math.cos(angle) * force * 0.5;
        this.vy += Math.sin(angle) * force * 0.5;
      }
    }

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Apply friction
    this.vx *= 0.99;
    this.vy *= 0.99;

    // Boundary check with smooth wrapping
    if (this.x < -10) this.x = this.canvas.width + 10;
    if (this.x > this.canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = this.canvas.height + 10;
    if (this.y > this.canvas.height + 10) this.y = -10;

    // Random movement
    this.vx += (Math.random() - 0.5) * 0.01;
    this.vy += (Math.random() - 0.5) * 0.01;

    // Speed limit
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > this.options.speed.max) {
      this.vx = (this.vx / speed) * this.options.speed.max;
      this.vy = (this.vy / speed) * this.options.speed.max;
    }
  }

  draw(ctx) {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size * 2
    );
    gradient.addColorStop(
      0,
      this.color +
        Math.floor(this.opacity * 255)
          .toString(16)
          .padStart(2, "0")
    );
    gradient.addColorStop(1, this.color + "00");

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    // Add subtle glow
    ctx.beginPath();
    ctx.fillStyle = this.color + "20";
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Advanced particle presets
class ParticlePresets {
  static neural() {
    return new ParticleSystem({
      particleCount: 80,
      colors: ["#6366f1", "#8b5cf6", "#ec4899"],
      connectionDistance: 120,
      enableConnections: true,
      speed: { min: 0.3, max: 1.5 },
    });
  }

  static cyber() {
    return new ParticleSystem({
      particleCount: 60,
      colors: ["#00fff9", "#ff0080", "#ffff00"],
      connectionDistance: 150,
      enableConnections: true,
      speed: { min: 0.5, max: 2.5 },
      particleSize: { min: 1, max: 4 },
    });
  }

  static minimal() {
    return new ParticleSystem({
      particleCount: 30,
      colors: ["#6366f1"],
      connectionDistance: 0,
      enableConnections: false,
      speed: { min: 0.1, max: 0.8 },
      opacity: { min: 0.1, max: 0.3 },
    });
  }

  static galaxy() {
    return new ParticleSystem({
      particleCount: 150,
      colors: ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981"],
      connectionDistance: 80,
      enableConnections: true,
      speed: { min: 0.2, max: 1.0 },
      particleSize: { min: 0.5, max: 2 },
      opacity: { min: 0.2, max: 0.6 },
    });
  }
}

// Initialize particle system
let particleSystem = null;

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initParticles);
} else {
  initParticles();
}

function initParticles() {
  // Get saved particle preset
  const preset = localStorage.getItem("neovision-particle-preset") || "neural";

  switch (preset) {
    case "cyber":
      particleSystem = ParticlePresets.cyber();
      break;
    case "minimal":
      particleSystem = ParticlePresets.minimal();
      break;
    case "galaxy":
      particleSystem = ParticlePresets.galaxy();
      break;
    default:
      particleSystem = ParticlePresets.neural();
  }

  // Make globally available
  window.particleSystem = particleSystem;
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ParticleSystem, ParticlePresets };
}
