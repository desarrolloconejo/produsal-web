"use client";

import { ReactNode, useEffect, useRef, useState, ElementType } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade" | "scale-up";
  delay?: number; // en milisegundos (ej: 100, 200)
  duration?: number; // en milisegundos (default: 650)
  threshold?: number; // umbral de visibilidad (default: 0.12)
  once?: boolean; // animar solo una vez (default: true)
  as?: ElementType;
}

export function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 650,
  threshold = 0.12,
  once = true,
  as: Component = "div",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Si el usuario prefiere movimiento reducido, mostrar inmediatamente
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px", // se activa ligeramente antes de entrar por abajo
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      // Si el elemento ya está dentro o por encima de la ventana visible al montar (evita parpadeos o saltos de layout al cambiar de idioma o recargar con scroll)
      const rect = currentEl.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setIsVisible(true);
        if (once) return;
      }
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold, once]);

  // Estilos de transformación inicial según la animación elegida
  const getInitialTransform = () => {
    switch (animation) {
      case "fade-up":
        return "translateY(28px)";
      case "fade-down":
        return "translateY(-28px)";
      case "fade-left":
        return "translateX(28px)";
      case "fade-right":
        return "translateX(-28px)";
      case "scale-up":
        return "scale(0.96)";
      case "fade":
      default:
        return "none";
    }
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "none" : getInitialTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: isVisible ? "auto" : "opacity, transform",
  };

  return (
    <Component
      ref={elementRef as unknown as React.Ref<never>}
      style={style}
      className={className}
    >
      {children}
    </Component>
  );
}
