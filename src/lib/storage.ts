import type { AppSettings, Goal } from '../types'

const STORAGE_KEY = 'devboard_settings'

const defaultSettings: AppSettings = {
  theme: 'dark',
  username: '',
  goals: [
    {
      id: '1',
      title: 'Commits this week',
      target: 20,
      current: 0,
      unit: 'commits',
      completed: false,
    },
    {
      id: '2',
      title: 'Streak goal',
      target: 30,
      current: 0,
      unit: 'days',
      completed: false,
    },
    {
      id: '3',
      title: 'PRs merged this month',
      target: 10,
      current: 0,
      unit: 'PRs',
      completed: false,
    },
  ],
}

export function getSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) }
    }
  } catch {
    // ignore
  }
  return defaultSettings
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function updateGoal(goalId: string, current: number): AppSettings {
  const settings = getSettings()
  settings.goals = settings.goals.map((g: Goal) =>
    g.id === goalId ? { ...g, current, completed: current >= g.target } : g
  )
  saveSettings(settings)
  return settings
}

export function addGoal(goal: Omit<Goal, 'id' | 'completed'>): AppSettings {
  const settings = getSettings()
  const newGoal: Goal = {
    ...goal,
    id: Date.now().toString(),
    completed: goal.current >= goal.target,
  }
  settings.goals = [...settings.goals, newGoal]
  saveSettings(settings)
  return settings
}

export function removeGoal(goalId: string): AppSettings {
  const settings = getSettings()
  settings.goals = settings.goals.filter((g: Goal) => g.id !== goalId)
  saveSettings(settings)
  return settings
}
