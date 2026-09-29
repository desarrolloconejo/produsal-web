import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  themeColor: "#02afab",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#082846] text-slate-800 antialiased selection:bg-[#02afab]/20 selection:text-[#082846] font-sans">
        {children}
      </body>
    </html>
  );
}
