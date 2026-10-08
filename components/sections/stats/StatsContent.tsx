import { Sparkles, Factory, SunMedium } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { HeroStatItem } from "@/components/sections/hero/HeroStats";

interface StatsContentProps {
  stats: HeroStatItem[];
}

export function StatsContent({ stats }: StatsContentProps) {
  const statThemes = [
    {
      Icon: Sparkles,
      iconColor: "text-[#02aeaa]",
      boxHoverStyle: "group-hover:border-[#02aeaa] group-hover:bg-[#02aeaa]/20",
      topLine: "via-[#02aeaa]",
      hoverBorder: "hover:border-[#02aeaa]/60",
      accentText: "group-hover:text-[#02aeaa]",
    },
    {
      Icon: Factory,
      iconColor: "text-[#85b2cf]",
      boxHoverStyle: "group-hover:border-[#85b2cf] group-hover:bg-[#85b2cf]/20",
      topLine: "via-[#85b2cf]",
      hoverBorder: "hover:border-[#85b2cf]/60",
      accentText: "group-hover:text-[#85b2cf]",
    },
    {
      Icon: SunMedium,
      iconColor: "text-[#e5c798]",
      boxHoverStyle: "group-hover:border-[#e5c798] group-hover:bg-[#e5c798]/20",
      topLine: "via-[#e5c798]",
      hoverBorder: "hover:border-[#e5c798]/60",
      accentText: "group-hover:text-[#e5c798]",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {stats.map((stat, index) => {
          const theme = statThemes[index % statThemes.length];
          const IconComponent = theme.Icon;

          return (
            <ScrollReveal
              key={stat.label + index}
              delay={index * 120}
              animation="fade-up"
            >
              <div className={`rounded-2xl p-6 sm:p-8 bg-[#183c6b] border border-white/10 ${theme.hoverBorder} transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden shadow-xl hover:shadow-2xl h-full`}>
                {/* Línea de acento al hacer hover */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${theme.topLine} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl bg-white/10 border border-white/15 ${theme.boxHoverStyle} transition-all duration-300 shadow-sm`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${theme.iconColor} transition-colors duration-300`}
                    />
                  </div>
                  <span className={`text-4xl sm:text-5xl font-extrabold text-white ${theme.accentText} tracking-tight font-heading transition-colors`}>
                    {stat.value}
                  </span>
                </div>

                <h3 className={`text-lg font-bold text-white mb-2 ${theme.accentText} transition-colors`}>
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
