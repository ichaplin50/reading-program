let wordList = [];

fetch('words.json')
  .then(response => response.json())
  .then(data => {
    wordList = data;
    initializeGame();
  })
  .catch(error => {
    console.error('Error loading words.json:', error);
  });

// Global game state
let sessionLength = 10;
let sessionWords = [];
let currentIndex = 0;
let totalWords = 0;

// Global DOM elements
const wordDisplay = document.getElementById('word-display');
const revealButton = document.getElementById('reveal-button');
const nextButton = document.getElementById('next-button');
const imageContainer = document.getElementById('image-container');
const progressBar = document.getElementById('progress-bar');

const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const gameContainer = document.querySelector('.game-container');

const sessionLengthSlider = document.getElementById('session-length-slider');
const sessionLengthValue = document.getElementById('session-length-value');

function initializeGame() {
  shuffleArray(wordList);

  sessionLengthSlider.max = wordList.length;
  const defaultSessionLength = Math.min(10, wordList.length);
  sessionLengthSlider.value = defaultSessionLength;
  sessionLengthValue.textContent = defaultSessionLength;

  sessionLengthSlider.addEventListener('input', function () {
    sessionLengthValue.textContent = sessionLengthSlider.value;
  });

  startButton.addEventListener('click', function () {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    sessionLength = parseInt(sessionLengthSlider.value, 10);
    shuffleArray(wordList);
    sessionWords = wordList.slice(0, sessionLength);
    currentIndex = 0;
    totalWords = sessionWords.length;
    showWord();
  });

  revealButton.addEventListener('click', revealPicture);
  nextButton.addEventListener('click', nextWord);
}

// Fisher–Yates shuffle function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateProgressBar() {
  const progressPercent = (currentIndex / totalWords) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function showWord() {
  wordDisplay.textContent = sessionWords[currentIndex].word;
  imageContainer.innerHTML = "";
  revealButton.style.display = "inline-block";
  nextButton.style.display = "none";
  updateProgressBar();
}

function revealPicture() {
  const img = document.createElement('img');
  img.src = sessionWords[currentIndex].image;
  imageContainer.appendChild(img);

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