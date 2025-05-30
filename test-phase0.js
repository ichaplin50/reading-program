const fs = require('fs');

// Read and parse the rawWords.json file
const rawWords = JSON.parse(fs.readFileSync('rawWords.json', 'utf8'));

// Test 1: Check JSON structure
console.log('Test 1: JSON Structure');
console.log('---------------------');
console.log(`Total words: ${rawWords.length}`);
console.log(`All objects have 'word' property: ${rawWords.every(w => 'word' in w)}`);
console.log(`All objects have 'type' property: ${rawWords.every(w => 'type' in w)}`);
console.log(`All types are arrays: ${rawWords.every(w => Array.isArray(w.type))}`);
console.log(`All types have at least one value: ${rawWords.every(w => w.type.length > 0)}`);

// Test 2: Check for duplicates
console.log('\nTest 2: Duplicate Check');
console.log('---------------------');
const words = rawWords.map(w => w.word);
const uniqueWords = new Set(words);
console.log(`Duplicate words found: ${words.length !== uniqueWords.size}`);
if (words.length !== uniqueWords.size) {
    const duplicates = words.filter((word, index) => words.indexOf(word) !== index);
    console.log('Duplicate words:', duplicates);
}

// Test 3: Check type categories
console.log('\nTest 3: Type Categories');
console.log('---------------------');
const allTypes = new Set(rawWords.flatMap(w => w.type));
console.log('All unique types:', Array.from(allTypes).sort());

// Test 4: Compare with original wordList
console.log('\nTest 4: Compare with original wordList');
console.log('---------------------');
const originalWords = [
    "Cat", "Dog", "Ball", "Car", "Ford", "Alien", "Bug", "Bee", "Jaguar", "Kia",
    "Deer", "Cow", "Bat", "Hat", "Pig", "Truck", "Person", "Zebra", "Lion", "Sloth",
    "Panda", "Frog", "Clam", "Box", "Book", "Lexus", "Honda", "Pacifica", "Boy", "Girl", "BMW"
];
const rawWordsList = rawWords.map(w => w.word);
const missingWords = originalWords.filter(w => !rawWordsList.includes(w));
const extraWords = rawWordsList.filter(w => !originalWords.includes(w));

console.log(`Missing words: ${missingWords.length ? missingWords : 'None'}`);
console.log(`Extra words: ${extraWords.length ? extraWords : 'None'}`); 