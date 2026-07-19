# DevBoard

**Developer Productivity Dashboard** — Track your GitHub commits, streaks, languages, and productivity metrics in one beautiful dashboard.

## Why DevBoard

GitHub shows commits. WakaTime shows time. Neither shows everything together. DevBoard unifies your developer productivity data in a single, beautiful dashboard.

## Features

- **Commit Activity Graph** — Visualize your commit history over the past 12 weeks
- **Streak Tracker** — Track your current and longest commit streaks
- **Language Distribution** — See which languages you use most across your repos
- **Contribution Grid** — GitHub-style contribution calendar for the last year
- **Activity Feed** — Recent commits, PRs, issues, and reviews
- **Goals Tracker** — Set and track custom productivity goals
- **Dark/Light Theme** — Toggle between themes
- **Detailed Stats** — Top repos, member since, followers, stars breakdown

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React + TypeScript | UI framework |
| Vite | Build tool |
| Recharts | Data visualization |
| Zustand | State management |
| Tailwind CSS | Styling |
| date-fns | Date utilities |
| lucide-react | Icons |
| GitHub API | Real data |

## Getting Started

### Prerequisites

- Node.js 18+
- A GitHub Personal Access Token (repo + read:user scopes)

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

## How to Get a GitHub Token

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select `repo` and `read:user` scopes
4. Copy the generated token

## Project Structure

```
src/
├── components/
│   ├── ActivityFeed/      # Recent activity list
│   ├── CommitGraph/       # Bar chart of commits
│   ├── ContributionGrid/  # GitHub-style grid
│   ├── GoalsTracker/      # Custom goals
│   ├── LanguagePie/       # Language distribution pie chart
│   ├── Layout/            # App shell + navigation
│   ├── MetricsCard/       # Summary metric cards
│   ├── StreakCounter/     # Streak display
│   └── ThemeSwitcher/     # Dark/light toggle
├── hooks/
│   ├── useGitHub.ts       # GitHub auth + data hook
│   ├── useMetrics.ts      # Computed metrics
│   └── useStreak.ts       # Streak calculation
├── lib/
│   ├── github.ts          # GitHub API client
│   └── storage.ts         # LocalStorage persistence
├── pages/
│   ├── Dashboard.tsx      # Main dashboard
│   ├── Login.tsx          # Token input page
│   ├── Settings.tsx       # App settings
│   └── Stats.tsx          # Detailed statistics
├── store/
│   └── index.ts           # Zustand store
└── types/
    └── index.ts           # TypeScript types
```

## User Flow

1. **Login** — User enters GitHub Personal Access Token on `/`
2. **Dashboard** — Redirects to `/dashboard`, loads data from GitHub API (commits, repos, activity)
3. **Explore** — Navigate between Dashboard (overview), Stats (detailed), Settings (preferences)
4. **Track** — Set custom goals, monitor streaks, visualize contribution patterns
5. **Persist** — All settings and goals saved to LocalStorage, no backend needed

```
/ (Login) → /dashboard → /stats
                   ↓         ↓
              /settings   /settings
```

## Monetization Plan

### Tier Free
- Dashboard with basic metrics
- 30 days of history
- Dark/light theme
- 3 custom goals

### Tier Pro ($4/month)
- Unlimited history
- Advanced metrics & insights
- Data export (CSV/JSON)
- Customizable widgets
- API access for integrations
- Priority support

## Why Recruiters Will Notice

| Skill Demonstrated | How |
|-------------------|-----|
| API Integration | GitHub API real data |
| Data Visualization | Recharts graphs |
| OAuth / Auth Flow | Token-based auth |
| Local Storage | Client-side persistence |
| Component Architecture | Modular React components |
| State Management | Zustand store |
| TypeScript | Full type safety |
| Responsive Design | Mobile-first Tailwind |

## License

MIT
