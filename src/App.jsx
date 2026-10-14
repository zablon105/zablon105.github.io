import { useState, useEffect } from "react";
import "./App.css";
import Canvas3D from "./components/Canvas3D";
import InteractiveCodeWindow from "./components/InteractiveCodeWindow";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import InteractiveContact from "./components/InteractiveContact";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "obsidian";
  });

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="portfolio" data-theme={theme}>
      {/* Dynamic Background Noise & Ambient Glows */}
      <div className="ambient-bg-glow glow-cyan" />
      <div className="ambient-bg-glow glow-purple" />
      <div className="cyber-grid" />

      {/* Modern Glassmorphic Navbar */}
      <header className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar">
          <a className="brand" href="#home" aria-label="Go to homepage">
            <span className="brand-mark">
              <span className="mark-letter">Z</span>
              <span className="mark-letter">K</span>
            </span>
            <span className="brand-text">
              Zablon Kinzi<span className="brand-dot">.</span>
            </span>
          </a>

          <nav
            className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}
            aria-label="Main navigation"
          >
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>
              Home
            </a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)}>
              Projects
            </a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)}>
              Skills
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
          </nav>

          <div className="nav-actions">
            {/* Live Theme Switcher */}
            <ThemeSwitcher
              currentTheme={theme}
              onThemeChange={handleThemeChange}
            />

            <a
              className="nav-cta"
              href="https://github.com/zablon105"
              target="_blank"
              rel="noreferrer"
            >
              <span>GitHub</span>
              <span className="cta-arrow">↗</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`bar ${mobileMenuOpen ? "open-1" : ""}`} />
              <span className={`bar ${mobileMenuOpen ? "open-2" : ""}`} />
              <span className={`bar ${mobileMenuOpen ? "open-3" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero section-container" id="home">
          {/* 3D Particle Canvas Background with theme reactivity */}
          <div className="hero-canvas-container">
            <Canvas3D theme={theme} />
          </div>

          <div className="hero-copy">
            <div className="availability">
              <span className="status-dot pulse" />
              <span>COMPUTER SCIENCE STUDENT & FULL-STACK ENGINEER</span>
            </div>

            <h1 className="hero-title">
              Engineering scalable systems &amp;
              <br />
              <span className="gradient-text">immersive digital experiences.</span>
            </h1>

            <p className="hero-description">
              Hi, I&apos;m <strong>Zablon Kinzi</strong>. I build high-performance
              full-stack web applications with <strong>React 19</strong>,{" "}
              <strong>Python/Django</strong>, and <strong>Docker</strong>.
              Driven by clean architecture, deep algorithmic thinking, and modern
              interactive 3D design.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                <span>Explore My Work</span>
                <span className="btn-icon">↗</span>
              </a>
              <a className="button button-secondary" href="#contact">
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="hero-metrics">
              <div className="metric-item">
                <span className="metric-number">3+</span>
                <span className="metric-label">Years of Coding</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <span className="metric-number">20+</span>
                <span className="metric-label">Tech Tools Mastered</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <span className="metric-number">100%</span>
                <span className="metric-label">Clean Code Focus</span>
              </div>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/zablon105"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <span className="social-separator">/</span>
              <a href="mailto:kinzizablon@gmail.com">Email ↗</a>
              <span className="social-separator">/</span>
              <a href="#about">Learn More ↓</a>
            </div>
          </div>

          {/* Hero 3D Visual Sandbox */}
          <div className="hero-visual" aria-label="Interactive 3D developer sandbox">
            {/* 3D Orbit rings */}
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />

            {/* Interactive Code Window with 3D tilt */}
            <InteractiveCodeWindow />

            {/* Floating 3D holographic badges */}
            <div className="floating-card floating-card-top float-anim-1">
              <span className="floating-icon">⚛</span>
              <span>
                <strong>React 19 &amp; Next.js</strong>
                <small>Modern Component Architecture</small>
              </span>
            </div>

            <div className="floating-card floating-card-bottom float-anim-2">
              <span className="floating-icon">🐍</span>
              <span>
                <strong>Django &amp; PostgreSQL</strong>
                <small>Secure, Scalable Backends</small>
              </span>
            </div>

            <div className="floating-card floating-card-side float-anim-3">
              <span className="online-indicator pulse" />
              <span>
                <strong>Active &amp; Available</strong>
                <small>Kaimosi, Kenya (UTC+3)</small>
              </span>
            </div>
          </div>

          <div className="hero-bottom">
            <span>BASED IN KENYA</span>
            <span className="bottom-line" />
            <span>ARCHITECTURE · SECURITY · 3D INTERACTION</span>
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Selected Projects */}
        <ProjectsSection />

        {/* Skills Section with 20+ categorized skills & search */}
        <SkillsSection />

        {/* Contact Section with interactive copy & direct message */}
        <section className="contact section-container" id="contact">
          <p className="section-label">04 / GET IN TOUCH</p>
          <InteractiveContact />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer section-container">
        <a className="brand" href="#home">
          <span className="brand-mark">
            <span className="mark-letter">Z</span>
            <span className="mark-letter">K</span>
          </span>
          <span className="brand-text">
            Zablon Kinzi<span className="brand-dot">.</span>
          </span>
        </a>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <p className="footer-copy">
          Designed with 3D purpose. Built with React &amp; CSS.
          <br />
          <span>© {new Date().getFullYear()} Zablon Kinzi. All rights reserved.</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
