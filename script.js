// Elementos
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const quizContainer = document.getElementById('quiz');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result');
const resultText = document.getElementById('result-text');
const resultImage = document.getElementById('result-image');

let currentQuestionIndex = 0;
let score = { Elphaba: 0, Glinda: 0, Fiyero: 0 };

// Perguntas
const questions = [
    {
        question: "Qual sua cor favorita?", answers: [
            { text: "Verde", character: "Elphaba" },
            { text: "Rosa", character: "Glinda" },
            { text: "Dourado", character: "Fiyero" }
        ]
    },
    {
        question: "Você prefere:", answers: [
            { text: "Planejar tudo", character: "Elphaba" },
            { text: "Ser popular", character: "Glinda" },
            { text: "Aventuras", character: "Fiyero" }
        ]
    },
    {
        question: "Escolha um animal de estimação:", answers: [
            { text: "Coruja", character: "Elphaba" },
            { text: "Unicórnio", character: "Glinda" },
            { text: "Cavalo", character: "Fiyero" }
        ]
    }
];

// Frases fofas / easter-eggs
const phrases = [
    "Só a saudade de você 💖",
    "Você é a luz da minha Emerald City (que ainda vou conhecer kkkk) 💚",
    "I ain't even think of leaving sometimes 💖"
];

// Eventos
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.classList.add('hidden');
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = { Elphaba: 0, Glinda: 0, Fiyero: 0 };
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer.character));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    answerButtons.innerHTML = '';
}

function selectAnswer(character) {
    score[character]++;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const winner = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
    resultText.innerText = `Você é ${winner}!`;
    resultImage.src = `images/${winner.toLowerCase()}.png`;

    // Easter-egg: clique na imagem mostra frase aleatória
    resultImage.addEventListener('click', () => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        alert(randomPhrase);
    });

    // Easter-egg: teclas mágicas
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        if (key === 'w') alert("🌟 Wicked vibes só pra você!");
        if (key === 'e') alert("💚 Você é minha estrela de Emerald City!");
        if (key === 'o') alert("🌈 Meu mundo fica mais colorido com você!");
    });

    // Easter-egg: clique secreto (chapéu invisível)
    const secretHat = document.createElement('div');
    secretHat.style.width = "30px";
    secretHat.style.height = "30px";
    secretHat.style.position = "fixed";
    secretHat.style.top = "10px";
    secretHat.style.right = "10px";
    secretHat.style.cursor = "pointer";
    secretHat.style.backgroundImage = "url('images/hat.png')"
    secretHat.title = "Clique para magia";
    document.body.appendChild(secretHat);

    secretHat.addEventListener('click', () => {
        alert("✨ I just want my 2hands on you ✨");
    });
}