"use client";

import { useState, useActionState } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Truck,
  Package,
  Layers,
  Sparkles,
  ShieldCheck,
  Building2,
  Clock,
  Phone,
  Check,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { sendContactEmail, type ContactState } from "@/app/actions/send";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface CategoryContactSectionProps {
  currentLang: Locale;
  category: Dictionary["products"]["categories"][number];
}

const initialState: ContactState = {
  success: false,
  message: "",
};

export function CategoryContactSection({
  currentLang,
  category,
}: CategoryContactSectionProps) {
  const isEs = currentLang === "es";

  // Opciones de producto construidas a partir de las presentaciones de la categoría
  const productOptions = [
    ...category.items.map((item) => ({
      id: item.slug,
      name: item.name,
      format: item.format,
      use: item.use,
      isGranel:
        item.format.toLowerCase().includes("granel") ||
        item.format.toLowerCase().includes("bulk"),
      isBigBag:
        item.format.toLowerCase().includes("big bag") ||
        item.format.toLowerCase().includes("1.000") ||
        item.format.toLowerCase().includes("1,000"),
    })),
    {
      id: "todas-las-presentaciones",
      name: isEs
        ? `Toda la línea de ${category.name}`
        : `Full ${category.name} line`,
      format: isEs ? "Múltiples formatos" : "Multiple formats",
      use: isEs ? "Requerimiento integral o mixto" : "Combined or bulk inquiry",
      isGranel: false,
      isBigBag: false,
    },
  ];

  // Estado del producto seleccionado (por defecto, la presentación principal a granel)
  const [selectedProduct, setSelectedProduct] = useState<string>(
    productOptions[0]?.name || category.name
  );

  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState
  );

  return (
    <section id="contacto" className="w-full bg-white py-16 sm:py-20 border-t border-slate-200/90 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Columna Izquierda: Información de Despacho y Ficha del Producto (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#008784] font-heading flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#02afab]" />
                  {isEs ? "Atención y Suministro Mayorista" : "Wholesale Commercial Supply"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#082846] font-heading tracking-tight">
                  {isEs ? `Cotizar ${category.name}` : `Quote ${category.name}`}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {isEs
                    ? "Completa el formulario seleccionando la presentación de tu interés. Nuestro equipo comercial responderá con cotización formal, disponibilidad de patio y condiciones de despacho."
                    : "Fill out the form selecting your required packaging presentation. Our sales department will respond with a formal quotation, yard availability, and delivery terms."}
                </p>
              </div>

              {/* Tarjeta Resumen del Producto */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {category.code}
                  </span>
                  <span className="text-xs font-bold text-[#008784] font-heading">
                    {category.purity}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-[#02afab] shrink-0" />
                    <span>
                      {isEs ? "Respuesta en menos de 24 horas" : "Response in under 24 business hours"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Building2 className="w-4 h-4 text-[#02afab] shrink-0" />
                    <span>
                      {isEs ? "Despacho directo EXW Los Olivitos" : "Direct dispatch EXW Los Olivitos Saltworks"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="w-4 h-4 text-[#02afab] shrink-0" />
                    <span>
                      {isEs ? "Atención: 0212 208 51 11" : "Sales line: 0212 208 51 11"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Formulario con Selector Div-based (8 cols) */}
            <div className="lg:col-span-8 bg-slate-50/80 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-lg shadow-slate-200/40">
              
              {/* Feedback de Envío */}
              {state.message && (
                <div
                  className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm ${
                    state.success
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {state.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <p className="font-medium">{state.message}</p>
                </div>
              )}

              <form action={formAction} className="flex flex-col gap-6">
                {/* 1. Selector de Producto Personalizado con DIVS (NO SELECT / NO OPTION) */}
                <div className="flex flex-col gap-2.5">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-heading">
                    {isEs ? "Selecciona la Presentación o Formato de Interés *" : "Select Packaging Presentation of Interest *"}
                  </label>

                  {/* Input hidden que envía el valor seleccionado a FormData */}
                  <input type="hidden" name="product" value={selectedProduct} />

                  {/* Selector visual interactivo hecho 100% con DIVs personalizados */}
                  <div
                    role="radiogroup"
                    aria-label={isEs ? "Opciones de producto" : "Product options"}
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
                              ? "bg-white border-[#02afab] shadow-md ring-2 ring-[#02afab]/30"
                              : "bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Icono temático */}
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-[#02afab] text-white"
                                  : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                              }`}
                            >
                              {opt.isGranel ? (
                                <Truck className="w-4.5 h-4.5" />
                              ) : opt.isBigBag ? (
                                <Package className="w-4.5 h-4.5" />
                              ) : opt.id === "todas-las-presentaciones" ? (
                                <Sparkles className="w-4.5 h-4.5" />
                              ) : (
                                <Layers className="w-4.5 h-4.5" />
                              )}
                            </div>

                            <div className="flex flex-col min-w-0">
                              <span
                                className={`text-xs sm:text-sm font-extrabold font-heading truncate transition-colors ${
                                  isSelected ? "text-[#082846]" : "text-slate-700"
                                }`}
                              >
                                {opt.name}
                              </span>
                              <span className="text-[11px] text-slate-500 truncate">
                                {opt.format}
                              </span>
                            </div>
                          </div>

                          {/* Checkmark circular estilizado */}
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 border transition-all ${
                              isSelected
                                ? "bg-[#02afab] border-[#02afab] text-white"
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

                {/* 2. Campos de Datos de Contacto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cat-contact-name"
                      className="block text-xs font-bold text-slate-700 mb-1.5 font-heading"
                    >
                      {isEs ? "Nombre Completo *" : "Full Name *"}
                    </label>
                    <input
                      id="cat-contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder={isEs ? "Ej. Carlos Mendoza" : "e.g. John Doe"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02afab] focus:ring-2 focus:ring-[#02afab]/20 transition-all text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cat-contact-email"
                      className="block text-xs font-bold text-slate-700 mb-1.5 font-heading"
                    >
                      {isEs ? "Correo Electrónico *" : "Email Address *"}
                    </label>
                    <input
                      id="cat-contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder={isEs ? "carlos@empresa.com" : "john@company.com"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02afab] focus:ring-2 focus:ring-[#02afab]/20 transition-all text-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cat-contact-company"
                    className="block text-xs font-bold text-slate-700 mb-1.5 font-heading"
                  >
                    {isEs ? "Empresa / Razón Social" : "Company / Organization"}
                  </label>
                  <input
                    id="cat-contact-company"
                    name="company"
                    type="text"
                    placeholder={
                      isEs
                        ? "Ej. Industria de Alimentos C.A. / Empresa Química"
                        : "e.g. Chemical Manufacturing Corp"
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02afab] focus:ring-2 focus:ring-[#02afab]/20 transition-all text-slate-900 bg-white"
                  />
                </div>

                {/* 3. Requerimiento / Mensaje */}
                <div>
                  <label
                    htmlFor="cat-contact-message"
                    className="block text-xs font-bold text-slate-700 mb-1.5 font-heading"
                  >
                    {isEs ? "Detalles del Requerimiento o Volumen (TM) *" : "Requirement Details or Volume (MT) *"}
                  </label>
                  <textarea
                    id="cat-contact-message"
                    name="message"
                    rows={4}
                    required
                    defaultValue={
                      isEs
                        ? `Hola, deseo cotizar ${selectedProduct}. Indicar disponibilidad, volumen en toneladas y condiciones de despacho.`
                        : `Hello, I would like to request a quote for ${selectedProduct}. Please provide availability, tonnage volume, and dispatch terms.`
                    }
                    placeholder={
                      isEs
                        ? "Indícanos volumen estimado en toneladas, destino de despacho y requerimientos particulares..."
                        : "Indicate estimated tonnage, delivery destination, and specific requirements..."
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02afab] focus:ring-2 focus:ring-[#02afab]/20 transition-all text-slate-900 bg-white resize-none"
                  />
                </div>

                {/* Botón de Envío */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-xs text-slate-500">
                    {isEs
                      ? "* Campos obligatorios para el procesamiento comercial."
                      : "* Required fields for quotation processing."}
                  </span>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#082846] hover:bg-[#008784] shadow-md hover:shadow-lg transition-all font-heading cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className={`w-4 h-4 ${isPending ? "animate-pulse" : ""}`} />
                    <span>
                      {isPending
                        ? isEs ? "Enviando cotización..." : "Submitting quote..."
                        : isEs ? "Enviar Solicitud de Cotización" : "Submit Quotation Request"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
