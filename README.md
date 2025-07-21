# Redeemer's Task Manager 📝

A sleek Electron-based task manager that actually works! Built with React and styled with Tailwind CSS because why not make productivity look good? 😎

## What's This? 🤔

This is a simple but effective desktop task manager app. No fancy cloud sync, no subscription fees, just pure local task management goodness. Perfect for when you need to get stuff done without all the bloat.

## Features ✨

- ➕ Add tasks (obviously)
- 🗑️ Delete tasks when you're done (or gave up)
- ⬆️⬇️ Reorder tasks by moving them up/down
- 💾 Auto-saves everything locally (no internet required!)
- 🎨 Clean, dark theme that won't hurt your eyes
- 📱 Custom window controls (because default ones are boring)
- 🔄 Persistent storage - your tasks survive app restarts

## Built With 🛠️

- **Electron** - For that native desktop feel
- **React** - Because components are life
- **Tailwind CSS** - Making things pretty without the CSS headaches
- **Vite** - Fast builds, faster development
- **Lucide React** - Icons that don't suck

## Getting Started 🚀

### Prerequisites
- Node.js (obviously)
- npm or yarn or pnpm (whatever floats your boat)

### Installation

1. Clone this bad boy:
```bash
git clone <your-repo-url>
cd task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start developing:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Building Distributables 📦

Want to share this with friends? Here's how:

### Windows 🪟
```bash
npm run build:win
```
#### Or you can save your time and just download the release [here](https://github.com/MustafaMohammed141/Redeemer-s-Task-manager/releases/)

### macOS 🍎
```bash
npm run build:mac
```

### Linux 🐧
```bash
npm run build:linux
```

## How It Works 🔧

- Tasks are stored in a local JSON file (`tasks.tsk`) in your user data directory
- The main process handles all file operations and database stuff
- The renderer process (React) handles the UI and user interactions
- IPC (Inter-Process Communication) bridges everything together

## Customization 🎨

Want to make it your own? Here are some ideas:

- Change the color scheme in the Tailwind classes
- Add new task properties (priority, due dates, etc.)
- Implement categories or tags
- Add keyboard shortcuts
- Create different themes

## Known Issues 🐛

- The input field styling could be better (PRs welcome!)
- No drag-and-drop reordering yet (but the up/down buttons work fine)
- Window controls might look weird on some Linux distributions

## Contributing 🤝

Found a bug? Want to add a feature? Just:
1. Fork it
2. Create a branch
3. Make your changes
4. Submit a PR

Keep it simple, keep it clean! 

## License 📄

Do whatever you want with this code. It's yours now! 🎉

---

Built with ❤️ and probably too much coffee ☕
