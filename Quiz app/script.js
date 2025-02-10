const questions = [
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Jupiter", correct: true},
            {text: "Saturn", correct: false},
            {text: "Neptune", correct: false},
        ]
    },
    {
        question: "Who is known as the 'Father of the Computer'?",
        answers: [
            {text: "Charles Babbage", correct: true},
            {text: "Alan Turing", correct: false},
            {text: "Thomas Edison", correct: false},
            {text: "Nikola Tesla", correct: false},
        ]
    },
    {
        question: "Which country is the origin of the famous martial art 'Judo'?",
        answers: [
            {text: "China", correct: false},
            {text: "Japan", correct: true},
            {text: "Korea", correct: false},
            {text: "Thailand", correct: false},
        ]
    },
    {
        question: "Which of the following is not a programming language?",
        answers: [
            {text: "Python", correct: false},
            {text: "JavaScript", correct: false},
            {text: "HTML", correct: true},
            {text: "Java", correct: false},
        ]
    },
    {
        question: "What does the acronym 'SQL' stand for?",
        answers: [
            {text: "Structured Question Language", correct: false},
            {text: "Simple Query Language", correct: false},
            {text: "Structured Query Language", correct: true},
            {text: "Sequential Query Language", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();