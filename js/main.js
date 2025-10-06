// ===== main.js =====

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
