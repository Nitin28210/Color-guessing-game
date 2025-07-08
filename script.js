let timer = document.getElementsByClassName("timer")[0];
let quizContainer = document.getElementById("container");
let nextButton = document.getElementById("next-button");
let numOfQuestions = document.getElementsByClassName("number-of-questions")[0];
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");

let questionCount;
let scoreCount = 0;
let count = 10;
let countdown;
let quizArray = [];

// Generate a random hex color
const generateColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Populate quiz with 5 color questions
function populateQuiz() {
  for (let i = 0; i < 5; i++) {
    let correctColor = generateColor();
    let options = [correctColor];

    // Add 3 more unique wrong options
    while (options.length < 4) {
      let color = generateColor();
      if (!options.includes(color)) {
        options.push(color);
      }
    }

    // Push to quiz array
    quizArray.push({
      correct: correctColor,
      options: options,
    });
  }
}

// Display quiz cards
function quizCreator() {
  quizArray.sort(() => Math.random() - 0.5);
  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);

    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    numOfQuestions.innerHTML = "1 of " + quizArray.length + " Question";

    let questionDiv = document.createElement("p");
    questionDiv.classList.add("question-color");
    questionDiv.style.color = i.correct;
    questionDiv.innerHTML = "What color is this?";
    div.appendChild(questionDiv);

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    for (let opt of i.options) {
      let button = document.createElement("button");
      button.classList.add("option-div");
      button.setAttribute("data-option", opt);
      button.textContent = opt;
      button.addEventListener("click", () => checker(button));
      buttonContainer.appendChild(button);
    }

    div.appendChild(buttonContainer);
    quizContainer.appendChild(div);
  }
}

// Check user answer
function checker(userOption) {
  let userSolution = userOption.getAttribute("data-option");
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.getAttribute("data-option") === quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);
  options.forEach((el) => (el.disabled = true));
  nextButton.classList.remove("hide");
}

// Display current question
function quizDisplay(questionCount) {
  let quizCards = document.querySelectorAll(".container-mid");
  quizCards.forEach((card) => card.classList.add("hide"));
  quizCards[questionCount].classList.remove("hide");
}

// Timer logic
function timerDisplay() {
  countdown = setInterval(() => {
    timer.innerHTML = `<span>Time Left: </span> ${count}s`;
    count--;
    if (count < 0) {
      clearInterval(countdown);
      nextButton.classList.remove("hide");
    }
  }, 1000);
}

// Next button
nextButton.addEventListener("click", () => {
  questionCount++;
  if (questionCount === quizArray.length) {
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    userScore.innerHTML = `Your score is ${scoreCount} out of ${quizArray.length}`;
  } else {
    numOfQuestions.innerHTML = `${questionCount + 1} of ${quizArray.length} Question`;
    quizDisplay(questionCount);
    count = 10;
    clearInterval(countdown);
    timerDisplay();
    nextButton.classList.add("hide");
  }
});

// Start the game
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  quizArray = [];
  quizContainer.innerHTML = "";
  populateQuiz();
  quizCreator();
  questionCount = 0;
  scoreCount = 0;
  count = 10;
  quizDisplay(questionCount);
  timerDisplay();
});

// Restart the game
restart.addEventListener("click", () => {
  quizArray = [];
  quizContainer.innerHTML = "";
  populateQuiz();
  quizCreator();
  questionCount = 0;
  scoreCount = 0;
  count = 10;
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
  quizDisplay(questionCount);
  timerDisplay();
});

