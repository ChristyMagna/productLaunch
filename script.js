const fingerprintBtn = document.getElementById("fingerprintBtn");
const activatedOverlayText = document.getElementById("activatedOverlayText");
const resetBtn = document.getElementById("resetBtn");
const textContainer = document.querySelector(".text-container");

const STORAGE_KEY = "launchActivated";

/* Decide UI state as early as possible */
(function initUIState() {
    const isActivated = localStorage.getItem(STORAGE_KEY) === "true";

    if (isActivated) {
        showActivatedState();
    } else {
        showInitialState();
    }

    document.body.classList.remove("app-hidden");
})();

/* Activate launch on pointer DOWN (Unity-style) */
fingerprintBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();

    // Prevent double interaction immediately
    fingerprintBtn.style.pointerEvents = "none";

    localStorage.setItem(STORAGE_KEY, "true");

    // Start fade-out animation
    fingerprintBtn.classList.add("fade-out");

    const fingerprintImg = fingerprintBtn.querySelector("img");
    let activated = false;

    const activate = () => {
        if (activated) return;
        activated = true;

        showActivatedState();
        fingerprintBtn.classList.remove("fade-out");
    };

    // Primary path
    fingerprintImg.addEventListener("animationend", activate, { once: true });

    // iOS Safari fallback
    setTimeout(activate, 550);
});

/* Reset launch */
resetBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    showInitialState();
});

/* Initial state */
function showInitialState() {
    activatedOverlayText.classList.add("hidden");
    textContainer.classList.remove("hidden");
    fingerprintBtn.classList.remove("hidden");
    fingerprintBtn.classList.remove("fade-out");
    fingerprintBtn.style.pointerEvents = "auto";
}

/* Activated state */
function showActivatedState() {
    textContainer.classList.add("hidden");
    activatedOverlayText.classList.remove("hidden");
    fingerprintBtn.classList.add("hidden");
}
