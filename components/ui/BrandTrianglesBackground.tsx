import React from "react";

interface BrandTrianglesBackgroundProps {
  layout?: "together" | "separated" | "green-only" | "blue-only";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center-right" | "split";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  opacityClass?: string;
}

const GREEN_COLOR = "#8fae5c"; // Verde salina oficial
const BLUE_COLOR = "#8ba5c4";  // Azul pizarra oficial

/**
 * Elemento decorativo de fondo con triángulos 2D corporativos
 * 100% plano, geométrico y fiel al manual de identidad Produsal.
 */
export function BrandTrianglesBackground({
  layout = "together",
  position = "bottom-right",
  size = "md",
  className = "",
  opacityClass = "opacity-30",
}: BrandTrianglesBackgroundProps) {
  // Dimensiones según tamaño
  const scaleMap = {
    xs: { greenW: 46, greenH: 53, blueW: 40, blueH: 64, duoW: 110, duoH: 88 },
    sm: { greenW: 90, greenH: 104, blueW: 100, blueH: 150, duoW: 200, duoH: 160 },
    md: { greenW: 140, greenH: 162, blueW: 155, blueH: 232, duoW: 300, duoH: 240 },
    lg: { greenW: 220, greenH: 254, blueW: 245, blueH: 368, duoW: 460, duoH: 370 },
    xl: { greenW: 300, greenH: 346, blueW: 335, blueH: 502, duoW: 620, duoH: 500 },
  };

  const currentScale = scaleMap[size];

  // Posicionamiento absoluto
  const positionClasses = {
    "bottom-right": "bottom-0 right-0 lg:right-6 pointer-events-none select-none",
    "bottom-left": "bottom-0 left-0 lg:left-6 pointer-events-none select-none",
    "top-right": "top-0 right-0 lg:right-8 pointer-events-none select-none",
    "top-left": "top-0 left-0 lg:left-8 pointer-events-none select-none",
    "center-right": "top-1/2 -translate-y-1/2 right-0 pointer-events-none select-none",
    "split": "inset-0 pointer-events-none select-none",
  };

  // 1. Layout: Separados (un triángulo a la izquierda y otro a la derecha)
  if (layout === "separated" || position === "split") {
    return (
      <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}>
        {/* Triángulo Verde plano 2D en esquina inferior izquierda */}
        <div
          className={`absolute bottom-0 left-4 lg:left-12 ${opacityClass} transition-opacity duration-300`}
          style={{ width: currentScale.greenW, height: currentScale.greenH }}
        >
          <svg
            viewBox="0 0 100 115"
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="50,0 0,115 100,115" fill={GREEN_COLOR} />
          </svg>
        </div>

        {/* Triángulo Azul plano 2D esbelto en esquina inferior derecha */}
        <div
          className={`absolute bottom-0 right-4 lg:right-12 ${opacityClass} transition-opacity duration-300`}
          style={{ width: currentScale.blueW, height: currentScale.blueH }}
        >
          <svg
            viewBox="0 0 100 160"
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="50,0 0,160 100,160" fill={BLUE_COLOR} />
          </svg>
        </div>
      </div>
    );
  }

  // 2. Layout: Solo Verde
  if (layout === "green-only") {
    return (
      <div
        className={`absolute ${positionClasses[position]} ${opacityClass} overflow-hidden z-0 ${className}`}
        style={{ width: currentScale.greenW, height: currentScale.greenH }}
      >
        <svg
          viewBox="0 0 100 115"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="50,0 0,115 100,115" fill={GREEN_COLOR} />
        </svg>
      </div>
    );
  }

  // 3. Layout: Solo Azul
  if (layout === "blue-only") {
    return (
      <div
        className={`absolute ${positionClasses[position]} ${opacityClass} overflow-hidden z-0 ${className}`}
        style={{ width: currentScale.blueW, height: currentScale.blueH }}
      >
        <svg
          viewBox="0 0 100 160"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="50,0 0,160 100,160" fill={BLUE_COLOR} />
        </svg>
      </div>
    );
  }

  // 4. Layout: Juntos (Duo idéntico a la referencia de manual)
  return (
    <div
      className={`absolute ${positionClasses[position]} ${opacityClass} overflow-hidden z-0 ${className}`}
      style={{ width: currentScale.duoW, height: currentScale.duoH }}
    >
      <svg
        viewBox="0 0 280 220"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Triángulo Verde plano 2D a la izquierda */}
        <polygon points="65,75 5,215 125,215" fill={GREEN_COLOR} />
        {/* Triángulo Azul plano 2D esbelto a la derecha */}
        <polygon points="200,10 125,215 275,215" fill={BLUE_COLOR} />
      </svg>
    </div>
  );
}
