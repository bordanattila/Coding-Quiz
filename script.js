// Create global variables
var questionArea = document.querySelector("h1");
var firstOption = document.querySelector(".answer1");
var secondOption = document.querySelector(".answer2");
var thirdOption = document.querySelector(".answer3");
var fourthOption = document.querySelector("answer4");
var startButton = document.querySelector(".btn");
var theArea = document.querySelector("section");
var answerCheck = document.querySelector(".check");
var selected = "";
var questionCount = 1;
var theTimer = document.querySelector(".timer");
var timerCount;
var correctCount;

// Create  question database object
// var questionData = require("./questions.json")
var questionData = 
{
    "1":
    { 
    "question": "What does HTML stand for? shfadkjsahf kjdshfjh dsak jhfdja fkjdhasfkj hauihf aurgfdau sbhvgfd ",
    "optionA": "Hypertext Markup Language",
    "optionB": "Highlighted Markup Language",
    "optionC": "Hyper Text Made Language",
    "optionD": "What",
    "correct": "Hypertext Markup Language",
    },
    "2": 
    {
    "question": "What does CPU stand for?",
    "optionA": "Central Process Unit",
    "optionB": "Central Processor Unit",
    "optionC": "Central Processing Unit",
    "optionD": "What",
    "correct": "Central Processing Unit",
    },
    "3": 
    {
    "question": "According to the International System of Units, how many bytes are in a kilobyte of RAM?",
    "optionA": "512",
    "optionB": "1000",
    "optionC": "1024",
    "optionD": "500",
    "correct": "1000",
    },
    "4": 
    {
    "question": "When Gmail first launched, how much storage did it provide for your email?",
    "optionA": "1GB",
    "optionB": "512MB",
    "optionC": "5GB",
    "optionD": "Unlimited",
    "correct": "1GB",
    },
}

// Add eventListener to the start button. Hide button once it is clicked
document.querySelector(".btn").addEventListener("click", function () {
    startButton.classList.add("btnHidden");
    theArea.classList.add("answers");
    startTimer();
    startQuiz(questionData);
})

// Create the answer options
startQuiz = function (questionData) {
    questionArea.textContent = questionData[questionCount].question;
    firstOption.textContent = questionData[questionCount].optionA;
    secondOption.textContent = questionData[questionCount].optionB;
    thirdOption.textContent = questionData[questionCount].optionC;
    // fourthOption.textContent = questionData[questionCount].optionD;
}

// Add eventListener to the answer options
for (var i = 0; i < document.querySelectorAll(".option").length; i++) {
    document.querySelectorAll(".option")[i].addEventListener("click", function () {
        selected = this.textContent;
        checkAnswer(selected)
    });
}

// Check if the answer clicke is correct
checkAnswer = function (selected) {
    if (selected === questionData[questionCount].correct) {
        answerCheck.textContent = "Last answer: " + "Correct";
        correctCount++;
    } else {
        answerCheck.textContent = "Last answer: " + "Wrong";
    }
    questionCount++;
    startQuiz(questionData);
}

// Create timer function
startTimer = function () {
    timerCount = 30;
    var timer = setInterval(function () {
        timerCount--;
        theTimer.textContent = "Timer: " + timerCount;
        if (timerCount === 0) {
            questionArea.textContent = "Game Over";
            clearInterval(timer);
        }
    }, 1000);
}
