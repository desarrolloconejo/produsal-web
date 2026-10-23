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
      title: isEs ? "Pureza solar natural" : "Natural solar purity",
      subtitle: isEs ? "Evaporación solar y lavado" : "Solar evaporation and washing",
      desc: isEs
        ? "Sal obtenida por evaporación solar en Los Olivitos y lavada con salmueras frescas. La Sal premium tiene un mínimo de 99,3% de NaCl."
        : "Salt obtained through solar evaporation at Los Olivitos and washed with fresh brines. Premium salt has a minimum of 99.3% NaCl.",
      image: "/images/produsal-sal-manos-pureza.webp",
      alt: isEs ? "Manos sosteniendo sal PRODUSAL" : "Hands holding PRODUSAL salt",
      tag: isEs ? "Materia prima" : "Raw material",
      icon: <Sparkles className="w-4 h-4 text-[#e5c798]" />,
      tagClass: "text-[#e5c798] border-[#e5c798]/40",
      hoverBorder: "hover:border-[#e5c798]/60",
    },
    {
      title: isEs ? "Despacho a granel" : "Bulk dispatch",
      subtitle: isEs ? "Vehículos de gran capacidad" : "High-capacity vehicles",
      desc: isEs
        ? "Carga directa en patio con cargadores frontales y pesaje controlado."
        : "Direct yard loading with front-end loaders and controlled weighing.",
      image: "/images/produsal-despacho-granel-aerea.webp",
      alt: isEs ? "Vista aérea de la carga de sal a granel en el patio" : "Aerial view of bulk salt loading at the yard",
      tag: isEs ? "Logística" : "Logistics",
      icon: <Truck className="w-4 h-4 text-[#02aeaa]" />,
      tagClass: "text-[#02aeaa] border-[#02aeaa]/40",
      hoverBorder: "hover:border-[#02aeaa]/60",
    },
    {
      title: isEs ? "Líneas de envasado" : "Packaging lines",
      subtitle: isEs ? "Sacos y big bags" : "Bags and big bags",
      desc: isEs
        ? "Estaciones de ensacado y costura."
        : "Bagging and stitching stations.",
      image: "/images/produsal-envasado-sacos-hd.webp",
      alt: isEs ? "Sacos de sal PRODUSAL apilados en la planta de empaque" : "PRODUSAL salt bags stacked at the packaging plant",
      tag: isEs ? "Empaque industrial" : "Industrial packaging",
      icon: <Factory className="w-4 h-4 text-[#85b2cf]" />,
      tagClass: "text-[#85b2cf] border-[#85b2cf]/40",
      hoverBorder: "hover:border-[#85b2cf]/60",
    },
    {
      title: isEs ? "Inspección y seguimiento" : "Inspection and monitoring",
      subtitle: isEs ? "Control de calidad por lote" : "Batch quality control",
      desc: isEs
        ? "Supervisión y control de procesos desde el origen hasta el producto terminado."
        : "Supervision and process control from origin to finished product.",
      image: "/images/produsal-control-lista.webp",
      alt: isEs ? "Registro de control de un despacho PRODUSAL" : "Control record of a PRODUSAL dispatch",
      tag: isEs ? "Control analítico" : "Analytical control",
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
              <span className="type-eyebrow text-[#02aeaa] flex items-center gap-2.5">
                <span>{isEs ? "Infraestructura y suministro" : "Infrastructure and supply"}</span>
              </span>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={50}>
              <h2 className="type-h2 text-[#183c6b]">
                {isEs ? "Operación en cada despacho" : "Operations behind every dispatch"}
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="type-body text-slate-600">
                {isEs
                  ? "Conoce las instalaciones, líneas de empaque y operaciones logísticas con las que abastecemos a la industria de todo el país."
                  : "Explore the facilities, packaging lines, and logistics operations that supply industries across the country."}
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-left" delay={150}>
            <Link
              href={`/${currentLang}/contacto`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#02aeaa] hover:bg-[#183c6b] text-white font-bold text-sm font-heading shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>{isEs ? "Contáctanos" : "Contact us"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Grid de 4 bloques fotográficos */}
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
                    quality={90}
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
                    <span className="type-caption text-[#e5c798]">
                      {c.subtitle}
                    </span>
                    <h3 className="type-h4 text-[#183c6b] group-hover:text-[#02aeaa] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                      {c.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#02aeaa]">
                    <span>{isEs ? "Garantía PRODUSAL" : "PRODUSAL quality"}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#e5c798]" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
