import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

export type HistorySectionDict = Dictionary["historySection"];

interface HistoryContentProps {
  currentLang: Locale;
  dict: HistorySectionDict;
}

export function HistoryContent({ currentLang, dict }: HistoryContentProps) {
  if (!dict) return null;

  const era1989 = dict.eras?.find((e) => e.year === "1989") || dict.eras?.[0];
  const era1999 = dict.eras?.find((e) => e.year === "1999") || dict.eras?.[1];
  const eraHoy = dict.eras?.find((e) => e.year === "Hoy" || e.year === "Now") || dict.eras?.[dict.eras?.length ? dict.eras.length - 1 : 2];

  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
      {/* 1. Cabecera Panorámica Editorial con Imagen de Salinas en Borde Curvo/Diagonal */}
      <ScrollReveal animation="fade-up">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-200/80 pb-8 sm:pb-12">
          {/* Lado Izquierdo: Texto Editorial */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <span className="text-[#008784] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
              {dict.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#082846] tracking-tight leading-[1.15]">
              {dict.title}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
              {dict.description}
            </p>
          </div>

          {/* Lado Derecho: Fotografía Panorámica con Remate Curvo y Diagonal */}
          <div className="lg:col-span-5 relative w-full h-52 sm:h-64 lg:h-72 overflow-hidden rounded-3xl lg:rounded-tl-[60px] lg:rounded-br-[60px] shadow-lg border border-slate-200/60 group">
            <Image
              src="/images/produsal-salina-horizonte.webp"
              alt="Complejo Industrial Salinas Los Olivitos - Vista Panorámica"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            {/* Máscara con gradiente sutil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#082846]/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 bg-[#082846]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#02afab] animate-pulse" />
              <span className="text-[11px] font-heading font-medium tracking-wide">
                {currentLang === "es" ? "Salinas Los Olivitos • Producción Solar" : "Los Olivitos Salt Flats • Solar Harvesting"}
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 2. Fila Superior: Los 2 Hitos Fundacionales (1989 • 1999) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1989 */}
        {era1989 && (
          <ScrollReveal delay={0} animation="fade-up">
            <article className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white shadow-sm border border-slate-200/80 hover:border-[#02afab]/50 hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
              <span className="absolute -top-3 -right-2 text-7xl sm:text-8xl font-black text-slate-200/40 font-heading select-none pointer-events-none tracking-tighter">
                {era1989.year}
              </span>

              <div className="relative z-10 flex flex-col gap-2.5">
                <span className="text-xs font-bold text-[#02afab] uppercase tracking-wider font-heading">
                  {era1989.year} • {era1989.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#082846] tracking-tight leading-snug">
                  {era1989.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal pt-1">
                  {era1989.description}
                </p>
              </div>
            </article>
          </ScrollReveal>
        )}

        {/* 1999 */}
        {era1999 && (
          <ScrollReveal delay={120} animation="fade-up">
            <article className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white shadow-sm border border-slate-200/80 hover:border-[#02afab]/50 hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
              <span className="absolute -top-3 -right-2 text-7xl sm:text-8xl font-black text-slate-200/40 font-heading select-none pointer-events-none tracking-tighter">
                {era1999.year}
              </span>

              <div className="relative z-10 flex flex-col gap-2.5">
                <span className="text-xs font-bold text-[#02afab] uppercase tracking-wider font-heading">
                  {era1999.year} • {era1999.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#082846] tracking-tight leading-snug">
                  {era1999.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal pt-1">
                  {era1999.description}
                </p>
              </div>
            </article>
          </ScrollReveal>
        )}
      </div>

      {/* 3. Tarjeta Grande de Ancho Completo: "Hoy" en la parte superior derecha como los años de las otras tarjetas */}
      {eraHoy && (
        <ScrollReveal delay={150} animation="fade-up">
          <div className="w-full relative rounded-3xl bg-gradient-to-br from-[#082846] to-[#041a2f] text-white border border-[#02afab]/20 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Marca de agua de "HOY" de fondo blanco en la parte superior derecha */}
          <span className="absolute -top-3 -right-2 text-7xl sm:text-8xl lg:text-9xl font-black text-white/10 font-heading select-none pointer-events-none tracking-tighter">
            {eraHoy.year}
          </span>

          {/* Lado Izquierdo: Fotografía de Flamencos en la Reserva Natural Los Olivitos */}
          <div className="lg:col-span-5 relative w-full min-h-[300px] sm:min-h-[360px] lg:min-h-full">
            <Image
              src="/images/produsal-flamencos-laguna.webp"
              alt={dict.showcase?.abraeTitle || "Santuario de Flamencos en la Reserva Natural Los Olivitos"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            {/* Badge sutil sobre la foto de flamencos */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 bg-[#082846]/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#02afab] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-heading font-medium tracking-wide">
                {currentLang === "es" ? "Flamencos Rosados en Los Olivitos" : "Pink Flamingos at Los Olivitos"}
              </span>
            </div>
          </div>

          {/* Lado Derecho: Contenido Editorial sobre la Reserva ABRAE */}
          <div className="lg:col-span-7 relative z-10 flex flex-col justify-between gap-6 p-6 sm:p-8 lg:p-10">
            {/* Cabecera con Tag de Liderazgo y Reserva ABRAE */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#94c11e] uppercase tracking-wider font-heading flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[#94c11e]" />
                {eraHoy.tag} &bull; {currentLang === "es" ? "Reserva Natural ABRAE" : "ABRAE Nature Reserve"}
              </span>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {eraHoy.title}
              </h3>

              <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal pt-1">
                {dict.showcase?.abraeDescription || (dict.showcase?.territoryDescription || eraHoy.description)}
              </p>
            </div>

            {/* Puntos Clave de la Reserva ABRAE (sin métricas numéricas) */}
            <div className="flex flex-col gap-2.5 py-3 border-y border-white/10">
              {(dict.showcase?.abraePoints || [
                currentLang === "es" ? "Santuario reproductivo del Flamenco Rosado (Phoenicopterus ruber)" : "Breeding sanctuary for the Caribbean Pink Flamingo (Phoenicopterus ruber)",
                currentLang === "es" ? "Humedal Ramsar de Importancia Internacional y Sitio RHRAP" : "Ramsar Wetland of International Importance & WHSRN Site",
                currentLang === "es" ? "Equilibrio biológico entre salinidad controlada y fauna costera" : "Ecological balance between salt harvesting and coastal biodiversity",
              ]).map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#02afab] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href={`/${currentLang}/nosotros`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#02afab] hover:bg-[#008784] text-white font-bold text-xs shadow-md transition-all group/btn"
              >
                <span>{dict.ctaExplore}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white group-hover/btn:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={`/${currentLang}#contacto`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white/90 hover:text-white font-bold text-xs bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 transition-all"
              >
                <span>{dict.ctaContact}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
        </ScrollReveal>
      )}
    </div>
  );
}
