// Hjälpfunktion för tidformat
function formatHour(value) {
  if (value >= 24) return `${value - 24}:00`; // 24 = 0
  return `${value}:00`;
}

// Exempeldata för Södermalm-ställen
const venues = [
  {
    name: "Marie Laveau",
    type: "klubb",
    hours: "18.00 – 03.00",
    info: "En klassiker på Söder med bar, dansgolv och restaurang.",
    crowd: {17:1, 20:2, 22:4, 25:5}, // 25 = 01
    img: "https://source.unsplash.com/400x300/?club"
  },
  {
    name: "Indigo",
    type: "bar",
    hours: "17.00 – 02.00",
    info: "Populär bar med avslappnad stämning, perfekt för AW.",
    crowd: {17:1, 20:3, 22:4, 25:2},
    img: "https://source.unsplash.com/400x300/?bar"
  },
  {
    name: "Häktet",
    type: "bar",
    hours: "17.00 – 03.00",
    info: "Trendigt ställe med flera barer och DJs under helgen.",
    crowd: {17:2, 20:3, 22:5, 25:5},
    img: "https://source.unsplash.com/400x300/?cocktail"
  },
  {
    name: "Kvarnen",
    type: "bar",
    hours: "16.00 – 03.00",
    info: "Historisk ölhall och nattklubb med livlig atmosfär.",
    crowd: {17:2, 20:4, 22:5, 25:4},
    img: "https://source.unsplash.com/400x300/?beer"
  },
  {
    name: "Mosebacke",
    type: "klubb",
    hours: "17.00 – 03.00",
    info: "Legendarisk scen med konserter och en fantastisk terrass.",
    crowd: {17:1, 20:2, 22:4, 25:5},
    img: "https://source.unsplash.com/400x300/?concert"
  },
  {
    name: "Akkurat",
    type: "bar",
    hours: "16.00 – 02.00",
    info: "Känd för sitt stora ölutbud och livemusik.",
    crowd: {17:2, 20:3, 22:4, 25:3},
    img: "https://source.unsplash.com/400x300/?pub"
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
        <img src="${v.img}" alt="${v.name}">
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
    <img src="${v.img}" alt="${v.name}" style="width:100%;border-radius:12px;margin-bottom:1rem;">
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
  timeLabel.textContent = formatHour(parseInt(time.value));
  const activeFilter = document.querySelector(".chip.active").dataset.filter;
  renderVenues(activeFilter, search.value);
});

// Init
timeLabel.textContent = formatHour(parseInt(time.value));
renderVenues();

