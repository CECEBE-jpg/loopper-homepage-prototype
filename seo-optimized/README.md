# SEO optimized homepage prototype

Separate version of the home page prototype, made by Lars (SEO). It keeps the design of the main
prototype (repo root) and adds SEO content, links and technical SEO. It is a reference version only:
the main prototype in the repo root stays the design template.

Preview: https://cecebe-jpg.github.io/loopper-homepage-prototype/seo-optimized/

What it adds (Lars, v3 to v5):

- v3: title, meta description, canonical, hreflang, schema (FAQ, how to order, company info); one H1,
  an H2 per section, an H3 per card; real links on every tile, card, logo and footer item; live images;
  SEO text and FAQ block; images from 19.4 MB to about 1.3 MB with alt text; copy fixes.
- v4: mobile headings match desktop; live values for delivery dates, prices and review count (marked
  `data-var` for dev); language switcher, account and basket links; WebP images with width and height;
  1200x630 share image; "Explore more promotional products" link block.
- v5: "Loopper in numbers" fact box and two extra FAQs for AI tools.

Not for live rollout before 15 Dec 2026 (SEO tests run until then).

---

## Original notes (base build)

Static HTML and CSS build of the Figma frame "Home page template"
(file `7mafJc1Sah8b22Jr6qjZ7U`, node `298:590`).

Open `index.html` in a browser. There is no build step.

- `index.html`: page markup
- `styles.css`: page frame styles, followed by styles generated from Figma
- `carousels.js`: arrows for the scrollable product, brand and review rows
- `nav.css`, `nav.js`: navigation copied from the SEO product page prototype
- `assets/`: images and icons exported from Figma

The desktop layout is the fixed 1536px frame (Figma `298:590`), scaled down to fit narrower screens. Below 768px a separate mobile layout (Figma `303:1033`, 390px wide, scaled to the screen width) is shown instead; its rows swipe sideways. The header is the SEO prototype navigation on all sizes.
