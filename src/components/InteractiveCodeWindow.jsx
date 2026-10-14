import { useState } from "react";
import TiltCard from "./TiltCard";

const codeTabs = [
  {
    id: "developer",
    filename: "developer.ts",
    language: "typescript",
    lines: [
      { num: "01", text: 'import { Engineer } from "@core/system";' },
      { num: "02", text: "" },
      { num: "03", text: "export const zablon: Engineer = {" },
      { num: "04", text: '  name: "Zablon Kinzi",' },
      { num: "05", text: '  role: "Full-Stack Software Engineer",' },
      { num: "06", text: '  location: "Kenya (Available Globally)",' },
      { num: "07", text: "  mindset: [" },
      { num: "08", text: '    "Problem-First Thinking",' },
      { num: "09", text: '    "Scalable Architecture",' },
      { num: "10", text: '    "Clean, Maintainable Code"' },
      { num: "11", text: "  ]," },
      { num: "12", text: "  status: \"Ready to build high-impact systems\"," },
      { num: "13", text: "};" },
    ],
    executionOutput: [
      "⚡ Compiling developer.ts (TypeScript 5.4)...",
      "✔ Core module loaded successfully [0.12s]",
      "🟢 Status: ONLINE | Active & Building Solutions",
      "🚀 zablon.init() -> Ready for collaboration!",
    ],
  },
  {
    id: "stack",
    filename: "stack.config.json",
    language: "json",
    lines: [
      { num: "01", text: "{" },
      { num: "02", text: '  "core_stack": {' },
      { num: "03", text: '    "frontend": ["React 19", "Next.js", "TypeScript"],' },
      { num: "04", text: '    "backend": ["Python", "Django", "FastAPI", "Node.js"],' },
      { num: "05", text: '    "database": ["PostgreSQL", "Supabase", "Redis"],' },
      { num: "06", text: '    "devops": ["Docker", "GitHub Actions", "Linux"]' },
      { num: "07", text: "  }," },
      { num: "08", text: '  "performance": "Optimized & Scalable",' },
      { num: "09", text: '  "coverage": "High Quality & Tested"' },
      { num: "10", text: "}" },
    ],
    executionOutput: [
      "📦 Resolving tech stack dependencies...",
      "✔ React 19 + Python/Django pipeline verified",
      "✔ PostgreSQL connection pool healthy",
      "✨ Stack ready for production enterprise build.",
    ],
  },
  {
    id: "service",
    filename: "api_service.py",
    language: "python",
    lines: [
      { num: "01", text: "from rest_framework.views import APIView" },
      { num: "02", text: "from rest_framework.response import Response" },
      { num: "03", text: "" },
      { num: "04", text: "class ImpactAPI(APIView):" },
      { num: "05", text: "    def get(self, request):" },
      { num: "06", text: "        return Response({" },
      { num: "07", text: '            "author": "Zablon Kinzi",' },
      { num: "08", text: '            "mission": "Turning ideas into reality",' },
      { num: "09", text: '            "uptime": "99.9%",' },
      { num: "10", text: "        })" },
    ],
    executionOutput: [
      "🐍 Python 3.12 Django Server Initialized...",
      "Starting development server at http://127.0.0.1:8000/",
      "GET /api/v1/impact/ HTTP/1.1 200 OK [14ms]",
      "✨ Response: {\"mission\": \"Turning ideas into reality\"}",
    ],
  },
];

export default function InteractiveCodeWindow() {
  const [activeTab, setActiveTab] = useState(codeTabs[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setShowTerminal(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 600);
  };

  return (
    <TiltCard maxTilt={8} scale={1.02} className="code-window-tilt">
      <div className="code-window">
        {/* Window Bar with interactive tabs */}
        <div className="window-bar">
          <div className="window-dots">
            <span title="Close" />
            <span title="Minimize" />
            <span title="Expand" />
          </div>

          <div className="window-tabs">
            {codeTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`window-tab-btn ${activeTab.id === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="tab-dot" />
                {tab.filename}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`run-code-btn ${isRunning ? "running" : ""}`}
            onClick={handleRun}
            title="Execute Code"
          >
            {isRunning ? "Running..." : "▶ Run"}
          </button>
        </div>

        {/* Code Content */}
        <div className="code-content">
          {activeTab.lines.map((line, idx) => (
            <div key={idx} className="code-line">
              <span className="line-number">{line.num}</span>
              <span className="line-text">
                {formatCodeSyntax(line.text)}
              </span>
            </div>
          ))}
          <div className="code-comment">// Built with passion, curiosity & dedication.</div>
        </div>

        {/* Live Terminal Output Drawer */}
        {showTerminal && (
          <div className="code-terminal">
            <div className="terminal-header">
              <span>TERMINAL OUTPUT</span>
              <button
                type="button"
                className="terminal-close"
                onClick={() => setShowTerminal(false)}
              >
                ✕
              </button>
            </div>
            <div className="terminal-body">
              {activeTab.executionOutput.map((out, i) => (
                <div key={i} className="terminal-line">
                  {out}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </TiltCard>
  );
}

// Helper to colorize common keywords and strings
function formatCodeSyntax(text) {
  if (!text) return "\u00A0";

  // Simple clean token parser for keywords
  const parts = text.split(/(".*?"|'.*?'|\b(?:import|from|export|const|def|class|return|true|false)\b)/g);

  return parts.map((part, index) => {
    if (/^["'].*["']$/.test(part)) {
      return <span key={index} className="code-green">{part}</span>;
    }
    if (/^(import|from|export|const|def|class|return)$/.test(part)) {
      return <span key={index} className="code-purple">{part}</span>;
    }
    if (/^(true|false)$/.test(part)) {
      return <span key={index} className="code-orange">{part}</span>;
    }
    return <span key={index}>{part}</span>;
  });
}

