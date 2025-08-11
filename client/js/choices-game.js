const questions = [
  {
    question: "Your friend looks sad. What should you do?",
    answers: [
      { text: "Ignore them", correct: false },
      { text: "Laugh at them", correct: false },
      { text: "Ask if they are okay", correct: true },
      { text: "Walk away", correct: false }
    ]
  },
  {
    question: "You want to play with others. What should you say?",
    answers: [
      { text: "Let me play now!", correct: false },
      { text: "Can I please play with you?", correct: true },
      { text: "Give me the toy!", correct: false },
      { text: "Sit and watch silently", correct: false }
    ]
  },
  {
    question: "Someone gives you a gift. What do you say?",
    answers: [
      { text: "Why did you give me this?", correct: false },
      { text: "Put it away", correct: false },
      { text: "Say 'Thank you!'", correct: true },
      { text: "Throw it", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");

let currentQuestionIndex = 0;

function startGame() {
  currentQuestionIndex = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  feedback.innerText = "";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  setStatusClass(selectedButton, correct);
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
  });

  feedback.innerText = correct ? "✅ Good choice!" : "❌ Let's try to think kindly!";
  nextButton.style.display = "inline-block";
}

function setStatusClass(button, correct) {
  clearStatusClass(button);
  if (correct) {
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
  }
}

function clearStatusClass(button) {
  button.classList.remove("correct");
  button.classList.remove("wrong");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showEndMessage();
  }
});

function showEndMessage() {
  resetState();
  questionElement.innerText = "🎉 Great job! You've finished the game.";
  nextButton.style.display = "none";
}