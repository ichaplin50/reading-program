import json
import os

# Load words.json
with open('words.json', 'r') as f:
    words = json.load(f)

# Test 1: Structure
print('Test 1: Structure')
print('-------------------')
fields = ['word', 'type', 'image', 'letters', 'phonics']
for field in fields:
    assert all(field in w for w in words), f"Missing '{field}' in some entries"
print('All required fields are present.')

# Test 2: Letters correctness
print('\nTest 2: Letters')
print('-------------------')
for w in words:
    expected_letters = sorted(set(w['word'].lower()))
    actual_letters = sorted(w['letters'])
    assert actual_letters == expected_letters, f"Letters mismatch for {w['word']}: {actual_letters} != {expected_letters}"
print('All letters arrays are correct.')

# Test 3: Phonics is a list
print('\nTest 3: Phonics')
print('-------------------')
assert all(isinstance(w['phonics'], list) for w in words), "Phonics is not a list for some entries"
print('All phonics fields are lists.')

# Test 4: Image path format
print('\nTest 4: Image Path')
print('-------------------')
for w in words:
    expected_path = f"images/{w['word'].lower()}.jpg"
    assert w['image'] == expected_path, f"Image path mismatch for {w['word']}: {w['image']} != {expected_path}"
print('All image paths are correct.')

# Test 5: No data loss
print('\nTest 5: Data Loss')
print('-------------------')
with open('rawWords.json', 'r') as f:
    raw_words = json.load(f)
raw_word_set = set(w['word'] for w in raw_words)
words_set = set(w['word'] for w in words)
assert raw_word_set == words_set, f"Mismatch between rawWords and words.json: {raw_word_set ^ words_set}"
print('No data loss: all words are present.')

print('\nAll tests passed!') 