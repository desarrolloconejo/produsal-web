import { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/dictionaries/get-dictionary";
import { PrivacyContent } from "@/components/sections/privacy/PrivacyContent";

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
      ? "Políticas de Privacidad | Produsal C.A. - Salinas Los Olivitos"
      : "Privacy Policy | Produsal C.A. - Los Olivitos Saltworks",
    description: isEs
      ? "Conoce las políticas de privacidad y protección de datos comerciales de Productora de Sal, C.A. (PRODUSAL) en el Complejo Industrial Salinas Los Olivitos, Zulia."
      : "Learn about the privacy policies and commercial data protection of Productora de Sal, C.A. (PRODUSAL) at Los Olivitos Industrial Complex, Zulia.",
  };
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (locales.includes(lang as Locale) ? lang : "es") as Locale;
  const dict = await getDictionary(currentLang);

  return (
    <div className="w-full">
      <PrivacyContent currentLang={currentLang} dict={dict.privacy} />
    </div>
  );
}
