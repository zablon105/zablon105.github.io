import { useState } from "react";
import TiltCard from "./TiltCard";

export default function InteractiveContact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const email = "kinzizablon@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSending(true);
    // Simulate instantaneous dispatch
    setTimeout(() => {
      setSending(false);
      setSentSuccess(true);
      // Create mailto fallback link
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
        formData.subject || "Portfolio Contact: " + formData.name
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 800);
  };

  return (
    <div className="contact-interactive-grid">
      {/* Left panel: Info & Copy Card */}
      <TiltCard maxTilt={6} className="contact-info-card">
        <div className="contact-info-inner">
          <div className="availability-tag">
            <span className="status-dot pulse" />
            <span>OPEN TO WORK & COLLABORATION</span>
          </div>

          <h2>
            Let&apos;s build
            <br />
            <span className="gradient-text">something meaningful.</span>
          </h2>

          <p className="contact-text">
            Whether you have an upcoming project, an internship opportunity, or
            simply want to talk tech and architecture, my inbox is always open.
          </p>

          <div className="email-copy-box">
            <div className="email-display">
              <span className="email-label">DIRECT EMAIL</span>
              <span className="email-address">{email}</span>
            </div>
            <button
              type="button"
              className={`copy-btn ${copied ? "copied" : ""}`}
              onClick={handleCopyEmail}
            >
              {copied ? "✓ Copied!" : "Copy Email"}
            </button>
          </div>

          <div className="contact-quick-stats">
            <div className="quick-stat">
              <span className="stat-value">Kenya</span>
              <span className="stat-label">Location (UTC+3)</span>
            </div>
            <div className="quick-stat">
              <span className="stat-value">&lt; 24h</span>
              <span className="stat-label">Average Response</span>
            </div>
            <div className="quick-stat">
              <span className="stat-value">Available</span>
              <span className="stat-label">Internships & Contracts</span>
            </div>
          </div>

          <div className="contact-socials-row">
            <a
              href="https://github.com/zablon105"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub /zablon105 ↗</span>
            </a>
            <a
              href="mailto:kinzizablon@gmail.com"
              className="social-pill"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>kinzizablon@gmail.com ↗</span>
            </a>
          </div>
        </div>
      </TiltCard>

      {/* Right panel: Direct Interactive Form */}
      <TiltCard maxTilt={6} className="contact-form-card">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <h3>Send a Message</h3>
            <p>I will get back to you within 24 hours.</p>
          </div>

          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              required
              placeholder="e.g. Alex Kimani"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email Address</label>
            <input
              id="email"
              type="email"
              required
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject / Inquiry</label>
            <input
              id="subject"
              type="text"
              placeholder="e.g. Project Collaboration or Internship"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              required
              rows={4}
              placeholder="Tell me about what you're building or how I can help..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className={`button button-primary submit-btn ${sending ? "loading" : ""}`}
            disabled={sending}
          >
            {sending ? "Sending Message..." : sentSuccess ? "✓ Message Dispatched!" : "Send Message ↗"}
          </button>

          {sentSuccess && (
            <div className="form-success-banner">
              🎉 Thanks for reaching out! Your email app has been opened with the drafted message.
            </div>
          )}
        </form>
      </TiltCard>
    </div>
  );
}

