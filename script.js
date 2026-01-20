const startBtn = document.getElementById("startBtn");
const video = document.getElementById("introVideo");
const overlay = document.getElementById("fadeOverlay");
const resetBtn = document.getElementById("resetBtn");

function startExperience() {
    startBtn.style.display = "none";
    video.style.display = "block";

    // Fade in
    requestAnimationFrame(() => {
        overlay.classList.add("hidden");
    });

    video.play();

    // Analytics trigger
    if (window.gtag) {
        gtag("event", "video_start", {
            event_category: "engagement",
            event_label: "intro_video"
        });
    }

    localStorage.setItem("videoPlayed", "true");
}

// Auto-play if already visited
if (localStorage.getItem("videoPlayed") === "true") {
    startExperience();
}

startBtn.addEventListener("click", startExperience);

// Reset for testing
resetBtn.addEventListener("click", () => {
    localStorage.removeItem("videoPlayed");
    location.reload();
});
