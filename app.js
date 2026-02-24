/* Demo Extranet PeruRail - My Cusco Trip (GitHub Pages, sin backend) */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* Promo */
const PROMO_END_ISO = "2026-02-27"; // vigente hasta 27-feb-2026 (incluye el día)
const VALID_COUPON = "MCT-CUSCO-PR50-EXTRANET-2026";
const COUPON_RATE = 0.50;

/* Millas: 1000 => $20 */
const MILES_STEP = 1000;
const USD_PER_1000_MILES = 20;
const USD_PER_MILE = USD_PER_1000_MILES / MILES_STEP; // 0.02

/* Beneficios */
const BENEFIT_HB_HALF_ONEWAY = 9;     // HB 50% hasta 9 one way (solo PUBLISHED)
const BENEFIT_VISTADOME_RATE = 0.12;  // 12% Vistadome (solo PUBLISHED)
const BENEFIT_EXPED_RATE = 0.09;      // 9% Expedition (solo PUBLISHED)

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
const INITIAL_MILES = MILES_HISTORY.reduce((a,b)=>a+b.pts,0); // 10,451

/* Horarios (referenciales) */
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

/* HB tarifas: published vs rack (confidencial) */
const HB_PUBLISHED = 570.00; // publicado por tramo
const HB_RACK = 490.00;      // rack/confidencial (no aplica cupón ni millas ni HB50)

/* Helpers */
function money(n){ return `USD ${Number(n).toFixed(2)}`; }
function toMinutes(hhmm){ const [h,m] = hhmm.split(":").map(Number); return h*60 + m; }
function safeUpper(s){ return (s || "").trim().toUpperCase(); }
function isoToday(){
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset()*60000);
  return local.toISOString().slice(0,10);
}
function isPromoActive(){ return isoToday() <= PROMO_END_ISO; }
function setDateDefault(inputEl){ if(inputEl) inputEl.value = inputEl.value || isoToday(); }

function trainsFor(route, service){
  const rows = SCHEDULES.filter(r => r.route === route && r.service === service);
  const unique = [];
  const seen = new Set();
  rows.forEach(r => {
    const key = `${r.train}|${r.depart}`;
    if(seen.has(key)) return;
    seen.add(key);
    unique.push({ train:r.train, depart:r.depart, arrive:r.arrive, duration:r.duration });
  });
  unique.sort((a,b)=>toMinutes(a.depart)-toMinutes(b.depart));
  return unique;
}
function findRow(route, service, train, depart){
  return SCHEDULES.find(r => r.route===route && r.service===service && r.train===train && r.depart===depart) || null;
}
function rankDiscountRate(service){
  if(service === "Vistadome") return BENEFIT_VISTADOME_RATE;
  if(service === "Expedition") return BENEFIT_EXPED_RATE;
  return 0;
}

/* Miles helpers */
function normalizeMilesInput(raw){
  const n = Math.max(0, Number(raw || 0));
  // redondear hacia abajo a múltiplos de 1000
  return Math.floor(n / MILES_STEP) * MILES_STEP;
}
function milesToUsd(miles){ return miles * USD_PER_MILE; }

/* Elements */
const loginView = $("#loginView");
const appView = $("#appView");
const loginForm = $("#loginForm");
const logoutBtn = $("#logoutBtn");

const viewCompra = $("#view-compra");
const viewMillas = $("#view-millas");
const viewCanjes = $("#view-canjes");
const viewReportes = $("#view-reportes");
const viewOpciones = $("#view-opciones");

const couponDisplayTop = $("#couponDisplayTop");

/* Compra */
const tripType = $("#tripType");
const returnWrap = $("#returnWrap");
const dateOut = $("#dateOut");
const dateBack = $("#dateBack");
const routeSel = $("#route");
const serviceSel = $("#service");
const sortBy = $("#sortBy");
const paxAdult = $("#paxAdult");
const paxChild = $("#paxChild");
const paxGuide = $("#paxGuide");
const resultsBody = $("#resultsBody");
const countLabel = $("#countLabel");
const buyBtn = $("#buyBtn");
const couponCode = $("#couponCode");
const applyCouponBtn = $("#applyCouponBtn");
const couponStatus = $("#couponStatus");
const promoStateText = $("#promoStateText");

/* Millas */
const milesBody = $("#milesBody");
const milesTotal = $("#milesTotal");
const milesBalanceEl = $("#milesBalance");
const benefitsList = $("#benefitsList");
const benefitsNote = $("#benefitsNote");
const promoStatusBox = $("#promoStatusBox");

/* Canjes PRO */
const redeemPromoText = $("#redeemPromoText");
const hbBalanceText = $("#hbBalanceText");
const milesBalanceTop = $("#milesBalanceTop");
const availBenefits = $("#availBenefits");
const tabHB = $("#tabHB");
const tabDISC = $("#tabDISC");
const hbPanel = $("#hbPanel");
const discPanel = $("#discPanel");

/* Shared summary */
const sumBaseEl = $("#sumBase");
const sumRankEl = $("#sumRank");
const sumHBEl = $("#sumHB");
const sumCouponEl = $("#sumCoupon");
const sumMilesEl = $("#sumMiles");
const sumTotalEl = $("#sumTotal");
const sumMetaEl = $("#sumMeta");

/* HB only */
const hbForm = $("#hbForm");
const hbRoute = $("#hbRoute");
const hbFareType = $("#hbFareType");
const hbTrain = $("#hbTrain");
const hbQty = $("#hbQty");
const hbDate = $("#hbDate");
const hbOpenDate = $("#hbOpenDate");
const hbCoupon = $("#hbCoupon");
const hbApplyCouponBtn = $("#hbApplyCouponBtn");
const hbCouponStatus = $("#hbCouponStatus");
const hbMilesUse = $("#hbMilesUse");
const hbApplyMilesBtn = $("#hbApplyMilesBtn");
const hbMilesStatus = $("#hbMilesStatus");
const hbConfirmBtn = $("#hbConfirmBtn");

/* Discount purchase */
const discForm = $("#discForm");
const discRoute = $("#discRoute");
const discService = $("#discService");
const discTrain = $("#discTrain");
const discQty = $("#discQty");
const discDate = $("#discDate");
const discOpenDate = $("#discOpenDate");
const discCoupon = $("#discCoupon");
const discApplyCouponBtn = $("#discApplyCouponBtn");
const discCouponStatus = $("#discCouponStatus");
const discMilesUse = $("#discMilesUse");
const discApplyMilesBtn = $("#discApplyMilesBtn");
const discMilesStatus = $("#discMilesStatus");
const discConfirmBtn = $("#discConfirmBtn");

/* State */
let selectedRowId = null;
let compraCouponApplied = false;

let hbHalfBalance = BENEFIT_HB_HALF_ONEWAY;   // saldo HB50 (solo published)
let milesBalance = INITIAL_MILES;             // saldo real de millas para descuento
let hbCouponApplied = false;
let hbMilesApplied = 0;
let discCouponApplied = false;
let discMilesApplied = 0;

let lastCalc = null; // {kind, ...}

/* UI helpers */
function passengersCount(){
  return Number(paxAdult.value||0) + Number(paxChild.value||0) + Number(paxGuide.value||0);
}
function toggleReturn(){
  returnWrap.style.display = (tripType.value==="roundtrip") ? "flex" : "none";
}

/* Promo UI */
function updatePromoUI(){
  const active = isPromoActive();

  if(promoStateText){
    promoStateText.textContent = active
      ? "Vigente hasta 27-feb-2026. Aplica el cupón para reducir automáticamente el total."
      : "Promo expirada. El cupón y los beneficios están deshabilitados.";
  }
  if(couponDisplayTop) couponDisplayTop.textContent = VALID_COUPON;

  if(!active){
    compraCouponApplied = false;
    couponStatus.classList.remove("ok");
    couponStatus.classList.add("bad");
    couponStatus.textContent = "Promo expirada. Cupón deshabilitado.";
  } else if(!couponStatus.textContent.trim()){
    couponStatus.textContent = "Sin cupón aplicado.";
  }

  if(redeemPromoText) redeemPromoText.textContent = active ? "Promo vigente" : "Promo expirada";
  if(hbBalanceText) hbBalanceText.textContent = `${hbHalfBalance} disponible(s)`;
  if(milesBalanceTop) milesBalanceTop.textContent = `${milesBalance.toLocaleString("es-PE")} pts`;
  if(milesBalanceEl) milesBalanceEl.textContent = `${milesBalance.toLocaleString("es-PE")} pts`;

  if(availBenefits){
    availBenefits.textContent = active
      ? `HB50 saldo: ${hbHalfBalance} one way (solo Published). Vistadome 12% · Expedition 9%. Cupón 50% (solo Published). Millas: 1000 = $20 (solo Published).`
      : "Promo expirada: no aplica HB/rango/cupón/millas en cálculo.";
  }

  // HB coupon/miles status defaults
  if(!active){
    hbCouponApplied = false;
    hbMilesApplied = 0;
    hbCouponStatus.classList.remove("ok");
    hbCouponStatus.classList.add("bad");
    hbCouponStatus.textContent = "Promo expirada.";
    hbMilesStatus.classList.remove("ok");
    hbMilesStatus.classList.add("bad");
    hbMilesStatus.textContent = "Promo expirada.";
  } else {
    if(!hbCouponStatus.textContent.trim()) hbCouponStatus.textContent = "Sin cupón aplicado.";
    if(!hbMilesStatus.textContent.trim()) hbMilesStatus.textContent = "Sin millas aplicadas.";
  }

  // DISC coupon/miles status defaults
  if(!active){
    discCouponApplied = false;
    discMilesApplied = 0;
    discCouponStatus.classList.remove("ok");
    discCouponStatus.classList.add("bad");
    discCouponStatus.textContent = "Promo expirada.";
    discMilesStatus.classList.remove("ok");
    discMilesStatus.classList.add("bad");
    discMilesStatus.textContent = "Promo expirada.";
  } else {
    if(!discCouponStatus.textContent.trim()) discCouponStatus.textContent = "Sin cupón aplicado.";
    if(!discMilesStatus.textContent.trim()) discMilesStatus.textContent = "Sin millas aplicadas.";
  }
}

/* ---------------- Compra (tabla) ---------------- */

function filterCompra(){
  const route = routeSel.value;
  const service = serviceSel.value;

  let rows = SCHEDULES.filter(r => r.route === route);
  if(service !== "ALL") rows = rows.filter(r => r.service === service);

  const s = sortBy.value;
  rows.sort((a,b)=>{
    if(s==="timeAsc") return toMinutes(a.depart)-toMinutes(b.depart);
    if(s==="timeDesc") return toMinutes(b.depart)-toMinutes(a.depart);
    if(s==="priceAsc") return a.promo-b.promo;
    if(s==="priceDesc") return b.promo-a.promo;
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

function renderCompra(){
  const rows = filterCompra();
  resultsBody.innerHTML = "";
  selectedRowId = null;
  buyBtn.disabled = true;

  const couponActive = isPromoActive() && compraCouponApplied;
  const pax = passengersCount();

  rows.forEach((r, idx) => {
    const id = `${r.route}|${r.service}|${r.train}|${r.depart}|${idx}`;
    const importe = compraTotalFromUnit(r.promo);
    const before = r.promo * pax;

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
        ${couponActive ? `<span style="text-decoration:line-through;color:#6b7280;font-weight:800;margin-right:8px;">${money(before)}</span>` : ``}
        ${money(importe)}
      </td>
    `;
    resultsBody.appendChild(tr);
  });

  countLabel.textContent = `${rows.length} resultados`;
}

/* ---------------- Millas ---------------- */

function renderMillas(){
  milesBody.innerHTML = "";
  milesTotal.textContent = `${INITIAL_MILES.toLocaleString("es-PE")} pts`;
  if(milesBalanceEl) milesBalanceEl.textContent = `${milesBalance.toLocaleString("es-PE")} pts`;

  MILES_HISTORY.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row.year}</td><td class="money">${row.pts} pts</td>`;
    milesBody.appendChild(tr);
  });

  const active = isPromoActive();
  benefitsList.innerHTML = "";

  const items = [
    `${BENEFIT_HB_HALF_ONEWAY} pasajes one way Hiram Bingham al 50% (solo tarifa publicada).`,
    `Rango: ${Math.round(BENEFIT_VISTADOME_RATE*100)}% de descuento en Vistadome (published).`,
    `Rango: ${Math.round(BENEFIT_EXPED_RATE*100)}% de descuento en Expedition (published).`,
    `Millas: ${MILES_STEP.toLocaleString("es-PE")} pts = ${money(USD_PER_1000_MILES)} de descuento (published).`,
  ];
  items.forEach(t=>{
    const li = document.createElement("li");
    li.textContent = t;
    benefitsList.appendChild(li);
  });

  benefitsNote.textContent = active
    ? "Beneficios disponibles dentro de la vigencia de la promo."
    : "Promo expirada: beneficios se muestran, pero no aplican en cálculo.";

  promoStatusBox.textContent = active
    ? "Promo vigente hasta 27-feb-2026."
    : "Promo expirada. No aplica cupón ni beneficios promocionales.";
}

/* ---------------- Navegación ---------------- */

function setActiveView(key){
  const map = {
    compra: viewCompra,
    millas: viewMillas,
    canjes: viewCanjes,
    reportes: viewReportes,
    opciones: viewOpciones
  };
  Object.values(map).forEach(v => v.classList.add("hidden"));
  map[key].classList.remove("hidden");

  $$(".toplink").forEach(a => a.classList.toggle("is-active", a.dataset.view === key));
  $$(".sideitem").forEach(a => a.classList.toggle("is-active", a.dataset.view === key));

  updatePromoUI();
  if(key==="compra") renderCompra();
  if(key==="millas") renderMillas();
  if(key==="canjes") {
    fillHBTrains();
    fillDiscTrains();
    resetSummary();
  }
}

function attachNavigation(){
  $$(".toplink").forEach(a => {
    a.addEventListener("click",(e)=>{
      e.preventDefault();
      setActiveView(a.dataset.view);
    });
  });
  $$(".sideitem").forEach(a => {
    if(!a.dataset.view) return;
    a.addEventListener("click",(e)=>{
      e.preventDefault();
      setActiveView(a.dataset.view);
    });
  });
}

/* ---------------- Tabs ---------------- */

function setTab(which){
  const isHB = which === "HB";
  tabHB.classList.toggle("is-active", isHB);
  tabDISC.classList.toggle("is-active", !isHB);
  hbPanel.classList.toggle("hidden", !isHB);
  discPanel.classList.toggle("hidden", isHB);

  resetSummary();
  lastCalc = null;
  hbConfirmBtn.disabled = true;
  discConfirmBtn.disabled = true;
}

function attachTabEvents(){
  tabHB.addEventListener("click", ()=> setTab("HB"));
  tabDISC.addEventListener("click", ()=> setTab("DISC"));
}

/* ---------------- Summary ---------------- */

function resetSummary(msg){
  sumBaseEl.textContent = "USD 0.00";
  sumRankEl.textContent = "- USD 0.00";
  sumHBEl.textContent = "- USD 0.00";
  sumCouponEl.textContent = "- USD 0.00";
  sumMilesEl.textContent = "- USD 0.00";
  sumTotalEl.textContent = "USD 0.00";
  sumMetaEl.textContent = msg || "Configura y calcula para ver el monto a pagar.";
}

function renderSummary(calc){
  if(!calc || !calc.ok){
    resetSummary(calc?.msg || "No se pudo calcular.");
    return;
  }

  sumBaseEl.textContent = money(calc.base);
  sumRankEl.textContent = `- ${money(calc.discRank || 0)}`;

  if((calc.discHB || 0) > 0){
    sumHBEl.innerHTML = `<span style="color:#0f5132;font-weight:900;">- ${money(calc.discHB)} (HB 50%)</span>`;
  } else {
    sumHBEl.textContent = `- ${money(0)}`;
  }

  if((calc.discCoupon || 0) > 0){
    sumCouponEl.innerHTML = `<span style="color:#0f5132;font-weight:900;">- ${money(calc.discCoupon)} (Cupón)</span>`;
  } else {
    sumCouponEl.textContent = `- ${money(0)}`;
  }

  if((calc.discMiles || 0) > 0){
    sumMilesEl.innerHTML = `<span style="color:#0f5132;font-weight:900;">- ${money(calc.discMiles)} (Millas)</span>`;
  } else {
    sumMilesEl.textContent = `- ${money(0)}`;
  }

  sumTotalEl.textContent = money(calc.total);
  sumMetaEl.textContent = calc.meta;
}

/* ---------------- HB Module ---------------- */

function fillHBTrains(){
  const route = hbRoute.value;
  const list = trainsFor(route, "Hiram Bingham");
  hbTrain.innerHTML = "";

  if(list.length === 0){
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "Sin trenes HB disponibles";
    hbTrain.appendChild(opt);
    hbTrain.disabled = true;
    return;
  }

  hbTrain.disabled = false;
  list.forEach(item=>{
    const opt = document.createElement("option");
    opt.value = `${item.train}|${item.depart}`;
    opt.textContent = `HB ${item.train} · ${item.depart} → ${item.arrive} · ${item.duration}`;
    hbTrain.appendChild(opt);
  });
}

function hbIsPublished(){
  return hbFareType.value === "PUBLISHED";
}

function hbUnitFare(){
  // La tarifa publicada es 570 por tramo (según tu regla)
  return hbIsPublished() ? HB_PUBLISHED : HB_RACK;
}

function setHBCouponStatus(){
  if(!isPromoActive()){
    hbCouponApplied = false;
    hbCouponStatus.classList.remove("ok");
    hbCouponStatus.classList.add("bad");
    hbCouponStatus.textContent = "Promo expirada.";
    return;
  }
  if(!hbIsPublished()){
    hbCouponApplied = false;
    hbCouponStatus.classList.remove("ok");
    hbCouponStatus.classList.add("bad");
    hbCouponStatus.textContent = "Rack: cupón no aplica.";
    return;
  }
  if(hbCouponApplied){
    hbCouponStatus.classList.remove("bad");
    hbCouponStatus.classList.add("ok");
    hbCouponStatus.textContent = "Cupón aplicado (Published): 50% activo.";
  } else {
    hbCouponStatus.classList.remove("ok");
    hbCouponStatus.classList.remove("bad");
    hbCouponStatus.textContent = "Sin cupón aplicado.";
  }
}

function setHBMilesStatus(){
  if(!isPromoActive()){
    hbMilesApplied = 0;
    hbMilesStatus.classList.remove("ok");
    hbMilesStatus.classList.add("bad");
    hbMilesStatus.textContent = "Promo expirada.";
    return;
  }
  if(!hbIsPublished()){
    hbMilesApplied = 0;
    hbMilesStatus.classList.remove("ok");
    hbMilesStatus.classList.add("bad");
    hbMilesStatus.textContent = "Rack: millas no aplican.";
    return;
  }
  if(hbMilesApplied > 0){
    hbMilesStatus.classList.remove("bad");
    hbMilesStatus.classList.add("ok");
    hbMilesStatus.textContent = `Millas aplicadas: ${hbMilesApplied.toLocaleString("es-PE")} pts (≈ ${money(milesToUsd(hbMilesApplied))}).`;
  } else {
    hbMilesStatus.classList.remove("ok");
    hbMilesStatus.classList.remove("bad");
    hbMilesStatus.textContent = "Sin millas aplicadas.";
  }
}

/* Corrección: HB 50% se aplica de forma visible (solo PUBLISHED).
   Regla adicional: cupón 50% también puede aplicar a PUBLISHED.
   IMPORTANTE: HB50 y cupón NO se acumulan (ambos son 50%), se usa el mejor escenario:
   - Primero HB50 (por saldo) y si quedan boletos sin HB50, el cupón puede cubrirlos.
*/
function calcHB(){
  if(!isPromoActive()){
    return { ok:false, msg:"Promo expirada: no aplica canje HB / cupón / millas." };
  }

  const qty = Math.max(1, Number(hbQty.value || 1));
  const val = hbTrain.value;

  if(!val) return { ok:false, msg:"Selecciona un tren Hiram Bingham." };

  const [train, depart] = val.split("|");
  const row = findRow(hbRoute.value, "Hiram Bingham", train, depart);
  if(!row) return { ok:false, msg:"No se encontró el tren seleccionado." };

  const published = hbIsPublished();
  const unit = hbUnitFare(); // 570 o 490
  const base = unit * qty;

  // En Rack no aplica nada (ni HB50, ni cupón, ni millas)
  if(!published){
    const dateInfo = hbOpenDate.checked ? "Fecha abierta" : (hbDate.value || "Sin fecha");
    const meta = [
      `HB (Rack/Confidencial)`,
      `Tarifa: ${money(unit)} por tramo`,
      `Ruta: ${row.route} · Tren: ${row.train}`,
      `Fecha: ${dateInfo} · Cantidad: ${qty}`,
      `Regla: en Rack no aplica HB50/cupón/millas.`
    ].join("\n");

    return {
      ok:true, kind:"HB",
      row, qty,
      base,
      discRank:0,
      discHB:0,
      discCoupon:0,
      discMiles:0,
      milesUsed:0,
      total: base,
      meta,
      hbUse:0
    };
  }

  // 1) HB 50% por saldo (sobre tarifa publicada)
  const hbUse = Math.min(qty, hbHalfBalance); // cuántos boletos cubre el beneficio HB50
  const discHB = (unit * hbUse) * 0.50;

  // 2) Cupón 50% (solo en los boletos que NO entraron al HB50)
  // ambos son 50% => no se acumulan en el mismo ticket
  let discCoupon = 0;
  if(hbCouponApplied){
    const remainingForCoupon = qty - hbUse;
    discCoupon = (unit * remainingForCoupon) * COUPON_RATE;
  }

  // Subtotal tras HB y cupón
  let subtotal = base - discHB - discCoupon;

  // 3) Millas (solo PUBLISHED)
  const milesWant = hbMilesApplied; // ya normalizado al aplicar
  const milesUsd = milesToUsd(milesWant);
  const discMiles = Math.min(milesUsd, subtotal); // no exceder subtotal
  const total = Math.max(0, subtotal - discMiles);

  const dateInfo = hbOpenDate.checked ? "Fecha abierta" : (hbDate.value || "Sin fecha");
  const meta = [
    `HB (Published)`,
    `Tarifa publicada: ${money(unit)} por tramo`,
    `Ruta: ${row.route} · Tren: ${row.train}`,
    `Fecha: ${dateInfo} · Cantidad: ${qty}`,
    `HB50 aplicado a: ${hbUse} ticket(s) · Descuento/ticket: ${money(unit*0.50)}`,
    hbCouponApplied ? `Cupón 50% aplicado a: ${qty - hbUse} ticket(s)` : `Cupón: no aplicado`,
    hbMilesApplied > 0 ? `Millas usadas: ${hbMilesApplied.toLocaleString("es-PE")} pts (≈ ${money(milesUsd)})` : `Millas: no usadas`,
    `Saldo HB50 después de confirmar: ${Math.max(0, hbHalfBalance - hbUse)}`,
    `Saldo millas después de confirmar: ${Math.max(0, milesBalance - hbMilesApplied).toLocaleString("es-PE")} pts`,
  ].join("\n");

  return {
    ok:true, kind:"HB",
    row, qty,
    base,
    discRank:0,
    discHB,
    discCoupon,
    discMiles,
    milesUsed: hbMilesApplied,
    total,
    meta,
    hbUse
  };
}

function attachHBEvents(){
  setDateDefault(hbDate);

  hbRoute.addEventListener("change", ()=>{
    fillHBTrains();
    hbConfirmBtn.disabled = true;
    resetSummary();
  });

  hbFareType.addEventListener("change", ()=>{
    // al cambiar tarifa, reset cupón y millas si es rack
    if(!hbIsPublished()){
      hbCouponApplied = false;
      hbMilesApplied = 0;
      hbMilesUse.value = "0";
    }
    setHBCouponStatus();
    setHBMilesStatus();
    hbConfirmBtn.disabled = true;
    resetSummary();
  });

  hbOpenDate.addEventListener("change", ()=>{
    hbDate.disabled = hbOpenDate.checked;
  });

  hbTrain.addEventListener("change", ()=>{
    hbConfirmBtn.disabled = true;
    resetSummary();
  });

  hbApplyCouponBtn.addEventListener("click", ()=>{
    if(!isPromoActive()){
      hbCouponApplied = false;
      setHBCouponStatus();
      return;
    }
    if(!hbIsPublished()){
      hbCouponApplied = false;
      setHBCouponStatus();
      return;
    }
    const code = safeUpper(hbCoupon.value);
    if(!code){
      hbCouponApplied = false;
      setHBCouponStatus();
      return;
    }
    if(code === VALID_COUPON){
      hbCouponApplied = true;
      setHBCouponStatus();
    } else {
      hbCouponApplied = false;
      hbCouponStatus.classList.remove("ok");
      hbCouponStatus.classList.add("bad");
      hbCouponStatus.textContent = "Cupón inválido.";
    }
  });

  hbApplyMilesBtn.addEventListener("click", ()=>{
    if(!isPromoActive()){
      hbMilesApplied = 0;
      setHBMilesStatus();
      return;
    }
    if(!hbIsPublished()){
      hbMilesApplied = 0;
      setHBMilesStatus();
      return;
    }
    const normalized = normalizeMilesInput(hbMilesUse.value);
    if(normalized > milesBalance){
      hbMilesApplied = 0;
      hbMilesStatus.classList.remove("ok");
      hbMilesStatus.classList.add("bad");
      hbMilesStatus.textContent = `Saldo insuficiente. Disponibles: ${milesBalance.toLocaleString("es-PE")} pts.`;
      return;
    }
    hbMilesApplied = normalized;
    hbMilesUse.value = String(normalized);
    setHBMilesStatus();
  });

  hbForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const calc = calcHB();
    lastCalc = calc;
    renderSummary(calc);
    hbConfirmBtn.disabled = !calc.ok;
    discConfirmBtn.disabled = true;
  });

  hbConfirmBtn.addEventListener("click", ()=>{
    if(!lastCalc || !lastCalc.ok || lastCalc.kind!=="HB") return;

    // consumir HB50 solo si Published
    if(hbIsPublished()){
      hbHalfBalance = Math.max(0, hbHalfBalance - (lastCalc.hbUse || 0));
      // consumir millas usadas
      milesBalance = Math.max(0, milesBalance - (lastCalc.milesUsed || 0));
    }

    // reset aplicadores
    hbMilesApplied = 0;
    hbMilesUse.value = "0";
    setHBMilesStatus();

    updatePromoUI();
    renderMillas();
    hbConfirmBtn.disabled = true;
    lastCalc = null;
    resetSummary("HB confirmado (demo). Saldo HB50 y millas actualizado.");
    alert("Hiram Bingham confirmado (demo).");
  });
}

/* ---------------- Discount Purchase Module ---------------- */

function fillDiscTrains(){
  const route = discRoute.value;
  const service = discService.value;
  const list = trainsFor(route, service);

  discTrain.innerHTML = "";
  if(list.length === 0){
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "Sin trenes disponibles";
    discTrain.appendChild(opt);
    discTrain.disabled = true;
    return;
  }
  discTrain.disabled = false;
  list.forEach(item=>{
    const opt = document.createElement("option");
    opt.value = `${item.train}|${item.depart}`;
    opt.textContent = `Tren ${item.train} · ${item.depart} → ${item.arrive} · ${item.duration}`;
    discTrain.appendChild(opt);
  });
}

function setDiscCouponStatus(){
  if(!isPromoActive()){
    discCouponApplied = false;
    discCouponStatus.classList.remove("ok");
    discCouponStatus.classList.add("bad");
    discCouponStatus.textContent = "Promo expirada.";
    return;
  }
  if(discCouponApplied){
    discCouponStatus.classList.remove("bad");
    discCouponStatus.classList.add("ok");
    discCouponStatus.textContent = "Cupón aplicado: 50% activo.";
  } else {
    discCouponStatus.classList.remove("ok");
    discCouponStatus.classList.remove("bad");
    discCouponStatus.textContent = "Sin cupón aplicado.";
  }
}

function setDiscMilesStatus(){
  if(!isPromoActive()){
    discMilesApplied = 0;
    discMilesStatus.classList.remove("ok");
    discMilesStatus.classList.add("bad");
    discMilesStatus.textContent = "Promo expirada.";
    return;
  }
  if(discMilesApplied > 0){
    discMilesStatus.classList.remove("bad");
    discMilesStatus.classList.add("ok");
    discMilesStatus.textContent = `Millas aplicadas: ${discMilesApplied.toLocaleString("es-PE")} pts (≈ ${money(milesToUsd(discMilesApplied))}).`;
  } else {
    discMilesStatus.classList.remove("ok");
    discMilesStatus.classList.remove("bad");
    discMilesStatus.textContent = "Sin millas aplicadas.";
  }
}

function calcDISC(){
  if(!isPromoActive()){
    return { ok:false, msg:"Promo expirada: no aplican descuentos ni millas." };
  }

  const qty = Math.max(1, Number(discQty.value || 1));
  const service = discService.value;

  const val = discTrain.value;
  if(!val) return { ok:false, msg:"Selecciona un tren." };

  const [train, depart] = val.split("|");
  const row = findRow(discRoute.value, service, train, depart);
  if(!row) return { ok:false, msg:"No se encontró el tren seleccionado." };

  const base = row.promo * qty;

  // 1) Rango
  const rate = rankDiscountRate(service);
  const discRank = base * rate;
  let subtotal = base - discRank;

  // 2) Cupón
  let discCoupon = 0;
  if(discCouponApplied){
    discCoupon = subtotal * COUPON_RATE;
    subtotal = subtotal - discCoupon;
  }

  // 3) Millas
  const milesUsd = milesToUsd(discMilesApplied);
  const discMiles = Math.min(milesUsd, subtotal);
  const total = Math.max(0, subtotal - discMiles);

  const dateInfo = discOpenDate.checked ? "Fecha abierta" : (discDate.value || "Sin fecha");
  const meta = [
    `Compra con beneficios (Published)`,
    `Servicio: ${service} · Ruta: ${row.route} · Tren: ${row.train}`,
    `Fecha: ${dateInfo} · Cantidad: ${qty}`,
    `Rango aplicado: ${Math.round(rate*100)}%`,
    discCouponApplied ? `Cupón 50% aplicado` : `Cupón: no aplicado`,
    discMilesApplied > 0 ? `Millas usadas: ${discMilesApplied.toLocaleString("es-PE")} pts (≈ ${money(milesUsd)})` : `Millas: no usadas`,
    `Saldo millas después de confirmar: ${Math.max(0, milesBalance - discMilesApplied).toLocaleString("es-PE")} pts`,
  ].join("\n");

  return {
    ok:true, kind:"DISC",
    row, qty,
    base,
    discRank,
    discHB:0,
    discCoupon,
    discMiles,
    milesUsed: discMilesApplied,
    total,
    meta
  };
}

function attachDiscEvents(){
  setDateDefault(discDate);
  setDiscCouponStatus();
  setDiscMilesStatus();

  discRoute.addEventListener("change", ()=>{
    fillDiscTrains();
    discConfirmBtn.disabled = true;
    resetSummary();
  });
  discService.addEventListener("change", ()=>{
    fillDiscTrains();
    discConfirmBtn.disabled = true;
    resetSummary();
  });
  discTrain.addEventListener("change", ()=>{
    discConfirmBtn.disabled = true;
    resetSummary();
  });
  discOpenDate.addEventListener("change", ()=>{
    discDate.disabled = discOpenDate.checked;
  });

  discApplyCouponBtn.addEventListener("click", ()=>{
    if(!isPromoActive()){
      discCouponApplied = false;
      setDiscCouponStatus();
      return;
    }
    const code = safeUpper(discCoupon.value);
    if(!code){
      discCouponApplied = false;
      setDiscCouponStatus();
      return;
    }
    if(code === VALID_COUPON){
      discCouponApplied = true;
      setDiscCouponStatus();
    } else {
      discCouponApplied = false;
      discCouponStatus.classList.remove("ok");
      discCouponStatus.classList.add("bad");
      discCouponStatus.textContent = "Cupón inválido.";
    }
  });

  discApplyMilesBtn.addEventListener("click", ()=>{
    if(!isPromoActive()){
      discMilesApplied = 0;
      setDiscMilesStatus();
      return;
    }
    const normalized = normalizeMilesInput(discMilesUse.value);
    if(normalized > milesBalance){
      discMilesApplied = 0;
      discMilesStatus.classList.remove("ok");
      discMilesStatus.classList.add("bad");
      discMilesStatus.textContent = `Saldo insuficiente. Disponibles: ${milesBalance.toLocaleString("es-PE")} pts.`;
      return;
    }
    discMilesApplied = normalized;
    discMilesUse.value = String(normalized);
    setDiscMilesStatus();
  });

  discForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const calc = calcDISC();
    lastCalc = calc;
    renderSummary(calc);
    discConfirmBtn.disabled = !calc.ok;
    hbConfirmBtn.disabled = true;
  });

  discConfirmBtn.addEventListener("click", ()=>{
    if(!lastCalc || !lastCalc.ok || lastCalc.kind!=="DISC") return;

    // consumir millas usadas
    milesBalance = Math.max(0, milesBalance - (lastCalc.milesUsed || 0));

    // reset aplicadores
    discMilesApplied = 0;
    discMilesUse.value = "0";
    setDiscMilesStatus();

    updatePromoUI();
    renderMillas();
    discConfirmBtn.disabled = true;
    lastCalc = null;
    resetSummary("Compra confirmada (demo). Millas actualizadas.");
    alert("Compra confirmada (demo).");
  });
}

/* ---------------- Compra events ---------------- */

function attachCompraEvents(){
  $("#searchForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    renderCompra();
  });

  tripType.addEventListener("change", toggleReturn);

  [routeSel, serviceSel, sortBy, paxAdult, paxChild, paxGuide].forEach(el=>{
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
      setCompraCouponStatus();
      renderCompra();
      return;
    }

    compraCouponApplied = false;
    couponStatus.classList.remove("ok");
    couponStatus.classList.add("bad");
    couponStatus.textContent = "Cupón inválido.";
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

/* ---------------- Init ---------------- */

function initApp(){
  setDateDefault(dateOut);
  setDateDefault(dateBack);
  toggleReturn();

  updatePromoUI();
  setCompraCouponStatus();
  renderCompra();
  renderMillas();

  // canjes defaults
  setDateDefault(hbDate);
  setDateDefault(discDate);

  fillHBTrains();
  fillDiscTrains();

  attachTabEvents();
  setTab("HB");

  attachHBEvents();
  attachDiscEvents();

  attachNavigation();
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
