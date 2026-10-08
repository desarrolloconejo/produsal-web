"use client";

import { usePathname } from "next/navigation";
import { StatusCard } from "@/components/sections/status/StatusCard";

// not-found no recibe params: el idioma se toma de la URL
const COPY = {
  es: {
    title: "La página que estás buscando no existe.",
    description: "El enlace puede estar desactualizado o haber sido modificado en el nuevo portal.",
    button: "Volver al inicio",
  },
  en: {
    title: "The page you are looking for does not exist.",
    description: "The link may be outdated or may have changed in the new site.",
    button: "Back to home",
  },
} as const;

export default function NotFound() {
  const pathname = usePathname();
  const currentLang = pathname?.startsWith("/en") ? "en" : "es";
  const copy = COPY[currentLang];

  return (
    <StatusCard
      badge="Error 404"
      title={copy.title}
      description={copy.description}
      buttonText={copy.button}
      currentLang={currentLang}
      type="404"
    />
  );
}
