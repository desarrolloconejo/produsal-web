import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["es", "en"];
const defaultLocale = "es";

function getLocale(request: NextRequest): string {
  // 1. Revisar cookie previa de idioma
  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (savedLocale && locales.includes(savedLocale)) {
    return savedLocale;
  }

  // 2. Revisar cabecera Accept-Language del navegador
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLanguages = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase().slice(0, 2));

    for (const lang of preferredLanguages) {
      if (locales.includes(lang)) {
        return lang;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Ignorar archivos estáticos, imágenes, favicon y rutas internas de Next.js
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Verificar si la ruta actual ya incluye algún idioma soportado
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Si ya tiene idioma, actualizamos la cookie si es diferente
    const currentLocale = pathname.split("/")[1];
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", currentLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 año
      sameSite: "lax",
    });
    return response;
  }

  // Redirigir a la ruta con idioma detectado
  const locale = getLocale(request);
  const redirectUrl = new URL(`/${locale}${pathname === "/" ? "" : pathname}${search}`, request.url);

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    // Ejecutar en todas las rutas excepto archivos estáticos explícitos
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
