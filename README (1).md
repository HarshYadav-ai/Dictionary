# 📖 Lexicon — Dictionary Web App

A clean, responsive dictionary web app built with **vanilla HTML, CSS, and JavaScript**. Search any English word to get definitions, phonetics, example sentences, and audio pronunciation — all without any frameworks or backends.

---

## 🚀 Live Demo

> Open `index.html` in your browser — no installation required.

---

## ✨ Features

- 🔍 **Instant Word Search** — Fetches real-time definitions from the Free Dictionary API
- 🔊 **Audio Pronunciation** — Listen to how a word is pronounced with one click
- 📝 **Multiple Definitions** — Shows all meanings grouped by part of speech (noun, verb, adjective, etc.)
- 💬 **Example Sentences** — Displays real usage examples for each definition
- ⭐ **Save Words** — Bookmark your favourite words using LocalStorage (persists after page refresh)
- 🗑️ **Remove Saved Words** — Delete bookmarks from your saved list anytime
- 😕 **Not Found Page** — Friendly error page if a word doesn't exist in the dictionary
- 📱 **Responsive Design** — Works smoothly on desktop and mobile browsers

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure and layout |
| CSS3 | Styling, animations, responsive design |
| JavaScript (ES5/ES6) | App logic, DOM manipulation, API calls |
| [Free Dictionary API](https://dictionaryapi.dev/) | Word definitions, phonetics, audio |
| LocalStorage | Saving and persisting bookmarked words |

---

## 📁 Project Structure

```
dictionary-app/
│
├── index.html       # Main HTML file — all 4 pages (Home, Definition, Bookmarks, Not Found)
├── style.css        # All styles and animations
└── script.js        # All app logic, API calls, and event handlers
```

---

## 🖥️ Pages

| Page | Description |
|---|---|
| **Home** | Search bar to look up any word |
| **Definition** | Shows word meaning, phonetic, audio, and examples |
| **Saved Words** | List of all bookmarked words with quick access |
| **Not Found** | Shown when the searched word doesn't exist |

---

## ⚙️ How It Works

1. User types a word and clicks **Search** (or presses Enter)
2. App checks LocalStorage — if already saved, loads from cache instantly
3. Otherwise, calls the **Free Dictionary API**:
   ```
   GET https://api.dictionaryapi.dev/api/v2/entries/en/{word}
   ```
4. Response is parsed and rendered on the Definition page
5. User can **Save** the word — stored in LocalStorage for offline access
6. All saved words are accessible from the **My Saved Words** page

---

## 🔧 Getting Started

No setup or installation needed. Just clone and open:

```bash
# Clone the repository
git clone https://github.com/your-username/dictionary-app.git

# Navigate into the folder
cd dictionary-app

# Open in browser
open index.html
```

Or simply **download the ZIP** and open `index.html` directly in any modern browser.

---

## 📸 Screenshots

> *(Add screenshots of your app here)*

| Home Page | Definition Page | Saved Words |
|---|---|---|
| ![Home](screenshots/home.png) | ![Definition](screenshots/definition.png) | ![Saved](screenshots/saved.png) |

---

## 🌐 API Reference

This project uses the free and open-source [Free Dictionary API](https://dictionaryapi.dev/).

- **No API key required**
- **Base URL:** `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- Returns: definitions, phonetics, audio URLs, part of speech, example sentences

---

## 💡 What I Learned

- Fetching and handling data from a public REST API using `fetch()`
- Dynamically building and injecting HTML using JavaScript
- Managing app state and multi-page navigation without a framework
- Persisting user data across sessions using `localStorage`
- Handling edge cases like network errors and missing API data

---

## 🔮 Future Improvements

- [ ] Search history on the home page
- [ ] Dark mode toggle
- [ ] Synonyms and antonyms section
- [ ] Export saved words as PDF or CSV
- [ ] Word of the Day on the home screen

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)

---

> ⭐ If you found this project helpful, please give it a star on GitHub!
