// ===== destination.js =====

// 🌍 --- Global Setup ---
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // ⚠️ Replace with your actual API key
const destinationGrid = document.getElementById("attractionGrid");
const itineraryContainer = document.getElementById("itineraryContainer");
const placeNameElem = document.getElementById("placeName");
const placeDescElem = document.getElementById("placeDesc");
const weatherText = document.getElementById("weatherText");

// 🌍 --- Get URL Parameters ---
const urlParams = new URLSearchParams(window.location.search);
const place = urlParams.get("place") || "unknown";

// 🌍 --- Load Destination Data ---
async function loadDestinationData() {
  try {
    const res = await fetch("data/destinations.json");
    const data = await res.json();

    if (!data[place]) {
      placeNameElem.textContent = "Destination Not Found";
      placeDescElem.textContent = "Sorry, this place isn’t available yet.";
      return;
    }

    const dest = data[place];

    // Set hero title + desc
    placeNameElem.textContent = dest.name;
    placeDescElem.textContent = dest.description;

    // Set hero background
    document.getElementById("heroSection").style.background = `url('${dest.image}') center/cover no-repeat`;

    // Load top attractions
    loadAttractions(dest.attractions);

    // Fetch weather
    fetchWeather(dest.city);
  } catch (err) {
    console.error("Error loading destination data:", err);
  }
}

// 🌤️ --- Fetch Weather ---
async function fetchWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    const temp = Math.round(data.main.temp);
    const condition = data.weather[0].main;
    weatherText.innerHTML = `${temp}°C • ${condition}`;
  } catch (err) {
    weatherText.innerHTML = "Weather unavailable";
    console.error("Weather fetch error:", err);
  }
}

// 📍 --- Load Top Attractions ---
function loadAttractions(attractions) {
  destinationGrid.innerHTML = "";
  attractions.forEach(attr => {
    const card = document.createElement("div");
    card.className = "attr-card";
    card.innerHTML = `
      <img src="${attr.image}" alt="${attr.name}">
      <h3>${attr.name}</h3>
      <p>${attr.desc}</p>
    `;
    destinationGrid.appendChild(card);
  });
}

// 🗓️ --- Load Preset Itineraries ---
async function loadItinerary(days) {
  try {
    const res = await fetch("data/itineraries.json");
    const data = await res.json();

    const plans = data[place]?.[`${days}days`];
    if (!plans) {
      itineraryContainer.innerHTML = `<p>No ${days}-day itinerary available for ${place}.</p>`;
      return;
    }

    // Render itinerary
    itineraryContainer.innerHTML = plans.map((day, i) => `
      <div class="day-card">
        <h4>Day ${i + 1}</h4>
        <p>${day}</p>
      </div>
    `).join("");
  } catch (err) {
    itineraryContainer.innerHTML = `<p>Error loading itinerary.</p>`;
    console.error(err);
  }
}

// 🚀 Initialize
loadDestinationData();
