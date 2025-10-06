// ===== dashboard.js =====

const tripsContainer = document.getElementById("tripsContainer");
const savedTrips = JSON.parse(localStorage.getItem("exploreSmartTrips")) || [];

// Render trips
function renderTrips() {
  if (savedTrips.length === 0) {
    tripsContainer.innerHTML = "<p>No trips saved yet. Go plan one with the AI Assistant!</p>";
    return;
  }

  tripsContainer.innerHTML = "";
  savedTrips.forEach((trip, index) => {
    const div = document.createElement("div");
    div.className = "trip-card";
    div.innerHTML = `
      <h3>${trip.destination}</h3>
      <p><strong>Date Saved:</strong> ${trip.date}</p>
      <p>${trip.itinerary.substring(0, 200)}...</p>
      <div class="actions">
        <button onclick="viewTrip(${index})">View</button>
        <button onclick="exportTrip(${index})">Export PDF</button>
        <button onclick="deleteTrip(${index})">Delete</button>
      </div>
    `;
    tripsContainer.appendChild(div);
  });
}

// View full trip
function viewTrip(index) {
  const trip = savedTrips[index];
  alert(`📍 ${trip.destination}\n\n${trip.itinerary}`);
}

// Export trip to PDF
function exportTrip(index) {
  const trip = savedTrips[index];
  const opt = {
    margin: 0.5,
    filename: `Trip_${trip.destination}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  const temp = document.createElement("div");
  temp.innerHTML = `<h2>${trip.destination}</h2><pre>${trip.itinerary}</pre>`;
  html2pdf().from(temp).set(opt).save();
}

// Delete trip
function deleteTrip(index) {
  if (!confirm("Are you sure you want to delete this trip?")) return;
  savedTrips.splice(index, 1);
  localStorage.setItem("exploreSmartTrips", JSON.stringify(savedTrips));
  renderTrips();
}

renderTrips();
console.log("Dashboard Ready ✅");
