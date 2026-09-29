import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

export type HistorySectionDict = Dictionary["historySection"];

interface HistoryContentProps {
  currentLang: Locale;
  dict: HistorySectionDict;
}

export function HistoryContent({ currentLang, dict }: HistoryContentProps) {
  if (!dict) return null;

  const era1989 = dict.eras?.[0];
  const era1995 = dict.eras?.[1];
  const era1999 = dict.eras?.[2];
  const eraHoy = dict.eras?.[3];

  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
      {/* 1. Cabecera Panorámica Editorial (Minimalista, sin fondo ni bordes) */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col gap-3 max-w-3xl border-b border-slate-200/80 pb-8 sm:pb-10">
          <span className="text-[#008784] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
            {dict.badge}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#082846] tracking-tight leading-[1.15]">
            {dict.title}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {dict.description}
          </p>
        </div>
      </ScrollReveal>

      {/* 2. Fila Superior: Los 3 Hitos Fundacionales (1989 • 1995 • 1999) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1989 */}
        {era1989 && (
          <ScrollReveal delay={0} animation="fade-up">
            <article className="relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white shadow-sm border border-slate-200/80 hover:border-[#02afab]/50 hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
              <span className="absolute -top-3 -right-2 text-7xl font-black text-slate-200/40 font-heading select-none pointer-events-none tracking-tighter">
                {era1989.year}
              </span>

              <div className="relative z-10 flex flex-col gap-2.5">
                <span className="text-xs font-bold text-[#02afab] uppercase tracking-wider font-heading">
                  {era1989.year} • {era1989.tag}
                </span>
                <h3 className="text-xl font-extrabold text-[#082846] tracking-tight leading-snug">
                  {era1989.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal pt-1">
                  {era1989.description}
                </p>
              </div>
            </article>
          </ScrollReveal>
        )}

        {/* 1995 */}
        {era1995 && (
          <ScrollReveal delay={120} animation="fade-up">
            <article className="relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white shadow-sm border border-slate-200/80 hover:border-[#02afab]/50 hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
              <span className="absolute -top-3 -right-2 text-7xl font-black text-slate-200/40 font-heading select-none pointer-events-none tracking-tighter">
                {era1995.year}
              </span>

              <div className="relative z-10 flex flex-col gap-2.5">
                <span className="text-xs font-bold text-[#02afab] uppercase tracking-wider font-heading">
                  {era1995.year} • {era1995.tag}
                </span>
                <h3 className="text-xl font-extrabold text-[#082846] tracking-tight leading-snug">
                  {era1995.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal pt-1">
                  {era1995.description}
                </p>
              </div>
            </article>
          </ScrollReveal>
        )}

        {/* 1999 */}
        {era1999 && (
          <ScrollReveal delay={240} animation="fade-up">
            <article className="relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white shadow-sm border border-slate-200/80 hover:border-[#02afab]/50 hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
              <span className="absolute -top-3 -right-2 text-7xl font-black text-slate-200/40 font-heading select-none pointer-events-none tracking-tighter">
                {era1999.year}
              </span>

              <div className="relative z-10 flex flex-col gap-2.5">
                <span className="text-xs font-bold text-[#02afab] uppercase tracking-wider font-heading">
                  {era1999.year} • {era1999.tag}
                </span>
                <h3 className="text-xl font-extrabold text-[#082846] tracking-tight leading-snug">
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

          {/* Lado Izquierdo: Fotografía que ocupa TODO el alto y lateral izquierdo, sin texto encima */}
          <div className="lg:col-span-5 relative w-full min-h-[280px] sm:min-h-[340px] lg:min-h-full">
            <Image
              src="/images/hero-bg.jpg"
              alt={dict.showcase?.imageAlt || "Salinas Los Olivitos Produsal Zulia"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>

          {/* Lado Derecho: Contenido Editorial */}
          <div className="lg:col-span-7 relative z-10 flex flex-col justify-between gap-6 p-6 sm:p-8 lg:p-10">
            {/* Cabecera con Tag */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#94c11e] uppercase tracking-wider font-heading">
                {eraHoy.tag} • {dict.showcase?.stats?.tagSuffix || (currentLang === "es" ? "Reserva ABRAE" : "ABRAE Reserve")}
              </span>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {eraHoy.title}
              </h3>

              <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal pt-1">
                {eraHoy.description} {dict.showcase?.territoryDescription}
              </p>
            </div>

            {/* 3 Cifras Clave Minimalistas */}
            <div className="grid grid-cols-3 gap-4 py-3 border-y border-white/10">
              <div>
                <span className="text-xl sm:text-2xl font-black text-white font-heading block">
                  {dict.showcase?.stats?.capacityValue || (currentLang === "es" ? "650K TM" : "650K MT")}
                </span>
                <span className="text-[11px] text-white/60">
                  {dict.showcase?.stats?.capacityLabel || (currentLang === "es" ? "Operativas / Año" : "Operative / Year")}
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#94c11e] font-heading block">
                  {dict.showcase?.stats?.shareValue || "65%"}
                </span>
                <span className="text-[11px] text-white/60">
                  {dict.showcase?.stats?.shareLabel || (currentLang === "es" ? "Producción Nacional" : "National Production")}
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#02afab] font-heading block">
                  {dict.showcase?.stats?.landValue || (currentLang === "es" ? "5.400 Ha" : "5,400 Ha")}
                </span>
                <span className="text-[11px] text-white/60">
                  {dict.showcase?.stats?.landLabel || (currentLang === "es" ? "Reserva ABRAE" : "ABRAE Nature Reserve")}
                </span>
              </div>
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
