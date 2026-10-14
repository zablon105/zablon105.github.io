import { useState, useRef } from "react";

/**
 * Reusable 3D Tilt Card component.
 * Applies real-time 3D perspective rotation and dynamic specular glare
 * matching mouse coordinates.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  glare = true,
  scale = 1.02,
  style = {},
  onClick,
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({
    rotX: 0,
    rotY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    isHovered: false,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate normalized -1 to +1 coordinates
    const normX = (mouseX / width - 0.5) * 2;
    const normY = (mouseY / height - 0.5) * 2;

    const rotX = -normY * maxTilt;
    const rotY = normX * maxTilt;

    setCoords({
      rotX,
      rotY,
      glareX: (mouseX / width) * 100,
      glareY: (mouseY / height) * 100,
      glareOpacity: 0.22,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setCoords({
      rotX: 0,
      rotY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
      isHovered: false,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transform: coords.isHovered
          ? `perspective(1000px) rotateX(${coords.rotX.toFixed(2)}deg) rotateY(${coords.rotY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: coords.isHovered
          ? "transform 0.1s ease-out, box-shadow 0.2s ease"
          : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease",
        position: "relative",
        ...style,
      }}
    >
      {children}

      {/* Dynamic Specular 3D Glare */}
      {glare && (
        <div
          className="tilt-glare"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 10,
            background: `radial-gradient(circle 280px at ${coords.glareX}% ${coords.glareY}%, rgba(255, 255, 255, ${coords.glareOpacity}), transparent 75%)`,
            transition: "opacity 0.25s ease",
          }}
        />
      )}
    </div>
  );
}

