// My Book shelf and story storage
import { exportStories } from "./export.js";

let stories = JSON.parse(localStorage.getItem("stories") || "[]");
let mode = localStorage.getItem("mode") || "child";
let voiceOn = localStorage.getItem("voiceOn") !== "false";

export function saveStory(story) {
  stories.push(story);
  localStorage.setItem("stories", JSON.stringify(stories));
}
export function loadStories() {
  return stories;
}
export function renderMyBook() {
  const book = document.getElementById("my-book");
  if (!book) return;
  const all = loadStories();
  book.innerHTML = `<h2>My Book</h2>
    <div class="book-grid">${all
      .map(
        (story) => `
      <div class="book-card">
        <img src="${story.theme.toLowerCase().replace(/ /g, "-")}.jpg" alt="${
          story.theme
        }">
        <div><strong>Theme:</strong> ${story.theme}</div>
        <div><strong>Date:</strong> ${new Date(
          story.timestamp
        ).toLocaleString()}</div>
        <div><strong>Order:</strong> ${story.order.join(" → ")}</div>
        <div class="accuracy ${story.correct ? "" : "incorrect"}">${
          story.correct ? "Accurate" : "Needs Practice"
        }</div>
      </div>`
      )
      .join("")}</div>
    <button id="export-pdf">Export to PDF</button>
    <button id="export-csv">Download CSV</button>`;
  document.getElementById("export-pdf").onclick = () =>
    exportStories("pdf", all);
  document.getElementById("export-csv").onclick = () =>
    exportStories("csv", all);
}
export function getMode() {
  return mode;
}
export function setMode(m) {
  mode = m;
  localStorage.setItem("mode", m);
  document
    .getElementById("parent-panel")
    .classList.toggle("hidden", m !== "parent");
}
export function getVoiceOn() {
  return voiceOn;
}
export function setVoiceOn(v) {
  voiceOn = v;
  localStorage.setItem("voiceOn", v);
}
