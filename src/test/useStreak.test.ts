import { describe, it, expect } from 'vitest'
import { calculateStreak } from '../hooks/useStreak'
import type { ContributionDay } from '../types'

function makeDay(date: string, count: number): ContributionDay {
  let level: 0 | 1 | 2 | 3 | 4 = 0
  if (count > 0) level = 1
  if (count >= 3) level = 2
  if (count >= 6) level = 3
  if (count >= 10) level = 4
  return { date, count, level }
}

describe('calculateStreak', () => {
  it('should return 0 streak for empty contributions', () => {
    const result = calculateStreak([])
    expect(result.current).toBe(0)
    expect(result.longest).toBe(0)
    expect(result.lastCommitDate).toBeNull()
  })

  it('should calculate current streak of 3 days', () => {
    const today = new Date()
    const d1 = new Date(today)
    d1.setDate(d1.getDate() - 1)
    const d2 = new Date(today)
    d2.setDate(d2.getDate() - 2)

    const contributions = [
      makeDay(d1.toISOString().split('T')[0], 5),
      makeDay(d2.toISOString().split('T')[0], 3),
      makeDay(new Date(today.getTime() - 3 * 86400000).toISOString().split('T')[0], 0),
    ]

    const result = calculateStreak(contributions)
    expect(result.current).toBeGreaterThanOrEqual(2)
    expect(result.longest).toBeGreaterThanOrEqual(2)
    expect(result.lastCommitDate).toBeTruthy()
  })

  it('should calculate longest streak correctly', () => {
    const today = new Date()
    const contributions: ContributionDay[] = []

    // 5 days with commits
    for (let i = 1; i <= 5; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      contributions.push(makeDay(d.toISOString().split('T')[0], 2))
    }

    // Gap day
    const gapDay = new Date(today)
    gapDay.setDate(gapDay.getDate() - 6)
    contributions.push(makeDay(gapDay.toISOString().split('T')[0], 0))

    // 3 more days
    for (let i = 7; i <= 9; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      contributions.push(makeDay(d.toISOString().split('T')[0], 1))
    }

    const result = calculateStreak(contributions)
    expect(result.longest).toBe(5)
  })
})
