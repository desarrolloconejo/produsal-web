"use client";

import { useActionState, useTransition } from "react";
import { Send, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Building2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { sendContactEmail, type ContactState } from "@/app/actions/send";
import type { Locale } from "@/dictionaries/get-dictionary";

interface ContactContentProps {
  currentLang: Locale;
  contactDict: {
    title?: string;
    subtitle?: string;
    nameLabel?: string;
    emailLabel?: string;
    companyLabel?: string;
    messageLabel?: string;
    sendButton?: string;
    sendingButton?: string;
  };
}

const initialState: ContactState = {
  success: false,
  message: "",
};

export function ContactContent({ currentLang }: ContactContentProps) {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);

  const isEs = currentLang === "es";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Columna Izquierda: Información de Contacto Corporativo (5 cols) */}
      <ScrollReveal animation="fade-right" delay={50} className="lg:col-span-5 flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#02afab]/10 text-[#02afab] text-xs font-bold uppercase tracking-wider w-fit">
          <Building2 className="w-3.5 h-3.5" />
          <span>{isEs ? "Atención Comercial e Industrial" : "Commercial & Industrial Inquiries"}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082846] tracking-tight">
          {isEs ? "¿Listo para cotizar sal marina al mayor?" : "Ready to Order Wholesale Sea Salt?"}
        </h2>

        <p className="text-slate-600 text-base leading-relaxed">
          {isEs
            ? "Nuestro equipo de ventas técnicas y operaciones está disponible para atender requerimientos de la industria alimentaria, química, tratamiento de aguas y exportación."
            : "Our technical sales and operations team is available to assist requirements for the food, chemical, water treatment, and export industries."}
        </p>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#02afab]/10 text-[#02afab] flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">
                {isEs ? "Teléfono Comercial" : "Sales Office"}
              </span>
              <a href="tel:+582125557251" className="text-sm font-bold text-slate-800 hover:text-[#02afab] transition-colors">
                +58 (212) 555-SAL1
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#94c11e]/15 text-[#6c8f12] flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">
                {isEs ? "Correo Electrónico" : "Email Inquiries"}
              </span>
              <a href="mailto:ventas@produsal.com" className="text-sm font-bold text-slate-800 hover:text-[#02afab] transition-colors">
                ventas@produsal.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#082846]/10 text-[#082846] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">
                {isEs ? "Ubicación Planta" : "Harvest & Plant Location"}
              </span>
              <span className="text-sm font-bold text-slate-800">
                {isEs ? "Complejo Industrial Los Olivitos, Zulia, Venezuela" : "Los Olivitos Industrial Complex, Zulia, Venezuela"}
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Columna Derecha: Formulario Nodemailer (7 cols) */}
      <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
        <h3 className="text-xl font-bold text-[#082846] mb-1">
          {isEs ? "Envíanos un Mensaje" : "Send Us a Message"}
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          {isEs
            ? "Te responderemos en menos de 24 horas hábiles con especificaciones técnicas o cotización."
            : "We will respond within 24 business hours with specifications or quotation."}
        </p>

        {state.message && (
          <div
            className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm ${
              state.success
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {state.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            )}
            <p className="font-medium">{state.message}</p>
          </div>
        )}

        <form action={formAction} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isEs ? "Nombre Completo *" : "Full Name *"}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder={isEs ? "Ej. Carlos Mendoza" : "e.g. John Doe"}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02afab] focus:ring-2 focus:ring-[#02afab]/20 transition-all text-slate-900"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isEs ? "Correo Electrónico *" : "Email Address *"}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={isEs ? "carlos@empresa.com" : "john@company.com"}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02afab] focus:ring-2 focus:ring-[#02afab]/20 transition-all text-slate-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-xs font-semibold text-slate-700 mb-1.5">
              {isEs ? "Empresa / Organización" : "Company / Organization"}
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder={isEs ? "Distribuidora / Industria Alimentos" : "Industry / Distribution Corp"}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02afab] focus:ring-2 focus:ring-[#02afab]/20 transition-all text-slate-900"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1.5">
              {isEs ? "Mensaje o Requerimiento *" : "Message or Requirement *"}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder={
                isEs
                  ? "Indícanos tipo de sal requerida (grano grueso, fino, sal industrial), volumen estimado y lugar de entrega..."
                  : "Specify required salt grade (coarse, fine, industrial), estimated volume, and destination..."
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02afab] focus:ring-2 focus:ring-[#02afab]/20 transition-all text-slate-900 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#02afab] to-[#008784] hover:from-[#009b97] hover:to-[#007471] text-white font-bold text-sm shadow-md shadow-[#02afab]/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? (
              <span>{isEs ? "Enviando mensaje..." : "Sending message..."}</span>
            ) : (
              <>
                <span>{isEs ? "Enviar Solicitud" : "Send Inquiry"}</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </ScrollReveal>
    </div>
  );
}
