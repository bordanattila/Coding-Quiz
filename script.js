// Create global variables
var questionArea = document.querySelector("h1");
var firstOption = document.querySelector(".answer1");
var secondOption = document.querySelector(".answer2");
var thirdOption = document.querySelector(".answer3");
var fourthOption = document.querySelector(".answer4");
var startButton = document.querySelector(".btn");
var theArea = document.querySelector("section");
var answerCheck = document.querySelector(".check");
var selected = "";
var questionCount = 1;
var theTimer = document.querySelector(".timer");
var timerCount;
var correctCount = 0;
var entryField = document.querySelector(".initials");
var playerName = document.querySelector("#player");
var pname = "";
var highestScore = 0;
var higestName = "";

// Create  question database object

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
    "optionD": "Computer Personal Unit",
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
    "5": 
    {
    "question": "What does the Prt Sc button do?",
    "optionA": "Nothing",
    "optionB": "Closes all windows",
    "optionC": "Saves a .png file of what's on the screen in your screenshots folder in photos",
    "optionD": "Captures what's on the screen and copies it to your clipboard",
    "correct": "Captures what's on the screen and copies it to your clipboard",
    },
}
var size = Object.keys(questionData).length

// Add eventListener to the start button. Hide button once it is clicked
document.querySelector(".btn").addEventListener("click", function () {
    startButton.classList.add("btnHidden");
    theArea.classList.add("answers");
    startTimer();
    startQuiz(questionData);
})

//Add eventListener to View High Score
document.querySelector(".viewHigh").addEventListener("click", function () {
    showHigh();
})

// Create the answer options
startQuiz = function (questionData) {
    if (questionCount > size) {
        gameOver();
    } else {
    questionArea.textContent = questionData[questionCount].question;
    firstOption.textContent = questionData[questionCount].optionA;
    secondOption.textContent = questionData[questionCount].optionB;
    thirdOption.textContent = questionData[questionCount].optionC;
    fourthOption.textContent = questionData[questionCount].optionD;
    }
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
    timerCount = 10;
    var timer = setInterval(function () {
        timerCount--;
        theTimer.textContent = "Timer: " + timerCount;
        if (timerCount === 0) {
            questionArea.textContent = "Game Over";
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

// Create game over screen
gameOver = function () {
    questionArea.textContent = "End of Game";
    firstOption.textContent = "Your final score is " + correctCount + ".";
    secondOption.textContent = "";
    thirdOption.textContent = "";
    fourthOption.textContent = "";
    entryField.classList.remove("initials");
    store()
}

// Store data in local storage
store = function () {
    document.querySelector(".submit").addEventListener("click", function () {
        pname = playerName.value;
        console.log(pname)
        localStorage.setItem("playername", pname);
        localStorage.setItem("score", correctCount)
        var currentHighScore = localStorage.getItem("Higest score")
        console.log(currentHighScore)
        if (correctCount > currentHighScore) {
            localStorage.setItem("Higest score", correctCount);
            localStorage.setItem("Higest Score player", pname);
        }
    })
}  

showHigh = function () {
    questionArea.textContent = "High Score";
    
}