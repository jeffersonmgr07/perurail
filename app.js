/* Demo Extranet PeruRail - GitHub Pages (sin backend) */

const $ = (sel) => document.querySelector(sel);

const loginView = $("#loginView");
const appView = $("#appView");

const loginForm = $("#loginForm");
const logoutBtn = $("#logoutBtn");

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

const paxAdult = $("#paxAdult");
const paxChild = $("#paxChild");
const paxGuide = $("#paxGuide");

/* Datos (Ollantaytambo <-> Machu Picchu) */
/* Campos: route, service, train, depart, arrive, duration, promo, regular */
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

/* UI state */
let selectedId = null;

function money(n){
  return `USD ${Number(n).toFixed(2)}`;
}
function toMinutes(hhmm){
  const [h,m] = hhmm.split(":").map(Number);
  return h*60 + m;
}
function calcImporte(promoOrRegular){
  const a = Number(paxAdult.value || 0);
  const c = Number(paxChild.value || 0);
  const g = Number(paxGuide.value || 0);
  const totalPax = a + c + g;
  return promoOrRegular * totalPax;
}

function ensureDates(){
  const today = new Date();
  const iso = today.toISOString().slice(0,10);
  if(!dateOut.value) dateOut.value = iso;

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate()+1);
  const iso2 = tomorrow.toISOString().slice(0,10);
  if(!dateBack.value) dateBack.value = iso2;
}

function toggleReturn(){
  const isRT = tripType.value === "roundtrip";
  returnWrap.style.display = isRT ? "flex" : "none";
}

function filterData(){
  const route = routeSel.value;
  const service = serviceSel.value;

  let rows = SCHEDULES.filter(r => r.route === route);
  if(service !== "ALL"){
    rows = rows.filter(r => r.service === service);
  }

  // sort
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

function render(){
  const rows = filterData();
  resultsBody.innerHTML = "";
  selectedId = null;
  buyBtn.disabled = true;

  rows.forEach((r, idx) => {
    const id = `${r.route}-${r.service}-${r.train}-${r.depart}-${idx}`;
    const importe = calcImporte(r.promo);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <input class="radio" type="radio" name="pick" value="${id}" aria-label="Seleccionar">
      </td>
      <td><span class="pill">${r.route}</span></td>
      <td><span class="pill pill--gold">${r.service}</span></td>
      <td>${r.train}</td>
      <td><strong>${r.depart}</strong></td>
      <td>${r.arrive}</td>
      <td>${r.duration}</td>
      <td class="money">${money(r.promo)}</td>
      <td>${money(r.regular)}</td>
      <td class="money">${money(importe)}</td>
    `;
    resultsBody.appendChild(tr);
  });

  countLabel.textContent = `${rows.length} resultados`;
}

function attachRowSelection(){
  resultsBody.addEventListener("change", (e) => {
    const t = e.target;
    if(t && t.name === "pick"){
      selectedId = t.value;
      buyBtn.disabled = !selectedId;
    }
  });
}

function init(){
  ensureDates();
  toggleReturn();
  attachRowSelection();
  render();

  $("#searchForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    render();
  });

  tripType.addEventListener("change", ()=>{
    toggleReturn();
  });

  [routeSel, serviceSel, sortBy, paxAdult, paxChild, paxGuide].forEach(el=>{
    el.addEventListener("change", render);
    el.addEventListener("input", render);
  });

  buyBtn.addEventListener("click", ()=>{
    if(!selectedId) return;
    alert("Demo: Itinerario seleccionado. Aquí continuarías con emisión/pago en un sistema real.");
  });
}

/* Login mock */
loginForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const u = ($("#user").value || "").trim();
  $("#agentName").textContent = u ? u.toUpperCase() : "AGENCIA";

  loginView.classList.add("hidden");
  appView.classList.remove("hidden");
  init();
});

logoutBtn.addEventListener("click", ()=>{
  appView.classList.add("hidden");
  loginView.classList.remove("hidden");
});
