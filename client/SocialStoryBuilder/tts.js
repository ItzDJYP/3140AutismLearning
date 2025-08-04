// Text-to-speech logic using Web Speech API
export function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.9;
  utter.pitch = 1.1;
  utter.lang = "en-US";
  window.speechSynthesis.speak(utter);
}
