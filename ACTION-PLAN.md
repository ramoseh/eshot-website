# SEO Action Plan — Eshot Vinos y Licores

**Generated:** 2026-05-15  
**Current Score:** 52 / 100  
**Target Score:** 78 / 100 (after all High-priority items)  

---

## Already Fixed This Session ✓

These were the most critical issues and have been applied to the codebase:

| Fix | File | Time |
|---|---|---|
| Canonical URL corrected (`eshot.com.mx` → `eshot-vinosylicores.com`) | `index.html:10` | Done |
| `og:url` corrected | `index.html:13` | Done |
| `og:image` URL corrected | `index.html:16` | Done |
| `twitter:image` URL corrected | `index.html:23` | Done |
| JSON-LD `url` field corrected | `index.html:621` | Done |
| `robots.txt` created (allows all crawlers + AI bots) | `robots.txt` | Done |
| `sitemap.xml` created | `sitemap.xml` | Done |

**Commit and deploy these now.** These 7 fixes unblock Google indexing and social sharing.

---

## CRITICAL — Fix Immediately (this week)

### C1 — Create Google Business Profile
**Impact:** +15–25 local ranking positions | **Effort:** 2–4 hours

Google Business Profile is the #1 local ranking factor. Without it the site is invisible in Google Maps and the local 3-pack for every query in the Guadalajara market.

Steps:
1. Go to [business.google.com](https://business.google.com) → Add your business
2. Business type: Service Area Business (hide physical address)
3. Service area: Guadalajara, Zapopan, Tlaquepaque, Tonalá, Tlajomulco de Zúñiga
4. Category: "Licorería" or "Servicio de catering para eventos"
5. Phone: +52 33 2243 0594 (must match exactly what's on the site)
6. Complete verification (postcard/phone/video)
7. Upload all 6 gallery photos after verification
8. After verified: copy the GBP profile URL, add to `sameAs` in `index.html:647`

---

## HIGH — Fix Within 1 Week

### H1 — Replace Tailwind CDN with Build-Time CSS
**Impact:** LCP −1,000–2,000 ms, Lighthouse score +20–35 pts | **Effort:** 1–2 hours

```bash
npm install -D tailwindcss
npx tailwindcss -i ./css/styles.css -o ./css/output.css --minify
```

In `index.html`, replace lines 32–50 (the two `<script>` tags for Tailwind CDN + config) with:
```html
<link rel="stylesheet" href="css/output.css" />
```

Create `css/tailwind-input.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Create `tailwind.config.js` at root with the same color/font config currently in the inline `<script>` block.

---

### H2 — Add Hero Image Preload + fetchpriority
**Impact:** LCP −500–1,000 ms | **Effort:** 5 minutes

Add to `<head>` (after `<meta name="viewport">`):
```html
<link rel="preload" as="image" href="img/hero-bg.jpg" fetchpriority="high" />
```

Update `index.html:113`:
```html
<img src="img/hero-bg.jpg" alt="" class="w-full h-full object-cover opacity-30"
     loading="eager" fetchpriority="high" />
```

Update `index.html:119` (logo is likely the actual LCP element):
```html
<img src="img/logo.png" alt="Eshot Vinos y Licores" class="h-36 w-auto mx-auto mb-8 drop-shadow-2xl"
     fetchpriority="high" />
```

---

### H3 — Remove AOS from Hero Section
**Impact:** LCP −300–600 ms, CLS fix | **Effort:** 5 minutes

Remove `data-aos="fade-up" data-aos-duration="800"` from `index.html:118`.

Replace with a CSS animation in `css/styles.css`:
```css
.hero-content {
  animation: fadeUp 0.8s ease-out both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Add class `hero-content` to the div at `index.html:118`.

---

### H4 — Complete LocalBusiness Schema
**Impact:** Rich result eligibility, GBP linkage | **Effort:** 30 minutes

Replace the single JSON-LD block at `index.html:615–649` with the two corrected blocks from `FULL-AUDIT-REPORT.md` Section 4. Key additions:

- `@id`, `image`, `logo`, `address` (PostalAddress), `geo`, `priceRange`, `openingHoursSpecification`
- New `WebSite` schema block
- `geoRadius` as number `50000` (not string)
- `areaServed` aligned to 5 cities (matching on-page copy)

After GBP is created: populate `sameAs` with the GBP profile URL.

---

### H5 — Self-Host AOS (Remove unpkg.com Dependency)
**Impact:** −150–300 ms DNS lookup, supply-chain security | **Effort:** 15 minutes

```bash
# Download AOS files
curl -o css/aos.css https://unpkg.com/aos@2.3.4/dist/aos.css
curl -o js/aos.js https://unpkg.com/aos@2.3.4/dist/aos.js
```

Update `index.html:53`: `<link href="css/aos.css" rel="stylesheet" />`  
Update `index.html:652`: `<script src="js/aos.js" defer></script>`  
Also update `index.html:654`: `<script src="js/main.js" defer></script>`

---

### H6 — Add `tel:` Clickable Phone Links
**Impact:** GBP signal, mobile UX, tap-to-call | **Effort:** 5 minutes

Wrap every plain-text phone number on the page:

`index.html:532`: Change the WhatsApp CTA button text from `+52 33 2243 0594` to also include a `tel:` href on the number in the footer contact list:
```html
<a href="tel:+523322430594" class="hover:text-teal transition-colors">+52 33 2243 0594</a>
```
(The footer phone at `index.html:575` is already in a `<a href="https://wa.me/...">` link — add a separate `<a href="tel:+523322430594">` alongside it.)

---

### H7 — Fix `lang` Attribute
**Impact:** Locale consistency for AI + crawlers | **Effort:** 2 minutes

`index.html:2`: Change `<html lang="es">` → `<html lang="es-MX">`

---

### H8 — Add `llms.txt`
**Impact:** AI search visibility (ChatGPT, Perplexity, Claude) | **Effort:** 30 minutes

Create `/home/ivanr/workspace/eshot/llms.txt` with the content from `FULL-AUDIT-REPORT.md` Section 7. This file is served automatically by GitHub Pages from the repository root.

---

## MEDIUM — Fix Within 1 Month

### M1 — Add FAQ Section to Homepage
**Impact:** AI citation readiness +30 pts, long-tail keyword coverage, rich results | **Effort:** 4–6 hours

Add a new `<section id="faq">` between the Gallery and Coverage sections. Include 5–7 questions as `<h3>` headings with `<p>` answers (~150 words each). Suggested questions in `FULL-AUDIT-REPORT.md` Section 7.

Add corresponding `FAQPage` JSON-LD schema block.

Add "FAQ" link to navigation.

---

### M2 — Add Testimonials Section
**Impact:** E-E-A-T, conversion confidence | **Effort:** 3–4 hours

Add 3–5 client quotes between Gallery and Coverage. Each entry: client first name, event type, city, year. Even initial placeholder quotes from memory can be replaced with real reviews as they come in.

---

### M3 — Add Barra Libre Service Card
**Impact:** Primary service visibility, Services grid completeness | **Effort:** 1 hour

Add a fourth card to the Services grid (`index.html:222–266`). The grid already declares `lg:grid-cols-4` — adding the fourth card fills the layout correctly.

Suggested card:
```html
<div ... data-aos="fade-up" data-aos-delay="400">
  <span class="text-5xl mb-4">🍾</span>
  <h3 class="font-serif text-xl font-bold mb-3 text-teal">Barra Libre</h3>
  <p class="text-gray-400 text-sm leading-relaxed mb-6">
    Servicio completo de barra libre para bodas y eventos. Incluye selección de bebidas,
    coordinación de entrega y asesoría personalizada.
  </p>
  <a href="https://wa.me/523322430594?text=Hola,%20me%20interesa%20cotizar%20una%20barra%20libre"
     ...>Cotizar vía WhatsApp</a>
</div>
```

---

### M4 — Fill Coverage Section Right Column
**Impact:** Content depth, local signal, UX | **Effort:** 1 hour

The Coverage section (`index.html:466–508`) has an empty right column. Options:
- Embed Google Maps showing the GDL metro service area
- Add a "recent events" mini-card set (3 cards with event type + city)
- Add a "¿Fuera de área?" block with call-to-action

---

### M5 — Add Google Fonts Non-Blocking Load
**Impact:** FCP −100–200 ms | **Effort:** 15 minutes

Replace `index.html:29` (render-blocking stylesheet link) with:
```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap" as="style" />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap"
      rel="stylesheet" media="print" onload="this.media='all'" />
<noscript><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap" rel="stylesheet" /></noscript>
```

---

### M6 — Add `width` and `height` to All Images
**Impact:** CLS reduction | **Effort:** 15 minutes

Add explicit dimensions to:
- Logo images (`index.html:65, 119, 549`) — match intrinsic PNG size
- Product images (`index.html:286–382`) — `width="640" height="256"`
- Gallery images (`index.html:415–455`) — match intrinsic size

---

### M7 — Get First 10 Google Reviews
**Impact:** Local pack ranking, conversion trust | **Effort:** ongoing

After GBP is verified:
1. Create a short review link (Google provides a short URL from GBP dashboard)
2. Send via WhatsApp to recent clients: *"Hola [nombre], gracias por confiar en nosotros para tu evento. Si puedes dejarnos una reseña en Google nos ayudaría mucho: [link]"*
3. Target: 10 reviews within 60 days of GBP verification
4. Respond to every review (positive and negative) within 48 hours

---

### M8 — List on Wedding/Event Directories
**Impact:** NAP citations, direct lead source | **Effort:** 2–4 hours

| Directory | URL | Priority |
|---|---|---|
| Bodas.com.mx | bodas.com.mx | High |
| Matrimonio.com.mx | matrimonio.com.mx | High |
| Facebook Business Page | facebook.com/business | High |
| Páginas Amarillas MX | paginas-amarillas.com.mx | Medium |
| Sección Amarilla | seccionamarilla.com.mx | Medium |
| Bing Places | bingplaces.com | Medium |

Ensure NAP is identical on every directory: **"Eshot Vinos y Licores" / "+52 33 2243 0594" / "Guadalajara, Jalisco"**

---

### M9 — Add "¿Cómo funciona?" Process Section
**Impact:** Conversion, E-E-A-T | **Effort:** 2 hours

Add a 3-step visual section:
1. **Contáctanos por WhatsApp** — cuéntanos el tipo de evento, la fecha y el número de invitados
2. **Recibe tu cotización** — te enviamos opciones personalizadas según tu evento y presupuesto
3. **Disfruta tu evento** — entregamos todo puntualmente para que solo te preocupes por celebrar

---

### M10 — Add Favicon Set
**Impact:** UX, minor trust signal | **Effort:** 20 minutes

1. Go to [realfavicongenerator.net](https://realfavicongenerator.net) → upload `img/logo.png`
2. Download the generated package
3. Place `favicon.ico` at repository root
4. Place PNG variants in `img/`
5. Replace `index.html:24` with the generated `<link>` tags

---

## LOW — Backlog (within 60 days)

| # | Task | File | Effort |
|---|---|---|---|
| L1 | Gallery captions: add `<figcaption>` with event name/city/year | `index.html:414–462` | 30 min |
| L2 | H1 revision: add keyword-rich `<h2>` below current H1 | `index.html:121` | 10 min |
| L3 | Remove `<meta name="keywords">` tag | `index.html:8` | 1 min |
| L4 | Add `<meta name="theme-color" content="#000000">` | `index.html:<head>` | 2 min |
| L5 | Implement IndexNow (free Bing/Yandex instant submit) | new key file | 15 min |
| L6 | Convert hero JPEG to WebP + `<picture>` element | `index.html:113` | 30 min |
| L7 | Upgrade to domain email (`contacto@eshot-vinosylicores.com`) | email config | varies |
| L8 | Create Instagram/Facebook Business Page | external | 2–4 hours |
| L9 | Zapopan & Tlaquepaque dedicated landing pages | new HTML files | 4–6 hours each |
| L10 | Update copyright to range ("© 2025–2026") if site launched in 2025 | `index.html:596` | 1 min |

---

## Projected Score After Each Phase

| Phase | Actions | Expected Score |
|---|---|---|
| **Now (applied)** | Canonical + robots.txt + sitemap.xml | **52 / 100** |
| **+1 week** | H1–H8 completed | **~62 / 100** |
| **+1 month** | M1–M10 completed + GBP verified + 5 reviews | **~72 / 100** |
| **+3 months** | FAQ, testimonials, citations, 10+ reviews | **~78 / 100** |
| **+6 months** | Location pages + YouTube presence + 25+ reviews | **~85 / 100** |

---

## Reference Files

- [FULL-AUDIT-REPORT.md](FULL-AUDIT-REPORT.md) — detailed findings with code samples
- [index.html](index.html) — main site file
- [robots.txt](robots.txt) — created this session
- [sitemap.xml](sitemap.xml) — created this session
