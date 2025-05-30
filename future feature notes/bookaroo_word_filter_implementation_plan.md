# 📚 Bookaroo – Word Characteristics Filter Implementation Plan

This plan breaks the feature into modular, testable steps so you can build incrementally and validate functionality at every stage.

---

## 🧩 Phase 0: Prep and Baseline

### ✅ Step 0.1 — Add `rawWords.json`
Create a minimal version of your word list:
```json
[
  { "word": "Cat", "image": "images/cat.jpg", "type": ["animal"] },
  { "word": "Truck", "image": "images/truck.jpg", "type": ["car"] }
]
```
💡 Tip: Just use 5–10 words at first to keep testing fast.

---

## ⚙️ Phase 1: Tag Generation and Data Layer

### ✅ Step 1.1 — Implement `generate-tags.js`
Node.js script that:
- Loads `rawWords.json`
- Adds:
  - `letters` from the word string
  - `phonics` from a predefined phonics list
- Writes `words.json`

### ✅ Step 1.2 — Test output
- Confirm `words.json` is correctly generated and complete
- Validate that phonics and letters are computed as expected

---

## 💻 Phase 2: Load and Display Filtered Words

### ✅ Step 2.1 — Update `script.js` to load `words.json`
- Use `fetch()` to load the word data asynchronously
- Display 10 random words as before (from filtered pool if applicable)

### ✅ Step 2.2 — Build simple `filterWords(filters, words)` function
- Start with one filter (e.g., `type`)
- Hardcode a `filters` object temporarily:
```js
const filters = { type: ["animal"], letters: [], phonics: [] };
```
- Ensure only matching words are displayed in-game

---

## 🎛 Phase 3: UI for Customize Words Screen

### ✅ Step 3.1 — Add `<div id="customize-screen">` to `index.html`
- Hide by default, toggle via:
```js
showScreen("customize-screen");
```

### ✅ Step 3.2 — Add checkboxes for `type` category only
- Generate dynamically based on distinct values in `words.json`
- Add “Back” button to return to Start

### ✅ Step 3.3 — Connect checkboxes to filter logic
- Update `filters.type` in real time
- Display matching word count below

---

## 📐 Phase 4: Slider + Validation Logic

### ✅ Step 4.1 — Update session length slider on Customize screen
- Dynamically cap `max` value based on current matching words

### ✅ Step 4.2 — Add validation guard
- If no words match, disable Start Game button or show warning

---

## 🧠 Phase 5: Add More Categories

### ✅ Step 5.1 — Add UI for `letters` filter
### ✅ Step 5.2 — Add UI for `phonics` filter
- Add Select All / Deselect All per section
- Use `filterWords()` with AND logic across all categories

---

## 🎮 Phase 6: Integrate with Game Flow

### ✅ Step 6.1 — When user clicks “Start Game”:
- Use current filter state to generate the session word list
- Pass filtered words into game engine
- Start game as usual from `index.html`

---

## 📈 Phase 7 (Optional Later): Enhancements

- Persist filters via `localStorage`
- Add visual polish and animations
- Add difficulty tagging
- Add analytics hooks (e.g., filter usage, session length)

---

## 🧪 After Each Step: What to Test

| Step | What to Test |
|------|---------------|
| 1.2 | Output of `generate-tags.js` |
| 2.2 | Are filters working (even if hardcoded)? |
| 3.3 | Do UI selections update filtered pool in real time? |
| 4.2 | Are edge cases (0 words) gracefully handled? |
| 6.1 | Is gameplay using filtered words properly? |
