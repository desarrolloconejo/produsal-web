import { ReactNode } from "react";
import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";
import { SectionTexture } from "@/components/ui/SectionTexture";

interface AboutWrapperProps {
  children: ReactNode;
}

export function AboutWrapper({ children }: AboutWrapperProps) {
  return (
    <div className="w-full py-16 sm:py-24 lg:py-28 bg-brand-offwhite relative overflow-hidden">
      {/* Textura de cubos acotada al primer bloque (el resto de la página queda liso) */}
      <SectionTexture variant="cubes" className="bottom-auto h-[760px] lg:h-[820px]" />
      {/* Triángulos 2D corporativos en el fondo */}
      <BrandTrianglesBackground layout="together" position="bottom-right" size="lg" opacityClass="opacity-30" />
      <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-[#02aeaa]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 rounded-full bg-[#85b2cf]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-[#e5c798]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </div>
  );
}
