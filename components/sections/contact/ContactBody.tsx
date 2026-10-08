"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle, MapPin, Clock, ShieldCheck, Factory } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { sendContactEmail, type ContactState } from "@/app/actions/send";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface ContactBodyProps {
  currentLang: Locale;
  dict?: Dictionary["contact"];
}

const initialState: ContactState = {
  success: false,
  message: "",
};

import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";
import { SectionTexture } from "@/components/ui/SectionTexture";

export function ContactBody({ currentLang, dict }: ContactBodyProps) {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);

  const isEs = currentLang === "es";

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-brand-offwhite border-t border-slate-200/80 overflow-hidden">
      <SectionTexture variant="cubes" />
      {/* Triángulos 2D corporativos en el fondo */}
      <BrandTrianglesBackground layout="separated" size="lg" opacityClass="opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Columna Izquierda: Mapa Oficial de Venezuela con Pin Pulsante y Ficha del Complejo (5 cols) */}
          <ScrollReveal animation="fade-right" delay={50} className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-200/40 flex flex-col justify-between h-full gap-5">
              
              {/* Cabecera del Mapa */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-[#02aeaa] font-heading flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#02aeaa] animate-pulse" />
                  <span>{isEs ? "Ubicación Geográfica" : "Geographic Location"}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#183c6b] text-white text-[11px] font-mono font-semibold border border-[#85b2cf]/30">
                  <MapPin className="w-3 h-3 text-[#e5c798]" />
                  <span className="whitespace-nowrap">10°51&apos;N &bull; 71°20&apos;W</span>
                </span>
              </div>

              {/* Contenedor del Mapa con blend perfecto */}
              <div className="relative w-full aspect-[1144/768] select-none rounded-2xl overflow-hidden bg-white p-2 border border-slate-100 my-auto">
                <Image
                  src="/images/mapa-venezuela-final.png"
                  alt={isEs ? "Mapa Completo de Venezuela con Guayana Esequiba - Ubicación PRODUSAL Los Olivitos (10°51'N, 71°20'W)" : "Full map of Venezuela including Guayana Esequiba - PRODUSAL location at Los Olivitos (10°51'N, 71°20'W)"}
                  fill
                  priority
                  className="object-contain mix-blend-multiply"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />

                {/* Pin interactivo pulsante en Los Olivitos */}
                <div
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: "17.0%", top: "17.6%" }}
                  aria-label={isEs ? "Ubicación de PRODUSAL en Los Olivitos, Zulia" : "PRODUSAL location at Los Olivitos, Zulia"}
                >
                  {/* Ondas de Radar Pulsantes */}
                  <span className="absolute -inset-3 rounded-full bg-[#02aeaa] opacity-75 animate-ping pointer-events-none" />
                  <span className="absolute -inset-6 rounded-full bg-[#02aeaa]/25 animate-pulse pointer-events-none" />

                  {/* Núcleo del Marcador */}
                  <div className="relative w-7 h-7 rounded-full bg-[#183c6b] border-2 border-white shadow-md flex items-center justify-center text-[#02aeaa]">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>

                  {/* Badge de Coordenadas */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap bg-[#183c6b] text-white px-2 py-0.5 rounded-md text-[10px] font-mono font-medium shadow-md flex items-center gap-1 border border-[#02aeaa]/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#02aeaa] animate-pulse" />
                    <span>Los Olivitos</span>
                  </div>
                </div>
              </div>

              {/* Ficha Descriptiva del Complejo */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Factory className="w-4.5 h-4.5 text-[#85b2cf]" />
                  <h4 className="text-base font-bold text-[#183c6b] font-heading">
                    {isEs ? "Complejo Industrial Salinas Los Olivitos" : "Los Olivitos Industrial Salt Complex"}
                  </h4>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEs
                    ? "Ubicado en el Municipio Miranda, Costa Oriental del Lago de Maracaibo, Estado Zulia. Cuenta con 5.400 Ha de superficie y capacidad instalada de 650.000 TM/año."
                    : "Located in Miranda Municipality, Eastern Coast of Lake Maracaibo, Zulia State. Features 5,400 Ha total surface and 650,000 MT/yr operational capacity."}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-heading">
                      {isEs ? "Capacidad Operativa" : "Operational Capacity"}
                    </span>
                    <span className="text-sm font-extrabold text-[#02aeaa] font-heading">
                      {isEs ? "650.000 TM / año" : "650,000 MT / year"}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-heading">
                      {isEs ? "Participación Nacional" : "National Market Share"}
                    </span>
                    <span className="text-sm font-extrabold text-[#183c6b] font-heading">
                      {isEs ? "65% del mercado" : "65% of the market"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Columna Derecha: Formulario de Cotización Nodemailer (7 cols) */}
          <ScrollReveal
            animation="fade-left"
            delay={150}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/40 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex flex-col gap-1.5 mb-6 pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#02aeaa] font-heading flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  {isEs ? "Atención Comercial Directa" : "Direct Commercial Inquiry"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#183c6b] font-heading tracking-tight">
                  {isEs ? "Solicitar Cotización o Ficha Técnica" : "Request Quote or Technical Sheet"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {isEs
                    ? "Ingresa los datos de tu requerimiento y nuestro equipo comercial te responderá en menos de 24 horas hábiles."
                    : "Enter your requirements and our commercial team will respond within 24 business hours."}
                </p>
              </div>

              {/* Mensajes de Feedback de Formulario */}
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

              <form action={formAction} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1.5 font-heading">
                      {isEs ? "Nombre Completo *" : "Full Name *"}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={isEs ? "Ej. Carlos Mendoza" : "e.g. John Doe"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02aeaa] focus:ring-2 focus:ring-[#02aeaa]/20 transition-all text-slate-900 bg-slate-50/50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5 font-heading">
                      {isEs ? "Correo Electrónico *" : "Email Address *"}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={isEs ? "carlos@empresa.com" : "john@company.com"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02aeaa] focus:ring-2 focus:ring-[#02aeaa]/20 transition-all text-slate-900 bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs font-bold text-slate-700 mb-1.5 font-heading">
                    {isEs ? "Empresa / Organización" : "Company / Organization"}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder={isEs ? "Ej. Industria de Alimentos C.A. / Pequiven" : "e.g. Food Processing Corp"}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02aeaa] focus:ring-2 focus:ring-[#02aeaa]/20 transition-all text-slate-900 bg-slate-50/50 focus:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1.5 font-heading">
                    {isEs ? "Mensaje o Requerimiento de Sal *" : "Message or Salt Requirement *"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder={
                      isEs
                        ? "Indícanos tipo de sal requerida (grano grueso, fino, sal industrial), volumen estimado en TM y destino de despacho..."
                        : "Specify required salt grade (coarse, fine, industrial), estimated tonnage volume, and delivery destination..."
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02aeaa] focus:ring-2 focus:ring-[#02aeaa]/20 transition-all text-slate-900 bg-slate-50/50 focus:bg-white resize-none"
                  />
                </div>

                {/* Checkbox de Políticas de Privacidad Obligatorio */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="privacy-contact"
                    name="privacy"
                    required
                    className="mt-1 w-4 h-4 rounded text-[#02aeaa] border-slate-300 focus:ring-[#02aeaa] focus:ring-offset-0 cursor-pointer accent-[#02aeaa] shrink-0"
                  />
                  <label htmlFor="privacy-contact" className="text-xs text-slate-600 leading-snug cursor-pointer select-none">
                    {dict?.privacyAcceptLabel || (isEs ? "He leído y acepto las" : "I have read and agree to the")}{" "}
                    <Link
                      href={`/${currentLang}/privacidad`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#02aeaa] hover:text-[#183c6b] underline underline-offset-2 transition-colors"
                    >
                      {dict?.privacyLinkLabel || (isEs ? "Políticas de Privacidad" : "Privacy Policy")}
                    </Link>{" "}
                    {dict?.privacyAcceptSuffix ||
                      (isEs
                        ? "y el tratamiento de mis datos de contacto para fines comerciales."
                        : "and the processing of my contact information for commercial purposes.")}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#02aeaa] hover:bg-[#183c6b] text-white font-bold text-sm shadow-md shadow-[#02aeaa]/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer font-heading"
                >
                  {isPending ? (
                    <span>{isEs ? "Enviando mensaje..." : "Sending message..."}</span>
                  ) : (
                    <>
                      <span>{isEs ? "Enviar Solicitud de Cotización" : "Send Inquiry Request"}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Garantía de respuesta rápida */}
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100 text-xs text-slate-400 mt-4">
              <Clock className="w-3.5 h-3.5 text-[#e5c798]" />
              <span>
                {isEs
                  ? "Atención técnica y comercial de Lunes a Viernes 8:00 AM - 5:00 PM"
                  : "Technical & commercial support Monday to Friday 8:00 AM - 5:00 PM"}
              </span>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
