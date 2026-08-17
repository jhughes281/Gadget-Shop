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

## Design

Products are drawn, not photographed. Every item is a technical line drawing on
a datasheet card with hover callouts, a spec table, and its stage chip — honest
for a store that sells things partly still in tooling, and it keeps the site
fast and fully offline-capable. When real product photography exists it drops in
behind the drawing without changing the card.

- **Palette** — cobalt `#1B34D8` on cool drafting-paper `#E6EAF1`, ink `#0B0E14`,
  signal orange `#FF5B24` reserved for live/shipping states.
- **Type** — Archivo Expanded (display), IBM Plex Sans (body), IBM Plex Mono
  (specs, prices, labels).
- Light and dark themes, keyboard focus, and `prefers-reduced-motion` all handled.

## Files

```
index.html            home — exploded-view hero, stage rail, featured grid
shop.html             catalogue with category/stage filters and sort
product.html          detail template, reads ?id= from the URL
assets/css/gadgetry.css
assets/js/catalog.js  product data + line-art SVGs (edit this to add products)
assets/js/store.js    cart, drawer, filters, rendering
```

Cart state persists in `localStorage`. Checkout is not wired to a payment
processor — that is the next step if this becomes a real store.

## Adding a product

Append an object to `PRODUCTS` in `assets/js/catalog.js`. Required keys:
`id`, `name`, `tagline`, `price`, `category`, `stage`, `ship`, `sku`, `note`,
`specs`, `pins`, `art`. The `art` string is SVG markup on a `0 0 200 200`
viewBox using the `ln` / `ln-thin` / `ln-blue` / `ln-hot` classes.

## Running it locally

```bash
python -m http.server 8752
```

Then open http://localhost:8752.
