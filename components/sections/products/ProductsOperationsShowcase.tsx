"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Factory, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";
import type { Locale } from "@/dictionaries/get-dictionary";

interface ProductsOperationsShowcaseProps {
  currentLang: Locale;
}

export function ProductsOperationsShowcase({ currentLang }: ProductsOperationsShowcaseProps) {
  const isEs = currentLang === "es";

  const cards = [
    {
      title: isEs ? "Pureza Solar Natural" : "Natural Solar Purity",
      subtitle: isEs ? "Cristalización Marina sin Aditivos" : "Additive-Free Marine Crystallization",
      desc: isEs
        ? "Sal 100% pura cosechada bajo evaporación solar y régimen de vientos alisios en Los Olivitos. Cristales limpios con ≥ 99,3% de NaCl garantizado."
        : "100% pure solar sea salt harvested under continuous sun and trade winds at Los Olivitos. Clean crystals with ≥ 99.3% guaranteed NaCl.",
      image: "/images/produsal-sal-manos-pureza.webp",
      alt: "Manos sosteniendo sal marina pura PRODUSAL",
      tag: isEs ? "Materia Prima Pura" : "Pure Raw Material",
      icon: <Sparkles className="w-4 h-4 text-[#e5c798]" />,
      tagClass: "text-[#e5c798] border-[#e5c798]/40",
      hoverBorder: "hover:border-[#e5c798]/60",
    },
    {
      title: isEs ? "Despacho Masivo a Granel" : "Massive Bulk Dispatch",
      subtitle: isEs ? "Tolvas Industriales y Gandolas" : "Industrial Hoppers & Bulk Trailers",
      desc: isEs
        ? "Carga continua directa en patio de acopio con cargadores frontales y pesaje certificado. Abastecimiento ininterrumpido a plantas petroquímicas y alimentarias."
        : "Continuous yard loading with front-end loaders and certified scales. Uninterrupted supply to petrochemical and food processing complexes.",
      image: "/images/produsal-despacho-granel.webp",
      alt: "Cargador pesado despachando sal a granel en gandola tolva PRODUSAL",
      tag: isEs ? "Logística de Escala" : "Scale Logistics",
      icon: <Truck className="w-4 h-4 text-[#02aeaa]" />,
      tagClass: "text-[#02aeaa] border-[#02aeaa]/40",
      hoverBorder: "hover:border-[#02aeaa]/60",
    },
    {
      title: isEs ? "Líneas de Envasado Continuo" : "Automated Packaging Lines",
      subtitle: isEs ? "Sacos de 20 kg y Big Bags de 1 TM" : "20 kg Bags & 1 MT Big Bags",
      desc: isEs
        ? "Estaciones de ensacado con dosificación exacta y costura reforzada de alta resistencia. Identificación oficial de lote y código de control CPE."
        : "Bagging stations with precision dosing and reinforced heavy-duty stitching. Official lot identification and CPE regulatory compliance.",
      image: "/images/produsal-linea-envasado.webp",
      alt: "Línea de ensacado automático y costura de sal PRODUSAL",
      tag: isEs ? "Empaque Industrial" : "Industrial Packaging",
      icon: <Factory className="w-4 h-4 text-[#85b2cf]" />,
      tagClass: "text-[#85b2cf] border-[#85b2cf]/40",
      hoverBorder: "hover:border-[#85b2cf]/60",
    },
    {
      title: isEs ? "Inspección y Trazabilidad" : "Quality Inspection & Traceability",
      subtitle: isEs ? "Certificados de Calidad por Lote" : "Batch Quality Certification",
      desc: isEs
        ? "Supervisión analítica de parámetros físico-químicos antes de cada salida. Cumplimiento estricto de especificaciones ASTM E534-98."
        : "Analytical verification of physicochemical parameters prior to dispatch. Strict compliance with ASTM E534-98 standards.",
      image: "/images/produsal-inspeccion-calidad.webp",
      alt: "Supervisor de calidad inspeccionando manifiesto de despacho PRODUSAL",
      tag: isEs ? "Garantía Analítica" : "Analytical Warranty",
      icon: <ShieldCheck className="w-4 h-4 text-[#02aeaa]" />,
      tagClass: "text-[#02aeaa] border-[#02aeaa]/40",
      hoverBorder: "hover:border-[#02aeaa]/60",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-28 bg-brand-offwhite border-t border-slate-200/80 text-slate-800 overflow-hidden">
      {/* Triángulos 2D corporativos en el fondo */}
      <BrandTrianglesBackground layout="separated" size="lg" opacityClass="opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 sm:gap-14 lg:gap-16">
        
        {/* Encabezado de la Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
          <div className="max-w-2xl flex flex-col gap-3">
            <ScrollReveal animation="fade-down">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#02aeaa] font-heading flex items-center gap-2.5">
                <span>{isEs ? "Infraestructura & Capacidad de Suministro" : "Infrastructure & Supply Capability"}</span>
              </span>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={50}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#183c6b] tracking-tight font-heading">
                {isEs ? "Excelencia Operativa en Cada Despacho" : "Operational Excellence in Every Dispatch"}
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {isEs
                  ? "Conoce las instalaciones, líneas de empaque y operaciones logísticas que respaldan el 65% de la producción de sal marina en Venezuela."
                  : "Explore the facilities, packaging lines, and logistics operations that deliver 65% of Venezuela's solar marine salt."}
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-left" delay={150}>
            <Link
              href={`/${currentLang}/contacto`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#02aeaa] hover:bg-[#183c6b] text-white font-bold text-sm font-heading shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>{isEs ? "Solicitar Cotización de Suministro" : "Request Wholesale Quote"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Grid de 4 Bloques Fotográficos Reales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {cards.map((c, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 80}>
              <div className={`group relative rounded-3xl bg-white border border-slate-200/90 ${c.hoverBorder} transition-all duration-300 overflow-hidden flex flex-col h-full shadow-xs hover:shadow-xl hover:-translate-y-1`}>
                
                {/* Imagen Fotográfica Real Optimizada */}
                <div className="relative w-full aspect-4/3 overflow-hidden bg-slate-100">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

                  {/* Tag flotante */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md ${c.tagClass} border font-heading shadow-xs`}>
                      {c.icon}
                      {c.tag}
                    </span>
                  </div>
                </div>

                {/* Contenido Editorial */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-[#e5c798] uppercase tracking-wider font-heading">
                      {c.subtitle}
                    </span>
                    <h3 className="text-lg font-extrabold text-[#183c6b] font-heading group-hover:text-[#02aeaa] transition-colors leading-snug">
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                      {c.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#02aeaa]">
                    <span>{isEs ? "Garantía PRODUSAL" : "PRODUSAL Quality"}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#e5c798]" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Banner Informativo Inferior con Foto de Atardecer */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="relative rounded-3xl overflow-hidden border border-[#02aeaa]/30 shadow-xl p-7 sm:p-10 lg:px-14 lg:py-12 bg-[#183c6b] text-white">
            <div className="absolute inset-0 z-0 opacity-25">
              <Image
                src="/images/produsal-atardecer-reflejo.webp"
                alt={isEs ? "Reflejo del atardecer en las salinas Los Olivitos" : "Sunset reflected on the Los Olivitos salt flats"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#183c6b] via-[#183c6b]/90 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-7 lg:gap-12">
              <div className="flex flex-col gap-3 max-w-2xl">
                <span className="text-xs font-bold text-[#e5c798] uppercase tracking-wider font-heading">
                  {isEs ? "Cosecha Sustentable en el Estado Zulia" : "Sustainable Harvesting in Zulia State"}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                  {isEs
                    ? "Compromiso con el Abastecimiento y la Preservación del Ecosistema"
                    : "Commitment to Industrial Supply and Ecosystem Stewardship"}
                </h3>
                <p className="text-sm text-white/85 leading-relaxed max-w-2xl">
                  {isEs
                    ? "Operamos dentro del Refugio de Fauna Silvestre Ciénaga de Los Olivitos, garantizando procesos 100% limpios que conviven en equilibrio con la colonia de flamencos y la biodiversidad marina."
                    : "Operating within the Los Olivitos Wildlife Refuge, we maintain 100% clean solar processes coexisting in balance with flamingo colonies and marine biodiversity."}
                </p>
              </div>

              <Link
                href={`/${currentLang}/nosotros`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#183c6b] hover:bg-[#02aeaa] hover:text-white font-bold text-sm font-heading shadow-md transition-all shrink-0 group self-start lg:self-center"
              >
                <span>{isEs ? "Conocer Nuestro Compromiso" : "Learn About Our Reserve"}</span>
                <ArrowRight className="w-4 h-4 text-[#02aeaa] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
