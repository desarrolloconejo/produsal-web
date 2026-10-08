import Image from "next/image";
import { Award } from "lucide-react";
import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";
import type { Locale } from "@/dictionaries/get-dictionary";

interface AboutHeroProps {
  currentLang: Locale;
}

export function AboutHero({ currentLang }: AboutHeroProps) {
  const isEs = currentLang === "es";

  return (
    <section className="relative bg-[#183c6b] text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-[#02aeaa]/20">
      {/* Triángulos 2D corporativos y resplandores sobre el fondo azul del hero */}
      <BrandTrianglesBackground layout="together" position="bottom-left" size="lg" opacityClass="opacity-10" />
      <div className="absolute inset-0 crystal-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#02aeaa]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#85b2cf]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Columna Izquierda: Título y Visión Editorial */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#02aeaa]/20 border border-[#02aeaa]/40 text-[#02aeaa] text-xs font-bold uppercase tracking-wider mb-4 w-fit">
              <Award className="w-3.5 h-3.5" />
              <span>{isEs ? "Complejo Industrial Los Olivitos • Estado Zulia" : "Los Olivitos Industrial Complex • Zulia State"}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
              {isEs
                ? "La mayor productora de sal marina de alta pureza en Venezuela"
                : "Venezuela's premier producer of high-purity solar sea salt"}
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal mb-6">
              {isEs
                ? "PRODUSAL (Productora de Sal C.A.) es el pilar de la industria salinera venezolana. Aportamos el 65% de la producción nacional de sal marina desde nuestro complejo en Los Olivitos, combinando energía solar limpia con estándares de calidad de clase mundial."
                : "PRODUSAL (Productora de Sal C.A.) is the cornerstone of the Venezuelan salt industry, supplying 65% of the country's sea salt from Los Olivitos through clean solar evaporation and world-class manufacturing standards."}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#02aeaa]" />
                {isEs ? "650.000 TM / año operativas" : "650,000 MT / year operative"}
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#85b2cf]" />
                {isEs ? "5.400 Ha Reserva ABRAE" : "5,400 Ha ABRAE Reserve"}
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#e5c798]" />
                {isEs ? "100% Cosecha Solar" : "100% Solar Harvesting"}
              </span>
            </div>
          </div>

          {/* Columna Derecha: Nueva Fotografía Industrial de las Salinas Los Olivitos */}
          <div className="lg:col-span-5 relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-white/15 group">
            <Image
              src="/images/produsal-piramides-cielo.webp"
              alt={isEs ? "Estanques de cristalización solar y acopio de sal marina en Los Olivitos Produsal" : "Solar crystallization ponds and sea salt stockpiles at Produsal Los Olivitos"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#183c6b]/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] font-bold text-[#e5c798] uppercase tracking-wider block font-heading">
                {isEs ? "Cosecha Solar Marina" : "Solar Marine Harvest"}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-white/95">
                {isEs ? "Cristalización continua en Los Olivitos, Zulia" : "Continuous crystallization at Los Olivitos, Zulia"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
