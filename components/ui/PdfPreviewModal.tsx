"use client";

import { useEffect, useState } from "react";
import { X, Download, ExternalLink, FileText, Check } from "lucide-react";
import type { Locale } from "@/dictionaries/get-dictionary";

export interface PdfModalData {
  title: string;
  code?: string;
  pdfEs: string;
  pdfEn: string;
}

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PdfModalData | null;
  currentLang: Locale;
}

export function PdfPreviewModal({
  isOpen,
  onClose,
  data,
  currentLang,
}: PdfPreviewModalProps) {
  const [activeLang, setActiveLang] = useState<Locale>(currentLang);

  // Sincronizar el idioma inicial cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setActiveLang(currentLang);
    }
  }, [isOpen, currentLang]);

  // Manejo de tecla Escape y bloqueo de scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  const currentPdfUrl = activeLang === "en" ? data.pdfEn : data.pdfEs;
  const downloadFileName =
    activeLang === "en"
      ? `${data.title.toLowerCase().replace(/\s+/g, "-")}-en.pdf`
      : `${data.title.toLowerCase().replace(/\s+/g, "-")}-es.pdf`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra Superior / Header del Visor */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-slate-900 text-white border-b border-slate-800">
          {/* Título e Info del Documento */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#02afab]/20 flex items-center justify-center text-[#02afab] shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  id="pdf-modal-title"
                  className="text-sm sm:text-base font-bold font-heading text-white truncate"
                >
                  {data.title}
                </h3>
                {data.code && (
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-cyan-300">
                    {data.code}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 font-heading">
                {currentLang === "es"
                  ? "Ficha Técnica Oficial • Productora de Sal, C.A."
                  : "Official Technical Data Sheet • Productora de Sal, C.A."}
              </span>
            </div>
          </div>

          {/* Acciones: Selector de Idioma, Descargar, Abrir y Cerrar */}
          <div className="flex items-center gap-2 sm:gap-2.5 ml-auto">
            {/* Selector Bilingüe Integrado */}
            <div className="flex items-center rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs font-bold font-heading">
              <button
                type="button"
                onClick={() => setActiveLang("es")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeLang === "es"
                    ? "bg-[#02afab] text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Ver versión en Español"
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setActiveLang("en")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeLang === "en"
                    ? "bg-[#02afab] text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
                title="View English Version"
              >
                EN
              </button>
            </div>

            {/* Botón Descargar PDF */}
            <a
              href={currentPdfUrl}
              download={downloadFileName}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#082846] bg-[#02afab] hover:bg-[#008784] hover:text-white transition-colors font-heading shadow-xs"
              title={currentLang === "es" ? "Descargar documento PDF" : "Download PDF file"}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {currentLang === "es" ? "Descargar" : "Download"}
              </span>
            </a>

            {/* Botón Abrir en Pestaña */}
            <a
              href={currentPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title={currentLang === "es" ? "Abrir en nueva pestaña" : "Open in new tab"}
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Separador */}
            <div className="h-5 w-px bg-slate-700 hidden sm:block" />

            {/* Botón Cerrar */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Cerrar vista previa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenedor del PDF Embebido */}
        <div className="relative flex-1 w-full h-full bg-slate-100 overflow-hidden">
          <iframe
            src={`${currentPdfUrl}#view=FitH&toolbar=1`}
            title={data.title}
            className="w-full h-full border-0"
          />

          {/* Tarjeta inferior informativa / fallback para navegadores móviles */}
          <div className="sm:hidden absolute bottom-3 left-3 right-3 p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 flex items-center justify-between gap-2">
            <span className="text-xs text-slate-600 font-medium">
              {currentLang === "es"
                ? "¿Problemas para ver el PDF en móvil?"
                : "Trouble viewing PDF on mobile?"}
            </span>
            <a
              href={currentPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 text-xs font-bold text-white bg-[#082846] rounded-lg shrink-0"
            >
              {currentLang === "es" ? "Abrir directo" : "Open directly"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
