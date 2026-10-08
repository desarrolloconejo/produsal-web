"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Lock,
  FileText,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Cookie,
  UserCheck,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface PrivacyContentProps {
  currentLang: Locale;
  dict: Dictionary["privacy"];
}

const sectionIcons: Record<string, React.ElementType> = {
  recoleccion: FileText,
  collection: FileText,
  finalidad: CheckCircle2,
  purpose: CheckCircle2,
  confidencialidad: Lock,
  confidentiality: Lock,
  seguridad: ShieldCheck,
  security: ShieldCheck,
  derechos: UserCheck,
  rights: UserCheck,
  cookies: Cookie,
};

export function PrivacyContent({ currentLang, dict }: PrivacyContentProps) {
  const isEs = currentLang === "es";

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Breadcrumbs */}
      <div className="bg-[#183c6b] text-white border-b border-white/10 py-3.5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-heading">
            <Link
              href={`/${currentLang}`}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {isEs ? "Inicio" : "Home"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[#02aeaa] font-bold">{dict.title}</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Editorial Legal */}
      <section className="relative bg-[#183c6b] text-white py-14 sm:py-20 overflow-hidden border-b border-[#02aeaa]/20">
        <div className="absolute inset-0 bg-[radial-gradient(#02aeaa_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#02aeaa]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#02aeaa]/20 border border-[#02aeaa]/40 text-[#02aeaa] text-xs font-mono font-bold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{dict.badge}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={50}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
              {dict.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="mt-4 text-slate-300 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed">
              {dict.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <div className="mt-6 flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span>{dict.lastUpdated}</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Contenido Principal */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col gap-10">
          {/* Tarjeta 1: Identificación del Responsable */}
          <ScrollReveal animation="fade-up">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#02aeaa]/10 text-[#02aeaa] flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#183c6b] font-heading">
                    {dict.responsible.title}
                  </h2>
                  <p className="text-xs text-slate-500 font-mono">
                    {dict.responsible.company} • {dict.responsible.rif}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-4 h-4 text-[#02aeaa] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{dict.responsible.address}</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <Mail className="w-4 h-4 text-[#02aeaa] shrink-0" />
                    <a
                      href={`mailto:${dict.responsible.email}`}
                      className="text-[#183c6b] font-semibold hover:text-[#02aeaa] transition-colors"
                    >
                      {dict.responsible.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <Phone className="w-4 h-4 text-[#02aeaa] shrink-0" />
                    <span className="font-semibold text-slate-800">{dict.responsible.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Cláusulas Legales Detalladas */}
          <div className="flex flex-col gap-6">
            {dict.sections.map((section, idx) => {
              const Icon = sectionIcons[section.id] || FileText;

              return (
                <ScrollReveal key={section.id} delay={idx * 50} animation="fade-up">
                  <article className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-[#02aeaa]/50 transition-colors flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#183c6b] flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5 text-[#02aeaa]" />
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#183c6b] font-heading">
                        {section.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-0 sm:pl-12">
                      {section.content}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Botón de retorno al inicio */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <Link
              href={`/${currentLang}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#183c6b] hover:bg-[#02aeaa] transition-all font-heading shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{dict.backHome}</span>
            </Link>

            <Link
              href={`/${currentLang}/contacto`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#183c6b] bg-slate-200 hover:bg-slate-300 transition-all font-heading"
            >
              <span>{isEs ? "Contactar a Ventas" : "Contact Sales"}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
