// Création d'un contexte audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Fonction pour jouer un "clic" sonore
function playClick() {
  const oscillator = audioContext.createOscillator();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Valeur en Hz
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);  // Durée du son
}

// Fonction pour changer l'indicateur visuel
function toggleVisualIndicator() {
  const indicator = document.getElementById("visualIndicator");
  indicator.classList.toggle("bg-green-400");
}

let intervalId;
let isRunning = false;

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleBtn");
  const tempoInput = document.getElementById("tempoInput");
  const tempoDisplay = document.getElementById("tempoDisplay");

  toggleBtn.addEventListener("click", () => {
    if (isRunning) {
      clearInterval(intervalId);
      toggleBtn.textContent = "Démarrer";
      isRunning = false;
    } else {
      const tempo = parseInt(tempoInput.value, 10);
      const interval = 60000 / tempo;
      intervalId = setInterval(() => {
        playClick(); // Appel de la fonction pour jouer le son
        toggleVisualIndicator(); // Appel de la fonction pour changer l'indicateur visuel
      }, interval);
      toggleBtn.textContent = "Arrêter";
      isRunning = true;
    }
  });

  tempoInput.addEventListener("input", (e) => {
    const tempo = e.target.value;
    tempoDisplay.textContent = tempo;
    if (isRunning) {
      clearInterval(intervalId);
      const interval = 60000 / tempo;
      intervalId = setInterval(() => {
        playClick(); // Appel de la fonction pour jouer le son
        toggleVisualIndicator(); // Appel de la fonction pour changer l'indicateur visuel
      }, interval);
    }
  });
});