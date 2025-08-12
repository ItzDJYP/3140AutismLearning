// Emotion data with image URLs instead of emojis
const EMOTIONS = [
  { key: "happy",    label: "Happy",    img: "images/emotionmatch/happy.jpg" },
  { key: "sad",      label: "Sad",      img: "images/emotionmatch/sad.jpeg" },
  { key: "angry",    label: "Angry",    img: "images/emotionmatch/angry.webp" },
  { key: "surprised",label: "Surprised",img: "images/emotionmatch/surprised.avif" },
  { key: "scared",   label: "Scared",   img: "images/emotionmatch/scared.jpg" },
  { key: "tired",    label: "Tired",    img: "images/emotionmatch/tired.jpg" },
];

const SCENES = [
  { key: "none",     label: null,            hint: "" },
  { key: "birthday", label: "🎉 Birthday",   hint: "It’s your party and friends are cheering." },
  { key: "playground",label:"🏞️ Playground",hint: "A friend fell and scraped their knee." },
  { key: "losttoy",  label: "🧸 Lost Toy",   hint: "You can’t find your favorite toy." },
];

const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");
const unlocksEl = document.getElementById("unlocks");
const faceEl = document.getElementById("face");
const sceneTagEl = document.getElementById("sceneTag");
const hintEl = document.getElementById("hint");
const choicesEl = document.getElementById("choices");
const dropzone = document.getElementById("dropzone");
const feedbackEl = document.getElementById("feedback");
const toggleText = document.getElementById("toggleText");
const toggleFewer = document.getElementById("toggleFewer");
const nextRoundBtn = document.getElementById("nextRoundBtn");

let score = 0;
let streak = 0;
let current = null; // {emotionKey, sceneKey}
let answered = false;
let firstTry = true;

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

function loadProgress() {
  try {
    const raw = localStorage.getItem("emotionMatchProgress");
    if (!raw) return;
    const data = JSON.parse(raw);
    score = data.score || 0;
    streak = data.streak || 0;
    // Removed unlocked sticker packs
  } catch {}
}

function saveProgress() {
  const data = { score, streak };
  localStorage.setItem("emotionMatchProgress", JSON.stringify(data));

  // Award 1 star for each win (correct answer)
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  let starHistory = JSON.parse(localStorage.getItem("starHistory") || "{}");
  starHistory[today] = (starHistory[today] || 0) + 1;
  localStorage.setItem("starHistory", JSON.stringify(starHistory));

  // Update gameRewards for chart
  const rewards = JSON.parse(localStorage.getItem("gameRewards") || "{}");
  rewards["Emotion Match-Up"] = (rewards["Emotion Match-Up"] || 0) + 1;
  localStorage.setItem("gameRewards", JSON.stringify(rewards));
}

function renderHUD() {
  scoreEl.textContent = score;
  streakEl.textContent = streak;
  unlocksEl.textContent = "";
}

function pickRound() {
  // Leveling idea: if streak >= 3, include context scenes; otherwise none
  const scene = streak >= 2 ? rand(SCENES.filter(s => s.key !== "none")) : SCENES[0];
  const emo = rand(EMOTIONS);
  current = { emotionKey: emo.key, sceneKey: scene.key };

  faceEl.innerHTML = `<img src="${emo.img}" alt="${emo.label}" style="width:80px;height:80px;">`;
  if (scene.label) {
    sceneTagEl.hidden = false;
    sceneTagEl.textContent = scene.label;
    hintEl.hidden = false;
    hintEl.textContent = scene.hint;
  } else {
    sceneTagEl.hidden = true;
    hintEl.hidden = true;
    hintEl.textContent = "";
  }

  buildChoices(emo.key);
  answered = false;
  firstTry = true;
  feedbackEl.textContent = "";
  dropzone.classList.remove("ok", "nope");
  dropzone.textContent = "Drop here";
}

function buildChoices(correctKey) {
  const fewer = toggleFewer.checked;
  const pool = EMOTIONS.slice();
  const correct = pool.find(e => e.key === correctKey);
  const others = shuffle(pool.filter(e => e.key !== correctKey));

  const options = fewer ? shuffle([correct, ...others.slice(0,1)]) // 2 choices
                        : shuffle([correct, ...others.slice(0,3)]); // 4 choices

  choicesEl.innerHTML = "";
  options.forEach(opt => {
    const item = document.createElement("div");
    item.className = "choice";
    item.draggable = true;
    item.role = "option";
    item.tabIndex = 0;
    item.dataset.key = opt.key;

    // Only show the label (word), no emoji or image
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = opt.label;
    item.appendChild(label);

    // Drag events
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", opt.key);
    });

    // Click / keyboard support
    item.addEventListener("click", () => tryAnswer(opt.key, item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tryAnswer(opt.key, item);
      }
    });

    choicesEl.appendChild(item);
  });
}

// Dropzone handlers
dropzone.addEventListener("dragover", (e) => { e.preventDefault(); });
dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  const key = e.dataTransfer.getData("text/plain");
  const item = [...choicesEl.children].find(c => c.dataset.key === key);
  tryAnswer(key, item);
});

// Keyboard “drop”: press Enter on dropzone to submit focused choice
dropzone.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && document.activeElement?.classList.contains("choice")) {
    const key = document.activeElement.dataset.key;
    tryAnswer(key, document.activeElement);
  }
});

function tryAnswer(choiceKey, choiceEl) {
  if (answered) return;
  const isCorrect = choiceKey === current.emotionKey;

  // Visual state
  [...choicesEl.children].forEach(c => {
    const right = c.dataset.key === current.emotionKey;
    c.classList.toggle("correct", right);
    c.classList.toggle("wrong", !right);
  });

  dropzone.classList.toggle("ok", isCorrect);
  dropzone.classList.toggle("nope", !isCorrect);
  dropzone.textContent = isCorrect ? "Great!" : "Try again";

  if (isCorrect) {
    answered = true;
    const gained = firstTry ? 100 : 50; // points for first try vs retry
    score += gained;
    streak += 1;
    feedbackEl.textContent = firstTry ? "✅ First try! +100" : "✅ Correct! +50";
    // Removed sticker pack unlocks
    renderHUD();
    saveProgress();
  } else {
    firstTry = false;
    streak = 0; // reset streak on wrong answer
    renderHUD();
    saveProgress();
  }
}

// Removed sticker pack unlock functions

toggleText.addEventListener("change", () => {
  // Removed text label toggle
});

toggleFewer.addEventListener("change", () => {
  if (current) buildChoices(current.emotionKey);
});

nextRoundBtn.addEventListener("click", () => pickRound());

function init() {
  loadProgress();
  renderHUD();
  pickRound();
}

document.addEventListener("DOMContentLoaded", init);
