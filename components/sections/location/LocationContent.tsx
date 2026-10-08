"use client";

import Image from "next/image";
import { Compass, MapPin, Sparkles, Factory, SunMedium } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";
import type { HeroStatItem } from "@/components/sections/hero/HeroStats";

export type LocationSectionDict = Dictionary["locationSection"];

interface LocationContentProps {
  currentLang: Locale;
  dict: LocationSectionDict;
  stats?: HeroStatItem[];
}

export function LocationContent({ currentLang, dict, stats }: LocationContentProps) {
  if (!dict) return null;

  const {
    badge,
    title,
    subtitle,
    locationHighlight,
    plantName,
    locationDetails,
    capacityLabel,
    capacityValue,
    status
  } = dict;

  const statThemes = [
    {
      Icon: Sparkles,
      iconColor: "text-[#02aeaa]",
      boxHoverStyle: "group-hover:border-[#02aeaa] group-hover:bg-[#02aeaa]/20",
      topLine: "via-[#02aeaa]",
      hoverBorder: "hover:border-[#02aeaa]/60",
      accentText: "group-hover:text-[#02aeaa]",
    },
    {
      Icon: Factory,
      iconColor: "text-[#85b2cf]",
      boxHoverStyle: "group-hover:border-[#85b2cf] group-hover:bg-[#85b2cf]/20",
      topLine: "via-[#85b2cf]",
      hoverBorder: "hover:border-[#85b2cf]/60",
      accentText: "group-hover:text-[#85b2cf]",
    },
    {
      Icon: SunMedium,
      iconColor: "text-[#e5c798]",
      boxHoverStyle: "group-hover:border-[#e5c798] group-hover:bg-[#e5c798]/20",
      topLine: "via-[#e5c798]",
      hoverBorder: "hover:border-[#e5c798]/60",
      accentText: "group-hover:text-[#e5c798]",
    },
  ];

  return (
    <div className="flex flex-col gap-10 sm:gap-12 lg:gap-14">
      {/* Cabecera Editorial Unificada */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col gap-3 max-w-3xl">
          <span className="text-[#02aeaa] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#02aeaa]" />
            <span>{badge}</span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#183c6b] tracking-tight leading-[1.15] font-heading">
            {title}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>
      </ScrollReveal>

      {/* Grilla Principal Unificada: Métricas + Ficha (Izq, 5 cols) | Mapa Completo (Der, 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Columna Izquierda: Tarjetas de Métricas integradas verticalmente y Ficha de la Planta */}
        <ScrollReveal animation="fade-right" delay={100} className="lg:col-span-5 flex flex-col gap-4">
          {/* 3 Métricas Clave */}
          {stats && stats.length > 0 && (
            <div className="flex flex-col gap-3">
              {stats.map((stat, index) => {
                const theme = statThemes[index % statThemes.length];
                const IconComponent = theme.Icon;

                return (
                  <div
                    key={stat.label + index}
                    className={`rounded-2xl p-4 sm:p-5 bg-[#183c6b] border border-white/10 ${theme.hoverBorder} transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden shadow-lg flex items-center justify-between gap-4`}
                  >
                    {/* Acento sutil superior al hover */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${theme.topLine} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`p-2.5 rounded-xl bg-white/10 border border-white/15 ${theme.boxHoverStyle} transition-all duration-300 shrink-0 shadow-sm`}
                      >
                        <IconComponent
                          className={`w-5 h-5 ${theme.iconColor} transition-colors duration-300`}
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`text-sm font-bold text-white ${theme.accentText} transition-colors leading-tight font-heading`}>
                          {stat.label}
                        </span>
                        <span className="text-xs text-white/75 leading-relaxed pt-1">
                          {stat.detail}
                        </span>
                      </div>
                    </div>

                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading shrink-0 pl-2">
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Ficha descriptiva del Complejo Los Olivitos */}
          <div className="rounded-2xl p-4 sm:p-5 bg-white border border-[#85b2cf]/30 shadow-sm flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#02aeaa] font-heading flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#02aeaa] animate-pulse" />
                {locationHighlight}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#183c6b]/5 text-[#183c6b] border border-[#e5c798]/60 text-[10px] font-mono font-semibold">
                <MapPin className="w-3 h-3 text-[#e5c798]" />
                <span>10°51&apos;N &bull; 71°20&apos;W</span>
              </span>
            </div>

            <p className="text-base font-bold text-slate-800 font-heading">
              {plantName}
            </p>

            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              {locationDetails}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-medium font-heading uppercase text-[10px]">
                {capacityLabel}
              </span>
              <span className="font-extrabold text-[#02aeaa] font-heading text-sm">
                {capacityValue}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Columna Derecha: Mapa Completo de Venezuela con Guayana Esequiba (7 cols) */}
        <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-full aspect-[1144/768] max-w-2xl mx-auto select-none">
            <Image
              src="/images/mapa-venezuela-final.png"
              alt={currentLang === "es" ? "Mapa Completo de Venezuela con Guayana Esequiba - Ubicación PRODUSAL Los Olivitos (10°51'N, 71°20'W)" : "Full map of Venezuela including Guayana Esequiba - PRODUSAL location at Los Olivitos (10°51'N, 71°20'W)"}
              fill
              priority
              className="object-contain mix-blend-multiply"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />

            {/* Pin interactivo en Los Olivitos (10°51'N, 71°20'W) posicionado con coordenadas calibradas */}
            <div
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: "17.0%", top: "17.6%" }}
              aria-label={currentLang === "es" ? "Ubicación de PRODUSAL en Los Olivitos, Zulia (10°51'N, 71°20'W)" : "PRODUSAL location at Los Olivitos, Zulia (10°51'N, 71°20'W)"}
            >
              {/* Ondas de Radar Pulsantes */}
              <span className="absolute -inset-3 rounded-full bg-[#02aeaa] opacity-75 animate-ping pointer-events-none" />
              <span className="absolute -inset-6 rounded-full bg-[#02aeaa]/20 animate-pulse pointer-events-none" />

              {/* Núcleo del Marcador */}
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#183c6b] border-2 border-white shadow-md flex items-center justify-center text-[#02aeaa] cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-white" />
              </div>

              {/* Badge flotante con coordenadas exactas */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap bg-[#183c6b]/95 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-medium shadow-md flex items-center gap-1.5 border border-[#02aeaa]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#02aeaa] animate-pulse" />
                <span>10°51&apos;N, 71°20&apos;W</span>
              </div>
            </div>

            {/* Botón flotante para ver en Google Maps */}
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10">
              <a
                href="https://maps.google.com/?q=10.8500,-71.3333"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 hover:bg-white text-[#183c6b] hover:text-[#02aeaa] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl shadow-sm border border-slate-200/80 text-[11px] sm:text-xs font-heading font-bold flex items-center gap-1.5 transition-all backdrop-blur-sm"
              >
                <MapPin className="w-3 h-3 text-[#02aeaa]" />
                <span>{currentLang === "es" ? "Abrir en Maps" : "Open in Maps"}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
