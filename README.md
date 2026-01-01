# 🎲 Dicee Challenge - Neon Arena

A modern, interactive dice game built with vanilla JavaScript, HTML, and CSS. Two players roll dice and compete to see who gets the higher number. Features a futuristic neon-themed UI with animations, sound effects, and confetti celebrations.

## ✨ Features

- 🎨 **Modern Neon UI** - Futuristic glass-morphism design with neon accents
- 🎯 **Interactive Gameplay** - Click the ROLL button or press Spacebar to roll dice
- 🎊 **Confetti Animation** - Celebratory confetti burst when a player wins
- 🔊 **Sound Effects** - Synthesized roll and win sounds (toggleable mute button)
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- ⌨️ **Keyboard Support** - Press Spacebar to roll the dice
- 💾 **Persistent Settings** - Mute preference saved in localStorage

## 🚀 Quick Start

### Option 1: Direct Browser
Simply open `dicee.html` in your web browser.

### Option 2: Local Server (Recommended)
Run a local server to avoid any CORS restrictions:

**Using Python:**
```bash
python -m http.server 8000
```
Then open `http://localhost:8000/dicee.html` in your browser.

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

## 📁 Project Structure

```
Dicee+Challenge+-+Starting+Files/
│
├── dicee.html          # Main HTML file
├── dice.js             # Game logic and animations
├── styles.css          # Styling and responsive design
├── images/             # Dice images (dice1.png - dice6.png)
└── README.md           # This file
```

## 🎮 How to Play

1. Open `dicee.html` in your browser
2. Click the **ROLL** button or press **Spacebar**
3. Watch the dice roll with shake animations
4. The player with the higher number wins!
5. Enjoy the confetti celebration and sound effects

## 🛠️ Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, animations, and responsive design
- **Vanilla JavaScript** - Game logic, DOM manipulation, and Web Audio API
- **Canvas API** - Confetti particle effects

## 📱 Browser Compatibility

Works on all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- Web Audio API
- Canvas API

## 🎨 Customization

The game uses CSS custom properties (variables) in `styles.css` for easy theming:
- `--accent`: Primary neon color (cyan)
- `--accent-2`: Secondary neon color (purple)
- `--bg-1` & `--bg-2`: Background gradient colors

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

**Enjoy the game! 🎲**
