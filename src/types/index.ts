export interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

export interface CommitActivity {
  week: number
  total: number
  days: number[]
}

export interface LanguageStat {
  name: string
  value: number
  color: string
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface Activity {
  id: string
  type: 'commit' | 'pr' | 'issue' | 'review'
  repo: string
  title: string
  date: string
  url: string
}

export interface StreakData {
  current: number
  longest: number
  lastCommitDate: string | null
}

export interface Goal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  completed: boolean
}

export type Theme = 'dark' | 'light'

export interface AppSettings {
  theme: Theme
  username: string
  goals: Goal[]
}
