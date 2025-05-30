let wordList = [];
let isLoading = true;
let filters = { type: ["car"], letters: [], phonics: [] };

// Filter words based on selected criteria
function filterWords(filters, words) {
    const matchingWords = words.filter(word => {
        // If no filters are selected, return all words
        if (filters.type.length === 0 && filters.letters.length === 0 && filters.phonics.length === 0) {
            return true;
        }

        // Check type filter
        if (filters.type.length > 0) {
            const hasMatchingType = word.type && word.type.some(type => filters.type.includes(type));
            if (!hasMatchingType) return false;
        }

        // We'll implement letters and phonics filters in later phases
        return true;
    });
    
    console.log('Words matching current filters:', matchingWords); // More explicit debug message
    console.log('Filtered words:', filteredWords); // Debug log
    return filteredWords;
}

// Fetch words from words.json
async function loadWords() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const sessionLengthContainer = document.getElementById('session-length-container');
    const startButton = document.getElementById('start-button');
    
    // Show loading indicator and hide controls
    loadingIndicator.style.display = 'block';
    sessionLengthContainer.style.display = 'none';
    startButton.style.display = 'none';
    
    try {
        const response = await fetch('./words.json');
        if (!response.ok) {
            throw new Error(`Failed to load words: ${response.status} ${response.statusText}`);
        }
        const allWords = await response.json();
        wordList = filterWords(filters, allWords);
        isLoading = false;
        
        // Hide loading indicator and show controls
        loadingIndicator.style.display = 'none';
        sessionLengthContainer.style.display = 'block';
        startButton.style.display = 'inline-block';
        
        // Initialize game elements after words are loaded
        initializeGame();
    } catch (error) {
        console.error('Error loading words:', error);
        loadingIndicator.innerHTML = `
            <p style="color: #F4511E;">Error loading words: ${error.message}</p>
            <p>Please make sure you're running this from a web server.</p>
        `;
    }
}

// Initialize game elements
function initializeGame() {
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
}

// Start loading words when the script runs
loadWords();

// Fisher–Yates shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
