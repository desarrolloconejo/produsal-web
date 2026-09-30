import { Waves, Sun, Sparkles, Filter, Layers, Truck, ArrowRight, ArrowLeft, ArrowDown, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

export type ProcessSectionDict = Dictionary["processSection"];

interface ProcessContentProps {
  currentLang: Locale;
  dict: ProcessSectionDict;
}

const STEP_ICONS = [Waves, Sun, Sparkles, Filter, Layers, Truck];

// Configuración de distribución no uniforme: tarjetas con amplio margen para lucir los iconos en el lateral derecho
const CARD_LAYOUTS = [
  {
    align: "md:self-start",
    widthClass: "w-full md:w-[75%] lg:w-[44%]",
    offsetClass: "md:ml-0 lg:ml-2",
  },
  {
    align: "md:self-end",
    widthClass: "w-full md:w-[78%] lg:w-[46%]",
    offsetClass: "md:mr-16 lg:mr-28 xl:mr-36",
  },
  {
    align: "md:self-start",
    widthClass: "w-full md:w-[72%] lg:w-[42%]",
    offsetClass: "md:ml-0 lg:ml-8",
  },
  {
    align: "md:self-end",
    widthClass: "w-full md:w-[80%] lg:w-[47%]",
    offsetClass: "md:mr-14 lg:mr-24 xl:mr-32",
  },
  {
    align: "md:self-start",
    widthClass: "w-full md:w-[74%] lg:w-[43%]",
    offsetClass: "md:ml-0 lg:ml-4",
  },
  {
    align: "md:self-end",
    widthClass: "w-full md:w-[82%] lg:w-[48%]",
    offsetClass: "md:mr-12 lg:mr-20 xl:mr-28",
  },
];

export function ProcessContent({ currentLang, dict }: ProcessContentProps) {
  if (!dict || !dict.steps) return null;

  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
      {/* 1. Cabecera Editorial (Minimalista, sin fondo ni bordes) */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col gap-3 max-w-3xl border-b border-slate-200/80 pb-8 sm:pb-10">
          <span className="text-[#008784] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
            {dict.badge}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#082846] tracking-tight leading-[1.15] font-heading">
            {dict.title}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {dict.description}
          </p>
        </div>
      </ScrollReveal>

      {/* 2. Flujo Lineal No Uniforme con Líneas Conectoras */}
      <div className="relative flex flex-col w-full">
        {dict.steps.map((item, index) => {
          const Icon = STEP_ICONS[index] || Waves;
          const isLast = index === dict.steps.length - 1;
          const nextStep = !isLast ? dict.steps[index + 1] : null;
          const layout = CARD_LAYOUTS[index % CARD_LAYOUTS.length];
          const isLeftToRight = index % 2 === 0;
          const progressPercent = Math.round(((index + 1) / dict.steps.length) * 100);

          return (
            <div key={item.step} className="flex flex-col w-full">
              {/* Contenedor relativo de la tarjeta y su icono flotante de fondo */}
              <ScrollReveal
                animation="fade-up"
                className={`relative flex flex-col group ${layout.align} ${layout.widthClass} ${layout.offsetClass}`}
              >
                {/* Icono gigante turquesa DETRÁS de la tarjeta en el lado derecho (altamente visible, 75%+ expuesto) */}
                <div
                  aria-hidden="true"
                  className="absolute -right-24 sm:-right-36 lg:-right-48 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 pointer-events-none select-none z-0 flex items-center justify-center"
                >
                  <Icon
                    className="w-full h-full text-[#02afab]/55 stroke-[1.75] drop-shadow-[0_0_24px_rgba(2,175,171,0.25)]"
                  />
                </div>

                {/* Tarjeta de Etapa (Sólida con fondo blanco por encima) */}
                <article
                  className="relative z-10 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white shadow-sm border border-slate-200/80 hover:border-[#02afab]/60 hover:shadow-xl transition-all duration-300 overflow-hidden w-full"
                >
                  {/* Número de agua de fondo */}
                  <span className="absolute top-2 right-4 text-4xl sm:text-5xl font-black text-slate-200/50 font-heading select-none pointer-events-none tracking-tighter z-0">
                    {item.step}
                  </span>

                  {/* Contenido Principal */}
                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Encabezado de la tarjeta: Badge de etapa e icono */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#008784] uppercase tracking-wider font-heading">
                        {item.step} • {item.shortDesc}
                      </span>
                      <div className="w-11 h-11 rounded-2xl bg-slate-100 group-hover:bg-[#02afab]/15 flex items-center justify-center text-[#082846] group-hover:text-[#02afab] transition-colors duration-300">
                        <Icon className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    {/* Título */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#082846] tracking-tight leading-snug font-heading group-hover:text-[#02afab] transition-colors duration-200">
                      {item.name}
                    </h3>

                    {/* Descripción */}
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Pie de tarjeta con progreso secuencial */}
                  <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-heading">
                    <div className="flex items-center gap-2.5">
                      <div className="w-20 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#02afab] to-[#94c11e] rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="font-semibold text-slate-500 text-[11px]">
                        {dict.phaseLabel} {index + 1} {dict.ofLabel} {dict.steps.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400">
                      {isLast ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008784]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{dict.completedBadge}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-400 group-hover:text-[#02afab] transition-colors">
                          {progressPercent}%
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>

              {/* Línea Conectora Fluida entre Tarjetas Consecutivas */}
              {nextStep && (
                <div className="relative w-full my-6 sm:my-8 lg:my-10 flex flex-col items-center justify-center">
                  {/* Conector para pantallas de escritorio (Curva SVG en S) */}
                  <div className="hidden md:block w-full h-24 lg:h-32 relative">
                    <svg
                      className="w-full h-full overflow-visible"
                      viewBox="0 0 1000 120"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id={`line-grad-${item.step}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#02afab" />
                          <stop offset="100%" stopColor="#94c11e" />
                        </linearGradient>
                      </defs>

                      {isLeftToRight ? (
                        /* Curva de izquierda a derecha */
                        <path
                          d="M 240 0 C 240 70, 660 50, 660 120"
                          stroke={`url(#line-grad-${item.step})`}
                          strokeWidth="2.5"
                          strokeDasharray="6 6"
                          className="opacity-70"
                        />
                      ) : (
                        /* Curva de derecha a izquierda */
                        <path
                          d="M 660 0 C 660 70, 240 50, 240 120"
                          stroke={`url(#line-grad-${item.step})`}
                          strokeWidth="2.5"
                          strokeDasharray="6 6"
                          className="opacity-70"
                        />
                      )}
                    </svg>

                    {/* Waypoint central secuencial con flecha coherente con la dirección */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#02afab]/40 shadow-sm text-xs font-bold text-[#082846] font-heading">
                      {isLeftToRight ? (
                        <>
                          <span className="text-[#008784]">{item.step}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#02afab]" />
                          <span className="text-[#082846]">{nextStep.step}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[#082846]">{nextStep.step}</span>
                          <ArrowLeft className="w-3.5 h-3.5 text-[#02afab]" />
                          <span className="text-[#008784]">{item.step}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Conector para pantallas móviles (Línea vertical con flecha) */}
                  <div className="flex md:hidden flex-col items-center justify-center py-2">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#02afab] to-[#94c11e]" />
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#02afab]/40 shadow-sm text-xs font-bold text-[#082846] font-heading -my-1 z-10">
                      <span className="text-[#008784]">{item.step}</span>
                      <ArrowDown className="w-3.5 h-3.5 text-[#02afab]" />
                      <span className="text-[#082846]">{nextStep.step}</span>
                    </div>
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#94c11e] to-[#02afab]" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
