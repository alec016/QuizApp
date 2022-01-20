const   startButton = document.getElementById('start-btn'),
        restartButton = document.getElementById('restart-btn'),
        puntuacionModal = document.getElementById('puntuacion-modal'),
        puntuacionElement = document.getElementById('puntuacion'),
        nextButton = document.getElementById('next-btn'),
        questioncontainerElement = document.getElementById('question-container'),
        questionElement = document.getElementById('question'),
        answerButtonsElement = document.getElementById('answer-buttons'),
        localStorage = window.localStorage;

let     suffledQuestions,
        currentQuestionIndex,
        puntuacion = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startGame);

function startGame(){
    console.log('started');
    startButton.classList.add('hide');
    puntuacionModal.classList.add('hide');
    puntuacionModal.classList.remove('show');
    suffledQuestions = questions.sort(() => {
        Math.random() - 0.5;
    });
    currentQuestionIndex = 0;
    questioncontainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(suffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstElementChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct, false);
    Array.from(answerButtonsElement.children).forEach(button => {
        if(button === selectedButton){
            setStatusClass(button, button.dataset.correct, true);
        }else{
            setStatusClass(button, button.dataset.correct, false);
        }
    });
    verificacion();
}

function setStatusClass(element, correct, selected){
    clearStatusClass(element);
    if(selected && correct && element !== document.body){
        puntuacion++;
    }

    if(correct){
        element.classList.add('correct');
    }else{
        element.classList.add('wrong');
    }
}

function verificacion(){
    if(suffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide');
    }else{
        puntuacionModal.classList.add('show');
        puntuacionModal.classList.remove('hide');
        puntuacionElement.innerHTML = 
            `${puntuacion} puntos!
            <br/>
            Puntuacion más alta: ${puntuacionMasAlta(puntuacion)}` ;
        puntuacion = 0;
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function puntuacionMasAlta(puntuacionActual){
    if(localStorage.getItem('PuntuacionMasAltaQuiz') != null){
        if(puntuacionActual > localStorage.getItem('PuntuacionMasAltaQuiz')){
            localStorage.setItem('PuntuacionMasAltaQuiz', puntuacionActual);
            return puntuacionActual;
        }else{
            return localStorage.getItem('PuntuacionMasAltaQuiz');
        }
    }else{
        localStorage.setItem('PuntuacionMasAltaQuiz', puntuacionActual);
        return puntuacionActual;
    }
}

const questions = [
    {
        question: '¿Cuanto es 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    }, {
        question: '¿El desarrollo web es divertido?',
        answers: [
            { text: 'A medias', correct: false },
            { text: 'SI!!!', correct: true },
            { text: 'Um no', correct: false },
            { text: 'No lo sé', correct: false }
        ]
    }, {
        question: '¿Cuanto es 4 * 2?',
        answers: [
            { text: '6', correct: false },
            { text: '8', correct: true }
        ]
    }, {
        question: '¿Te gusta este juego?',
        answers: [
            { text: 'Si', correct: true },
            { text: 'No', correct: false }
        ]
    }, {
        question: '¿Tienes pensado que vas a hacer despues?',
        answers: [
            { text:'Si', correct: true },
            { text:'No', correct: true }
        ]
    }, {
        question: '¿JavaScript es muy útil y flexible?',
        answers: [
            { text: 'No', correct: false },
            { text: 'No se ni que es JavaScript', correct: false },
            { text: 'Es tan flexible que me pone de los nervios', correct: true },
            { text: 'Ciertamente es flexible pero no util', correct: false }
        ]
    }
];