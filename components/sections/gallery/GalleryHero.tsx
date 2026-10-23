import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/dictionaries/get-dictionary";

interface GalleryHeroProps {
  dict: Dictionary["gallery"];
  backgroundImageSrc: string;
}

export function GalleryHero({ dict, backgroundImageSrc }: GalleryHeroProps) {
  return (
    <section className="relative w-full text-white min-h-[380px] sm:min-h-[500px] lg:min-h-[540px] flex items-center overflow-hidden bg-[#183c6b] py-14 sm:py-24 lg:py-28 border-b border-[#02aeaa]/20">
      {/* Fondo fotográfico con gradientes multicapa (mismo tratamiento que los demás heros) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImageSrc}
          alt={dict.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#183c6b]/95 via-[#183c6b]/80 to-[#183c6b]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#183c6b]/70 via-transparent to-[#183c6b]" />
        <div className="absolute inset-0 crystal-pattern opacity-25 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[radial-gradient(closest-side,rgba(2,174,170,0.2),transparent)] pointer-events-none" />
        <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-[radial-gradient(closest-side,rgba(229,199,152,0.15),transparent)] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl flex flex-col gap-6 text-left items-start">
          <ScrollReveal animation="fade-down">
            <span className="type-eyebrow text-[#02aeaa]">
              {dict.badge}
            </span>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={50}>
            <h1 className="type-h1">
              <span className="text-[#02aeaa] drop-shadow-xs">{dict.titleHighlight}</span>{" "}
              <span className="text-white/95 block sm:inline">{dict.titleRest}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="type-lead text-white/80 max-w-3xl">
              {dict.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
