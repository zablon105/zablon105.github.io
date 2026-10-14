import { useState, useMemo } from "react";
import TiltCard from "./TiltCard";

export const skillCategories = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "backend", label: "Backend & APIs" },
  { id: "databases", label: "Databases & Storage" },
  { id: "devops", label: "DevOps & Tooling" },
  { id: "cs", label: "Core CS & Design" },
];

export const allSkills = [
  // Frontend
  {
    name: "React 19 & Next.js",
    category: "frontend",
    proficiency: 92,
    badge: "Core",
    level: "Advanced",
    description: "Component architecture, hooks, server components, Suspense, state management.",
    tags: ["React 19", "Hooks", "Next.js", "Virtual DOM"],
    icon: "⚛",
    color: "#60e4ee",
  },
  {
    name: "JavaScript (ES6+) & TypeScript",
    category: "frontend",
    proficiency: 90,
    badge: "Language",
    level: "Advanced",
    description: "Async/await, event loop, closures, TypeScript types, interfaces, DOM manipulation.",
    tags: ["ESNext", "TypeScript", "Async/Await", "OOP"],
    icon: "JS",
    color: "#f6c76b",
  },
  {
    name: "HTML5 & Modern CSS3",
    category: "frontend",
    proficiency: 95,
    badge: "Styling",
    level: "Expert",
    description: "Semantic HTML, Flexbox, CSS Grid, 3D Transforms, Responsive Design & animations.",
    tags: ["Responsive", "CSS Grid", "Flexbox", "Animations"],
    icon: "🎨",
    color: "#ff7777",
  },
  {
    name: "Tailwind CSS & Glassmorphism",
    category: "frontend",
    proficiency: 88,
    badge: "Design",
    level: "Proficient",
    description: "Modern utility-first styling, custom theme tokens, dark mode design systems.",
    tags: ["Tailwind", "Design Systems", "Dark Mode", "UI/UX"],
    icon: "🌊",
    color: "#38bdf8",
  },

  // Backend
  {
    name: "Python & Django",
    category: "backend",
    proficiency: 92,
    badge: "Core",
    level: "Advanced",
    description: "Robust MVC architecture, Django ORM, authentication, admin portal, security.",
    tags: ["Python 3", "Django", "ORM", "MVT"],
    icon: "🐍",
    color: "#a99aff",
  },
  {
    name: "Django REST Framework (DRF)",
    category: "backend",
    proficiency: 90,
    badge: "APIs",
    level: "Advanced",
    description: "Scalable API serialization, generic viewsets, pagination, JWT token security.",
    tags: ["DRF", "REST", "JWT Auth", "Serializers"],
    icon: "⚡",
    color: "#60e4ee",
  },
  {
    name: "Node.js & Express",
    category: "backend",
    proficiency: 82,
    badge: "Runtime",
    level: "Proficient",
    description: "Asynchronous server-side JavaScript, REST routing, middleware pipelines.",
    tags: ["Node.js", "Express", "REST", "Middleware"],
    icon: "🟢",
    color: "#67e8a5",
  },
  {
    name: "RESTful API & System Architecture",
    category: "backend",
    proficiency: 90,
    badge: "Architecture",
    level: "Advanced",
    description: "Stateless microservices, HTTP specifications, status codes, OpenAPI documentation.",
    tags: ["Microservices", "OpenAPI", "CORS", "Security"],
    icon: "🔗",
    color: "#c4a4ff",
  },

  // Databases
  {
    name: "PostgreSQL",
    category: "databases",
    proficiency: 88,
    badge: "RDBMS",
    level: "Advanced",
    description: "Relational data modeling, foreign keys, indexing, complex joins, ACID compliance.",
    tags: ["Postgres", "SQL", "Relational", "Indexing"],
    icon: "🐘",
    color: "#60e4ee",
  },
  {
    name: "Supabase & Realtime DB",
    category: "databases",
    proficiency: 85,
    badge: "BaaS",
    level: "Proficient",
    description: "Cloud PostgreSQL, Row Level Security (RLS), realtime subscriptions, storage buckets.",
    tags: ["Supabase", "Auth", "Storage", "RLS"],
    icon: "⚡",
    color: "#67e8a5",
  },
  {
    name: "SQLite & Embedded DBs",
    category: "databases",
    proficiency: 90,
    badge: "Storage",
    level: "Advanced",
    description: "Rapid prototyping, zero-configuration local embedded databases, file-based persistence.",
    tags: ["SQLite", "Prototyping", "Local Storage"],
    icon: "💾",
    color: "#98a6bc",
  },
  {
    name: "Redis Caching",
    category: "databases",
    proficiency: 78,
    badge: "Cache",
    level: "Practical",
    description: "In-memory key-value data storage, caching strategies, reducing database latency.",
    tags: ["Redis", "Caching", "Performance", "Sessions"],
    icon: "🔴",
    color: "#ff7777",
  },

  // DevOps & Tooling
  {
    name: "Docker & Containerization",
    category: "devops",
    proficiency: 84,
    badge: "DevOps",
    level: "Proficient",
    description: "Dockerfiles, multi-stage builds, docker-compose, isolated multi-service environments.",
    tags: ["Docker", "Containers", "Docker Compose", "Isolation"],
    icon: "🐳",
    color: "#60e4ee",
  },
  {
    name: "Git & GitHub Version Control",
    category: "devops",
    proficiency: 92,
    badge: "VCS",
    level: "Advanced",
    description: "Branching workflows, pull requests, merge conflict resolution, CI/CD collaboration.",
    tags: ["Git Flow", "GitHub", "Code Review", "Version Control"],
    icon: "🌿",
    color: "#ff9f43",
  },
  {
    name: "Linux & Bash Automation",
    category: "devops",
    proficiency: 82,
    badge: "OS",
    level: "Proficient",
    description: "Linux server administration, shell scripting, process monitoring, permissions, SSH.",
    tags: ["Linux", "Bash", "SSH", "Server Config"],
    icon: "🐧",
    color: "#f6c76b",
  },
  {
    name: "CI/CD & Deployment Workflows",
    category: "devops",
    proficiency: 80,
    badge: "Pipelines",
    level: "Proficient",
    description: "Automated GitHub Actions, automated testing runs, deployment to Vercel/Render.",
    tags: ["GitHub Actions", "CI/CD", "Vercel", "Automation"],
    icon: "🚀",
    color: "#a99aff",
  },

  // Core CS
  {
    name: "Data Structures & Algorithms",
    category: "cs",
    proficiency: 88,
    badge: "Foundations",
    level: "Advanced",
    description: "Trees, graphs, linked lists, sorting/searching algorithms, Big-O complexity analysis.",
    tags: ["Big-O", "Algorithms", "Optimization", "CS Degree"],
    icon: "🧠",
    color: "#60e4ee",
  },
  {
    name: "OOP & Clean Software Design",
    category: "cs",
    proficiency: 90,
    badge: "Architecture",
    level: "Advanced",
    description: "SOLID principles, Design Patterns, DRY code, separation of concerns, maintainability.",
    tags: ["SOLID", "Design Patterns", "Clean Code", "Modularity"],
    icon: "📐",
    color: "#67e8a5",
  },
  {
    name: "API Testing & Postman",
    category: "cs",
    proficiency: 86,
    badge: "QA",
    level: "Proficient",
    description: "Automated endpoint validation, mock servers, edge-case testing, regression checks.",
    tags: ["Postman", "Testing", "QA", "Validation"],
    icon: "🎯",
    color: "#ff9f43",
  },
  {
    name: "Agile & Problem Solving",
    category: "cs",
    proficiency: 92,
    badge: "Workflow",
    level: "Advanced",
    description: "Iterative development, requirements gathering, analytical root-cause debugging.",
    tags: ["Agile", "Scrum", "Problem Solving", "Collaboration"],
    icon: "💡",
    color: "#f6c76b",
  },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesCategory =
        activeCategory === "all" || skill.category === activeCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <section className="skills section-container" id="skills">
      <p className="section-label">03 / TECHNICAL TOOLKIT</p>

      <div className="section-heading">
        <div>
          <h2>Tools & Technologies I work with.</h2>
          <p>
            A comprehensive overview of my software engineering capabilities,
            from low-level logic to high-level architectures.
          </p>
        </div>

        {/* Search input */}
        <div className="skills-search-wrapper">
          <input
            type="text"
            className="skills-search-input"
            placeholder="Search skills (e.g. React, Django, Docker)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="category-pills">
        {skillCategories.map((cat) => {
          const count =
            cat.id === "all"
              ? allSkills.length
              : allSkills.filter((s) => s.category === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              className={`category-pill ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.label}</span>
              <span className="pill-badge">{count}</span>
            </button>
          );
        })}
      </div>

      {/* 3D Skills Cards Grid */}
      <div className="skills-card-grid">
        {filteredSkills.map((skill) => (
          <TiltCard
            key={skill.name}
            maxTilt={9}
            scale={1.03}
            className="skill-card-3d"
          >
            <div className="skill-card-inner">
              <div className="skill-card-header">
                <div
                  className="skill-icon-badge"
                  style={{
                    borderColor: `${skill.color}55`,
                    color: skill.color,
                    boxShadow: `0 0 15px ${skill.color}22`,
                  }}
                >
                  {skill.icon}
                </div>
                <div className="skill-title-group">
                  <h3>{skill.name}</h3>
                  <div className="skill-meta-tags">
                    <span className="skill-badge-tag">{skill.badge}</span>
                    <span className="skill-level-text">{skill.level}</span>
                  </div>
                </div>
              </div>

              <p className="skill-description">{skill.description}</p>

              {/* Proficiency Gauge */}
              <div className="skill-progress-wrap">
                <div className="skill-progress-info">
                  <span>Proficiency</span>
                  <span className="skill-percent">{skill.proficiency}%</span>
                </div>
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{
                      width: `${skill.proficiency}%`,
                      background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                    }}
                  />
                </div>
              </div>

              {/* Tag Pills */}
              <div className="skill-tag-pills">
                {skill.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="skills-empty-state">
          <p>No technologies found matching &quot;{searchTerm}&quot;</p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              setSearchTerm("");
              setActiveCategory("all");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}

