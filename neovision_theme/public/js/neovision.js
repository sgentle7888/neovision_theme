// neovision_theme/public/js/neovision.js

class NeoVisionTheme {
  constructor() {
    this.init();
    this.setupEventListeners();
    this.createParticleSystem();
    this.enhanceNotifications();
  }

  init() {
    // Add theme class to body
    document.body.classList.add("neovision-theme");

    // Load Google Fonts
    this.loadFonts();

    // Initialize theme settings
    this.initializeThemeSettings();

    // Create floating action button
    this.createFloatingButton();

    // Add loading states
    this.enhanceLoadingStates();
  }

  loadFonts() {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  setupEventListeners() {
    // Enhanced form interactions
    document.addEventListener("focusin", (e) => {
      if (e.target.matches(".form-control, input, textarea, select")) {
        this.addGlowEffect(e.target);
      }
    });

    document.addEventListener("focusout", (e) => {
      if (e.target.matches(".form-control, input, textarea, select")) {
        this.removeGlowEffect(e.target);
      }
    });

    // Enhanced hover effects
    document.addEventListener("mouseover", (e) => {
      if (e.target.matches(".card, .btn, .sidebar-item")) {
        this.addHoverEffect(e.target);
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.matches(".card, .btn, .sidebar-item")) {
        this.removeHoverEffect(e.target);
      }
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        this.openCommandPalette();
      }
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        this.toggleDarkMode();
      }
    });

    // Intersection Observer for animations
    this.setupIntersectionObserver();
  }

  addGlowEffect(element) {
    element.style.boxShadow = "0 0 20px rgba(99, 102, 241, 0.4)";
    element.style.transform = "scale(1.02)";
  }

  removeGlowEffect(element) {
    element.style.boxShadow = "";
    element.style.transform = "";
  }

  addHoverEffect(element) {
    element.style.transform = "translateY(-2px) scale(1.02)";
    element.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  }

  removeHoverEffect(element) {
    element.style.transform = "";
  }

  createParticleSystem() {
    const container = document.createElement("div");
    container.id = "particle-container";
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
      this.createParticle(container);
    }
  }

  createParticle(container) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
           position: absolute;
           width: 2px;
           height: 2px;
           background: radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%);
           border-radius: 50%;
           pointer-events: none;
           animation: float ${Math.random() * 10 + 10}s linear infinite;
       `;

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 10 + "s";

    container.appendChild(particle);
  }

  enhanceNotifications() {
    // Override Frappe's notification system
    if (typeof frappe !== "undefined") {
      const originalShowAlert = frappe.show_alert;
      frappe.show_alert = (message, indicator = "blue", timeout = 5) => {
        this.showNeoNotification(message, indicator, timeout);
      };

      // Add sound effects
      this.loadNotificationSounds();
    }
  }

  showNeoNotification(message, indicator, timeout) {
    const notification = document.createElement("div");
    notification.className = `neo-notification neo-notification-${indicator}`;
    notification.innerHTML = `
           <div class="neo-notification-content">
               <div class="neo-notification-icon">
                   ${this.getNotificationIcon(indicator)}
               </div>
               <div class="neo-notification-message">${message}</div>
               <button class="neo-notification-close">&times;</button>
           </div>
       `;

    notification.style.cssText = `
           position: fixed;
           top: 20px;
           right: 20px;
           background: rgba(255, 255, 255, 0.1);
           backdrop-filter: blur(20px);
           border: 1px solid rgba(255, 255, 255, 0.2);
           border-radius: 12px;
           padding: 16px;
           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
           z-index: 10000;
           animation: slideInRight 0.3s ease-out;
           max-width: 400px;
           min-width: 300px;
       `;

    document.body.appendChild(notification);

    // Play notification sound
    this.playNotificationSound(indicator);

    // Auto-remove
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }, timeout * 1000);

    // Close button
    notification
      .querySelector(".neo-notification-close")
      .addEventListener("click", () => {
        notification.remove();
      });
  }

  getNotificationIcon(indicator) {
    const icons = {
      blue: "&#8505;",
      green: "&#10004;",
      red: "&#10006;",
      orange: "&#9888;",
      yellow: "&#9888;",
    };
    return icons[indicator] || icons["blue"];
  }

  loadNotificationSounds() {
    this.sounds = {
      success: new Audio("/assets/neovision_theme/sounds/success.mp3"),
      error: new Audio("/assets/neovision_theme/sounds/error.mp3"),
      info: new Audio("/assets/neovision_theme/sounds/info.mp3"),
    };
  }

  playNotificationSound(indicator) {
    if (!this.sounds) return;

    let sound;
    switch (indicator) {
      case "green":
        sound = this.sounds.success;
        break;
      case "red":
        sound = this.sounds.error;
        break;
      default:
        sound = this.sounds.info;
    }

    if (sound) {
      sound.volume = 0.3;
      sound.play().catch(() => {}); // Ignore autoplay restrictions
    }
  }

  createFloatingButton() {
    const fab = document.createElement("button");
    fab.className = "fab";
    fab.innerHTML = "&#9733;";
    fab.title = "NeoVision Commands (Ctrl+K)";

    fab.addEventListener("click", () => {
      this.openCommandPalette();
    });

    document.body.appendChild(fab);
  }

  openCommandPalette() {
    const palette = document.createElement("div");
    palette.className = "command-palette";
    palette.innerHTML = `
           <div class="command-palette-backdrop"></div>
           <div class="command-palette-modal">
               <div class="command-palette-header">
                   <input type="text" placeholder="Type a command..." class="command-palette-input">
               </div>
               <div class="command-palette-body">
                   <div class="command-item" data-command="toggle-dark">🌙 Toggle Dark Mode</div>
                   <div class="command-item" data-command="toggle-particles">✨ Toggle Particles</div>
                   <div class="command-item" data-command="reset-theme">🔄 Reset Theme</div>
                   <div class="command-item" data-command="export-settings">📤 Export Settings</div>
                   <div class="command-item" data-command="import-settings">📥 Import Settings</div>
               </div>
           </div>
       `;

    palette.style.cssText = `
           position: fixed;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           z-index: 20000;
           display: flex;
           align-items: center;
           justify-content: center;
       `;

    document.body.appendChild(palette);

    // Setup palette interactions
    this.setupCommandPalette(palette);
  }

  setupCommandPalette(palette) {
    const input = palette.querySelector(".command-palette-input");
    const backdrop = palette.querySelector(".command-palette-backdrop");
    const commands = palette.querySelectorAll(".command-item");

    input.focus();

    // Close on backdrop click
    backdrop.addEventListener("click", () => palette.remove());

    // Close on escape
    document.addEventListener("keydown", function escapeHandler(e) {
      if (e.key === "Escape") {
        palette.remove();
        document.removeEventListener("keydown", escapeHandler);
      }
    });

    // Filter commands
    input.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      commands.forEach((cmd) => {
        const text = cmd.textContent.toLowerCase();
        cmd.style.display = text.includes(query) ? "block" : "none";
      });
    });

    // Execute commands
    commands.forEach((cmd) => {
      cmd.addEventListener("click", () => {
        this.executeCommand(cmd.dataset.command);
        palette.remove();
      });
    });
  }

  executeCommand(command) {
    switch (command) {
      case "toggle-dark":
        this.toggleDarkMode();
        break;
      case "toggle-particles":
        this.toggleParticles();
        break;
      case "reset-theme":
        this.resetTheme();
        break;
      case "export-settings":
        this.exportSettings();
        break;
      case "import-settings":
        this.importSettings();
        break;
    }
  }

  toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("neovision-theme", newTheme);
    this.showNeoNotification(`Switched to ${newTheme} mode`, "blue");
  }

  toggleParticles() {
    const container = document.getElementById("particle-container");
    if (container) {
      container.style.display =
        container.style.display === "none" ? "block" : "none";
      const isVisible = container.style.display !== "none";
      localStorage.setItem("neovision-particles", isVisible);
      this.showNeoNotification(
        `Particles ${isVisible ? "enabled" : "disabled"}`,
        "blue"
      );
    }
  }

  resetTheme() {
    localStorage.removeItem("neovision-theme");
    localStorage.removeItem("neovision-particles");
    document.documentElement.removeAttribute("data-theme");
    this.showNeoNotification("Theme reset to default", "green");
  }

  exportSettings() {
    const settings = {
      theme: localStorage.getItem("neovision-theme"),
      particles: localStorage.getItem("neovision-particles"),
      version: "2.0.0",
    };

    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "neovision-settings.json";
    a.click();
    URL.revokeObjectURL(url);

    this.showNeoNotification("Settings exported successfully", "green");
  }

  importSettings() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const settings = JSON.parse(e.target.result);
            if (settings.theme)
              localStorage.setItem("neovision-theme", settings.theme);
            if (settings.particles)
              localStorage.setItem("neovision-particles", settings.particles);
            this.showNeoNotification("Settings imported successfully", "green");
            setTimeout(() => location.reload(), 1000);
          } catch (error) {
            this.showNeoNotification("Invalid settings file", "red");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  initializeThemeSettings() {
    // Load saved theme
    const savedTheme = localStorage.getItem("neovision-theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }

    // Load particle settings
    const particlesEnabled = localStorage.getItem("neovision-particles");
    if (particlesEnabled === "false") {
      const container = document.getElementById("particle-container");
      if (container) container.style.display = "none";
    }
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all cards and widgets
    document.querySelectorAll(".card, .widget, .form-card").forEach((el) => {
      observer.observe(el);
    });
  }

  enhanceLoadingStates() {
    // Intercept AJAX requests
    if (typeof $ !== "undefined") {
      $(document)
        .ajaxStart(() => {
          this.showGlobalLoader();
        })
        .ajaxStop(() => {
          this.hideGlobalLoader();
        });
    }

    // Add loading states to buttons
    document.addEventListener("click", (e) => {
      if (e.target.matches('.btn[data-loading="true"]')) {
        this.addButtonLoader(e.target);
      }
    });
  }

  showGlobalLoader() {
    let loader = document.getElementById("neo-global-loader");
    if (!loader) {
      loader = document.createElement("div");
      loader.id = "neo-global-loader";
      loader.innerHTML = '<div class="neo-spinner"></div>';
      loader.style.cssText = `
               position: fixed;
               top: 50%;
               left: 50%;
               transform: translate(-50%, -50%);
               z-index: 15000;
               background: rgba(255, 255, 255, 0.1);
               backdrop-filter: blur(10px);
               border-radius: 12px;
               padding: 20px;
           `;
      document.body.appendChild(loader);
    }
    loader.style.display = "block";
  }

  hideGlobalLoader() {
    const loader = document.getElementById("neo-global-loader");
    if (loader) {
      loader.style.display = "none";
    }
  }

  addButtonLoader(button) {
    const originalText = button.textContent;
    button.innerHTML =
      '<div class="neo-spinner" style="width: 16px; height: 16px;"></div>';
    button.disabled = true;

    // Simulate loading (in real app, this would be tied to actual request)
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2000);
  }
}

// Additional CSS for JavaScript-created elements
const additionalStyles = `
   .command-palette-backdrop {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background: rgba(0, 0, 0, 0.5);
       backdrop-filter: blur(5px);
   }
   
   .command-palette-modal {
       background: rgba(255, 255, 255, 0.1);
       backdrop-filter: blur(20px);
       border: 1px solid rgba(255, 255, 255, 0.2);
       border-radius: 16px;
       width: 500px;
       max-width: 90vw;
       box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
       animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
   }
   
   .command-palette-input {
       width: 100%;
       padding: 16px;
       border: none;
       background: transparent;
       color: white;
       font-size: 16px;
       outline: none;
       border-bottom: 1px solid rgba(255, 255, 255, 0.2);
   }
   
   .command-palette-input::placeholder {
       color: rgba(255, 255, 255, 0.6);
   }
   
   .command-palette-body {
       max-height: 300px;
       overflow-y: auto;
       padding: 8px;
   }
   
   .command-item {
       padding: 12px 16px;
       cursor: pointer;
       border-radius: 8px;
       transition: all 0.2s ease;
       color: rgba(255, 255, 255, 0.8);
   }
   
   .command-item:hover {
       background: rgba(255, 255, 255, 0.1);
       color: white;
       transform: translateX(4px);
   }
   
   @keyframes scaleIn {
       0% {
           transform: scale(0.8);
           opacity: 0;
       }
       100% {
           transform: scale(1);
           opacity: 1;
       }
   }
   
   @keyframes slideInRight {
       0% {
           transform: translateX(100%);
           opacity: 0;
       }
       100% {
           transform: translateX(0);
           opacity: 1;
       }
   }
   
   @keyframes slideOutRight {
       0% {
           transform: translateX(0);
           opacity: 1;
       }
       100% {
           transform: translateX(100%);
           opacity: 0;
       }
   }
   
   @keyframes float {
       0%, 100% {
           transform: translateY(0px) rotate(0deg);
       }
       50% {
           transform: translateY(-20px) rotate(180deg);
       }
   }
   
   .animate-in {
       animation: quantumFadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1);
   }
   
   .neo-notification {
       animation: slideInRight 0.3s ease-out;
   }
   
   .neo-notification-content {
       display: flex;
       align-items: center;
       gap: 12px;
       color: white;
   }
   
   .neo-notification-icon {
       font-size: 18px;
   }
   
   .neo-notification-message {
       flex: 1;
   }
   
   .neo-notification-close {
       background: none;
       border: none;
       color: white;
       font-size: 18px;
       cursor: pointer;
       padding: 0;
       width: 20px;
       height: 20px;
       display: flex;
       align-items: center;
       justify-content: center;
   }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize NeoVision Theme when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new NeoVisionTheme();
  });
} else {
  new NeoVisionTheme();
}
