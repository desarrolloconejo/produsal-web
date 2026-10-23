"use client";

import Image from "next/image";
import { MapPin, Clock, ShieldCheck, Factory } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "./ContactForm";
import { PLANT_LOCATION } from "@/data/plant-location";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface ContactBodyProps {
  currentLang: Locale;
  dict: Dictionary["contact"];
}

import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";
import { SectionTexture } from "@/components/ui/SectionTexture";

export function ContactBody({ currentLang, dict }: ContactBodyProps) {
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
                <span className="type-label text-[#02aeaa] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#02aeaa] animate-pulse" />
                  <span>{isEs ? "Ubicación geográfica" : "Geographic location"}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#183c6b] text-white text-[11px] font-mono font-semibold border border-[#85b2cf]/30">
                  <MapPin className="w-3 h-3 text-[#e5c798]" />
                  <span className="whitespace-nowrap">{PLANT_LOCATION.label}</span>
                </span>
              </div>

              {/* Contenedor del Mapa con blend perfecto */}
              <div className="relative w-full aspect-[1144/768] select-none rounded-2xl overflow-hidden bg-white p-2 border border-slate-100 my-auto">
                <Image
                  src="/images/mapa-venezuela-final.png"
                  alt={isEs ? `Mapa completo de Venezuela con Guayana Esequiba - ubicación de PRODUSAL en Los Olivitos (${PLANT_LOCATION.label})` : `Full map of Venezuela including Guayana Esequiba - PRODUSAL location at Los Olivitos (${PLANT_LOCATION.label})`}
                  fill
                  priority
                  className="object-contain mix-blend-multiply"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />

                {/* Pin interactivo pulsante en Los Olivitos */}
                <div
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={PLANT_LOCATION.mapPin}
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
                  <h4 className="type-h5 text-[#183c6b]">
                    {isEs ? "Complejo Industrial Salina Los Olivitos" : "Los Olivitos Saltworks Industrial Complex"}
                  </h4>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEs
                    ? "Ubicado en Miranda, Costa Oriental del Lago de Maracaibo, Zulia."
                    : "Located in Miranda, Eastern Coast of Lake Maracaibo, Zulia."}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Columna Derecha: Formulario de contacto Nodemailer (7 cols) */}
          <ScrollReveal
            animation="fade-left"
            delay={150}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/40 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex flex-col gap-1.5 mb-6 pb-4 border-b border-slate-100">
                <span className="type-label text-[#02aeaa] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  {isEs ? "Atención comercial" : "Commercial support"}
                </span>
                <h3 className="type-h3 text-[#183c6b]">
                  {isEs ? "Descubre cómo podemos ayudarte" : "Find out how we can help you"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {isEs
                    ? "Ingresa los datos de tu requerimiento y nuestro equipo comercial se pondrá en contacto contigo muy pronto."
                    : "Enter your requirement details and our commercial team will get in touch with you very soon."}
                </p>
              </div>

              {/* Mensajes de Feedback de Formulario */}
              <ContactForm
                currentLang={currentLang}
                dict={dict}
                idPrefix="contact-page"
                submitLabel={isEs ? "Enviar solicitud" : "Send request"}
              />
            </div>

            {/* Garantía de respuesta rápida */}
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100 text-xs text-slate-400 mt-4">
              <Clock className="w-3.5 h-3.5 text-[#e5c798]" />
              <span>
                {isEs
                  ? "Atención comercial de lunes a viernes, de 7:00 a. m. a 4:00 p. m."
                  : "Commercial support Monday to Friday, 7:00 AM to 4:00 PM"}
              </span>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
