"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Droplets,
  Package,
  Layers,
  ArrowRight,
  FileText,
  Truck,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PdfPreviewModal, type PdfModalData } from "@/components/ui/PdfPreviewModal";
import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";
import { SectionTexture } from "@/components/ui/SectionTexture";

interface ProductsCatalogGridProps {
  currentLang: Locale;
  dict: Dictionary["products"];
}

export function ProductsCatalogGrid({ currentLang, dict }: ProductsCatalogGridProps) {
  const isEs = currentLang === "es";
  const [modalData, setModalData] = useState<PdfModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!dict || !dict.categories) return null;

  const openPdfModal = (category: (typeof dict.categories)[number]) => {
    setModalData({
      title: `${isEs ? "Ficha Técnica" : "Data Sheet"} — ${category.pdfTitle}`,
      code: category.code,
      pdfEs: category.pdfEs,
      pdfEn: category.pdfEn,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-brand-offwhite relative py-16 sm:py-20 overflow-hidden">
      <SectionTexture variant="waves" />
      {/* Triángulos 2D corporativos en el fondo */}
      <BrandTrianglesBackground layout="together" position="bottom-right" size="lg" opacityClass="opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabecera de Sección */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8 sm:pb-10 mb-10 sm:mb-12">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="text-[#02aeaa] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
                  {isEs ? "Clasificación Oficial" : "Official Classification"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#183c6b] font-heading tracking-tight">
                {isEs ? "Las 4 Categorías Industriales" : "The 4 Industrial Categories"}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-normal">
                {dict.qualityGuarantee}
              </p>
            </div>

            <Link
              href={`/${currentLang}/contacto`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#183c6b] hover:bg-[#02aeaa] transition-all font-heading shrink-0 shadow-xs cursor-pointer"
            >
              <span>{dict.ctaQuote}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Grid de 4 Columnas Esbeltas para las 4 Categorías Oficiales (4 en la misma fila vertical como en Home) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {dict.categories.map((category, idx) => {
            const isPremium = category.id.includes("premium");

            return (
              <ScrollReveal key={category.id} delay={idx * 100} animation="fade-up">
                <article className="relative flex flex-col justify-between rounded-3xl bg-white shadow-xs border border-slate-200/80 hover:border-[#02aeaa]/60 hover:shadow-xl transition-all duration-300 overflow-hidden group h-full">
                  {/* Cabecera Visual a Sangre (Aspect 4/5 para llenar todo el ancho sin bordes grises) */}
                  <Link
                    href={`/${currentLang}/productos/${category.slug}`}
                    className="relative w-full aspect-[4/5] overflow-hidden group/img block cursor-pointer bg-slate-100"
                    title={isEs ? `Ver página de ${category.name}` : `View ${category.name} page`}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                    />

                    {/* Badges superiores sobre la fotografía */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1.5 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#183c6b]/90 text-cyan-300 border border-cyan-400/30 backdrop-blur-xs shadow-xs">
                        {category.code}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-heading backdrop-blur-xs shadow-xs ${
                          isPremium
                            ? "bg-[#02aeaa] text-white"
                            : "bg-[#85b2cf] text-[#183c6b]"
                        }`}
                      >
                        {isPremium
                          ? isEs ? "Grado Premium" : "Premium Grade"
                          : isEs ? "Tipo A Estándar" : "Standard Type A"}
                      </span>
                    </div>
                  </Link>

                  {/* Cuerpo de la Tarjeta */}
                  <div className="p-5 flex flex-col justify-between flex-1 gap-5">
                    <div className="flex flex-col gap-3.5">
                      {/* Tagline y Título de Categoría limpio debajo de la foto */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#02aeaa] font-heading flex items-center gap-1.5">
                          <span>{category.tagline}</span>
                        </span>
                        <Link
                          href={`/${currentLang}/productos/${category.slug}`}
                          className="flex items-center justify-between gap-2 group/title cursor-pointer"
                        >
                          <h3 className="text-lg sm:text-xl font-extrabold text-[#183c6b] tracking-tight font-heading group-hover/title:text-[#02aeaa] transition-colors leading-snug">
                            {category.name}
                          </h3>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover/title:text-[#02aeaa] group-hover/title:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      </div>

                      {/* Descripción de la categoría ajustada a 3 líneas */}
                      <p className="text-slate-600 text-xs leading-relaxed font-normal line-clamp-3">
                        {category.desc}
                      </p>

                      {/* Especificaciones Técnicas (Pureza, Humedad, Densidad) */}
                      <div className="grid grid-cols-3 gap-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                        <div className="flex flex-col">
                          <span className="text-[10px] lg:text-[9px] font-bold text-slate-400 uppercase font-heading flex items-center justify-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5 text-[#02aeaa]" />
                            {dict.purityLabel}
                          </span>
                          <span className="text-[11px] font-extrabold text-[#183c6b] font-heading mt-0.5">
                            {category.purity}
                          </span>
                        </div>

                        <div className="flex flex-col border-x border-slate-200/60 px-1">
                          <span className="text-[10px] lg:text-[9px] font-bold text-slate-400 uppercase font-heading flex items-center justify-center gap-0.5">
                            <Droplets className="w-2.5 h-2.5 text-[#85b2cf]" />
                            {dict.humidityLabel}
                          </span>
                          <span className="text-[11px] font-extrabold text-[#183c6b] font-heading mt-0.5">
                            {category.humidity}
                          </span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-[10px] lg:text-[9px] font-bold text-slate-400 uppercase font-heading flex items-center justify-center gap-0.5">
                            <Layers className="w-2.5 h-2.5 text-[#e5c798]" />
                            {dict.densityLabel || (isEs ? "Dens." : "Dens.")}
                          </span>
                          <span className="text-[10px] font-extrabold text-[#183c6b] font-heading mt-0.5 whitespace-nowrap">
                            {category.density}
                          </span>
                        </div>
                      </div>

                      {/* Presentaciones resumidas */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">
                          {dict.packagingLabel}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {category.items.map((item) => {
                            const isGranel =
                              item.format.toLowerCase().includes("granel") ||
                              item.format.toLowerCase().includes("bulk");
                            const isSaco =
                              item.format.toLowerCase().includes("saco") ||
                              item.format.toLowerCase().includes("bag") ||
                              item.format.toLowerCase().includes("20 kg") ||
                              item.format.toLowerCase().includes("50 kg");
                            const isBigBag =
                              item.format.toLowerCase().includes("big bag") ||
                              item.format.toLowerCase().includes("1.000") ||
                              item.format.toLowerCase().includes("1,000") ||
                              item.format.toLowerCase().includes("1 tm");

                            return (
                              <span
                                key={item.slug}
                                className={`text-[10px] px-2 py-0.5 rounded-md font-heading font-medium flex items-center gap-1 ${
                                  isGranel
                                    ? "bg-[#02aeaa]/15 text-[#183c6b] font-bold border border-[#02aeaa]/30"
                                    : isBigBag
                                    ? "bg-[#e5c798]/25 text-[#183c6b] font-bold border border-[#e5c798]/40"
                                    : isSaco
                                    ? "bg-[#85b2cf]/20 text-[#183c6b] font-bold border border-[#85b2cf]/40"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {isGranel && <Truck className="w-2.5 h-2.5 text-[#02aeaa]" />}
                                {isSaco && <Package className="w-2.5 h-2.5 text-[#85b2cf]" />}
                                {isBigBag && <Layers className="w-2.5 h-2.5 text-[#e5c798]" />}
                                {item.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Botones de Acción con Hover Optimizado para Ficha Técnica */}
                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => openPdfModal(category)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#183c6b] hover:text-white bg-slate-100 hover:bg-[#183c6b] border border-slate-200/80 hover:border-[#183c6b] transition-all duration-200 font-heading cursor-pointer group/pdf shadow-2xs hover:shadow-xs active:scale-95"
                        title={isEs ? "Abrir visor de Ficha Técnica" : "Open Technical Sheet Preview"}
                      >
                        <FileText className="w-3.5 h-3.5 text-[#02aeaa] group-hover/pdf:text-cyan-300 transition-colors" />
                        <span>{dict.ctaSpec}</span>
                      </button>

                      <Link
                        href={`/${currentLang}/productos/${category.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#02aeaa] hover:bg-[#183c6b] transition-all duration-200 font-heading cursor-pointer shadow-xs group/link active:scale-95"
                      >
                        <span>{isEs ? "Ver más" : "Details"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Modal Interactivo de Ficha Técnica */}
      <PdfPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
        currentLang={currentLang}
      />
    </div>
  );
}
