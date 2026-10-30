"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { packagingKind, PACKAGING_STYLES } from "./packaging";
import type { Dictionary } from "@/dictionaries/get-dictionary";

type PackagingItem = Dictionary["products"]["categories"][number]["items"][number];

interface ProductPackagingCarouselProps {
  isEs: boolean;
  items: PackagingItem[];
  /** Presentación visible: la comparten el carrusel y la lista de presentaciones */
  active: number;
  onChange: (index: number) => void;
}

const SWIPE_THRESHOLD = 40;

/** Una foto vertical por cada presentación del producto, con su nombre sobre la imagen */
export function ProductPackagingCarousel({ isEs, items, active, onChange }: ProductPackagingCarouselProps) {
  const touchStartX = useRef<number | null>(null);
  const hasMany = items.length > 1;

  const go = (step: number) => onChange((active + step + items.length) % items.length);

  const handleTouchEnd = (endX: number) => {
    if (touchStartX.current === null) return;
    const distance = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) >= SWIPE_THRESHOLD) go(distance < 0 ? 1 : -1);
  };

  const current = items[active];
  const { Icon, iconColor } = PACKAGING_STYLES[packagingKind(current)];
  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#183c6b] shadow-md flex items-center justify-center transition-colors";

  return (
    <div
      className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-slate-200 shadow-lg"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
    >
      {items.map((item, index) => (
        <Image
          key={item.slug}
          src={item.image}
          alt={item.name}
          fill
          quality={90}
          sizes="(max-width: 1024px) 100vw, 40vw"
          aria-hidden={index !== active}
          className={`object-cover object-center transition-opacity duration-500 ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#183c6b]/60 via-transparent to-transparent pointer-events-none" />

      {hasMany && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={isEs ? "Presentación anterior" : "Previous packaging"}
            className={`${arrowClass} left-3`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={isEs ? "Presentación siguiente" : "Next packaging"}
            className={`${arrowClass} right-3`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Presentación visible y puntos de navegación */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-3">
        <span aria-live="polite" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#183c6b]/90 text-white text-xs font-bold font-heading">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          {current.format}
        </span>

        {hasMany && (
          <div className="flex items-center">
            {items.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => onChange(index)}
                aria-label={item.format}
                aria-current={index === active}
                className="p-1.5"
              >
                <span className={`block w-2 h-2 rounded-full transition-colors ${index === active ? "bg-white" : "bg-white/45"}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
