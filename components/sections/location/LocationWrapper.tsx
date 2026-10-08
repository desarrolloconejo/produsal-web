import { ReactNode } from "react";

interface LocationWrapperProps {
  children: ReactNode;
  id?: string;
}

export function LocationWrapper({ children, id = "ubicacion" }: LocationWrapperProps) {
  return (
    <section
      id={id}
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-brand-offwhite overflow-hidden"
    >
      <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-[#02aeaa]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 rounded-full bg-[#85b2cf]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-[#e5c798]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {children}
      </div>
    </section>
  );
}
