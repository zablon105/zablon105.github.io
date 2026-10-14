import { useState } from "react";
import TiltCard from "./TiltCard";

export const projects = [
  {
    number: "01",
    name: "Client Project Management System",
    type: "Full-Stack Enterprise Web Application",
    status: "Active Production",
    description:
      "A complete enterprise platform designed to help teams coordinate client deliverables, track milestones in real-time, collect structured client feedback, and generate automated PDF invoices.",
    stack: ["React 19", "Django REST", "PostgreSQL", "Docker", "Tailwind CSS"],
    highlights: ["Role-Based Access Control", "Automated Billing & Invoices", "Dockerized Multi-Service Architecture"],
    symbol: "CP",
    color: "cyan",
    gradient: "linear-gradient(135deg, #0e2a38 0%, #08111e 100%)",
    github: "https://github.com/zablon105/client-project-mangement-system",
  },
  {
    number: "02",
    name: "KAFU Document Management System",
    type: "University Information & Archive System",
    status: "Institutional Project",
    description:
      "A high-security document repository built for Kaimosi Friends University to eliminate physical paper lag, streamline document routing across university departments, and ensure encrypted archival.",
    stack: ["Django", "Python", "PostgreSQL", "Supabase Storage", "Row Level Security"],
    highlights: ["Encrypted Document Uploads", "Multi-Tier Department Workflows", "Immutable Audit Logging"],
    symbol: "KD",
    color: "purple",
    gradient: "linear-gradient(135deg, #2b1d4a 0%, #0f0f22 100%)",
    github: "https://github.com/zablon105",
  },
  {
    number: "03",
    name: "Smart Student Companion",
    type: "Academic Productivity & Campus Hub",
    status: "In Development",
    description:
      "A student-centric digital ecosystem providing automated timetable synchronization, GPA progress tracking, shared course repositories, and offline-capable study utilities.",
    stack: ["React", "JavaScript", "Python APIs", "Progressive Web App"],
    highlights: ["Offline-Ready Architecture", "Smart Timetable Scheduling", "Academic Performance Analytics"],
    symbol: "SC",
    color: "green",
    gradient: "linear-gradient(135deg, #0f352e 0%, #09171d 100%)",
    github: "https://github.com/zablon105",
  },
  {
    number: "04",
    name: "Algorithmic Visualizer & Engine",
    type: "Computer Science & Data Structures Visualizer",
    status: "Interactive Tool",
    description:
      "A high-performance visual workbench rendering sorting algorithms (QuickSort, MergeSort) and pathfinding algorithms (A*, Dijkstra) at 60fps with real-time complexity analytics.",
    stack: ["React 19", "TypeScript", "HTML5 Canvas", "Algorithm Optimization"],
    highlights: ["60 FPS Canvas Animations", "Step-by-step Traceback", "Big-O Memory & Time Benchmarking"],
    symbol: "AV",
    color: "orange",
    gradient: "linear-gradient(135deg, #3d2410 0%, #15111b 100%)",
    github: "https://github.com/zablon105",
  },
  {
    number: "05",
    name: "Cloud File Vault & REST API Service",
    type: "Containerized Backend Microservice",
    status: "Architecture Prototype",
    description:
      "A resilient file management service engineered with Django REST Framework, Docker, and Redis caching. Supports chunked encrypted multipart uploads and JWT token security.",
    stack: ["Python", "Django REST", "Docker Compose", "PostgreSQL", "Redis"],
    highlights: ["Resumable Chunked Uploads", "JWT Authentication", "Redis Distributed Cache"],
    symbol: "CV",
    color: "cyan",
    gradient: "linear-gradient(135deg, #102a3a 0%, #09131d 100%)",
    github: "https://github.com/zablon105",
  },
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.stack.some((tech) =>
      tech.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <section className="projects section-container" id="projects">
      <p className="section-label">02 / SELECTED WORK</p>

      <div className="section-heading">
        <div>
          <h2>Engineered with purpose.</h2>
          <p>
            Real-world systems, client applications, and architectural concepts
            I have built and maintained.
          </p>
        </div>

        {/* Tech filter buttons */}
        <div className="project-filter-buttons">
          <button
            type="button"
            className={`proj-filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Work
          </button>
          <button
            type="button"
            className={`proj-filter-btn ${filter === "django" ? "active" : ""}`}
            onClick={() => setFilter("django")}
          >
            Django & Python
          </button>
          <button
            type="button"
            className={`proj-filter-btn ${filter === "react" ? "active" : ""}`}
            onClick={() => setFilter("react")}
          >
            React
          </button>
          <button
            type="button"
            className={`proj-filter-btn ${filter === "docker" ? "active" : ""}`}
            onClick={() => setFilter("docker")}
          >
            Docker
          </button>
        </div>
      </div>

      <div className="project-grid">
        {filteredProjects.map((project) => (
          <TiltCard
            key={project.number}
            maxTilt={8}
            scale={1.02}
            className="project-card-3d"
          >
            <article className="project-card">
              {/* 3D Art Header */}
              <div
                className={`project-art ${project.color}`}
                style={{ background: project.gradient }}
              >
                <div className="project-art-glow" />
                <div className="project-art-mesh" />

                <span className="project-index">{project.number} / PROJECT</span>
                <span className="project-status-pill">{project.status}</span>

                <div className="project-symbol-3d">
                  <div className="symbol-glass">{project.symbol}</div>
                </div>

                <span className="project-art-caption">FULL-STACK SOLUTION</span>
              </div>

              {/* Card Body */}
              <div className="project-body">
                <p className="project-type">{project.type}</p>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>

                {/* Key Architectural Highlights */}
                <div className="project-highlights">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="highlight-item">
                      <span className="highlight-bullet">▹</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="tag-list">
                  {project.stack.map((technology) => (
                    <span className="tag" key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="project-actions">
                  <a
                    className="project-link"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>View Repository</span>
                    <span className="arrow">↗</span>
                  </a>
                </div>
              </div>
            </article>
          </TiltCard>
        ))}
      </div>

      <div className="project-footer-note">
        <div className="note-icon">💡</div>
        <p>
          Continuous improvements and new feature branches are regularly pushed to
          my GitHub repositories. Explore the commit history for architectural
          decisions and implementation depth.
        </p>
      </div>
    </section>
  );
}

