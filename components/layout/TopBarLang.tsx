"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import type { Locale } from "@/dictionaries/get-dictionary";

function VenezuelaFlag({ className = "w-4 h-2.5" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-xs overflow-hidden shrink-0 shadow-xs`}
      viewBox="0 0 750 500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="750" height="500" fill="#cf142b" />
      <rect width="750" height="333.33" fill="#00247d" />
      <rect width="750" height="166.67" fill="#fcd116" />
      {/* 8 Estrellas blancas en arco central */}
      <defs>
        <g id="ve-star">
          <polygon
            points="0,-8 2.4,-2.5 8,-2.5 3.5,1 5.2,6.5 0,3.2 -5.2,6.5 -3.5,1 -8,-2.5 -2.4,-2.5"
            fill="#ffffff"
          />
        </g>
      </defs>
      <g transform="translate(375, 305)">
        <use href="#ve-star" transform="rotate(-65) translate(0, -68)" />
        <use href="#ve-star" transform="rotate(-46) translate(0, -68)" />
        <use href="#ve-star" transform="rotate(-27) translate(0, -68)" />
        <use href="#ve-star" transform="rotate(-9) translate(0, -68)" />
        <use href="#ve-star" transform="rotate(9) translate(0, -68)" />
        <use href="#ve-star" transform="rotate(27) translate(0, -68)" />
        <use href="#ve-star" transform="rotate(46) translate(0, -68)" />
        <use href="#ve-star" transform="rotate(65) translate(0, -68)" />
      </g>
    </svg>
  );
}

function USAFlag({ className = "w-4 h-2.5" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-xs overflow-hidden shrink-0 shadow-xs`}
      viewBox="0 0 640 480"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#bd3d44" d="M0 0h640v480H0z" />
      <path
        stroke="#fff"
        strokeWidth="37"
        d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640"
      />
      <path fill="#192f5d" d="M0 0h260v258H0z" />
      <circle cx="45" cy="45" r="9" fill="#fff" />
      <circle cx="95" cy="45" r="9" fill="#fff" />
      <circle cx="145" cy="45" r="9" fill="#fff" />
      <circle cx="195" cy="45" r="9" fill="#fff" />
      <circle cx="70" cy="90" r="9" fill="#fff" />
      <circle cx="120" cy="90" r="9" fill="#fff" />
      <circle cx="170" cy="90" r="9" fill="#fff" />
      <circle cx="215" cy="90" r="9" fill="#fff" />
      <circle cx="45" cy="135" r="9" fill="#fff" />
      <circle cx="95" cy="135" r="9" fill="#fff" />
      <circle cx="145" cy="135" r="9" fill="#fff" />
      <circle cx="195" cy="135" r="9" fill="#fff" />
      <circle cx="70" cy="180" r="9" fill="#fff" />
      <circle cx="120" cy="180" r="9" fill="#fff" />
      <circle cx="170" cy="180" r="9" fill="#fff" />
      <circle cx="215" cy="180" r="9" fill="#fff" />
      <circle cx="45" cy="220" r="9" fill="#fff" />
      <circle cx="95" cy="220" r="9" fill="#fff" />
      <circle cx="145" cy="220" r="9" fill="#fff" />
      <circle cx="195" cy="220" r="9" fill="#fff" />
    </svg>
  );
}

interface TopBarLangProps {
  currentLang: Locale;
  dict: {
    email?: string;
    phone?: string;
  };
}

export function TopBarLang({ currentLang, dict }: TopBarLangProps) {
  const pathname = usePathname();
  const router = useRouter();

  const getLanguageUrl = (target: Locale) => {
    if (!pathname) return `/${target}`;
    return pathname.replace(new RegExp(`^/${currentLang}`), `/${target}`) || `/${target}`;
  };

  const handleLanguageSwitch = (target: Locale, e: React.MouseEvent) => {
    e.preventDefault();
    if (currentLang === target) return;

    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      try {
        sessionStorage.setItem("produsal_preserve_scroll", currentScrollY.toString());
      } catch {
        // Fallback
      }

      document.documentElement.dataset.langSwitching = "true";
      document.documentElement.style.scrollBehavior = "auto";

      const hash = window.location.hash || "";
      const targetUrl = getLanguageUrl(target) + hash;

      router.replace(targetUrl, { scroll: false });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // El <html> vive en el layout raíz (sin acceso al idioma), así que se sincroniza aquí
    document.documentElement.lang = currentLang;

    try {
      const savedScroll = sessionStorage.getItem("produsal_preserve_scroll");
      if (savedScroll !== null) {
        sessionStorage.removeItem("produsal_preserve_scroll");
        const targetY = parseInt(savedScroll, 10);
        if (!isNaN(targetY)) {
          window.scrollTo({ top: targetY, behavior: "instant" });

          requestAnimationFrame(() => {
            window.scrollTo({ top: targetY, behavior: "instant" });
            setTimeout(() => {
              window.scrollTo({ top: targetY, behavior: "instant" });
              document.documentElement.style.scrollBehavior = "";
              delete document.documentElement.dataset.langSwitching;
            }, 100);
          });
          return;
        }
      }
    } catch {
      // Fallback
    }

    document.documentElement.style.scrollBehavior = "";
    delete document.documentElement.dataset.langSwitching;
  }, [currentLang]);

  const contactEmail = dict.email || "infoprodusal@grupomimesa.com";

  return (
    <aside
      aria-label={currentLang === "es" ? "Información de contacto y selector de idioma" : "Contact information and language selector"}
      className="w-full bg-white text-[#183c6b]/80 text-xs py-2 px-4 sm:px-6 lg:px-8 transition-colors select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-end sm:justify-between gap-4">
        {/* Correo de contacto visible solo en pantallas sm en adelante; oculto en móvil */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href={`mailto:${contactEmail}`}
            className="flex items-center gap-2 text-[#183c6b]/80 hover:text-[#02aeaa] transition-colors group"
          >
            <Mail className="w-3.5 h-3.5 text-[#02aeaa] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">{contactEmail}</span>
          </a>
        </div>

        {/* Selector de idioma con banderas y valor es / en (único elemento visible en móvil) */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <Link
            href={getLanguageUrl("es")}
            scroll={false}
            onClick={(e) => handleLanguageSwitch("es", e)}
            data-value="es"
            aria-label="Español - Venezuela (es)"
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold transition-all duration-200 ${
              currentLang === "es"
                ? "bg-[#02aeaa] text-white shadow-xs cursor-default"
                : "text-[#183c6b]/70 hover:text-[#183c6b] hover:bg-white cursor-pointer"
            }`}
          >
            <VenezuelaFlag className="w-4 h-3" />
            <span className="uppercase text-[11px] font-bold tracking-wider">es</span>
          </Link>

          <span className="text-slate-300 text-[10px]">|</span>

          <Link
            href={getLanguageUrl("en")}
            scroll={false}
            onClick={(e) => handleLanguageSwitch("en", e)}
            data-value="en"
            aria-label="English (en)"
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold transition-all duration-200 ${
              currentLang === "en"
                ? "bg-[#02aeaa] text-white shadow-xs cursor-default"
                : "text-[#183c6b]/70 hover:text-[#183c6b] hover:bg-white cursor-pointer"
            }`}
          >
            <USAFlag className="w-4 h-3" />
            <span className="uppercase text-[11px] font-bold tracking-wider">en</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
