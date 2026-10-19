import { getDictionary, resolveLocale } from "@/dictionaries/get-dictionary";
import { getPageMetadata } from "@/lib/metadata";
import { PrivacyContent } from "@/components/sections/privacy/PrivacyContent";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  return getPageMetadata(lang, "privacy", "/privacidad");
}

export default async function PrivacidadPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = resolveLocale(lang);
  const dict = await getDictionary(currentLang);

  return (
    <div className="w-full">
      <PrivacyContent currentLang={currentLang} dict={dict.privacy} />
    </div>
  );
}
