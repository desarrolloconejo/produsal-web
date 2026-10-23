"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  CheckCircle2,
  Download,
  ChevronRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PdfPreviewModal, type PdfModalData } from "@/components/ui/PdfPreviewModal";
import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";
import { CategoryContactSection } from "./CategoryContactSection";
import { CategoryApplications } from "./CategoryApplications";
import { packagingKind, PACKAGING_STYLES } from "./packaging";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";
import { SectionTexture, type TextureVariant } from "@/components/ui/SectionTexture";

interface CategoryDetailViewProps {
  currentLang: Locale;
  category: (Dictionary["products"]["categories"])[number];
  allCategories: Dictionary["products"]["categories"];
  dict: Dictionary["products"];
  contactDict: Dictionary["contact"];
}

export function CategoryDetailView({
  currentLang,
  category,
  allCategories,
  dict,
  contactDict,
}: CategoryDetailViewProps) {
  // Las texturas se intercalan entre productos: ondas, cubos, ondas, cubos
  const texture: TextureVariant =
    allCategories.findIndex((c) => c.slug === category.slug) % 2 === 0 ? "waves" : "cubes";
  const isEs = currentLang === "es";
  const [modalData, setModalData] = useState<PdfModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPdfModal = () => {
    setModalData({
      title: `${isEs ? "Ficha técnica" : "Data sheet"} — ${category.pdfTitle}`,
      pdfEs: category.pdfEs,
      pdfEn: category.pdfEn,
    });
    setIsModalOpen(true);
  };

  const otherCategories = allCategories.filter((c) => c.id !== category.id);
  const isPremium = category.id.includes("premium");
  const currentPdfUrl = isEs ? category.pdfEs : category.pdfEn;

  return (
    <div className="w-full bg-brand-offwhite min-h-screen">
      {/* 1. Barra de Navegación / Breadcrumbs */}
      <div className="bg-[#183c6b] text-white border-b border-white/10 py-3.5">
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
            <span className="text-[#02aeaa] font-bold truncate">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero del producto */}
      <section className="relative bg-[#183c6b] text-white py-14 sm:py-18 overflow-hidden border-b border-[#02aeaa]/20">
        {/* Triángulos 2D corporativos en el fondo azul del hero */}
        <BrandTrianglesBackground layout="together" position="bottom-right" size="lg" opacityClass="opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(#02aeaa_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[radial-gradient(closest-side,rgba(2,174,170,0.2),transparent)] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-[radial-gradient(closest-side,rgba(133,178,207,0.15),transparent)] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Lado Izquierdo: Textos y Datos Oficiales */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <ScrollReveal animation="fade-down">
                <span
                  className={`type-label px-3 py-1 rounded-full w-fit inline-block ${
                    isPremium ? "bg-[#02aeaa] text-[#183c6b]" : "bg-[#85b2cf] text-[#183c6b]"
                  }`}
                >
                  {isPremium
                    ? isEs ? "Grado premium" : "Premium grade"
                    : isEs ? "Tipo A estándar" : "Standard type A"}
                </span>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={50}>
                <h1 className="type-h1 text-white">
                  {category.name}
                </h1>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={100}>
                <p className="type-lead text-white/85">
                  {category.desc}
                </p>
              </ScrollReveal>

              {/* Acciones del Hero: Ficha Técnica (Modal + Descarga) y Contacto */}
              <ScrollReveal animation="fade-up" delay={150}>
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    type="button"
                    onClick={openPdfModal}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-[#183c6b] bg-[#02aeaa] hover:bg-white transition-all font-heading shadow-md cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#183c6b]" />
                    <span>{isEs ? "Ver ficha técnica" : "View data sheet"}</span>
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
                <div className="relative rounded-3xl bg-white/5 border border-white/15 p-3.5 shadow-2xl group">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900/40 shadow-inner">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#183c6b]/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Métricas clave al pie de la foto: pureza y humedad */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between gap-3 sm:block sm:text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-heading block">
                        {dict.purityLabel}
                      </span>
                      <span className="text-sm font-extrabold text-[#02aeaa] font-heading">
                        {category.purity}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between gap-3 sm:block sm:text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-heading block">
                        {dict.humidityLabel}
                      </span>
                      <span className="text-sm font-extrabold text-[#85b2cf] font-heading">
                        {category.humidity}
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
      <div className="relative overflow-hidden">
        <SectionTexture variant={texture} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col gap-16 sm:gap-20 relative z-10">
        {/* Sección: Presentaciones disponibles (mismos íconos que el catálogo) */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="type-eyebrow text-[#02aeaa]">
                {isEs ? "Logística y formatos" : "Logistics and formats"}
              </span>
              <h2 className="type-h2 text-[#183c6b]">
                {isEs ? "Presentaciones de despacho" : "Dispatch formats"}
              </h2>
              {/* EXW explicado: muchos clientes no conocen el término */}
              <p className="type-body text-slate-600 max-w-3xl">
                {isEs
                  ? "Despacho directo en el Complejo Salinero Los Olivitos bajo modalidad EXW: retiro en planta con transporte del cliente (incluye servicio de carga). ¿Necesitas el producto en tu destino? Contáctanos y cuéntanos lo que requieres, y te conectaremos con el distribuidor autorizado más cercano a tu zona."
                  : "Direct dispatch at the Los Olivitos Saltworks Complex under EXW terms: pickup at our plant with the customer's own transport (loading service included). Need the product delivered to your location? Contact us and tell us what you need, and we will connect you with the authorized distributor closest to your area."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.items.map((item) => {
                const style = PACKAGING_STYLES[packagingKind(item)];

                return (
                  <div
                    key={item.slug}
                    className="relative p-6 sm:p-7 rounded-3xl border bg-white border-slate-200/90 hover:border-[#02aeaa]/60 shadow-xs flex flex-col justify-between gap-5 transition-all"
                  >
                    <div className="flex flex-col gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${style.className}`}>
                        <style.Icon className={`w-6 h-6 ${style.iconColor}`} />
                      </div>

                      <div className="flex flex-col">
                        <span className="type-caption text-slate-400">
                          {item.format}
                        </span>
                        <h3 className="type-h4 text-[#183c6b] mt-1">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold font-heading text-[#02aeaa]">
                      <span>{isEs ? "Disponible bajo pedido" : "Available on order"}</span>
                      <CheckCircle2 className="w-4 h-4 text-[#e5c798]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Sección: Aplicaciones (bloque azul con ícono por sector) */}
        <CategoryApplications
          isEs={isEs}
          eyebrow={dict.applicationsLabel}
          productName={category.name}
          applications={category.applications}
        />

        {/* Sección de contacto con selector de presentación */}
        <CategoryContactSection currentLang={currentLang} category={category} contactDict={contactDict} />

        {/* Sección: Otros productos del catálogo */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col gap-6 pt-6 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h3 className="type-h4 text-[#183c6b]">
                {isEs ? "Otros productos" : "Other products"}
              </h3>
              <Link
                href={`/${currentLang}/productos`}
                className="text-xs font-bold text-[#02aeaa] hover:text-[#183c6b] flex items-center gap-1 font-heading whitespace-nowrap"
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
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#02aeaa] shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <h4 className="type-h5 text-[#183c6b] group-hover:text-[#02aeaa] transition-colors">
                      {other.name}
                    </h4>
                    <span className="text-xs text-slate-500 font-normal line-clamp-1">
                      {other.tagline}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-[#02aeaa] font-heading">
                    <span>{other.purity}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
        </div>
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
