import { useState, useEffect, useRef } from "react";

export const themes = [
  {
    id: "obsidian",
    name: "Cosmic Obsidian",
    badge: "Best",
    icon: "🌌",
    color: "#00f2fe",
    desc: "Linear / Vercel Cyber Dark (Recommended)",
  },
  {
    id: "emerald",
    name: "Matrix Emerald",
    badge: "Hacker",
    icon: "⚡",
    color: "#10b981",
    desc: "Terminal Stealth & Mint Neon",
  },
  {
    id: "amethyst",
    name: "Royal Amethyst",
    badge: "Vibrant",
    icon: "🔮",
    color: "#c084fc",
    desc: "Velvet Purple & Sunset Rose",
  },
  {
    id: "arctic",
    name: "Arctic Titanium",
    badge: "Clean",
    icon: "❄️",
    color: "#38bdf8",
    desc: "Minimalist Slate & Glacier Blue",
  },
];

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeThemeObj =
    themes.find((t) => t.id === currentTheme) || themes[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="theme-switcher-wrapper" ref={dropdownRef}>
      <button
        type="button"
        className="theme-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Visual Theme"
      >
        <span className="theme-btn-icon">{activeThemeObj.icon}</span>
        <span className="theme-btn-text">{activeThemeObj.name}</span>
        <span
          className="theme-color-indicator"
          style={{ backgroundColor: activeThemeObj.color }}
        />
        <span className="theme-chevron">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="theme-dropdown-menu">
          <div className="theme-dropdown-header">
            <span>SELECT THEME</span>
            <span className="theme-best-hint">Cosmic Obsidian is #1</span>
          </div>
          {themes.map((theme) => {
            const isSelected = theme.id === currentTheme;
            return (
              <button
                key={theme.id}
                type="button"
                className={`theme-option-btn ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  onThemeChange(theme.id);
                  setIsOpen(false);
                }}
              >
                <div
                  className="theme-option-swatch"
                  style={{ borderColor: `${theme.color}66` }}
                >
                  <span className="theme-option-icon">{theme.icon}</span>
                </div>

                <div className="theme-option-info">
                  <div className="theme-option-top">
                    <span className="theme-option-name">{theme.name}</span>
                    {theme.badge && (
                      <span
                        className="theme-option-badge"
                        style={{
                          backgroundColor: `${theme.color}22`,
                          color: theme.color,
                          borderColor: `${theme.color}55`,
                        }}
                      >
                        {theme.badge}
                      </span>
                    )}
                  </div>
                  <span className="theme-option-desc">{theme.desc}</span>
                </div>

                {isSelected && (
                  <span
                    className="theme-check-icon"
                    style={{ color: theme.color }}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

