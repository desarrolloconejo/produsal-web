import { resolveLocale } from "@/dictionaries/get-dictionary";
import { getPageMetadata } from "@/lib/metadata";
import { AboutHero, AboutWrapper, AboutContent } from "@/components/sections/about";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  return getPageMetadata(lang, "about", "/nosotros");
}

export default async function NosotrosPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = resolveLocale(lang);

  return (
    <div className="w-full">
      <AboutHero currentLang={currentLang} />
      <AboutWrapper>
        <AboutContent currentLang={currentLang} />
      </AboutWrapper>
    </div>
  );
}
