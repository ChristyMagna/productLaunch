const fingerprintBtn = document.getElementById("fingerprintBtn");
const launchVideo = document.getElementById("launchVideo");
const initialText = document.getElementById("initialText");
const activatedText = document.getElementById("activatedText");
const resetBtn = document.getElementById("resetBtn");

const STORAGE_KEY = "launchActivated";

/* Restore state */
window.addEventListener("load", () => {
  if (localStorage.getItem(STORAGE_KEY) === "true") {
    showActivatedState();
  }
});

/* Activate launch */
fingerprintBtn.addEventListener("click", () => {
  localStorage.setItem(STORAGE_KEY, "true");
  showActivatedState();

  launchVideo.currentTime = 0;
  launchVideo.play();
});

/* Reset */
resetBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
});

function showActivatedState() {
  initialText.classList.add("hidden");
  activatedText.classList.remove("hidden");
  fingerprintBtn.classList.add("hidden");
  launchVideo.classList.remove("hidden");
}
