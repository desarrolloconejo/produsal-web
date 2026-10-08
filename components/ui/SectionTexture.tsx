export type TextureVariant = "waves" | "cubes";

interface SectionTextureProps {
  variant: TextureVariant;
  className?: string;
  opacityClass?: string;
}

const VARIANT_CLASSES: Record<TextureVariant, string> = {
  waves: "texture-waves",
  cubes: "texture-crystals",
};

// Las ondas son más densas que los cubos, por eso van bastante más tenues
const VARIANT_OPACITY: Record<TextureVariant, string> = {
  waves: "opacity-15",
  cubes: "opacity-30",
};

/**
 * Textura de marca de fondo para una sección (ondas o cubos de sal).
 * Se funde arriba y abajo para leerse como una sola superficie.
 * No usar en dos secciones blancas contiguas.
 */
export function SectionTexture({
  variant,
  className = "",
  opacityClass = VARIANT_OPACITY[variant],
}: SectionTextureProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 texture-fade pointer-events-none select-none ${VARIANT_CLASSES[variant]} ${opacityClass} ${className}`}
    />
  );
}
