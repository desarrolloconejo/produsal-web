import Image from "next/image";
import { ReactNode } from "react";

interface HeroWrapperProps {
  children: ReactNode;
  backgroundImageSrc?: string;
}

export function HeroWrapper({
  children,
  backgroundImageSrc = "/images/hero-bg.jpg",
}: HeroWrapperProps) {
  return (
    <section className="relative w-full min-h-[calc(100vh+8rem)] min-h-[720px] lg:min-h-[800px] flex items-center justify-center overflow-hidden bg-[#082846] -mt-32 pt-44 sm:pt-48 pb-20 sm:pb-24">
      {/* Fondo de alta resolución generado (Salinas de Venezuela) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImageSrc}
          alt="Salinas y producción de sal marina Produsal Venezuela"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Gradiente multicapa de alta legibilidad corporativa */}
        {/* Capa 1: Filtro azul petróleo y turquesa para amalgamar con la marca */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#082846]/95 via-[#082846]/80 to-[#082846]/60 backdrop-blur-[1px]" />

        {/* Capa 2: Gradiente vertical para suavizar la unión con el header y la siguiente sección */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#082846]/70 via-transparent to-[#082846]/95" />

        {/* Capa 3: Micro-trama sutil simulando la estructura molecular cúbica de la sal (NaCl) */}
        <div className="absolute inset-0 crystal-pattern opacity-30" />

        {/* Destellos ambientales de color Turquesa y Lima en las esquinas */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#02afab]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-[#94c11e]/15 blur-3xl pointer-events-none" />
      </div>

      {/* Contenedor de contenido estructurado */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
