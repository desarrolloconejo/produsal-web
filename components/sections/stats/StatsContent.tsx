import { Sparkles, Factory, SunMedium } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { HeroStatItem } from "@/components/sections/hero/HeroStats";

interface StatsContentProps {
  stats: HeroStatItem[];
}

export function StatsContent({ stats }: StatsContentProps) {
  const iconConfigs = [
    {
      Icon: Sparkles,
      iconHoverColor: "group-hover:text-[#02afab]",
      boxHoverStyle: "group-hover:border-[#02afab] group-hover:bg-[#02afab]/20",
    },
    {
      Icon: Factory,
      iconHoverColor: "group-hover:text-[#02afab]",
      boxHoverStyle: "group-hover:border-[#02afab] group-hover:bg-[#02afab]/20",
    },
    {
      Icon: SunMedium,
      iconHoverColor: "group-hover:text-[#94c11e]",
      boxHoverStyle: "group-hover:border-[#94c11e] group-hover:bg-[#94c11e]/20",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {stats.map((stat, index) => {
          const config = iconConfigs[index % iconConfigs.length];
          const IconComponent = config.Icon;

          return (
            <ScrollReveal
              key={stat.label + index}
              delay={index * 120}
              animation="fade-up"
            >
              <div className="rounded-2xl p-6 sm:p-8 bg-[#082846] border border-[#02afab]/25 hover:border-[#02afab]/60 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden shadow-xl hover:shadow-2xl h-full">
                {/* Línea de acento al hacer hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#02afab] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl bg-white/10 border border-white/15 ${config.boxHoverStyle} transition-all duration-300 shadow-sm`}
                  >
                    <IconComponent
                      className={`w-6 h-6 text-white ${config.iconHoverColor} transition-colors duration-300`}
                    />
                  </div>
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
                    {stat.value}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#02afab] transition-colors">
                  {stat.label}
                </h3>

                <p className="text-sm text-white/75 leading-relaxed font-normal">
                  {stat.detail}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
