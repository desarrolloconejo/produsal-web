### Sitio Web Produsal

Necesito que desarrollar un sitio web para la empresa Produsal, te voy pasando
los recursos y te doy el contrato de trabajo en este documento, tienesque
seguirlo y cumplirlo, aca se aclara lo que se quiere lograr y como se quiere
lograr.

Uno de los requisitos indispensables es el diseño responsive y que es una web
enfocada al multi idioma, de momento sera ingles y español, los trabajaremos con
diccionarios de datos en .json, con next crearemos una carpeta (lang), que con
el proxy (antes middleware) se encargara de redirigir al usuario al idioma que desea, segun su
navegador y en las pages se consultara que idioma viene del usuario y se
inyectara en la pagina pages.tsx arriba del header ira una barra delgada con los
idiomas los logos en el extremo para que el usuario pueda seleccionarlo

```
app/
 ├── [lang]/
 │    ├── page.tsx        (Ruta: /es o /en)
 │    ├── nosotros/
 │    │    └── page.tsx   (Ruta: /es/nosotros o /en/nosotros)
 ├── dictionaries/
 │    ├── es.json
 │    └── en.json
 └── proxy.ts
```

Next.js usa un archivo llamado proxy.ts (en Next 16 reemplaza a middleware.ts,
misma funcionalidad) que se ejecuta antes de que cargue la página. Su trabajo es revisar a los visitantes que entran a la raíz de tu
sitio (tusitio.com) y redirigirlos.

¿Qué hace el proxy exactamente?

Revisa si el usuario ya tiene una cookie con su idioma preferido.

Si no la tiene, lee las cabeceras de su navegador (Accept-Language) para saber
de qué país viene.

Lo redirige automáticamente. Si alguien de México entra a tusitio.com, el
proxy lo manda instantáneamente a [tusitio.com/es](https://tusitio.com/es).

### Tecnologias a usar

- Next.js (16)
- TailwindCSS (4)
- Lucide React
- NodeMailer

### Requisitos al desarrollar

- Buscar la alta cohesion y bajo acoplamiento al crear componentes
- Las pages solo sera para importar componentes
- Los componentes seran las secciones de la pagina, por lo que pueden llamarse
  hero, quienes-somos, etc.
- Los componentes deben ser reutilizables
- Una seccion puede tener varios componentes, el flujo sera asi page > wrapper >
  content. Puedes crear mas niveles si lo consideras necesario.
- Para iconos si hace falta puedes usar lucide react
- Para el formulario usa nodemailer, crea un .env donde iran las credenciales, y
  llamalos en el action send.ts, sera el encargado de la logica para enviar los
  correos
- De ser necesario consulta de datos se pasan como props desde pages hacia los
  hijos,
- Las imagenes deben estar en webp y los videos en webm para optimizar la web
- Para las animaciones de tailwindcss busca crearlas para el rehuso, no crees
  por crear, verifica funcioanmientos y crea en funcion de reutilizacion del
  codigo

### Colores Marca

Blanco es el que tiene mas presencia, fondo blanco letras azules para titulos,
si es fondo azul es letras blancas, los demas colores permiten resaltar o para
elementos dentro de los fondos.

Colores Primarios Oficiales:
- #183c6b (Azul Oscuro Oficial) Fondos corporativos, encabezados, títulos.
- #02aeaa (Azul Claro / Turquesa Oficial) Acentos primarios, interactividad, enlaces.

Colores Secundarios Oficiales:
- #85b2cf (Azul Secundario / Celeste Costero) Sal marina estándar, acentos marítimos, bordes secundarios.
- #e5c798 (Arena / Dorado Solar) Cristalización solar, hitos históricos, calidad y calidez.

Neutros:
- #ffffff (Blanco) Fondos
- #000000 / #0f172a (Negro / Carbón) Textos principales

### Tipografias

- Work Sans (Textos)
- Avenir (Titulos y Subtitulos)

Reemplazan a Montserrat y Gilroy del brief original por decision del cliente.

para los spans dependen de su importancia si es menu avenir si son listas o
resaltar colores dependen de que tipografia esten envueltos

### Reglas de contenido (revision del cliente)

Aplican a toda la web, en español e ingles, y a cualquier texto nuevo.

- No mostrar participacion de mercado ni cifras que cambian cada año (65%,
  "% del mercado", ventas anuales, consumo nacional por año). Son metricas
  internas del cliente.
- Decir "sal industrial", no "sal marina" (en ingles "industrial salt", no
  "sea salt"). No usar "marino/marina" para describir el producto.
- No mencionar el Golfo. El origen es la cienaga de Los Olivitos, una laguna
  salada alimentada por el Mar Caribe.
- Usar "principal" en lugar de "mayor" para la empresa o la salina (en ingles
  "leading"). Excepciones: "al mayor" (venta mayorista) y "la mayor colonia de
  flamencos".
- Palabras prohibidas: "soberania" (usar "autonomia productiva" o
  "abastecimiento"), "certificado/certificada" (solo se permite en la politica
  de privacidad), "doble lavado" (es "lavado continuo"), "especialmente
  formulada".
- No presentar la sal como producto alimenticio ni de "grado alimentario".
  La unica mencion permitida es "materia prima para el sector alimentario".
- Capacidad: 650.000 TM/año, sin "instalada". No usar 800.000 TM.
- No publicar metricas operativas internas (lineas de lavado de 300 TM/h).
- "Mas de 20 años" de trayectoria.
- No decir "internacional" sobre el alcance comercial (si se permite en
  "Humedal Ramsar de Importancia Internacional").
- Especificaciones de producto: la fuente es la ficha tecnica PDF
  (public/docs/fichas). Formato "mín/máx" (no "≤/≥"), sin densidad. En
  tarjetas solo pureza y humedad.
- Big Bags sin tonelaje (hay varias presentaciones). La Sal Bruta Tipo A no se
  ofrece en sacos de 20 kg.
- Coordenadas de la planta: 10.781482, -71.415893. Viven solo en
  data/plant-location.ts.
- Iconos solo si estan relacionados con el contenido.

### Secciones y Textos

#### 404

La pagina que estas buscando no existe.

Boton Volver al inicio

#### En Construccion

Estamos construyendo un nuevo espacio.

Boton Volver al inicio

#### Header

Para mobile debe tener un menu hamburger con animaciones de entrada y salida
para el suavizado, y debe tener menu y boton de contactanos que lleve a la
seccion (no lleva boton de intranet)

Logo

Menu:

No se que hace produsal pero es una compañia que produce sal en venezuela

#### Footer

Logo, lo tienes en la carpeta raiz, colocala en public/images cuando crees el
proyecto

Texto

Redes (falsas de momento )

Navegacion Rapida:

No se que hace produsal pero es una compañia que produce sal en venezuela

Informacion de Contacto

Boton para subir de nuevo al inicio

Barra de abajo en negro o azul con los copyright y desarrollado by El Conejo Del
Sombrero, colocaras copyright el nombre de la empresa y su rif de momento falso
