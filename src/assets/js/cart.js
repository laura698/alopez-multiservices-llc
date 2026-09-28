// ─── Alopez Multiservices LLC — Cart Module (localStorage) ────────────────────
(function () {
  const STORAGE_KEY = 'alopez_cart';

  // ── Helpers ──────────────────────────────────────────────────────────────────
  function getCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateBadge();
    window.dispatchEvent(new Event('cart-updated'));
  }
  function itemId(item) {
    return item.name + '|' + item.img;
  }

  // ── Public API (attached to window) ──────────────────────────────────────────
  window.AlopezCart = {
    getAll()          { return getCart(); },
    count()           { return getCart().reduce((s, i) => s + i.qty, 0); },
    total()           { return getCart().reduce((s, i) => s + i.price * i.qty, 0); },

    add(product, qty) {
      qty = qty || 1;
      const cart = getCart();
      const id   = itemId(product);
      const idx  = cart.findIndex(i => itemId(i) === id);
      if (idx >= 0) {
        cart[idx].qty += qty;
      } else {
        cart.push({
          name:  product.name,
          price: parseFloat(product.price),
          originalPrice: parseFloat(product.originalPrice) || null,
          img:   product.img,
          brand: product.brand || '',
          model: product.model || '',
          cat:   product.cat   || '',
          qty:   qty,
          detailUrl: product.detailUrl || ''
        });
      }
      saveCart(cart);
      showToast(product.name);
    },

    updateQty(index, qty) {
      const cart = getCart();
      if (!cart[index]) return;
      cart[index].qty = Math.max(1, qty);
      saveCart(cart);
    },

    remove(index) {
      const cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
    },

    clear() {
      localStorage.removeItem(STORAGE_KEY);
      updateBadge();
      window.dispatchEvent(new Event('cart-updated'));
    }
  };

  // ── Badge counter ────────────────────────────────────────────────────────────
  function updateBadge() {
    document.querySelectorAll('.cart-badge').forEach(el => {
      const count = window.AlopezCart.count();
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // ── Toast notification ───────────────────────────────────────────────────────
  function showToast(productName) {
    const lang = localStorage.getItem('lang') || 'en';
    const msg = lang === 'es'
      ? `"${productName}" agregado al carrito`
      : `"${productName}" added to cart`;

    const old = document.getElementById('cart-toast');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.id = 'cart-toast';
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;align-items:center;gap:10px;background:#164e63;color:#fff;padding:12px 20px;border-radius:9999px;font-size:14px;box-shadow:0 8px 30px rgba(0,0,0,.25);transform:translateY(80px);opacity:0;transition:all .35s cubic-bezier(.21,1.02,.73,1)';
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#22d3ee" style="width:20px;height:20px;flex-shrink:0">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span>${msg}</span>`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
    setTimeout(() => {
      toast.style.transform = 'translateY(80px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  // ── Init badge on load ───────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateBadge);
  } else {
    updateBadge();
  }
})();
