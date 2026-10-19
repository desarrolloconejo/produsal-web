import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { StatusCard } from "@/components/sections/status/StatusCard";

// 404 para URLs que no pasan por [lang] (el proxy redirige casi todo a /es o /en)
export const metadata: Metadata = {
  title: "404 | Produsal",
  description: "La página que estás buscando no existe.",
};

export default function GlobalNotFound() {
  return (
    <html lang="es" className={fontVariables}>
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
        <StatusCard
          badge="Error 404"
          title="La página que estás buscando no existe."
          description="El enlace puede estar desactualizado o haber sido modificado en el nuevo portal."
          buttonText="Volver al inicio"
          currentLang="es"
          type="404"
        />
      </body>
    </html>
  );
}
