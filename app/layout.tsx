import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Avenir no tiene 600 ni 800: se reparte para que cada peso de Tailwind sea distinto.
// 300 Light · 400 Book · 500 Roman · 600 Medium · 700 Heavy · 800/900 Black
const avenir = localFont({
  src: [
    {
      path: "../public/fonts/avenir/Avenir-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/avenir/Avenir-Roman.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/avenir/Avenir-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/avenir/Avenir-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/avenir/Avenir-Heavy.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/avenir/Avenir-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-avenir",
  display: "swap",
});

const workSans = localFont({
  src: "../public/fonts/worksans/WorkSans-Variable.ttf",
  variable: "--font-work-sans",
  display: "swap",
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${workSans.variable} ${avenir.variable}`}>
      <body className="min-h-screen bg-[#183c6b] text-slate-800 antialiased selection:bg-[#02aeaa]/20 selection:text-[#183c6b] font-sans">
        {children}
      </body>
    </html>
  );
}
