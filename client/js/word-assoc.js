// --- Data -----------------------------------------------------------
// Base nouns (your original set)
const WORDS = [
  { key: "juice", label: "juice", img: "images/juice.png", tts: "juice" },
  { key: "apple", label: "apple", img: "images/apple.png", tts: "apple" },
  { key: "ball", label: "ball", img: "images/ball.png", tts: "ball" },
  { key: "dog", label: "dog", img: "images/dog.png", tts: "dog" },
  { key: "car", label: "car", img: "images/car.png", tts: "car" },
  { key: "book", label: "book", img: "images/book.png", tts: "book" },
];

// Social/SEL actions & phrases (use photos/pictos of kids doing these)
const SOCIAL_WORDS = [
  {
    key: "my_turn",
    label: "my turn",
    img: "images/social/my_turn.png",
    tts: "my turn",
  },
  {
    key: "your_turn",
    label: "your turn",
    img: "images/social/your_turn.png",
    tts: "your turn",
  },
  { key: "wait", label: "wait", img: "images/social/wait.png", tts: "wait" },
  {
    key: "share",
    label: "share",
    img: "images/social/share.png",
    tts: "share",
  },
  { key: "help", label: "help", img: "images/social/help.png", tts: "help" },
  { key: "stop", label: "stop", img: "images/social/stop.png", tts: "stop" },
  {
    key: "together",
    label: "together",
    img: "images/social/together.png",
    tts: "together",
  },
  {
    key: "trade",
    label: "trade",
    img: "images/social/trade.png",
    tts: "trade",
  },
  { key: "plan", label: "plan", img: "images/social/plan.png", tts: "plan" },
  {
    key: "try_again",
    label: "try again",
    img: "images/social/try_again.png",
    tts: "try again",
  },
];

// Sets for unlocking/themes (base)
const SETS = [
  { name: "Set 1", items: ["juice", "apple", "ball"] },
  { name: "Set 2", items: ["dog", "car", "book"] },
];

// Social/SEL sets
const SOCIAL_SETS = [
  { name: "Turn Taking", items: ["my_turn", "your_turn", "wait", "share"] },
  { name: "Cooperate", items: ["help", "together", "trade", "plan"] },
  { name: "Solve It", items: ["stop", "plan", "try_again", "help"] },
];

const THEMES = [
  { key: "farm", label: "Farm", unlockAfterSet: 1 },
  { key: "space", label: "Space", unlockAfterSet: 2 },
];

// --- DOM ------------------------------------------------------------
const toggleText = document.getElementById("toggleText");
const toggleFewer = document.getElementById("toggleFewer");
const toggleAdvanced = document.getElementById("toggleAdvanced");
const toggleSocial = document.getElementById("toggleSocial");

const sayBtn = document.getElementById("sayBtn");
const playWordBtn = document.getElementById("playWordBtn");
const nextBtn = document.getElementById("nextBtn");

const scoreEl = document.getElementById("score");
const setProgressEl = document.getElementById("setProgress");
const unlocksEl = document.getElementById("unlocks");
const feedbackEl = document.getElementById("feedback");
const choicesEl = document.getElementById("choices");
const themeBadge = document.getElementById("themeBadge");
const sentenceStrip = document.getElementById("sentenceStrip");
const dropSlot = document.getElementById("dropSlot");
const currentWordLabel = document.getElementById("currentWordLabel");
const stripFirst = document.getElementById("stripFirst");
const stripSecond = document.getElementById("stripSecond");

// --- State ----------------------------------------------------------
let score = 0;
let completedInCurrentSet = 0;
let currentSetIndex = 0;
let currentWord = null; // word key
let unlockedThemes = []; // strings
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
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Active data sources
function dataset() {
  return toggleSocial.checked ? SOCIAL_WORDS : WORDS;
}
function setList() {
  return toggleSocial.checked ? SOCIAL_SETS : SETS;
}
function currentSet() {
  return setList()[Math.min(currentSetIndex, setList().length - 1)];
}
function findInDataset(key) {
  return dataset().find((w) => w.key === key);
}

function loadProgress() {
  try {
    const raw = localStorage.getItem("wordAssocProgress");
    if (!raw) return;
    const p = JSON.parse(raw);
    score = p.score || 0;
    currentSetIndex = p.currentSetIndex || 0;
    completedInCurrentSet = p.completedInCurrentSet || 0;
    unlockedThemes = Array.isArray(p.unlockedThemes) ? p.unlockedThemes : [];
  } catch {}
}

function saveProgress() {
  const p = { score, currentSetIndex, completedInCurrentSet, unlockedThemes };
  localStorage.setItem("wordAssocProgress", JSON.stringify(p));

  // Star rating stays tied to total sets completed (in the active mode)
  const totalSets = setList().length;
  const setsCompleted = Math.min(
    currentSetIndex +
      (completedInCurrentSet >= currentSet().items.length ? 1 : 0),
    totalSets
  );
  const stars =
    setsCompleted >= 2
      ? 3
      : setsCompleted >= 1
      ? 2
      : completedInCurrentSet > 0
      ? 1
      : 0;
  const rewards = JSON.parse(localStorage.getItem("gameRewards") || "{}");
  rewards["Word & Picture Association"] = Math.max(
    stars,
    rewards["Word & Picture Association"] || 0
  );
  localStorage.setItem("gameRewards", JSON.stringify(rewards));
}

// Speech
function speakWord(word) {
  const item = findInDataset(word);
  const text = item?.tts || item?.label || word;
  if ("speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    u.pitch = 1.0;
    speechSynthesis.cancel(); // stop any previous utterance before speaking the new one
    speechSynthesis.speak(u);
  } else {
    feedbackEl.textContent = `Say: "${text}"`;
  }
  currentWordLabel.textContent = text;
}

// HUD
function renderHUD() {
  scoreEl.textContent = score;
  const totalSets = setList().length;
  setProgressEl.textContent = `${Math.min(
    currentSetIndex + 1,
    totalSets
  )}/${totalSets}`;
  unlocksEl.textContent = unlockedThemes.join(", ");
  const theme = unlockedThemes[unlockedThemes.length - 1];
  if (theme && !toggleSocial.checked) {
    // keep themes for base mode
    themeBadge.hidden = false;
    const t = THEMES.find((x) => x.key === theme);
    themeBadge.textContent = t?.label || theme;
  } else {
    themeBadge.hidden = true;
  }
}

// Sentence strip labels
function updateStripLabels() {
  if (!toggleAdvanced.checked) return;
  if (toggleSocial.checked) {
    stripFirst.textContent = "Let's";
    stripSecond.textContent = "_____"; // visually encourage the verb/action in slot
  } else {
    stripFirst.textContent = "I";
    stripSecond.textContent = "want";
  }
}

// --- Rounds ---------------------------------------------------------
function newRound() {
  answered = false;
  choicesEl.innerHTML = "";
  dropSlot.classList.remove("ok", "nope");
  dropSlot.textContent = "____";

  const set = currentSet();
  currentWord = rand(set.items);

  // Build choices
  const fewer = toggleFewer.checked;
  const pool = shuffle(dataset());
  const correct = pool.find((w) => w.key === currentWord);
  const distractors = pool.filter((w) => w.key !== currentWord);

  const options = fewer
    ? shuffle([correct, ...distractors.slice(0, 1)])
    : shuffle([correct, ...distractors.slice(0, 3)]);

  options.forEach((opt) => {
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

    if (!toggleText.checked) card.classList.add("hide-label");

    // Click/keyboard
    card.addEventListener("click", () => tryAnswer(opt.key, card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tryAnswer(opt.key, card);
      }
    });

    // Drag events
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", opt.key);
    });

    choicesEl.appendChild(card);
  });

  // Speak the target word
  speakWord(currentWord);
  updateStripLabels();
}

function tryAnswer(choiceKey) {
  if (answered) return;

  const isAdvanced = toggleAdvanced.checked;

  if (!isAdvanced) {
    // Basic: clicking the correct picture
    const isCorrect = choiceKey === currentWord;

    // Mark all
    [...choicesEl.children].forEach((c) => {
      const right = c.dataset.key === currentWord;
      c.classList.toggle("correct", right);
      c.classList.toggle("wrong", !right);
    });

    if (isCorrect) onCorrect();
    else onWrong();
  } else {
    // Advanced: treat click as a drop into the slot
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
    currentSetIndex = Math.min(currentSetIndex + 1, setList().length - 1);

    // Unlock themes only in base (non-social) mode
    if (!toggleSocial.checked) {
      const doneSets = currentSetIndex;
      THEMES.forEach((t) => {
        if (doneSets >= t.unlockAfterSet && !unlockedThemes.includes(t.key)) {
          unlockedThemes.push(t.key);
          feedbackEl.textContent = `🎁 Unlocked ${t.label}!`;
        }
      });
    }
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

// --- Advanced mode: sentence strip ---------------------------------
dropSlot.addEventListener("dragover", (e) => {
  e.preventDefault();
});
dropSlot.addEventListener("drop", (e) => {
  e.preventDefault();
  const key = e.dataTransfer.getData("text/plain");
  dropToSlot(key);
});

dropSlot.addEventListener("keydown", (e) => {
  if (
    (e.key === "Enter" || e.key === " ") &&
    document.activeElement?.classList.contains("choice")
  ) {
    const key = document.activeElement.dataset.key;
    dropToSlot(key);
  }
});

function dropToSlot(key) {
  if (answered) return;
  const isCorrect = key === currentWord;
  dropSlot.classList.toggle("ok", isCorrect);
  dropSlot.classList.toggle("nope", !isCorrect);
  dropSlot.textContent = isCorrect ? findInDataset(key)?.label || key : "____";

  if (isCorrect) onCorrect();
  else onWrong();
}

// --- Events & init --------------------------------------------------
toggleText.addEventListener("change", () => newRound());
toggleFewer.addEventListener("change", () => newRound());
toggleAdvanced.addEventListener("change", () => {
  const adv = toggleAdvanced.checked;
  sentenceStrip.hidden = !adv;
  updateStripLabels();
});
toggleSocial.addEventListener("change", () => {
  // Reset progress when switching modes so sets start fresh
  currentSetIndex = 0;
  completedInCurrentSet = 0;
  renderHUD();
  newRound();
});

sayBtn.addEventListener("click", () => {
  if (currentWord) speakWord(currentWord);
});
playWordBtn.addEventListener("click", () => {
  if (currentWord) speakWord(currentWord);
});
nextBtn.addEventListener("click", () => newRound());

function init() {
  loadProgress();
  renderHUD();

  // Show/hide strip based on toggle
  sentenceStrip.hidden = !toggleAdvanced.checked;

  // Ensure image fallbacks exist; if not, you can point to a generic icon
  // [...dataset()].forEach(w => { if (!w.img) w.img = "images/placeholder.png"; });

  newRound();
}

document.addEventListener("DOMContentLoaded", init);
// --- End of file -----------------------------------------------------
