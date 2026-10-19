import "server-only";

export type Locale = "es" | "en";

export const defaultLocale: Locale = "es";
export const locales: Locale[] = ["es", "en"];

const dictionaries = {
  es: () => import("./es.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
};

// Normaliza el segmento [lang] de la URL a un idioma soportado
export function resolveLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
}

export const getDictionary = async (locale: string) => {
  return dictionaries[resolveLocale(locale)]();
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries.es>>;
