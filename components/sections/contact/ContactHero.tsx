"use client";

import { Compass, Phone, Mail, MapPin, Building2, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";
import type { Locale } from "@/dictionaries/get-dictionary";

interface ContactHeroProps {
  currentLang: Locale;
  dict?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
}

export function ContactHero({ currentLang, dict }: ContactHeroProps) {
  const isEs = currentLang === "es";

  const badgeText = dict?.badge || (isEs ? "Atención Comercial e Industrial" : "Commercial & Industrial Sales");
  const titleText = dict?.title || (isEs ? "Contacto y Atenciones Comerciales" : "Contact & Commercial Support");
  const subtitleText =
    dict?.subtitle ||
    (isEs
      ? "Atendemos requerimientos de compra al mayor, despachos industriales, contratos a término y asesoría técnica para la industria química, alimentaria, petroquímica y nutrición animal."
      : "We fulfill bulk wholesale orders, industrial shipments, long-term supply contracts, and custom technical support for the chemical, food manufacturing, and animal nutrition sectors.");

  return (
    <section className="relative bg-[#183c6b] text-white py-16 sm:py-20 overflow-hidden border-b border-[#02aeaa]/20">
      {/* Triángulos 2D corporativos en el fondo azul del hero */}
      <BrandTrianglesBackground layout="together" position="bottom-right" size="lg" opacityClass="opacity-25" />
      {/* Fondo con patrones y resplandor decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(#02aeaa_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#02aeaa]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#85b2cf]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-[#e5c798]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-8 max-w-3xl mx-auto text-center items-center">
          {/* Badge corporativo */}
          <ScrollReveal animation="fade-down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#02aeaa]/20 border border-[#02aeaa]/40 text-[#02aeaa] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
              <Compass className="w-4 h-4 text-[#02aeaa]" />
              <span>{badgeText}</span>
            </div>
          </ScrollReveal>

          {/* Título Principal */}
          <ScrollReveal animation="fade-up" delay={50}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
              {titleText}
            </h1>
          </ScrollReveal>

          {/* Subtítulo */}
          <ScrollReveal animation="fade-up" delay={100}>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              {subtitleText}
            </p>
          </ScrollReveal>

          {/* 3 Tarjetas de Acceso Rápido */}
          <ScrollReveal animation="fade-up" delay={150} className="w-full pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {/* Teléfonos */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md hover:border-[#02aeaa]/50 transition-all duration-300 flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#02aeaa]/25 text-[#02aeaa] group-hover:bg-[#02aeaa] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] text-white/60 font-semibold uppercase tracking-wider font-heading">
                    {isEs ? "Ventas & Cotizaciones" : "Sales Office"}
                  </span>
                  <a href="tel:02122085111" className="text-sm font-extrabold text-white hover:text-[#02aeaa] transition-colors font-heading truncate">
                    0212 208 51 11
                  </a>
                  <a href="tel:08002274455" className="text-xs font-bold text-[#02aeaa] hover:text-white transition-colors font-heading truncate">
                    0800 2274455
                  </a>
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md hover:border-[#e5c798]/70 transition-all duration-300 flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#e5c798]/25 text-[#e5c798] group-hover:bg-[#e5c798] group-hover:text-[#183c6b] flex items-center justify-center shrink-0 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] text-white/60 font-semibold uppercase tracking-wider font-heading">
                    {isEs ? "Atención Electrónica" : "Email Support"}
                  </span>
                  <a href="mailto:infoprodusal@grupomimesa.com" className="text-sm font-extrabold text-white hover:text-[#e5c798] transition-colors font-heading truncate">
                    infoprodusal@grupomimesa.com
                  </a>
                  <span className="text-[11px] text-white/60 truncate">
                    {isEs ? "Respuesta en < 24 hrs" : "24h response time"}
                  </span>
                </div>
              </div>

              {/* Ubicación Planta */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md hover:border-[#85b2cf]/70 transition-all duration-300 flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#85b2cf]/25 text-[#85b2cf] group-hover:bg-[#85b2cf] group-hover:text-[#183c6b] flex items-center justify-center shrink-0 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] text-white/60 font-semibold uppercase tracking-wider font-heading">
                    {isEs ? "Planta & Salinas" : "Plant & Salt Flats"}
                  </span>
                  <span className="text-sm font-extrabold text-white font-heading truncate">
                    Los Olivitos, Zulia
                  </span>
                  <span className="text-[11px] text-white/60 truncate">
                    10°51&apos;N, 71°20&apos;W
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
