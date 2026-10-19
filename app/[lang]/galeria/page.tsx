import { getDictionary } from "@/dictionaries/get-dictionary";
import { getPageMetadata } from "@/lib/metadata";
import { GalleryHero, GalleryWrapper, GalleryContent } from "@/components/sections/gallery";
import { galleryHeroImage, galleryGridImages } from "@/data/gallery-selection";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  return getPageMetadata(lang, "gallery", "/galeria");
}

export default async function GaleriaPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="w-full">
      <GalleryHero dict={dict.gallery} backgroundImageSrc={galleryHeroImage} />
      <GalleryWrapper>
        <GalleryContent dict={dict.gallery} images={galleryGridImages} />
      </GalleryWrapper>
    </div>
  );
}
