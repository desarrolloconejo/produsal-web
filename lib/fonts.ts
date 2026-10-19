import localFont from "next/font/local";

// Avenir no tiene 600 ni 800: se reparte para que cada peso de Tailwind sea distinto.
// 300 Light · 400 Book · 500 Roman · 600 Medium · 700 Heavy · 800/900 Black
export const avenir = localFont({
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

export const workSans = localFont({
  src: "../public/fonts/worksans/WorkSans-Variable.ttf",
  variable: "--font-work-sans",
  display: "swap",
});

// Clases que exponen las variables CSS --font-work-sans y --font-avenir
export const fontVariables = `${workSans.variable} ${avenir.variable}`;
