import Image from "next/image";
import { Award } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[radial-gradient(closest-side,rgba(2,174,170,0.2),transparent)] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(closest-side,rgba(133,178,207,0.2),transparent)] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Columna Izquierda: Título y Visión Editorial */}
          <ScrollReveal animation="fade-right" className="lg:col-span-7 flex flex-col justify-center">
            <span className="type-eyebrow inline-flex items-center gap-2 text-[#02aeaa] mb-4 w-fit">
              <Award className="w-3.5 h-3.5" />
              <span>{isEs ? "Complejo Industrial Los Olivitos • Estado Zulia" : "Los Olivitos Industrial Complex • Zulia State"}</span>
            </span>
            <h1 className="type-h1 text-white mb-5">
              {isEs
                ? "La principal productora de sal industrial de alta pureza en Venezuela"
                : "Venezuela's leading producer of high-purity industrial salt"}
            </h1>
            <p className="type-lead text-white/80">
              {isEs
                ? "PRODUSAL (Productora de Sal C.A.) es un pilar de la industria salinera venezolana. Aportamos a la producción nacional de sal industrial desde nuestro complejo en Los Olivitos, combinando energía solar con controles de calidad."
                : "PRODUSAL (Productora de Sal C.A.) is a pillar of the Venezuelan salt industry, contributing to national industrial salt production from Los Olivitos through solar evaporation and quality controls."}
            </p>
          </ScrollReveal>

          {/* Columna Derecha: Nueva Fotografía Industrial de las Salinas Los Olivitos */}
          <ScrollReveal animation="fade-left" className="lg:col-span-5 relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-white/15 group">
            <Image
              src="/images/produsal-piramides-cielo.webp"
              alt={isEs ? "Estanques de cristalización solar y acopio de sal en Los Olivitos Produsal" : "Solar crystallization ponds and salt stockpiles at Produsal Los Olivitos"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#183c6b]/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs sm:text-sm font-semibold text-white/95">
                {isEs ? "Cristalización solar en Los Olivitos, Zulia" : "Solar crystallization at Los Olivitos, Zulia"}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
