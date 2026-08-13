/* ============ Ruchulu Junction — Shared Cart / Theme utilities ============ */
const CART_KEY = 'ruchulu_cart';
const THEME_KEY = 'ruchulu_theme';
const ORDER_SEQ_KEY = 'ruchulu_order_seq';
const LAST_ORDER_KEY = 'ruchulu_last_order';
const GST_RATE = 0.05;       // 5% GST, typical for standalone Indian restaurants
const PACKAGING_FEE = 15;    // flat packaging charge, like Swiggy/Zomato

function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }catch(e){ return []; } }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function formatINR(n){
  return '₹' + Number(n).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2});
}

function cartTotals(cart){
  cart = cart || getCart();
  const subtotal = cart.reduce((s,i)=> s + i.unitPrice*i.qty, 0);
  const gst = subtotal * GST_RATE;
  const packaging = cart.length > 0 ? PACKAGING_FEE : 0;
  const total = subtotal + gst + packaging;
  return { subtotal, gst, packaging, total };
}

/* ---------------- Theme ---------------- */
function initTheme(){
  const saved = localStorage.getItem(THEME_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.getElementById('themeToggle');
  if(btn) btn.textContent = saved === 'dark' ? '☀️' : '🌙';
  if(btn){
    btn.addEventListener('click', ()=>{
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }
}

/* ---------------- Cart badge (every page) ---------------- */
function renderCartBadge(){
  const el = document.getElementById('cartCount');
  if(!el) return;
  const cart = getCart();
  el.textContent = cart.reduce((s,i)=>s+i.qty,0);
}

/* ---------------- Cart drawer (pages that include it) ---------------- */
function renderCartDrawer(){
  const wrap = document.getElementById('cartItems');
  if(!wrap) return;
  const cart = getCart();
  const { subtotal, gst, packaging, total } = cartTotals(cart);

  const elSub = document.getElementById('sumSubtotal');
  const elGst = document.getElementById('sumGst');
  const elPkg = document.getElementById('sumPackaging');
  const elTot = document.getElementById('sumTotal');
  const elFabTotal = document.getElementById('fabTotal');
  const fab = document.getElementById('fabCart');
  const goCheckout = document.getElementById('goCheckout');

  if(elSub) elSub.textContent = formatINR(subtotal);
  if(elGst) elGst.textContent = formatINR(gst);
  if(elPkg) elPkg.textContent = formatINR(packaging);
  if(elTot) elTot.textContent = formatINR(total);
  if(elFabTotal) elFabTotal.textContent = formatINR(total);
  if(fab) fab.style.display = cart.length>0 ? 'flex' : 'none';
  if(goCheckout) goCheckout.disabled = cart.length===0;

  if(cart.length===0){
    wrap.innerHTML = `<div class="empty-state"><span class="em">🍽️</span>Your cart is empty.<br>Head to the menu to add something tasty.</div>`;
  } else {
    wrap.innerHTML = cart.map(ci=>{
      const meta = ci.optionSummary && ci.optionSummary.length ? ci.optionSummary.join(', ') : 'Regular';
      return `
      <div class="cart-item" data-cid="${ci.cartId}">
        <div class="cart-item-img" data-food-img="${ci.itemId}"></div>
        <div class="cart-item-info">
          <div class="name">${ci.name}</div>
          <div class="meta">${meta}${ci.notes ? ' · "'+ci.notes+'"' : ''}</div>
          <div class="cart-item-ctrl">
            <div class="mini-stepper">
              <button class="mini-btn" data-act="dec">−</button>
              <span class="mono" style="font-size:13px;">${ci.qty}</span>
              <button class="mini-btn" data-act="inc">+</button>
            </div>
            <button class="remove-link" data-act="rm">Remove</button>
          </div>
        </div>
        <div class="cart-item-price mono">${formatINR(ci.unitPrice*ci.qty)}</div>
      </div>`;
    }).join('');

    wrap.querySelectorAll('.cart-item').forEach(row=>{
      const cid = row.dataset.cid;
      row.querySelector('[data-act="inc"]').addEventListener('click', ()=>{
        const c = getCart(); const it = c.find(x=>x.cartId===cid); it.qty++; saveCart(c); renderCartDrawer(); renderCartBadge();
      });
      row.querySelector('[data-act="dec"]').addEventListener('click', ()=>{
        let c = getCart(); const it = c.find(x=>x.cartId===cid);
        if(it.qty>1){ it.qty--; } else { c = c.filter(x=>x.cartId!==cid); }
        saveCart(c); renderCartDrawer(); renderCartBadge();
      });
      row.querySelector('[data-act="rm"]').addEventListener('click', ()=>{
        const c = getCart().filter(x=>x.cartId!==cid); saveCart(c); renderCartDrawer(); renderCartBadge();
      });
    });

    if(typeof initFoodImages === 'function'){
      const cartMenuItems = cart.map(ci => MENU.find(m=>m.id===ci.itemId)).filter(Boolean);
      initFoodImages(cartMenuItems);
    }
  }
}

function initCartDrawer(){
  const openBtn = document.getElementById('openCartBtn');
  const fab = document.getElementById('fabCart');
  const closeBtn = document.getElementById('closeCart');
  const overlay = document.getElementById('drawerOverlay');
  const drawer = document.getElementById('cartDrawer');
  function open(){ drawer && drawer.classList.add('open'); overlay && overlay.classList.add('open'); renderCartDrawer(); }
  function close(){ drawer && drawer.classList.remove('open'); overlay && overlay.classList.remove('open'); }
  if(openBtn) openBtn.addEventListener('click', open);
  if(fab) fab.addEventListener('click', open);
  if(closeBtn) closeBtn.addEventListener('click', close);
  if(overlay) overlay.addEventListener('click', close);
  const goCheckout = document.getElementById('goCheckout');
  if(goCheckout) goCheckout.addEventListener('click', ()=>{
    if(getCart().length===0) return;
    window.location.href = 'checkout.html';
  });
  renderCartDrawer();
}

/* ---------------- Add to cart (used by menu/home customize modal) ---------------- */
function addToCart(entry){
  const cart = getCart();
  cart.push(Object.assign({ cartId: Date.now()+'-'+Math.random().toString(16).slice(2) }, entry));
  saveCart(cart);
  renderCartBadge();
  renderCartDrawer();
}

/* ---------------- Toran bunting generator ---------------- */
function renderToran(){
  document.querySelectorAll('.toran').forEach(t=>{
    if(t.childElementCount>0) return;
    let html = '';
    for(let i=0;i<40;i++) html += '<span></span>';
    t.innerHTML = html;
  });
}

/* ---------------- Nav active state ---------------- */
function markActiveNav(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a=>{
    if(a.getAttribute('href') === path) a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initTheme();
  renderCartBadge();
  renderToran();
  markActiveNav();
  initCartDrawer();
});
