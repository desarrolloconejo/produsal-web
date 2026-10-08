import { ReactNode } from "react";

interface ProductsWrapperProps {
  children: ReactNode;
  id?: string;
}

export function ProductsWrapper({ children, id = "productos" }: ProductsWrapperProps) {
  return (
    <section
      id={id}
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-brand-offwhite overflow-hidden"
    >
      <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-[#02aeaa]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 rounded-full bg-[#85b2cf]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-3/4 left-1/3 w-80 h-80 rounded-full bg-[#e5c798]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {children}
      </div>
    </section>
  );
}
