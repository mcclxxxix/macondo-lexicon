# 🦋 Macondo Lexicon

**A Literary Vocabulary Coach — Inspired by Gabriel García Márquez**

An interactive React app for learning Spanish literary vocabulary drawn from the world of *One Hundred Years of Solitude*. Features flashcards with Web Speech API pronunciation, quizzes, a browsable lexicon, and periodic Márquez quotes delivered every 2 minutes.

---

## Features

- **Flashcards** — Tap-to-reveal cards with word, definition, example sentence, and audio pronunciation via Web Speech API
- **Quiz Mode** — Three question types: definition match, sentence fill-in, and reverse lookup
- **Browse Lexicon** — Filter by difficulty (beginner/intermediate/advanced) and category (Emotion, Nature, Supernatural, etc.)
- **Mastery Tracking** — Mark words as mastered; track your quiz score across sessions
- **Márquez Line Prompt** — Every 2 minutes, the app asks if you'd like a Márquez quote. Say yes and receive one of 20 curated lines in an elegant modal. Also available on-demand from the home screen.
- **Audio Pronunciation** — Hear any word or sentence read aloud in Spanish using the browser's built-in speech synthesis

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ and npm (or yarn/pnpm)

### 1. Create a new React project

```bash
npx create-react-app macondo-lexicon
cd macondo-lexicon
```

Or with Vite (recommended — faster):

```bash
npm create vite@latest macondo-lexicon -- --template react
cd macondo-lexicon
npm install
```

### 2. Add the component

Replace the contents of your main component file with the app source:

**If using Vite:**
```bash
# Delete the default App files
rm src/App.jsx src/App.css

# Copy the component in
cp /path/to/marquez-vocab-coach.jsx src/App.jsx
```

**If using Create React App:**
```bash
rm src/App.js src/App.css
cp /path/to/marquez-vocab-coach.jsx src/App.js
```

### 3. Update the entry point

Make sure your `src/main.jsx` (Vite) or `src/index.js` (CRA) imports and renders the default export:

**Vite — `src/main.jsx`:**
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**CRA — `src/index.js`:**
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 4. Run it

```bash
npm run dev    # Vite
# or
npm start      # Create React App
```

Open [http://localhost:5173](http://localhost:5173) (Vite) or [http://localhost:3000](http://localhost:3000) (CRA).

---

## Push to GitHub

### First time setup

```bash
# Initialize git (skip if already done by create-react-app/vite)
git init

# Stage all files
git add .

# Commit
git commit -m "Initial commit: Macondo Lexicon vocabulary coach"

# Create a repo on GitHub (via github.com or the CLI)
gh repo create macondo-lexicon --public --source=. --push

# Or manually add the remote and push:
git remote add origin https://github.com/YOUR_USERNAME/macondo-lexicon.git
git branch -M main
git push -u origin main
```

### Subsequent updates

```bash
git add .
git commit -m "describe your changes"
git push
```

---

## Deploy (Optional)

### GitHub Pages (with Vite)

```bash
npm install --save-dev gh-pages
```

Add to `vite.config.js`:
```js
export default defineConfig({
  base: '/macondo-lexicon/',
  plugins: [react()],
})
```

Add to `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Then run:
```bash
npm run deploy
```

Your app will be live at `https://YOUR_USERNAME.github.io/macondo-lexicon/`.

---

## Project Structure

```
macondo-lexicon/
├── src/
│   ├── App.jsx          ← The entire app (single-file component)
│   └── main.jsx         ← Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Customization

**Add more vocabulary:** Edit the `VOCAB_LIBRARY` array in `App.jsx`. Each entry needs:
```js
{
  word: "YourWord",
  definition: "The definition",
  sentence: "An example sentence using YourWord.",
  difficulty: "beginner" | "intermediate" | "advanced",
  category: "Emotion" | "Nature" | "Place" | etc.
}
```

**Add more Márquez quotes:** Append strings to the `MARQUEZ_LINES` array.

**Change the prompt interval:** Modify the `2 * 60 * 1000` value (milliseconds) in `startMarquezTimer`.

---

## Tech Stack

- React 18+ (hooks only, no class components)
- Web Speech API for Spanish pronunciation
- Pure inline styles — no CSS framework dependencies
- Google Fonts: Playfair Display + EB Garamond

---

## License

MIT

---

*"What matters in life is not what happens to you but what you remember and how you remember it."*
— Gabriel García Márquez
