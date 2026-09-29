"use client";

import Image from "next/image";
import { Compass, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

export type LocationSectionDict = Dictionary["locationSection"];

interface LocationContentProps {
  currentLang: Locale;
  dict: LocationSectionDict;
}

export function LocationContent({ currentLang, dict }: LocationContentProps) {
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

  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
      {/* Cabecera Editorial */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col gap-3 max-w-3xl">
          <span className="text-[#008784] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#02afab]" />
            {badge}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#082846] tracking-tight leading-[1.15] font-heading">
            {title}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>
      </ScrollReveal>

      {/* Grilla Principal: Ficha Tipográfica Minimalista (Izq) + Mapa Libre (Der) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Columna Izquierda: Información Minimalista inspirada en la lámina original */}
        <ScrollReveal animation="fade-right" delay={100} className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {/* Viñeta con indicador circular al estilo de la lámina */}
            <div className="flex items-center gap-3.5">
              <span className="w-5 h-5 rounded-full bg-[#082846] flex items-center justify-center shrink-0 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#02afab] animate-pulse" />
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#082846] font-heading tracking-tight">
                {locationHighlight}
              </span>
            </div>

            {/* Ficha descriptiva limpia sin tarjetas pesadas */}
            <div className="pl-8 flex flex-col gap-2.5 border-l-2 border-[#02afab]/30 ml-2.5">
              <p className="text-base sm:text-lg font-bold text-slate-800 font-heading">
                {plantName}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                {locationDetails}
              </p>

              {/* Capacidad Destacada */}
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-xs uppercase font-bold text-slate-400 font-heading">
                  {capacityLabel}
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#008784] font-heading tracking-tight">
                  {capacityValue}
                </span>
              </div>

              {/* Estatus */}
              <span className="text-xs font-semibold text-[#02afab] font-heading pt-1">
                {status}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Columna Derecha: Mapa de Venezuela con Pin Pulsante en Zulia */}
        <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-2xl aspect-[4/3] select-none">
            <Image
              src="/images/mapa-venezuela-clean.jpg"
              alt="Mapa de Venezuela - Ubicación PRODUSAL en Zulia"
              fill
              priority
              className="object-contain mix-blend-multiply"
              sizes="(max-width: 768px) 100vw, 55vw"
            />

            {/* Pin interactivo en ZULIA (Los Olivitos) - Sin modalsito */}
            <div
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: "20%", top: "22%" }}
              aria-label="Ubicación de PRODUSAL en Zulia"
            >
              {/* Ondas de Radar Pulsantes */}
              <span className="absolute -inset-3.5 rounded-full bg-[#02afab] opacity-75 animate-ping" />
              <span className="absolute -inset-7 rounded-full bg-[#02afab]/25 animate-pulse" />

              {/* Núcleo del Marcador */}
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#082846] border-2 border-white shadow-md flex items-center justify-center text-[#02afab]">
                <MapPin className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
