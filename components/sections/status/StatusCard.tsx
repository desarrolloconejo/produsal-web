import Link from "next/link";
import { ArrowLeft, Hammer, Compass } from "lucide-react";
import type { Locale } from "@/dictionaries/get-dictionary";

interface StatusCardProps {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  currentLang: Locale;
  type?: "construction" | "404";
}

export function StatusCard({
  badge,
  title,
  description,
  buttonText,
  currentLang,
  type = "construction",
}: StatusCardProps) {
  return (
    <div className="relative w-full min-h-[75vh] flex items-center justify-center py-20 px-4 bg-slate-50 overflow-hidden">
      {/* Trama topográfica continua compartida */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(2,174,170,0.06)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-[#02aeaa]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 rounded-full bg-[#e5c798]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50 text-center flex flex-col items-center animate-slide-up">
        {/* Ícono animado */}
        <div className="w-16 h-16 rounded-2xl bg-[#02aeaa]/10 border border-[#02aeaa]/20 text-[#02aeaa] flex items-center justify-center mb-6 shadow-sm">
          {type === "construction" ? (
            <Hammer className="w-8 h-8 animate-pulse-subtle" />
          ) : (
            <Compass className="w-8 h-8 animate-spin-slow" />
          )}
        </div>

        {/* Badge */}
        <span className="inline-block px-3 py-1 rounded-full bg-[#e5c798]/25 border border-[#e5c798]/40 text-[#183c6b] text-xs font-bold uppercase tracking-wider mb-3">
          {badge}
        </span>

        {/* Título */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#183c6b] mb-3 tracking-tight">
          {title}
        </h1>

        {/* Descripción */}
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          {description}
        </p>

        {/* Botón Volver al inicio */}
        <Link
          href={`/${currentLang}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#02aeaa] hover:bg-[#183c6b] text-white font-bold text-sm shadow-md shadow-[#02aeaa]/20 hover:shadow-lg transition-all duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>{buttonText}</span>
        </Link>
      </div>
    </div>
  );
}
