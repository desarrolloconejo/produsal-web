"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface NavbarWrapperProps {
  children: ReactNode;
}

export function NavbarWrapper({ children }: NavbarWrapperProps) {
  const pathname = usePathname();
  const isHome = pathname === "/es" || pathname === "/en" || pathname === "/";

  // Recuperar estado previo para evitar reinicios o saltos visuales al cambiar de idioma
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("produsal_header_visible");
      if (saved !== null) return saved === "true";
      return true;
    }
    return true;
  });

  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > 25;
    }
    return false;
  });

  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const ticking = useRef(false);

  // Persistir la visibilidad del header para mantenerla estable entre cambios de ruta / idioma
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("produsal_header_visible", isVisible.toString());
    }
  }, [isVisible]);

  useEffect(() => {
    const handleScroll = (isInitial = false) => {
      const currentScrollY = Math.max(0, window.scrollY);

      // Si se está ejecutando un cambio de idioma, ignorar eventos de scroll para no reiniciar el header
      if (typeof document !== "undefined" && document.documentElement.dataset.langSwitching === "true") {
        lastScrollY.current = currentScrollY;
        setIsScrolled(currentScrollY > 25);
        return;
      }

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Detectar desacoplamiento al pasar 25px
          setIsScrolled(currentScrollY > 25);

          // Si es la sincronización inicial al montar, solo sincronizar posición sin forzar plegado
          if (isInitial) {
            lastScrollY.current = currentScrollY;
            ticking.current = false;
            return;
          }

          // Lógica de smart sticky (siempre visible en el tope, ocultar al bajar, mostrar al subir)
          if (currentScrollY < 60) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY.current + 8) {
            // Scroll hacia abajo -> Ocultar
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current - 8) {
            // Scroll hacia arriba -> Mostrar
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    handleScroll(true);

    const onScroll = () => handleScroll(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determinar clases de fondo según si está acoplado al Hero o desacoplado
  const isCoupledToHero = isHome && !isScrolled;

  return (
    <div
      data-navbar-wrapper
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isCoupledToHero
          ? "bg-transparent border-b border-transparent shadow-none"
          : "bg-[#082846]/95 backdrop-blur-md border-b border-white/10 shadow-md"
      } ${
        isVisible ? "translate-y-0" : "-translate-y-full pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}
