import "server-only";

export type Locale = "es" | "en";

export const defaultLocale: Locale = "es";
export const locales: Locale[] = ["es", "en"];

const dictionaries = {
  es: () => import("./es.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const selectedLocale = (locales.includes(locale as Locale) ? locale : defaultLocale) as Locale;
  return dictionaries[selectedLocale]();
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries.es>>;
