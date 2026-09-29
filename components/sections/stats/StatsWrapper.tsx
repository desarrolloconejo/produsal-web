import { ReactNode } from "react";

interface StatsWrapperProps {
  children: ReactNode;
  id?: string;
}

export function StatsWrapper({ children, id = "metricas" }: StatsWrapperProps) {
  return (
    <section
      id={id}
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-slate-50 overflow-hidden"
    >
      {/* Trama topográfica continua compartida con todas las secciones claras */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(2,175,171,0.06)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-[#02afab]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 rounded-full bg-[#94c11e]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
