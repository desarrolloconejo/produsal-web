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
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PdfPreviewModal, type PdfModalData } from "@/components/ui/PdfPreviewModal";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface ProductsCatalogGridProps {
  currentLang: Locale;
  dict: Dictionary["products"];
}

export function ProductsCatalogGrid({ currentLang, dict }: ProductsCatalogGridProps) {
  const isEs = currentLang === "es";
  const [modalData, setModalData] = useState<PdfModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPdfModal = (category: (typeof dict.categories)[number]) => {
    setModalData({
      title: `${isEs ? "Ficha Técnica" : "Data Sheet"} — ${category.name}`,
      code: category.code,
      pdfEs: category.pdfEs,
      pdfEn: category.pdfEn,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-slate-50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de Sección */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8 sm:pb-10 mb-10 sm:mb-12">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-[#008784] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
                {isEs ? "Clasificación Oficial" : "Official Classification"}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#082846] font-heading tracking-tight">
                {isEs ? "Las 4 Categorías Industriales" : "The 4 Industrial Categories"}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-normal">
                {dict.qualityGuarantee}
              </p>
            </div>

            <Link
              href={`/${currentLang}/contacto`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#082846] hover:bg-[#008784] transition-all font-heading shrink-0 shadow-xs"
            >
              <span>{dict.ctaQuote}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Grid 2x2 de las 4 Categorías en Diseño Horizontal Split */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
          {dict.categories.map((category, idx) => {
            const isPremium = category.id.includes("premium");
            const isMolida = category.id.includes("molida");

            return (
              <ScrollReveal key={category.id} delay={idx * 100} animation="fade-up">
                <article className="relative flex flex-col sm:flex-row rounded-3xl bg-white border border-slate-200/90 hover:border-[#02afab]/60 hover:shadow-xl transition-all duration-300 overflow-hidden group h-full">
                  {/* Lado Izquierdo: Fotografía Vertical a Sangre (Edge-to-Edge, sin márgenes vacíos) */}
                  <Link
                    href={`/${currentLang}/productos/${category.slug}`}
                    className="relative w-full sm:w-2/5 md:w-5/12 min-h-[280px] sm:min-h-full overflow-hidden block group/img cursor-pointer shrink-0 bg-slate-100"
                    title={`Ver detalles de ${category.name}`}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 45vw, 25vw"
                      className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                    />

                    {/* Overlay sutil para legibilidad de insignias */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />

                    {/* Badges superiores sobre la fotografía */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-1.5 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#082846]/90 text-cyan-300 border border-cyan-400/30 backdrop-blur-xs shadow-xs">
                        {category.code}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-heading backdrop-blur-xs shadow-xs ${
                          isPremium
                            ? "bg-[#02afab] text-white"
                            : "bg-[#94c11e] text-[#082846]"
                        }`}
                      >
                        {isPremium
                          ? isEs ? "Grado Premium" : "Premium Grade"
                          : isEs ? "Tipo A Estándar" : "Standard Type A"}
                      </span>
                    </div>

                    {/* Sello de Pureza Flotante en la esquina inferior izquierda de la foto */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#082846]/90 backdrop-blur-md border border-white/20 text-white shadow-md">
                        <Sparkles className="w-3 h-3 text-[#02afab]" />
                        <span className="text-[11px] font-extrabold font-heading text-white">
                          {category.purity}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Lado Derecho: Ficha Técnica y Contenido */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-6">
                    <div className="flex flex-col gap-4">
                      {/* Tagline y Título de Categoría */}
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#008784] font-heading">
                          {category.tagline}
                        </span>
                        <Link
                          href={`/${currentLang}/productos/${category.slug}`}
                          className="flex items-center justify-between gap-2 group/title"
                        >
                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#082846] tracking-tight font-heading group-hover/title:text-[#02afab] transition-colors">
                            {category.name}
                          </h3>
                          <ArrowRight className="w-5 h-5 text-slate-400 group-hover/title:text-[#02afab] group-hover/title:translate-x-1 transition-all shrink-0" />
                        </Link>
                      </div>

                      {/* Descripción */}
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                        {category.desc}
                      </p>

                      {/* Grid de Especificaciones Físico-Químicas */}
                      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        {/* Pureza */}
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase font-heading flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-[#02afab]" />
                            {dict.purityLabel}
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-[#082846] font-heading mt-0.5">
                            {category.purity}
                          </span>
                        </div>

                        {/* Humedad */}
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase font-heading flex items-center gap-1">
                            <Droplets className="w-2.5 h-2.5 text-[#02afab]" />
                            {dict.humidityLabel}
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-[#082846] font-heading mt-0.5">
                            {category.humidity}
                          </span>
                        </div>

                        {/* Densidad */}
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase font-heading flex items-center gap-1">
                            <Layers className="w-2.5 h-2.5 text-[#02afab]" />
                            {dict.densityLabel || (isEs ? "Densidad" : "Density")}
                          </span>
                          <span className="text-[11px] sm:text-xs font-extrabold text-[#082846] font-heading mt-0.5 whitespace-nowrap">
                            {category.density}
                          </span>
                        </div>
                      </div>

                      {/* Presentaciones Disponibles en Formato Chips */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-heading flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-[#008784]" />
                          {dict.packagingLabel} & Formatos
                        </span>

                        <div className="flex flex-wrap gap-1.5">
                          {category.items.map((item) => {
                            const isGranelItem =
                              item.format.toLowerCase().includes("granel") ||
                              item.format.toLowerCase().includes("bulk");

                            return (
                              <div
                                key={item.slug}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs ${
                                  isGranelItem
                                    ? "bg-[#02afab]/10 border border-[#02afab]/30 text-[#082846] font-bold"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {isGranelItem ? (
                                  <Truck className="w-3 h-3 text-[#008784] shrink-0" />
                                ) : (
                                  <CheckCircle2 className="w-3 h-3 text-slate-400 shrink-0" />
                                )}
                                <span className="font-heading font-medium">
                                  {item.name}
                                </span>
                                <span className="text-[10px] font-semibold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200/60 ml-0.5">
                                  {item.format}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Acciones: Previsualizar Ficha Técnica (Modal) y Ver Detalle Completo */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                      {/* Botón Modal Ficha Técnica */}
                      <button
                        type="button"
                        onClick={() => openPdfModal(category)}
                        className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-[#082846] hover:text-white bg-slate-100 hover:bg-[#082846] border border-slate-200 transition-all font-heading text-center cursor-pointer shadow-2xs"
                      >
                        <FileText className="w-4 h-4 text-[#008784]" />
                        <span>{dict.ctaSpec}</span>
                      </button>

                      {/* Botón Ver Detalle de Categoría */}
                      <Link
                        href={`/${currentLang}/productos/${category.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[#008784] hover:bg-[#02afab] transition-all font-heading text-center shadow-xs"
                      >
                        <span>{isEs ? "Ver especificación completa" : "View full specifications"}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
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
