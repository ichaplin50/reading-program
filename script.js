const wordList = [
    { word: "Cat", image: "images/cat.jpg" },
    { word: "Dog", image: "images/dog.jpg" },
    { word: "Ball", image: "images/ball.jpg" },
    { word: "Car", image: "images/car.jpg" },
    { word: "Ford", image: "images/ford.jpg"},
    { word: "Alien", image: "images/alien.jpg"},
    { word: "Bug", image: "images/bug.jpg"},
    { word: "Bee", image: "images/bee.jpg"},
    { word: "Jaguar", image: "images/jaguar.jpg"},
    { word: "Kia", image: "images/kia.jpg"},
    { word: "Deer", image: "images/deer.jpg"},
    { word: "Cow", image: "images/cow.jpg" },
    { word: "Bat", image: "images/bat.jpg" },
    { word: "Hat", image: "images/hat.jpg" },
    { word: "Pig", image: "images/pig.jpg" },
    { word: "Truck", image: "images/truck.jpg" },
    { word: "Person", image: "images/person.jpg"},
    { word: "Zebra", image: "images/zebra.jpg"},
    { word: "Lion", image: "images/lion.jpg"},
    { word: "Sloth", image: "images/sloth.jpg"},
    { word: "Panda", image: "images/panda.jpg"},
    { word: "Frog", image: "images/frog.jpg"},
    { word: "Clam", image: "images/clam.jpg"},
    { word: "Box", image: "images/box.jpg"},
    { word: "Book", image: "images/book.jpg"},
    { word: "Lexus", image: "images/lexus.jpg"},
    { word: "Honda", image: "images/honda.jpg"},
    { word: "Pacifica", image: "images/pacifica.jpg"},
];

// Fisher–Yates shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(wordList);

const sessionLengthSlider = document.getElementById('session-length-slider');
const sessionLengthValue = document.getElementById('session-length-value');

// Set slider max and default value
sessionLengthSlider.max = wordList.length;
const defaultSessionLength = Math.min(10, wordList.length);
sessionLengthSlider.value = defaultSessionLength;
sessionLengthValue.textContent = defaultSessionLength;

// Update value display on slider input
sessionLengthSlider.addEventListener('input', function() {
    sessionLengthValue.textContent = sessionLengthSlider.value;
});

let sessionLength = defaultSessionLength;
let sessionWords = wordList.slice(0, sessionLength);
let currentIndex = 0;
let totalWords = sessionWords.length;

const wordDisplay = document.getElementById('word-display');
const revealButton = document.getElementById('reveal-button');
const nextButton = document.getElementById('next-button');
const imageContainer = document.getElementById('image-container');
const progressBar = document.getElementById('progress-bar');

const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const gameContainer = document.querySelector('.game-container');

startButton.addEventListener('click', function() {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    sessionLength = parseInt(sessionLengthSlider.value, 10);
    shuffleArray(wordList);
    sessionWords = wordList.slice(0, sessionLength);
    currentIndex = 0;
    totalWords = sessionWords.length;
    showWord();
});

function updateProgressBar() {
    const progressPercent = (currentIndex / totalWords) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

// Function to show the current word
function showWord() {
    wordDisplay.textContent = sessionWords[currentIndex].word;
    imageContainer.innerHTML = "";
    revealButton.style.display = "inline-block";
    nextButton.style.display = "none";
    updateProgressBar();
}

// Function to reveal the picture
function revealPicture() {
    const img = document.createElement('img');
    img.src = sessionWords[currentIndex].image;
    imageContainer.appendChild(img, revealButton);

    // Trigger confetti
    if (window.confetti) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    revealButton.style.display = "none";
    nextButton.style.display = "inline-block";
}

// Function to go to the next word
function nextWord() {
    currentIndex++;
    if (currentIndex >= sessionWords.length) {
        wordDisplay.textContent = "Great job!";
        imageContainer.innerHTML = "";
        revealButton.style.display = "none";
        nextButton.style.display = "none";
        updateProgressBar();
    } else {
        showWord();
    }
}

// Event listeners
revealButton.addEventListener('click', revealPicture);
nextButton.addEventListener('click', nextWord);
