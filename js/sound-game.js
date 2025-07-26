const sounds = ['red', 'blue', 'green', 'yellow'];
let sequence = [];
let userSequence = [];
let playing = false;

function playSound(color) {
  const audio = new Audio(`audio/${color}.mp3`);
  audio.play();
}

function flashButton(color) {
  const button = document.getElementById(color);
  button.style.opacity = 0.5;
  setTimeout(() => (button.style.opacity = 1), 300);
}

function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    const color = sequence[i];
    playSound(color);
    flashButton(color);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      playing = false;
      document.getElementById("status").textContent = "Your turn!";
    }
  }, 600);
}

function nextRound() {
  const randomColor = sounds[Math.floor(Math.random() * sounds.length)];
  sequence.push(randomColor);
  userSequence = [];
  playing = true;
  document.getElementById("status").textContent = "Watch the sequence...";
  setTimeout(playSequence, 500);
}

function startGame() {
  sequence = [];
  userSequence = [];
  nextRound();
}

function handleUserInput(color) {
  if (playing) return;

  playSound(color);
  flashButton(color);
  userSequence.push(color);

  const currentIndex = userSequence.length - 1;
  if (userSequence[currentIndex] !== sequence[currentIndex]) {
    document.getElementById("status").textContent = "❌ Incorrect! Try again.";
    sequence = [];
    userSequence = [];
    return;
  }

  if (userSequence.length === sequence.length) {
    document.getElementById("status").textContent = "✅ Correct! Next round...";
    addReward("Sound Memory Game");
    setTimeout(nextRound, 1000);
  }
}

function addReward(gameName) {
  const rewards = JSON.parse(localStorage.getItem("gameRewards") || "{}");
  rewards[gameName] = (rewards[gameName] || 0) + 1;
  localStorage.setItem("gameRewards", JSON.stringify(rewards));
}
