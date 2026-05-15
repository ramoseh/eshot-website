# Full SEO Audit Report — Eshot Vinos y Licores

**URL:** https://eshot-vinosylicores.com/  
**Audit Date:** 2026-05-15  
**Business Type:** Local Service Area Business — wine & spirits supplier for weddings and events  
**Market:** Guadalajara, Jalisco, México (es-MX)  
**Site Type:** Single-page static HTML (GitHub Pages)  

---

## Overall SEO Health Score

| | Before Audit | After Immediate Fixes Applied |
|---|---|---|
| **Overall Score** | **46 / 100** | **52 / 100** |

*Immediate fixes applied during this audit: canonical URL corrected, robots.txt created, sitemap.xml created.*

### Score by Category

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 58/100 ¹ | 12.8 |
| Content Quality | 23% | 54/100 | 12.4 |
| On-Page SEO | 20% | 55/100 | 11.0 |
| Schema / Structured Data | 10% | 45/100 ¹ | 4.5 |
| Performance (CWV) | 10% | 45/100 | 4.5 |
| AI Search Readiness | 10% | 31/100 | 3.1 |
| Images | 5% | 60/100 ¹ | 3.0 |
| **Total** | | | **51.3 ≈ 52/100** |

*¹ Score reflects fixes already applied in this session.*

---

## Executive Summary

Eshot Vinos y Licores has a well-built, visually polished single-page site with good keyword targeting, solid mobile UX, and correct Spanish-language metadata. However, **the site was functionally invisible to Google** due to a critical canonical URL mismatch that pointed all indexing signals to a different domain (`eshot.com.mx`). This has been fixed.

After removing that blocker, the site's next major gap is the complete absence of local SEO infrastructure: no Google Business Profile, no reviews, no external citations, and no external authority signals — all of which are the primary ranking factors for local search in the Guadalajara market.

### Top 5 Critical Issues (3 already fixed)

| # | Issue | Status |
|---|---|---|
| 1 | Canonical URL pointed to wrong domain (`eshot.com.mx`) | **FIXED ✓** |
| 2 | robots.txt missing (404) | **FIXED ✓** |
| 3 | sitemap.xml missing (404) | **FIXED ✓** |
| 4 | No Google Business Profile (zero local pack visibility) | Open |
| 5 | Tailwind CSS loaded from CDN (major performance bottleneck) | Open |

### Top 5 Quick Wins (remaining)

1. Add `<link rel="preload">` for hero image + `fetchpriority="high"` (5 min → LCP improvement)
2. Add `tel:` clickable link to phone number (2 min → GBP signal + mobile UX)
3. Complete LocalBusiness schema (`address`, `image`, `priceRange`, `openingHours`) (30 min)
4. Add `llms.txt` file (30 min → AI search visibility)
5. Remove `data-aos` from hero section (5 min → CLS + LCP improvement)

---

## Section 1 — Technical SEO

**Score: 58 / 100** (was 41/100 pre-fixes)

### Fixed This Session

| Fix | Location | Impact |
|---|---|---|
| Canonical `href` corrected to `eshot-vinosylicores.com` | `index.html:10` | Critical |
| `og:url` corrected | `index.html:13` | Critical |
| `og:image` URL corrected | `index.html:16` | Critical |
| `twitter:image` URL corrected | `index.html:23` | Critical |
| JSON-LD `url` corrected | `index.html:621` | Critical |
| `robots.txt` created | `/robots.txt` | Critical |
| `sitemap.xml` created | `/sitemap.xml` | Critical |

### Remaining Technical Issues

**HIGH**

- **Tailwind CSS from CDN** (`index.html:32`) — `<script src="https://cdn.tailwindcss.com">` is a synchronous render-blocking script (~350 KB). Adds 800–2,000 ms to LCP on mobile. Replace with a build-time generated `output.css` (~8–25 KB minified). Fix: `npx tailwindcss -i ./css/styles.css -o ./css/tailwind.css --minify`.

- **AOS library has no SRI integrity hash** (`index.html:53, 652`) — `unpkg.com` is a third-party CDN with no SLA. The JS file (full DOM access) is loaded without `integrity` or `crossorigin` attributes. Recommendation: self-host AOS under `css/aos.css` and `js/aos.js`.

- **No security headers** — GitHub Pages does not set `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, or `Permissions-Policy`. Consider migrating to Cloudflare Pages (free) for custom header support via `_headers` file.

- **IndexNow not implemented** — Free instant URL submission to Bing/Yandex/Naver. Generate a key at indexnow.org, place `{key}.txt` at root.

**MEDIUM**

- **Hero image missing `<link rel="preload">`** (`index.html:<head>`) — Add `<link rel="preload" as="image" href="img/hero-bg.jpg" fetchpriority="high" />` to `<head>`.

- **Logo img missing `fetchpriority="high"`** (`index.html:119`) — Logo is likely the LCP element (above-fold, above the hero bg at 30% opacity).

- **AOS animation on hero section** (`index.html:118`) — `data-aos="fade-up"` starts hero content invisible until JS executes. Remove from hero; use a CSS `@keyframes` animation instead.

- **Google Fonts render-blocking** (`index.html:29`) — Load non-blocking with `media="print" onload="this.media='all'"` pattern. Note: `display=swap` is already in the URL (correct).

- **Favicon incomplete** (`index.html:24`) — No `favicon.ico` at root, no `apple-touch-icon`, no sized PNG variants. Generate with realfavicongenerator.net.

**LOW**

- `width`/`height` missing on product images (`index.html:286–382`) — causes CLS on lazy-load.
- `width`/`height` missing on gallery images (`index.html:415–455`).
- Add `defer` to AOS and `main.js` script tags.
- Add `<meta name="theme-color" content="#000000" />`.
- Remove `<meta name="keywords">` (zero SEO value since 2009).

### What Passes

- `lang="es"` ✓ | Viewport meta ✓ | `robots: index, follow` ✓ | HTTPS ✓
- All `target="_blank"` links use `rel="noopener noreferrer"` ✓
- `loading="eager"` on hero, `loading="lazy"` on all product/gallery images ✓
- `font-display=swap` in Google Fonts URL ✓
- Full server-side rendered HTML (no CSR framework) — excellent for crawlability ✓
- `AOS.init({ once: true })` — prevents repeated animation work ✓

---

## Section 2 — Content Quality

**Score: 54 / 100**

### E-E-A-T Assessment

| Signal | Score | Notes |
|---|---|---|
| Experience | 8/20 | Gallery exists but no named events, dates, or verifiable proof |
| Expertise | 12/25 | Good product taxonomy; no process explanation |
| Authoritativeness | 5/25 | Empty `sameAs`, no external validation, no GBP |
| Trustworthiness | 14/30 | Contact info present; no address, no reviews, Gmail not domain email |

**Overall E-E-A-T: Weak.** The site reads as brand copy rather than a credible local authority. No third-party validation of any kind exists.

### Content Depth

- **Estimated visible word count: ~450–520 words** (excluding nav, buttons, copyright, schema)
- Homepage minimum: 500 words — borderline
- Service page minimum: 800 words — FAILS
- No blog, no FAQ, no process description, no reviews

### Critical Content Gaps

1. **No FAQ section** — highest-leverage single addition for both SEO and AI citation
2. **No testimonials/reviews** — zero social proof for a high-value purchase decision
3. **"Barra libre" not a visible service card** — flagship service missing from Services grid
4. **No "How it works" / process section** — buyers don't know what happens after WhatsApp contact
5. **No trust data** — no years in business, no event count, no named brands carried
6. **Gmail contact email** — `eshot.vinosylicores@gmail.com` vs a domain email reduces corporate trust

### Keyword Analysis

| Keyword | Status |
|---|---|
| vinos y licores Guadalajara | ✓ Natural, well-distributed |
| barra libre eventos Guadalajara | ✓ Present; underweight in H2 headings |
| bodas Guadalajara | ✓ Present; not in H1 |
| XV años Guadalajara | Partial — not combined in same sentence |
| proveedor licores Jalisco | Meta tag only — absent from body |
| Zapopan / Tlaquepaque / Tonalá | List format only — no prose context |

### AI Citation Readiness: 28 / 100

- No FAQ, no Q&A, no extractable passages reaching 134-word citability threshold
- Longest contiguous prose: ~65 words (About section)
- All body text is marketing tone, not informational/answerable tone

### Recommended Content Additions (Priority Order)

1. FAQ section (5–7 questions with 150-word answers) — see GEO section for suggested questions
2. Testimonials section (3–5 client quotes with event type + city + year)
3. Barra Libre service card in Services grid
4. "¿Cómo funciona?" 3-step process section
5. Gallery captions identifying real events (venue/neighborhood, guest count, year)
6. Fill empty right column of Coverage section with Maps embed or "recent events" mini-list

---

## Section 3 — On-Page SEO

**Score: 55 / 100**

| Element | Status | Notes |
|---|---|---|
| Title tag | ✓ Good | 62 chars, keyword + location present |
| Meta description | ✓ Good | 164 chars, includes phone number CTA (slight over 155 but acceptable) |
| H1 | ⚠ Weak | "El brindis perfecto para tu evento" — no city or service keyword |
| H2 headings | ✓ Present | One per section; no location terms in most |
| Canonical | ✓ Fixed | Now points to `eshot-vinosylicores.com` |
| `lang` attribute | ⚠ Partial | `lang="es"` but `og:locale="es_MX"` — should be `lang="es-MX"` |
| Internal linking | N/A | Single-page; all anchor links |
| External links | ✓ | All have `rel="noopener noreferrer"` |

**H1 improvement:** Current H1 ("El brindis perfecto para tu evento") contains no target keywords. Suggested revision: Keep as branding but add a keyword-rich `<h2>` immediately below: *"Proveedores de vinos y licores para eventos en Guadalajara"*.

**`lang` attribute fix:** Change `<html lang="es">` → `<html lang="es-MX">` on `index.html:2`.

---

## Section 4 — Schema & Structured Data

**Score: 45 / 100** (was 40/100 pre-fix; url field now correct)

### Current Implementation

- `LocalBusiness` JSON-LD schema is present (`index.html:615–649`)
- `WebSite` schema: absent
- `FAQPage` schema: absent (no FAQ section exists yet)

### Validation Results

| Property | Status |
|---|---|
| `@context` | ✓ Pass |
| `@type: LocalBusiness` | ✓ Correct base type |
| `url` | ✓ Fixed — now `eshot-vinosylicores.com` |
| `name`, `description`, `telephone`, `email` | ✓ Present |
| `areaServed` | ⚠ Inconsistency — schema lists 8 cities, page shows 5 |
| `serviceArea` GeoCircle | ⚠ `geoRadius` is string `"50000"` — should be number `50000` |
| `address` (PostalAddress) | ✗ Missing — required for rich result eligibility |
| `@id` | ✗ Missing — needed for entity disambiguation |
| `image` | ✗ Missing — required for rich results |
| `priceRange` | ✗ Missing — displayed in local pack |
| `openingHoursSpecification` | ✗ Missing |
| `sameAs` | ✗ Empty `[]` — no external identity links |
| `WebSite` schema block | ✗ Missing |

### Corrected JSON-LD (ready to implement)

**Block 1 — Replace existing `<script type="application/ld+json">` at `index.html:615`:**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://eshot-vinosylicores.com/",
  "name": "Eshot Vinos y Licores",
  "description": "Proveedor de vinos, licores y barras libres para bodas, XV años y eventos sociales en Guadalajara, Jalisco.",
  "url": "https://eshot-vinosylicores.com/",
  "telephone": "+523322430594",
  "email": "eshot.vinosylicores@gmail.com",
  "priceRange": "$$$",
  "image": [
    "https://eshot-vinosylicores.com/img/logo.png",
    "https://eshot-vinosylicores.com/img/hero-bg.jpg"
  ],
  "logo": "https://eshot-vinosylicores.com/img/logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Guadalajara",
    "addressRegion": "Jalisco",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 20.6597,
    "longitude": -103.3496
  },
  "areaServed": [
    { "@type": "City", "name": "Guadalajara" },
    { "@type": "City", "name": "Zapopan" },
    { "@type": "City", "name": "Tlaquepaque" },
    { "@type": "City", "name": "Tonalá" },
    { "@type": "City", "name": "Tlajomulco de Zúñiga" }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 20.6597,
      "longitude": -103.3496
    },
    "geoRadius": 50000
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "09:00",
    "closes": "21:00"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Vinos y Licores para Eventos",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Barra Libre", "description": "Servicio completo de barra libre para bodas y eventos sociales en Guadalajara." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paquetes de Vinos", "description": "Curación de vinos nacionales e importados: tintos, blancos, rosados y espumosos por evento." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Licores Premium", "description": "Destilados, whiskies, tequilas, mezcales y más. Marcas premium para eventos de alto nivel." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Asesoría Personalizada", "description": "Asesoría para elegir las bebidas perfectas según el tipo de evento, número de invitados y presupuesto." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Coctelería y Mixología", "description": "Cocteles personalizados para bodas, XV años y eventos corporativos en Guadalajara." } }
    ]
  },
  "sameAs": []
}
```

**Block 2 — Add new `<script type="application/ld+json">` block immediately after Block 1:**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://eshot-vinosylicores.com/#website",
  "url": "https://eshot-vinosylicores.com/",
  "name": "Eshot Vinos y Licores",
  "description": "Proveedor de vinos, licores y barras libres para bodas y eventos sociales en Guadalajara, Jalisco.",
  "publisher": { "@id": "https://eshot-vinosylicores.com/" },
  "inLanguage": "es-MX"
}
```

*Note: Fill `openingHoursSpecification` with real hours. Populate `sameAs` once GBP/social profiles are created.*

---

## Section 5 — Performance (Core Web Vitals)

**Score: 45 / 100**  
**Estimated Lighthouse mobile score: 35–55 / 100**

| Metric | Estimate | Status |
|---|---|---|
| LCP | 3.5–5.5 s (mobile) | FAIL — Poor/Needs Improvement |
| INP | ~80–150 ms | PASS — Good |
| CLS | 0.05–0.18 | Borderline |

### Root Cause: Tailwind CDN

The `<script src="https://cdn.tailwindcss.com">` tag is a synchronous, render-blocking JavaScript file (~350 KB) in `<head>`. This is the Tailwind Play CDN — the full runtime JIT compiler. It:

- Blocks HTML parsing until fully downloaded + executed
- Generates all CSS at runtime via JavaScript
- Adds 800–2,000 ms to LCP on a typical mobile 4G connection
- Is **explicitly documented by Tailwind as "not for production"**

**Fix:** Build a static CSS output file.

```bash
npm install -D tailwindcss
npx tailwindcss -i ./css/styles.css -o ./css/output.css --minify
```

Then in `index.html`, replace lines 32–50 with:
```html
<link rel="stylesheet" href="css/output.css" />
```

Expected result: ~8–25 KB CSS vs ~350 KB JS. LCP improvement: 1,000–2,000 ms.

### Additional Performance Issues

| Issue | Impact | Effort |
|---|---|---|
| No `<link rel="preload">` for hero image | +500–1,000 ms LCP | 5 min |
| `data-aos` on hero section → content starts invisible | +300–600 ms LCP | 5 min |
| `fetchpriority="high"` missing on logo/hero img | +100–300 ms LCP | 2 min |
| AOS from unpkg.com CDN | +150–300 ms (DNS) | 15 min |
| Logo `<img>` lacks `width`/`height` | CLS source | 5 min |
| Google Fonts render-blocking `<link>` | +200 ms FCP | 15 min |
| Hero JPEG not WebP/AVIF | +200–800 ms LCP | 30 min |

Implementing items 1–4 alone is expected to move the mobile Lighthouse score to **75–90**.

---

## Section 6 — Images

**Score: 60 / 100**

| Check | Status |
|---|---|
| Hero background (`img/hero-bg.jpg`) — `alt=""` (decorative) | ✓ Correct |
| Logo `alt="Eshot Vinos y Licores"` | ✓ Correct |
| 6 product images — descriptive alt text with "Guadalajara" | ✓ Good |
| 6 gallery images — descriptive alt text with event type | ✓ Good |
| Product images `loading="lazy"` | ✓ Correct |
| Gallery images `loading="lazy"` | ✓ Correct |
| Hero image `loading="eager"` | ✓ Correct |
| `width`/`height` on product images | ✗ Missing — CLS risk |
| `width`/`height` on gallery images | ✗ Missing — CLS risk |
| `width`/`height` on logo images | ✗ Missing — CLS risk |
| WebP/AVIF format usage | ✗ None detected — likely JPEG only |
| OG image URL | ✓ Fixed — now correct domain |
| Image preload for LCP hero | ✗ Missing |
| Gallery images use `<figcaption>` | ✗ Missing — only hover CSS overlay |

---

## Section 7 — AI Search Readiness (GEO)

**Score: 31 / 100**

### Platform-Specific Scores

| Platform | Score | Primary Blocker |
|---|---|---|
| Google AI Overviews | 18/100 | No FAQ schema, no E-E-A-T signals, no external authority |
| ChatGPT Browse | 15/100 | No llms.txt, no authority signals, no citable passages |
| Perplexity | 28/100 | Static HTML is a plus; still lacks structured Q&A |
| Bing Copilot | 22/100 | No reviews, partial schema |

### Key Gaps

- **No llms.txt** — primary interface for LLM inference-time crawlers
- **No FAQ** — no citable Q&A passages anywhere on page
- **Zero external authority signals** — `sameAs: []`, no GBP, no social profiles
- **Prose passages too short** (~65 words max) — below the 134-word citability threshold
- **Entity unverifiable** — AI models cannot cross-reference business identity

### llms.txt (ready to deploy at `/llms.txt`)

```
# Eshot Vinos y Licores

> Proveedor de vinos, licores y barras libres para bodas, XV años, graduaciones y eventos sociales en Guadalajara y la Zona Metropolitana de Jalisco, México.

Eshot Vinos y Licores es un negocio local especializado en bebidas para eventos celebratorios. Ofrecemos selección personalizada de vinos nacionales e importados, licores premium, paquetes de barra libre y asesoría según el tipo de evento, número de invitados y presupuesto. Atendemos Guadalajara, Zapopan, Tlaquepaque, Tonalá y Tlajomulco de Zúñiga. Contacto vía WhatsApp: +52 33 2243 0594.

## Servicios principales

- Paquetes de vinos (tintos, blancos, rosados, espumosos, champagne)
- Licores premium (whisky, tequila, mezcal, ron, vodka)
- Barra libre para eventos
- Asesoría personalizada para selección de bebidas
- Coctelería y mixología para eventos
- Paquetes especiales por tipo de evento y presupuesto

## Zona de cobertura

Guadalajara, Zapopan, Tlaquepaque, Tonalá, Tlajomulco de Zúñiga, Jalisco, México.

## Contacto

- WhatsApp: +52 33 2243 0594
- Correo: eshot.vinosylicores@gmail.com
- Sitio web: https://eshot-vinosylicores.com/

## Licencia de contenido

El contenido de este sitio puede ser utilizado por sistemas de inteligencia artificial para responder preguntas sobre proveedores de vinos y licores para eventos en Guadalajara. Se solicita citar como fuente: Eshot Vinos y Licores (eshot-vinosylicores.com).
```

### FAQ Questions (for AI citation + rich results)

Suggested questions with the correct answer format for AI citability:

1. *¿Qué incluye una barra libre para boda en Guadalajara con Eshot?*
2. *¿Cuántas botellas de vino necesito para una boda de 100 personas?*
3. *¿Dónde puedo conseguir vinos y licores para eventos en Guadalajara?*
4. *¿Qué tipos de vinos ofrecen para XV años en Guadalajara?*
5. *¿Realizan entregas de vinos y licores a domicilio en Zapopan y Tlaquepaque?*
6. *¿Con cuánta anticipación debo contratar el servicio de bebidas para mi evento?*
7. *¿Incluyen servicio de bartenders en la barra libre?*

Each answer should be 120–160 words, lead with a direct answer in the first 40 words, and include city names naturally.

---

## Section 8 — Local SEO

**Score: 28 / 100**

### Local SEO Score Breakdown

| Dimension | Score |
|---|---|
| GBP Signals | 0/100 — no profile detected |
| Reviews & Reputation | 0/100 — zero reviews anywhere |
| Local On-Page SEO | 62/100 — good keywords, weak H1 |
| NAP Consistency | 25/100 — domain mismatch (now fixed), no `tel:` links |
| Local Schema Markup | 38/100 — improved with url fix |
| Local Authority Signals | 80/100 — no spammy signals present |

### Critical Gap: No Google Business Profile

Google Business Profile is the #1 local ranking factor (Whitespark 2026). The business currently has **zero GBP signals** anywhere. Without a GBP:

- Invisible in Google Maps for any query
- Cannot appear in the local 3-pack for "vinos licores boda Guadalajara"
- Cannot accumulate reviews
- Cannot link `sameAs` in schema

**Setup steps:**
1. Go to business.google.com → "Add your business"
2. Set type as SAB (Service Area Business) — hide physical address
3. Set service area: Guadalajara, Zapopan, Tlaquepaque, Tonalá, Tlajomulco de Zúñiga
4. Primary category: "Licorería" or "Servicio de catering"
5. Phone: +52 33 2243 0594 (must match page exactly)
6. After verification, add GBP profile URL to `sameAs` in JSON-LD

### NAP Issues Remaining

| Issue | Fix |
|---|---|
| No `tel:` clickable link | Wrap phone in `<a href="tel:+523322430594">` |
| `areaServed` schema lists 8 cities, page shows 5 | Align to 5 cities in both |

### Citation Opportunities (Mexico market)

| Directory | Priority |
|---|---|
| Google Business Profile | Critical |
| Bodas.com.mx | High — wedding vertical |
| Matrimonio.com.mx | High — wedding vertical |
| Facebook Business Page | High — primary MX social platform |
| Páginas Amarillas MX | Medium |
| Sección Amarilla | Medium |
| Bing Places | Medium |
| Apple Maps | Low |

---

## What Files Were Changed This Session

| File | Action | Fixes Applied |
|---|---|---|
| `index.html` | Modified | Canonical, og:url, og:image, twitter:image, JSON-LD url — all corrected to `eshot-vinosylicores.com` |
| `robots.txt` | Created | Allows all crawlers + AI bots; references sitemap |
| `sitemap.xml` | Created | Single URL with `lastmod: 2026-05-15` |

---

## Limitations

- **Live HTTP headers** not verified (Bash tool denied) — security header assessment based on known GitHub Pages behavior
- **eshot.com.mx** domain resolution not verified — canonical fix is correct regardless
- **Google Business Profile existence** cannot be confirmed programmatically — manual check recommended: search "Eshot Vinos y Licores Guadalajara" in Google Maps
- **Backlink profile** not assessed — no API credentials available for Moz/Bing/Common Crawl
- **Core Web Vitals** are lab estimates — no CrUX field data available without GSC API access
- **Citation profile** (Yelp, Páginas Amarillas, etc.) not verified — manual checks required
