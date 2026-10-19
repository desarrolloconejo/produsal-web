import { getDictionary, resolveLocale } from "@/dictionaries/get-dictionary";
import { getPageMetadata } from "@/lib/metadata";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactBody } from "@/components/sections/contact/ContactBody";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  return getPageMetadata(lang, "contact", "/contacto");
}

export default async function ContactoPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = resolveLocale(lang);
  const dict = await getDictionary(currentLang);

  return (
    <div className="w-full">
      <ContactHero currentLang={currentLang} dict={dict.contact} />
      <ContactBody currentLang={currentLang} dict={dict.contact} />
    </div>
  );
}
