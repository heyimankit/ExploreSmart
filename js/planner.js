// ===== planner.js =====

// 🚀 --- Elements ---
const generateBtn = document.getElementById("generateBtn");
const outputBox = document.getElementById("outputBox");
const saveTripBtn = document.getElementById("saveTrip");
const exportPDFBtn = document.getElementById("exportPDF");

// 🌍 --- Gemini API Key (ADD YOUR OWN KEY HERE) ---
const GEMINI_API_KEY = CONFIG.GEMINI_API_KEY;

// 🧭 --- Generate Trip Function ---
generateBtn.addEventListener("click", async () => {
    const dest = document.getElementById("destInput").value.trim();
    const days = document.getElementById("daysInput").value;
    const budget = document.getElementById("budgetInput").value;
    const interests = Array.from(document.querySelectorAll(".checkboxes input:checked")).map(cb => cb.value);

    if (!dest) {
        alert("Please enter a destination!");
        return;
    }

    // Loading UI
    outputBox.innerHTML = `<p>Generating your personalized trip plan... ⏳</p>`;

    // Create AI prompt
    const prompt = `
You are a travel planner. Create a concise ${days}-day itinerary for ${dest}, India.
Focus on ${interests.join(", ")} interests and a budget of ₹${budget}.
Keep it short and crisp — 2-3 lines per day maximum.
Format the output cleanly like this:

Day 1: ...
Day 2: ...
Day 3: ...
Day 4: ...
Tips: ...
`;


    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": GEMINI_API_KEY
                },
                body: JSON.stringify({
                    contents: [
                        { parts: [{ text: prompt }] }
                    ]
                })
            }
        );


        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No itinerary generated.";

        renderItinerary(aiText);
    } catch (err) {
        console.error(err);
        outputBox.innerHTML = `<p>Error generating trip. Please try again later.</p>`;
    }
});

// 🧾 --- Render Itinerary ---
function renderItinerary(text) {
    const lines = text.split(/\n+/).filter(line => line.trim() !== "");
    outputBox.innerHTML = "";

    lines.forEach((line, index) => {
        const div = document.createElement("div");
        div.className = "day-block";
        div.innerHTML = `<strong>${line.startsWith("Day") ? line : "• " + line}</strong>`;
        outputBox.appendChild(div);
    });
}

// 💾 --- Save Trip ---
saveTripBtn.addEventListener("click", () => {
    const content = outputBox.innerText.trim();
    if (!content) {
        alert("Generate a trip first!");
        return;
    }

    const dest = document.getElementById("destInput").value.trim() || "Unknown";
    const savedTrips = JSON.parse(localStorage.getItem("exploreSmartTrips")) || [];
    const newTrip = {
        destination: dest,
        date: new Date().toLocaleString(),
        itinerary: content,
    };

    savedTrips.push(newTrip);
    localStorage.setItem("exploreSmartTrips", JSON.stringify(savedTrips));
    alert("✅ Trip saved successfully!");
});

// 📄 --- Export as PDF ---
exportPDFBtn.addEventListener("click", () => {
    const content = outputBox.innerText.trim();
    if (!content) {
        alert("Nothing to export!");
        return;
    }

    const opt = {
        margin: 0.5,
        filename: 'ExploreSmart_TripPlan.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(outputBox).set(opt).save();
});

console.log("AI Trip Planner Ready ✅");
