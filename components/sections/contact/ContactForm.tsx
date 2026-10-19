"use client";

import { useActionState, type ReactNode } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactEmail, type ContactState } from "@/app/actions/send";
import type { Locale, Dictionary } from "@/dictionaries/get-dictionary";

interface ContactFormProps {
  currentLang: Locale;
  dict: Dictionary["contact"];
  /** Prefijo para los id de los campos (evita ids duplicados si hay más de un formulario) */
  idPrefix: string;
  /** Campos extra que van antes de los datos de contacto (ej. selector de producto) */
  children?: ReactNode;
  messageLabel?: string;
  defaultMessage?: string;
  submitLabel?: string;
}

const initialState: ContactState = {
  success: false,
  message: "",
};

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#02aeaa] focus:ring-2 focus:ring-[#02aeaa]/20 transition-all text-slate-900 bg-white";
const labelClass = "block text-xs font-bold text-slate-700 mb-1.5 font-heading";

export function ContactForm({
  currentLang,
  dict,
  idPrefix,
  children,
  messageLabel,
  defaultMessage,
  submitLabel,
}: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const f = dict.form;
  const id = (field: string) => `${idPrefix}-${field}`;

  return (
    <>
      {state.message && (
        <div
          role="status"
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
        <input type="hidden" name="lang" value={currentLang} />

        {/* Honeypot anti-spam: oculto para personas, los bots lo rellenan */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label htmlFor={id("website")}>Website</label>
          <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {children}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={id("name")} className={labelClass}>
              {f.nameLabel}
            </label>
            <input
              id={id("name")}
              name="name"
              type="text"
              required
              maxLength={120}
              autoComplete="name"
              placeholder={f.namePlaceholder}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor={id("email")} className={labelClass}>
              {f.emailLabel}
            </label>
            <input
              id={id("email")}
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder={f.emailPlaceholder}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor={id("company")} className={labelClass}>
            {f.companyLabel}
          </label>
          <input
            id={id("company")}
            name="company"
            type="text"
            maxLength={160}
            autoComplete="organization"
            placeholder={f.companyPlaceholder}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={id("message")} className={labelClass}>
            {messageLabel ?? f.messageLabel}
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={4}
            required
            maxLength={5000}
            defaultValue={defaultMessage}
            placeholder={f.messagePlaceholder}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Checkbox de Políticas de Privacidad Obligatorio */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            id={id("privacy")}
            name="privacy"
            required
            className="mt-1 w-4 h-4 rounded text-[#02aeaa] border-slate-300 focus:ring-[#02aeaa] focus:ring-offset-0 cursor-pointer accent-[#02aeaa] shrink-0"
          />
          <label htmlFor={id("privacy")} className="text-xs text-slate-600 leading-snug cursor-pointer select-none">
            {dict.privacyAcceptLabel}{" "}
            <Link
              href={`/${currentLang}/privacidad`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#02aeaa] hover:text-[#183c6b] underline underline-offset-2 transition-colors"
            >
              {dict.privacyLinkLabel}
            </Link>{" "}
            {dict.privacyAcceptSuffix}
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#02aeaa] hover:bg-[#183c6b] text-white font-bold text-sm shadow-md shadow-[#02aeaa]/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer font-heading"
        >
          {isPending ? (
            <span>{f.sending}</span>
          ) : (
            <>
              <span>{submitLabel ?? f.submit}</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </>
  );
}
