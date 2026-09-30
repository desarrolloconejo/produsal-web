import Image from "next/image";
import Link from "next/link";
import { Sparkles, Droplets, Package, ArrowRight, FileText, ShieldCheck, Layers, Truck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProductsCarousel } from "./ProductsCarousel";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

export type ProductsSectionDict = Dictionary["products"];

interface ProductsContentProps {
  currentLang: Locale;
  dict: ProductsSectionDict;
}

export function ProductsContent({ currentLang, dict }: ProductsContentProps) {
  if (!dict || !dict.categories) return null;

  // Extraemos todos los productos de todas las categorías en una lista plana para el carrusel infinito
  const allProducts = dict.categories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      categoryName: cat.name,
      categoryId: cat.id,
      categoryPurity: cat.purity,
    }))
  );

  // Duplicamos la lista para crear el bucle infinito continuo
  const marqueeItems = [...allProducts, ...allProducts];

  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
      {/* 1. Cabecera Editorial y SEO Transaccional */}
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
          <div className="shrink-0">
            <a
              href={`/${currentLang}#contacto`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#082846] hover:bg-[#02afab] shadow-sm hover:shadow-lg transition-all duration-300 font-heading group"
            >
              <span>{dict.ctaQuote}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* 2. Las 3 Tarjetas de Categorías Superiores (Enfocadas, Limpias y Sin Listas Internas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
        {dict.categories.map((category, idx) => (
          <ScrollReveal key={category.id} delay={idx * 120} animation="fade-up">
            <article
              className="relative flex flex-col justify-between rounded-3xl bg-white shadow-sm border border-slate-200/80 hover:border-[#02afab]/60 hover:shadow-xl transition-all duration-300 overflow-hidden group h-full"
            >
            {/* Cabecera Visual Clickeable: Fotografía Industrial con enlace a la Categoría */}
            <Link
              href={`/${currentLang}/construccion?categoria=${category.id}`}
              className="relative w-full h-60 sm:h-64 overflow-hidden group/img block cursor-pointer"
              title={`Ver página de ${category.name}`}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover/img:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082846]/90 via-[#082846]/25 to-transparent" />

              {/* Tagline y Título de Categoría sobre la imagen */}
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-1 text-white">
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

                {/* Especificaciones Técnicas (Pureza, Humedad, Formato) */}
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
                      <Package className="w-3 h-3 text-[#02afab]" />
                      {dict.packagingLabel}
                    </span>
                    <span className="text-[11px] font-extrabold text-[#082846] font-heading mt-0.5 truncate">
                      {category.packaging}
                    </span>
                  </div>
                </div>
              </div>

              {/* Acciones por Categoría: Explorar y Ficha Técnica */}
              <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
                <Link
                  href={`/${currentLang}/construccion?categoria=${category.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-[#082846] hover:text-[#008784] bg-slate-100 hover:bg-[#02afab]/10 border border-slate-200/60 transition-all duration-200 font-heading text-center"
                >
                  <span className="truncate">{currentLang === "es" ? "Explorar categoría" : "Explore category"}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>

                <Link
                  href={`/${currentLang}/contacto`}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl font-bold text-xs text-slate-700 hover:text-[#082846] bg-slate-100 hover:bg-slate-200 border border-slate-200/60 transition-colors font-heading whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{dict.ctaSpec}</span>
                </Link>
              </div>
            </div>
          </article>
          </ScrollReveal>
        ))}
      </div>

      {/* 3. Carrusel Infinito de Productos (Diseño Tipográfico Creativo sin Imágenes) */}
      <ScrollReveal animation="fade-up">
      <div className="flex flex-col gap-6 pt-4">
        {/* Cabecera del Carrusel */}
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

        {/* Contenedor del Carrusel Interactivo */}
        <ProductsCarousel
          items={allProducts}
          currentLang={currentLang}
          viewDetailsLabel={dict.viewDetails}
        />
      </div>
      </ScrollReveal>

      {/* 4. Banner Inferior de Garantía y Trazabilidad */}
      {dict.qualityGuarantee && (
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-white border border-slate-200/80 text-xs sm:text-sm font-semibold text-[#008784] font-heading text-center shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#02afab] shrink-0" />
            <span>{dict.qualityGuarantee}</span>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
