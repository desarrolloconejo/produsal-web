import { getDictionary, resolveLocale } from "@/dictionaries/get-dictionary";
import { getPageMetadata } from "@/lib/metadata";
import { ProductsCatalogHero } from "@/components/sections/products/ProductsCatalogHero";
import { ProductsCatalogGrid } from "@/components/sections/products/ProductsCatalogGrid";
import { ProductsOperationsShowcase } from "@/components/sections/products/ProductsOperationsShowcase";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  return getPageMetadata(lang, "products", "/productos");
}

export default async function ProductosPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = resolveLocale(lang);
  const dict = await getDictionary(currentLang);

  return (
    <div className="w-full">
      <ProductsCatalogHero currentLang={currentLang} dict={dict.products} />
      <ProductsCatalogGrid currentLang={currentLang} dict={dict.products} />
      <ProductsOperationsShowcase currentLang={currentLang} />
    </div>
  );
}
