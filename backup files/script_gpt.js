const wordList = [
    { word: "Cat", image: "cat.jpg" },
    { word: "Dog", image: "dog.jpg" },
    { word: "Ball", image: "ball.jpg" },
    { word: "Car", image: "car.jpg" }
];

let currentIndex = 0;

const wordDisplay = document.getElementById('word-display');
const revealButton = document.getElementById('reveal-button');
const nextButton = document.getElementById('next-button');
const imageContainer = document.getElementById('image-container');

// Function to show the current word
function showWord() {
    wordDisplay.textContent = wordList[currentIndex].word;
    imageContainer.innerHTML = "";
    revealButton.style.display = "inline-block";
    nextButton.style.display = "none";
}

// Function to reveal the picture
function revealPicture() {
    const img = document.createElement('img');
    img.src = wordList[currentIndex].image;
    imageContainer.appendChild(img);

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
    if (currentIndex >= wordList.length) {
        wordDisplay.textContent = "Great job!";
        imageContainer.innerHTML = "";
        revealButton.style.display = "none";
        nextButton.style.display = "none";
    } else {
        showWord();
    }
}

// Event listeners
revealButton.addEventListener('click', revealPicture);
nextButton.addEventListener('click', nextWord);

// Start the game
showWord();
