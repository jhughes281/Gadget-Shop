/* ==========================================================================
   GADGETRY — storefront behaviour
   Cart lives in localStorage. Every page shares one drawer, built here.
   ========================================================================== */

(function () {
  "use strict";

  const CART_KEY = "gadgetry.cart.v1";
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const money = (n) =>
    "$" + n.toFixed(2).replace(/\.00$/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------------------------------------------------------------- cart */

  let cart = {};
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch (e) {
    cart = {};
  }

  const save = () => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      /* private mode — cart just won't persist */
    }
  };

  const lines = () =>
    Object.keys(cart)
      .map((id) => ({ product: byId(id), qty: cart[id] }))
      .filter((l) => l.product && l.qty > 0);

  const count = () => lines().reduce((n, l) => n + l.qty, 0);
  const subtotal = () => lines().reduce((n, l) => n + l.product.price * l.qty, 0);

  function addToCart(id, qty) {
    const p = byId(id);
    if (!p) return;
    if (p.stage === "spotted") {
      toast("Kelvin is not funded yet — we'll email you when it opens");
      return;
    }
    cart[id] = (cart[id] || 0) + (qty || 1);
    save();
    paintCart();
    toast(p.name + " added");
    openDrawer();
  }

  function setQty(id, qty) {
    if (qty <= 0) delete cart[id];
    else cart[id] = qty;
    save();
    paintCart();
  }

  /* ------------------------------------------------------------ drawings */

  const drawing = (p, cls) =>
    '<svg class="' + (cls || "plate-art") + '" viewBox="0 0 200 200" role="img" aria-label="' +
    esc(p.name) + ' technical drawing" focusable="false">' + p.art + "</svg>";

  const pins = (p) =>
    (p.pins || [])
      .map(
        (pin) =>
          '<span class="callout" aria-hidden="true" style="left:' + pin.x + "%;top:" + pin.y + '%">' +
          "<span>" + esc(pin.label) + "</span></span>"
      )
      .join("");

  const stageChip = (p) => {
    const s = STAGES[p.stage];
    return '<span class="chip ' + s.cls + '">' + s.label + "</span>";
  };

  /* --------------------------------------------------------------- cards */

  function cardHTML(p) {
    const price =
      '<span class="price">' + money(p.price) +
      (p.compareAt ? '<s><span class="sr">was </span>' + money(p.compareAt) + "</s>" : "") +
      "</span>";
    const cta =
      p.stage === "spotted"
        ? '<button class="btn btn-ghost btn-sm btn-block card-add" data-notify="' + p.id + '">Notify me</button>'
        : '<button class="btn btn-sm btn-block card-add" data-add="' + p.id + '">Add to cart</button>';

    return (
      '<article class="card">' +
      '<div class="card-head">' + stageChip(p) +
      '<span class="card-sku">' + esc(p.sku) + "</span></div>" +
      '<div class="plate">' + drawing(p) + pins(p) + "</div>" +
      '<div class="card-body">' +
      '<h3 class="card-name"><a href="product.html?id=' + p.id + '">' + esc(p.name) + "</a></h3>" +
      '<p class="card-tag">' + esc(p.tagline) + "</p>" +
      '<div class="card-foot">' + price +
      '<span class="card-ship">' + esc(p.ship) + "</span></div>" +
      cta +
      "</div></article>"
    );
  }

  function paintGrid(el, list) {
    if (!list.length) {
      el.innerHTML =
        '<div class="empty"><h3>Nothing matches that</h3>' +
        "<p>Try loosening a filter — the catalogue is small on purpose.</p>" +
        '<button class="btn btn-ghost" data-clear>Clear filters</button></div>';
      return;
    }
    el.innerHTML = list.map(cardHTML).join("");
  }

  /* --------------------------------------------------------------- toast */

  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.dataset.show = "true";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toastEl.dataset.show = "false"), 2800);
  }

  /* -------------------------------------------------------------- drawer */

  let drawerEl, scrimEl, lastFocus;

  function buildChrome() {
    const shell = document.createElement("div");
    shell.innerHTML =
      '<div class="scrim" data-scrim></div>' +
      '<aside class="drawer" data-drawer role="dialog" aria-modal="true" aria-label="Cart" tabindex="-1">' +
      '<div class="drawer-head"><span class="drawer-title">Your cart</span>' +
      '<button class="icon-btn" data-close-cart aria-label="Close cart">Close ✕</button></div>' +
      '<div class="drawer-body" data-cart-body></div>' +
      '<div class="drawer-foot" data-cart-foot></div></aside>' +
      '<div class="toast" data-toast role="status" aria-live="polite"></div>';
    while (shell.firstChild) document.body.appendChild(shell.firstChild);
    drawerEl = document.querySelector("[data-drawer]");
    scrimEl = document.querySelector("[data-scrim]");
    toastEl = document.querySelector("[data-toast]");
  }

  function openDrawer() {
    lastFocus = document.activeElement;
    drawerEl.dataset.open = "true";
    scrimEl.dataset.open = "true";
    document.body.style.overflow = "hidden";
    drawerEl.querySelector("[data-close-cart]").focus();
  }

  function closeDrawer() {
    drawerEl.dataset.open = "false";
    scrimEl.dataset.open = "false";
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function paintCart() {
    const n = count();
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = n;
      el.dataset.empty = n === 0 ? "true" : "false";
    });

    const body = document.querySelector("[data-cart-body]");
    const foot = document.querySelector("[data-cart-foot]");
    if (!body || !foot) return;

    const items = lines();
    if (!items.length) {
      body.innerHTML =
        '<div class="drawer-empty"><p>Nothing in here yet.</p>' +
        '<a class="btn btn-ghost" href="shop.html">Browse the catalogue</a></div>';
      foot.innerHTML = "";
      return;
    }

    body.innerHTML = items
      .map(
        (l) =>
          '<div class="line">' +
          '<div class="line-art">' + drawing(l.product, "") + "</div>" +
          "<div><div class=\"line-name\">" + esc(l.product.name) + "</div>" +
          '<div class="line-meta">' + esc(l.product.ship) + "</div>" +
          '<div class="line-foot"><span class="line-qty">' +
          '<button data-dec="' + l.product.id + '" aria-label="Decrease quantity of ' + esc(l.product.name) + '">−</button>' +
          "<output>" + l.qty + "</output>" +
          '<button data-inc="' + l.product.id + '" aria-label="Increase quantity of ' + esc(l.product.name) + '">+</button>' +
          "</span>" +
          '<button class="line-drop" data-drop="' + l.product.id + '">Remove</button>' +
          '<span class="line-price">' + money(l.product.price * l.qty) + "</span>" +
          "</div></div></div>"
      )
      .join("");

    const sub = subtotal();
    const ship = sub >= 75 || sub === 0 ? 0 : 6.5;
    foot.innerHTML =
      '<div class="total-row"><span>Subtotal</span><span>' + money(sub) + "</span></div>" +
      '<div class="total-row"><span>Shipping</span><span>' +
      (ship === 0 ? "Free" : money(ship)) + "</span></div>" +
      '<div class="total-row is-grand"><span>Total</span><b>' + money(sub + ship) + "</b></div>" +
      '<button class="btn btn-block" data-checkout>Checkout</button>' +
      '<p class="drawer-fine">Free shipping over $75 · 30-day returns</p>';
  }

  /* ------------------------------------------------------------- ticker */

  function paintTicker() {
    const track = document.querySelector("[data-ticker]");
    if (!track) return;
    const row = TICKER.map(
      (t) =>
        '<span class="ticker-item">' + esc(t.k) + " <b>" + esc(t.v) + "</b>" +
        (t.hot ? " <i>" + esc(t.hot) + "</i>" : "") + "</span>"
    ).join("");
    track.innerHTML = row + row; /* doubled so the loop is seamless */
  }

  /* --------------------------------------------------------------- home */

  function mountHome() {
    const el = document.querySelector("[data-grid='featured']");
    if (!el) return;
    const picks = [
      "tessera-split-keyboard",
      "orbit-halo-lamp",
      "slate-eink-pad",
      "ember-induction-hob",
      "driftwave-buds",
      "micron-precision-kit",
      "quiet-hour-scrubber",
      "perch-magnetic-stand",
    ];
    paintGrid(el, picks.map(byId).filter(Boolean));
  }

  /* --------------------------------------------------------------- shop */

  function mountShop() {
    const grid = document.querySelector("[data-grid='shop']");
    if (!grid) return;

    const railCats = document.querySelector("[data-rail-cats]");
    const railStages = document.querySelector("[data-rail-stages]");
    const countEl = document.querySelector("[data-shop-count]");
    const sortEl = document.querySelector("[data-sort]");

    const params = new URLSearchParams(location.search);
    const preCat = params.get("cat");
    const preStage = params.get("stage");

    railCats.innerHTML = CATEGORIES.map((c) => {
      const n = PRODUCTS.filter((p) => p.category === c.id).length;
      return (
        '<label class="rail-opt"><input type="checkbox" name="cat" value="' + c.id + '"' +
        (preCat === c.id ? " checked" : "") + ">" + esc(c.label) +
        '<span class="rail-opt-n">' + n + "</span></label>"
      );
    }).join("");

    railStages.innerHTML = Object.keys(STAGES)
      .map((k) => {
        const n = PRODUCTS.filter((p) => p.stage === k).length;
        return (
          '<label class="rail-opt"><input type="checkbox" name="stage" value="' + k + '"' +
          (preStage === k ? " checked" : "") + ">" + STAGES[k].label +
          '<span class="rail-opt-n">' + n + "</span></label>"
        );
      })
      .join("");

    function apply() {
      const cats = [...document.querySelectorAll("input[name=cat]:checked")].map((i) => i.value);
      const stages = [...document.querySelectorAll("input[name=stage]:checked")].map((i) => i.value);
      let list = PRODUCTS.filter(
        (p) =>
          (!cats.length || cats.includes(p.category)) &&
          (!stages.length || stages.includes(p.stage))
      );

      const order = ["spotted", "backed", "shipping", "stock"];
      const sort = sortEl.value;
      if (sort === "price-asc") list = list.slice().sort((a, b) => a.price - b.price);
      else if (sort === "price-desc") list = list.slice().sort((a, b) => b.price - a.price);
      else if (sort === "stage") list = list.slice().sort((a, b) => order.indexOf(a.stage) - order.indexOf(b.stage));

      countEl.textContent = list.length + (list.length === 1 ? " item" : " items");
      paintGrid(grid, list);
    }

    document.querySelector("[data-shop]").addEventListener("change", apply);
    apply();
  }

  /* ------------------------------------------------------------ product */

  function mountProduct() {
    const host = document.querySelector("[data-product]");
    if (!host) return;

    const id = new URLSearchParams(location.search).get("id");
    const p = byId(id) || PRODUCTS[0];
    document.title = p.name + " — Gadgetry";

    const cat = CATEGORIES.find((c) => c.id === p.category);
    let qty = 1;

    host.innerHTML =
      '<div class="detail-plate"><div class="detail-grid-bg"></div>' +
      '<div class="plate">' + drawing(p) + pins(p) + "</div></div>" +
      "<div>" +
      '<p class="crumb"><a href="shop.html">Shop</a> / <a href="shop.html?cat=' + p.category + '">' +
      esc(cat.label) + "</a></p>" +
      '<div style="display:flex;gap:.5rem;align-items:center;margin-top:1rem">' +
      stageChip(p) + '<span class="card-sku">' + esc(p.sku) + "</span></div>" +
      '<h1 class="display detail-title">' + esc(p.name) + "</h1>" +
      '<p class="lede">' + esc(p.tagline) + "</p>" +
      '<p class="detail-price">' + money(p.price) +
      (p.compareAt ? '<s style="font-size:.9rem;color:var(--text-mute);margin-left:.5rem">' + money(p.compareAt) + "</s>" : "") +
      "</p>" +
      '<p class="detail-ship">' + esc(p.ship) +
      (p.backers ? " · " + p.backers.toLocaleString() + " backers" : "") + "</p>" +
      '<div class="detail-actions">' +
      (p.stage === "spotted"
        ? '<button class="btn" data-notify="' + p.id + '">Email me when it opens</button>'
        : '<span class="qty"><button data-qty="-1" aria-label="Decrease quantity">−</button>' +
          '<output data-qty-out>1</output>' +
          '<button data-qty="1" aria-label="Increase quantity">+</button></span>' +
          '<button class="btn" data-add-detail="' + p.id + '">Add to cart</button>') +
      "</div>" +
      '<p class="note"><b>Why we stock it.</b> ' + esc(p.note) + "</p>" +
      '<table class="specs"><caption class="eyebrow" style="text-align:left;padding-bottom:.6rem">Specification</caption><tbody>' +
      p.specs.map((s) => "<tr><th scope=\"row\">" + esc(s[0]) + "</th><td>" + esc(s[1]) + "</td></tr>").join("") +
      "</tbody></table></div>";

    host.addEventListener("click", (e) => {
      const step = e.target.closest("[data-qty]");
      if (step) {
        qty = Math.max(1, qty + Number(step.dataset.qty));
        host.querySelector("[data-qty-out]").textContent = qty;
        return;
      }
      const add = e.target.closest("[data-add-detail]");
      if (add) addToCart(add.dataset.addDetail, qty);
    });

    const related = document.querySelector("[data-grid='related']");
    if (related) {
      paintGrid(
        related,
        PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)
      );
    }
  }

  /* -------------------------------------------------------------- events */

  function wire() {
    document.addEventListener("click", (e) => {
      const add = e.target.closest("[data-add]");
      if (add) {
        e.preventDefault();
        addToCart(add.dataset.add, 1);
        return;
      }
      const notify = e.target.closest("[data-notify]");
      if (notify) {
        e.preventDefault();
        toast("We'll email you the day it opens");
        return;
      }
      if (e.target.closest("[data-open-cart]")) return openDrawer();
      if (e.target.closest("[data-close-cart]") || e.target.closest("[data-scrim]")) return closeDrawer();
      if (e.target.closest("[data-checkout]")) {
        toast("Checkout is not wired up on this preview");
        return;
      }
      const inc = e.target.closest("[data-inc]");
      if (inc) return setQty(inc.dataset.inc, cart[inc.dataset.inc] + 1);
      const dec = e.target.closest("[data-dec]");
      if (dec) return setQty(dec.dataset.dec, cart[dec.dataset.dec] - 1);
      const drop = e.target.closest("[data-drop]");
      if (drop) return setQty(drop.dataset.drop, 0);
      if (e.target.closest("[data-clear]")) {
        document.querySelectorAll("input[name=cat],input[name=stage]").forEach((i) => (i.checked = false));
        document.querySelector("[data-shop]").dispatchEvent(new Event("change", { bubbles: true }));
        return;
      }
      const burger = e.target.closest("[data-menu]");
      if (burger) {
        const nav = document.querySelector("[data-nav]");
        const open = nav.dataset.open !== "true";
        nav.dataset.open = String(open);
        burger.setAttribute("aria-expanded", String(open));
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawerEl && drawerEl.dataset.open === "true") closeDrawer();
    });
  }

  /* ---------------------------------------------------------------- boot */

  buildChrome();
  wire();
  paintTicker();
  mountHome();
  mountShop();
  mountProduct();
  paintCart();
})();
