import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // El layout raíz está en app/[lang], así que el 404 global vive en app/global-not-found.tsx
    globalNotFound: true,
  },
};

export default nextConfig;
