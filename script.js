// Exempeldata för klubbar & barer
const venues = [
  {
    name: "Marie Laveau",
    type: "klubb",
    hours: "18.00 – 03.00",
    info: "En klassiker på Söder med bar, dansgolv och restaurang.",
    crowd: {17:1, 20:2, 22:4, 01:5}
  },
  {
    name: "Indigo",
    type: "bar",
    hours: "17.00 – 02.00",
    info: "Populär bar med avslappnad stämning, perfekt för AW.",
    crowd: {17:1, 20:3, 22:4, 01:2}
  },
  {
    name: "Häktet",
    type: "bar",
    hours: "17.00 – 03.00",
    info: "Trendigt ställe med flera barer och DJs under helgen.",
    crowd: {17:2, 20:3, 22:5, 01:5}
  }
];

const events = [
  { name: "Vintagefest", date: "30 april, 12.00 – 16.00" },
  { name: "Second hand pop-up @ SoFo", date: "12 maj, 11.00 – 17.00" }
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const time = document.getElementById("time");
const timeLabel = document.getElementById("timeLabel");
const eventsList = document.getElementById("eventsList");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

// Rendera venues
function renderVenues(filter="alla", query="") {
  grid.innerHTML = "";
  let selectedHour = parseInt(time.value);

  venues
    .filter(v => (filter==="alla" || v.type===filter))
    .filter(v => v.name.toLowerCase().includes(query.toLowerCase()))
    .forEach(v => {
      const card = document.createElement("div");
      card.className = "card";
      const crowdLevel = v.crowd[selectedHour] || 2;

      card.innerHTML = `
        <h3>${v.name}</h3>
        <p class="muted">${v.type.toUpperCase()}</p>
        <p>Öppettider: ${v.hours}</p>
        <p>Trängsel: ${"★".repeat(crowdLevel)}</p>
      `;

      card.addEventListener("click", () => openModal(v));
      grid.appendChild(card);
    });
}

// Modal
function openModal(v) {
  modalBody.innerHTML = `
    <h2>${v.name}</h2>
    <p><strong>Typ:</strong> ${v.type}</p>
    <p><strong>Öppettider:</strong> ${v.hours}</p>
    <p>${v.info}</p>
  `;
  modal.classList.remove("hidden");
}
closeModal.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => { if (e.target === modal) modal.classList.add("hidden"); });

// Events
events.forEach(ev => {
  const item = document.createElement("div");
  item.className = "card";
  item.innerHTML = `<h3>${ev.name}</h3><p>${ev.date}</p>`;
  eventsList.appendChild(item);
});

// Sök och filter
document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderVenues(btn.dataset.filter, search.value);
  });
});
search.addEventListener("input", () => {
  const activeFilter = document.querySelector(".chip.active").dataset.filter;
  renderVenues(activeFilter, search.value);
});

// Tid-slider
time.addEventListener("input", () => {
  timeLabel.textContent = `${time.value}:00`;
  const activeFilter = document.querySelector(".chip.active").dataset.filter;
  renderVenues(activeFilter, search.value);
});

// Init
renderVenues();
