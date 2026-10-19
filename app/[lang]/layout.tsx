import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { getDictionary, locales, resolveLocale } from "@/dictionaries/get-dictionary";
import { TopBarLang } from "@/components/layout/TopBarLang";
import { Header } from "@/components/layout/Header";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Produsal | Productora de Sal Marina de Venezuela",
    template: "%s | Produsal",
  },
  description:
    "Productora, refinadora y distribuidora de sal marina de alta pureza (99.8%) cosechada por evaporación solar en las costas de Venezuela.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#02aeaa",
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Layout raíz: vive dentro de [lang] para que <html lang> refleje el idioma de la URL
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = resolveLocale(lang);
  const dict = await getDictionary(currentLang);

  return (
    <html lang={currentLang} className={fontVariables}>
      <body className="min-h-screen bg-[#183c6b] text-slate-800 antialiased selection:bg-[#02aeaa]/20 selection:text-[#183c6b] font-sans">
        <div className="flex flex-col min-h-screen bg-[#183c6b]">
          {/* Barra superior y Header blancos, siempre fijos (sticky) */}
          <NavbarWrapper>
            <TopBarLang currentLang={currentLang} dict={dict.topBar} />
            <Header currentLang={currentLang} dict={dict.nav} productsDict={dict.products} />
          </NavbarWrapper>

          <main className="flex-1">{children}</main>
          <Footer currentLang={currentLang} dict={dict.footer} navDict={dict.nav} />
        </div>
      </body>
    </html>
  );
}
