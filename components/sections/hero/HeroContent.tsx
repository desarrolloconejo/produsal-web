import Link from "next/link";
import { ArrowRight, Waves } from "lucide-react";
import type { Locale } from "@/dictionaries/get-dictionary";

interface HeroContentProps {
  currentLang: Locale;
  dict: {
    badge: string;
    headlineHighlight: string;
    headlineRest: string;
    description: string;
    ctaProducts: string;
    ctaAbout: string;
  };
}

export function HeroContent({ currentLang, dict }: HeroContentProps) {
  return (
    <div className="max-w-4xl flex flex-col gap-4 sm:gap-6 text-left">
      {/* Texto superior sin fondo, sin borde y sin icono */}
      <p className="animate-slide-up text-xs sm:text-base font-bold text-[#02aeaa] tracking-normal font-heading">
        {dict.badge}
      </p>

      {/* Gran Título Corporativo */}
      <h1 className="animate-slide-up-delay-1 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] font-heading">
        <span className="text-[#02aeaa] drop-shadow-xs">
          {dict.headlineHighlight}
        </span>{" "}
        <span className="text-white/95 block sm:inline">
          {dict.headlineRest}
        </span>
      </h1>

      {/* Párrafo Descriptivo con tamaño estándar de lectura */}
      <p className="animate-slide-up-delay-2 text-xs sm:text-base text-white/80 max-w-2xl font-normal leading-relaxed">
        {dict.description}
      </p>

      {/* Botones de Acción (CTAs) */}
      <div className="animate-slide-up-delay-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
        <Link
          href={`/${currentLang}/productos`}
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#02aeaa] hover:bg-[#029693] text-white font-bold text-sm shadow-md shadow-[#02aeaa]/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group font-heading text-center"
        >
          <span>{dict.ctaProducts}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
        </Link>

        <Link
          href={`/${currentLang}/nosotros`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-[#85b2cf]/15 text-white font-semibold text-sm border border-[#85b2cf]/40 hover:border-[#85b2cf] backdrop-blur-sm transition-all duration-200 font-heading text-center"
        >
          <Waves className="w-4 h-4 text-[#85b2cf] shrink-0" />
          <span>{dict.ctaAbout}</span>
        </Link>
      </div>
    </div>
  );
}
