import { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/dictionaries/get-dictionary";
import { AboutWrapper, AboutContent } from "@/components/sections/about";

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
      ? "Nosotros | Produsal: La Mayor Salina de Venezuela | Los Olivitos, Zulia"
      : "About Us | Produsal: Venezuela's Leading Sea Salt Producer | Los Olivitos, Zulia",
    description: isEs
      ? "Descubre la historia, capacidad operativa (650.000 TM/año) y tecnología del Complejo Industrial Los Olivitos de Produsal en Zulia. Alianza estratégica y sustentabilidad marina."
      : "Discover the heritage, operational capacity (650,000 MT/year), and solar crystallization technology at Produsal's Los Olivitos complex in Zulia, Venezuela.",
  };
}

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (locales.includes(lang as Locale) ? lang : "es") as Locale;

  return (
    <AboutWrapper>
      <AboutContent currentLang={currentLang} />
    </AboutWrapper>
  );
}
