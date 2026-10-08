"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Waves } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface ProductsCatalogHeroProps {
  currentLang: Locale;
  dict: Dictionary["products"];
}

export function ProductsCatalogHero({ currentLang, dict }: ProductsCatalogHeroProps) {
  const isEs = currentLang === "es";

  return (
    <section className="relative w-full text-white min-h-[380px] sm:min-h-[500px] lg:min-h-[540px] flex items-center overflow-hidden bg-[#183c6b] py-14 sm:py-24 lg:py-28 border-b border-[#02aeaa]/20">
      {/* 1. Fondo Fotográfico con Gradientes Multicapa (Estilo Home) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/produsal-piramides-cielo.webp"
          alt={isEs ? "Complejo Industrial Salinas Los Olivitos - PRODUSAL" : "Los Olivitos Industrial Salt Complex - PRODUSAL"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Capa 1: Filtro horizontal azul marino para legibilidad hacia la izquierda */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#183c6b]/95 via-[#183c6b]/85 to-[#183c6b]/50 backdrop-blur-[0.5px]" />

        {/* Capa 2: Gradiente vertical para suavizar la unión superior e inferior */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#183c6b]/70 via-transparent to-[#183c6b]" />

        {/* Capa 3: Micro-trama sutil de sal */}
        <div className="absolute inset-0 crystal-pattern opacity-25 pointer-events-none" />

        {/* Destellos ambientales de color Turquesa, Celeste y Dorado Solar */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#02aeaa]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-[#85b2cf]/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-[#e5c798]/10 blur-3xl pointer-events-none" />
      </div>

      {/* 2. Contenido Amplio Orientado a la Izquierda (Misma anchura y escala del Home) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl lg:max-w-5xl flex flex-col gap-6 text-left items-start">
          
          {/* Badge / Texto Superior */}
          <ScrollReveal animation="fade-down">
            <span className="text-sm sm:text-base font-bold text-[#02aeaa] tracking-normal font-heading flex items-center gap-2.5">
              <span>{dict.badge}</span>
            </span>
          </ScrollReveal>

          {/* Gran Título Corporativo Amplio con Resalte Turquesa (Estilo Home) */}
          <ScrollReveal animation="fade-up" delay={50}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading text-left">
              <span className="text-[#02aeaa] drop-shadow-xs">
                {isEs ? "Soluciones Salinas" : "High-Purity"}
              </span>{" "}
              <span className="text-white/95 block sm:inline">
                {isEs ? "de Alta Pureza" : "Sea Salt Solutions"}
              </span>
            </h1>
          </ScrollReveal>

          {/* Párrafo Descriptivo Amplio */}
          <ScrollReveal animation="fade-up" delay={100}>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl font-normal leading-relaxed text-left">
              {dict.subtitle}
            </p>
          </ScrollReveal>

          {/* Botones de Acción (CTAs): Contáctanos y Nosotros */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Botón Principal: Contáctanos */}
              <Link
                href={`/${currentLang}/contacto`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#02aeaa] hover:bg-[#029693] text-white font-bold text-sm shadow-md shadow-[#02aeaa]/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group font-heading"
              >
                <span>{isEs ? "Contáctanos" : "Contact Us"}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Botón Secundario: Nosotros */}
              <Link
                href={`/${currentLang}/nosotros`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-[#85b2cf]/15 text-white font-semibold text-sm border border-[#85b2cf]/40 hover:border-[#85b2cf] backdrop-blur-sm transition-all duration-200 font-heading"
              >
                <Waves className="w-4 h-4 text-[#85b2cf]" />
                <span>{isEs ? "Conoce Nuestra Historia" : "Our Story & Heritage"}</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
