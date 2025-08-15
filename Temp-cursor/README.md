# 🎯 Number Guessing Game - React Edition

A beautiful, modern, and engaging React-based number guessing game with stunning animations, multiple difficulty levels, and a delightful user experience!

## ✨ Features

- 🎨 **Beautiful UI/UX** - Modern design with gradients, shadows, and smooth animations
- 🚀 **Smooth Animations** - Powered by Framer Motion for engaging interactions
- 🎯 **Multiple Difficulty Levels** - Easy, Normal, and Hard modes
- 📊 **Game History** - Track your performance across multiple games
- 🔥 **Smart Hints** - Get helpful feedback based on how close you are
- 📱 **Responsive Design** - Works perfectly on all devices
- ♿ **Accessibility** - Keyboard navigation and screen reader support
- 🌈 **Visual Feedback** - Color-coded messages and animated icons

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **CSS3** - Modern CSS with custom properties and animations
- **Responsive Design** - Mobile-first approach

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone or download** the project files to your local machine

2. **Open terminal/command prompt** in the project directory

3. **Install dependencies**:
   ```bash
   npm install
   ```
   or if you use yarn:
   ```bash
   yarn install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```
   or with yarn:
   ```bash
   yarn start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🎮 How to Play

1. **Choose Difficulty**:
   - **Easy**: Numbers 1-50, 12 attempts
   - **Normal**: Numbers 1-100, 10 attempts  
   - **Hard**: Numbers 1-200, 8 attempts

2. **Make Your Guess**: Enter a number within the range and click "Guess!"

3. **Get Hints**: The game will tell you if your guess is too high, too low, or getting warm

4. **Win or Lose**: Find the number before running out of attempts!

## 📁 Project Structure

```
number-guessing-game/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── App.js              # Main React component
│   ├── App.css             # Component styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🎨 Customization

### Colors and Themes
The app uses CSS custom properties (variables) for easy theming. Edit `src/index.css` to change:
- Primary colors
- Gradients
- Shadows
- Animations

### Difficulty Settings
Modify the `difficulties` object in `src/App.js` to:
- Change number ranges
- Adjust attempt limits
- Add new difficulty levels

### Animations
Customize animations by editing:
- Framer Motion properties in React components
- CSS keyframes in `src/index.css`
- Transition timings and easing

## 🚀 Build for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build/` folder that you can deploy to any static hosting service.

## 🌐 Deployment

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Deploy automatically on every push

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

### GitHub Pages
1. Add `"homepage": "https://yourusername.github.io/repository-name"` to package.json
2. Run `npm run build`
3. Deploy the `build/` folder to GitHub Pages

## 🔧 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Kill the process using port 3000
npx kill-port 3000
# Or use a different port
PORT=3001 npm start
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Clear build cache
npm run build -- --reset-cache
```

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Framer Motion** for amazing animations
- **Lucide** for beautiful icons
- **React team** for the amazing framework
- **CSS community** for modern styling techniques

---

**Enjoy playing the Number Guessing Game! 🎉**

If you have any questions or need help, feel free to open an issue or reach out!
