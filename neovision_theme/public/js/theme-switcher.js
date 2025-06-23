// neovision_theme/public/js/theme-switcher.js

class ThemeSwitcher {
  constructor() {
    this.themes = {
      neural: {
        name: "Neural",
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#ec4899",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
      cyber: {
        name: "Cyber",
        primary: "#00fff9",
        secondary: "#ff0080",
        accent: "#ffff00",
        gradient: "linear-gradient(135deg, #00fff9 0%, #ff0080 100%)",
      },
      ocean: {
        name: "Ocean",
        primary: "#0ea5e9",
        secondary: "#06b6d4",
        accent: "#10b981",
        gradient: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
      },
      sunset: {
        name: "Sunset",
        primary: "#f59e0b",
        secondary: "#ef4444",
        accent: "#ec4899",
        gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
      },
      forest: {
        name: "Forest",
        primary: "#059669",
        secondary: "#065f46",
        accent: "#10b981",
        gradient: "linear-gradient(135deg, #059669 0%, #065f46 100%)",
      },
    };

    this.createThemeSwitcher();
    this.loadSavedTheme();
  }

  createThemeSwitcher() {
    const switcher = document.createElement("div");
    switcher.className = "theme-switcher";
    switcher.innerHTML = `
            <div class="theme-switcher-toggle">🎨</div>
            <div class="theme-options">
                ${Object.entries(this.themes)
                  .map(
                    ([key, theme]) =>
                      `<div class="theme-option" data-theme="${key}" title="${theme.name}" style="background: ${theme.gradient}"></div>`
                  )
                  .join("")}
            </div>
        `;

    document.body.appendChild(switcher);
    this.setupThemeSwitcher(switcher);
  }

  setupThemeSwitcher(switcher) {
    const toggle = switcher.querySelector(".theme-switcher-toggle");
    const options = switcher.querySelector(".theme-options");

    toggle.addEventListener("click", () => {
      options.style.display =
        options.style.display === "flex" ? "none" : "flex";
    });

    switcher.querySelectorAll(".theme-option").forEach((option) => {
      option.addEventListener("click", () => {
        const themeName = option.dataset.theme;
        this.applyTheme(themeName);
        options.style.display = "none";
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!switcher.contains(e.target)) {
        options.style.display = "none";
      }
    });
  }

  applyTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty("--neo-primary", theme.primary);
    root.style.setProperty("--neo-secondary", theme.secondary);
    root.style.setProperty("--neo-accent", theme.accent);
    root.style.setProperty("--neural-gradient-1", theme.gradient);

    // Update background
    document.body.style.background = theme.gradient;
    document.body.style.backgroundSize = "400% 400%";

    // Save theme preference
    localStorage.setItem("neovision-color-theme", themeName);

    // Show notification
    if (window.neoVision) {
      window.neoVision.showNeoNotification(
        `Applied ${theme.name} theme`,
        "blue"
      );
    }
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem("neovision-color-theme");
    if (savedTheme && this.themes[savedTheme]) {
      this.applyTheme(savedTheme);
    }
  }
}

// Additional CSS for theme switcher
const themeSwitcherStyles = `
    .theme-switcher {
        position: fixed;
        top: 20px;
        right: 80px;
        z-index: 1001;
    }
    
    .theme-switcher-toggle {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 18px;
    }
    
    .theme-switcher-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
    }
    
    .theme-options {
        position: absolute;
        top: 50px;
        right: 0;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 8px;
        display: none;
        flex-direction: column;
        gap: 8px;
        min-width: 120px;
    }
    
    .theme-option {
        width: 100%;
        height: 30px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .theme-option:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    
    .theme-option::after {
        content: attr(title);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 10px;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
`;

// Add theme switcher styles
const themeSwitcherStyleSheet = document.createElement("style");
themeSwitcherStyleSheet.textContent = themeSwitcherStyles;
document.head.appendChild(themeSwitcherStyleSheet);

// Initialize theme switcher
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ThemeSwitcher();
  });
} else {
  new ThemeSwitcher();
}
