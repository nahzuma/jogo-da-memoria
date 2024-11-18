const images = [
    'https://static.vecteezy.com/system/resources/previews/009/596/910/original/grape-fruit-illustration-cartoon-png.png',  // Imagem do primeiro par
    'https://static.vecteezy.com/ti/vetor-gratis/p1/3415769-laranja-fruta-desenho-ilustracao-em-vetor.jpg',  // Imagem do segundo par
    'https://png.pngtree.com/png-clipart/20221230/ourmid/pngtree-apple-clipart-png-image_6540887.png',  // Imagem do terceiro par
    'https://static.vecteezy.com/system/resources/previews/009/596/910/original/grape-fruit-illustration-cartoon-png.png',  // Repetição da primeira imagem
    'https://static.vecteezy.com/ti/vetor-gratis/p1/3415769-laranja-fruta-desenho-ilustracao-em-vetor.jpg',  // Repetição da segunda imagem
    'https://png.pngtree.com/png-clipart/20221230/ourmid/pngtree-apple-clipart-png-image_6540887.png'   // Repetição da terceira imagem
];

let flippedCards = [];
let attempts = 0;
let history = JSON.parse(localStorage.getItem('gameHistory')) || [];

const gameBoard = document.getElementById('gameBoard');
const attemptsDisplay = document.getElementById('attempts');
const historyDisplay = document.getElementById('history');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(image, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;

    const img = document.createElement('img');
    img.src = image;
    card.appendChild(img);

    card.addEventListener('click', () => flipCard(card, image));

    return card;
}

function flipCard(card, image) {
    if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    flippedCards.push({ card, image });

    if (flippedCards.length === 2) {
        attempts++;
        attemptsDisplay.innerText = `Tentativas: ${attempts}`;
        checkMatch();
    }
}

function checkMatch() {
    const [first, second] = flippedCards;

    if (first.image === second.image) {
        flippedCards = [];
        if (checkGameOver()) {
            alert('PARABÉNS! Você encontrou todos os pares!');
        }
    } else {
        setTimeout(() => {
            first.card.classList.remove('flipped');
            second.card.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }

    storeHistory();
}

function checkGameOver() {
    const allCards = document.querySelectorAll('.card');
    return Array.from(allCards).every(card => card.classList.contains('flipped'));
}

function storeHistory() {
    history.push(attempts);
    localStorage.setItem('gameHistory', JSON.stringify(history));
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyDisplay.innerHTML = 'Histórico: ' + history.join(', ');
}

function restartGame() {
    shuffledImages = [...images];
    shuffleArray(shuffledImages);
    gameBoard.innerHTML = '';
    flippedCards = [];
    attempts = 0;
    attemptsDisplay.innerText = `Tentativas: ${attempts}`;

    shuffledImages.forEach((image, index) => {
        gameBoard.appendChild(createCard(image, index));
    });
}

window.onload = () => {
    restartGame();
};
