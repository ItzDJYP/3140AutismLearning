const colors = [
  { name: "Red", code: "#ff0000" },
  { name: "Blue", code: "#0000ff" },
  { name: "Green", code: "#00ff00" },
  { name: "Yellow", code: "#ffff00" },
];

let correctColor;

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  correctColor = colors[random];
  document.getElementById("color-box").style.backgroundColor = correctColor.code;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  colors.sort(() => Math.random() - 0.5); // shuffle

  colors.forEach(color => {
    const btn = document.createElement("button");
    btn.textContent = color.name;
    btn.onclick = () => checkAnswer(color.name);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const feedback = document.getElementById("feedback");
  if (selected === correctColor.name) {
    feedback.textContent = "🎉 Correct! You win a star!";
    addReward("Color Matching Game");
    setTimeout(pickColor, 1500);
  } else {
    feedback.textContent = "❌ Try again!";
  }
}

function addReward(gameName) {
  const rewards = JSON.parse(localStorage.getItem("gameRewards") || "{}");
  rewards[gameName] = (rewards[gameName] || 0) + 1;
  localStorage.setItem("gameRewards", JSON.stringify(rewards));
}

window.onload = pickColor;
