let wordList = [];
let fullWordList = [];
let isLoading = true;
let filters = { type: [], letters: [], phonics: [], letterCount: [] };

// Filter logic (AND across categories, OR within each category)
function filterWords(filters, words) {
    return words.filter(word => {
        if (filters.type.length > 0 && !word.type?.some(t => filters.type.includes(t))) {
            return false;
        }
        if (filters.letters.length > 0 && !filters.letters.every(l => word.letters.includes(l))) {
            return false;
        }
        if (filters.phonics.length > 0 && !word.phonics.some(p => filters.phonics.includes(p))) {
            return false;
        }
        if (filters.letterCount.length > 0 && !filters.letterCount.includes(word.letterCount)) {
            return false;
        }
        return true;
    });
}

// Utility: Get unique values
function getUniqueValues(words, key) {
    const values = words.flatMap(w => w[key] || []);
    return [...new Set(values)].sort();
}

// Render checkbox groups
function renderFilterGroup(containerId, values, category) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    // Select/Deselect All buttons
    const controls = document.createElement('div');
    controls.style.marginBottom = '10px';

    const selectAll = document.createElement('button');
    selectAll.textContent = 'Select All';
    selectAll.onclick = () => {
        filters[category] = [...values];
        renderFilters(); // re-render to reflect changes
    };
    const deselectAll = document.createElement('button');
    deselectAll.textContent = 'Deselect All';
    deselectAll.onclick = () => {
        filters[category] = [];
        renderFilters(); // re-render to reflect changes
    };

    controls.appendChild(selectAll);
    controls.appendChild(deselectAll);
    container.appendChild(controls);

    // Checkbox list
    values.forEach(val => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = val;
        checkbox.checked = filters[category].includes(val);
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                filters[category].push(val);
            } else {
                filters[category] = filters[category].filter(v => v !== val);
            }
            updateMatchCount();
        });

        label.appendChild(checkbox);
        label.append(` ${val}`);
        container.appendChild(label);
        container.appendChild(document.createElement('br'));
    });
}

function renderFilters() {
    renderFilterGroup('type-filters', getUniqueValues(fullWordList, 'type'), 'type');
    renderFilterGroup('letter-filters', getUniqueValues(fullWordList, 'letters'), 'letters');
    renderFilterGroup('phonics-filters', getUniqueValues(fullWordList, 'phonics'), 'phonics');
    renderFilterGroup(
        'lettercount-filters',
        getUniqueValues(fullWordList, 'letterCount').map(n => String(n)),
        'letterCount'
      );      
    updateMatchCount();
}

function updateMatchCount() {
    const matchCount = filterWords(filters, fullWordList).length;
    document.getElementById('match-count').textContent = `Matching words: ${matchCount}`;

    const startButton = document.getElementById('start-button');
    startButton.disabled = (matchCount === 0);

    const sessionLengthSlider = document.getElementById('session-length-slider');
    sessionLengthSlider.max = matchCount;
    if (parseInt(sessionLengthSlider.value, 10) > matchCount) {
        sessionLengthSlider.value = matchCount;
        document.getElementById('session-length-value').textContent = matchCount;
    }
}

document.getElementById('customize-button').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('customize-screen').style.display = 'block';
    renderFilters();
});

document.getElementById('back-button').addEventListener('click', () => {
    document.getElementById('customize-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
    wordList = filterWords(filters, fullWordList);
    initializeGame();
});

// Initial game + word loader
async function loadWords() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const sessionLengthContainer = document.getElementById('session-length-container');
    const startButton = document.getElementById('start-button');

    loadingIndicator.style.display = 'block';
    sessionLengthContainer.style.display = 'none';
    startButton.style.display = 'none';

    try {
        const response = await fetch(`./words.json?cacheBust=${Date.now()}`);
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
    const playAgainButton = document.getElementById('play-again-button');
    const imageContainer = document.getElementById('image-container');
    const progressBar = document.getElementById('progress-bar');

    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    const gameContainer = document.querySelector('.game-container');

    startButton.onclick = () => {
        startScreen.style.display = 'none';
        playAgainButton.style.display = 'none';
        gameContainer.style.display = 'block';
        sessionLength = parseInt(sessionLengthSlider.value, 10);
        shuffleArray(wordList);
        sessionWords = wordList.slice(0, sessionLength);
        currentIndex = 0;
        totalWords = sessionWords.length;
        showWord();
    };

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
        imageContainer.innerHTML = ""; // prevent double image
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
            playAgainButton.style.display = "inline-block";
            updateProgressBar();
        } else {
            showWord();
        }
    }

    revealButton.onclick = revealPicture;
    nextButton.onclick = nextWord;
    playAgainButton.onclick = () => {
        document.querySelector('.game-container').style.display = 'none';
        document.getElementById('start-screen').style.display = 'block';
        playAgainButton.style.display = 'none';
    };
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

loadWords();
