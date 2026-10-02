"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Droplets,
  Package,
  Layers,
  ArrowRight,
  ArrowLeft,
  FileText,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Download,
  ExternalLink,
  ChevronRight,
  Building2,
  BadgeCheck,
  Scale,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PdfPreviewModal, type PdfModalData } from "@/components/ui/PdfPreviewModal";
import { CategoryContactSection } from "./CategoryContactSection";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface CategoryDetailViewProps {
  currentLang: Locale;
  category: (Dictionary["products"]["categories"])[number];
  allCategories: Dictionary["products"]["categories"];
  dict: Dictionary["products"];
}

export function CategoryDetailView({
  currentLang,
  category,
  allCategories,
  dict,
}: CategoryDetailViewProps) {
  const isEs = currentLang === "es";
  const [modalData, setModalData] = useState<PdfModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPdfModal = () => {
    setModalData({
      title: `${isEs ? "Ficha Técnica" : "Data Sheet"} — ${category.name}`,
      code: category.code,
      pdfEs: category.pdfEs,
      pdfEn: category.pdfEn,
    });
    setIsModalOpen(true);
  };

  const otherCategories = allCategories.filter((c) => c.id !== category.id);
  const isPremium = category.id.includes("premium");
  const currentPdfUrl = isEs ? category.pdfEs : category.pdfEn;

  // Parámetros de la tabla físico-química extraídos de las fichas de laboratorio
  const techTableRows = [
    {
      param: isEs ? "Cloruro de Sodio (Base Seca % p/p)" : "Sodium Chloride (Dry Base % w/w)",
      value: category.purity,
      method: "ASTM E534-98",
      coa: isEs ? "Por lote (Sí)" : "Per lot (Yes)",
    },
    {
      param: isEs ? "Humedad Superficial (% p/p)" : "Surface Moisture (% w/w)",
      value: category.humidity,
      method: "ASTM E534-98",
      coa: isEs ? "Por lote (Sí)" : "Per lot (Yes)",
    },
    {
      param: isEs ? "Calcio como Ca++ (% p/p)" : "Calcium as Ca++ (% w/w)",
      value: category.calcium,
      method: "ASTM E534-98",
      coa: isEs ? "Por lote (Sí)" : "Per lot (Yes)",
    },
    {
      param: isEs ? "Magnesio como Mg++ (% p/p)" : "Magnesium as Mg++ (% w/w)",
      value: category.magnesium,
      method: "ASTM E534-98",
      coa: isEs ? "Por lote (Sí)" : "Per lot (Yes)",
    },
    {
      param: isEs ? "Sulfatos como SO4 (% p/p)" : "Sulfates as SO4 (% w/w)",
      value: category.sulfates,
      method: "ASTM E534-98",
      coa: isEs ? "Por lote (Sí)" : "Per lot (Yes)",
    },
    {
      param: isEs ? "Insolubles en Agua (% p/p)" : "Water Insolubles (% w/w)",
      value: category.insolubles,
      method: "ASTM E534-98",
      coa: isEs ? "Por lote (Sí)" : "Per lot (Yes)",
    },
    {
      param: isEs ? "Densidad Aparente (g/L)" : "Bulk Density (g/L)",
      value: category.density,
      method: isEs ? "Interno Produsal" : "Produsal Internal",
      coa: isEs ? "Referencial" : "Referential",
    },
    {
      param: isEs ? "Aditivos / Antiaglomerante" : "Additives / Anticaking",
      value: category.additives,
      method: isEs ? "Interno Produsal" : "Produsal Internal",
      coa: isEs ? "Por lote (Sí)" : "Per lot (Yes)",
    },
    {
      param: isEs ? "Empaque Sacos 20 kg (Control CPE)" : "20 kg Bags Packaging (CPE Control)",
      value: category.cpe,
      method: isEs ? "Regulación Nacional" : "National Standard",
      coa: isEs ? "Identificado en saco" : "Bag labeled",
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Barra de Navegación / Breadcrumbs */}
      <div className="bg-[#082846] text-white border-b border-white/10 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-heading">
            <Link
              href={`/${currentLang}`}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {isEs ? "Inicio" : "Home"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link
              href={`/${currentLang}/productos`}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {isEs ? "Productos" : "Products"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[#02afab] font-bold truncate">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero de Categoría */}
      <section className="relative bg-[#082846] text-white py-14 sm:py-18 overflow-hidden border-b border-[#02afab]/20">
        <div className="absolute inset-0 bg-[radial-gradient(#02afab_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#02afab]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Lado Izquierdo: Textos y Datos Oficiales */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <ScrollReveal animation="fade-down">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#02afab]/20 text-[#02afab] border border-[#02afab]/40">
                    {category.code}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-heading ${
                      isPremium
                        ? "bg-[#02afab] text-[#082846]"
                        : "bg-[#94c11e] text-[#082846]"
                    }`}
                  >
                    {isPremium
                      ? isEs ? "Grado Premium Certificado" : "Certified Premium Grade"
                      : isEs ? "Tipo A Estándar Industrial" : "Standard Type A"}
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={50}>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] font-heading">
                  {category.name}
                </h1>
                <p className="text-[#02afab] text-sm sm:text-base font-bold font-heading mt-2">
                  {category.tagline}
                </p>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={100}>
                <p className="text-white/85 text-base sm:text-lg leading-relaxed font-normal">
                  {category.desc}
                </p>
              </ScrollReveal>

              {/* Acciones del Hero: Ficha Técnica (Modal + Descarga) y Cotización */}
              <ScrollReveal animation="fade-up" delay={150}>
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    type="button"
                    onClick={openPdfModal}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-[#082846] bg-[#02afab] hover:bg-white transition-all font-heading shadow-md cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#082846]" />
                    <span>{isEs ? "Previsualizar Ficha Técnica" : "Preview Technical Sheet"}</span>
                  </button>

                  <a
                    href={currentPdfUrl}
                    download
                    className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-heading"
                  >
                    <Download className="w-4 h-4" />
                    <span>{dict.ctaDownload}</span>
                  </a>

                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-white hover:text-white bg-transparent hover:bg-white/10 border border-slate-400/40 transition-all font-heading ml-auto sm:ml-0 cursor-pointer"
                  >
                    <span>{dict.ctaQuote}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Lado Derecho: Tarjeta Visual con Foto y Métricas Clave */}
            <div className="lg:col-span-5">
              <ScrollReveal animation="fade-left" delay={100}>
                <div className="relative rounded-3xl bg-white/5 border border-white/15 p-3.5 shadow-2xl backdrop-blur-sm">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#082846]/40">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover object-center"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082846]/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* 3 Métricas flotantes al pie de la foto */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-heading block">
                        {dict.purityLabel}
                      </span>
                      <span className="text-sm font-extrabold text-[#02afab] font-heading">
                        {category.purity}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-heading block">
                        {dict.humidityLabel}
                      </span>
                      <span className="text-sm font-extrabold text-white font-heading">
                        {category.humidity}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-heading block">
                        {isEs ? "Densidad" : "Density"}
                      </span>
                      <span className="text-xs font-extrabold text-white font-heading truncate block">
                        {category.density}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col gap-16 sm:gap-20">
        {/* Sección: Tabla de Especificaciones Físico-Químicas */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-[#008784] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
                {isEs ? "Especificación Técnica Oficial" : "Official Technical Specification"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082846] font-heading tracking-tight">
                {isEs ? "Requisitos Físico-Químicos de Laboratorio" : "Physicochemical Laboratory Requirements"}
              </h2>
              <p className="text-slate-600 text-sm max-w-3xl">
                {isEs
                  ? "Parámetros certificados basados en la metodología normalizada ASTM E534-98 con entrega de Certificado de Análisis (CoA) lote a lote."
                  : "Certified parameters based on ASTM E534-98 standard test methodology with Certificate of Analysis (CoA) issued per batch."}
              </p>
            </div>

            {/* Tabla Estilizada */}
            <div className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#082846] text-white font-heading text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-4 sm:px-6 font-bold">
                        {isEs ? "Parámetro" : "Parameter"}
                      </th>
                      <th className="py-3.5 px-4 sm:px-6 font-bold">
                        {isEs ? "Rango / Especificación" : "Range / Specification"}
                      </th>
                      <th className="py-3.5 px-4 sm:px-6 font-bold">
                        {isEs ? "Metodología Normativa" : "Standard Method"}
                      </th>
                      <th className="py-3.5 px-4 sm:px-6 font-bold">
                        {isEs ? "Frecuencia CoA" : "CoA Frequency"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {techTableRows.map((row, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}
                      >
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-[#082846] font-heading">
                          {row.param}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-extrabold text-[#008784] font-heading">
                          {row.value}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-slate-600">
                          {row.method}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-slate-600 font-medium">
                          {row.coa}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pie de tabla con nota de producto no perecedero */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between gap-4">
                <span>
                  {isEs
                    ? "Producto No Perecedero: No se deteriora ni genera crecimiento de patógenos bajo almacenamiento seco y cubierto."
                    : "Non-Perishable Product: Does not deteriorate or generate pathogen growth under dry, covered storage."}
                </span>
                <span className="font-mono text-[11px] text-slate-400 shrink-0">
                  {category.code}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Sección: Presentaciones Disponibles (Regla de Granel en Primer Lugar) */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-[#008784] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
                {isEs ? "Logística y Formatos" : "Logistics & Formats"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082846] font-heading tracking-tight">
                {isEs ? "Presentaciones de Despacho" : "Packaging & Dispatch Formats"}
              </h2>
              <p className="text-slate-600 text-sm max-w-2xl">
                {isEs
                  ? "Capacidad de despacho directo desde el Complejo Salinero Los Olivitos bajo modalidad EXW planta."
                  : "Direct dispatch capacity from Los Olivitos Saltworks complex under EXW plant terms."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.items.map((item, idx) => {
                const isGranelItem =
                  item.format.toLowerCase().includes("granel") ||
                  item.format.toLowerCase().includes("bulk");

                return (
                  <div
                    key={item.slug}
                    className={`relative p-6 sm:p-7 rounded-3xl border flex flex-col justify-between gap-5 transition-all ${
                      isGranelItem
                        ? "bg-white border-[#02afab] shadow-md ring-2 ring-[#02afab]/20"
                        : "bg-white border-slate-200/90 hover:border-slate-300 shadow-xs"
                    }`}
                  >
                    {isGranelItem && (
                      <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#02afab] text-[#082846] font-heading">
                        {isEs ? "Despacho Mayorista Masivo" : "Bulk High-Volume Dispatch"}
                      </span>
                    )}

                    <div className="flex flex-col gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-[#082846]">
                        {isGranelItem ? (
                          <Truck className="w-6 h-6 text-[#008784]" />
                        ) : idx === 1 ? (
                          <Package className="w-6 h-6 text-[#008784]" />
                        ) : (
                          <Layers className="w-6 h-6 text-[#008784]" />
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-heading">
                          {item.format}
                        </span>
                        <h3 className="text-lg font-extrabold text-[#082846] font-heading mt-1">
                          {item.name}
                        </h3>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm font-normal">
                        {item.use}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold font-heading text-[#008784]">
                      <span>{isEs ? "Disponible bajo pedido" : "Available on order"}</span>
                      <CheckCircle2 className="w-4 h-4 text-[#94c11e]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Sección: Ficha Técnica Oficial con Visor y Descarga */}
        <ScrollReveal animation="fade-up">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#082846] text-white border border-[#02afab]/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#02afab]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex flex-col gap-3 max-w-2xl">
                <span className="text-[#02afab] text-xs font-bold uppercase tracking-wider font-heading flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#02afab]" />
                  {isEs ? "Documento Oficial de Calidad" : "Official Quality Document"}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  {isEs
                    ? `Ficha Técnica Comercial — ${category.name}`
                    : `Commercial Technical Sheet — ${category.name}`}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {isEs
                    ? "Accede a la especificación completa emitida por nuestro Departamento de Aseguramiento de Calidad. Puedes previsualizar el documento de forma interactiva o descargarlo en formato PDF en español o inglés."
                    : "Access the complete specification issued by our Quality Assurance Department. You can preview the document interactively or download the PDF in Spanish or English."}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mt-1">
                  <span>{category.code}</span>
                  <span>•</span>
                  <span>ASTM E534-98</span>
                  <span>•</span>
                  <span>COA Lote a Lote</span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={openPdfModal}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-[#082846] bg-[#02afab] hover:bg-white transition-all font-heading shadow-md cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>{isEs ? "Abrir Vista Previa" : "Open Live Preview"}</span>
                </button>

                <a
                  href={category.pdfEs}
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-heading"
                  title="Descargar en Español"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF (ES)</span>
                </a>

                <a
                  href={category.pdfEn}
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-heading"
                  title="Download in English"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF (EN)</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Sección: Aplicaciones Clave */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-[#008784] text-xs sm:text-sm font-bold uppercase tracking-wider font-heading">
                {dict.applicationsLabel}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082846] font-heading tracking-tight">
                {isEs ? "Sectores e Industrias que Abastecemos" : "Key Industries & Applications"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.applications.map((app, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#008784]/10 text-[#008784] flex items-center justify-center font-bold text-xs font-mono">
                    0{idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#082846] font-heading leading-snug">
                    {app}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Sección de Cotización y Contacto Directo con selector interactivo de divs */}
        <CategoryContactSection currentLang={currentLang} category={category} />

        {/* Sección: Otras Categorías del Catálogo */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col gap-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-extrabold text-[#082846] font-heading">
                {isEs ? "Explorar las Otras Categorías" : "Explore Other Categories"}
              </h3>
              <Link
                href={`/${currentLang}/productos`}
                className="text-xs font-bold text-[#008784] hover:text-[#082846] flex items-center gap-1 font-heading"
              >
                <span>{isEs ? "Ver catálogo completo" : "View full catalog"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherCategories.map((other) => (
                <Link
                  key={other.id}
                  href={`/${currentLang}/productos/${other.slug}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#02afab] shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {other.code}
                    </span>
                    <h4 className="text-base font-extrabold text-[#082846] group-hover:text-[#008784] transition-colors font-heading">
                      {other.name}
                    </h4>
                    <span className="text-xs text-slate-500 font-normal line-clamp-1">
                      {other.tagline}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-[#008784] font-heading">
                    <span>{other.purity}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Modal Interactivo de Ficha Técnica */}
      <PdfPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
        currentLang={currentLang}
      />
    </div>
  );
}
