// Sequencer screen logic
import { renderDialogue } from "./dialogue.js";
import { speak } from "./tts.js";

export function renderSequencer(theme, themeIdx) {
  const main = document.getElementById("main-content");
  // Shuffle panels
  const shuffledPanels = theme.panels.slice().sort(() => Math.random() - 0.5);
  main.innerHTML = `<div class="sequencer" aria-label="Arrange the story panels in order">
    <div class="panels" role="list">${shuffledPanels
      .map(
        (panel, i) => `
      <div class="panel" draggable="true" tabindex="0" aria-grabbed="false" aria-label="${panel.text}" data-index="${i}">
        <img src="${panel.image}" alt="${panel.text}" />
        <div>${panel.text}</div>
      </div>`
      )
      .join("")}</div>
    <div class="slots">${shuffledPanels
      .map(
        (_, i) =>
          `<div class="slot" aria-label="Slot ${i + 1}" data-slot="${i}">${
            i + 1
          }</div>`
      )
      .join("")}</div>
    <button id="check-sequence">Check Sequence</button>
  </div>`;

  // Drag and drop logic
  let draggedPanel = null;
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.addEventListener("dragstart", (e) => {
      draggedPanel = panel;
      panel.setAttribute("aria-grabbed", "true");
    });
    panel.addEventListener("dragend", (e) => {
      panel.setAttribute("aria-grabbed", "false");
    });
  });
  document.querySelectorAll(".slot").forEach((slot) => {
    slot.addEventListener("dragover", (e) => e.preventDefault());
    slot.addEventListener("drop", (e) => {
      if (draggedPanel) {
        slot.innerHTML = "";
        slot.appendChild(draggedPanel);
        draggedPanel = null;
      }
    });
  });

  // Sequence check
  document.getElementById("check-sequence").addEventListener("click", () => {
    // Get order
    const order = Array.from(document.querySelectorAll(".slot")).map((slot) => {
      const panel = slot.querySelector(".panel");
      return panel ? panel.querySelector("div").textContent : null;
    });
    // Validate
    const correct = order.every((text, i) => text === theme.panels[i].text);
    // Disable drag
    document
      .querySelectorAll(".panel")
      .forEach((panel) => panel.setAttribute("draggable", "false"));
    document
      .querySelectorAll(".slot")
      .forEach((slot) => slot.setAttribute("aria-disabled", "true"));
    renderDialogue(theme, themeIdx, order, correct);
    if (window.getVoiceOn && getVoiceOn()) order.forEach((text) => speak(text));
  });

  // TTS on panel load
  if (window.getVoiceOn && getVoiceOn())
    shuffledPanels.forEach((panel) => speak(panel.text));
}
