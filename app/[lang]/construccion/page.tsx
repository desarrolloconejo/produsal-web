import { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/dictionaries/get-dictionary";
import { StatusCard } from "@/components/sections/status/StatusCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return { title: dict.underConstruction.title };
}

export default async function ConstructionPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (locales.includes(lang as Locale) ? lang : "es") as Locale;
  const dict = await getDictionary(currentLang);

  return (
    <StatusCard
      badge={dict.underConstruction.badge}
      title={dict.underConstruction.title}
      description={dict.underConstruction.description}
      buttonText={dict.underConstruction.button}
      currentLang={currentLang}
      type="construction"
    />
  );
}
