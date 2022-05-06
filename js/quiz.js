import { updateUser } from "../api/userActions.js";

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 1;
let availableQuesions = [];
let questionCounter2 = 1;

let questions = [];
let leagueTest = fetch(`https://futdb.app/api/leagues/${questionCounter}`, {
  headers: {
    "X-AUTH-TOKEN": "ab5195e0-4d2f-43e2-ba6a-80cd57c641b3",
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data.item.name;
  })
  .catch((err) => {
    return "Deze api werkt niet";
  }); // exceptionss;
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 9999;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

const getNewQuestion = () => {
  /* if (availableQuesions.length === 0) {
      localStorage.setItem("mostRecentScore", score);
      //go to the end page
      return window.location.assign("/end.html");
    }*/
  questionCounter++;
  if (questionCounter % 2 == 0) {
    fetch(`https://futdb.app/api/clubs/${questionCounter}/image`, {
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
    fetch(`https://futdb.app/api/clubs/${questionCounter}`, {
      headers: {
        "X-AUTH-TOKEN": "ab5195e0-4d2f-43e2-ba6a-80cd57c641b3",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let clubAnswer = data.item.name;
      }); // exceptionss
  } else {
    fetch(`https://futdb.app/api/leagues/${questionCounter}/image`, {
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
    fetch(`https://futdb.app/api/leagues/${questionCounter}`, {
      headers: {
        "X-AUTH-TOKEN": "ab5195e0-4d2f-43e2-ba6a-80cd57c641b3",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let leagueAnswer = data.item.name;
        console.log(data.item.id);
      }); // exceptionss;
  }

  progressText.innerText = ``;
  let questionIndex =
    question.dataset["number"] && question.dataset["number"] !== ""
      ? parseInt(question.dataset["number"]) + 1
      : 0;
  if (availableQuesions.length - 1 < questionIndex) questionIndex = 0;
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;
  question.dataset["number"] = questionIndex;
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  acceptingAnswers = true;
};

fetch("/storage/questions.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    leagueTest.then((league) => {
      console.log(league);
      questions = loadedQuestions;
      questions = [
        {
          question: "Welke league is dit?",
          choice1: league,
          choice2: "Rode duivels",
          choice3: "d",
          choice4: "test",
          answer: 1,
        },
        {
          question: "Welke club is dit?",
          choice1: "Patat",
          choice2: "Rode duivels",
          choice3: league,
          choice4: "test",
          answer: 3,
        },
      ];
      startGame();
    });
  })
  .catch((err) => {
    console.error(err);
  });
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      let score = incrementScore(CORRECT_BONUS);
    } else {
      localStorage.setItem("mostRecentScore", score);
      updateUser(score);
      return window.location.assign("/html/leaderboard.html");
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
