// generate-tags.js

const fs = require('fs');

// Sample phonics list – customize as needed
const phonicsList = ["oo", "th", "ee", "aw", "ough", "ch", "sh", "ai", "ou","ck","ch"];

// Helper to get unique letters from word
function getLetters(word) {
    return Array.from(new Set(word.toLowerCase().split('')));
}

// Helper to get matching phonics
function getPhonics(word) {
    const found = [];
    const lower = word.toLowerCase();
    for (const phoneme of phonicsList) {
        if (lower.includes(phoneme)) {
            found.push(phoneme);
        }
    }
    return found;
}

// Load raw words
const rawWords = require('./rawWords.json');

// Enrich each word with auto-generated tags
const enrichedWords = rawWords.map(w => ({
    ...w,
    image: `images/${w.word.toLowerCase()}.jpg`,
    letters: getLetters(w.word),
    phonics: getPhonics(w.word)
}));

// Write to words.json
fs.writeFileSync('words.json', JSON.stringify(enrichedWords, null, 2));
console.log("✅ words.json has been generated with image paths, letters, and phonics.");
