"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale } from "@/dictionaries/get-dictionary";

export interface CarouselProductItem {
  name: string;
  slug: string;
  format: string;
  use: string;
  categoryId: string;
  categoryName: string;
}

interface ProductsCarouselProps {
  items: CarouselProductItem[];
  currentLang: Locale;
  viewDetailsLabel: string;
}

export function ProductsCarousel({ items, currentLang, viewDetailsLabel }: ProductsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicamos items para permitir desplazamiento amplio y continuo
  const displayItems = [...items, ...items];

  // Auto-scroll suave cuando no hay interacción manual
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animId: number;
    const speed = 0.75; // píxeles por frame

    const step = () => {
      if (!isPaused && !isDragging && el) {
        el.scrollLeft += speed;

        // Si llega a la mitad duplicada, rebobinar fluidamente al inicio
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, isDragging]);

  // Manejo de drag con mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasMoved(true);
    }
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Botones de navegación manual
  const scroll = useCallback((direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    // Avanza exactamente una tarjeta (ancho + separación), sea cual sea el breakpoint
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const distance = card ? card.offsetWidth + gap : 340;
    el.scrollBy({ left: direction === "left" ? -distance : distance, behavior: "smooth" });
  }, []);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
    >
      {/* Botones de navegación manual flotantes */}
      <div className="flex items-center justify-end gap-2 mb-3">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 text-[#183c6b] hover:bg-[#02aeaa] hover:border-[#02aeaa] hover:text-white flex items-center justify-center shadow-xs transition-all cursor-pointer"
          aria-label={currentLang === "es" ? "Desplazar productos hacia la izquierda" : "Scroll products left"}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 text-[#183c6b] hover:bg-[#02aeaa] hover:border-[#02aeaa] hover:text-white flex items-center justify-center shadow-xs transition-all cursor-pointer"
          aria-label={currentLang === "es" ? "Desplazar productos hacia la derecha" : "Scroll products right"}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Contenedor del Carrusel con Máscara de Difuminado */}
      <div className="relative w-full overflow-hidden">
        {/* Difuminados en extremos */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-brand-offwhite to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-brand-offwhite to-transparent z-10" />

        {/* Track desplazable por el usuario */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          className={`flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none py-3 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayItems.map((product, idx) => {
            const isGranel = product.categoryId === "granel";
            const isBruta = product.categoryId === "bruta";

            return (
              <Link
                key={`${product.slug}-${idx}`}
                href={`/${currentLang}/productos/${product.categoryId}`}
                onClick={(e) => {
                  if (hasMoved) {
                    e.preventDefault();
                  }
                }}
                draggable={false}
                data-carousel-card
                className="w-80 sm:w-[23rem] shrink-0 p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-[#02aeaa]/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-4 group cursor-pointer"
              >
                {/* Fila Superior: Badges de Categoría y Formato apilados (el formato nunca parte la tarjeta) */}
                <div className="flex flex-col items-start gap-2 min-w-0">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider font-heading ${
                      isGranel
                        ? "bg-[#e5c798]/25 text-[#183c6b] border border-[#e5c798]/40"
                        : isBruta
                        ? "bg-[#85b2cf]/25 text-[#183c6b] border border-[#85b2cf]/40"
                        : "bg-[#02aeaa]/15 text-[#183c6b] border border-[#02aeaa]/30"
                    }`}
                  >
                    {product.categoryName}
                  </span>

                  <span
                    title={product.format}
                    className="max-w-full truncate text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-heading border border-slate-200/60"
                  >
                    {product.format}
                  </span>
                </div>

                {/* Cuerpo: Nombre de Producto y Aplicación (altos fijos para tarjetas uniformes) */}
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-base sm:text-lg font-extrabold text-[#183c6b] group-hover:text-[#02aeaa] transition-colors leading-snug font-heading line-clamp-2 min-h-[2.75em]">
                    {product.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed line-clamp-2">
                    {product.use}
                  </p>
                </div>

                {/* Pie: Enlace y Flecha Animada */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-heading">
                  <span className="text-[11px] font-bold text-[#02aeaa] group-hover:text-[#183c6b] transition-colors">
                    {viewDetailsLabel}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#02aeaa] group-hover:text-white text-slate-400 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
