# ✨ Quizy — Next-Gen Interactive Online Quiz Platform

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-Synthesizer-6366f1?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-success?style=for-the-badge)](package.json)

> **Quizy** is a modern, high-octane online quiz platform featuring unique CSS fonts, glassmorphic styling, high-resolution imagery, smooth 3D sliding transitions, combo streak multipliers, in-browser sound effects, and instant certificate generation.

---

## 📸 Visual Showcase & Previews

| 🌌 Hero Carousel & Arena | ⚡ 3D Sliding Question View |
| :---: | :---: |
| ![Hero Carousel Banner](https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=80) | ![Tech & AI Arena](https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80) |
| *Auto-sliding featured challenges & category selector* | *3D perspective question cards with radial countdown timer* |

| 🌍 World Wonders & Geography | 🎮 Gaming & Cyber Lore |
| :---: | :---: |
| ![World Wonders](https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80) | ![Cyber Worlds](https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=700&q=80) |
| *High-res photography & trivia for all questions* | *Rich questions with instant feedback and trivia breakdowns* |

---

## ☁️ Deploy as a live app on Vercel

**Live app:** [https://quizy-tn5h.vercel.app](https://quizy-tn5h.vercel.app)

Quizy is a static HTML/CSS/JavaScript app, so Vercel can host it without a server or build step. The included `vercel.json` configures Vercel to serve the project root, where `index.html` and the app assets live. After pushing this project to GitHub:

1. Sign in at [Vercel](https://vercel.com/) and choose **Add New → Project**.
2. Import the `ashikaup16/Quizy` GitHub repository and authorize access if prompted.
3. Keep the project **Root Directory** at the repository root. The Vercel configuration selects **Other**, requires no build command, and serves the project root.
4. Choose **Deploy**. Vercel will provide a public URL for the live app.

After setup, Vercel automatically updates the live deployment when you push changes to the production branch. You do not need to keep your computer or a terminal running.

## 🚀 Quickstart & Localhost Commands

### 🖱️ Open without a terminal (Windows)
If Node.js is installed, double-click **`Open Quizy.vbs`** in the project folder. It starts the local server in the background and opens Quizy in your default browser. If Quizy is already running, it just opens the existing page.

### 🔗 Localhost URL
Once running, open your web browser and go to:
👉 **[http://localhost:8080](http://localhost:8080)**

---

### 💻 Terminal Commands

#### Option A: Quickstart via NPM / Node (Recommended)
Open your terminal (PowerShell or Command Prompt) and run:
```bash
# Navigate to the project directory
cd C:\Users\ashik\Downloads\Quizy

# Start the local server
npm start
```
*(Server will launch at `http://localhost:8080`)*

#### Option B: Direct Node Execution
```bash
node server.js
```

#### Option C: Direct Browser Launch (Zero-Setup)
You can also launch `index.html` directly in your browser without any server:
```powershell
start index.html
```

#### Option D: Using NPX Serve
```bash
npx serve .
```

---

## 🌟 Core Features

### 1. 🎨 Unique CSS Fonts & Glassmorphism Styling
- **Typography Pairing**: Handcrafted Google Fonts — [Outfit](https://fonts.google.com/specimen/Outfit) for modern headings, [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for ultra-crisp readable body text, and [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) for numbers and countdown clocks.
- **Glassmorphism Design**: High-end `backdrop-filter: blur(16px)` panels, neon glow borders, vibrant multi-stop gradients, and ambient lighting.
- **Dark & Light Mode**: Seamless theme toggle with state persisted in `localStorage`.

### 2. 🚀 Sliding Features & Dynamic Animations
- **Featured Hero Carousel**: Auto-sliding banner with pause-on-hover, previous/next controls, dot indicators, and mobile swipe/touch gestures.
- **3D Sliding Question Cards**: Smooth perspective sliding transitions (`slideInFromRight`, `slideOutToLeft`) between quiz questions.
- **Question-by-Question Review Slider**: Post-game interactive slider allowing players to slide through all past questions, see what they answered, inspect the correct answers, and read deep-dive trivia.
- **Slide-out Hall of Fame Leaderboard**: Sleek off-canvas sliding drawer showing the top ranks, scores, accuracy rates, and badges.

### 3. 📸 Curated Photos & Thematic Visuals
- High-definition visual imagery for every quiz category (*Space & Cosmos*, *Technology & AI*, *World Geography & Wonders*, *Cinema & Pop Culture*, *Gaming & Cyber Worlds*, *Science & Nature*).
- Rich visual question banners paired with real-world questions.

### 4. ⚡ Scoring & Gamification Engine
- **Combo Streak Multipliers**: Build streaks (🔥 2x, 3x, 4x) for bonus point acceleration.
- **Time-Bonus Points**: Speed rewards faster correct answers.
- **Circular SVG Countdown Timer**: Animated radial countdown with warning pulses under 5 seconds.
- **Circular Animated Accuracy Gauge**: Post-quiz radial SVG score meter with counting numbers.
- **Lifelines**:
  - `50:50`: Automatically eliminates two incorrect choices.
  - `Hint`: Reveals tactical trivia clues.
  - `Freeze Time`: Adds +15 seconds to the countdown clock.
- **Interactive Confetti Engine**: Zero-dependency 2D canvas physics simulation bursting confetti on victories.
- **Web Audio API Synthesizer**: Native in-browser audio engine generating victory fanfares, correct chimes, wrong buzzers, lifeline whooshes, and timer ticks.

### 5. 📜 Verified Certificate Generator
- Built-in HTML5 Canvas generator that creates and downloads a **Certificate of Achievement (PNG)** displaying the player's name, category, accuracy %, total score, date, and verified citation badge.

### 6. ➕ Custom Quiz Creator
- Allows users to create their own custom quizzes with custom titles, emojis, cover photos, questions, and trivia explanations, saved directly to `localStorage`.

---

## 📂 Project Directory Structure

```
Quizy/
├── index.html             # Semantic HTML5 layout with carousel, HUD & review drawers
├── server.js              # Lightweight zero-dependency Node static web server
├── Open Quizy.vbs         # Windows one-click launcher (starts server hidden)
├── package.json           # Project manifest with npm start command
├── README.md              # Detailed documentation, commands, and previews
├── css/
│   └── style.css          # Design system, glassmorphism, 3D sliding transitions & theme
└── js/
    ├── quiz-data.js       # Curated question banks, categories, hints & explanations
    ├── audio.js           # Web Audio API sound synthesizer
    ├── confetti.js        # Canvas particle celebration engine
    └── app.js             # Platform controller, sliding carousel, timer, lifelines & score
```

---

## 📄 License
Released under the [ISC License](LICENSE). Built for learning and trivia excellence!
