import { useEffect, useRef } from "react";

/**
 * High-performance 3D interactive particle sphere and constellation canvas.
 * Renders in pure HTML5 Canvas with 3D projection math and mouse reactivity.
 * Automatically adapts particle lighting and satellite nodes to current theme.
 */

const themePalettes = {
  obsidian: {
    particles: ["#00f2fe", "#a855f7", "#38bdf8"],
    satellites: ["#00f2fe", "#a855f7", "#38bdf8", "#67e8a5"],
    lineColor: "rgba(0, 242, 254,",
  },
  emerald: {
    particles: ["#10b981", "#34d399", "#06b6d4"],
    satellites: ["#10b981", "#34d399", "#06b6d4", "#a7f3d0"],
    lineColor: "rgba(16, 185, 129,",
  },
  amethyst: {
    particles: ["#c084fc", "#f43f5e", "#fb7185"],
    satellites: ["#c084fc", "#f43f5e", "#fb7185", "#e879f9"],
    lineColor: "rgba(192, 132, 252,",
  },
  arctic: {
    particles: ["#38bdf8", "#60a5fa", "#93c5fd"],
    satellites: ["#38bdf8", "#60a5fa", "#93c5fd", "#cbd5e1"],
    lineColor: "rgba(56, 189, 248,",
  },
};

export default function Canvas3D({ className = "", theme = "obsidian" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const palette = themePalettes[theme] || themePalettes.obsidian;

    // Mouse tracking for 3D rotation
    let targetRotationX = 0.003;
    let targetRotationY = 0.005;
    let rotX = 0;
    let rotY = 0;

    // Create 3D particles distributed on a sphere and concentric rings
    const particleCount = 140;
    const radius = Math.min(width, height) * 0.36;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particles.push({
        origX: x,
        origY: y,
        origZ: z,
        x,
        y,
        z,
        baseSize: Math.random() * 2 + 1.2,
        color: palette.particles[i % palette.particles.length],
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Concentric orbiting satellites
    const satellites = [
      { radius: radius * 1.25, angle: 0, speed: 0.012, tilt: 0.4, color: palette.satellites[0], size: 3.5, label: "React" },
      { radius: radius * 1.35, angle: 2.1, speed: -0.009, tilt: -0.5, color: palette.satellites[1], size: 4, label: "Django" },
      { radius: radius * 1.45, angle: 4.2, speed: 0.015, tilt: 0.8, color: palette.satellites[2], size: 3, label: "Postgres" },
      { radius: radius * 1.15, angle: 1.2, speed: -0.014, tilt: -0.2, color: palette.satellites[3], size: 3.5, label: "Docker" },
    ];

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetRotationY = (x / width) * 0.025;
      targetRotationX = -(y / height) * 0.025;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth damping rotation
      rotX += (targetRotationX - rotX) * 0.06;
      rotY += (targetRotationY - rotY) * 0.06;

      // Base auto-spin
      const angleY = rotY + 0.004;
      const angleX = rotX;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Center of canvas
      const cx = width / 2;
      const cy = height / 2;
      const fov = 380;

      // Rotate and project particles
      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D rotation around Y axis
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // 3D rotation around X axis
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Perspective projection
        const scale = fov / (fov + z2 + radius * 1.2);
        const projX = cx + x1 * scale;
        const projY = cy + y1 * scale;
        const alpha = Math.max(0.12, Math.min(1, (z2 + radius) / (radius * 2)));

        // Pulse size
        const size = p.baseSize * scale * (1 + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.25);

        p.x = x1;
        p.y = y1;
        p.z = z2;

        projected.push({ projX, projY, z: z2, scale, alpha, size, color: p.color });
      }

      // Sort by depth (painter's algorithm)
      projected.sort((a, b) => b.z - a.z);

      // Draw constellation connection lines for close nodes
      ctx.lineWidth = 0.7;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.projX - p2.projX;
          const dy = p1.projY - p2.projY;
          const distSq = dx * dx + dy * dy;

          if (distSq < 3200) {
            const lineAlpha = (1 - distSq / 3200) * 0.24 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = `${palette.lineColor} ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.stroke();
          }
        }
      }

      // Draw 3D glowing particles
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, Math.max(0.8, p.size), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Extra soft glow for prominent front nodes
        if (p.z > 0 && p.size > 2) {
          ctx.beginPath();
          ctx.arc(p.projX, p.projY, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.22;
          ctx.fill();
        }
      }

      // Render 3D Satellites (Orbiting Tech Pills)
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        const satX = sat.radius * Math.cos(sat.angle);
        const satY = sat.radius * Math.sin(sat.angle) * Math.sin(sat.tilt);
        const satZ = sat.radius * Math.sin(sat.angle) * Math.cos(sat.tilt);

        // Apply sphere rotations
        let rx = satX * cosY - satZ * sinY;
        let rz1 = satZ * cosY + satX * sinY;
        let ry = satY * cosX - rz1 * sinX;
        let rz = rz1 * cosX + satY * sinX;

        const scale = fov / (fov + rz + radius * 1.2);
        const px = cx + rx * scale;
        const py = cy + ry * scale;
        const alpha = Math.max(0.2, (rz + radius * 1.5) / (radius * 3));

        // Draw satellite node
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, sat.size * scale * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = sat.color;
        ctx.shadowColor = sat.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw small tech label pill
        ctx.font = `600 ${Math.max(9, Math.floor(11 * scale))}px "Space Grotesk", monospace`;
        ctx.fillStyle = "#ffffff";
        ctx.fillText(sat.label, px + 8 * scale, py + 4 * scale);
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`canvas-3d ${className}`}
      aria-label="Interactive 3D particle sphere"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
