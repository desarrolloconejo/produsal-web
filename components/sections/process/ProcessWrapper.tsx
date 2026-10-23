import { ReactNode } from "react";
import { SectionTexture } from "@/components/ui/SectionTexture";

interface ProcessWrapperProps {
  children: ReactNode;
  id?: string;
}

export function ProcessWrapper({ children, id = "proceso" }: ProcessWrapperProps) {
  return (
    <section
      id={id}
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-brand-offwhite overflow-hidden"
    >
      <SectionTexture variant="waves" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[radial-gradient(closest-side,rgba(2,174,170,0.05),transparent)] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-32 w-96 h-96 rounded-full bg-[radial-gradient(closest-side,rgba(133,178,207,0.05),transparent)] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-[radial-gradient(closest-side,rgba(229,199,152,0.05),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {children}
      </div>
    </section>
  );
}
