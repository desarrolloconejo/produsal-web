"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProductsCarousel } from "./ProductsCarousel";
import { ProductCategoryGrid } from "./ProductCategoryGrid";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

export type ProductsSectionDict = Dictionary["products"];

interface ProductsContentProps {
  currentLang: Locale;
  dict: ProductsSectionDict;
}

export function ProductsContent({ currentLang, dict }: ProductsContentProps) {
  const isEs = currentLang === "es";

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

  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
      {/* 1. Cabecera Editorial y CTA de Cotización */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8 sm:pb-10">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="type-eyebrow text-[#02aeaa]">
                {dict.badge}
              </span>
            </div>

            <h2 className="type-h2 text-[#183c6b]">
              {dict.title}
            </h2>

            <p className="type-body text-slate-600">
              {dict.subtitle}
            </p>
          </div>

          {/* Botón CTA Global de Cotización */}
          <div className="shrink-0 flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
            <Link
              href={`/${currentLang}/productos`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-[#183c6b] bg-slate-100 hover:bg-[#85b2cf]/20 transition-all font-heading"
            >
              <span>{isEs ? "Ver Catálogo Completo" : "View Full Catalog"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={`/${currentLang}/contacto`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#183c6b] hover:bg-[#02aeaa] shadow-xs hover:shadow-md transition-all duration-300 font-heading group"
            >
              <span>{dict.ctaQuote}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* 2. Grid de las 4 categorías oficiales */}
      <ProductCategoryGrid currentLang={currentLang} dict={dict} />

      {/* 3. Carrusel Infinito de Productos */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex flex-col gap-1.5 text-center items-center">
            <span className="type-label text-[#02aeaa]">
              {dict.carouselBadge}
            </span>
            <h3 className="type-h3 text-[#183c6b]">
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
          <div className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-amber-50/40 border border-[#e5c798]/60 text-xs sm:text-sm font-bold text-[#183c6b] font-heading text-center shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#e5c798] shrink-0" />
            <span>{dict.qualityGuarantee}</span>
          </div>
        </ScrollReveal>
      )}

    </div>
  );
}
