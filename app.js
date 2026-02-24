/* Demo Extranet PeruRail - My Cusco Trip (GitHub Pages, sin backend) */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* Promo */
const PROMO_END_ISO = "2026-02-27"; // vigente hasta 27-feb-2026 (incluye el día)
const VALID_COUPON = "MCT-CUSCO-PR50-EXTRANET-2026";
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

/* Helpers */
function money(n){ return `USD ${Number(n).toFixed(2)}`; }
function toMinutes(hhmm){ const [h,m] = hhmm.split(":").map(Number); return h*60 + m; }
function sum(arr){ return arr.reduce((a,b)=>a+b,0); }
function safeUpper(s){ return (s || "").trim().toUpperCase(); }
function isoToday(){
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset()*60000);
  return local.toISOString().slice(0,10);
}
function isPromoActive(){
  return isoToday() <= PROMO_END_ISO;
}
function setDateDefault(inputEl){
  if(!inputEl) return;
  inputEl.value = inputEl.value || isoToday();
}
function trainsFor(route, service){
  const rows = SCHEDULES.filter(r => r.route === route && r.service === service);
  const unique = [];
  const seen = new Set();
  rows.forEach(r => {
    const key = `${r.train}|${r.depart}`;
    if(seen.has(key)) return;
    seen.add(key);
    unique.push({ train:r.train, depart:r.depart, arrive:r.arrive, duration:r.duration, promo:r.promo, route:r.route, service:r.service });
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

/* Elements */
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
const benefitsList = $("#benefitsList");
const benefitsNote = $("#benefitsNote");
const promoStatusBox = $("#promoStatusBox");

/* Canjes PRO */
const redeemPromoText = $("#redeemPromoText");
const hbBalanceText = $("#hbBalanceText");
const availBenefits = $("#availBenefits");
const tabHB = $("#tabHB");
const tabDISC = $("#tabDISC");
const hbPanel = $("#hbPanel");
const discPanel = $("#discPanel");

/* HB only */
const hbForm = $("#hbForm");
const hbRoute = $("#hbRoute");
const hbTrain = $("#hbTrain");
const hbQty = $("#hbQty");
const hbDate = $("#hbDate");
const hbOpenDate = $("#hbOpenDate");
const hbCalcBtn = $("#hbCalcBtn");
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
const discConfirmBtn = $("#discConfirmBtn");

/* Shared summary */
const sumBaseEl = $("#sumBase");
const sumRankEl = $("#sumRank");
const sumHBEl = $("#sumHB");
const sumCouponEl = $("#sumCoupon");
const sumTotalEl = $("#sumTotal");
const sumMetaEl = $("#sumMeta");

/* State */
let selectedRowId = null;
let compraCouponApplied = false;

/* Canjes state */
let hbHalfBalance = BENEFIT_HB_HALF_ONEWAY; // se consume al confirmar
let discCouponApplied = false;
let lastCalc = null; // guarda último cálculo (HB o DISC)

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

  // Compra banner
  if(promoStateText){
    promoStateText.textContent = active
      ? "Vigente hasta 27-feb-2026. Aplica el cupón para reducir automáticamente el total."
      : "Promo expirada. El cupón y los beneficios están deshabilitados.";
  }

  // Coupon display
  if(couponDisplayTop) couponDisplayTop.textContent = VALID_COUPON;

  // Compra coupon status baseline
  if(!active){
    compraCouponApplied = false;
    couponStatus.classList.remove("ok");
    couponStatus.classList.add("bad");
    couponStatus.textContent = "Promo expirada. Cupón deshabilitado.";
  } else {
    if(!couponStatus.textContent.trim()){
      couponStatus.textContent = "Sin cupón aplicado.";
    }
  }

  // Canjes header
  if(redeemPromoText){
    redeemPromoText.textContent = active ? "Promo vigente" : "Promo expirada";
  }
  if(hbBalanceText){
    hbBalanceText.textContent = `${hbHalfBalance} disponible(s)`;
  }
  if(availBenefits){
    availBenefits.textContent = active
      ? `HB 50% saldo: ${hbHalfBalance} one way. Vistadome: 12%. Expedition: 9%. Cupón: 50%.`
      : "Promo expirada: no aplica HB/rango/cupón en cálculo.";
  }

  // Coupon DISC status
  if(!active){
    discCouponApplied = false;
    discCouponStatus.classList.remove("ok");
    discCouponStatus.classList.add("bad");
    discCouponStatus.textContent = "Promo expirada. Cupón deshabilitado.";
  } else {
    if(!discCouponStatus.textContent.trim()){
      discCouponStatus.textContent = "Sin cupón aplicado.";
    }
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
  const total = sum(MILES_HISTORY.map(x => x.pts));
  milesTotal.textContent = `${total} pts`;

  MILES_HISTORY.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row.year}</td><td class="money">${row.pts} pts</td>`;
    milesBody.appendChild(tr);
  });

  const active = isPromoActive();
  benefitsList.innerHTML = "";

  const items = [
    `${BENEFIT_HB_HALF_ONEWAY} pasajes one way Hiram Bingham al 50% de descuento.`,
    `Rango: ${Math.round(BENEFIT_VISTADOME_RATE*100)}% de descuento en Vistadome.`,
    `Rango: ${Math.round(BENEFIT_EXPED_RATE*100)}% de descuento en Expedition.`,
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

/* ---------------- Canjes PRO: Tabs ---------------- */

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

/* ---------------- Canjes PRO: Shared Summary ---------------- */

function resetSummary(msg){
  sumBaseEl.textContent = "USD 0.00";
  sumRankEl.textContent = "- USD 0.00";
  sumHBEl.textContent = "- USD 0.00";
  sumCouponEl.textContent = "- USD 0.00";
  sumTotalEl.textContent = "USD 0.00";
  sumMetaEl.textContent = msg || "Configura y calcula para ver el monto a pagar.";
}

function renderSummary(calc){
  if(!calc || !calc.ok){
    resetSummary(calc?.msg || "No se pudo calcular.");
    return;
  }
  sumBaseEl.textContent = money(calc.base);
  sumRankEl.textContent = `- ${money(calc.discRank)}`;
  sumHBEl.textContent = `- ${money(calc.discHB)}`;
  sumCouponEl.textContent = `- ${money(calc.discCoupon)}`;
  sumTotalEl.textContent = money(calc.total);
  sumMetaEl.textContent = calc.meta;
}

/* ---------------- Canjes PRO: HB Only ---------------- */

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

function calcHB(){
  if(!isPromoActive()){
    return { ok:false, msg:"Promo expirada: no aplica canje HB 50%." };
  }
  const qty = Math.max(1, Number(hbQty.value || 1));
  if(hbHalfBalance <= 0){
    return { ok:false, msg:"Sin saldo HB 50% disponible." };
  }
  const val = hbTrain.value;
  if(!val){
    return { ok:false, msg:"Selecciona un tren Hiram Bingham." };
  }
  const [train, depart] = val.split("|");
  const row = findRow(hbRoute.value, "Hiram Bingham", train, depart);
  if(!row) return { ok:false, msg:"No se encontró el tren seleccionado." };

  const use = Math.min(qty, hbHalfBalance);
  const base = row.promo * qty;
  const discHB = (row.promo * use) * 0.50;

  const total = Math.max(0, base - discHB);

  const dateInfo = hbOpenDate.checked ? "Fecha abierta" : (hbDate.value || "Sin fecha");
  const meta = `Canje HB 50% · Ruta ${row.route} · Tren ${row.train} · Fecha: ${dateInfo} · Cantidad: ${qty} · Aplicado a: ${use}`;

  return {
    ok:true,
    kind:"HB",
    qty,
    hbUse: use,
    row,
    base,
    discRank: 0,
    discHB,
    discCoupon: 0,
    total,
    meta
  };
}

function attachHBEvents(){
  setDateDefault(hbDate);

  hbRoute.addEventListener("change", ()=>{
    fillHBTrains();
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
    // consumir saldo
    hbHalfBalance = Math.max(0, hbHalfBalance - (lastCalc.hbUse || 0));
    updatePromoUI();
    hbConfirmBtn.disabled = true;
    lastCalc = null;
    resetSummary("Canje confirmado (demo). Saldo HB actualizado.");
    alert("Canje HB confirmado (demo).");
  });
}

/* ---------------- Canjes PRO: Discount Purchase ---------------- */

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
    discCouponStatus.textContent = "Promo expirada. Cupón deshabilitado.";
    return;
  }
  if(discCouponApplied){
    discCouponStatus.classList.remove("bad");
    discCouponStatus.classList.add("ok");
    discCouponStatus.textContent = "Cupón aplicado: 50% activo en el subtotal.";
  } else {
    discCouponStatus.classList.remove("ok");
    discCouponStatus.classList.remove("bad");
    discCouponStatus.textContent = "Sin cupón aplicado.";
  }
}

function calcDISC(){
  if(!isPromoActive()){
    return { ok:false, msg:"Promo expirada: no aplican descuentos por rango ni cupón." };
  }

  const qty = Math.max(1, Number(discQty.value || 1));
  const service = discService.value;

  const val = discTrain.value;
  if(!val) return { ok:false, msg:"Selecciona un tren." };
  const [train, depart] = val.split("|");
  const row = findRow(discRoute.value, service, train, depart);
  if(!row) return { ok:false, msg:"No se encontró el tren seleccionado." };

  const base = row.promo * qty;

  // Rango
  const rate = rankDiscountRate(service);
  const discRank = base * rate;

  // Subtotal
  let subtotal = base - discRank;

  // Cupón opcional
  let discCoupon = 0;
  if(discCouponApplied){
    discCoupon = subtotal * COUPON_RATE;
    subtotal = subtotal - discCoupon;
  }

  const dateInfo = discOpenDate.checked ? "Fecha abierta" : (discDate.value || "Sin fecha");
  const meta = `Compra con beneficios · ${service} · Ruta ${row.route} · Tren ${row.train} · Fecha: ${dateInfo} · Cantidad: ${qty} · Rango: ${Math.round(rate*100)}%${discCouponApplied ? " · Cupón 50%" : ""}`;

  return {
    ok:true,
    kind:"DISC",
    qty,
    row,
    base,
    discRank,
    discHB: 0,
    discCoupon,
    total: Math.max(0, subtotal),
    meta
  };
}

function attachDiscEvents(){
  setDateDefault(discDate);
  setDiscCouponStatus();

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
      discCouponStatus.textContent = "Cupón inválido. Verifica el código.";
    }
  });

  discCoupon.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      discApplyCouponBtn.click();
    }
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
    discConfirmBtn.disabled = true;
    lastCalc = null;
    resetSummary("Compra confirmada (demo).");
    alert("Compra con beneficios confirmada (demo).");
  });
}

/* ---------------- Init + Compra Events ---------------- */

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
    couponStatus.textContent = "Cupón inválido. Verifica el código.";
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

function initApp(){
  // defaults date
  setDateDefault(dateOut);
  setDateDefault(dateBack);
  toggleReturn();

  updatePromoUI();
  setCompraCouponStatus();
  renderCompra();
  renderMillas();

  // Canjes defaults
  setDateDefault(hbDate);
  setDateDefault(discDate);

  // Fill trains
  fillHBTrains();
  fillDiscTrains();

  // Tabs
  attachTabEvents();
  setTab("HB");

  // Bind modules
  attachHBEvents();
  attachDiscEvents();

  // Nav
  attachNavigation();

  // Default view
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
