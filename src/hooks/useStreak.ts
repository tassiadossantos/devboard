import type { ContributionDay, StreakData } from '../types'

export function calculateStreak(contributions: ContributionDay[]): StreakData {
  if (contributions.length === 0) {
    return { current: 0, longest: 0, lastCommitDate: null }
  }

  const sorted = [...contributions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  let current = 0
  let longest = 0
  let tempStreak = 0
  let lastCommitDate: string | null = null

  for (const day of sorted) {
    if (day.count > 0) {
      tempStreak++
      if (!lastCommitDate) lastCommitDate = day.date
    } else {
      longest = Math.max(longest, tempStreak)
      if (current === 0 && lastCommitDate) {
        // Current streak is determined by consecutive days from today
        break
      }
      tempStreak = 0
    }
  }

  longest = Math.max(longest, tempStreak)

  // Calculate current streak from today backwards
  current = 0
  const today = new Date()
  for (let i = 0; i < sorted.length; i++) {
    const dayDate = new Date(sorted[i].date)
    const diffDays = Math.floor(
      (today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    if (diffDays > current + 1) break
    if (sorted[i].count > 0) {
      current = diffDays + 1
    } else if (diffDays === 0) {
      // today with no commits is ok, keep checking
      continue
    } else {
      break
    }
  }

  // Recalculate current streak properly
  current = 0
  for (let i = 0; i < 400; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    const dayData = sorted.find((d) => d.date === dateStr)
    if (dayData && dayData.count > 0) {
      current++
    } else if (i === 0) {
      continue // today might not have commits yet
    } else {
      break
    }
  }

  return { current, longest, lastCommitDate }
}
