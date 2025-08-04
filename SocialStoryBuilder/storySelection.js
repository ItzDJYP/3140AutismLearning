// Story selection screen logic
import { renderSequencer } from "./sequencer.js";
import {
  loadStories,
  saveStory,
  getMode,
  setMode,
  getVoiceOn,
  setVoiceOn,
} from "./myBook.js";
import { speak } from "./tts.js";

const themes = [
  {
    title: "At the Playground",
    image: "playground.jpg",
    panels: [
      { text: "Say hello to friends", image: "hello.png" },
      { text: "Play together", image: "play.png" },
      { text: "Say goodbye", image: "goodbye.png" },
    ],
    dialogue: [
      { text: "Can I play with you?", correct: true },
      { text: "Give me that!", correct: false },
    ],
  },
  {
    title: "Joining a Game",
    image: "game.jpg",
    panels: [
      { text: "Watch the game", image: "watch.png" },
      { text: "Ask to join", image: "ask.png" },
      { text: "Wait for a turn", image: "wait.png" },
    ],
    dialogue: [
      { text: "Can I join?", correct: true },
      { text: "I want to play now!", correct: false },
    ],
  },
];

function renderStorySelection() {
  const main = document.getElementById("main-content");
  main.innerHTML = `<div class="grid" role="list">${themes
    .map(
      (theme, i) => `
    <div class="card" tabindex="0" role="listitem" aria-label="${theme.title}" data-index="${i}">
      <img src="${theme.image}" alt="${theme.title}">
      <div>${theme.title}</div>
    </div>`
    )
    .join("")}</div>`;
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const idx = card.getAttribute("data-index");
      renderSequencer(themes[idx], idx);
      if (getVoiceOn()) speak(themes[idx].title);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        card.click();
      }
    });
  });
}

// Mode toggle
const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", () => {
  setMode(getMode() === "child" ? "parent" : "child");
});

// Voice toggle
const voiceToggle = document.getElementById("voice-toggle");
voiceToggle.addEventListener("click", () => {
  setVoiceOn(!getVoiceOn());
  voiceToggle.textContent = getVoiceOn() ? "🔊 Voice On" : "🔇 Voice Off";
});

renderStorySelection();
