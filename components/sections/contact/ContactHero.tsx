"use client";

import { Compass, Mail, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";
import { PLANT_LOCATION } from "@/data/plant-location";

interface ContactHeroProps {
  currentLang: Locale;
  dict: Dictionary["contact"];
}

export function ContactHero({ currentLang, dict }: ContactHeroProps) {
  const isEs = currentLang === "es";

  return (
    <section className="relative bg-[#183c6b] text-white py-16 sm:py-20 overflow-hidden border-b border-[#02aeaa]/20">
      {/* Triángulos 2D corporativos en el fondo azul del hero */}
      <BrandTrianglesBackground layout="together" position="bottom-right" size="lg" opacityClass="opacity-25" />
      {/* Fondo con patrones y resplandor decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(#02aeaa_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[radial-gradient(closest-side,rgba(2,174,170,0.2),transparent)] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(closest-side,rgba(133,178,207,0.2),transparent)] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-[radial-gradient(closest-side,rgba(229,199,152,0.1),transparent)] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-8 max-w-3xl mx-auto text-center items-center">
          {/* Badge corporativo */}
          <ScrollReveal animation="fade-down">
            <div className="type-eyebrow inline-flex items-center gap-2 text-[#02aeaa]">
              <Compass className="w-4 h-4 text-[#02aeaa]" />
              <span>{dict.badge}</span>
            </div>
          </ScrollReveal>

          {/* Título Principal */}
          <ScrollReveal animation="fade-up" delay={50}>
            <h1 className="type-h1 text-white">
              {isEs ? "Contáctanos" : "Contact us"}
            </h1>
          </ScrollReveal>

          {/* Subtítulo */}
          <ScrollReveal animation="fade-up" delay={100}>
            <p className="type-lead text-white/85 max-w-2xl">
              {dict.description}
            </p>
          </ScrollReveal>

          {/* Accesos rápidos: correo y ubicación (sin teléfonos) */}
          <ScrollReveal animation="fade-up" delay={150} className="w-full pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              {/* Correo Electrónico */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 hover:border-[#e5c798]/70 transition-all duration-300 flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#e5c798]/25 text-[#e5c798] group-hover:bg-[#e5c798] group-hover:text-[#183c6b] flex items-center justify-center shrink-0 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="type-caption text-white/60">
                    {isEs ? "Escríbenos" : "Write to us"}
                  </span>
                  <a href={`mailto:${dict.email}`} className="text-sm font-extrabold text-white hover:text-[#e5c798] transition-colors font-heading truncate">
                    {dict.email}
                  </a>
                </div>
              </div>

              {/* Ubicación Planta */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 hover:border-[#85b2cf]/70 transition-all duration-300 flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#85b2cf]/25 text-[#85b2cf] group-hover:bg-[#85b2cf] group-hover:text-[#183c6b] flex items-center justify-center shrink-0 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="type-caption text-white/60">
                    {isEs ? "Planta y salina" : "Plant and saltworks"}
                  </span>
                  <span className="text-sm font-extrabold text-white font-heading truncate">
                    Los Olivitos, Miranda, Zulia
                  </span>
                  <span className="text-[11px] text-white/60 truncate">
                    {PLANT_LOCATION.label}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
