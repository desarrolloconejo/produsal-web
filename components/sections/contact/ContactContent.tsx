"use client";

import { Phone, Mail, MapPin, Building2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "./ContactForm";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface ContactContentProps {
  currentLang: Locale;
  contactDict: Dictionary["contact"];
}

export function ContactContent({ currentLang, contactDict }: ContactContentProps) {
  const isEs = currentLang === "es";
  const title = contactDict?.title || (isEs ? "¡Cotiza Ahora!" : "Quote Now!");
  const badge = contactDict?.badge || (isEs ? "Atención Comercial e Industrial" : "Commercial & Industrial Inquiries");
  const description = contactDict?.description || (isEs
    ? "Nuestro equipo de ventas técnicas y operaciones está disponible para atender requerimientos de la industria petroquímica, química, tratamiento de aguas y nutrición animal."
    : "Our technical sales and operations team is available to assist requirements for the petrochemical, chemical, water treatment, and animal nutrition industries.");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Columna Izquierda: Información de Contacto Corporativo (5 cols) */}
      <ScrollReveal animation="fade-right" delay={50} className="lg:col-span-5 flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#02aeaa]/10 text-[#02aeaa] text-xs font-bold uppercase tracking-wider w-fit">
          <Building2 className="w-3.5 h-3.5" />
          <span>{badge}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#183c6b] tracking-tight font-heading">
          {title}
        </h2>

        <p className="text-slate-600 text-base leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 border-l-4 border-l-[#02aeaa] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#02aeaa]/10 text-[#02aeaa] flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">
                {isEs ? "Teléfonos Comerciales" : "Sales Office"}
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                <a href="tel:02122085111" className="text-sm font-bold text-slate-800 hover:text-[#02aeaa] transition-colors">
                  0212 208 51 11
                </a>
                <span className="text-slate-300">&bull;</span>
                <a href="tel:08002274455" className="text-sm font-bold text-[#02aeaa] hover:text-[#183c6b] transition-colors">
                  0800 2274455
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 border-l-4 border-l-[#e5c798] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#e5c798]/25 text-[#183c6b] flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#183c6b]" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">
                {isEs ? "Correo Electrónico" : "Email Inquiries"}
              </span>
              <a href="mailto:infoprodusal@grupomimesa.com" className="text-sm font-bold text-slate-800 hover:text-[#02aeaa] transition-colors">
                infoprodusal@grupomimesa.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 border-l-4 border-l-[#85b2cf] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#85b2cf]/25 text-[#183c6b] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#183c6b]" />
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
        <h3 className="text-xl font-bold text-[#183c6b] mb-1">
          {isEs ? "Envíanos un Mensaje" : "Send Us a Message"}
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          {isEs
            ? "Te responderemos en menos de 24 horas hábiles con especificaciones técnicas o cotización."
            : "We will respond within 24 business hours with specifications or quotation."}
        </p>

        <ContactForm currentLang={currentLang} dict={contactDict} idPrefix="home-contact" />
      </ScrollReveal>
    </div>
  );
}
