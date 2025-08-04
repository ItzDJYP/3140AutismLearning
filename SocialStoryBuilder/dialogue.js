// Dialogue screen logic
import { renderFeedback } from "./feedback.js";
import { speak } from "./tts.js";

export function renderDialogue(theme, themeIdx, order, sequenceCorrect) {
  const main = document.getElementById("main-content");
  main.innerHTML = `<div class="dialogue" aria-label="Choose the best response">
    <h2>What should you say?</h2>
    <div class="dialogue-options">${theme.dialogue
      .map(
        (opt, i) => `
      <div class="dialogue-option" tabindex="0" data-correct="${
        opt.correct
      }" aria-label="${opt.text}">
        ${opt.image ? `<img src="${opt.image}" alt="${opt.text}" />` : ""}
        <div>${opt.text}</div>
      </div>`
      )
      .join("")}</div>
  </div>`;
  document.querySelectorAll(".dialogue-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      const correct = opt.getAttribute("data-correct") === "true";
      renderFeedback(
        correct,
        theme,
        themeIdx,
        order,
        sequenceCorrect,
        opt.text
      );
      if (window.getVoiceOn && getVoiceOn()) speak(opt.text);
    });
    opt.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        opt.click();
      }
    });
  });
  // TTS on load
  if (window.getVoiceOn && getVoiceOn())
    theme.dialogue.forEach((opt) => speak(opt.text));
}
