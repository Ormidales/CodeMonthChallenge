let timer;
let seconds = 1500; // 25 minutes in seconds
const timerElement = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

function updateTimer() {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  timerElement.textContent = `${mins}:${secs}`;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    seconds--;
    if (seconds < 0) {
      clearInterval(timer);
      alert("Pomodoro is over!");
      seconds = 1500;
    }
    updateTimer();
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  seconds = 1500;
  updateTimer();
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);