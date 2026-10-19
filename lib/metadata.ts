import "server-only";
import type { Metadata } from "next";
import { getDictionary, locales, resolveLocale, type Dictionary } from "@/dictionaries/get-dictionary";

type PageKey = "home" | keyof Omit<Dictionary["meta"]["pages"], "category">;
type Category = Dictionary["products"]["categories"][number];

// Rutas alternativas por idioma (/es/... y /en/...) para SEO
function alternates(path: string): Metadata["alternates"] {
  return {
    languages: Object.fromEntries(locales.map((locale) => [locale, `/${locale}${path}`])),
  };
}

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export async function getPageMetadata(lang: string, page: PageKey, path = ""): Promise<Metadata> {
  const { meta } = await getDictionary(lang);
  const { title, description } = page === "home" ? meta : meta.pages[page];

  return { title: { absolute: title }, description, alternates: alternates(path) };
}

export function findCategory(categories: Category[], slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug || c.id === slug);
}

export async function getCategoryMetadata(lang: string, slug: string): Promise<Metadata> {
  const dict = await getDictionary(resolveLocale(lang));
  const template = dict.meta.pages.category;
  const category = findCategory(dict.products.categories, slug);

  if (!category) {
    return { title: { absolute: template.notFound } };
  }

  const values = {
    name: category.name,
    code: category.code,
    desc: category.desc,
    purity: category.purity,
  };

  return {
    title: { absolute: fill(template.title, values) },
    description: fill(template.description, values),
    alternates: alternates(`/productos/${category.slug}`),
  };
}
