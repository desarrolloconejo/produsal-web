"use client";

import { useState } from "react";
import { LayoutGrid, MessageSquareText, Check } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { packagingKind, PACKAGING_STYLES } from "./packaging";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface CategoryContactSectionProps {
  currentLang: Locale;
  category: Dictionary["products"]["categories"][number];
  contactDict: Dictionary["contact"];
}

// Para usar el nombre dentro de una frase sin tocar la "A" de "tipo A"
const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

export function CategoryContactSection({
  currentLang,
  category,
  contactDict,
}: CategoryContactSectionProps) {
  const isEs = currentLang === "es";

  // Opciones construidas a partir de las presentaciones del producto (mismos íconos que el catálogo)
  const productOptions = [
    ...category.items.map((item) => ({
      id: item.slug,
      name: item.name,
      format: item.format,
      Icon: PACKAGING_STYLES[packagingKind(item)].Icon,
    })),
    ...(category.items.length > 1
      ? [
          {
            id: "todas-las-presentaciones",
            name: isEs ? `Varias presentaciones de ${lowerFirst(category.name)}` : `Several ${lowerFirst(category.name)} formats`,
            format: isEs ? "Requerimiento mixto" : "Combined requirement",
            Icon: LayoutGrid,
          },
        ]
      : []),
  ];

  // Presentación seleccionada (por defecto, la primera)
  const [selectedProduct, setSelectedProduct] = useState<string>(
    productOptions[0]?.name || category.name
  );

  return (
    <section id="contacto" className="w-full bg-brand-offwhite relative py-16 sm:py-20 border-t border-slate-200/90 scroll-mt-20 overflow-hidden">
      {/* Triángulos 2D corporativos en el fondo */}
      <BrandTrianglesBackground layout="separated" size="lg" opacityClass="opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

            {/* Columna Izquierda: orientación según la necesidad del cliente (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              <span className="type-label text-[#02aeaa] flex items-center gap-2">
                <MessageSquareText className="w-4 h-4 text-[#02aeaa]" />
                <span>{isEs ? "Atención comercial" : "Commercial support"}</span>
              </span>
              <h3 className="type-h3 text-[#183c6b]">
                {isEs ? `¿Te interesa la ${lowerFirst(category.name)}?` : `Interested in ${lowerFirst(category.name)}?`}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {isEs
                  ? "Cuéntanos qué necesitas: presentación, volumen aproximado y lugar de entrega. Con esa información te orientamos y, según el requerimiento, te atendemos directamente o te conectamos con el distribuidor autorizado más cercano a tu zona."
                  : "Tell us what you need: packaging, approximate volume, and delivery location. With that information we will guide you and, depending on the requirement, serve you directly or connect you with the authorized distributor closest to your area."}
              </p>
            </div>

            {/* Columna Derecha: Formulario con selector de presentación (8 cols) */}
            <div className="lg:col-span-8 bg-slate-50/80 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-lg shadow-slate-200/40">

              <ContactForm
                currentLang={currentLang}
                dict={contactDict}
                idPrefix="cat-contact"
                messageLabel={isEs ? "Cuéntanos tu requerimiento *" : "Tell us your requirement *"}
                defaultMessage={
                  isEs
                    ? `Hola, me interesa ${lowerFirst(selectedProduct)}. Mi requerimiento es: `
                    : `Hello, I am interested in ${lowerFirst(selectedProduct)}. My requirement is: `
                }
                submitLabel={isEs ? "Enviar requerimiento" : "Send requirement"}
              >
                {/* Selector de presentación hecho con divs (sin select) */}
                <div className="flex flex-col gap-2.5">
                  <label className="type-label block text-slate-800">
                    {isEs ? "Presentación de interés *" : "Packaging of interest *"}
                  </label>

                  {/* Input hidden que envía el valor seleccionado a FormData */}
                  <input type="hidden" name="product" value={selectedProduct} />

                  <div
                    role="radiogroup"
                    aria-label={isEs ? "Presentaciones" : "Packaging options"}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                  >
                    {productOptions.map((opt) => {
                      const isSelected = selectedProduct === opt.name;

                      return (
                        <div
                          key={opt.id}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          data-value={opt.name}
                          onClick={() => setSelectedProduct(opt.name)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelectedProduct(opt.name);
                            }
                          }}
                          className={`relative flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer select-none group ${
                            isSelected
                              ? "bg-white border-[#02aeaa] shadow-md ring-2 ring-[#02aeaa]/30"
                              : "bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-[#02aeaa] text-white"
                                  : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                              }`}
                            >
                              <opt.Icon className="w-4.5 h-4.5" />
                            </div>

                            <div className="flex flex-col min-w-0">
                              <span
                                className={`text-xs sm:text-sm font-extrabold font-heading truncate transition-colors ${
                                  isSelected ? "text-[#183c6b]" : "text-slate-700"
                                }`}
                              >
                                {opt.name}
                              </span>
                              <span className="type-caption text-slate-400 truncate">
                                {opt.format}
                              </span>
                            </div>
                          </div>

                          {/* Checkmark circular */}
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 border transition-all ${
                              isSelected
                                ? "bg-[#02aeaa] border-[#02aeaa] text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ContactForm>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
