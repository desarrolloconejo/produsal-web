import { notFound } from "next/navigation";
import { getDictionary, resolveLocale, defaultLocale } from "@/dictionaries/get-dictionary";
import { findCategory, getCategoryMetadata } from "@/lib/metadata";
import { CategoryDetailView } from "@/components/sections/products/CategoryDetailView";

interface PageProps {
  params: Promise<{ lang: string; categoria: string }>;
}

// El idioma lo genera el layout [lang]; aquí solo las categorías (mismos slugs en ambos idiomas)
export async function generateStaticParams() {
  const dict = await getDictionary(defaultLocale);
  return dict.products.categories.map((category) => ({ categoria: category.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, categoria } = await params;
  return getCategoryMetadata(lang, categoria);
}

export default async function CategoryPage({ params }: PageProps) {
  const { lang, categoria } = await params;
  const currentLang = resolveLocale(lang);
  const dict = await getDictionary(currentLang);
  const category = findCategory(dict.products.categories, categoria);

  if (!category) {
    notFound();
  }

  return (
    <CategoryDetailView
      currentLang={currentLang}
      category={category}
      allCategories={dict.products.categories}
      dict={dict.products}
      contactDict={dict.contact}
    />
  );
}
