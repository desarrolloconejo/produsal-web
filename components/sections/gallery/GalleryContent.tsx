import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/dictionaries/get-dictionary";
import type { GalleryImage } from "@/data/gallery";

interface GalleryContentProps {
  dict: Dictionary["gallery"];
  images: GalleryImage[];
}

type TileSize = "large" | "wide" | "tall" | "normal";

// Patrón que se repite cada 8 fotos para que el grid no sea uniforme
const SIZE_PATTERN: TileSize[] = ["large", "normal", "normal", "tall", "wide", "normal", "normal", "normal"];

const SIZE_CLASSES: Record<TileSize, string> = {
  large: "col-span-2 row-span-2",
  wide: "col-span-2",
  tall: "row-span-2",
  normal: "",
};

// Con object-cover la foto se escala hasta cubrir el ALTO de la celda, así que
// una foto horizontal en una celda alta se pinta mucho más ancha que la celda.
const SIZE_HINTS: Record<TileSize, string> = {
  large: "(max-width: 639px) 120vw, (max-width: 1023px) 85vw, 720px",
  wide: "(max-width: 767px) 100vw, (max-width: 1023px) 66vw, 640px",
  tall: "(max-width: 639px) 120vw, (max-width: 767px) 100vw, (max-width: 1023px) 80vw, 720px",
  normal: "(max-width: 1023px) 60vw, 360px",
};
const PORTRAIT_HINT = "(max-width: 1023px) 60vw, 360px";

function getTileSize(image: GalleryImage, index: number): TileSize {
  // Las fotos verticales siempre ocupan una celda alta para no recortarse de más
  if (image.height > image.width) return "tall";
  return SIZE_PATTERN[index % SIZE_PATTERN.length];
}

export function GalleryContent({ dict, images }: GalleryContentProps) {
  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col gap-3 max-w-3xl">
          <span className="text-[#02aeaa] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
            {dict.gridBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#183c6b] tracking-tight leading-[1.15] font-heading">
            {dict.gridTitle}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {dict.gridSubtitle}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-dense auto-rows-[150px] sm:auto-rows-[200px] lg:auto-rows-[230px] gap-1 sm:gap-1.5">
        {images.map((image, index) => {
          const size = getTileSize(image, index);

          return (
            <ScrollReveal
              key={image.src}
              as="figure"
              animation="scale-up"
              delay={(index % 4) * 60}
              className={`relative overflow-hidden bg-slate-100 group ${SIZE_CLASSES[size]}`}
            >
              <Image
                src={image.src}
                alt={`${dict.imageAlt} ${index + 1}`}
                fill
                sizes={image.height > image.width ? PORTRAIT_HINT : SIZE_HINTS[size]}
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183c6b]/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
