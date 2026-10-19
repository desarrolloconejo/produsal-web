import { galleryImages } from "./gallery";

// Foto del hero: no se repite en el grid ni en los heros de otras páginas
export const galleryHeroImage = "/images/galeria/DSC00075.webp";

export const galleryGridImages = galleryImages.filter((image) => image.src !== galleryHeroImage);
