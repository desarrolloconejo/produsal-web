"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface NavbarWrapperProps {
  children: ReactNode;
}

export function NavbarWrapper({ children }: NavbarWrapperProps) {
  const pathname = usePathname();
  const isHome = pathname === "/es" || pathname === "/en" || pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // El header solo debe ser transparente si es la página de Inicio, ya se montó en el cliente y el scroll es <= 25px.
  // En SSR y en el primer frame de carga, así como en páginas internas (/contacto, /nosotros), se usa el fondo azul sólido con blur.
  const isTransparent = isHome && mounted && !isScrolled;

  return (
    <div
      data-navbar-wrapper
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ease-in-out ${
        isTransparent
          ? "bg-transparent border-b border-transparent shadow-none"
          : "bg-[#082846] lg:bg-[#082846]/95 backdrop-blur-md border-b border-white/10 shadow-md"
      }`}
    >
      {children}
    </div>
  );
}
