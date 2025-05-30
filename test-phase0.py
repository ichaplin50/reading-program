import json

# Read and parse the rawWords.json file
with open('rawWords.json', 'r') as f:
    rawWords = json.load(f)

# Test 1: Check JSON structure
print('Test 1: JSON Structure')
print('---------------------')
print(f'Total words: {len(rawWords)}')
print(f"All objects have 'word' property: {all('word' in w for w in rawWords)}")
print(f"All objects have 'type' property: {all('type' in w for w in rawWords)}")
print(f"All types are arrays: {all(isinstance(w['type'], list) for w in rawWords)}")
print(f"All types have at least one value: {all(len(w['type']) > 0 for w in rawWords)}")

# Test 2: Check for duplicates
print('\nTest 2: Duplicate Check')
print('---------------------')
words = [w['word'] for w in rawWords]
uniqueWords = set(words)
print(f"Duplicate words found: {len(words) != len(uniqueWords)}")
if len(words) != len(uniqueWords):
    duplicates = [word for word in words if words.count(word) > 1]
    print('Duplicate words:', duplicates)

# Test 3: Check type categories
print('\nTest 3: Type Categories')
print('---------------------')
allTypes = set()
for word in rawWords:
    allTypes.update(word['type'])
print('All unique types:', sorted(list(allTypes)))

# Test 4: Compare with original wordList
print('\nTest 4: Compare with original wordList')
print('---------------------')
originalWords = [
    "Cat", "Dog", "Ball", "Car", "Ford", "Alien", "Bug", "Bee", "Jaguar", "Kia",
    "Deer", "Cow", "Bat", "Hat", "Pig", "Truck", "Person", "Zebra", "Lion", "Sloth",
    "Panda", "Frog", "Clam", "Box", "Book", "Lexus", "Honda", "Pacifica", "Boy", "Girl", "BMW"
]
rawWordsList = [w['word'] for w in rawWords]
missingWords = [w for w in originalWords if w not in rawWordsList]
extraWords = [w for w in rawWordsList if w not in originalWords]

print(f"Missing words: {missingWords if missingWords else 'None'}")
print(f"Extra words: {extraWords if extraWords else 'None'}") 