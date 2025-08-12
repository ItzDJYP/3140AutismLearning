// --- Data -----------------------------------------------------------
const WORDS = [
  // Food & Drink
  { key: "apple",  label: "apple",  img: "images/apple.png",  tts: "apple" },
  { key: "bananas", label: "bananas", img: "images/bananas.png", tts: "bananas" },
  { key: "juice",  label: "juice",  img: "images/juice.png",  tts: "juice" },
  { key: "milk",   label: "milk",   img: "images/milk.png",   tts: "milk" },
  { key: "water",  label: "water",  img: "images/water.jpg",  tts: "water" },
  { key: "bread",  label: "bread",  img: "images/bread.png",  tts: "bread" },

  // Animals
  { key: "dog",    label: "dog",    img: "images/dog.jpg",    tts: "dog" },
  { key: "cat",    label: "cat",    img: "images/cat.jpg",    tts: "cat" },
  { key: "fish",   label: "fish",   img: "images/fish.jpg",   tts: "fish" },
  { key: "bird",   label: "bird",   img: "images/bird.png",   tts: "bird" },
  { key: "horse",  label: "horse",  img: "images/horse.png",  tts: "horse" },
  { key: "duck",   label: "duck",   img: "images/duck.png",   tts: "duck" },

  // Objects & Transport
  { key: "ball",   label: "ball",   img: "images/ball.png",   tts: "ball" },
  { key: "car",    label: "car",    img: "images/car.jpg",    tts: "car" },
  { key: "bus",    label: "bus",    img: "images/bus.png",    tts: "bus" },
  { key: "bike",   label: "bike",   img: "images/bike.png",   tts: "bike" },
  { key: "book",   label: "book",   img: "images/book.jpg",   tts: "book" },
  { key: "chair",  label: "chair",  img: "images/chair.jpg",  tts: "chair" },
];

// 3 sets × 6 unique items each
const SETS = [
  { name: "Set 1", items: ["apple", "bananas", "juice", "milk", "water", "bread"] },
  { name: "Set 2", items: ["dog", "cat", "fish", "bird", "horse", "duck"] },
  { name: "Set 3", items: ["ball", "car", "bus", "bike", "book", "chair"] },
];

// --- DOM ------------------------------------------------------------
const toggleText = document.getElementById("toggleText");
const toggleAdvanced = document.getElementById("toggleAdvanced"); // may be null
const sayBtn = document.getElementById("sayBtn");
const playWordBtn = document.getElementById("playWordBtn");
const nextBtn = document.getElementById("nextBtn");

const scoreEl = document.getElementById("score");
const setProgressEl = document.getElementById("setProgress");
const feedbackEl = document.getElementById("feedback");
const choicesEl = document.getElementById("choices");
const sentenceStrip = document.getElementById("sentenceStrip");
const dropSlot = document.getElementById("dropSlot");
const currentWordLabel = document.getElementById("currentWordLabel");

// --- Config ---------------------------------------------------------
const CHOICE_COUNT = 4; // always show 4 options

// --- State ----------------------------------------------------------
let score = 0;
let completedInCurrentSet = 0;
let currentSetIndex = 0;
let currentWord = null;   // word key
let answered = false;

// --- Helpers --------------------------------------------------------
function shuffle(a) {
  const arr = a.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function loadProgress() {
  try {
    const raw = localStorage.getItem("wordAssocProgress");
    if (!raw) return;
    const p = JSON.parse(raw);
    score = p.score ?? 0;
    currentSetIndex = p.currentSetIndex ?? 0;
    completedInCurrentSet = p.completedInCurrentSet ?? 0;
  } catch {}
}

function saveProgress() {
  const p = { score, currentSetIndex, completedInCurrentSet };
  const currentUser = localStorage.getItem("currentUser") || "guest";
  localStorage.setItem(`wordAssocProgress_${currentUser}`, JSON.stringify(p));

  // Optional: simple star rating by sets completed (1–4 stars)
  const setsCompleted = currentSetIndex + (completedInCurrentSet >= currentSet().items.length ? 1 : 0);
  const stars = Math.max(0, Math.min(4, setsCompleted));
  const rewards = JSON.parse(localStorage.getItem(`gameRewards_${currentUser}`) || "{}");
  rewards["Word & Picture Association"] = Math.max(stars, rewards["Word & Picture Association"] || 0);
  localStorage.setItem(`gameRewards_${currentUser}`, JSON.stringify(rewards));
}

function currentSet() { return SETS[Math.min(currentSetIndex, SETS.length - 1)]; }

function speakWord(word) {
  const item = WORDS.find(w => w.key === word);
  const text = (item && (item.tts || item.label)) || word;
  if ("speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    u.pitch = 1.0;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } else {
    feedbackEl.textContent = `Say: "${text}"`;
  }
  if (currentWordLabel) currentWordLabel.textContent = text;
}

function renderHUD() {
  scoreEl.textContent = String(score);
  setProgressEl.textContent = `${Math.min(currentSetIndex + 1, SETS.length)}/${SETS.length}`;
}

// --- Rounds ---------------------------------------------------------
function newRound() {
  answered = false;
  choicesEl.innerHTML = "";
  if (dropSlot) {
    dropSlot.classList.remove("ok", "nope");
    dropSlot.textContent = "____";
  }

  const set = currentSet();
  currentWord = rand(set.items);

  // Build choices (always CHOICE_COUNT)
  const pool = shuffle(WORDS);
  const correct = pool.find(w => w.key === currentWord);
  const distractors = pool.filter(w => w.key !== currentWord);
  const distractorCount = Math.min(WORDS.length - 1, CHOICE_COUNT - 1);
  const options = shuffle([correct, ...distractors.slice(0, distractorCount)]);

  options.forEach(opt => {
    const card = document.createElement("div");
    card.className = "choice";
    card.draggable = true;
    card.role = "option";
    card.tabIndex = 0;
    card.dataset.key = opt.key;

    const img = document.createElement("img");
    img.alt = opt.label;
    img.src = opt.img;

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = opt.label;

    card.appendChild(img);
    card.appendChild(label);

    if (!(toggleText && toggleText.checked)) card.classList.add("hide-label");

    // Click/keyboard
    card.addEventListener("click", () => tryAnswer(opt.key));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tryAnswer(opt.key);
      }
    });

    // Drag start (for advanced mode)
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", opt.key);
    });

    choicesEl.appendChild(card);
  });

  // Speak the target word
  speakWord(currentWord);
}

function tryAnswer(choiceKey) {
  if (answered) return;

  const isAdvanced = !!(toggleAdvanced && toggleAdvanced.checked);

  if (!isAdvanced) {
    const isCorrect = choiceKey === currentWord;

    // Mark all
    [...choicesEl.children].forEach(c => {
      const right = c.dataset.key === currentWord;
      c.classList.toggle("correct", right);
      c.classList.toggle("wrong", !right);
    });

    if (isCorrect) onCorrect();
    else onWrong();

  } else {
    dropToSlot(choiceKey);
  }
}

function onCorrect() {
  answered = true;
  feedbackEl.textContent = "✅ Great job!";
  score += 100;
  completedInCurrentSet += 1;

  // Complete set?
  if (completedInCurrentSet >= currentSet().items.length) {
    completedInCurrentSet = 0;
    currentSetIndex = Math.min(currentSetIndex + 1, SETS.length - 1);
  }

  renderHUD();
  saveProgress();
}

function onWrong() {
  feedbackEl.textContent = "❌ Try again";
  score = Math.max(0, score - 10);
  renderHUD();
  saveProgress();
}

if (dropSlot) {
  dropSlot.addEventListener("dragover", (e) => { e.preventDefault(); });
  dropSlot.addEventListener("drop", (e) => {
    e.preventDefault();
    const key = e.dataTransfer.getData("text/plain");
    dropToSlot(key);
  });

  dropSlot.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && document.activeElement?.classList.contains("choice")) {
      const key = document.activeElement.dataset.key;
      dropToSlot(key);
    }
  });
}

function dropToSlot(key) {
  if (answered || !dropSlot) return;
  const isCorrect = key === currentWord;
  dropSlot.classList.toggle("ok", isCorrect);
  dropSlot.classList.toggle("nope", !isCorrect);
  dropSlot.textContent = isCorrect ? (WORDS.find(w => w.key === key)?.label || key) : "____";

  if (isCorrect) onCorrect();
  else onWrong();
}

// --- Events & init --------------------------------------------------
if (toggleText) toggleText.addEventListener("change", newRound);

if (toggleAdvanced) {
  toggleAdvanced.addEventListener("change", () => {
    const adv = !!toggleAdvanced.checked;
    if (sentenceStrip) sentenceStrip.hidden = !adv;
  });
}

if (sayBtn)      sayBtn.addEventListener("click", () => { if (currentWord) speakWord(currentWord); });
if (playWordBtn) playWordBtn.addEventListener("click", () => { if (currentWord) speakWord(currentWord); });
if (nextBtn)     nextBtn.addEventListener("click", newRound);

function init() {
  loadProgress();
  renderHUD();

  // Show/hide sentence strip based on toggle (or keep hidden if toggle not present)
  if (sentenceStrip) sentenceStrip.hidden = !(toggleAdvanced && toggleAdvanced.checked);

  newRound();
}

document.addEventListener("DOMContentLoaded", init);
