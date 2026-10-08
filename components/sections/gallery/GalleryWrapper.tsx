import { ReactNode } from "react";
import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";
import { SectionTexture } from "@/components/ui/SectionTexture";

interface GalleryWrapperProps {
  children: ReactNode;
  id?: string;
}

export function GalleryWrapper({ children, id = "galeria" }: GalleryWrapperProps) {
  return (
    <section id={id} className="relative w-full py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <SectionTexture variant="cubes" />
      {/* Triángulos 2D corporativos en el fondo */}
      <BrandTrianglesBackground layout="separated" size="lg" opacityClass="opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {children}
      </div>
    </section>
  );
}
