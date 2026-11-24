# Kindred Coffee Roasters — Custom Shopify Theme

A specialty coffee subscription brand theme built on **Dawn 16.2.0**, demonstrating real Shopify theme customization skills — sections, blocks, metafields, vanilla JS, and Online Store 2.0 architecture.

> **Portfolio piece** — proves you can customize *existing* Shopify stores (what agencies' clients actually need), not just build from scratch.

---

## Design Concept

**Warm, tactile coffee aesthetic** — not a generic template.

| Element | Choice |
|---------|--------|
| **Primary** | Cream `#FDF8F3` |
| **Text** | Deep Brown `#2D1B15` |
| **Accent** | Burnt Orange `#C97B3C` (roast warmth) |
| **Dark** | Dark Roast `#1A100A` |
| **Heading Font** | Fraunces (characterful serif) |
| **Body Font** | DM Sans (clean, readable) |

No stock "Shop by Category" icon grids. No countdown timers. Every section is a deliberate design decision.

---

## What's Custom (vs. Dawn Default)

### Homepage Sections (`templates/index.json`)
| Section | File | Highlights |
|---------|------|------------|
| **Hero** | `sections/hero.liquid` | Full-width lifestyle image, parallax scroll, editable headline/CTA |
| **Featured Products** | `sections/featured-products.liquid` | Editorial grid, tasting notes from metafields, skeleton loading |
| **Roasting Story** | `sections/roasting-story.liquid` | Split layout + stat blocks (years/farms/origins as blocks) |
| **Subscription Value** | `sections/subscription-value.liquid` | 4 benefit cards with SVG icons (delivery/save/flexible/fresh) |
| **Bundle Builder** | `sections/bundle-builder.liquid` | Pick 3 bags → progress bar → live summary → single-line-item cart add |
| **Customer Reviews** | `sections/customer-reviews.liquid` | Touch/keyboard slider, auto-advance, star ratings from blocks |

### Product Page (`templates/product.json` → `sections/main-product-kindred.liquid`)
| Feature | Implementation |
|---------|----------------|
| **Subscription Builder** | Roast pills, Grind pills (Whole Bean/Drip/Espresso/French Press), Frequency radios (One-time vs Subscribe & Save 15%), Interval select |
| **Dynamic Price** | Updates live as selections change; shows annual savings per interval |
| **Flavor Wheel** | CSS radial visualization from `product.metafields.custom.flavor_profile` + tag fallback |
| **Brew Guide** | Accordion with Pour Over / French Press / Espresso (ratio, grind, temp, time, steps) |
| **Subscribe Badge** | Dropdown for Recharge / Shopify Subscriptions / Demo mode |

All sections expose `color_scheme`, `text`, `image_picker`, `richtext`, `collection` settings — fully editable in Theme Editor.

---

## Real vs. Mocked (Be Explicit in Portfolio)

| Feature | Status | What's Needed for Production |
|---------|--------|------------------------------|
| Subscription billing | **Mocked (UI only)** | Recharge / Shopify Subscriptions app + webhook handling |
| Bundle discount | **Mocked (UI only)** | Shopify Functions Cart Transform or bundles app (Shopify Bundles, Bundle Builder) |
| Flavor wheel data | **Metafield-driven** | Define `flavor_profile` metafield (JSON: `[{name, intensity}]`) |
| Tasting notes | **Metafield-driven** | Define `tasting_notes` metafield (list.single_line_text_field) |
| Roast types | **Metafield-driven** | Define `roast_types` metafield (list.single_line_text_field) |

The badge component (`kindred-subscribe-badge`) has a `subscription_app` setting (`mock`/`recharge`/`shopify`) so you can demo the exact messaging each integration needs.

---

## Quick Start

```bash
# 1. Prerequisites
# - Shopify Partners account (free)
# - Development store (free, not a paid plan)
# - Shopify CLI installed: npm install -g @shopify/cli @shopify/theme

# 2. Clone & connect
git clone <your-fork>
cd kindred-coffee-roasters
shopify auth login
shopify theme dev  # hot-reload dev server
```

### Required Metafields (add in Admin → Settings → Custom Data → Products)
| Namespace/Key | Type | Description |
|---------------|------|-------------|
| `custom.tasting_notes` | List (single line text) | Flavor tags shown as pills |
| `custom.flavor_profile` | JSON | `[{"name":"Chocolate","intensity":8},{"name":"Citrus","intensity":5}]` |
| `custom.roast_types` | List (single line text) | `["Light","Medium","Dark"]` |

---

## Project Structure (Custom Files Only)

```
sections/
├── hero.liquid              # Homepage hero
├── featured-products.liquid # Editorial product grid
├── roasting-story.liquid    # Story + stats blocks
├── subscription-value.liquid# Benefit cards
├── bundle-builder.liquid    # Pick-3-bags builder
├── customer-reviews.liquid  # Testimonial slider
├── main-product-kindred.liquid  # Custom product page
└── main-product.liquid      # Dawn original (unchanged)

assets/
├── kindred-product-builder.js  # Subscription/grind/frequency logic

templates/
├── index.json               # Homepage with all custom sections
└── product.json             # Uses main-product-kindred

locales/
└── en.default.json          # Added subscription/bundle keys

config/
├── settings_data.json       # Color schemes, fonts updated
└── settings_schema.json     # Dawn default (unchanged)
```

---

## Theme Check

```bash
shopify theme check
```

Only pre-existing Dawn warnings remain (undefined `scheme_classes` in layout files, variable naming in core sections). **Zero errors in custom code.**

---

## Tech Stack

- **Liquid** — Sections, blocks, snippets, schema, metafields
- **CSS** — `{% stylesheet %}` per component, CSS custom properties for theming
- **Vanilla JS** — `{% javascript %}` per component, ES6 classes, no framework
- **Shopify CLI** — Dev server, Theme Check, deploy

---

## License

Based on [Dawn](https://github.com/Shopify/dawn) (MIT). Custom code: MIT — use freely for portfolio/client work.

---

## Why This Impresses Agencies

1. **Not a template reskin** — Custom sections with schemas, blocks, metafield integration
2. **Editor-first** — Non-technical merchants can rearrange/configure everything
3. **Real subscription UX** — Not a "Buy Now" button with a tooltip; actual frequency/interval/grind builder
4. **Bundle builder** — Complex multi-product selection with live summary, added as single line item
5. **Performance** — No React, no polyfills, skeleton loading, lazy images
6. **Honest about mocks** — Clear separation of theme-side UI vs. app-side billing