// Feedback overlay logic
import { saveStory } from "./myBook.js";

export function renderFeedback(
  correct,
  theme,
  themeIdx,
  order,
  sequenceCorrect,
  dialogueText
) {
  const main = document.getElementById("main-content");
  const overlay = document.createElement("div");
  overlay.className = "feedback";
  overlay.innerHTML = `
    <div class="icon">${correct ? "✅" : "🤔"}</div>
    <div>${correct ? "Great job!" : "Let’s try asking nicely next time."}</div>
    <button id="save-story">Save Story to My Book</button>
  `;
  document.body.appendChild(overlay);
  document.getElementById("save-story").onclick = () => {
    saveStory({
      theme: theme.title,
      order,
      dialogue: dialogueText,
      correct,
      sequenceCorrect,
      timestamp: Date.now(),
    });
    overlay.remove();
    main.innerHTML = '<div id="my-book"></div>';
    import("./myBook.js").then((mod) => mod.renderMyBook());
  };
}
