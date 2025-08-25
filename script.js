const venues = [
  {
    name: "Marie Laveau",
    type: "klubb",
    hours: "18:00 – 03:00",
    crowd: {17:1, 20:2, 22:4, 24:5, 26:3},
    img: "https://source.unsplash.com/400x300/?club,party",
    link: "https://marielaveau.se",
    description: "Trendig klubb & bar på Hornsgatan.",
    featured: true
  },
  {
    name: "Indigo",
    type: "bar",
    hours: "16:00 – 01:00",
    crowd: {17:1, 20:3, 22:4, 24:2},
    img: "https://source.unsplash.com/400x300/?bar,drinks",
    link: "https://indigosodermalm.se",
    description: "Populär bar på Götgatan med skön atmosfär."
  },
  {
    name: "Häktet",
    type: "bar",
    hours: "17:00 – 03:00",
    crowd: {17:1, 20:2, 22:5, 24:5, 26:4},
    img: "https://source.unsplash.com/400x300/?cocktails",
    link: "https://haktet.se",
    description: "Cocktailbar och restaurang med känd innergård."
  },
  {
    name: "Kvarnen",
    type: "bar",
    hours: "11:00 – 01:00",
    crowd: {17:2, 20:3, 22:4, 24:2},
    img: "https://source.unsplash.com/400x300/?beer,pub",
    link: "https://kvarnen.com",
    description: "Anrik öl-hall vid Medborgarplatsen."
  }
];

// Second hand-event
const events = [
  { name: "SoFo Loppis", date: "Lör 14 sept", img: "https://source.unsplash.com/400x300/?flea-market" },
  { name: "Beyond Retro Popup", date: "Fre 20 sept", img: "https://source.unsplash.com/400x300/?clothes,vintage" }
];

// Vintage shops
const shops = [
  { name: "Emmaus Vintage", address: "Peter Myndes Backe", img: "https://source.unsplash.com/400x300/?secondhand" },
  { name: "Lisa Larsson Second Hand", address: "Bondegatan", img: "https://source.unsplash.com/400x300/?vintage,shop" },
  { name: "Beyond Retro", address: "Brännkyrkagatan", img: "https://source.unsplash.com/400x300/?retro,fashion" }
];

const grid = document.getElementById("grid");
const timeSlider = document.getElementById("time");
const timeLabel = document.getElementById("timeLabel");

// Funktion för tid
function formatTime(val) {
  let hour = parseInt(val);
  if (hour >= 24) hour = hour - 24;
  return (hour < 10 ? "0" + hour : hour) + ":00";
}

// Rendera kort
function renderCards(filter = "alla", search = "") {
  grid.innerHTML = "";
  const time = parseInt(timeSlider.value);
  venues.filter(v =>
    (filter === "alla" || v.type === filter) &&
    v.name.toLowerCase().includes(search.toLowerCase())
  ).forEach(v => {
    const card = document.createElement("div");
    card.className = v.featured ? "card featured" : "card";
    card.innerHTML = `
      <img src="${v.img}" alt="${v.name}" />
      <h3>${v.name}</h3>
      <p class="muted">${v.hours}</p>
      <p class="crowd">Trängsel: ${"⭐".repeat(v.crowd[time] || 1)}</p>
      <button class="book-btn" data-link="${v.link}">Boka / Se mer</button>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll(".book-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const link = e.target.getAttribute("data-link");
      window.open(link, "_blank");
    });
  });
}

// Event-lista
const eventsList = document.getElementById("eventsList");
events.forEach(ev => {
  const card = document.createElement("div");
  card.className = "event-card";
  card.innerHTML = `
    <img src="${ev.img}" alt="${ev.name}" />
    <h3>${ev.name}</h3>
    <p>${ev.date}</p>
  `;
  eventsList.appendChild(card);
});

// Shop-lista
const shopsList = document.getElementById("shopsList");
shops.forEach(s => {
  const card = document.createElement("div");
  card.className = "shop-card";
  card.innerHTML = `
    <img src="${s.img}" alt="${s.name}" />
    <h3>${s.name}</h3>
    <p>${s.address}</p>
  `;
  shopsList.appendChild(card);
});

// Filter, sök, slider
timeSlider.addEventListener("input", () => {
  timeLabel.textContent = formatTime(timeSlider.value);
  renderCards();
});

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    renderCards(chip.dataset.filter, document.getElementById("search").value);
  });
});

document.getElementById("search").addEventListener("input", e => {
  const filter = document.querySelector(".chip.active").dataset.filter;
  renderCards(filter, e.target.value);
});

renderCards();
timeLabel.textContent = formatTime(timeSlider.value);
