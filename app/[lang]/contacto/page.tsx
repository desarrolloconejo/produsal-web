import { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/dictionaries/get-dictionary";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactBody } from "@/components/sections/contact/ContactBody";

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
      ? "Contacto y Ventas | Produsal C.A. - Los Olivitos, Zulia"
      : "Contact & Sales | Produsal C.A. - Los Olivitos, Zulia",
    description: isEs
      ? "Contáctanos para atención comercial al mayor, despacho industrial de sal marina, especificaciones técnicas y cotizaciones para la industria alimentaria, química y nutrición animal."
      : "Contact Produsal C.A. for commercial wholesale inquiries, industrial sea salt bulk orders, technical specifications, and quotations.",
  };
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (locales.includes(lang as Locale) ? lang : "es") as Locale;
  const dict = await getDictionary(currentLang);

  return (
    <div className="w-full">
      <ContactHero currentLang={currentLang} dict={dict.contact} />
      <ContactBody currentLang={currentLang} dict={dict.contact} />
    </div>
  );
}
