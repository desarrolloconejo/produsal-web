import { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/dictionaries/get-dictionary";
import { GalleryHero, GalleryWrapper, GalleryContent } from "@/components/sections/gallery";
import { galleryImages } from "@/data/gallery";

// Foto del hero: no se repite en el grid ni en los heros de otras páginas
const HERO_IMAGE = "/images/galeria/DSC00075.webp";

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
    title: dict.gallery.metaTitle,
    description: dict.gallery.metaDescription,
    alternates: {
      languages: {
        es: "/es/galeria",
        en: "/en/galeria",
      },
    },
  };
}

export default async function GaleriaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (locales.includes(lang as Locale) ? lang : "es") as Locale;
  const dict = await getDictionary(currentLang);
  const images = galleryImages.filter((image) => image.src !== HERO_IMAGE);

  return (
    <div className="w-full">
      <GalleryHero dict={dict.gallery} backgroundImageSrc={HERO_IMAGE} />
      <GalleryWrapper>
        <GalleryContent dict={dict.gallery} images={images} />
      </GalleryWrapper>
    </div>
  );
}
