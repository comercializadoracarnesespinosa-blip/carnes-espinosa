# Carnes Espinosa

Sitio web en Next.js + Tailwind CSS para mostrar la lista de precios digital de Carnes Espinosa y compartirla por WhatsApp o mediante QR en el local.

La página está enfocada en:
- Carnicería tradicional
- Cortes selectos
- Productos para la mesa diaria
- Preparados y especialidades
- Empacado al Alto Vacío
- Reparto a domicilio

## Requisitos

- Node.js LTS reciente
- npm

## Instalar dependencias

```bash
npm install
```

Recomendación para producción:
- Después de `npm install`, conserva el archivo `package-lock.json` para que Vercel construya siempre con las mismas versiones resueltas.

## Desarrollo local

```bash
npm run dev
```

Después abre [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm run start
```

`npm run build` debe pasar antes de publicar en Vercel.

## Editar precios

Edita [data/precios.json](data/precios.json).

Estructura principal:
- `promociones`: tarjetas editables integradas arriba de la lista.
- `categorias`: grupos visibles en la sección de precios.
- `categorias[].productos[]`: productos individuales.

Campos útiles por producto:
- `nombre`: nombre visible.
- `precio`: número para precio fijo.
- `unidad`: por ejemplo `kg` o `servicio`.
- `unidadLabel`: texto corto como `Por kilo`.
- `descripcion`: texto opcional.
- `destacado`: `true` o `false`.
- `displayPrice`: texto como `Cotiza por WhatsApp` cuando `precio` sea `null`.

Ejemplo con precio fijo:

```json
{
  "nombre": "Bistec de centro",
  "precio": 260,
  "unidad": "kg",
  "unidadLabel": "Por kilo"
}
```

Ejemplo sin precio fijo:

```json
{
  "nombre": "Empacado al Alto Vacío",
  "precio": null,
  "unidad": "servicio",
  "unidadLabel": "Servicio",
  "displayPrice": "Cotiza por WhatsApp"
}
```

## Editar datos del negocio

Edita [data/negocio.json](data/negocio.json).

Campos importantes:
- `whatsappDisplay`: número visible en la página.
- `whatsappNumber`: número con lada para enlaces `wa.me`.
- `whatsappMessage`: mensaje base de pedidos.
- `whatsappUrl`: enlace completo si quieres fijarlo manualmente.
- `logo`: ruta, texto alternativo y medidas del logo principal.
- `ubicacion` y `ubicacionCorta`: dirección visible.
- `ubicacionTexto`: apoyo para ubicar el local dentro del mercado.
- `googleMapsUrl`: enlace del botón `Cómo llegar`.
- `googleMapsQuery`: texto usado para el mapa embebido.
- `googleMapsTodo`: recordatorio editable si aún falta confirmar la URL exacta.
- `horario`: bloque visible con horario temporal.
- `instagram` y `facebook`: enlaces públicos del negocio.
- `facebookTodo`: recordatorio editable si aún falta la URL exacta de Facebook.
- `seo`: `title`, `description`, `keywords` y `twitterCard`.
- `seoTodo`: recordatorio editable para dominio, canonical e imagen OG/Twitter.
- `heroTitle`, `heroSubtitle`, `heroText`: contenido principal de portada.
- `vacuumTitle`, `vacuumText`, `vacuumBenefits`: sección de Empacado al Alto Vacío.
- `trustText` y `footerNote`: textos institucionales.

Si quitas `whatsappUrl`, la app puede reconstruir el enlace usando `whatsappNumber` y `whatsappMessage`.

## Agregar o reemplazar el logo

- Coloca el archivo del logo dentro de `public/branding/`.
- La ruta actual conectada a la pagina es `public/images/logo-carnes-espinosa.png`.
- Si reemplazas ese archivo por tu logo final y conservas el mismo nombre, no necesitas cambiar codigo.
- Si usas otro nombre o formato, actualiza el bloque `logo` en `data/negocio.json`.

## Checklist local antes de publicar

```bash
npm install
npm run build
npm run start
```

Revisa en navegador:
- Móvil, tablet y escritorio
- Botones de WhatsApp
- Botón de Google Maps
- Lista de precios y promociones
- Sección de Alto Vacío
- Footer y botón flotante sin tapar contenido

## Publicar en Vercel

1. Sube el proyecto a un repositorio en GitHub.
2. Verifica que `npm run build` pase localmente.
3. Confirma que el repositorio incluya `package-lock.json`.
4. Entra a [Vercel](https://vercel.com/).
5. Crea un proyecto nuevo e importa el repositorio.
6. Vercel detectará automáticamente Next.js.
7. Haz clic en `Deploy`.
8. Cuando termine, abre la URL de preview y revisa:
   - WhatsApp
   - Google Maps
   - responsive móvil
   - textos SEO básicos
9. Si todo está correcto, publica la versión final.

## TODOs pendientes

- Confirmar la URL exacta de Google Maps del negocio para reemplazar el enlace de búsqueda actual.
- Confirmar la URL exacta de Facebook si se quiere reemplazar la búsqueda pública actual.
- Definir dominio oficial para agregar `metadataBase` y `canonical`.
- Crear imagen Open Graph / Twitter para compartir mejor en redes.
- Confirmar si el horario temporal debe mantenerse o actualizarse.
- Generar y subir `package-lock.json` después de `npm install`.
