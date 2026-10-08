import { ReactNode } from "react";
import Image from "next/image";
import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";

interface MarketWrapperProps {
  children: ReactNode;
  id?: string;
}

export function MarketWrapper({ children, id = "mercado" }: MarketWrapperProps) {
  return (
    <section
      id={id}
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-[#183c6b] text-white overflow-hidden"
    >
      {/* Fondo de alta resolución con la montaña de sal en el lateral derecho */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 pointer-events-none select-none opacity-40 lg:opacity-50">
        <Image
          src="/images/produsal-atardecer-piramide.webp"
          alt=""
          fill
          className="object-cover object-right"
          priority
        />
      </div>

      {/* Degradados corporativos para garantizar contraste y legibilidad absoluta */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#183c6b] via-[#183c6b]/90 to-[#183c6b]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(2,174,170,0.08)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      {/* Triángulos 2D corporativos en el fondo (separados en los extremos en fondo azul) */}
      <BrandTrianglesBackground layout="separated" size="lg" opacityClass="opacity-25" />

      {/* Brillo ambiental turquesa, celeste costero y dorado solar */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#02aeaa]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#85b2cf]/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-[#e5c798]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {children}
      </div>
    </section>
  );
}
