import TiltCard from "./TiltCard";

const principles = [
  {
    title: "Problem-First Thinking",
    description:
      "Code is just the mechanism; understanding the underlying user pain point and domain requirements is where great software truly begins.",
    icon: "🎯",
    accent: "#60e4ee",
  },
  {
    title: "Scalable Architecture",
    description:
      "Designing modular systems with clean separation of concerns, robust database schemas, and resilient RESTful endpoints that scale smoothly.",
    icon: "🏗️",
    accent: "#a99aff",
  },
  {
    title: "Continuous Craftsmanship",
    description:
      "Embracing rapid technology shifts, rigorous code reviews, automated testing, and deep-dive experimentation to perpetually refine engineering quality.",
    icon: "⚡",
    accent: "#67e8a5",
  },
];

const timeline = [
  {
    year: "Current",
    role: "Computer Science Student & Full-Stack Engineer",
    institution: "Kaimosi Friends University (KAFU)",
    description:
      "Focusing on advanced algorithms, distributed computing, database management systems, and software engineering methodologies.",
  },
  {
    year: "2025 - 2026",
    role: "Enterprise Systems Developer",
    institution: "KAFU Document Management System",
    description:
      "Architected secure paperless document exchange protocols using Django, PostgreSQL, and Supabase cloud storage.",
  },
  {
    year: "2024 - 2025",
    role: "Full-Stack Web App Developer",
    institution: "Client Project Management Platform",
    description:
      "Built multi-tenant web application incorporating automated client invoice generation, task progress tracking, and Docker deployments.",
  },
];

export default function AboutSection() {
  return (
    <section className="about section-container" id="about">
      <p className="section-label">01 / ABOUT ME</p>

      <div className="about-grid">
        <div className="about-intro">
          <h2>
            Curious mind.
            <br />
            <span className="gradient-text">Practical software architect.</span>
          </h2>

          <div className="about-copy">
            <p>
              I&apos;m <strong>Zablon Kinzi</strong>, a dedicated Computer Science
              student and full-stack software engineer based in Kenya. My journey
              is driven by an insatiable curiosity for how complex systems operate
              and a passion for translating real-world friction into elegant, reliable
              software.
            </p>
            <p>
              I specialize in bridging responsive, animated frontend interfaces
              (React, TypeScript, CSS 3D) with secure, scalable backend
              foundations (Python, Django REST Framework, PostgreSQL, Docker).
              Whether designing clean database schemas or optimizing client-side
              rendering, I focus on performance, security, and developer clarity.
            </p>
            <p>
              Beyond raw coding, I believe in empathy for the end-user, proactive
              communication, and clean system design principles that allow teams to
              iterate with confidence.
            </p>

            <div className="about-links-row">
              <a className="button button-primary" href="#contact">
                Work With Me <span>↗</span>
              </a>
              <a
                className="button button-secondary"
                href="https://github.com/zablon105"
                target="_blank"
                rel="noreferrer"
              >
                GitHub Profile <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right side: Key Engineering Principles with 3D Tilt */}
        <div className="principles-column">
          <h3 className="subheading">Core Principles</h3>
          <div className="principles-list">
            {principles.map((principle) => (
              <TiltCard
                key={principle.title}
                maxTilt={6}
                scale={1.02}
                className="principle-card-tilt"
              >
                <div className="principle-card">
                  <div
                    className="principle-icon-wrap"
                    style={{
                      borderColor: `${principle.accent}44`,
                      color: principle.accent,
                    }}
                  >
                    <span>{principle.icon}</span>
                  </div>
                  <div>
                    <h4>{principle.title}</h4>
                    <p>{principle.description}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>

      {/* Education & Experience Roadmap */}
      <div className="journey-block">
        <h3 className="subheading">Academic Background & Milestones</h3>
        <div className="timeline-container">
          {timeline.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-marker">
                <div className="marker-dot" />
                {idx !== timeline.length - 1 && <div className="marker-line" />}
              </div>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h4>{item.role}</h4>
                <p className="timeline-org">{item.institution}</p>
                <p className="timeline-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

