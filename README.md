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
  - Middleware inteligente (`middleware.ts`) que detecta automáticamente el idioma del visitante mediante cookies (`NEXT_LOCALE`) o cabeceras `Accept-Language`.
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
  - Imagen de fondo de salinas costeras de alta resolución generada y adaptada a la identidad de marca.

---

## 🛠️ Pila Tecnológica

| Componente | Tecnología | Versión |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack) | 16.3.6 |
| **Librería UI** | React / React DOM | 19.2.8 |
| **Estilos** | Tailwind CSS con importación nativa | 4.x |
| **Lenguaje** | TypeScript | 5.x |
| **Iconografía** | Lucide React | Última |
| **Mailing** | Nodemailer (Server Action) | 6.x |

---

## 🎨 Identidad Visual y Paleta de Marca

La paleta cromática traduce la pureza de la sal marina, las aguas costeras y el ecosistema solar de Venezuela:

| Color | Código Hex | Uso Primario |
| :--- | :--- | :--- |
| **Blanco Nieve** | `#FFFFFF` | Fondos principales limpios, contraste de pureza mineral. |
| **Turquesa Salinas** | `#02AFAB` | Color de marca predominante: botones de acción, destellos, bordes activos. |
| **Amarillo Lima** | `#94C11E` | Acentos complementarios, indicadores de estado sustentable y toques sutiles de naturaleza. |
| **Azul Océano Profundo**| `#082846` | Fondos de alto contraste (Hero, Footer, TopBar) y tipografía de títulos en fondos claros. |
| **Gris Carbón** | `#0F172A` / `#334155` | Textos de cuerpo, etiquetas técnicas y lectura prolongada. |

### Tipografías
- **Gilroy / Plus Jakarta Sans (`--font-heading`):** Títulos, subtítulos y navegación principal.
- **Montserrat (`--font-montserrat`):** Textos descriptivos, especificaciones técnicas y párrafos corporativos.

---

## 📁 Estructura del Proyecto y Jerarquía de Componentes

```
produsal-web/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx             # Layout localizado (TopBarLang, Header, Footer)
│   │   ├── page.tsx               # Página de Inicio (/es o /en)
│   │   ├── nosotros/
│   │   │   └── page.tsx           # Página Quiénes Somos (/es/nosotros o /en/nosotros)
│   │   ├── construccion/
│   │   │   └── page.tsx           # Página "En Construcción"
│   │   └── not-found.tsx          # Página 404 personalizada bilingüe
│   ├── actions/
│   │   └── send.ts                # Server Action con Nodemailer para formulario
│   ├── globals.css                # Directivas Tailwind v4, tokens y animaciones
│   ├── layout.tsx                 # Root layout con Google Fonts (Montserrat & Heading)
│   ├── page.tsx                   # Redirección por defecto a /es
│   └── not-found.tsx              # 404 global
├── components/
│   ├── layout/
│   │   ├── TopBarLang.tsx         # Barra superior con switch de idioma bilingüe
│   │   ├── Header.tsx             # Header corporativo con navegación e intranet
│   │   ├── MobileMenu.tsx         # Menú hamburguesa responsivo con animación
│   │   └── Footer.tsx             # Footer completo con datos de contacto y copyright
│   └── sections/
│       ├── hero/
│       │   ├── HeroWrapper.tsx    # Contenedor con fondo de salinas y gradientes
│       │   ├── HeroContent.tsx    # Títulos, insignias y CTAs
│       │   ├── HeroStats.tsx      # Métricas de pureza (99.8%), volumen (+120K) y sustentabilidad
│       │   └── index.ts           # Barrel export
│       ├── about/
│       │   ├── AboutWrapper.tsx   # Contenedor de la sección Nosotros
│       │   ├── AboutContent.tsx   # Historia, pilares y fotos de salinas
│       │   └── index.ts
│       ├── contact/
│       │   ├── ContactWrapper.tsx # Contenedor con fondos decorativos
│       │   ├── ContactContent.tsx # Formulario interactivo y datos de venta
│       │   └── index.ts
│       └── status/
│           └── StatusCard.tsx     # Tarjeta reutilizable para 404 y En Construcción
├── dictionaries/
│   ├── es.json                    # Diccionario en español
│   ├── en.json                    # Diccionario en inglés
│   └── get-dictionary.ts          # Helper tipado server-only para cargar textos
├── public/
│   └── images/
│       ├── PRODUSALCLIENTE-LOGO.webp # Logotipo corporativo oficial
│       ├── logo.webp                 # Alias del logo corporativo
│       └── hero-bg.jpg               # Fotografía de alta resolución de salinas
├── .env.example                   # Plantilla documentada de variables de entorno
├── .gitignore                     # Exclusiones de control de versiones
├── CLAUDE.md                      # Contrato de trabajo y brief original preservado
├── middleware.ts                  # Middleware de detección y redirección de idioma
├── package.json                   # Dependencias y scripts de ejecución
└── tsconfig.json                  # Configuración TypeScript
```

---

## 🌐 Sistema de Internacionalización (i18n)

### Flujo de Trabajo
1. Un visitante ingresa a `tusitio.com`.
2. `middleware.ts` intercepta la solicitud antes del renderizado:
   - Verifica si existe una cookie `NEXT_LOCALE` válida.
   - Si no existe, inspecciona el encabezado `Accept-Language` del navegador.
   - Redirige al visitante a `tusitio.com/es` o `tusitio.com/en`.
   - Establece la cookie de preferencia con duración de 1 año.
3. El componente `TopBarLang.tsx` ofrece un conmutador manual accesible que preserva la ruta actual y actualiza el idioma seleccionado.

---

## ✉️ Formulario de Contacto y Server Action (Nodemailer)

El archivo `app/actions/send.ts` implementa una Server Action de React 19:
- Valida entradas en el servidor (nombre, email, empresa, mensaje).
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
