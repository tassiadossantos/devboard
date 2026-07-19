import { useMemo } from 'react'
import { useStore } from '../store'

export function useMetrics() {
  const { commitActivity, repos, streak, languages, contributions } = useStore()

  const totalCommits = useMemo(() => {
    return commitActivity.reduce((sum, week) => sum + week.total, 0)
  }, [commitActivity])

  const commitsThisWeek = useMemo(() => {
    if (commitActivity.length === 0) return 0
    const latest = commitActivity[commitActivity.length - 1]
    return latest?.total || 0
  }, [commitActivity])

  const commitsThisMonth = useMemo(() => {
    const last4 = commitActivity.slice(-4)
    return last4.reduce((sum, week) => sum + week.total, 0)
  }, [commitActivity])

  const totalStars = useMemo(() => {
    return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  }, [repos])

  const totalForks = useMemo(() => {
    return repos.reduce((sum, repo) => sum + repo.forks_count, 0)
  }, [repos])

  const topLanguage = useMemo(() => {
    if (languages.length === 0) return 'N/A'
    return languages[0].name
  }, [languages])

  const contributionsThisWeek = useMemo(() => {
    const now = new Date()
    const weekAgo = new Date(now)
    weekAgo.setDate(weekAgo.getDate() - 7)
    return contributions
      .filter((d) => new Date(d.date) >= weekAgo)
      .reduce((sum, d) => sum + d.count, 0)
  }, [contributions])

  return {
    totalCommits,
    commitsThisWeek,
    commitsThisMonth,
    totalStars,
    totalForks,
    topLanguage,
    streak,
    contributionsThisWeek,
    totalRepos: repos.length,
  }
}
