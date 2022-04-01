const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];
fetch("https://futdb.app/api/clubs/2/image", {
  headers: {
    "X-AUTH-TOKEN": "ab5195e0-4d2f-43e2-ba6a-80cd57c641b3",
  },
}).then((response) => {
  response.blob().then((blobResponse) => {
    const urlCreator = window.URL || window.webkitURL;
    document.getElementById("clubimg").src =
      urlCreator.createObjectURL(blobResponse);
  });
});

fetch("/storage/questions.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions;
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 9999;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  /* if (availableQuesions.length === 0) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }*/

  questionCounter++;
  progressText.innerText = ``;
  let questionIndex =
    question.dataset["number"] !== ""
      ? parseInt(question.dataset["number"]) + 1
      : 1; // Math.random() * availableQuesions.length

  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;
  question.dataset["number"] = questionIndex;
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    } else {
      localStorage.setItem("mostRecentScore", score);
      //go to the end page
      return window.location.assign("/end.html");
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
