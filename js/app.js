/* ==========================================================================
   Khori Special Kabab — ordering site logic (frontend only)
   Settings live in js/config.js, dishes live in js/menu-data.js
   ========================================================================== */
(function () {
  'use strict';

  const R = window.RESTAURANT;
  const MENU = window.MENU_ITEMS;
  const BYID = Object.fromEntries(MENU.map((i) => [i.id, i]));
  const CAT = Object.fromEntries(R.categories.map((c) => [c.id, c]));
  const CART_KEY = 'khori_cart_v1';
  const CUST_KEY = 'khori_customer_v1';
  const VIEWS = ['home', 'menu', 'cart', 'contact'];

  /* ---------------------------- helpers ---------------------------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ico = (n) => '<svg class="ic" aria-hidden="true"><use href="#i-' + n + '"/></svg>';
  const num = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));
  const money = (n) => num(n) + ' ' + R.currency;
  const waDigits = () => String(R.whatsappNumber).replace(/\D/g, '').replace(/^00/, '');
  const waUrl = (text) => 'https://wa.me/' + waDigits() + (text ? '?text=' + encodeURIComponent(text) : '');

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 1900);
  }

  /* ----------------------------- cart state ----------------------------- */
  let cart = loadCart();

  function loadCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      if (!Array.isArray(raw)) return [];
      return raw
        .filter((l) => l && BYID[l.id] && Number.isInteger(l.q) && l.q > 0)
        .map((l) => {
          const it = BYID[l.id];
          const maxV = it.variants ? it.variants.length - 1 : 0;
          return { id: l.id, v: Math.min(Math.max(parseInt(l.v, 10) || 0, 0), maxV), q: Math.min(l.q, 99) };
        });
    } catch (e) { return []; }
  }
  function saveCart() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* storage unavailable */ } }

  const unit = (l) => (BYID[l.id].variants ? BYID[l.id].variants[l.v].price : BYID[l.id].price);
  const count = () => cart.reduce((s, l) => s + l.q, 0);
  const subtotal = () => cart.reduce((s, l) => s + unit(l) * l.q, 0);
  const delivery = () => Number(R.deliveryFee) || 0;
  const total = () => subtotal() + delivery();

  function addToCart(id, v) {
    const f = cart.find((l) => l.id === id && l.v === v);
    if (f) f.q = Math.min(f.q + 1, 99); else cart.push({ id: id, v: v, q: 1 });
    afterCartChange();
  }
  function changeQty(key, delta) {
    const [id, v] = key.split('|');
    const l = cart.find((x) => x.id === id && String(x.v) === v);
    if (!l) return;
    l.q += delta;
    if (l.q <= 0) cart = cart.filter((x) => x !== l); else l.q = Math.min(l.q, 99);
    afterCartChange();
  }
  function removeLine(key) {
    const [id, v] = key.split('|');
    cart = cart.filter((x) => !(x.id === id && String(x.v) === v));
    afterCartChange();
  }
  function afterCartChange() {
    saveCart();
    $('#order-sent').hidden = true;
    $('#e-min').textContent = '';
    renderBadges();
    renderCart();
    updateCardChips();
    updateCartBar();
    refreshPreview();
  }

  /* ----------------------------- cards ----------------------------- */
  function cardHTML(it) {
    const hasV = !!it.variants;
    const p = hasV ? it.variants[0].price : it.price;
    return '<article class="card" data-id="' + esc(it.id) + '" data-cat="' + esc(it.cat) + '" data-v="0">' +
      '<div class="card-img" tabindex="0" role="button" aria-label="View larger photo of ' + esc(it.name) + '"><img src="' + esc(it.img) + '" alt="' + esc(it.name) + '" loading="lazy" width="760" height="475" onerror="this.style.display=\'none\'">' +
      (it.tag ? '<span class="tag">' + esc(it.tag) + '</span>' : '') + '</div>' +
      '<div class="card-body">' +
      '<h3>' + esc(it.name) + '</h3>' +
      (it.ar ? '<p class="ar" lang="ar" dir="rtl">' + esc(it.ar) + '</p>' : (it.cat === 'drinks' ? '<p class="ar" aria-hidden="true">&nbsp;</p>' : '')) +
      '<p class="desc">' + esc(it.desc || '') + '</p>' +
      (hasV ? '<div class="variants" role="radiogroup" aria-label="Choose an option for ' + esc(it.name) + '">' +
        it.variants.map((x, i) => '<button type="button" role="radio" aria-checked="' + (i === 0) + '" data-v="' + i + '">' + esc(x.label) + '</button>').join('') + '</div>' : '') +
      '<div class="card-foot"><span class="price"><span class="pv">' + num(p) + '</span><small>' + esc(R.currency) + '</small></span>' +
      '<button class="add-btn" type="button">' + ico('plus') + '<span>Make Order</span></button></div>' +
      '<p class="in-cart" aria-live="polite"></p>' +
      '</div></article>';
  }

  function updateCardChips() {
    $$('.card[data-id]').forEach((card) => {
      const q = cart.filter((l) => l.id === card.dataset.id).reduce((s, l) => s + l.q, 0);
      $('.in-cart', card).textContent = q ? q + ' in your order' : '';
    });
  }

  /* ------------------------------ menu ------------------------------ */
  const state = { cat: 'all', q: '' };

  function renderChips() {
    $('#cat-chips').innerHTML = [{ id: 'all', name: 'All' }].concat(R.categories).map((c) =>
      '<button class="chip" type="button" data-cat="' + esc(c.id) + '" aria-pressed="' + (state.cat === c.id) + '">' + esc(c.name) + '</button>').join('');
  }

  function renderMenu() {
    const q = state.q.trim().toLowerCase();
    const matches = (it) => (state.cat === 'all' || it.cat === state.cat) &&
      (!q || [it.name, it.ar, it.desc, it.tag, CAT[it.cat] && CAT[it.cat].name].some((s) => s && String(s).toLowerCase().includes(q)));
    const cats = R.categories.slice();
    if (MENU.some((i) => !CAT[i.cat])) cats.push({ id: '__other', name: 'Other', ar: '' });
    const groups = cats.map((c) => ({
      c: c,
      items: MENU.filter((i) => (c.id === '__other' ? !CAT[i.cat] : i.cat === c.id) && matches(i))
    })).filter((g) => g.items.length);

    const root = $('#menu-results');
    if (!groups.length) {
      root.innerHTML = '<div class="empty"><svg class="ic ic-xl"><use href="#i-search"/></svg><h2>No dishes found</h2>' +
        '<p>Nothing matches “' + esc(state.q) + '”. Try another word or pick a different category.</p>' +
        '<button class="btn btn-ghost" type="button" id="reset-filters">Show all dishes</button></div>';
      return;
    }
    root.innerHTML = groups.map((g) =>
      '<section class="cat-group" id="cat-' + esc(g.c.id) + '"><h2>' + esc(g.c.name) +
      (g.c.ar ? ' <span class="ar" lang="ar" dir="rtl">' + esc(g.c.ar) + '</span>' : '') +
      '<span class="count">' + g.items.length + (g.items.length === 1 ? ' dish' : ' dishes') + '</span></h2>' +
      '<div class="grid">' + g.items.map(cardHTML).join('') + '</div></section>').join('');
    updateCardChips();
  }

  function setCategory(id) {
    state.cat = id; state.q = '';
    $('#menu-search').value = '';
    renderChips(); renderMenu();
  }

  function renderHome() {
    $('#featured-grid').innerHTML = R.featuredIds.map((id) => BYID[id]).filter(Boolean).map(cardHTML).join('');
    $('#cat-tiles').innerHTML = R.categories.map((c) => {
      const items = MENU.filter((i) => i.cat === c.id);
      if (!items.length) return '';
      return '<button class="cat-tile" type="button" data-cat="' + esc(c.id) + '"><img src="' + esc(items[0].img) + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">' +
        '<span>' + esc(c.name) + '<small>' + items.length + (items.length === 1 ? ' item' : ' items') + '</small></span></button>';
    }).join('');
  }

  /* ------------------------------ cart view ------------------------------ */
  function renderBadges() {
    const n = count();
    $$('[data-cart-count]').forEach((b) => { b.textContent = n; b.dataset.zero = String(n === 0); });
  }

  function renderCart(focus) {
    const isEmpty = cart.length === 0;
    $('#cart-empty').hidden = !isEmpty;
    $('#cart-content').hidden = isEmpty;
    if (isEmpty) { $('#checkout').hidden = true; return; }

    $('#cart-lines').innerHTML = cart.map((l) => {
      const it = BYID[l.id];
      const key = l.id + '|' + l.v;
      const vlabel = it.variants ? it.variants[l.v].label + ', ' : '';
      return '<li class="line" data-key="' + esc(key) + '">' +
        '<img src="' + esc(it.img) + '" alt="" onerror="this.style.visibility=\'hidden\'">' +
        '<div><h3>' + esc(it.name) + '</h3><p class="meta">' + esc(vlabel) + money(unit(l)) + ' each</p>' +
        '<div class="qty" role="group" aria-label="Quantity for ' + esc(it.name) + '">' +
        '<button type="button" data-act="dec" aria-label="Decrease quantity">' + ico('minus') + '</button>' +
        '<output aria-live="polite">' + l.q + '</output>' +
        '<button type="button" data-act="inc" aria-label="Increase quantity">' + ico('plus') + '</button></div></div>' +
        '<div class="line-side"><span class="line-total">' + money(unit(l) * l.q) + '</span>' +
        '<button class="rm" type="button" data-act="rm" aria-label="Remove ' + esc(it.name) + '">' + ico('trash') + ' Remove</button></div></li>';
    }).join('');

    $('#sum-items').textContent = count();
    $('#sum-sub').textContent = money(subtotal());
    $('#sum-del').textContent = delivery() ? money(delivery()) : 'Free';
    $('#sum-total').textContent = money(total());

    if (focus) {
      const el = $('.line[data-key="' + CSS.escape(focus.key) + '"] [data-act="' + focus.act + '"]');
      if (el) el.focus();
    }
  }

  function updateCartBar() {
    const view = currentView();
    const show = view === 'menu' && count() > 0;
    $('#cart-bar').hidden = !show;
    $('#bar-count').textContent = count();
    $('#bar-total').textContent = money(subtotal());
  }

  /* ------------------------- validation helpers ------------------------- */
  function setErr(inputId, errId, msg) {
    const input = $('#' + inputId);
    $('#' + errId).textContent = msg || '';
    if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    return !msg;
  }
  function validPhone(v) {
    const t = v.trim();
    const d = t.replace(/\D/g, '');
    return /^\+?[\d\s\-().]+$/.test(t) && d.length >= 8 && d.length <= 15;
  }
  function normalizeUrl(v) {
    const t = v.trim();
    if (!t) return '';
    if (/^https?:\/\//i.test(t)) return t;
    if (/^[^\s]+\.[^\s]+$/.test(t)) return 'https://' + t;
    return t;
  }
  function validUrl(v) {
    try { const u = new URL(v); return (u.protocol === 'http:' || u.protocol === 'https:') && u.hostname.includes('.'); } catch (e) { return false; }
  }

  /* ----------------------------- checkout ----------------------------- */
  const form = $('#order-form');
  let lastMsg = '';

  function readForm() {
    return {
      name: $('#f-name').value.trim(),
      phone: $('#f-phone').value.trim(),
      address: $('#f-address').value.trim(),
      map: normalizeUrl($('#f-map').value),
      notes: $('#f-notes').value.trim()
    };
  }

  function buildOrderMessage(c) {
    const L = [];
    L.push('*New order: ' + R.name + '*', '');
    L.push('*Customer:* ' + (c.name || '-'), '*Phone:* ' + (c.phone || '-'), '');
    L.push('*Order*');
    cart.forEach((l, i) => {
      const it = BYID[l.id];
      const v = it.variants ? ' (' + it.variants[l.v].label + ')' : '';
      L.push((i + 1) + '. ' + it.name + v);
      L.push('   ' + l.q + ' x ' + money(unit(l)) + ' = ' + money(unit(l) * l.q));
    });
    L.push('', '*Subtotal:* ' + money(subtotal()));
    L.push('*Delivery:* ' + (delivery() ? money(delivery()) : 'Free'));
    L.push('*Total:* ' + money(total()), '');
    L.push('*Delivery address:* ' + (c.address || '-'));
    L.push('*Google Maps location:* ' + (c.map || 'Not provided'));
    L.push('*Special instructions:* ' + (c.notes || 'None'));
    return L.join('\n');
  }

  function refreshPreview() {
    if ($('#msg-preview').open && cart.length) $('#msg-preview-text').textContent = buildOrderMessage(readForm());
  }

  function loadCustomer() {
    try {
      const c = JSON.parse(localStorage.getItem(CUST_KEY) || '{}');
      if (c.name && !$('#f-name').value) $('#f-name').value = c.name;
      if (c.phone && !$('#f-phone').value) $('#f-phone').value = c.phone;
      if (c.address && !$('#f-address').value) $('#f-address').value = c.address;
      if (c.map && !$('#f-map').value) $('#f-map').value = c.map;
    } catch (e) { /* ignore */ }
  }
  function saveCustomer(c) {
    try { localStorage.setItem(CUST_KEY, JSON.stringify({ name: c.name, phone: c.phone, address: c.address, map: c.map })); } catch (e) { /* ignore */ }
  }

  function validateOrderForm() {
    const c = readForm();
    $('#f-map').value = c.map;
    const results = [
      setErr('f-name', 'e-name', c.name.length < 2 ? 'Enter your name so the restaurant knows who the order is for.' : ''),
      setErr('f-phone', 'e-phone', !c.phone ? 'Enter a phone number we can call.' : (!validPhone(c.phone) ? 'Enter a valid phone number, for example 050 123 4567.' : '')),
      setErr('f-address', 'e-address', !c.address ? 'Enter your delivery address.' : (c.address.length < 8 ? 'Add more detail: building, street and area.' : '')),
      setErr('f-map', 'e-map', c.map && !validUrl(c.map) ? 'This does not look like a link. Paste a full Google Maps link or use “Share my location”.' : '')
    ];
    return { c: c, ok: results.every(Boolean) };
  }

  function openCheckout() {
    if (!cart.length) { toast('Your order is empty'); return; }
    if (Number(R.minOrder) > subtotal()) {
      $('#e-min').textContent = 'The minimum order is ' + money(R.minOrder) + '. Add ' + money(R.minOrder - subtotal()) + ' more to continue.';
      return;
    }
    $('#e-min').textContent = '';
    $('#order-sent').hidden = true;
    $('#checkout').hidden = false;
    loadCustomer();
    refreshPreview();
    $('#checkout').scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => $('#f-name').focus({ preventScroll: true }), 400);
  }

  function submitOrder(e) {
    e.preventDefault();
    const err = $('#form-error');
    if (!cart.length) { err.textContent = 'Your order is empty. Add dishes from the menu first.'; err.hidden = false; return; }
    const r = validateOrderForm();
    if (!r.ok) {
      err.textContent = 'Please fix the highlighted fields and try again.';
      err.hidden = false;
      const bad = $('[aria-invalid="true"]', form);
      if (bad) bad.focus();
      return;
    }
    err.hidden = true;
    saveCustomer(r.c);
    lastMsg = buildOrderMessage(r.c);
    const url = waUrl(lastMsg);
    window.open(url, '_blank', 'noopener');
    $('#reopen-wa').href = url;
    $('#checkout').hidden = true;
    const sent = $('#order-sent');
    sent.hidden = false;
    sent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    sent.focus({ preventScroll: true });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (x) { reject(x); }
      document.body.removeChild(ta);
    });
  }

  function shareLocation() {
    const btn = $('#share-loc');
    const original = btn.innerHTML;
    $('#loc-ok').textContent = '';
    setErr('f-map', 'e-map', '');
    if (!('geolocation' in navigator)) {
      setErr('f-map', 'e-map', 'This browser cannot share your location. Paste a Google Maps link instead.');
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Finding you…';
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const la = pos.coords.latitude.toFixed(6), lo = pos.coords.longitude.toFixed(6);
        $('#f-map').value = 'https://www.google.com/maps?q=' + la + ',' + lo;
        $('#loc-ok').textContent = 'Location added. Please also check that your written address is correct.';
        btn.disabled = false; btn.innerHTML = original;
        refreshPreview();
      },
      (err) => {
        const msg = {
          1: 'Location access was denied. Allow it in your browser settings, or paste a Google Maps link instead.',
          2: 'Your location is not available right now. Paste a Google Maps link instead.',
          3: 'Finding your location took too long. Try again, or paste a Google Maps link.'
        }[err.code] || 'Could not get your location. Paste a Google Maps link instead.';
        setErr('f-map', 'e-map', msg);
        btn.disabled = false; btn.innerHTML = original;
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }

  /* ----------------------------- contact form ----------------------------- */
  function submitContact(e) {
    e.preventDefault();
    const name = $('#c-name').value.trim(), phone = $('#c-phone').value.trim(), msg = $('#c-msg').value.trim();
    const results = [
      setErr('c-name', 'ce-name', name.length < 2 ? 'Enter your name.' : ''),
      setErr('c-phone', 'ce-phone', !phone ? 'Enter your phone number.' : (!validPhone(phone) ? 'Enter a valid phone number.' : '')),
      setErr('c-msg', 'ce-msg', msg.length < 5 ? 'Write a short message (at least 5 characters).' : '')
    ];
    $('#contact-ok').textContent = '';
    if (!results.every(Boolean)) { const bad = $('#contact-form [aria-invalid="true"]'); if (bad) bad.focus(); return; }
    const text = '*Message from the website*\n*Name:* ' + name + '\n*Phone:* ' + phone + '\n*Message:* ' + msg;
    window.open(waUrl(text), '_blank', 'noopener');
    $('#contact-ok').textContent = 'WhatsApp opened with your message. It is only delivered after you tap Send there.';
  }

  /* ------------------------------ opening hours ------------------------------ */
  function fmt12(hhmm) {
    const p = hhmm.split(':').map(Number);
    return ((p[0] % 12) || 12) + ':' + String(p[1]).padStart(2, '0') + ' ' + (p[0] < 12 ? 'AM' : 'PM');
  }
  function updateOpenStatus() {
    let h, m;
    try {
      const parts = new Intl.DateTimeFormat('en-GB', { timeZone: R.hours.timezone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      h = +parts.find((p) => p.type === 'hour').value; m = +parts.find((p) => p.type === 'minute').value;
    } catch (e) { const d = new Date(); h = d.getHours(); m = d.getMinutes(); }
    const now = h * 60 + m;
    const o = R.hours.open.split(':').map(Number), c = R.hours.close.split(':').map(Number);
    const oM = o[0] * 60 + o[1], cM = c[0] * 60 + c[1];
    const open = oM < cM ? (now >= oM && now < cM) : (now >= oM || now < cM);
    const text = open ? 'Open now, closes ' + fmt12(R.hours.close) : 'Closed now, opens ' + fmt12(R.hours.open);
    [['#open-status', '#open-status-text'], ['#open-status-2', '#open-status-text-2']].forEach((p) => {
      const box = $(p[0]), t = $(p[1]);
      if (!box || !t) return;
      t.textContent = text;
      box.classList.toggle('open', open); box.classList.toggle('closed', !open);
    });
  }

  /* ------------------------------- routing ------------------------------- */
  function currentView() {
    const n = (location.hash || '#home').slice(1);
    return VIEWS.includes(n) ? n : 'home';
  }
  function route(first) {
    const name = currentView();
    $$('.view').forEach((v) => {
      const on = v.dataset.view === name;
      v.hidden = !on;
      if (on && !first) { v.classList.remove('enter'); void v.offsetWidth; v.classList.add('enter'); }
    });
    $$('[data-nav]').forEach((a) => {
      const on = a.dataset.nav === name;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    window.scrollTo({ top: 0, behavior: 'auto' });
    updateCartBar();
    if (!first) $('#main').focus({ preventScroll: true });
  }

  /* --------------------------- static content --------------------------- */
  function bindConfig() {
    document.title = R.name + ' | Order Online';
    $$('[data-cfg]').forEach((el) => {
      const k = el.dataset.cfg;
      const v = k === 'hoursText' ? R.hours.text : R[k];
      if (v != null) el.textContent = v;
    });
    $$('.brand-logo').forEach((i) => { i.src = R.logo; });
    $$('[data-wa-link]').forEach((a) => { a.href = waUrl(); });
    $$('[data-maps-link]').forEach((a) => { a.href = R.mapsLink; });
    $$('[data-insta]').forEach((a) => { a.href = 'https://www.instagram.com/' + R.instagram; a.textContent = '@' + R.instagram; });
    $$('[data-phones]').forEach((ul) => {
      ul.innerHTML = R.phones.map((p) => p.whatsapp
        ? '<li><a class="ph ph-wa" href="https://wa.me/' + esc(p.tel.replace(/\D/g, '')) + '" target="_blank" rel="noopener" aria-label="WhatsApp ' + esc(p.label) + '">' + ico('whatsapp') + esc(p.label) + '</a></li>'
        : '<li><a class="ph" href="tel:' + esc(p.tel) + '" aria-label="Call ' + esc(p.label) + '">' + ico('phone') + esc(p.label) + '</a></li>').join('');
    });
  }

  /* ---------------------------- photo viewer ---------------------------- */
  const lb = { el: $('#lightbox'), id: null, v: 0, trigger: null };
  function openLightbox(card) {
    const it = BYID[card.dataset.id];
    lb.id = it.id; lb.v = +card.dataset.v || 0; lb.trigger = $('.card-img', card);
    const vlabel = it.variants ? ' (' + it.variants[lb.v].label + ')' : '';
    $('#lb-img').src = it.img;
    $('#lb-img').alt = it.name;
    $('#lb-title').textContent = it.name + vlabel;
    $('#lb-ar').textContent = it.ar || '';
    $('#lb-desc').textContent = it.desc || '';
    $('#lb-price').textContent = num(it.variants ? it.variants[lb.v].price : it.price);
    $('#lb-cur').textContent = R.currency;
    lb.el.hidden = false;
    document.body.classList.add('lb-open');
    $('.lb-close', lb.el).focus();
  }
  function closeLightbox() {
    if (lb.el.hidden) return;
    lb.el.hidden = true;
    document.body.classList.remove('lb-open');
    $('#lb-img').removeAttribute('src');
    if (lb.trigger) lb.trigger.focus({ preventScroll: true });
  }
  $('#lb-add').addEventListener('click', () => {
    const it = BYID[lb.id];
    addToCart(lb.id, lb.v);
    const span = $('#lb-add span');
    span.textContent = 'Added';
    setTimeout(() => { span.textContent = 'Make Order'; }, 1100);
    toast(it.name + ' added to your order');
  });
  document.addEventListener('keydown', (e) => {
    if (!lb.el.hidden) {
      if (e.key === 'Escape') { closeLightbox(); return; }
      if (e.key === 'Tab') {
        const f = $$('button', lb.el).filter((b) => !b.disabled);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      return;
    }
    const ci = e.target.closest && e.target.closest('.card-img');
    if (ci && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLightbox(ci.closest('.card')); }
  });

  /* ------------------------------ events ------------------------------ */
  document.addEventListener('click', (e) => {
    const t = e.target;

    if (t.closest('[data-close]') && !lb.el.hidden) { closeLightbox(); return; }
    const pic = t.closest('.card-img');
    if (pic) { openLightbox(pic.closest('.card')); return; }

    const vbtn = t.closest('.variants button');
    if (vbtn) {
      const card = vbtn.closest('.card'), it = BYID[card.dataset.id], v = +vbtn.dataset.v;
      card.dataset.v = v;
      $$('.variants button', card).forEach((b) => b.setAttribute('aria-checked', String(b === vbtn)));
      $('.pv', card).textContent = num(it.variants[v].price);
      return;
    }
    const add = t.closest('.card .add-btn');
    if (add) {
      const card = add.closest('.card'), it = BYID[card.dataset.id];
      addToCart(it.id, +card.dataset.v || 0);
      const label = $('span', add);
      add.classList.add('added'); label.textContent = 'Added';
      setTimeout(() => { add.classList.remove('added'); label.textContent = 'Make Order'; }, 1100);
      toast(it.name + ' added to your order');
      return;
    }
    const chip = t.closest('.chip');
    if (chip) { state.cat = chip.dataset.cat; renderChips(); renderMenu(); return; }
    const tile = t.closest('.cat-tile');
    if (tile) { setCategory(tile.dataset.cat); location.hash = '#menu'; return; }
    if (t.closest('#reset-filters')) { setCategory('all'); return; }

    const act = t.closest('#cart-lines [data-act]');
    if (act) {
      const key = act.closest('.line').dataset.key, a = act.dataset.act;
      if (a === 'inc') changeQty(key, 1);
      else if (a === 'dec') changeQty(key, -1);
      else removeLine(key);
      if (a !== 'rm') renderCart({ key: key, act: a });
      return;
    }
  });

  $('#menu-search').addEventListener('input', (() => {
    let timer;
    return (e) => { clearTimeout(timer); timer = setTimeout(() => { state.q = e.target.value; renderMenu(); }, 120); };
  })());

  $('#place-order').addEventListener('click', openCheckout);
  $('#clear-cart').addEventListener('click', () => {
    if (window.confirm('Remove all items from your order?')) { cart = []; afterCartChange(); toast('Order emptied'); }
  });
  form.addEventListener('submit', submitOrder);
  form.addEventListener('input', (e) => {
    if (e.target.hasAttribute('aria-invalid')) e.target.removeAttribute('aria-invalid');
    const err = $('#e-' + ({ 'f-name': 'name', 'f-phone': 'phone', 'f-address': 'address', 'f-map': 'map' }[e.target.id] || 'x'));
    if (err) err.textContent = '';
    $('#form-error').hidden = true;
    refreshPreview();
  });
  $('#msg-preview').addEventListener('toggle', refreshPreview);
  $('#share-loc').addEventListener('click', shareLocation);
  $('#copy-msg').addEventListener('click', () => {
    copyText(lastMsg).then(() => toast('Message copied')).catch(() => toast('Could not copy. Use Open WhatsApp again.'));
  });
  $('#new-order').addEventListener('click', () => {
    cart = []; $('#f-notes').value = '';
    afterCartChange(); toast('Ready for a new order');
  });
  $('#contact-form').addEventListener('submit', submitContact);
  $('#contact-form').addEventListener('input', (e) => {
    e.target.removeAttribute('aria-invalid');
    const err = $('#ce-' + ({ 'c-name': 'name', 'c-phone': 'phone', 'c-msg': 'msg' }[e.target.id] || 'x'));
    if (err) err.textContent = '';
  });
  $('.skip').addEventListener('click', (e) => { e.preventDefault(); $('#main').focus(); });
  window.addEventListener('hashchange', () => route(false));

  /* -------------------------------- init -------------------------------- */
  bindConfig();
  renderHome();
  renderChips();
  renderMenu();
  renderBadges();
  renderCart();
  updateCardChips();
  updateOpenStatus();
  setInterval(updateOpenStatus, 60000);
  route(true);
})();
