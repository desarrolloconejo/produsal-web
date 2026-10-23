"use client";

import { Mail, MapPin, Building2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "./ContactForm";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface ContactContentProps {
  currentLang: Locale;
  contactDict: Dictionary["contact"];
}

export function ContactContent({ currentLang, contactDict }: ContactContentProps) {
  const isEs = currentLang === "es";
  const { badge, title, description, email } = contactDict;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Columna Izquierda: Información de Contacto Corporativo (5 cols) */}
      <ScrollReveal animation="fade-right" delay={50} className="lg:col-span-5 flex flex-col gap-6">
        <div className="type-eyebrow inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#02aeaa]/10 text-[#02aeaa] w-fit">
          <Building2 className="w-3.5 h-3.5" />
          <span>{badge}</span>
        </div>

        <h2 className="type-h2 text-[#183c6b]">
          {title}
        </h2>

        <p className="type-body text-slate-600">
          {description}
        </p>

        {/* Sin teléfonos: el canal de contacto es el correo */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 border-l-4 border-l-[#e5c798] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#e5c798]/25 text-[#183c6b] flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#183c6b]" />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-slate-500 font-medium block">
                {isEs ? "Escríbenos a" : "Write to us at"}
              </span>
              <a href={`mailto:${email}`} className="text-sm font-bold text-slate-800 hover:text-[#02aeaa] transition-colors break-all">
                {email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 border-l-4 border-l-[#85b2cf] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#85b2cf]/25 text-[#183c6b] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#183c6b]" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">
                {isEs ? "Ubicación de la planta" : "Plant location"}
              </span>
              <span className="text-sm font-bold text-slate-800">
                {isEs
                  ? "Complejo Industrial Los Olivitos, Miranda, Zulia, Venezuela"
                  : "Los Olivitos Industrial Complex, Miranda, Zulia, Venezuela"}
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Columna Derecha: Formulario Nodemailer (7 cols) */}
      <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
        <h3 className="type-h4 text-[#183c6b] mb-1">
          {isEs ? "Envíanos un mensaje" : "Send us a message"}
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          {isEs
            ? "Ingresa los datos de tu requerimiento y nuestro equipo comercial se pondrá en contacto contigo muy pronto."
            : "Enter your requirement details and our commercial team will get in touch with you very soon."}
        </p>

        <ContactForm currentLang={currentLang} dict={contactDict} idPrefix="home-contact" />
      </ScrollReveal>
    </div>
  );
}
