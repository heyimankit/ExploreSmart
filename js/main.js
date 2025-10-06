// ===== Explore by Region =====
const regions = {
  north: [
    { name: "Uttarakhand", packages: "50+", img: "assets/images/uttarakhand.jpg" },
    { name: "Rajasthan", packages: "30+", img: "assets/images/rajasthan.jpg" },
    { name: "Himachal", packages: "60+", img: "assets/images/himachal.jpg" },
    { name: "Jammu & Kashmir", packages: "30+", img: "assets/images/jk.jpg" },
    { name: "Uttar Pradesh", packages: "25+", img: "assets/images/up.jpg" },
    { name: "Delhi", packages: "20+", img: "assets/images/delhi.jpg" },
    { name: "Ladakh", packages: "25+", img: "assets/images/ladakh.jpg" }
  ],
  south: [
    { name: "Kerala", packages: "40+", img: "assets/images/kerala.jpg" },
    { name: "Tamil Nadu", packages: "30+", img: "assets/images/tamilnadu.jpg" },
    { name: "Karnataka", packages: "35+", img: "assets/images/karnataka.jpg" },
    { name: "Andhra Pradesh", packages: "20+", img: "assets/images/andhra.jpg" },
    { name: "Pondicherry", packages: "15+", img: "assets/images/pondicherry.jpg" },
    { name: "Andaman", packages: "20+", img: "assets/images/andaman.jpg" },
    { name: "Telengana", packages: "15+", img: "assets/images/telangana.jpg" }
  ],
  east: [
    { name: "Sikkim", packages: "20+", img: "assets/images/sikkim.jpg" },
    { name: "West Bengal", packages: "40+", img: "assets/images/wb.jpg" },
    { name: "Assam", packages: "30+", img: "assets/images/assam.jpg" },
    { name: "Odisha", packages: "25+", img: "assets/images/odisha.jpg" }
  ],
  west: [
    { name: "Goa", packages: "50+", img: "assets/images/goa.jpg" },
    { name: "Gujarat", packages: "30+", img: "assets/images/gujarat.jpg" },
    { name: "Maharashtra", packages: "40+", img: "assets/images/maharashtra.jpg" },
    { name: "Rajasthan", packages: "35+", img: "assets/images/rajasthan.jpg" }
  ],
  central: [
    { name: "Madhya Pradesh", packages: "30+", img: "assets/images/mp.jpg" },
    { name: "Chhattisgarh", packages: "20+", img: "assets/images/chhattisgarh.jpg" }
  ]
};

// Render region cards
function renderRegion(region) {
  const container = document.getElementById("regionContainer");
  container.innerHTML = "";

  regions[region].forEach((place, index) => {
    const card = document.createElement("div");
    card.className = "region-card";

    // First card in every region = tall
    if (index === 0) card.classList.add("tall");

    card.innerHTML = `
      <img src="${place.img}" alt="${place.name}">
      <div class="region-info">
        <h3>${place.name}</h3>
        <p>${place.packages} Packages</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// Tab click handler
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderRegion(tab.dataset.region);
  });
});

// Default load
renderRegion("north");

// 🔹 Function: Redirect to selected destination
function goToDestination(place) {
  // Redirect with query parameter
  window.location.href = `destination.html?place=${place}`;
}

// 🔹 Function: Handle search input
document.getElementById('searchBtn').addEventListener('click', () => {
  const input = document.getElementById('searchInput').value.trim().toLowerCase();
  if (input) {
    goToDestination(input);
  } else {
    alert('Please enter a destination name.');
  }
});

// 🔹 Function: Filter by category
function filterCategory(category) {
  // Redirect to destination.html with category filter
  window.location.href = `destination.html?category=${category}`;
}

// 🔹 Navbar active link highlight
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});

// 🔹 Add smooth scroll for anchor links (future-proof)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 🔹 Simple console log for debugging
console.log("ExploreSmart Homepage Ready ✅");
