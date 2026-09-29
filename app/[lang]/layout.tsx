import { getDictionary, locales, type Locale } from "@/dictionaries/get-dictionary";
import { TopBarLang } from "@/components/layout/TopBarLang";
import { Header } from "@/components/layout/Header";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Footer } from "@/components/layout/Footer";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (locales.includes(lang as Locale) ? lang : "es") as Locale;
  const dict = await getDictionary(currentLang);

  return (
    <div className="flex flex-col min-h-screen bg-[#082846]">
      {/* Barra superior y Header completos con auto-hide al bajar y auto-show al subir */}
      <NavbarWrapper>
        <TopBarLang currentLang={currentLang} dict={dict.topBar} />
        <Header currentLang={currentLang} dict={dict.nav} productsDict={dict.products} />
      </NavbarWrapper>

      <main className="flex-1">{children}</main>
      <Footer currentLang={currentLang} dict={dict.footer} navDict={dict.nav} />
    </div>
  );
}
