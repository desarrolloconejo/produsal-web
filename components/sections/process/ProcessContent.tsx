import { ArrowRight, ArrowLeft, ArrowDown, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

export type ProcessSectionDict = Dictionary["processSection"];

interface ProcessContentProps {
  currentLang: Locale;
  dict: ProcessSectionDict;
}

// Configuración de distribución no uniforme de las tarjetas (zigzag)
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
        <div className="flex flex-col gap-3 max-w-5xl border-b border-slate-200/80 pb-8 sm:pb-10">
          <div className="flex items-center gap-2">
            <span className="type-eyebrow text-[#02aeaa]">
              {dict.badge}
            </span>
          </div>

          <h2 className="type-h2 text-[#183c6b]">
            {dict.title}
          </h2>

          <p className="type-body text-slate-600">
            {dict.description}
          </p>
        </div>
      </ScrollReveal>

      {/* 2. Flujo Lineal No Uniforme con Líneas Conectoras */}
      <div className="relative flex flex-col w-full">
        {dict.steps.map((item, index) => {
          const isLast = index === dict.steps.length - 1;
          const nextStep = !isLast ? dict.steps[index + 1] : null;
          const layout = CARD_LAYOUTS[index % CARD_LAYOUTS.length];
          const isLeftToRight = index % 2 === 0;
          const progressPercent = Math.round(((index + 1) / dict.steps.length) * 100);

          const stepThemes = [
            {
              // Paso 1: Alimentación de agua de mar (Celeste Costero)
              badgeColor: "text-[#85b2cf]",
              watermark: "text-[#85b2cf]/20 group-hover:text-[#85b2cf]/35",
              hoverBorder: "hover:border-[#85b2cf]/60",
              titleHover: "group-hover:text-[#85b2cf]",
            },
            {
              // Paso 2: Evaporación y concentración solar (Arena / Dorado Solar)
              badgeColor: "text-[#e5c798]",
              watermark: "text-[#e5c798]/20 group-hover:text-[#e5c798]/35",
              hoverBorder: "hover:border-[#e5c798]/60",
              titleHover: "group-hover:text-[#e5c798]",
            },
            {
              // Paso 3: Cristalización (Turquesa Salinas)
              badgeColor: "text-[#02aeaa]",
              watermark: "text-[#02aeaa]/20 group-hover:text-[#02aeaa]/35",
              hoverBorder: "hover:border-[#02aeaa]/60",
              titleHover: "group-hover:text-[#02aeaa]",
            },
            {
              // Paso 4: Cosecha y despacho (Turquesa Salinas)
              badgeColor: "text-[#02aeaa]",
              watermark: "text-[#02aeaa]/20 group-hover:text-[#02aeaa]/35",
              hoverBorder: "hover:border-[#02aeaa]/60",
              titleHover: "group-hover:text-[#02aeaa]",
            },
          ];

          const currentTheme = stepThemes[index % stepThemes.length];

          return (
            <div key={item.step} className="flex flex-col w-full">
              {/* Contenedor relativo de la tarjeta */}
              <ScrollReveal
                animation="fade-up"
                className={`relative flex flex-col group ${layout.align} ${layout.widthClass} ${layout.offsetClass}`}
              >
                {/* Tarjeta de Etapa (Sólida con fondo blanco por encima) */}
                <article
                  className={`relative z-10 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white shadow-sm border border-slate-200/80 ${currentTheme.hoverBorder} hover:shadow-xl transition-all duration-300 overflow-hidden w-full`}
                >
                  {/* Número de agua de fondo */}
                  <span className={`absolute top-2 right-4 text-4xl sm:text-5xl font-black ${currentTheme.watermark} font-heading select-none pointer-events-none tracking-tighter z-0 transition-colors`}>
                    {item.step}
                  </span>

                  {/* Contenido Principal */}
                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Encabezado de la tarjeta: Badge de etapa (deja libre la esquina del número de fondo) */}
                    <span className={`type-label pr-16 sm:pr-20 ${currentTheme.badgeColor}`}>
                      {item.step} • {item.shortDesc}
                    </span>

                    {/* Título */}
                    <h3 className={`type-h3 text-[#183c6b] ${currentTheme.titleHover} transition-colors duration-200`}>
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
                          className="h-full bg-gradient-to-r from-[#02aeaa] via-[#85b2cf] to-[#e5c798] rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="font-semibold text-slate-500 text-[11px]">
                        {dict.phaseLabel} {index + 1} {dict.ofLabel} {dict.steps.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400">
                      {isLast ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#02aeaa]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{dict.completedBadge}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-400 group-hover:text-[#02aeaa] transition-colors">
                          {progressPercent}%
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>

              {/* Línea Conectora Fluida entre Tarjetas Consecutivas */}
              {nextStep && (
                <div className="relative w-full my-2 sm:my-3 flex flex-col items-center justify-center">
                  {/* Conector para pantallas de escritorio (Curva SVG en S) */}
                  <div className="hidden md:block w-full h-14 lg:h-20 relative">
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
                          <stop offset="0%" stopColor="#02aeaa" />
                          <stop offset="50%" stopColor="#85b2cf" />
                          <stop offset="100%" stopColor="#e5c798" />
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
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border ${
                      index === 0 ? "border-[#85b2cf]/60" : index === 1 ? "border-[#e5c798]/60" : "border-[#02aeaa]/40"
                    } shadow-sm text-xs font-bold text-[#183c6b] font-heading`}>
                      {isLeftToRight ? (
                        <>
                          <span className={currentTheme.badgeColor}>{item.step}</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${currentTheme.badgeColor}`} />
                          <span className="text-[#183c6b]">{nextStep.step}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[#183c6b]">{nextStep.step}</span>
                          <ArrowLeft className={`w-3.5 h-3.5 ${currentTheme.badgeColor}`} />
                          <span className={currentTheme.badgeColor}>{item.step}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Conector para pantallas móviles (Línea vertical con flecha) */}
                  <div className="flex md:hidden flex-col items-center justify-center py-2">
                    <div className="w-0.5 h-5 bg-gradient-to-b from-[#02aeaa] via-[#85b2cf] to-[#e5c798]" />
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border ${
                      index === 0 ? "border-[#85b2cf]/60" : index === 1 ? "border-[#e5c798]/60" : "border-[#02aeaa]/40"
                    } shadow-sm text-xs font-bold text-[#183c6b] font-heading -my-1 z-10`}>
                      <span className={currentTheme.badgeColor}>{item.step}</span>
                      <ArrowDown className={`w-3.5 h-3.5 ${currentTheme.badgeColor}`} />
                      <span className="text-[#183c6b]">{nextStep.step}</span>
                    </div>
                    <div className="w-0.5 h-5 bg-gradient-to-b from-[#e5c798] via-[#85b2cf] to-[#02aeaa]" />
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
