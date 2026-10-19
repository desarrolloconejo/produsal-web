"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Droplets, Package, ArrowRight, FileText, Layers, Truck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PdfPreviewModal, type PdfModalData } from "@/components/ui/PdfPreviewModal";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

type Category = Dictionary["products"]["categories"][number];
type Item = Category["items"][number];

interface ProductCategoryGridProps {
  currentLang: Locale;
  dict: Dictionary["products"];
}

// Tipo de presentación según el formato: define el color y el ícono de la etiqueta
function packagingKind(item: Item): "bigBag" | "bulk" | "bag" {
  const format = item.format.toLowerCase();
  if (format.includes("big bag")) return "bigBag";
  if (format.includes("granel") || format.includes("bulk")) return "bulk";
  return "bag";
}

const PACKAGING_STYLES = {
  bulk: { className: "bg-[#02aeaa]/15 border-[#02aeaa]/30", Icon: Truck, iconColor: "text-[#02aeaa]" },
  bigBag: { className: "bg-[#e5c798]/25 border-[#e5c798]/40", Icon: Layers, iconColor: "text-[#e5c798]" },
  bag: { className: "bg-[#85b2cf]/20 border-[#85b2cf]/40", Icon: Package, iconColor: "text-[#85b2cf]" },
};

/** Grilla de las 4 categorías de producto con visor de ficha técnica (inicio y /productos) */
export function ProductCategoryGrid({ currentLang, dict }: ProductCategoryGridProps) {
  const isEs = currentLang === "es";
  const [modalData, setModalData] = useState<PdfModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPdfModal = (category: Category) => {
    setModalData({
      title: `${isEs ? "Ficha Técnica" : "Data Sheet"} — ${category.pdfTitle}`,
      code: category.code,
      pdfEs: category.pdfEs,
      pdfEn: category.pdfEn,
    });
    setIsModalOpen(true);
  };

  const specs = (category: Category) => [
    { label: dict.purityLabel, value: category.purity, Icon: Sparkles, iconColor: "text-[#02aeaa]" },
    { label: dict.humidityLabel, value: category.humidity, Icon: Droplets, iconColor: "text-[#85b2cf]" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {dict.categories.map((category, idx) => {
          const isPremium = category.id.includes("premium");
          const detailHref = `/${currentLang}/productos/${category.slug}`;

          return (
            <ScrollReveal key={category.id} delay={idx * 100} animation="fade-up">
              <article className="relative flex flex-col justify-between rounded-3xl bg-white shadow-xs border border-slate-200/80 hover:border-[#02aeaa]/60 hover:shadow-xl transition-all duration-300 overflow-hidden group h-full">
                {/* Foto a sangre con badges superiores */}
                <Link
                  href={detailHref}
                  className="relative w-full aspect-[4/5] overflow-hidden group/img block cursor-pointer bg-slate-100"
                  title={isEs ? `Ver página de ${category.name}` : `View ${category.name} page`}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1.5 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#183c6b]/90 text-cyan-300 border border-cyan-400/30 backdrop-blur-xs shadow-xs">
                      {category.code}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-heading backdrop-blur-xs shadow-xs ${
                        isPremium ? "bg-[#02aeaa] text-white" : "bg-[#85b2cf] text-[#183c6b]"
                      }`}
                    >
                      {isPremium
                        ? isEs ? "Grado Premium" : "Premium Grade"
                        : isEs ? "Tipo A Estándar" : "Standard Type A"}
                    </span>
                  </div>
                </Link>

                {/* Cuerpo de la Tarjeta */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-5">
                  <div className="flex flex-col gap-3.5">
                    <Link href={detailHref} className="flex items-center justify-between gap-2 group/title">
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#183c6b] tracking-tight font-heading group-hover/title:text-[#02aeaa] transition-colors leading-snug">
                        {category.name}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover/title:text-[#02aeaa] group-hover/title:translate-x-0.5 transition-all shrink-0" />
                    </Link>

                    <p className="text-slate-600 text-xs leading-relaxed font-normal line-clamp-3">
                      {category.desc}
                    </p>

                    {/* Especificaciones clave: Pureza y Humedad */}
                    <div className="grid grid-cols-2 divide-x divide-slate-200/70 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      {specs(category).map(({ label, value, Icon, iconColor }) => (
                        <div key={label} className="flex flex-col items-center justify-center gap-1 px-1 text-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase font-heading flex items-center gap-1">
                            <Icon className={`w-3 h-3 ${iconColor}`} />
                            {label}
                          </span>
                          <span className="text-xs font-extrabold text-[#183c6b] font-heading whitespace-nowrap">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Presentaciones resumidas */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">
                        {dict.packagingLabel}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {category.items.map((item) => {
                          const style = PACKAGING_STYLES[packagingKind(item)];
                          return (
                            <span
                              key={item.slug}
                              className={`text-[10px] px-2 py-0.5 rounded-md font-heading font-bold text-[#183c6b] border flex items-center gap-1 ${style.className}`}
                            >
                              <style.Icon className={`w-2.5 h-2.5 ${style.iconColor}`} />
                              {item.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Acciones: visor de ficha técnica y detalle */}
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openPdfModal(category)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#183c6b] hover:text-white bg-slate-100 hover:bg-[#183c6b] border border-slate-200/80 hover:border-[#183c6b] transition-all duration-200 font-heading cursor-pointer group/pdf shadow-2xs hover:shadow-xs active:scale-95"
                      title={isEs ? "Abrir visor de Ficha Técnica" : "Open Technical Sheet Preview"}
                    >
                      <FileText className="w-3.5 h-3.5 text-[#02aeaa] group-hover/pdf:text-cyan-300 transition-colors" />
                      <span>{dict.ctaSpec}</span>
                    </button>

                    <Link
                      href={detailHref}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#02aeaa] hover:bg-[#183c6b] transition-all duration-200 font-heading cursor-pointer shadow-xs group/link active:scale-95"
                    >
                      <span>{isEs ? "Ver más" : "Details"}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>

      <PdfPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
        currentLang={currentLang}
      />
    </>
  );
}
