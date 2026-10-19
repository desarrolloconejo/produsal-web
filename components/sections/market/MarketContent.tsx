import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/dictionaries/get-dictionary";

export type MarketSectionDict = Dictionary["marketSection"];

interface MarketContentProps {
  dict: MarketSectionDict;
}

// Solo datos estables: sin participación de mercado, ventas ni cifras que cambian cada año
export function MarketContent({ dict }: MarketContentProps) {
  if (!dict) return null;

  const { badge, title, capacity, leadership, coastal } = dict;

  return (
    <ScrollReveal animation="fade-up">
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-[#02aeaa] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
            {badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
            {title}
          </h2>
        </div>

        {/* Grilla de 3 columnas con divisores verticales blancos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {/* Columna 1: Capacidad operativa */}
          <div className="flex flex-col justify-between pr-0 md:pr-8 lg:pr-10">
            <div className="flex flex-col gap-3">
              <p className="text-white/85 text-sm sm:text-base font-normal leading-relaxed">
                {capacity.text}
              </p>
              <span className="my-2 text-xl sm:text-2xl lg:text-[1.75rem] xl:text-[2.1rem] font-black text-white font-heading tracking-tight leading-none whitespace-nowrap block">
                {capacity.metric}
              </span>
            </div>
            <p className="pt-3 mt-auto text-white/75 text-xs sm:text-sm font-normal leading-relaxed">
              {capacity.subtext}
            </p>
          </div>

          {/* Columna 2: Liderazgo de PRODUSAL */}
          <div className="flex flex-col gap-3 pl-0 md:pl-8 lg:pl-10 pr-0 md:pr-8 lg:pr-10 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0">
            <p className="text-white font-extrabold text-sm sm:text-base leading-relaxed">
              {leadership.text}
            </p>
            <p className="pt-2 text-white/80 text-xs sm:text-sm font-normal leading-relaxed">
              {leadership.subtext}
            </p>
          </div>

          {/* Columna 3: 100% Zonas litorales */}
          <div className="flex flex-col justify-between pl-0 md:pl-8 lg:pr-10 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0">
            <div className="flex flex-col gap-3">
              <span className="mb-1 text-4xl sm:text-5xl lg:text-6xl font-black text-[#85b2cf] font-heading tracking-tight leading-none block">
                {coastal.metric}
              </span>
              <p className="text-white/85 text-xs sm:text-sm font-normal leading-relaxed">
                {coastal.text}
              </p>
            </div>
            <p className="pt-3 mt-auto text-white/90 text-xs sm:text-sm font-semibold leading-relaxed">
              {coastal.regions}
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
