import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 es el valor por defecto; 90 para fotos recortadas que se ven de cerca
    qualities: [75, 90],
  },
  experimental: {
    // El layout raíz está en app/[lang], así que el 404 global vive en app/global-not-found.tsx
    globalNotFound: true,
  },
};

export default nextConfig;
