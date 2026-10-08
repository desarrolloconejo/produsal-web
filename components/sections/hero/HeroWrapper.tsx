"use client";

import Image from "next/image";
import { ReactNode, useEffect } from "react";

interface HeroWrapperProps {
  children: ReactNode;
  backgroundImageSrc?: string;
  id?: string;
}

export function HeroWrapper({
  children,
  backgroundImageSrc = "/images/produsal-apilador-salina.webp",
  id = "inicio",
}: HeroWrapperProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  return (
    <section
      id={id}
      className="relative w-full min-h-[560px] sm:min-h-[720px] lg:min-h-[800px] flex items-center justify-center overflow-hidden bg-[#183c6b] -mt-24 sm:-mt-32 pt-32 sm:pt-48 pb-16 sm:pb-24"
    >
      {/* Fondo de alta resolución generado (Salinas de Venezuela) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Gradiente multicapa de alta legibilidad corporativa */}
        {/* Capa 1: Filtro azul petróleo y turquesa para amalgamar con la marca */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#183c6b]/95 via-[#183c6b]/80 to-[#183c6b]/60 backdrop-blur-[1px]" />

        {/* Capa 2: Gradiente vertical para suavizar la unión con el header y la siguiente sección */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#183c6b]/70 via-transparent to-[#183c6b]/95" />

        {/* Capa 3: Micro-trama sutil simulando la estructura molecular cúbica de la sal (NaCl) */}
        <div className="absolute inset-0 crystal-pattern opacity-30" />

        {/* Destellos ambientales: Azul Claro, Celeste Costero y Arena Solar */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#02aeaa]/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[#85b2cf]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-10 w-96 h-96 rounded-full bg-[#e5c798]/15 blur-3xl pointer-events-none" />
      </div>

      {/* Contenedor de contenido estructurado */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
