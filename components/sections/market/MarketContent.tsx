import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/dictionaries/get-dictionary";

export type MarketSectionDict = Dictionary["marketSection"];

interface MarketContentProps {
  dict: MarketSectionDict;
}

// Sin participación de mercado ni cifras que cambian cada año (regla del cliente).
// Las tres columnas comparten la misma jerarquía: etiqueta, cifra y texto.
export function MarketContent({ dict }: MarketContentProps) {
  if (!dict) return null;

  const { badge, title, items } = dict;

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col gap-3">
          <span className="type-eyebrow text-[#02aeaa]">
            {badge}
          </span>
          <h2 className="type-h2 text-white">
            {title}
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <ScrollReveal key={item.label} animation="fade-up" delay={index * 100}>
            <div className="h-full flex flex-col gap-3 pt-5 border-t-2 border-[#02aeaa]/70">
              <span className="type-label text-[#85b2cf]">
                {item.label}
              </span>
              <span className="type-h3 text-white">
                {item.value}
              </span>
              <p className="text-white/80 text-sm leading-relaxed font-normal">
                {item.text}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
