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
  const iconConfigs = [
    {
      Icon: Sparkles,
      iconHoverColor: "group-hover:text-[#02afab]",
      boxHoverStyle: "group-hover:border-[#02afab]/60 group-hover:bg-[#02afab]/15",
    },
    {
      Icon: Factory,
      iconHoverColor: "group-hover:text-[#02afab]",
      boxHoverStyle: "group-hover:border-[#02afab]/60 group-hover:bg-[#02afab]/15",
    },
    {
      Icon: SunMedium,
      iconHoverColor: "group-hover:text-[#94c11e]",
      boxHoverStyle: "group-hover:border-[#94c11e]/60 group-hover:bg-[#94c11e]/15",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-12 pt-8 border-t border-white/10">
      {stats.map((stat, index) => {
        const config = iconConfigs[index % iconConfigs.length];
        const IconComponent = config.Icon;
        const delayClass =
          index === 0
            ? "animate-slide-up-delay-2"
            : index === 1
            ? "animate-slide-up-delay-3"
            : "animate-slide-up-delay-4";

        return (
          <div
            key={stat.label + index}
            className={`glass-card-dark rounded-2xl p-5 md:p-6 transition-all duration-300 hover:border-[#02afab]/60 hover:-translate-y-1 group relative overflow-hidden ${delayClass}`}
          >
            {/* Acento sutil en la parte superior */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#02afab] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-start justify-between gap-4 mb-3">
              <div
                className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${config.boxHoverStyle} transition-all duration-300 shadow-sm`}
              >
                <IconComponent
                  className={`w-5 h-5 text-white ${config.iconHoverColor} transition-colors duration-300`}
                />
              </div>
              <span className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading">
                {stat.value}
              </span>
            </div>

            <h4 className="text-base font-bold text-white mb-1 group-hover:text-[#02afab] transition-colors">
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
