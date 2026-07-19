<p align="center">
  <img src="public/favicon.svg" width="100" alt="DevBoard Logo"/>
</p>

<h1 align="center">DevBoard</h1>

<p align="center">
  <strong>Developer Productivity Dashboard</strong><br/>
  Track your GitHub commits, streaks, languages & metrics in one beautiful interface.
</p>

<p align="center">
  <a href="https://github.com/tassiadossantos/devboard">
    <img src="https://img.shields.io/github/stars/tassiadossantos/devboard?style=social" alt="Stars"/>
  </a>
  <a href="https://github.com/tassiadossantos/devboard/fork">
    <img src="https://img.shields.io/github/forks/tassiadossantos/devboard?style=social" alt="Forks"/>
  </a>
  <a href="https://github.com/tassiadossantos/devboard/issues">
    <img src="https://img.shields.io/github/issues/tassiadossantos/devboard" alt="Issues"/>
  </a>
  <a href="https://github.com/tassiadossantos/devboard/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/tassiadossantos/devboard" alt="License"/>
  </a>
</p>

---

## Why DevBoard?

GitHub shows commits. WakaTime shows time. Neither shows everything together.

DevBoard unifies your developer productivity data in a single, beautiful dashboard — so you can focus on shipping code, not juggling tabs.

## Features

| Feature | Description |
|---------|-------------|
| **Commit Activity Graph** | Visualize your commit history over the past 12 weeks |
| **Streak Tracker** | Monitor current and longest commit streaks |
| **Language Distribution** | Pie chart of languages across your repositories |
| **Contribution Grid** | GitHub-style contribution calendar for the last year |
| **Activity Feed** | Recent commits, PRs, issues, and code reviews |
| **Goals Tracker** | Set and track custom productivity goals |
| **Dark/Light Theme** | Toggle between themes |
| **Detailed Stats** | Top repos, member since, followers, and stars breakdown |

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge" alt="Recharts"/>
  <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge" alt="Zustand"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/date--fn-062312?style=for-the-badge" alt="date-fns"/>
</p>

## Getting Started

### Prerequisites

- **Node.js** 18+ 
- **GitHub Personal Access Token** ([generate here](https://github.com/settings/tokens/new?scopes=repo,read:user))

### Installation

```bash
# Clone the repository
git clone https://github.com/tassiadossantos/devboard.git

# Navigate to the project
cd devboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Architecture

```
src/
├── components/          # Reusable UI components
│   ├── ActivityFeed/    # Recent activity list
│   ├── CommitGraph/     # Bar chart of commits
│   ├── ContributionGrid/# GitHub-style grid
│   ├── GoalsTracker/    # Custom goals
│   ├── LanguagePie/     # Language distribution
│   ├── Layout/          # App shell + navigation
│   ├── Logo/            # Brand logo
│   ├── MetricsCard/     # Summary metric cards
│   ├── StreakCounter/   # Streak display
│   └── ThemeSwitcher/   # Dark/light toggle
├── hooks/               # Custom React hooks
├── lib/                 # API clients & utilities
├── pages/               # Route components
├── store/               # Zustand state management
└── types/               # TypeScript definitions
```

## Monetization Plan

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | Dashboard, 30-day history, dark/light theme, 3 goals |
| **Pro** | $4/mo | Unlimited history, advanced metrics, data export, custom widgets, API access |

## Skills Demonstrated

| Skill | Implementation |
|-------|----------------|
| API Integration | GitHub REST API |
| Data Visualization | Recharts |
| Authentication | Token-based auth flow |
| State Management | Zustand |
| Type Safety | Full TypeScript |
| Styling | Tailwind CSS |
| Persistence | LocalStorage |

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m "feat: add amazing feature"

# Push to the branch
git push origin feature/amazing-feature

# Open a Pull Request
```

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with passion by <a href="https://github.com/tassiadossantos">Tassio Santos</a>
</p>
