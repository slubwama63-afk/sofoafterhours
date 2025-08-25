const venues = [
  {
    name: "Marie Laveau",
    type: "klubb",
    hours: "18:00 – 03:00",
    crowd: {17:1, 20:2, 22:4, 24:5, 26:3},
    img: "https://source.unsplash.com/400x300/?club,party",
    link: "https://marielaveau.se",
    description: "Trendig klubb & bar på Hornsgatan med bra musik och dansgolv."
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
    description: "Anrik öl-hall och restaurang vid Medborgarplatsen."
  }
];

const grid = document.getElementById("grid");
const timeSlider = document.getElementById("time");
const timeLabel = document.getElementById("timeLabel");

// Funktion för att formatera tid
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
    card.className = "card";
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
      // Här kan du även lägga in tracking: t.ex. GA event
    });
  });
}

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


