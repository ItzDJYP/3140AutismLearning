/* Pattern Path - Modern
   - Patterns: ABAB, ABBA, ABC, skip-count (2/3/5)
   - Stars + skin unlocks every 5 stars
   - TTS support, reduced choice mode, big UI
   - Progress saved in localStorage
*/

const patternRow = document.getElementById("patternRow");
const tilesEl = document.getElementById("tiles");
const avatarEl = document.getElementById("avatar");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const starsEl = document.getElementById("stars");
const skinNameEl = document.getElementById("skinName");

const speakToggle = document.getElementById("speakToggle");
const reducedChoicesToggle = document.getElementById("reducedChoicesToggle");
const bigUiToggle = document.getElementById("bigUiToggle");
const speakBtn = document.getElementById("speakBtn");
const nextBtn = document.getElementById("nextBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const closeSettings = document.getElementById("closeSettings");
const skinPicker = document.getElementById("skinPicker");
const patternTypeEl = document.getElementById("patternType");

const SYMBOLS = ["🍎","🍌","🐶","🐱","🚗","🚲","✈️","⭐","🟣","🟥","🟦","🌸","🌙","🦊","🐢"];
const SKINS = [
  { id: "default", label: "Default", display: "🙂" },
  { id: "cat",     label: "Cat",     display: "🐱" },
  { id: "rocket",  label: "Rocket",  display: "🚀" },
  { id: "unicorn", label: "Unicorn", display: "🦄" },
  { id: "robot",   label: "Robot",   display: "🤖" },
];

let state = {
  stars: 0,
  unlockedSkins: ["default"],
  equippedSkin: "default",
  pathIndex: 0,           // avatar tile index (0..7)
  current: null,          // { type, baseSeq, answer }
};

function loadProgress() {
  try {
    const raw = localStorage.getItem("patternPathProgress");
    if (!raw) return;
    const p = JSON.parse(raw);
    state.stars = p.stars ?? 0;
    state.unlockedSkins = Array.isArray(p.unlockedSkins) ? p.unlockedSkins : ["default"];
    state.equippedSkin = p.equippedSkin || "default";
  } catch {}
}

function saveProgress() {
  localStorage.setItem("patternPathProgress", JSON.stringify({
    stars: state.stars,
    unlockedSkins: state.unlockedSkins,
    equippedSkin: state.equippedSkin,
  }));

  // Integrate with your progress page
  const starsForRewards = state.stars;
  let rating = 0;
  if (starsForRewards >= 15) rating = 3;
  else if (starsForRewards >= 10) rating = 2;
  else if (starsForRewards >= 5) rating = 1;
  const rewards = JSON.parse(localStorage.getItem("gameRewards") || "{}");
  rewards["Pattern Path"] = Math.max(rating, rewards["Pattern Path"] || 0);
  localStorage.setItem("gameRewards", JSON.stringify(rewards));
}

function speak(text) {
  if (!speakToggle.checked) return;
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function rng(n){ return Math.floor(Math.random()*n); }
function choice(arr){ return arr[rng(arr.length)]; }
function shuffle(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){const j=rng(i+1); [a[i],a[j]]=[a[j],a[i]];} return a;}

function buildTrack() {
  tilesEl.innerHTML = "";
  for (let i=0;i<8;i++){
    const t = document.createElement("div");
    t.className = "tile";
    tilesEl.appendChild(t);
  }
  placeAvatar(0);
}
function placeAvatar(index){
  state.pathIndex = index;
  avatarEl.style.setProperty("--x", index);
  avatarEl.textContent = SKINS.find(s => s.id === state.equippedSkin)?.display || "🙂";
}

function nextPattern() {
  feedbackEl.textContent = "";
  patternRow.innerHTML = "";
  choicesEl.innerHTML = "";

  const variants = [
    makeABAB(),
    makeABBA(),
    makeABC(),
    makeSkip(2),
    makeSkip(3),
    makeSkip(5),
  ];
  const current = choice(variants);
  state.current = current;

  // Render row with missing symbol at end
  patternTypeEl.textContent = current.label;
  const seq = [...current.base, "❓"];
  seq.forEach((item, idx) => {
    const el = document.createElement("div");
    el.className = "seq-item" + (idx === seq.length-1 ? " missing" : "");
    el.textContent = item;
    patternRow.appendChild(el);
  });

  // Speak
  speak(current.tts + " ... what comes next?");

  // Build choices
  const correct = current.answer;
  const opts = new Set([correct]);
  while (opts.size < (reducedChoicesToggle.checked ? 2 : 4)) {
    let alt = current.isNumeric
      ? String(Number(correct) + choice([-4,-2,-1,1,2,4]))
      : choice(SYMBOLS);
    opts.add(alt);
  }
  const options = shuffle([...opts]);

  options.forEach(val => {
    const btn = document.createElement("div");
    btn.className = "choice" + (bigUiToggle.checked ? " big" : "");
    btn.textContent = val;
    btn.addEventListener("click", () => onPick(val, btn));
    choicesEl.appendChild(btn);
  });
}

function onPick(val, btn){
  const correct = state.current.answer;
  if (String(val) === String(correct)) {
    btn.classList.add("correct");
    feedbackEl.textContent = "✅ Correct!";
    earnStar(1);
    advancePath();
  } else {
    btn.classList.add("wrong");
    feedbackEl.textContent = "❌ Try again!";
  }
}

function earnStar(n=1){
  state.stars += n;
  starsEl.textContent = state.stars;
  if (state.stars % 5 === 0) {
    // unlock a new skin
    const locked = SKINS.map(s=>s.id).filter(id => !state.unlockedSkins.includes(id));
    const toUnlock = locked.find(id => id !== "default");
    if (toUnlock) {
      state.unlockedSkins.push(toUnlock);
      feedbackEl.textContent += ` 🎁 Unlocked skin: ${SKINS.find(s=>s.id===toUnlock).label}!`;
      renderSkins();
    }
  }
  saveProgress();
}

function advancePath(){
  const next = Math.min(state.pathIndex + 1, 7);
  placeAvatar(next);
  // When reaching the end, soft reset track and go next pattern
  if (next === 7) {
    setTimeout(() => {
      placeAvatar(0);
      nextPattern();
    }, 650);
  } else {
    setTimeout(nextPattern, 450);
  }
}

function makeABAB(){
  const A = choice(SYMBOLS), B = choice(SYMBOLS.filter(x=>x!==A));
  const base = [A,B,A,B];
  return {
    label:"ABAB",
    base, answer:A, isNumeric:false,
    tts:`${A}, ${B}, ${A}, ${B}`,
  };
}
function makeABBA(){
  const A = choice(SYMBOLS), B = choice(SYMBOLS.filter(x=>x!==A));
  const base = [A,B,B,A];
  return {
    label:"ABBA",
    base, answer:A, isNumeric:false,
    tts:`${A}, ${B}, ${B}, ${A}`,
  };
}
function makeABC(){
  const A = choice(SYMBOLS),
        B = choice(SYMBOLS.filter(x=>x!==A)),
        C = choice(SYMBOLS.filter(x=>x!==A && x!==B));
  const base = [A,B,C];
  // Next is A again (cycle)
  return {
    label:"ABC",
    base, answer:A, isNumeric:false,
    tts:`${A}, ${B}, ${C}`,
  };
}
function makeSkip(step){
  const start = choice([1,2,3,4,5]);
  const baseNums = [start, start+step, start+2*step, start+3*step];
  return {
    label:`Skip-count by ${step}`,
    base: baseNums.map(String), answer: String(start + 4*step),
    isNumeric:true, tts: baseNums.join(", "),
  };
}

/* Settings / skins */
function renderSkins(){
  skinPicker.innerHTML = "";
  state.unlockedSkins.forEach(id => {
    const skin = SKINS.find(s => s.id === id);
    const btn = document.createElement("button");
    btn.className = "skin-btn" + (id === state.equippedSkin ? " active" : "");
    btn.textContent = `${skin.display} ${skin.label}`;
    btn.addEventListener("click", () => {
      state.equippedSkin = id;
      skinNameEl.textContent = skin.label;
      placeAvatar(state.pathIndex);
      renderSkins();
      saveProgress();
    });
    skinPicker.appendChild(btn);
  });
}

/* Settings panel toggling */
settingsBtn.addEventListener("click", () => {
  const open = settingsPanel.hasAttribute("hidden") ? false : true;
  if (open) {
    settingsPanel.setAttribute("hidden", "");
    settingsBtn.setAttribute("aria-expanded", "false");
  } else {
    settingsPanel.removeAttribute("hidden");
    settingsBtn.setAttribute("aria-expanded", "true");
  }
});
closeSettings.addEventListener("click", () => {
  settingsPanel.setAttribute("hidden", "");
  settingsBtn.setAttribute("aria-expanded", "false");
});

/* Speak / Next buttons */
speakBtn.addEventListener("click", () => {
  if (!state.current) return;
  speak(state.current.tts + " ... what comes next?");
});
nextBtn.addEventListener("click", nextPattern);

/* Big UI toggle affects choice size */
bigUiToggle.addEventListener("change", () => {
  [...choicesEl.children].forEach(c => {
    c.classList.toggle("big", bigUiToggle.checked);
  });
});

/* Init */
(function init(){
  loadProgress();
  starsEl.textContent = state.stars;
  skinNameEl.textContent = SKINS.find(s=>s.id===state.equippedSkin)?.label || "Default";
  buildTrack();
  renderSkins();
  nextPattern();
})();
