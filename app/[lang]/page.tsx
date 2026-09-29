import { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/dictionaries/get-dictionary";
import { HeroWrapper, HeroContent } from "@/components/sections/hero";
import { StatsWrapper, StatsContent } from "@/components/sections/stats";
import { HistoryWrapper, HistoryContent } from "@/components/sections/history";
import { ProcessWrapper, ProcessContent } from "@/components/sections/process";
import { ProductsWrapper, ProductsContent } from "@/components/sections/products";
import { MarketWrapper, MarketContent } from "@/components/sections/market";
import { LocationWrapper, LocationContent } from "@/components/sections/location";
import { ContactWrapper, ContactContent } from "@/components/sections/contact";

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
  const dict = await getDictionary(currentLang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (locales.includes(lang as Locale) ? lang : "es") as Locale;
  const dict = await getDictionary(currentLang);

  return (
    <>
      {/* Sección Hero: page > wrapper > content */}
      <HeroWrapper backgroundImageSrc="/images/hero-bg.jpg">
        <HeroContent currentLang={currentLang} dict={dict.hero} />
      </HeroWrapper>

      {/* Sección Métricas / Estadísticas: page > wrapper > content */}
      <StatsWrapper>
        <StatsContent stats={dict.hero.stats} />
      </StatsWrapper>

      {/* Sección Nuestra Historia / Quiénes Somos: page > wrapper > content */}
      <HistoryWrapper id="historia">
        <HistoryContent currentLang={currentLang} dict={dict.historySection} />
      </HistoryWrapper>

      {/* Sección Cómo se hace la sal en PRODUSAL: page > wrapper > content */}
      <ProcessWrapper id="proceso">
        <ProcessContent currentLang={currentLang} dict={dict.processSection} />
      </ProcessWrapper>

      {/* Sección Portafolio de Productos: page > wrapper > content */}
      <ProductsWrapper id="productos">
        <ProductsContent currentLang={currentLang} dict={dict.products} />
      </ProductsWrapper>

      {/* Sección Liderazgo de Mercado y Capacidad Instalada: page > wrapper > content */}
      <MarketWrapper id="mercado">
        <MarketContent currentLang={currentLang} dict={dict.marketSection} />
      </MarketWrapper>

      {/* Sección Ubicación Estratégica de la Planta en Venezuela: page > wrapper > content */}
      <LocationWrapper id="ubicacion">
        <LocationContent currentLang={currentLang} dict={dict.locationSection} />
      </LocationWrapper>

      {/* Sección Contacto: page > wrapper > content */}
      <ContactWrapper id="contacto">
        <ContactContent currentLang={currentLang} contactDict={dict.contact || {}} />
      </ContactWrapper>
    </>
  );
}
