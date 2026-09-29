import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

export type MarketSectionDict = Dictionary["marketSection"];

interface MarketContentProps {
  currentLang: Locale;
  dict: MarketSectionDict;
}

export function MarketContent({ currentLang, dict }: MarketContentProps) {
  if (!dict) return null;

  const { block1, block2, badge } = dict;

  return (
    <div className="flex flex-col gap-14 sm:gap-18 lg:gap-20">
      {/* Eyebrow de la sección */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col gap-2">
          <span className="text-[#02afab] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
            {badge}
          </span>
        </div>
      </ScrollReveal>

      {/* BLOQUE 1: Comportamiento del mercado local */}
      {block1 && (
        <ScrollReveal animation="fade-up">
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* Título editorial font-heading corporativo */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
            {block1.title}
          </h2>

          {/* Grilla de 3 columnas con divisores verticales blancos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            {/* Columna 1: Consumo aparente */}
            <div className="flex flex-col justify-between pr-0 md:pr-8 lg:pr-10">
              <div className="flex flex-col gap-3">
                <p className="text-white/85 text-sm sm:text-base font-normal leading-relaxed">
                  {block1.consumption.text}
                </p>
                <div className="my-2">
                  <span className="text-xl sm:text-2xl lg:text-[1.75rem] xl:text-[2.1rem] font-black text-white font-heading tracking-tight leading-none whitespace-nowrap block">
                    {block1.consumption.metric}
                  </span>
                </div>
              </div>
              <div className="pt-3 mt-auto">
                <p className="text-white/75 text-xs sm:text-sm font-normal leading-relaxed">
                  {block1.consumption.subtext}
                </p>
              </div>
            </div>

            {/* Columna 2: Capacidad de PRODUSAL */}
            <div className="flex flex-col justify-between pl-0 md:pl-8 lg:pl-10 pr-0 md:pr-8 lg:pr-10 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0">
              <div className="flex flex-col gap-3">
                <p className="text-white font-medium text-sm sm:text-base leading-relaxed">
                  <strong className="font-extrabold text-white">
                    {block1.capacity.text}
                  </strong>
                </p>
                <span className="text-white/75 text-xs sm:text-sm font-normal">
                  {block1.capacity.subtext}
                </span>
                <div className="my-2">
                  <span className="text-xl sm:text-2xl lg:text-[1.75rem] xl:text-[2.1rem] font-black text-[#02afab] font-heading tracking-tight leading-none whitespace-nowrap block">
                    {block1.capacity.metric}
                  </span>
                </div>
              </div>
            </div>

            {/* Columna 3: 100% Zonas litorales */}
            <div className="flex flex-col justify-between pl-0 md:pl-8 lg:pl-10 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0">
              <div className="flex flex-col gap-3">
                <div className="mb-1">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-none block">
                    {block1.coastal.metric}
                  </span>
                </div>
                <p className="text-white/85 text-xs sm:text-sm font-normal leading-relaxed">
                  {block1.coastal.text}
                </p>
              </div>
              <div className="pt-3 mt-auto">
                <p className="text-white/90 text-xs sm:text-sm font-semibold leading-relaxed">
                  {block1.coastal.regions}
                </p>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      )}

      {/* Divisor horizontal entre ambos bloques */}
      <hr className="border-t border-white/15" />

      {/* BLOQUE 2: Capacidad instalada y Aporte Zulia / PRODUSAL */}
      {block2 && (
        <ScrollReveal animation="fade-up" delay={100}>
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* Título editorial font-heading corporativo */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
            {block2.title}
          </h2>

          {/* Grilla de 2 columnas con divisor vertical blanco */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
            {/* Columna 1: Dominio del Zulia y Aporte PRODUSAL */}
            <div className="flex flex-col justify-between pr-0 md:pr-10 lg:pr-12 gap-6">
              <span className="text-white/75 text-xs sm:text-sm font-semibold uppercase tracking-wider font-heading">
                {block2.zuliaDominance.year}
              </span>

              <div className="flex flex-col gap-5">
                {/* Ítem 88% Zulia */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight leading-none">
                    {block2.zuliaDominance.zuliaMetric}
                  </span>
                  <span className="text-base sm:text-lg lg:text-xl text-white/90 font-medium leading-snug">
                    {block2.zuliaDominance.zuliaText}
                  </span>
                </div>

                {/* Ítem 65% PRODUSAL */}
                <div className="flex items-baseline gap-3 pt-3 border-t border-white/10">
                  <span className="text-4xl sm:text-5xl font-black font-heading text-[#02afab] tracking-tight leading-none">
                    {block2.zuliaDominance.produsalMetric}
                  </span>
                  <span className="text-base sm:text-lg lg:text-xl text-white/90 font-medium leading-snug">
                    {block2.zuliaDominance.produsalText}
                  </span>
                </div>
              </div>
            </div>

            {/* Columna 2: Venta total PRODUSAL 2025 */}
            <div className="flex flex-col justify-between pl-0 md:pl-10 lg:pl-12 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0">
              <div className="flex flex-col gap-3">
                <p className="text-white/85 text-sm sm:text-base font-normal">
                  {block2.sales.text}
                </p>
                <div>
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-none block">
                    {block2.sales.metric}
                  </span>
                </div>
              </div>

              {/* Fuente estimación */}
              <div className="pt-6">
                <span className="text-xs text-white/50 italic font-sans">
                  {block2.sales.source}
                </span>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      )}
    </div>
  );
}
