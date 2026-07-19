import { create } from 'zustand'
import type {
  GitHubUser,
  GitHubRepo,
  CommitActivity,
  LanguageStat,
  ContributionDay,
  Activity,
  StreakData,
  Theme,
  Goal,
} from '../types'
import { getSettings, saveSettings } from '../lib/storage'
import {
  fetchUser,
  fetchRepos,
  fetchCommitActivity,
  fetchLanguages,
  fetchContributions,
  fetchRecentActivity,
} from '../lib/github'
import { calculateStreak } from '../hooks/useStreak'

interface AppState {
  token: string | null
  user: GitHubUser | null
  repos: GitHubRepo[]
  commitActivity: CommitActivity[]
  languages: LanguageStat[]
  contributions: ContributionDay[]
  recentActivity: Activity[]
  streak: StreakData
  theme: Theme
  goals: Goal[]
  loading: boolean
  error: string | null

  setToken: (token: string) => void
  logout: () => void
  setTheme: (theme: Theme) => void
  setGoals: (goals: Goal[]) => void
  loadAllData: () => Promise<void>
}

export const useStore = create<AppState>((set, get) => ({
  token: localStorage.getItem('devboard_token'),
  user: null,
  repos: [],
  commitActivity: [],
  languages: [],
  contributions: [],
  recentActivity: [],
  streak: { current: 0, longest: 0, lastCommitDate: null },
  theme: getSettings().theme,
  goals: getSettings().goals,
  loading: false,
  error: null,

  setToken: (token: string) => {
    localStorage.setItem('devboard_token', token)
    set({ token, error: null })
  },

  logout: () => {
    localStorage.removeItem('devboard_token')
    set({
      token: null,
      user: null,
      repos: [],
      commitActivity: [],
      languages: [],
      contributions: [],
      recentActivity: [],
      streak: { current: 0, longest: 0, lastCommitDate: null },
    })
  },

  setTheme: (theme: Theme) => {
    const settings = getSettings()
    settings.theme = theme
    saveSettings(settings)
    set({ theme })
  },

  setGoals: (goals: Goal[]) => {
    const settings = getSettings()
    settings.goals = goals
    saveSettings(settings)
    set({ goals })
  },

  loadAllData: async () => {
    const { token } = get()
    if (!token) return

    set({ loading: true, error: null })

    try {
      const user = await fetchUser(token)
      const [repos, commitActivity, languages, contributions, recentActivity] =
        await Promise.all([
          fetchRepos(token),
          fetchCommitActivity(token, user.login),
          fetchLanguages(token, user.login),
          fetchContributions(token, user.login),
          fetchRecentActivity(token, user.login),
        ])

      const streak = calculateStreak(contributions)

      set({
        user,
        repos,
        commitActivity,
        languages,
        contributions,
        recentActivity,
        streak,
        loading: false,
      })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to load data',
        loading: false,
      })
    }
  },
}))
