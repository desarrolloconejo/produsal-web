import { ReactNode } from "react";
import Image from "next/image";

interface MarketWrapperProps {
  children: ReactNode;
  id?: string;
}

export function MarketWrapper({ children, id = "mercado" }: MarketWrapperProps) {
  return (
    <section
      id={id}
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-[#082846] text-white overflow-hidden"
    >
      {/* Fondo de alta resolución con la montaña de sal en el lateral derecho */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 pointer-events-none select-none opacity-40 lg:opacity-50">
        <Image
          src="/images/market-salt-bg.webp"
          alt="Montaña de sal marina PRODUSAL"
          fill
          className="object-cover object-right"
          priority
        />
      </div>

      {/* Degradados corporativos para garantizar contraste y legibilidad absoluta */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#082846] via-[#082846]/90 to-[#082846]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(2,175,171,0.08)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      {/* Brillo ambiental turquesa y lima */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#02afab]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#02afab]/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {children}
      </div>
    </section>
  );
}
