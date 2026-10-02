"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface HeaderProps {
  currentLang: Locale;
  dict: {
    home: string;
    about: string;
    products: string;
    quality: string;
    contact: string;
  };
  productsDict?: Dictionary["products"];
}

export function Header({ currentLang, dict, productsDict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProductsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleHomeClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="w-full relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-6">
        {/* Logo Produsal */}
        <Link
          href={`/${currentLang}`}
          onClick={handleHomeClick}
          className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-[#02afab] rounded-lg p-1"
          aria-label="Produsal - Inicio"
        >
          <Image
            src="/images/PRODUSAL-white.webp"
            alt="Produsal - Productora de Sal Marina"
            width={160}
            height={35}
            priority
            className="object-contain max-h-6 sm:max-h-7 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            href={`/${currentLang}`}
            onClick={handleHomeClick}
            className="px-3.5 py-2 rounded-lg text-sm font-semibold text-white/85 hover:text-[#02afab] hover:bg-white/5 transition-all duration-200 relative group"
          >
            <span>{dict.home}</span>
            <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[#02afab] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
          </Link>

          <Link
            href={`/${currentLang}/nosotros`}
            className="px-3.5 py-2 rounded-lg text-sm font-semibold text-white/85 hover:text-[#02afab] hover:bg-white/5 transition-all duration-200 relative group"
          >
            <span>{dict.about}</span>
            <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[#02afab] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
          </Link>

          {/* Menú Desplegable de Productos Rediseñado */}
          <div
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <Link
              href={`/${currentLang}/productos`}
              onClick={() => setProductsDropdownOpen(false)}
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-white/85 hover:text-[#02afab] hover:bg-white/5 transition-all duration-200 relative flex items-center gap-1.5 group"
            >
              <span>{dict.products}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 text-white/60 group-hover:text-[#02afab] ${
                  productsDropdownOpen ? "rotate-180 text-[#02afab]" : ""
                }`}
              />
              <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[#02afab] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
            </Link>

            {/* Dropdown Minimalista y Seguro */}
            {productsDropdownOpen && productsDict?.categories && (
              <div className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-1.5 text-[#082846]">
                  {/* Lista de Categorías */}
                  <div className="flex flex-col">
                    {productsDict.categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/${currentLang}/productos/${category.slug}`}
                        onClick={() => setProductsDropdownOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-[#082846] group-hover:text-[#008784] font-heading transition-colors truncate">
                            {category.name}
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal truncate">
                            {category.tagline}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#008784] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>

                  {/* Separador y Enlace General */}
                  <div className="my-1 border-t border-slate-100" />
                  <Link
                    href={`/${currentLang}/productos`}
                    onClick={() => setProductsDropdownOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold text-[#008784] hover:bg-[#02afab]/10 font-heading transition-colors"
                  >
                    <span>{currentLang === "es" ? "Ver todos los productos" : "View all products"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>


        </nav>

        {/* Botón Contáctanos Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={`/${currentLang}/contacto`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#02afab] hover:bg-[#008784] shadow-sm shadow-[#02afab]/20 hover:shadow-md hover:shadow-[#02afab]/30 transition-all duration-200 group font-heading"
            aria-label={currentLang === "es" ? "Contáctanos" : "Contact Us"}
          >
            <Phone className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            <span>{currentLang === "es" ? "Contáctanos" : "Contact Us"}</span>
          </Link>
        </div>

        {/* Botón Hamburger Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 rounded-xl text-white/90 hover:text-[#02afab] hover:bg-white/10 transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#02afab]"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Menú deslizable para dispositivos móviles */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentLang={currentLang}
        dict={dict}
        productsDict={productsDict}
      />
    </header>
  );
}
