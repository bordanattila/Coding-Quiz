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
var entryField = document.querySelector(".hide");
var playerName = document.querySelector("#player");
var pname = "";
var highestScore = 0;
var higestName = "";
var header = document.querySelector("header");
var goAgain = document.querySelector(".go");
var timeLeft = 0;
var timer;
var instructiosField = document.querySelector(".instructions");
var questionNum = [];
var counter = 1;


// Create  question database object
var questionData = 
{
    "1":
    { 
    "question": "The content of the page (such as your pictures, text, links) will show up here.",
    "optionA": "Head",
    "optionB": "Body",
    "optionC": "Style",
    "optionD": "Folder",
    "correct": "Body",
    },
    "2": 
    {
    "question": "The default link color for hyperlinks:",
    "optionA": "green",
    "optionB": "purple",
    "optionC": "blue",
    "optionD": "red",
    "correct": "blue",
    },
    "3": 
    {
    "question": "Which tag is used to underline text?",
    "optionA": "<a>",
    "optionB": "<b>",
    "optionC": "<l>",
    "optionD": "<u>",
    "correct": "<u>",
    },
    "4": 
    {
    "question": "Defines a division or a section in an HTML document. Used to group block-elements to format them with CSS",
    "optionA": "<div>>",
    "optionB": "<span>",
    "optionC": "<caption",
    "optionD": "<group>",
    "correct": "<div>",
    },
    "5": 
    {
    "question": "To make a comment in HTML you use",
    "optionA": "<!-- -->",
    "optionB": "/*",
    "optionC": "//",
    "optionD": "#",
    "correct": "<!-- -->",
    },
    "6": 
    {
    "question": "What does CSS stand for?",
    "optionA": "Colorful Style Sheets",
    "optionB": "Cascading Style Sheets",
    "optionC": "Creative Style Sheets",
    "optionD": "Computer Style Sheets",
    "correct": "Cascading Style Sheets",
    },
    "7": 
    {
    "question": "What is a variable?",
    "optionA": "Store values so we can use them once.",
    "optionB": "Store values in containers so we can't use them later.",
    "optionC": "Store values so we can use them but cannot change them.",
    "optionD": "Store values so we can use them later and change them from the code.",
    "correct": "Store values so we can use them later and change them from the code.",
    },
    "8": 
    {
    "question": "JavaScript files have the file extension (the bit after the name):",
    "optionA": ".js",
    "optionB": ".css",
    "optionC": ".html",
    "optionD": ".java",
    "correct": ".js",
    },
    "9": 
    {
    "question": "What is the name of the CSS selector to style the element with id named car?",
    "optionA": ".car",
    "optionB": "car",
    "optionC": "#car",
    "optionD": "$car",
    "correct": "#car",
    },
    "10": 
    {
    "question": "CSS rules are enclosed with ___________?",
    "optionA": "<>",
    "optionB": "()",
    "optionC": "{}",
    "optionD": "''",
    "correct": "{}",
    },
    
}

// Add eventListener to the start button. Hide button once it is clicked
document.querySelector(".btn").addEventListener("click", function () {
    startButton.classList.add("hide");
    theArea.classList.add("answers");
    startTimer();
    startQuiz(questionData);
})

//Add eventListener to View High Score
document.querySelector(".viewHigh").addEventListener("click", function () {
    showHigh();
})

// Create the answer options
var createQuestion = function () {
    var random = Math.floor(Math.random() * 10) + 1;
    
    if (counter > 10) {
        timeLeft = timerCount;
        clearInterval(timer);
        gameOver();
    } else if (questionNum.includes(random)) {        
        createQuestion();
    } else  {
        questionCount = random;
        questionNum.push(random);
        console.log(questionNum);
        console.log(questionNum.length);
        questionArea.textContent = questionData[questionCount].question;
        firstOption.textContent = questionData[questionCount].optionA;
        secondOption.textContent = questionData[questionCount].optionB;
        thirdOption.textContent = questionData[questionCount].optionC;
        fourthOption.textContent = questionData[questionCount].optionD;
    }     
} 
  
// Create start screen
startQuiz = function (questionData) {
    instructiosField.classList.add("hide");
    document.querySelector("hr").classList.remove("hide");
    createQuestion()
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
        answerCheck.textContent = "The last answer was correct";
        correctCount++;
    } else {
        answerCheck.textContent = "The last answer was wrong";
        timerCount = timerCount - 10;
    }
    counter++;
    createQuestion();
}

// Create timer function
startTimer = function () {
    timerCount = 60;
    timer = setInterval(function () {
        timerCount--;
        theTimer.textContent = "Timer: " + timerCount;
        if (timerCount <= 0) {
            questionArea.textContent = "Game Over";
            clearInterval(timer);
            if (timerCount === 0) {
                clearInterval(timer);
            }
            gameOver();
        }
    }, 1000);
}

// Create game over screen
gameOver = function () {
    questionArea.textContent = "End of Game";
    firstOption.textContent = "Your final score is " + timeLeft + ".";
    secondOption.textContent = "You had " + correctCount + " correct answers.";
    thirdOption.textContent = "";
    fourthOption.textContent = "";
    entryField.classList.remove("hide");
    firstOption.classList.remove("btn-style");
    firstOption.classList.add(".larger-font");
    secondOption.classList.remove("btn-style");
    store()
}

// Store data in local storage
store = function () {
    document.querySelector(".submit").addEventListener("click", function () {
        pname = playerName.value;        
        localStorage.setItem("Player name", pname);
        localStorage.setItem("Score", timeLeft);
        var currentHighScore = localStorage.getItem("Higest score");        
        if (timeLeft > currentHighScore) {
            localStorage.setItem("Higest score", timeLeft);
            localStorage.setItem("Higest Score player", pname);
        }
        answerCheck.textContent = "";
        goAgain.classList.remove("hide");
        goAgain.addEventListener("click", function () {
        location.reload();
        })
    })
}  

//Viev high score screen
showHigh = function () {
    var initials = localStorage.getItem("Higest Score player");
    var score = localStorage.getItem("Higest score");
    var buttons = document.querySelector(".goBack");
    questionArea.textContent = "High Score";
    firstOption.textContent = initials + " - " + score;
    secondOption.textContent = "";
    thirdOption.textContent = "";
    fourthOption.textContent = "";
    entryField.classList.add("hide");
    startButton.classList.add("hide");
    header.classList.add("hide");
    document.querySelector("hr").classList.add("hide")
    answerCheck.textContent = "";
    buttons.classList.remove("hide"); 
    firstOption.classList.remove("btn-style");
    goAgain.classList.add("hide");
    instructiosField.classList.add("hide");
}

document.querySelector(".back").addEventListener("click", function () {
    location.reload();
})

document.querySelector(".clear").addEventListener("click", function () {
    localStorage.clear();
})
