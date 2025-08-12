// turn-taking.js — adds GO beep + traffic-light cue

// Your existing questions array can stay the same.
// We'll detect 🔴/🟢 in the question text to set the cue light and beep.

const questions = [
  {
    question:
      "Two kids are talking to each other. You want to say hi.\nTurn cue: 🔴 Not your turn yet.",
    answers: [
      { text: "Wait quietly and look for a pause", correct: true },
      { text: "Interrupt and say “Hi!” now", correct: false },
      { text: "Wave and talk over them", correct: false },
      { text: "Tap a shoulder and start talking", correct: false },
    ],
  },
  {
    question: "They finish talking and look at you.\nTurn cue: 🟢 Your turn.",
    answers: [
      { text: "Say, “Hi, I’m ____. Can I play with you?”", correct: true },
      { text: "Stay silent and look away", correct: false },
      { text: "Grab toys and start playing without words", correct: false },
      { text: "Shout from across the room", correct: false },
    ],
  },
  {
    question:
      "The teacher is giving directions. You want the red marker.\nTurn cue: 🔴 Not your turn.",
    answers: [
      { text: "Raise your hand and wait to be called on", correct: true },
      { text: "Call out now", correct: false },
      { text: "Walk up and take the marker", correct: false },
      { text: "Talk to a friend instead", correct: false },
    ],
  },
  {
    question:
      "The teacher pauses and calls your name.\nTurn cue: 🟢 Your turn.",
    answers: [
      { text: "Ask politely for the red marker", correct: true },
      { text: "Say nothing", correct: false },
      { text: "Complain loudly", correct: false },
      { text: "Leave your seat and grab it", correct: false },
    ],
  },
  {
    question:
      "Kids are counting points in a game. You want to join.\nTurn cue: 🔴 Not your turn.",
    answers: [
      { text: "Wait until they finish counting", correct: true },
      { text: "Tell them to stop and let you play", correct: false },
      { text: "Jump in and change the rules", correct: false },
      { text: "Walk away and shout “Fine!”", correct: false },
    ],
  },
  {
    question: "They finish and look at you.\nTurn cue: 🟢 Your turn.",
    answers: [
      { text: "Ask, “What part can I do?”", correct: true },
      { text: "Knock over a piece to start", correct: false },
      { text: "Stand and stare silently", correct: false },
      { text: "Say, “I’m the boss now”", correct: false },
    ],
  },
  {
    question:
      "A new child sits at your table and is busy drawing.\nTurn cue: 🔴 Not your turn.",
    answers: [
      { text: "Wait until they pause and look up", correct: true },
      { text: "Speak over them while they draw", correct: false },
      { text: "Take their crayon to get attention", correct: false },
      { text: "Lean very close and whisper", correct: false },
    ],
  },
  {
    question: "They look up and smile at you.\nTurn cue: 🟢 Your turn.",
    answers: [
      { text: "Say, “Hi, I’m ____. What’s your name?”", correct: true },
      { text: "Say nothing and turn away", correct: false },
      { text: "Tell them to move", correct: false },
      { text: "Make a loud joke right away", correct: false },
    ],
  },
];

// ---- DOM
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");

// Cue elements (may be null if you haven’t added them yet)
const cueLight = document.getElementById("cueLight");
const cueLabel = document.getElementById("cueLabel");

// ---- Audio (beep)
let audioCtx = null;
function ensureAudio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!audioCtx) audioCtx = new AC();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function beep(freq = 988, dur = 0.22, volume = 0.07) {
  const ctx = ensureAudio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.value = volume;
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + dur);
}
document.addEventListener("pointerdown", () => ensureAudio(), { once: true });

// ---- Cue helpers (FIXED)
function setCue(state /* 'WAIT' | 'READY' | 'GO' */) {
  if (!cueLight || !cueLabel) return;

  // Don’t remove color classes; only toggle the 'on' class.
  const lights = cueLight.querySelectorAll(".light");
  lights.forEach((l) => l.classList.remove("on"));

  const map = {
    WAIT: ".light.red",
    READY: ".light.yellow",
    GO: ".light.green",
  };
  const target = cueLight.querySelector(map[state] || map.WAIT);
  if (target) target.classList.add("on");

  if (state === "GO") {
    cueLight.setAttribute("aria-label", "Your turn");
    cueLabel.textContent = "Your turn";
    beep();
  } else if (state === "READY") {
    cueLight.setAttribute("aria-label", "Get ready");
    cueLabel.textContent = "Get ready";
  } else {
    cueLight.setAttribute("aria-label", "Wait");
    cueLabel.textContent = "Wait";
  }
}
function detectCueFromText(text) {
  if (text.includes("🟢")) return "GO";
  if (text.includes("🟡")) return "READY";
  return "WAIT"; // default/🔴
}

// ---- Game flow
let currentQuestionIndex = 0;

function startGame() {
  currentQuestionIndex = 0;
  nextButton.innerText = "Next";
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  const current = questions[currentQuestionIndex];

  questionElement.innerText = current.question;

  // Update cue based on the icon in the question text
  setCue(detectCueFromText(current.question));

  // Build answers
  current.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerText = answer.text;
    if (answer.correct) btn.dataset.correct = "true";
    btn.addEventListener("click", selectAnswer);
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectAnswer({ target: btn });
      }
    });
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextButton.style.display = "none";
  feedback.innerText = "";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selected = e.target;
  const correct = selected.dataset.correct === "true";

  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
  });

  feedback.innerText = correct
    ? "✅ Great timing!"
    : "❌ Not yet. Look for a pause or a cue that it’s your turn.";

  nextButton.innerText =
    currentQuestionIndex < questions.length - 1 ? "Next" : "Finish";
  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showEndMessage();
  }
});

function showEndMessage() {
  resetState();
  setCue("WAIT");
  questionElement.innerText = "🎉 Great job! You've finished the game.";
  nextButton.style.display = "none";

  try {
    const currentUser = localStorage.getItem("currentUser") || "guest";
    const key = `gameRewards_${currentUser}`;
    const rewards = JSON.parse(localStorage.getItem(key) || "{}");
    rewards["Social Choices Game"] = (rewards["Social Choices Game"] || 0) + 1;
    localStorage.setItem(key, JSON.stringify(rewards));
  } catch {}
}

document.addEventListener("DOMContentLoaded", startGame);
