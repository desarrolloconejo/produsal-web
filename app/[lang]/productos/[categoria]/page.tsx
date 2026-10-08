import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/dictionaries/get-dictionary";
import { CategoryDetailView } from "@/components/sections/products/CategoryDetailView";

interface CategoryPageProps {
  params: Promise<{
    lang: string;
    categoria: string;
  }>;
}

const CATEGORY_SLUGS = [
  "sal-bruta-premium",
  "sal-bruta-tipo-a",
  "sal-molida-premium",
  "sal-molida-tipo-a",
];

export async function generateStaticParams() {
  const params: { lang: string; categoria: string }[] = [];

  for (const lang of locales) {
    for (const categoria of CATEGORY_SLUGS) {
      params.push({ lang, categoria });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { lang, categoria } = await params;
  const currentLang = (locales.includes(lang as Locale) ? lang : "es") as Locale;
  const dict = await getDictionary(currentLang);

  const category = dict.products.categories.find(
    (c) => c.slug === categoria || c.id === categoria
  );

  if (!category) {
    return {
      title: "Categoría no encontrada | Produsal C.A.",
    };
  }

  const isEs = currentLang === "es";

  return {
    title: `${category.name} (${category.code}) | Produsal C.A.`,
    description: isEs
      ? `${category.name} - ${category.desc} Pureza certificada ${category.purity} NaCl bajo norma ASTM E534-98. Ficha técnica y formatos disponibles.`
      : `${category.name} - ${category.desc} Certified purity ${category.purity} NaCl per ASTM E534-98. Technical data sheet and available packaging.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { lang, categoria } = await params;
  const currentLang = (locales.includes(lang as Locale) ? lang : "es") as Locale;
  const dict = await getDictionary(currentLang);

  const category = dict.products.categories.find(
    (c) => c.slug === categoria || c.id === categoria
  );

  if (!category) {
    notFound();
  }

  // Las texturas se intercalan entre categorías: ondas, cubos, ondas, cubos
  const texture = dict.products.categories.indexOf(category) % 2 === 0 ? "waves" : "cubes";

  return (
    <CategoryDetailView
      currentLang={currentLang}
      category={category}
      allCategories={dict.products.categories}
      dict={dict.products}
      texture={texture}
    />
  );
}
