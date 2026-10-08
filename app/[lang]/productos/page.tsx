import { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/dictionaries/get-dictionary";
import { ProductsCatalogHero } from "@/components/sections/products/ProductsCatalogHero";
import { ProductsCatalogGrid } from "@/components/sections/products/ProductsCatalogGrid";
import { ProductsOperationsShowcase } from "@/components/sections/products/ProductsOperationsShowcase";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = (locales.includes(lang as Locale) ? lang : "es") as Locale;
  const isEs = currentLang === "es";

  return {
    title: isEs
      ? "Catálogo de Productos Industriales | Produsal C.A."
      : "Industrial Product Catalog | Produsal C.A.",
    description: isEs
      ? "Catálogo oficial de sal marina solar de alta pureza (ASTM E534-98): Sal Bruta Premium, Sal Bruta Tipo A, Sal Molida Premium y Sal Molida Tipo A. Despachos a granel, Big Bags y sacos de 20 kg."
      : "Official catalog of high-purity solar marine salt (ASTM E534-98): Premium Coarse Salt, Type A Coarse Salt, Premium Ground Salt, and Type A Ground Salt. Bulk hopper, Big Bags, and 20 kg bags.",
  };
}

export default async function ProductosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (locales.includes(lang as Locale) ? lang : "es") as Locale;
  const dict = await getDictionary(currentLang);

  return (
    <div className="w-full">
      <ProductsCatalogHero currentLang={currentLang} dict={dict.products} />
      <ProductsCatalogGrid currentLang={currentLang} dict={dict.products} />
      <ProductsOperationsShowcase currentLang={currentLang} />
    </div>
  );
}
