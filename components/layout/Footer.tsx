"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone, Building2 } from "lucide-react";
import type { Locale } from "@/dictionaries/get-dictionary";

interface FooterProps {
  currentLang: Locale;
  dict: {
    companyDescription: string;
    quickLinksTitle: string;
    contactTitle: string;
    address: string;
    plantLabel?: string;
    plantAddress?: string;
    officeLabel?: string;
    officeAddress?: string;
    phone: string;
    email: string;
    scrollToTop: string;
    copyright: string;
    privacyPolicy?: string;
    developerCredit: string;
  };
  navDict: {
    home: string;
    about: string;
    products: string;
    gallery: string;
    quality: string;
    contact: string;
  };
}

export function Footer({ currentLang, dict, navDict }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isEs = currentLang === "es";

  const quickLinks = [
    { href: `/${currentLang}`, label: navDict.home },
    { href: `/${currentLang}/nosotros`, label: navDict.about },
    { href: `/${currentLang}#productos`, label: navDict.products },
    { href: `/${currentLang}/galeria`, label: navDict.gallery },
    { href: `/${currentLang}/contacto`, label: navDict.contact },
    {
      href: `/${currentLang}/privacidad`,
      label: dict.privacyPolicy || (isEs ? "Políticas de Privacidad" : "Privacy Policy"),
    },
  ];

  return (
    <footer className="w-full bg-[#183c6b] text-white pt-16 border-t border-[#02aeaa]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grilla principal del Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Columna 1: Logo, Descripción Corporativa y Redes (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative flex items-center w-fit">
              <Image
                src="/images/PRODUSAL-white.webp"
                alt="Produsal - Productora de Sal Marina"
                width={160}
                height={35}
                className="object-contain max-h-6 sm:max-h-7 w-auto"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md font-normal">
              {dict.companyDescription}
            </p>

            {/* Redes Sociales */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#02aeaa] text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#02aeaa]"
                aria-label="LinkedIn Produsal"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#02aeaa] text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#02aeaa]"
                aria-label="Instagram Produsal"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#02aeaa] text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#02aeaa]"
                aria-label="Facebook Produsal"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#02aeaa]" />
              {dict.quickLinksTitle}
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-white/75">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-[#02aeaa] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Información de Contacto & Botón Subir (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e5c798]" />
              {dict.contactTitle}
            </h3>

            <div className="flex flex-col gap-3.5 text-sm text-white/75">
              {/* Planta Industrial y Salinas */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#e5c798] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col text-xs leading-relaxed">
                  <span className="font-bold text-[#e5c798] uppercase tracking-wider text-[10px]">
                    {dict.plantLabel || (currentLang === "es" ? "Planta y Salinas" : "Plant & Salt Flats")}
                  </span>
                  <span className="text-white/90">
                    {dict.plantAddress || "Complejo Industrial Los Olivitos, Edo. Zulia"}
                  </span>
                </div>
              </div>

              {/* Oficinas Administrativas */}
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-[#85b2cf] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col text-xs leading-relaxed">
                  <span className="font-bold text-[#85b2cf] uppercase tracking-wider text-[10px]">
                    {dict.officeLabel || (currentLang === "es" ? "Oficinas Administrativas" : "Corporate Offices")}
                  </span>
                  <span className="text-white/90">
                    {dict.officeAddress || "Maracaibo, Edo. Zulia, Venezuela"}
                  </span>
                </div>
              </div>

              {/* Teléfonos */}
              <div className="flex items-start gap-3 pt-1 border-t border-white/10">
                <Phone className="w-4 h-4 text-[#02aeaa] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 text-xs text-white/90">
                  <a
                    href="tel:02122085111"
                    className="hover:text-white transition-colors font-medium"
                  >
                    0212 208 51 11
                  </a>
                  <a
                    href="tel:08002274455"
                    className="hover:text-[#02aeaa] transition-colors font-medium text-[#85b2cf]"
                  >
                    0800 2274455
                  </a>
                </div>
              </div>

              {/* Correo */}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#85b2cf] flex-shrink-0" />
                <a
                  href="mailto:infoprodusal@grupomimesa.com"
                  className="hover:text-white transition-colors text-xs text-white/90"
                >
                  infoprodusal@grupomimesa.com
                </a>
              </div>
            </div>

            {/* Botón para subir de nuevo al inicio */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#02aeaa] text-white text-xs font-semibold tracking-wide transition-all duration-200 border border-white/10 hover:border-[#02aeaa] group cursor-pointer"
              >
                <span>{dict.scrollToTop}</span>
                <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Barra Inferior: Copyright, Políticas de Privacidad & Desarrollado by El Conejo Del Sombrero */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <p>{dict.copyright}</p>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-white/80">
            <span>{dict.developerCredit}</span>
            <a
              href="https://elconejodelsombrero.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#02aeaa] underline underline-offset-2 transition-colors"
            >
              El Conejo Del Sombrero
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
