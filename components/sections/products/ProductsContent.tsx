"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Droplets,
  Package,
  ArrowRight,
  FileText,
  ShieldCheck,
  Layers,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProductsCarousel } from "./ProductsCarousel";
import { PdfPreviewModal, type PdfModalData } from "@/components/ui/PdfPreviewModal";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

export type ProductsSectionDict = Dictionary["products"];

interface ProductsContentProps {
  currentLang: Locale;
  dict: ProductsSectionDict;
}

export function ProductsContent({ currentLang, dict }: ProductsContentProps) {
  const isEs = currentLang === "es";
  const [modalData, setModalData] = useState<PdfModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!dict || !dict.categories) return null;

  // Extraemos todos los productos de las 4 categorías para el carrusel infinito
  const allProducts = dict.categories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      categoryName: cat.name,
      categoryId: cat.slug || cat.id,
      categoryPurity: cat.purity,
    }))
  );

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
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
      {/* 1. Cabecera Editorial y CTA de Cotización */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8 sm:pb-10">
          <div className="flex flex-col gap-3 max-w-3xl">
            <span className="text-[#008784] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
              {dict.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#082846] tracking-tight leading-[1.15] font-heading">
              {dict.title}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              {dict.subtitle}
            </p>
          </div>

          {/* Botón CTA Global de Cotización */}
          <div className="shrink-0 flex items-center gap-3">
            <Link
              href={`/${currentLang}/productos`}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#082846] bg-slate-100 hover:bg-slate-200 transition-all font-heading"
            >
              <span>{isEs ? "Ver Catálogo Completo" : "View Full Catalog"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={`/${currentLang}/contacto`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#082846] hover:bg-[#008784] shadow-xs hover:shadow-md transition-all duration-300 font-heading group"
            >
              <span>{dict.ctaQuote}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* 2. Grid 2x2 de las 4 Categorías Oficiales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 items-stretch">
        {dict.categories.map((category, idx) => {
          const isPremium = category.id.includes("premium");

          return (
            <ScrollReveal key={category.id} delay={idx * 100} animation="fade-up">
              <article className="relative flex flex-col justify-between rounded-3xl bg-white shadow-xs border border-slate-200/80 hover:border-[#02afab]/60 hover:shadow-xl transition-all duration-300 overflow-hidden group h-full">
                {/* Cabecera Visual con enlace a la Categoría */}
                <Link
                  href={`/${currentLang}/productos/${category.slug}`}
                  className="relative w-full h-56 sm:h-64 overflow-hidden group/img block cursor-pointer"
                  title={`Ver página de ${category.name}`}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover/img:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082846]/95 via-[#082846]/30 to-transparent" />

                  {/* Badges superiores: Código y Grado */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#082846]/90 text-cyan-300 border border-cyan-400/30 backdrop-blur-xs">
                      {category.code}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider font-heading backdrop-blur-xs ${
                        isPremium
                          ? "bg-[#02afab]/95 text-white"
                          : "bg-[#94c11e]/95 text-[#082846]"
                      }`}
                    >
                      {isPremium
                        ? isEs ? "Grado Premium" : "Premium Grade"
                        : isEs ? "Tipo A Estándar" : "Standard Type A"}
                    </span>
                  </div>

                  {/* Tagline y Título de Categoría sobre la imagen */}
                  <div className="absolute bottom-4 left-5 right-5 flex flex-col gap-1 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#02afab] font-heading">
                      {category.tagline}
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-2xl font-extrabold tracking-tight font-heading group-hover/img:text-[#02afab] transition-colors">
                        {category.name}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-white/70 group-hover/img:text-[#02afab] group-hover/img:translate-x-1 transition-all shrink-0" />
                    </div>
                  </div>
                </Link>

                {/* Cuerpo de la Tarjeta */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-6">
                  <div className="flex flex-col gap-5">
                    {/* Descripción de la categoría */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {category.desc}
                    </p>

                    {/* Especificaciones Técnicas (Pureza, Humedad, Densidad) */}
                    <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase font-heading flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#02afab]" />
                          {dict.purityLabel}
                        </span>
                        <span className="text-xs font-extrabold text-[#082846] font-heading mt-0.5">
                          {category.purity}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase font-heading flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-[#02afab]" />
                          {dict.humidityLabel}
                        </span>
                        <span className="text-xs font-extrabold text-[#082846] font-heading mt-0.5">
                          {category.humidity}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase font-heading flex items-center gap-1">
                          <Layers className="w-3 h-3 text-[#02afab]" />
                          {dict.densityLabel || (isEs ? "Densidad" : "Density")}
                        </span>
                        <span className="text-[11px] font-extrabold text-[#082846] font-heading mt-0.5 truncate">
                          {category.density}
                        </span>
                      </div>
                    </div>

                    {/* Presentaciones resumidas con regla de Granel destacada */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">
                        {dict.packagingLabel}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {category.items.map((item) => {
                          const isGranel =
                            item.format.toLowerCase().includes("granel") ||
                            item.format.toLowerCase().includes("bulk");

                          return (
                            <span
                              key={item.slug}
                              className={`text-[11px] px-2.5 py-1 rounded-lg font-heading font-medium flex items-center gap-1 ${
                                isGranel
                                  ? "bg-[#02afab]/15 text-[#008784] font-bold border border-[#02afab]/30"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {isGranel && <Truck className="w-3 h-3" />}
                              {item.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Acciones: Previsualizar Ficha Técnica (Modal) y Ver Detalle Completo */}
                  <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={() => openPdfModal(category)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl font-bold text-xs text-slate-700 hover:text-white bg-slate-100 hover:bg-[#082846] border border-slate-200/80 transition-all duration-200 font-heading whitespace-nowrap cursor-pointer shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#008784]" />
                      <span>{dict.ctaSpec}</span>
                    </button>

                    <Link
                      href={`/${currentLang}/productos/${category.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-[#082846] hover:text-white bg-slate-100 hover:bg-[#008784] border border-slate-200/60 transition-all duration-200 font-heading text-center"
                    >
                      <span className="truncate">
                        {isEs ? "Ver especificación y formatos" : "View specs & formats"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>

      {/* 3. Carrusel Infinito de Productos */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex flex-col gap-1.5 text-center items-center">
            <span className="text-[#008784] text-xs font-bold uppercase tracking-wider font-heading">
              {dict.carouselBadge}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#082846] tracking-tight font-heading">
              {dict.carouselTitle}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-normal max-w-2xl">
              {dict.carouselSubtitle}
            </p>
          </div>

          <ProductsCarousel
            items={allProducts}
            currentLang={currentLang}
            viewDetailsLabel={dict.viewDetails}
          />
        </div>
      </ScrollReveal>

      {/* 4. Banner Inferior de Garantía */}
      {dict.qualityGuarantee && (
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-white border border-slate-200/80 text-xs sm:text-sm font-semibold text-[#008784] font-heading text-center shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#02afab] shrink-0" />
            <span>{dict.qualityGuarantee}</span>
          </div>
        </ScrollReveal>
      )}

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
