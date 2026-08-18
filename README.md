# Gadgetry

Everything new, in one place.

An ecommerce storefront for crowdfunded gear, new gadgets, household appliances
and tools — the things worth stocking after someone has actually lived with them.

**Live:** https://jhughes281.github.io/gadgetry/

## The idea

Products move through four stages, and the whole store is organised around them:

| Stage | What it means |
| --- | --- |
| Spotted | On the watch list. Not for sale yet. |
| Backed | We funded the campaign and have the first samples. |
| Shipping | Production run landed, going out from our shelf. |
| In stock | Permanent catalogue item, with spares. |

Every card carries its stage, and stage is a filter axis on the shop page.

## Design

Products are drawn, not photographed. Each item is a technical line drawing on a
datasheet card with hover callouts, a spec table and its stage chip — honest for
a store that sells things partly still in tooling, and it keeps the site fast
with zero image requests. Real photography drops in behind the drawing later
without changing the card.

- **Palette** — cobalt `#0B3EC7` on near-white `#FBFCFD`, drafting-paper plates
  `#EDF0F5`, ink `#0B0E14`, rust `#B33507` reserved for live/shipping states.
- **Type** — Archivo Expanded (display), IBM Plex Sans (body), IBM Plex Mono
  (specs, prices, labels).
- **Signature** — the arrow. Every forward action grows one on hover.
- Light and dark themes, keyboard focus, `prefers-reduced-motion`, 44px tap
  targets, and all text at 5.7:1 or better in both themes.

### CSS conventions

```
o-   objects      reusable, unopinionated (o-btn, o-title--large, o-plate)
c-   components   one job each (c-hero, c-promo, c-splitted, c-footer)
l-   layout       structural (l-wrapper, l-slider)
u-   utilities    single-purpose (u-visually-hidden)
data-*            behaviour hooks — never styled
```

## Files

```
index.html            home — hero, product slider, lifecycle, promos,
                      reviews, field notes, newsletter
shop.html             catalogue with category/stage filters and sort
product.html          detail template, reads ?id= from the URL
assets/css/gadgetry.css
assets/js/catalog.js  product data + line-art SVGs (edit this to add products)
assets/js/store.js    cart, drawer, sliders, filters, newsletter, JSON-LD
assets/img/og.svg     social preview
```

## Adding a product

Append an object to `PRODUCTS` in `assets/js/catalog.js`. Required keys:
`id`, `name`, `tagline`, `price`, `category`, `stage`, `ship`, `sku`, `note`,
`specs`, `pins`, `art`. The `art` string is SVG markup on a `0 0 200 200`
viewBox using the `ln` / `ln-thin` / `ln-blue` / `ln-hot` classes.

## Before this goes live

- **Testimonials are placeholder copy.** Written examples, not real customers.
  Replace them with genuine attributable quotes or delete the section.
- **Catalogue content is invented** — names, prices, backer counts, ship dates.
- **The newsletter needs an endpoint.** Set `data-endpoint` on the
  `[data-newsletter]` form to a Formspree/Buttondown/Mailchimp URL. Until then
  it validates and says it is not connected.
- **No payment processor.** Cart totals and persists to `localStorage`, then
  stops. Shopify is the intended destination.
- **`og.svg` should become a 1200×630 PNG** — most social platforms will not
  render an SVG preview.

## Running it locally

```bash
python -m http.server 8752
```

Then open http://localhost:8752.
