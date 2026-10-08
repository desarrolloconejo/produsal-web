import { Sparkles, Factory, SunMedium } from "lucide-react";

export interface HeroStatItem {
  value: string;
  label: string;
  detail: string;
}

interface HeroStatsProps {
  stats: HeroStatItem[];
}

export function HeroStats({ stats }: HeroStatsProps) {
  const statThemes = [
    {
      Icon: Sparkles,
      iconColor: "text-[#02aeaa]",
      boxHoverStyle: "group-hover:border-[#02aeaa]/60 group-hover:bg-[#02aeaa]/20",
      topLineColor: "via-[#02aeaa]",
      hoverBorder: "hover:border-[#02aeaa]/60",
      textHover: "group-hover:text-[#02aeaa]",
      dotColor: "bg-[#02aeaa]",
    },
    {
      Icon: Factory,
      iconColor: "text-[#85b2cf]",
      boxHoverStyle: "group-hover:border-[#85b2cf]/60 group-hover:bg-[#85b2cf]/20",
      topLineColor: "via-[#85b2cf]",
      hoverBorder: "hover:border-[#85b2cf]/60",
      textHover: "group-hover:text-[#85b2cf]",
      dotColor: "bg-[#85b2cf]",
    },
    {
      Icon: SunMedium,
      iconColor: "text-[#e5c798]",
      boxHoverStyle: "group-hover:border-[#e5c798]/60 group-hover:bg-[#e5c798]/20",
      topLineColor: "via-[#e5c798]",
      hoverBorder: "hover:border-[#e5c798]/60",
      textHover: "group-hover:text-[#e5c798]",
      dotColor: "bg-[#e5c798]",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-12 pt-8 border-t border-white/10">
      {stats.map((stat, index) => {
        const theme = statThemes[index % statThemes.length];
        const IconComponent = theme.Icon;
        const delayClass =
          index === 0
            ? "animate-slide-up-delay-2"
            : index === 1
            ? "animate-slide-up-delay-3"
            : "animate-slide-up-delay-4";

        return (
          <div
            key={stat.label + index}
            className={`glass-card-dark rounded-2xl p-5 md:p-6 transition-all duration-300 ${theme.hoverBorder} hover:-translate-y-1 group relative overflow-hidden ${delayClass}`}
          >
            {/* Acento superior distintivo por tarjeta */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${theme.topLineColor} to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="flex items-start justify-between gap-4 mb-3">
              <div
                className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${theme.boxHoverStyle} transition-all duration-300 shadow-sm`}
              >
                <IconComponent
                  className={`w-5 h-5 ${theme.iconColor} transition-colors duration-300`}
                />
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${theme.dotColor} opacity-70 group-hover:opacity-100`} />
                <span className={`text-3xl lg:text-4xl font-extrabold text-white ${theme.textHover} tracking-tight font-heading transition-colors`}>
                  {stat.value}
                </span>
              </div>
            </div>

            <h4 className={`text-base font-bold text-white mb-1 ${theme.textHover} transition-colors`}>
              {stat.label}
            </h4>

            <p className="text-xs text-white/65 leading-relaxed font-normal">
              {stat.detail}
            </p>
          </div>
        );
      })}
    </div>
  );
}
