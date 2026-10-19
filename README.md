# Produsal Web - Portal Corporativo y Plataforma Multilingüe

Plataforma web corporativa de última generación para **Produsal C.A.**, empresa líder en la extracción solar, refinamiento, molienda y distribución de sal marina de alta pureza (99.8% NaCl) en Venezuela.

Desarrollada con arquitectura moderna basada en **Next.js 16 (App Router)**, **Tailwind CSS v4**, **TypeScript**, **Lucide React** y un motor de correo transaccional con **Nodemailer**.

---

## 📋 Tabla de Contenidos
1. [Características Principales](#-características-principales)
2. [Pila Tecnológica](#-pila-tecnológica)
3. [Identidad Visual y Paleta de Marca](#-identidad-visual-y-paleta-de-marca)
4. [Estructura del Proyecto y Jerarquía de Componentes](#-estructura-del-proyecto-y-jerarquía-de-componentes)
5. [Sistema de Internacionalización (i18n)](#-sistema-de-internacionalización-i18n)
6. [Formulario de Contacto y Server Action (Nodemailer)](#-formulario-de-contacto-y-server-action-nodemailer)
7. [Variables de Entorno](#-variables-de-entorno)
8. [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
9. [Créditos](#-créditos)

---

## 🌟 Características Principales

- **Arquitectura Multilingüe Nativa (ES / EN):**
  - Enrutamiento dinámico en `app/[lang]/`.
  - Proxy de Next 16 (`proxy.ts`, antes `middleware.ts`) que detecta automáticamente el idioma del visitante mediante cookies (`NEXT_LOCALE`) o cabeceras `Accept-Language`.
  - Diccionarios desacoplados en formato JSON (`dictionaries/es.json`, `dictionaries/en.json`).
  - Barra superior delgada con selector instantáneo de idioma y logos en el extremo.

- **Diseño Corporativo Elegante para Producción Salina:**
  - Estética refinada inspirada en las salinas marinas venezolanas (piscinas de cristalización turquesa, montículos de sal blanca y reflejos de luz solar).
  - Animaciones fluidas de entrada (`animate-slide-up`, `animate-fade-in`, `animate-float-slow`) reutilizables.
  - Efectos visuales de vidrio esmerilado (`glass-card-dark`, `glass-card`) y trama molecular cúbica de cloruro de sodio (`crystal-pattern`).

- **Alta Cohesión y Bajo Acoplamiento (`page > wrapper > content`):**
  - Las páginas solo actúan como orquestadores que inyectan los diccionarios y propiedades a las secciones.
  - Cada sección cuenta con un contenedor envolvente (`*Wrapper.tsx`) y su contenido estructurado (`*Content.tsx`).

- **Optimización de Recursos Multimedia:**
  - Logotipos y fotografías en formato optimizado **WebP** y soporte para videos **WebM**.

---

## 🛠️ Pila Tecnológica

| Componente | Tecnología | Versión |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack) | 16.3.8 |
| **Librería UI** | React / React DOM | 19.2.8 |
| **Estilos** | Tailwind CSS con importación nativa | 4.x |
| **Lenguaje** | TypeScript | 5.x |
| **Iconografía** | Lucide React | Última |
| **Mailing** | Nodemailer (Server Action) | 10.x |

---

## 🎨 Identidad Visual y Paleta de Marca
 
La paleta cromática traduce la pureza de la sal marina, las aguas costeras y el ecosistema solar de Venezuela según el manual de marca oficial:
 
### Colores Primarios
| Color | Código Hex | Uso Primario |
| :--- | :--- | :--- |
| **Azul Oscuro Oficial** | `#183C6B` | Fondos de alto contraste (Hero, Footer, TopBar), encabezados y tipografía de títulos. |
| **Azul Claro / Turquesa** | `#02AEAA` | Color de marca activo: botones de acción primarios, insignias principales, enlaces. |

### Colores Secundarios
| Color | Código Hex | Uso Primario |
| :--- | :--- | :--- |
| **Azul Secundario / Celeste Costero** | `#85B2CF` | Acento marítimo, insignias de Sal Bruta Tipo A, tarjetas operativas, bordes secundarios. |
| **Arena / Dorado Solar** | `#E5C798` | Cristalización solar, cosecha, hitos históricos de excelencia y acentos de calidez. |

### Neutros
| Color | Código Hex | Uso Primario |
| :--- | :--- | :--- |
| **Blanco Nieve** | `#FFFFFF` | Fondos principales limpios, contraste de pureza mineral. |
| **Gris Carbón** | `#0F172A` / `#334155` | Textos de cuerpo, especificaciones técnicas y lectura prolongada. |

### Tipografías
- **Avenir (`--font-heading`):** Títulos, subtítulos y navegación principal.
- **Work Sans (`--font-sans`):** Textos descriptivos, especificaciones técnicas y párrafos corporativos.

Ambas se cargan localmente con `next/font/local` desde `public/fonts/` (ver `lib/fonts.ts`). Reemplazan a Gilroy y Montserrat del brief original por decisión del cliente.

---

## 📁 Estructura del Proyecto y Jerarquía de Componentes

```
produsal-web/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx             # Layout raíz localizado: <html lang>, fuentes, TopBarLang, Header, Footer
│   │   ├── page.tsx               # Inicio (/es o /en)
│   │   ├── nosotros/              # Quiénes somos
│   │   ├── productos/             # Catálogo y fichas por categoría (productos/[categoria])
│   │   ├── galeria/               # Galería fotográfica
│   │   ├── contacto/              # Contacto y cotizaciones
│   │   ├── privacidad/            # Políticas de privacidad
│   │   ├── construccion/          # Página "En Construcción"
│   │   ├── [...rest]/page.tsx     # Rutas desconocidas → 404 localizado
│   │   └── not-found.tsx          # 404 bilingüe (con header y footer)
│   ├── actions/
│   │   └── send.ts                # Server Action con Nodemailer para el formulario
│   ├── global-not-found.tsx       # 404 para URLs fuera de /es y /en
│   └── globals.css                # Tailwind v4, tokens de marca y animaciones reutilizables
├── components/
│   ├── layout/                    # TopBarLang, Header, MobileMenu, NavbarWrapper, Footer
│   ├── sections/                  # Una carpeta por sección (Wrapper + Content + index.ts)
│   │   ├── contact/ContactForm.tsx # Formulario único reutilizado en inicio, contacto y fichas
│   │   └── status/StatusCard.tsx  # Tarjeta reutilizable para 404 y En Construcción
│   └── ui/                        # ScrollReveal, PdfPreviewModal, texturas de fondo
├── data/                          # Manifiesto de la galería (generado por scripts/optimize-gallery.mjs)
├── dictionaries/
│   ├── es.json / en.json          # Textos de la web, incluida la metadata SEO (meta.pages)
│   └── get-dictionary.ts          # getDictionary() y resolveLocale()
├── lib/
│   ├── fonts.ts                   # Avenir y Work Sans con next/font/local
│   └── metadata.ts                # Metadata por página leída de los diccionarios
├── public/                        # Imágenes .webp, fuentes y fichas técnicas PDF
├── scripts/                       # Optimización de galería y generación de texturas
├── proxy.ts                       # Detección y redirección de idioma (antes middleware.ts)
├── .env.example                   # Plantilla de variables de entorno
└── CLAUDE.md                      # Contrato de trabajo y brief original
```

---

## 🌐 Sistema de Internacionalización (i18n)

### Flujo de Trabajo
1. Un visitante ingresa a `tusitio.com`.
2. `proxy.ts` intercepta la solicitud antes del renderizado:
   - Verifica si existe una cookie `NEXT_LOCALE` válida.
   - Si no existe, inspecciona el encabezado `Accept-Language` del navegador.
   - Redirige al visitante a `tusitio.com/es` o `tusitio.com/en`.
   - Establece la cookie de preferencia con duración de 1 año.
3. El layout `app/[lang]/layout.tsx` es el layout raíz, así que `<html lang>` siempre coincide con el idioma de la URL.
4. El componente `TopBarLang.tsx` ofrece un conmutador manual accesible que preserva la ruta actual y actualiza el idioma seleccionado.

---

## ✉️ Formulario de Contacto y Server Action (Nodemailer)

El archivo `app/actions/send.ts` implementa una Server Action de React 19:
- Valida entradas en el servidor (campos obligatorios, formato de email y longitud máxima).
- Escapa el contenido antes de insertarlo en el HTML del correo y limpia saltos de línea del asunto.
- Incluye un campo trampa (honeypot) oculto contra bots de spam.
- Responde en el idioma del visitante (textos en `contact.formMessages` de los diccionarios).
- Todos los formularios de la web usan el mismo componente `components/sections/contact/ContactForm.tsx`.
- Lee la configuración SMTP desde variables de entorno.
- En caso de no tener configurado el servidor SMTP en desarrollo, ejecuta una simulación segura informando en consola y devolviendo respuesta exitosa a la UI para facilitar pruebas.
- Al configurar credenciales válidas, despacha un correo HTML formateado con la identidad corporativa de Produsal.

---

## ⚙️ Variables de Entorno

Copia el archivo `.env.example` a `.env.local` y ajusta las credenciales:

```bash
cp .env.example .env.local
```

### Variables disponibles:
```env
# URL base
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Conexión SMTP (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-correo@produsal.com
SMTP_PASS=tu_password_o_app_password

# Destinatarios
CONTACT_FROM_EMAIL="Produsal Web <no-reply@produsal.com>"
CONTACT_TO_EMAIL=contacto@produsal.com
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- Node.js 18.18+ o superior (probado en Node.js v24)
- npm 9+ o pnpm/yarn

### 1. Clonar el repositorio e instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre en tu navegador [http://localhost:3000](http://localhost:3000). Serás redirigido automáticamente a `/es` o `/en`.

### 3. Compilación para Producción
```bash
npm run build
npm run start
```

---

## 🏢 Créditos & Derechos

- **Empresa:** Produsal C.A. (RIF: J-31298456-0)
- **Desarrollo y Arquitectura:** Desarrollado by El Conejo Del Sombrero
- **Brief Original:** Preservado íntegramente en [`CLAUDE.md`](./CLAUDE.md)
