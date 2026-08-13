/* ============ Ruchulu Junction — Customize Modal (shared) ============ */
let custState = null;

function openCustomize(itemId){
  const item = MENU.find(i=>i.id===itemId);
  if(!item) return;
  const groups = item.optionGroups || [];
  custState = {
    item, qty:1, notes:'',
    // selections[groupIndex] = optionIndex (single) or Set(optionIndex) (multi)
    selections: groups.map(g => g.type === 'single' ? 0 : new Set()),
  };
  document.getElementById('custTitle').textContent = item.name;
  document.getElementById('custTelugu').textContent = item.teluguName || '';
  const thumb = document.getElementById('custThumb');
  if(thumb){ thumb.setAttribute('data-food-img', item.id); initFoodImages([item]); }
  renderCustBody();
  document.getElementById('customizeOverlay').classList.add('open');
}

function renderCustBody(){
  const { item, selections } = custState;
  const groups = item.optionGroups || [];
  let html = `<p style="font-size:13.5px; color:var(--text-muted); margin-top:-8px;">${item.desc}</p>`;

  groups.forEach((g, gi) => {
    html += `<div class="opt-group"><h4>${g.label}</h4><div class="opt-list" data-gi="${gi}">`;
    g.options.forEach((opt, oi) => {
      const isSelected = g.type === 'single' ? selections[gi] === oi : selections[gi].has(oi);
      html += `
        <div class="opt-row ${isSelected?'selected':''}" data-oi="${oi}">
          <div class="left"><span class="${g.type==='single'?'radio-dot':'check-box'}"></span>${opt.name}</div>
          <div class="delta mono">${opt.delta>0 ? '+₹'+opt.delta : 'Included'}</div>
        </div>`;
    });
    html += `</div></div>`;
  });

  html += `<div class="opt-group"><h4>Special Instructions</h4>
    <textarea id="custNotes" placeholder="Less spicy, no onions, extra chutney, etc.">${custState.notes}</textarea></div>`;
  document.getElementById('custBody').innerHTML = html;

  groups.forEach((g, gi) => {
    document.querySelectorAll(`.opt-list[data-gi="${gi}"] .opt-row`).forEach(row=>{
      row.addEventListener('click', ()=>{
        const oi = +row.dataset.oi;
        if(g.type === 'single'){
          custState.selections[gi] = oi;
        } else {
          const set = custState.selections[gi];
          set.has(oi) ? set.delete(oi) : set.add(oi);
        }
        renderCustBody();
        updateCustTotal();
      });
    });
  });
  const notesEl = document.getElementById('custNotes');
  if(notesEl) notesEl.addEventListener('input', e => custState.notes = e.target.value);
  updateCustTotal();
}

function custUnitPrice(){
  const { item, selections } = custState;
  const groups = item.optionGroups || [];
  let p = item.price;
  groups.forEach((g, gi) => {
    if(g.type === 'single'){
      const opt = g.options[selections[gi]];
      if(opt) p += opt.delta;
    } else {
      selections[gi].forEach(oi => p += g.options[oi].delta);
    }
  });
  return p;
}

function custOptionSummary(){
  const { item, selections } = custState;
  const groups = item.optionGroups || [];
  const parts = [];
  groups.forEach((g, gi) => {
    if(g.type === 'single'){
      const opt = g.options[selections[gi]];
      if(opt) parts.push(opt.name);
    } else {
      selections[gi].forEach(oi => parts.push(g.options[oi].name));
    }
  });
  return parts;
}

function updateCustTotal(){
  const total = custUnitPrice() * custState.qty;
  document.getElementById('custTotal').textContent = '₹' + total.toFixed(2);
  document.getElementById('custQty').textContent = custState.qty;
}

document.addEventListener('DOMContentLoaded', ()=>{
  const minus = document.getElementById('custMinus');
  const plus = document.getElementById('custPlus');
  const closeBtn = document.getElementById('custClose');
  const overlay = document.getElementById('customizeOverlay');
  const addBtn = document.getElementById('custAdd');

  if(minus) minus.addEventListener('click', ()=>{ if(custState.qty>1){ custState.qty--; updateCustTotal(); }});
  if(plus) plus.addEventListener('click', ()=>{ custState.qty++; updateCustTotal(); });
  if(closeBtn) closeBtn.addEventListener('click', ()=> overlay.classList.remove('open'));
  if(overlay) overlay.addEventListener('click', e=>{ if(e.target.id==='customizeOverlay') overlay.classList.remove('open'); });

  if(addBtn) addBtn.addEventListener('click', ()=>{
    const { item, qty, notes } = custState;
    const unit = custUnitPrice();
    addToCart({
      itemId: item.id, name:item.name, unitPrice:unit, qty,
      optionSummary: custOptionSummary(),
      notes,
    });
    overlay.classList.remove('open');
    const drawer = document.getElementById('cartDrawer');
    const dOverlay = document.getElementById('drawerOverlay');
    if(drawer){ drawer.classList.add('open'); dOverlay.classList.add('open'); renderCartDrawer(); }
  });
});
