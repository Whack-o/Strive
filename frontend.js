document.getElementById("date").textContent = new Date().toLocaleDateString();

import confetti from "./scripts/confettiPackage.js";
import { getData, writeData } from "./scripts/storage.js";
import { setPage } from "./scripts/initialization.js";
import { initializeConfetti } from "./scripts/confettiFeature.js";
import { mainPageSetup } from "./scripts/mainPageSetup.js";
import { goldModeSetup } from "./scripts/goldMode.js";




// CONFETTI --------------------------------------

initializeConfetti({
  confetti,
  canvas: document.getElementById("c"),
  targets: document.querySelectorAll("#monthlyCheckbox, #weeklyCheckbox"),
  options: {
    particleCount: 160,
    spread: 100,
    //colors: ["#4f67b7", "#77b9dd", "#fcbf49", "#e07a5f", "#3d405b"],
    angle: 60,
    drift: 1
  }
});



// Initalization

var firstLogin = document.querySelector(".firstLogin");

if (localStorage.getItem("firstTime") == "false") {
  document.querySelector(".app").style.display = "block";
  mainPageSetup();
} else {
  document.querySelector(".app").style.display = "none";
  firstLogin.style.display = "block";

  setPage(0);

  // Pages do the rest of the work from here.
}

// Set up gold mode
goldModeSetup(document.getElementById("monthlyCheckbox"), document.getElementById("weeklyCheckbox"));