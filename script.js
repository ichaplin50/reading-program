let wordList = [];
let fullWordList = [];
let isLoading = true;
let filters = { type: [], letters: [], phonics: [] };

// Filter words based on selected criteria
function filterWords(filters, words) {
    const filteredWords = words.filter(word => {
        if (filters.type.length === 0 && filters.letters.length === 0 && filters.phonics.length === 0) {
            return true;
        }
        if (filters.type.length > 0) {
            const hasMatchingType = word.type && word.type.some(type => filters.type.includes(type));
            if (!hasMatchingType) return false;
        }
        return true;
    });
    return filteredWords;
}

// Fetch words from words.json
async function loadWords() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const sessionLengthContainer = document.getElementById('session-length-container');
    const startButton = document.getElementById('start-button');

    loadingIndicator.style.display = 'block';
    sessionLengthContainer.style.display = 'none';
    startButton.style.display = 'none';

    try {
        const response = await fetch('./words.json');
        if (!response.ok) throw new Error(`Failed to load words: ${response.status}`);
        const allWords = await response.json();
        fullWordList = allWords;
        wordList = filterWords(filters, allWords);
        isLoading = false;

        loadingIndicator.style.display = 'none';
        sessionLengthContainer.style.display = 'block';
        startButton.style.display = 'inline-block';

        initializeGame();
    } catch (error) {
        console.error('Error loading words:', error);
        loadingIndicator.innerHTML = `<p style="color: #F4511E;">Error: ${error.message}</p>`;
    }
}

function initializeGame() {
    const sessionLengthSlider = document.getElementById('session-length-slider');
    const sessionLengthValue = document.getElementById('session-length-value');

    sessionLengthSlider.max = wordList.length;
    const defaultSessionLength = Math.min(10, wordList.length);
    sessionLengthSlider.value = defaultSessionLength;
    sessionLengthValue.textContent = defaultSessionLength;

    sessionLengthSlider.addEventListener('input', () => {
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

    startButton.addEventListener('click', () => {
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

    function showWord() {
        wordDisplay.textContent = sessionWords[currentIndex].word;
        imageContainer.innerHTML = "";
        revealButton.style.display = "inline-block";
        nextButton.style.display = "none";
        updateProgressBar();
    }

    function revealPicture() {
        imageContainer.innerHTML = "";  // Clear any previous image
    
        const img = document.createElement('img');
        img.src = sessionWords[currentIndex].image;
        imageContainer.appendChild(img);
    
        if (window.confetti) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
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

    revealButton.addEventListener('click', revealPicture);
    nextButton.addEventListener('click', nextWord);
}

// Customize Words UI Logic
function getUniqueTypes(words) {
    const allTypes = words.flatMap(w => w.type || []);
    return [...new Set(allTypes)];
}

function renderTypeFilters(types) {
    const container = document.getElementById('type-filters');
    container.innerHTML = '';

    types.forEach(type => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = type;
        checkbox.checked = filters.type.includes(type);
        checkbox.addEventListener('change', () => {
            updateTypeFilters();
        });

        label.appendChild(checkbox);
        label.append(` ${type}`);
        container.appendChild(label);
        container.appendChild(document.createElement('br'));
    });
}

function updateTypeFilters() {
    const checkboxes = document.querySelectorAll('#type-filters input[type="checkbox"]');
    filters.type = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    updateMatchCount();
}

function updateMatchCount() {
    const matchCount = filterWords(filters, fullWordList).length;
    document.getElementById('match-count').textContent = `Matching words: ${matchCount}`;
}

// Screen Transitions
document.getElementById('customize-button').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('customize-screen').style.display = 'block';
    renderTypeFilters(getUniqueTypes(fullWordList));
    updateMatchCount();
});

document.getElementById('back-button').addEventListener('click', () => {
    document.getElementById('customize-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
    wordList = filterWords(filters, fullWordList);
    initializeGame();
});

loadWords();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
