"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ArrowRight, Phone, Mail, ChevronDown } from "lucide-react";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Locale;
  dict: {
    home: string;
    about: string;
    products: string;
    quality: string;
    contact: string;
    intranet?: string;
  };
  productsDict?: Dictionary["products"];
}

export function MobileMenu({ isOpen, onClose, currentLang, dict, productsDict }: MobileMenuProps) {
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Controlar animación fluida de entrada y salida (slide-in / slide-out)
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimateIn(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setAnimateIn(false);
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => {
        setShouldRender(false);
        setProductsExpanded(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-end overflow-hidden">
      {/* Backdrop con blur y fade in/out */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[#082846]/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          animateIn ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer deslizante desde la derecha (slide-in y slide-out) */}
      <div
        className={`relative w-full max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          animateIn ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabecera del Drawer */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#02afab] font-heading">
              Menú Produsal
            </span>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Enlaces de navegación */}
          <nav className="mt-6 flex flex-col gap-2 font-heading">
            {/* Inicio */}
            <Link
              href={`/${currentLang}`}
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-800 hover:text-[#02afab] hover:bg-slate-50 font-bold text-base transition-colors"
            >
              <span>{dict.home}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            {/* Quiénes Somos */}
            <Link
              href={`/${currentLang}/nosotros`}
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-800 hover:text-[#02afab] hover:bg-slate-50 font-bold text-base transition-colors"
            >
              <span>{dict.about}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            {/* Productos con Acordeón Desplegable */}
            <div className="flex flex-col rounded-2xl bg-slate-50/80 border border-slate-200/60 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5">
                <Link
                  href={`/${currentLang}#productos`}
                  onClick={onClose}
                  className="flex items-center gap-2 text-slate-800 hover:text-[#02afab] font-bold text-base transition-colors flex-1"
                >
                  <span className="w-2 h-2 rounded-full bg-[#02afab]" />
                  <span>{dict.products}</span>
                </Link>
                <button
                  onClick={() => setProductsExpanded((prev) => !prev)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-[#02afab] hover:bg-slate-200/50 transition-colors cursor-pointer"
                  aria-label="Desplegar categorías de productos"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      productsExpanded ? "rotate-180 text-[#02afab]" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Contenido expandible del acordeón de productos */}
              {productsExpanded && productsDict?.categories && (
                <div className="px-3 pb-3 pt-1 flex flex-col gap-1 border-t border-slate-200/50 bg-white">
                  {productsDict.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/${currentLang}/construccion?categoria=${category.id}`}
                      onClick={onClose}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
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

                  <div className="my-1 border-t border-slate-100" />
                  <Link
                    href={`/${currentLang}#productos`}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#008784] hover:bg-[#02afab]/10 font-heading transition-colors"
                  >
                    <span>{currentLang === "es" ? "Ver todos los productos" : "View all products"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

          </nav>
        </div>

        {/* Acciones inferiores: Botón Contáctanos y datos de contacto */}
        <div className="pt-6 border-t border-slate-100 flex flex-col gap-3 font-heading">
          <Link
            href={`/${currentLang}/contacto`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[#02afab] hover:bg-[#008784] text-white font-bold shadow-md shadow-[#02afab]/20 hover:shadow-lg transition-all"
            aria-label={currentLang === "es" ? "Contáctanos" : "Contact Us"}
          >
            <Phone className="w-4 h-4" />
            <span>{currentLang === "es" ? "Contáctanos" : "Contact Us"}</span>
          </Link>

          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex flex-col gap-1.5 font-sans">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#02afab]" />
              <span>0212 208 51 11 / 0800 2274455</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#02afab]" />
              <span>info@grupomimesa.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
