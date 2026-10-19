"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProductCategoryGrid } from "./ProductCategoryGrid";
import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";
import { SectionTexture } from "@/components/ui/SectionTexture";

interface ProductsCatalogGridProps {
  currentLang: Locale;
  dict: Dictionary["products"];
}

export function ProductsCatalogGrid({ currentLang, dict }: ProductsCatalogGridProps) {
  const isEs = currentLang === "es";

  if (!dict || !dict.categories) return null;

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
                <span className="type-eyebrow text-[#02aeaa]">
                  {isEs ? "Clasificación Oficial" : "Official Classification"}
                </span>
              </div>
              <h2 className="type-h2 text-[#183c6b]">
                {isEs ? "Las 4 Categorías Industriales" : "The 4 Industrial Categories"}
              </h2>
              <p className="type-body text-slate-600">
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

        {/* Grid de las 4 categorías oficiales */}
        <ProductCategoryGrid currentLang={currentLang} dict={dict} />
      </div>
    </div>
  );
}
