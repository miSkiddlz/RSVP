let interval = null;
let words = [];
let index = 0;
let isRepeating = false;
let isPaused = false;
let hasStarted = false;

const textInput = document.getElementById("textInput");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const repeatBtn = document.getElementById("repeat");
const slider = document.getElementById("wpmSlider");
const wpmValue = document.getElementById("wpmValue");
const display = document.getElementById("rsvpDisplay");

wpmValue.textContent = slider.value;

/* ---------------- SLIDER ---------------- */

slider.addEventListener("input", () => {

  let snapped = Math.round(slider.value / 50) * 50;
  slider.value = snapped;

  wpmValue.textContent = slider.value;

  if (interval && !isPaused) restartInterval();
});

/* ---------------- BUTTONS ---------------- */

startBtn.addEventListener("click", () => {

  if (!hasStarted) {

    if (!textInput.value.trim()) return;

    words = textInput.value.trim().split(/\s+/);
    index = 0;
    hasStarted = true;

  }

  isPaused = false;
  run();
});

stopBtn.addEventListener("click", () => {
  pause();
});

repeatBtn.addEventListener("click", () => {

  isRepeating = !isRepeating;

  repeatBtn.style.background =
    isRepeating ? "#444" : "#222";

});

/* ---------------- SPACE PAUSE ---------------- */

document.addEventListener("keydown", (e) => {

  if (e.code === "Space") {
    e.preventDefault();
    togglePause();
  }

});

/* ---------------- CORE ---------------- */

function pause() {

  clearInterval(interval);
  interval = null;
  isPaused = true;

}

function togglePause() {

  if (!hasStarted) return;

  if (isPaused) {

    isPaused = false;
    run();

  } else {

    pause();

  }

}

function run() {

  clearInterval(interval);

  const delay = 60000 / slider.value;

  interval = setInterval(() => {

    if (index >= words.length) {

      if (isRepeating) {

        index = 0;

      } else {

        pause();
        return;

      }

    }

    const currentWord = words[index];

    showWord(currentWord);

    index++;

    const lastChar = currentWord.slice(-1);

    if (lastChar === "." || lastChar === "!" || lastChar === "?") {

      pause();

      setTimeout(() => {

        isPaused = false;
        run();

      }, 500);

    }

  }, delay);

}

function restartInterval() {

  if (!isPaused) run();

}

/* ---------------- ORP ---------------- */

function showWord(word) {

  const middle = Math.floor(word.length / 2);

  const first = word.slice(0, middle);
  const letter = word[middle] || "";
  const last = word.slice(middle + 1);

  display.innerHTML =
    `${first}<span class="orp">${letter}</span>${last}`;

}
