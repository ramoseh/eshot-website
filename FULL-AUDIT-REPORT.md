# SEO Audit — Eshot Vinos y Licores
**URL:** https://eshot-vinosylicores.com  
**Fecha:** 2026-05-15  
**Tipo de negocio:** Local SAB (Service Area Business) — Proveedor de vinos y licores para eventos  
**Mercado:** Guadalajara y Zona Metropolitana, Jalisco, México  
**Páginas crawleadas:** 1 (sitio de una sola página)

---

## SEO Health Score: 61 / 100

| Categoría | Peso | Score | Ponderado |
|---|---|---|---|
| Technical SEO | 22% | 74/100 | 16.3 |
| Content Quality | 23% | 41/100 | 9.4 |
| On-Page SEO | 20% | 65/100 | 13.0 |
| Schema / Structured Data | 10% | 70/100 | 7.0 |
| Performance (CWV) | 10% | 73/100 | 7.3 |
| AI Search Readiness | 10% | 54/100 | 5.4 |
| Images | 5% | 45/100 | 2.3 |
| **Total** | **100%** | | **61** |

---

## Resumen Ejecutivo

**Negocio:** Eshot Vinos y Licores — proveedor de vinos, licores y asesoría de bebidas para bodas, XV años y eventos sociales en Guadalajara.

**Fortalezas principales:**
- HTML estático renderizado en servidor — indexable al 100% sin JavaScript
- robots.txt con permisos explícitos para AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot)
- llms.txt presente — GEO readiness por encima del promedio del mercado local
- LocalBusiness schema bien estructurado con `areaServed`, `geo`, `openingHoursSpecification`
- Tailwind CSS compilado localmente (15.5 KB vs 350 KB CDN)
- Imágenes con `width`/`height` explícitos — CLS prevenido correctamente
- Google Fonts cargado con patrón `media="print" onload` — no bloquea render
- TTFB excelente via Fastly CDN (GitHub Pages) — 60–180ms desde México

**Top 5 problemas críticos:**
1. GBP (Google Business Profile) — estado de verificación desconocido, sin reseñas
2. Cero reseñas en cualquier plataforma — local pack bloqueado
3. Imagen hero (988 KB JPG) — LCP mobile ~3–4s
4. Contenido delgado — ~380 palabras, sin FAQ, sin testimonials, sin autor identificado
5. Sin citas en directorios de bodas (Bodas.com.mx, Matrimonio.com.mx)

**Top 5 quick wins (ya aplicados o de bajo esfuerzo):**
1. ✅ AOS CSS no-bloqueante (aplicado esta sesión) — FCP -100–400ms
2. ✅ Schemas corregidos (esta sesión) — validación limpia en Rich Results Test
3. ✅ llms.txt reescrito (esta sesión) — AI accuracy restaurada
4. Comprimir hero-bg.jpg → WebP ≤180 KB — LCP mobile -1.5s
5. Agregar sección FAQ (8 preguntas) + FAQPage schema

---

## 1. Technical SEO — 74/100

### Crawlabilidad e Indexabilidad

| Check | Estado | Nota |
|---|---|---|
| robots.txt | ✅ PASS | Permite todos los bots, AI bots explícitos |
| Sitemap XML | ✅ PASS | Namespace 0.9 correcto, `lastmod` actualizado |
| Canonical | ✅ PASS | Self-referencing, URL https correcta |
| Meta robots | ✅ PASS | `index, follow` explícito |
| lang attr | ✅ PASS | `es-MX` en `<html>` |
| JavaScript rendering | ✅ PASS | HTML completamente SSR, sin gates JS |
| HTTPS | ✅ PASS | GitHub Pages + Let's Encrypt auto-renovado |
| Mixed content | ✅ PASS | Todos los recursos externos via https |
| Redirect www→non-www | ⚠️ VERIFICAR | Confirmar en GitHub Pages domain settings |
| Hreflang | N/A | Sitio monolingüe, no aplica |

### Problemas Técnicos por Severidad

**[ALTO] AOS CSS era render-bloqueante — CORREGIDO esta sesión**  
El `<link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">` bloqueaba render 100–400ms en mobile. Aplicado patrón `media="print" onload` + preload. FCP esperado: -100 a -400ms en mobile.

**[ALTO] Sin headers de seguridad (limitación GitHub Pages)**  
GitHub Pages no permite headers HTTP personalizados. Faltan: CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy. Solución óptima: migrar a Cloudflare Pages (free tier, mismo workflow git push) o agregar Cloudflare proxy (header control via `_headers` file o Transform Rules).

**[MEDIO] Favicon incompleto**  
Solo existe `<link rel="icon" type="image/png" href="img/logo.png">` (57 KB). Falta: `favicon.ico` (32×32 para legacy), SVG favicon (escala perfecta en HiDPI), `apple-touch-icon` (180×180 para iOS home screen).

**[BAJO] Sin IndexNow protocol**  
Implementar via GitHub Action que dispara en cada deploy. POST a `https://api.indexnow.org/IndexNow` notifica a Bing/Yandex/Naver instantáneamente del nuevo contenido.

**[BAJO] OG image sin dimensiones declaradas**  
Agregar `og:image:width`, `og:image:height`, `og:image:type` para acelerar generación de social previews en Facebook/LinkedIn.

**[BAJO] Sin SRI en recursos AOS (unpkg.com)**  
Los `<link>` y `<script>` de AOS carecen de atributo `integrity`. Si unpkg.com fuera comprometido, CSS/JS arbitrario se inyectaría sin detección. Calcular SHA-384 y agregar `integrity=` + `crossorigin="anonymous"`.

---

## 2. Content Quality — 41/100

### E-E-A-T Assessment

| Dimensión | Score | Estado |
|---|---|---|
| Experience | 9/20 | Bajo — stats sin evidencia, sin casos reales documentados |
| Expertise | 12/25 | Moderado — taxonomía de productos correcta, sin autor nombrado |
| Authoritativeness | 5/25 | Crítico — 0 reseñas externas, 0 menciones de prensa |
| Trustworthiness | 15/30 | Bajo — Gmail address, sin política de privacidad |

**Conteo de palabras estimado:** ~380 palabras de cuerpo  
**Mínimo recomendado:** 800–1,000 palabras para página de servicio local competitiva

### Problemas Críticos de Contenido

**[CRÍTICO] Sin testimonials verificables**  
"100% clientes satisfechos" y "200+ eventos servidos" son afirmaciones sin respaldo. Google QRG sept-2025 las marca como señal de baja confianza cuando no tienen corroboración. Mínimo necesario: 3–5 testimonials con nombre (o inicial), tipo de evento, ciudad y año.

**[CRÍTICO] Sin sección FAQ**  
Queries de alto intento sin respuesta en el sitio:
- "¿cuántas botellas de vino para una boda de 100 personas?"
- "¿cuánto cuesta una barra libre en Guadalajara?"
- "¿hacen entregas en Zapopan?"
- "¿con cuánta anticipación pedir?"

Una sección FAQ de 8 preguntas con respuestas de 100–150 palabras cada una es la adición de mayor ROI para AI citations y long-tail SEO.

**[ALTO] Sin autor/fundador identificado**  
Ninguna persona física aparece en el sitio. El QRG 2025 exige identidad verificable para servicios de alto costo. Un párrafo con nombre del fundador y background en el sector resuelve esto.

**[ALTO] Propuesta de valor genérica**  
"Servicio personalizado" y "productos de calidad" aparecen en virtualmente todos los competidores. El sitio no explica QUÉ hace a Eshot diferente: ¿curación de catálogo? ¿asesoría cuantitativa de cantidades? ¿precios menores al retail? Identificar y comunicar el diferencial real.

**[MEDIO] Sin información de precios**  
Para servicios de alto costo (bebidas para boda: MXN $15,000–$80,000+), la ausencia total de contexto de precio es una barrera de conversión. Un rango o "desde MXN $X por persona" reduce fricción sin comprometer la negociación.

**[MEDIO] Sin proceso explicado**  
¿Cómo funciona el servicio? ¿Entrega a domicilio o recogida? ¿Incluye staff? ¿Tiempo mínimo de anticipación? Estas preguntas sin respuesta generan fricción en la conversión.

### AI Citation Readiness: 22/100

El sitio carece de pasajes autónomos, citables y factuales. Los sistemas de IA requieren bloques de texto de 134–167 palabras, self-contained, con nombre del negocio y ciudad en las primeras dos oraciones.

---

## 3. On-Page SEO — 65/100

### Análisis de Títulos y Metas

| Elemento | Contenido | Caracteres | Estado |
|---|---|---|---|
| Title | "Eshot — Vinos y Licores para Bodas y Eventos en Guadalajara" | 63 | ✅ PASS |
| Meta description | "Eshot ofrece vinos y licores para bodas, XV años y eventos..." | 171 | ✅ PASS |
| H1 | "El brindis perfecto para tu evento" | — | ⚠️ Sin keyword |
| OG tags | Completos (type, url, title, description, image, locale, site_name) | — | ✅ PASS |
| Twitter card | summary_large_image con todos los campos | — | ✅ PASS |

### Cobertura de Keywords

| Query objetivo | H1 | H2 | Cuerpo | Alt | Schema |
|---|---|---|---|---|---|
| vinos para bodas Guadalajara | ❌ | ❌ | ✅ | ✅ | ✅ |
| licores para eventos Guadalajara | ❌ | ❌ | ✅ | ✅ | ✅ |
| vinos y licores Guadalajara | ❌ | ❌ | ✅ | ❌ | ✅ |
| champagne para XV años Guadalajara | ❌ | ❌ | ❌ | ✅ | ❌ |
| Zapopan (en prosa) | ❌ | ❌ | ✅ (corregido) | ❌ | ✅ |
| Tlaquepaque (en prosa) | ❌ | ❌ | ✅ (corregido) | ❌ | ✅ |

### Problemas On-Page

**[ALTO] H1 sin keyword — recomendación sin tocar el H1**  
Agregar H2 descriptivo inmediatamente debajo del H1:  
`<h2>Proveedores de vinos y licores para bodas y eventos en Guadalajara</h2>`

**[ALTO] Ciudades solo en lista — CORREGIDO esta sesión**  
La prosa de cobertura ahora menciona "Guadalajara, Zapopan, Tlaquepaque, Tonalá y Tlajomulco de Zúñiga" explícitamente con contexto de keyword.

**[BAJO] Enlace telefónico ausente en sección de contacto principal**  
El número de teléfono en el CTA principal está dentro de un link WhatsApp. Para usuarios desktop sin WhatsApp instalado, agregar `<a href="tel:+523322430594">` separado.

---

## 4. Schema / Structured Data — 70/100

### Schemas Actualizados (esta sesión)

**LocalBusiness:**
```json
{
  "@type": ["LocalBusiness", "Store"],
  "@id": "https://eshot-vinosylicores.com/#business",
  "logo": { "@type": "ImageObject", "url": "...", "width": 200, "height": 200 },
  "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", ... }],
  "areaServed": [{ "@type": "Place", "name": "Guadalajara" }, ...],
  "geo": { "latitude": 20.65970, "longitude": -103.34960 }
}
```

Correcciones aplicadas: `@id` con fragmento `#business`, `logo` como ImageObject, `openingHoursSpecification` como array, `areaServed` con tipo `Place` (no `City`), `serviceArea` deprecated eliminado, coordenadas con 5 decimales.

**WebSite:** `publisher @id` corregido a `#business`.

### Problemas Pendientes

**[ALTO] Sin FAQPage schema**  
Implementar junto con la sección FAQ del HTML. Es el schema con mayor impacto directo en Google AI Overviews para este tipo de negocio.

**[MEDIO] Sin AggregateRating**  
Agregar cuando GBP tenga 5+ reseñas verificadas. Habilita estrellas doradas en resultados orgánicos.

**[BAJO] Sin Service schema standalone**  
Agregar bloques `Service` individuales con `"provider": {"@id": "#business"}` para que Google indexe entidades de servicio separadas del negocio.

---

## 5. Performance (CWV) — 73/100

### Estimados Core Web Vitals

| Métrica | Desktop | Mobile | Threshold Good | Estado |
|---|---|---|---|---|
| LCP | 1.2–1.8s | 2.5–3.8s | <2.5s | ✅ / ⚠️ |
| CLS | <0.05 | <0.06 | <0.1 | ✅ |
| INP | 40–80ms | 80–150ms | <200ms | ✅ |
| FCP | 0.5–0.9s | 1.2–2.2s | <1.8s | ✅ (mejorado) |
| TTFB | 60–180ms | 80–200ms | <800ms | ✅ |

### Problema Principal: Hero Image

La imagen `hero-bg.jpg` pesa 988 KB — 58% del peso total de la página. Es el elemento LCP en mobile.

**Solución inmediata:**
```bash
# Con sharp (Node.js — ya en el proyecto)
node -e "
const sharp = require('sharp');
sharp('img/hero-bg.jpg').webp({quality:80}).toFile('img/hero-bg.webp');
sharp('img/hero-bg.jpg').avif({quality:60}).toFile('img/hero-bg.avif');
"
```

Luego en el HTML reemplazar el `<img>` del hero por un `<picture>` con `<source>` AVIF, WebP, y JPEG fallback.  
**Impacto esperado:** -1.0 a -1.5s LCP mobile. Score mobile Lighthouse estimado: 65→80+.

### Inventario de imágenes

| Imagen | Tamaño actual | Target WebP |
|---|---|---|
| hero-bg.jpg | 988 KB | ≤180 KB |
| logo.png | 57 KB | ≤15 KB |
| evento-06.jpg | 128 KB | ≤70 KB |
| evento-02.jpg | 98 KB | ≤55 KB |
| destilados.jpg | 87 KB | ≤50 KB |
| (resto ~10 imágenes) | 35–84 KB c/u | ≤40 KB c/u |
| **Total** | **~1.68 MB** | **≤500 KB** |

---

## 6. AI Search Readiness (GEO) — 54/100

| Dimensión | Score |
|---|---|
| Citabilidad de pasajes | 48/100 |
| Legibilidad estructural | 62/100 |
| Contenido multimodal | 40/100 |
| Autoridad y señales de marca | 35/100 |
| Accesibilidad técnica | 83/100 |

### Estado Actual (post-corrección)

✅ **robots.txt** — GPTBot, ClaudeBot, anthropic-ai, PerplexityBot, OAI-SearchBot (añadido)  
✅ **llms.txt** — Reescrito: sin barra libre, +FAQ 4 preguntas, +RSL-1.0 license, +tipos de eventos  
✅ **Schema** — LocalBusiness + WebSite corregidos  
❌ **llms-full.txt** — No existe. Crear para contenido extendido (catálogo de productos, guía de cantidades por evento)  
❌ **FAQPage schema** — Implementar cuando se agregue la sección FAQ  
❌ **Señales externas** — Sin Wikipedia, YouTube, Reddit, Yelp  

### Scores por Plataforma

| Plataforma | Score | Acción principal |
|---|---|---|
| Google AI Overviews | 38/100 | FAQPage schema + AggregateRating |
| ChatGPT (Web Search) | 47/100 | OAI-SearchBot ya habilitado |
| Perplexity | 58/100 | llms.txt mejorado ayuda |
| Bing Copilot | 52/100 | Schema sólido, falta contenido |

---

## 7. Images — 45/100

| Check | Estado |
|---|---|
| Alt text descriptivo en todas las imágenes | ✅ PASS |
| Atributos width/height en todas las imágenes | ✅ PASS |
| loading="lazy" en imágenes non-hero | ✅ PASS |
| fetchpriority="high" en hero | ✅ PASS |
| Formato moderno (WebP/AVIF) | ❌ Ninguna |
| Hero ≤200 KB | ❌ 988 KB |
| Logo optimizado | ❌ PNG 57 KB sin WebP |
| srcset responsive | ❌ Ninguna imagen |

---

## 8. Local SEO — 34/100

| Dimensión | Score |
|---|---|
| GBP Signals | 8/100 |
| Reseñas y Reputación | 0/100 |
| On-Page Local SEO | 68/100 |
| NAP Consistency y Citas | 42/100 |
| Local Schema | 62/100 |
| Autoridad Local y Links | 60/100 |

### GBP — Problema Crítico #1

El GBP es el factor de ranking #1 en local pack (Whitespark 2026, score: 193). Estado:
- Link en schema sameAs confirma que existe un listing en Google Maps
- Estado de verificación: **DESCONOCIDO** — verificar manualmente buscando "Eshot Vinos y Licores Guadalajara" en Google Maps
- Reseñas: 0 en cualquier plataforma

**Si no está verificado:** iniciar verificación inmediatamente (5–7 días hábiles via video o postcard).  
**Categoría GBP recomendada:** Primaria "Licorería" → Secundaria "Servicio de catering"

### Reseñas — Problema Crítico #2

Sin reseñas el negocio no puede aparecer competitivamente en local pack. Las primeras 10 reseñas tienen impacto desproporcionado.

**Estrategia (WhatsApp-first, apropiada para México):**  
3–5 días después de cada evento, enviar mensaje personalizado al cliente con link directo al perfil de reseñas de GBP. El negocio ya tiene la relación WhatsApp establecida — este es el canal de mayor tasa de respuesta.

**Metas:**
- 5 reseñas en 30 días → activa display de estrellas en Maps
- 10 reseñas en 60 días → establece señal de velocidad
- 25 reseñas en 6 meses → umbral competitivo para el vertical de proveedores de bodas en Guadalajara

### NAP Canonical

Usar exactamente este string en todos los directorios:
```
Nombre: Eshot Vinos y Licores
Teléfono: +52 33 2243 0594
Ciudad: Guadalajara, Jalisco, México
Web: https://eshot-vinosylicores.com
Categoría: Licorería / Proveedor de bebidas para eventos
```

### Directorios Prioritarios

| Tier | Directorio | Relevancia | Urgencia |
|---|---|---|---|
| 1 | bodas.com.mx | Alta — vertical bodas | Esta semana |
| 1 | matrimonio.com.mx | Alta — vertical bodas | Esta semana |
| 1 | Bing Places | Media | Esta semana |
| 1 | Apple Maps Connect | Media | Esta semana |
| 2 | zankyou.com.mx | Alta — vertical bodas | 30 días |
| 2 | casamientos.com.mx | Alta — vertical bodas | 30 días |
| 2 | Facebook Business Page | Media | 30 días |
| 3 | Páginas Amarillas MX | Media-baja | 60 días |
| 3 | EventosJalisco.com | Media | 60 días |
| 3 | CANACO Guadalajara | Baja-autoridad | 60 días |

---

## 9. Backlinks

**Estado:** Dominio nuevo (2025-2026), no indexado aún en Common Crawl.  
**DA estimado:** 0–5 (normal para este estadio)

**Oportunidades de link building:**
1. bodas.com.mx, matrimonio.com.mx (alta relevancia vertical, dofollow)
2. Fotógrafos de bodas — menciones naturales cuando fotografían eventos servidos por Eshot
3. Venues y salones de eventos — páginas de proveedores recomendados
4. Directorios MX generales (Páginas Amarillas, HotFrog, Cylex)

**Velocidad recomendada:** 5–10 links/mes mes 1–2, luego 3–8/mes. No comprar paquetes de links.

---

## 10. Correcciones Aplicadas en Esta Sesión (2026-05-15)

| Archivo | Cambio | Impacto |
|---|---|---|
| index.html | `meta description` — eliminado "barras libres" | Precision SERP snippet |
| index.html | `og:description` — eliminado "barras libres" | Social sharing accuracy |
| index.html | `twitter:description` — eliminado "barras libres" | Social sharing accuracy |
| index.html | Hero paragraph — eliminado "barras libres" | Contenido visible |
| index.html | LocalBusiness schema — @id `#business`, logo ImageObject, openingHours array, areaServed Place, serviceArea eliminado, @type `["LocalBusiness","Store"]`, descripción, coordenadas 5 dec. | Validación schema |
| index.html | WebSite schema — publisher @id `#business`, descripción | Resolución grafo JSON-LD |
| index.html | AOS CSS → `media="print" onload` + preload | FCP -100–400ms |
| index.html | Coverage prose → ciudades específicas en prosa | Local keyword signal |
| index.html | Sección servicios — eliminada card "Barra Libre" | Precisión de servicios |
| index.html | Gallery alt text — "barra libre" → "vinos y licores" | Precisión semántica |
| llms.txt | Reescrito completo — sin barra libre, +FAQ, +RSL-1.0, +tipos de eventos | AI accuracy crítica |
| robots.txt | OAI-SearchBot Allow: / | ChatGPT web search crawler |
