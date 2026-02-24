/* Demo Extranet PeruRail - My Cusco Trip (GitHub Pages, sin backend) */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* Promo */
const PROMO_END_ISO = "2026-02-27"; // vigente hasta 27-feb-2026
const VALID_COUPON = "MCT50";
const COUPON_RATE = 0.50;

/* Beneficios por millas */
const BENEFIT_HB_HALF_ONEWAY = 9;     // 09 pasajes (one way) HB al 50%
const BENEFIT_VISTADOME_RATE = 0.12;  // 12% Vistadome
const BENEFIT_EXPED_RATE = 0.09;      // 9% Expedition

/* Millas por año (2016–2026) */
const MILES_HISTORY = [
  { year: 2016, pts: 818 },
  { year: 2017, pts: 2316 },
  { year: 2018, pts: 1911 },
  { year: 2019, pts: 3229 },
  { year: 2020, pts: 102 },
  { year: 2021, pts: 307 },
  { year: 2022, pts: 405 },
  { year: 2023, pts: 481 },
  { year: 2024, pts: 118 },
  { year: 2025, pts: 712 },
  { year: 2026, pts: 52 },
];

/* Datos horarios (referenciales) */
const SCHEDULES = [
  // OLLA -> MAPI
  { route:"OLLA-MAPI", service:"Expedition", train:"71", depart:"06:10", arrive:"07:44", duration:"1 hr. 32 min", promo:61.75, regular:65.00 },
  { route:"OLLA-MAPI", service:"Expedition", train:"81", depart:"07:05", arrive:"08:35", duration:"1 hr. 30 min", promo:61.75, regular:65.00 },
  { route:"OLLA-MAPI", service:"Vistadome", train:"301", depart:"07:45", arrive:"09:07", duration:"1 hr. 22 min", promo:75.05, regular:79.00 },
  { route:"OLLA-MAPI", service:"Expedition", train:"83", depart:"08:00", arrive:"09:15", duration:"1 hr. 30 min", promo:61.75, regular:65.00 },
  { route:"OLLA-MAPI", service:"Vistadome Observatory", train:"83", depart:"08:00", arrive:"09:15", duration:"1 hr. 30 min", promo:133.00, regular:140.00 },
  { route:"OLLA-MAPI", service:"Vistadome", train:"601", depart:"08:29", arrive:"09:54", duration:"1 hr. 25 min", promo:65.55, regular:69.00 },
  { route:"OLLA-MAPI", service:"Expedition", train:"33", depart:"08:53", arrive:"10:18", duration:"1 hr. 25 min", promo:65.55, regular:69.00 },
  { route:"OLLA-MAPI", service:"Vistadome Observatory", train:"33", depart:"08:53", arrive:"10:18", duration:"1 hr. 25 min", promo:133.00, regular:140.00 },
  { route:"OLLA-MAPI", service:"Vistadome", train:"501", depart:"09:15", arrive:"10:51", duration:"1 hr. 36 min", promo:65.55, regular:69.00 },
  { route:"OLLA-MAPI", service:"Expedition", train:"31", depart:"10:32", arrive:"12:09", duration:"1 hr. 37 min", promo:65.55, regular:69.00 },
  { route:"OLLA-MAPI", service:"Vistadome", train:"31", depart:"10:32", arrive:"12:09", duration:"1 hr. 37 min", promo:75.05, regular:79.00 },
  { route:"OLLA-MAPI", service:"Expedition", train:"203", depart:"10:53", arrive:"12:32", duration:"1 hr. 39 min", promo:65.55, regular:69.00 },
  { route:"OLLA-MAPI", service:"Vistadome Observatory", train:"203", depart:"10:53", arrive:"12:32", duration:"1 hr. 39 min", promo:190.00, regular:200.00 },
  { route:"OLLA-MAPI", service:"Hiram Bingham", train:"11", depart:"11:52", arrive:"13:23", duration:"1 hr. 31 min", promo:570.00, regular:600.00 },
  { route:"OLLA-MAPI", service:"Expedition", train:"91", depart:"12:55", arrive:"14:37", duration:"1 hr. 42 min", promo:58.90, regular:62.00 },
  { route:"OLLA-MAPI", service:"Expedition", train:"73", depart:"13:27", arrive:"14:57", duration:"1 hr. 30 min", promo:61.75, regular:65.00 },
  { route:"OLLA-MAPI", service:"Vistadome", train:"73", depart:"13:27", arrive:"14:57", duration:"1 hr. 30 min", promo:65.55, regular:69.00 },
  { route:"OLLA-MAPI", service:"Vistadome Observatory", train:"303", depart:"15:37", arrive:"17:00", duration:"1 hr. 23 min", promo:94.05, regular:99.00 },
  { route:"OLLA-MAPI", service:"Expedition", train:"603", depart:"19:04", arrive:"20:29", duration:"1 hr. 25 min", promo:65.55, regular:69.00 },
  { route:"OLLA-MAPI", service:"Vistadome Observatory", train:"603", depart:"19:04", arrive:"20:29", duration:"1 hr. 25 min", promo:133.00, regular:140.00 },
  { route:"OLLA-MAPI", service:"Expedition", train:"75", depart:"21:00", arrive:"22:41", duration:"1 hr. 41 min", promo:61.75, regular:65.00 },
  { route:"OLLA-MAPI", service:"Vistadome", train:"75", depart:"21:00", arrive:"22:41", duration:"1 hr. 41 min", promo:65.55, regular:69.00 },
  { route:"OLLA-MAPI", service:"Expedition", train:"51", depart:"21:00", arrive:"22:45", duration:"1 hr. 45 min", promo:58.90, regular:62.00 },

  // MAPI -> OLLA
  { route:"MAPI-OLLA", service:"Expedition", train:"50", depart:"08:53", arrive:"10:52", duration:"1 hr. 59 min", promo:58.90, regular:62.00 },
  { route:"MAPI-OLLA", service:"Expedition", train:"72", depart:"10:55", arrive:"12:32", duration:"1 hr. 37 min", promo:61.75, regular:65.00 },
  { route:"MAPI-OLLA", service:"Vistadome Observatory", train:"302", depart:"12:46", arrive:"14:19", duration:"1 hr. 33 min", promo:94.05, regular:99.00 },
  { route:"MAPI-OLLA", service:"Vistadome", train:"602", depart:"13:37", arrive:"15:04", duration:"1 hr. 27 min", promo:65.55, regular:69.00 },
  { route:"MAPI-OLLA", service:"Expedition", train:"204", depart:"14:55", arrive:"16:31", duration:"1 hr. 36 min", promo:65.55, regular:69.00 },
  { route:"MAPI-OLLA", service:"Vistadome Observatory", train:"204", depart:"14:55", arrive:"16:31", duration:"1 hr. 36 min", promo:133.00, regular:140.00 },
  { route:"MAPI-OLLA", service:"Expedition", train:"74", depart:"15:20", arrive:"17:08", duration:"1 hr. 48 min", promo:65.55, regular:69.00 },
  { route:"MAPI-OLLA", service:"Vistadome", train:"74", depart:"15:20", arrive:"17:08", duration:"1 hr. 48 min", promo:75.05, regular:79.00 },
  { route:"MAPI-OLLA", service:"Expedition", train:"34", depart:"15:48", arrive:"17:29", duration:"1 hr. 41 min", promo:65.55, regular:69.00 },
  { route:"MAPI-OLLA", service:"Vistadome Observatory", train:"34", depart:"15:48", arrive:"17:29", duration:"1 hr. 41 min", promo:133.00, regular:140.00 },
  { route:"MAPI-OLLA", service:"Vistadome", train:"304", depart:"16:22", arrive:"18:10", duration:"1 hr. 48 min", promo:75.05, regular:79.00 },
  { route:"MAPI-OLLA", service:"Expedition", train:"504", depart:"16:43", arrive:"18:31", duration:"1 hr. 48 min", promo:65.55, regular:69.00 },
  { route:"MAPI-OLLA", service:"Vistadome Observatory", train:"504", depart:"16:43", arrive:"18:31", duration:"1 hr. 48 min", promo:133.00, regular:140.00 },
  { route:"MAPI-OLLA", service:"Expedition", train:"32", depart:"17:23", arrive:"19:02", duration:"1 hr. 39 min", promo:65.55, regular:69.00 },
  { route:"MAPI-OLLA", service:"Vistadome", train:"32", depart:"17:23", arrive:"19:02", duration:"1 hr. 39 min", promo:75.05, regular:79.00 },
  { route:"MAPI-OLLA", service:"Expedition", train:"604", depart:"17:50", arrive:"19:25", duration:"1 hr. 35 min", promo:65.55, regular:69.00 },
  { route:"MAPI-OLLA", service:"Vistadome Observatory", train:"604", depart:"17:50", arrive:"19:25", duration:"1 hr. 35 min", promo:133.00, regular:140.00 },
  { route:"MAPI-OLLA", service:"Hiram Bingham", train:"12", depart:"18:10", arrive:"19:51", duration:"1 hr. 41 min", promo:570.00, regular:600.00 },
  { route:"MAPI-OLLA", service:"Vistadome", train:"606", depart:"18:20", arrive:"20:05", duration:"1 hr. 45 min", promo:75.05, regular:79.00 },
  { route:"MAPI-OLLA", service:"Expedition", train:"84", depart:"20:50", arrive:"22:20", duration:"1 hr. 30 min", promo:65.55, regular:69.00 },
  { route:"MAPI-OLLA", service:"Vistadome", train:"84", depart:"20:50", arrive:"22:20", duration:"1 hr. 30 min", promo:75.05, regular:79.00 },
  { route:"MAPI-OLLA", service:"Expedition", train:"86", depart:"21:50", arrive:"23:37", duration:"1 hr. 47 min", promo:65.55, regular:69.00 },
  { route:"MAPI-OLLA", service:"Expedition", train:"76", depart:"21:50", arrive:"23:37", duration:"1 hr. 47 min", promo:58.90, regular:62.00 },
  { route:"MAPI-OLLA", service:"Vistadome", train:"76", depart:"21:50", arrive:"23:37", duration:"1 hr. 47 min", promo:61.75, regular:65.00 },
];

/* Helpers */
function money(n){ return `USD ${Number(n).toFixed(2)}`; }
function toMinutes(hhmm){
  const [h,m] = hhmm.split(":").map(Number);
  return h*60 + m;
}
function sum(arr){ return arr.reduce((a,b)=>a+b,0); }
function isoToday(){
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset()*60000);
  return local.toISOString().slice(0,10);
}
function isPromoActive(){
  // Promo válida hasta e incluyendo PROMO_END_ISO
  const today = isoToday();
  return today <= PROMO_END_ISO;
}
function passengersCount(){
  const a = Number($("#paxAdult")?.value || 0);
  const c = Number($("#paxChild")?.value || 0);
  const g = Number($("#paxGuide")?.value || 0);
  return a + c + g;
}
function safeUpper(s){ return (s || "").trim().toUpperCase(); }

/* App elements */
const loginView = $("#loginView");
const appView = $("#appView");
const loginForm = $("#loginForm");
const logoutBtn = $("#logoutBtn");

/* Views */
const viewCompra = $("#view-compra");
const viewMillas = $("#view-millas");
const viewCanjes = $("#view-canjes");
const viewReportes = $("#view-reportes");
const viewOpciones = $("#view-opciones");

/* Compra elements */
const tripType = $("#tripType");
const returnWrap = $("#returnWrap");
const dateOut = $("#dateOut");
const dateBack = $("#dateBack");
const routeSel = $("#route");
const serviceSel = $("#service");
const sortBy = $("#sortBy");
const resultsBody = $("#resultsBody");
const countLabel = $("#countLabel");
const buyBtn = $("#buyBtn");
const couponCode = $("#couponCode");
const applyCouponBtn = $("#applyCouponBtn");
const couponStatus = $("#couponStatus");
const promoStateText = $("#promoStateText");

/* Millas elements */
const milesBody = $("#milesBody");
const milesTotal = $("#milesTotal");
const benefitsList = $("#benefitsList");
const benefitsNote = $("#benefitsNote");
const promoStatusBox = $("#promoStatusBox");

/* Canjes elements */
const redeemForm = $("#redeemForm");
const redeemRoute = $("#redeemRoute");
const redeemService = $("#redeemService");
const redeemTrain = $("#redeemTrain");
const redeemDate = $("#redeemDate");
const openDate = $("#openDate");
const redeemQty = $("#redeemQty");
const redeemCoupon = $("#redeemCoupon");
const redeemApplyCouponBtn = $("#redeemApplyCouponBtn");
const redeemCouponStatus = $("#redeemCouponStatus");
const redeemPromoBadge = $("#redeemPromoBadge");

const sumBase = $("#sumBase");
const sumRank = $("#sumRank");
const sumHB = $("#sumHB");
const sumCoupon = $("#sumCoupon");
const sumTotal = $("#sumTotal");
const sumMeta = $("#sumMeta");
const availBenefits = $("#availBenefits");
const confirmBtn = $("#confirmBtn");

/* State */
let selectedRowId = null;
let compraCouponApplied = false;

let redeemCouponApplied = false;
let hbHalfAvailable = BENEFIT_HB_HALF_ONEWAY; // simulación: se va consumiendo al confirmar canje

function ensureDates(){
  if(dateOut) dateOut.value = dateOut.value || isoToday();

  const d = new Date();
  d.setDate(d.getDate()+1);
  const local = new Date(d.getTime() - d.getTimezoneOffset()*60000);
  const tomorrow = local.toISOString().slice(0,10);
  if(dateBack) dateBack.value = dateBack.value || tomorrow;

  if(redeemDate) redeemDate.value = redeemDate.value || isoToday();
}

function toggleReturn(){
  const isRT = tripType.value === "roundtrip";
  returnWrap.style.display = isRT ? "flex" : "none";
}

function updatePromoUI(){
  const active = isPromoActive();

  if(promoStateText){
    promoStateText.textContent = active
      ? "Vigente hasta 27-feb-2026. Aplica el cupón para reducir automáticamente el total."
      : "Promo expirada. El cupón y los canjes promocionales están deshabilitados.";
  }

  // Compra
  if(!active){
    compraCouponApplied = false;
    if(couponStatus){
      couponStatus.classList.remove("ok");
      couponStatus.classList.add("bad");
      couponStatus.textContent = "Promo expirada. Cupón deshabilitado.";
    }
  } else {
    if(couponStatus && couponStatus.textContent.trim() === ""){
      couponStatus.textContent = "Sin cupón aplicado.";
    }
  }

  // Canjes badge
  if(redeemPromoBadge){
    redeemPromoBadge.textContent = active ? "Promo vigente" : "Promo expirada";
    redeemPromoBadge.classList.toggle("pill--gold", active);
  }

  if(promoStatusBox){
    promoStatusBox.textContent = active
      ? "Promo vigente hasta 27-feb-2026."
      : "Promo expirada. No aplica cupón ni beneficios promocionales.";
  }
}

function filterCompra(){
  const route = routeSel.value;
  const service = serviceSel.value;

  let rows = SCHEDULES.filter(r => r.route === route);

  if(service !== "ALL"){
    rows = rows.filter(r => r.service === service);
  }

  const s = sortBy.value;
  rows.sort((a,b)=>{
    if(s === "timeAsc") return toMinutes(a.depart) - toMinutes(b.depart);
    if(s === "timeDesc") return toMinutes(b.depart) - toMinutes(a.depart);
    if(s === "priceAsc") return a.promo - b.promo;
    if(s === "priceDesc") return b.promo - a.promo;
    return 0;
  });

  return rows;
}

function compraTotalFromUnit(unitPrice){
  const pax = passengersCount();
  let total = unitPrice * pax;

  if(isPromoActive() && compraCouponApplied){
    total = total * (1 - COUPON_RATE);
  }

  return total;
}

function renderCompra(){
  const rows = filterCompra();
  resultsBody.innerHTML = "";
  selectedRowId = null;
  buyBtn.disabled = true;

  const couponActive = isPromoActive() && compraCouponApplied;

  rows.forEach((r, idx) => {
    const id = `${r.route}|${r.service}|${r.train}|${r.depart}|${idx}`;
    const importe = compraTotalFromUnit(r.promo);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input class="radio" type="radio" name="pick" value="${id}" aria-label="Seleccionar"></td>
      <td><span class="pill">${r.route}</span></td>
      <td><span class="pill pill--gold">${r.service}</span></td>
      <td>${r.train}</td>
      <td><strong>${r.depart}</strong></td>
      <td>${r.arrive}</td>
      <td>${r.duration}</td>
      <td class="money">
        ${money(r.promo)}
        ${couponActive ? `<div style="font-size:11px;color:rgba(14,31,63,.75);font-weight:900;margin-top:4px;">Cupón -50%</div>` : ``}
      </td>
      <td>${money(r.regular)}</td>
      <td class="money">
        ${couponActive ? `<span style="text-decoration:line-through;color:#6b7280;font-weight:800;margin-right:8px;">${money(r.promo * passengersCount())}</span>` : ``}
        ${money(importe)}
      </td>
    `;
    resultsBody.appendChild(tr);
  });

  countLabel.textContent = `${rows.length} resultados`;
}

function setCompraCouponStatus(){
  if(!isPromoActive()){
    couponStatus.classList.remove("ok");
    couponStatus.classList.add("bad");
    couponStatus.textContent = "Promo expirada. Cupón deshabilitado.";
    return;
  }

  if(compraCouponApplied){
    couponStatus.classList.remove("bad");
    couponStatus.classList.add("ok");
    couponStatus.textContent = "Cupón aplicado: 50% de descuento activo.";
  } else {
    couponStatus.classList.remove("ok");
    couponStatus.classList.remove("bad");
    couponStatus.textContent = "Sin cupón aplicado.";
  }
}

function renderMillas(){
  milesBody.innerHTML = "";
  const total = sum(MILES_HISTORY.map(x => x.pts));
  milesTotal.textContent = `${total} pts`;

  MILES_HISTORY.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row.year}</td><td class="money">${row.pts} pts</td>`;
    milesBody.appendChild(tr);
  });

  // Beneficios (según lo que indicaste)
  benefitsList.innerHTML = "";
  const active = isPromoActive();

  const li1 = document.createElement("li");
  li1.textContent = `${BENEFIT_HB_HALF_ONEWAY} pasajes one way Hiram Bingham al 50% de descuento.`;
  benefitsList.appendChild(li1);

  const li2 = document.createElement("li");
  li2.textContent = `Rango: ${Math.round(BENEFIT_VISTADOME_RATE*100)}% de descuento en Vistadome.`;
  benefitsList.appendChild(li2);

  const li3 = document.createElement("li");
  li3.textContent = `Rango: ${Math.round(BENEFIT_EXPED_RATE*100)}% de descuento en Expedition.`;
  benefitsList.appendChild(li3);

  benefitsNote.textContent = active
    ? "Beneficios disponibles dentro de la vigencia de la promo."
    : "Promo expirada: los beneficios promocionales se muestran, pero no aplican en cálculo.";

  promoStatusBox.textContent = active
    ? "Promo vigente hasta 27-feb-2026."
    : "Promo expirada. No aplica cupón ni beneficios promocionales.";
}

function setActiveView(viewKey){
  const map = {
    compra: viewCompra,
    millas: viewMillas,
    canjes: viewCanjes,
    reportes: viewReportes,
    opciones: viewOpciones,
  };

  Object.values(map).forEach(v => v.classList.add("hidden"));
  map[viewKey].classList.remove("hidden");

  // Update nav active
  $$(".toplink").forEach(a => a.classList.toggle("is-active", a.dataset.view === viewKey));
  $$(".sideitem").forEach(a => a.classList.toggle("is-active", a.dataset.view === viewKey));

  // Render view-specific
  updatePromoUI();
  if(viewKey === "compra") renderCompra();
  if(viewKey === "millas") renderMillas();
  if(viewKey === "canjes") renderCanjesBenefits();
}

/* ----------------------
   CANJES
----------------------- */

function trainsFor(route, service){
  let rows = SCHEDULES.filter(r => r.route === route && r.service === service);

  // si no hay rows (por ejemplo servicio "Hiram Bingham" y ruta que no existe), dejar vacío
  // construir lista única por "train|depart"
  const unique = [];
  const seen = new Set();
  rows.forEach(r => {
    const key = `${r.train}|${r.depart}`;
    if(!seen.has(key)){
      seen.add(key);
      unique.push({ train: r.train, depart: r.depart, arrive: r.arrive, promo: r.promo, duration: r.duration });
    }
  });

  // Orden por hora
  unique.sort((a,b)=>toMinutes(a.depart)-toMinutes(b.depart));
  return unique;
}

function fillRedeemTrains(){
  const route = redeemRoute.value;
  const service = redeemService.value;

  const list = trainsFor(route, service);
  redeemTrain.innerHTML = "";

  if(list.length === 0){
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "Sin trenes disponibles";
    redeemTrain.appendChild(opt);
    redeemTrain.disabled = true;
    return;
  }

  redeemTrain.disabled = false;
  list.forEach(item => {
    const opt = document.createElement("option");
    opt.value = `${item.train}|${item.depart}`;
    opt.textContent = `Tren ${item.train} · ${item.depart} → ${item.arrive} · ${item.duration}`;
    redeemTrain.appendChild(opt);
  });
}

function redeemGetSelectedRow(){
  const route = redeemRoute.value;
  const service = redeemService.value;
  const val = redeemTrain.value;

  if(!val) return null;
  const [train, depart] = val.split("|");

  // Buscar match (primero exacto)
  const found = SCHEDULES.find(r => r.route === route && r.service === service && r.train === train && r.depart === depart);
  return found || null;
}

function setRedeemCouponStatus(){
  if(!isPromoActive()){
    redeemCouponApplied = false;
    redeemCouponStatus.classList.remove("ok");
    redeemCouponStatus.classList.add("bad");
    redeemCouponStatus.textContent = "Promo expirada. Cupón deshabilitado.";
    return;
  }

  if(redeemCouponApplied){
    redeemCouponStatus.classList.remove("bad");
    redeemCouponStatus.classList.add("ok");
    redeemCouponStatus.textContent = "Cupón aplicado: 50% activo en el total.";
  } else {
    redeemCouponStatus.classList.remove("ok");
    redeemCouponStatus.classList.remove("bad");
    redeemCouponStatus.textContent = "Sin cupón aplicado.";
  }
}

function rankDiscountRateFor(service){
  if(service === "Vistadome") return BENEFIT_VISTADOME_RATE;
  if(service === "Expedition") return BENEFIT_EXPED_RATE;
  return 0;
}

function calcRedeem(){
  const active = isPromoActive();
  const row = redeemGetSelectedRow();
  const qty = Math.max(1, Number(redeemQty.value || 1));

  if(!row){
    return {
      ok: false,
      msg: "Selecciona un tren válido para calcular."
    };
  }

  // Base total (promo * qty)
  const base = row.promo * qty;

  // Descuento rango (solo si promo vigente)
  const rankRate = active ? rankDiscountRateFor(row.service) : 0;
  const discRank = base * rankRate;

  // Descuento HB 50% (solo si servicio HB, promo vigente, y hay saldo)
  let discHB = 0;
  let hbToUse = 0;

  if(active && row.service === "Hiram Bingham" && hbHalfAvailable > 0){
    hbToUse = Math.min(qty, hbHalfAvailable);
    // 50% del valor promo de esos boletos
    discHB = (row.promo * hbToUse) * 0.50;
  }

  // Subtotal luego de descuentos por rango y HB
  let subtotal = base - discRank - discHB;

  // Cupón 50% sobre subtotal (si vigente y aplicado)
  let discCoupon = 0;
  if(active && redeemCouponApplied){
    discCoupon = subtotal * COUPON_RATE;
    subtotal = subtotal - discCoupon;
  }

  // Fecha / abierta
  const dateInfo = openDate.checked ? "Fecha abierta" : (redeemDate.value || "Sin fecha");

  // Mensaje meta
  const meta = [
    `Ruta: ${row.route}`,
    `Servicio: ${row.service}`,
    `Tren: ${row.train}`,
    `Fecha: ${dateInfo}`,
    `Cantidad: ${qty} (one way)`,
  ];

  if(!active){
    meta.push("Promo expirada: no se aplican descuentos.");
  } else {
    if(rankRate > 0) meta.push(`Rango aplicado: ${Math.round(rankRate*100)}%`);
    if(discHB > 0) meta.push(`HB 50% aplicado a: ${hbToUse} pasajes`);
    if(redeemCouponApplied) meta.push("Cupón aplicado: 50%");
  }

  return {
    ok: true,
    row,
    qty,
    base,
    discRank,
    discHB,
    discCoupon,
    total: Math.max(0, subtotal),
    meta: meta.join(" · "),
    hbToUse
  };
}

function renderCanjesBenefits(){
  const active = isPromoActive();
  availBenefits.textContent = active
    ? `HB 50% disponibles: ${hbHalfAvailable} one way. Vistadome: ${Math.round(BENEFIT_VISTADOME_RATE*100)}%. Expedition: ${Math.round(BENEFIT_EXPED_RATE*100)}%.`
    : "Promo expirada: beneficios no aplican en cálculo.";

  setRedeemCouponStatus();
}

function renderRedeemSummary(result){
  if(!result || !result.ok){
    sumBase.textContent = "USD 0.00";
    sumRank.textContent = "- USD 0.00";
    sumHB.textContent = "- USD 0.00";
    sumCoupon.textContent = "- USD 0.00";
    sumTotal.textContent = "USD 0.00";
    sumMeta.textContent = result?.msg || "Completa la configuración para calcular.";
    confirmBtn.disabled = true;
    return;
  }

  sumBase.textContent = money(result.base);
  sumRank.textContent = `- ${money(result.discRank)}`;
  sumHB.textContent = `- ${money(result.discHB)}`;
  sumCoupon.textContent = `- ${money(result.discCoupon)}`;
  sumTotal.textContent = money(result.total);
  sumMeta.textContent = result.meta;

  confirmBtn.disabled = false;
  confirmBtn.dataset.hbToUse = String(result.hbToUse || 0);
}

/* ----------------------
   INIT + EVENTS
----------------------- */

function attachNavigation(){
  // Top nav
  $$(".toplink").forEach(a => {
    a.addEventListener("click", (e)=>{
      e.preventDefault();
      setActiveView(a.dataset.view);
    });
  });

  // Side nav
  $$(".sideitem").forEach(a => {
    const v = a.dataset.view;
    if(!v) return;
    a.addEventListener("click", (e)=>{
      e.preventDefault();
      setActiveView(v);
    });
  });
}

function attachCompraEvents(){
  $("#searchForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    renderCompra();
  });

  tripType.addEventListener("change", ()=>{
    toggleReturn();
  });

  [routeSel, serviceSel, sortBy, $("#paxAdult"), $("#paxChild"), $("#paxGuide")].forEach(el=>{
    el.addEventListener("change", renderCompra);
    el.addEventListener("input", renderCompra);
  });

  resultsBody.addEventListener("change", (e)=>{
    const t = e.target;
    if(t && t.name === "pick"){
      selectedRowId = t.value;
      buyBtn.disabled = !selectedRowId;
    }
  });

  applyCouponBtn.addEventListener("click", ()=>{
    if(!isPromoActive()){
      compraCouponApplied = false;
      setCompraCouponStatus();
      renderCompra();
      return;
    }

    const code = safeUpper(couponCode.value);
    if(code === VALID_COUPON){
      compraCouponApplied = true;
    } else {
      compraCouponApplied = false;
      couponStatus.classList.remove("ok");
      couponStatus.classList.add("bad");
      couponStatus.textContent = "Cupón inválido. Usa MCT50.";
      renderCompra();
      return;
    }

    setCompraCouponStatus();
    renderCompra();
  });

  couponCode.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
      e.preventDefault();
      applyCouponBtn.click();
    }
  });

  buyBtn.addEventListener("click", ()=>{
    if(!selectedRowId) return;
    alert("Demo: continuarías al flujo de emisión/pago en un sistema real.");
  });
}

function attachCanjesEvents(){
  fillRedeemTrains();
  renderCanjesBenefits();
  renderRedeemSummary(null);

  redeemService.addEventListener("change", ()=>{
    fillRedeemTrains();
    renderRedeemSummary(null);
  });

  redeemRoute.addEventListener("change", ()=>{
    fillRedeemTrains();
    renderRedeemSummary(null);
  });

  redeemTrain.addEventListener("change", ()=>{
    renderRedeemSummary(null);
  });

  openDate.addEventListener("change", ()=>{
    redeemDate.disabled = openDate.checked;
  });

  redeemApplyCouponBtn.addEventListener("click", ()=>{
    if(!isPromoActive()){
      redeemCouponApplied = false;
      setRedeemCouponStatus();
      return;
    }

    const code = safeUpper(redeemCoupon.value);
    if(code === VALID_COUPON){
      redeemCouponApplied = true;
      setRedeemCouponStatus();
    } else if(code.length === 0){
      redeemCouponApplied = false;
      setRedeemCouponStatus();
    } else {
      redeemCouponApplied = false;
      redeemCouponStatus.classList.remove("ok");
      redeemCouponStatus.classList.add("bad");
      redeemCouponStatus.textContent = "Cupón inválido. Usa MCT50.";
    }
  });

  redeemCoupon.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
      e.preventDefault();
      redeemApplyCouponBtn.click();
    }
  });

  redeemForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const result = calcRedeem();
    renderRedeemSummary(result);
  });

  confirmBtn.addEventListener("click", ()=>{
    if(!isPromoActive()){
      alert("Promo expirada. No es posible confirmar canje.");
      return;
    }

    const hbToUse = Number(confirmBtn.dataset.hbToUse || 0);
    if(hbToUse > 0){
      hbHalfAvailable = Math.max(0, hbHalfAvailable - hbToUse);
    }

    renderCanjesBenefits();
    renderRedeemSummary(null);
    alert("Canje confirmado (demo). Beneficios actualizados.");
  });
}

function initApp(){
  ensureDates();
  toggleReturn();
  updatePromoUI();

  // defaults
  setCompraCouponStatus();
  renderCompra();
  renderMillas();
  fillRedeemTrains();
  renderCanjesBenefits();

  attachNavigation();
  attachCompraEvents();
  attachCanjesEvents();

  // default view
  setActiveView("compra");
}

/* Login mock */
loginForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  loginView.classList.add("hidden");
  appView.classList.remove("hidden");
  initApp();
});

logoutBtn.addEventListener("click", ()=>{
  appView.classList.add("hidden");
  loginView.classList.remove("hidden");
});
