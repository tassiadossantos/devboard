import { describe, it, expect, beforeEach } from 'vitest'
import { getSettings, saveSettings, updateGoal, addGoal, removeGoal } from '../lib/storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return default settings when empty', () => {
    const settings = getSettings()
    expect(settings.theme).toBe('dark')
    expect(settings.goals).toHaveLength(3)
    expect(settings.username).toBe('')
  })

  it('should save and retrieve settings', () => {
    const settings = getSettings()
    settings.theme = 'light'
    saveSettings(settings)

    const retrieved = getSettings()
    expect(retrieved.theme).toBe('light')
  })

  it('should update a goal', () => {
    const settings = getSettings()
    const goalId = settings.goals[0].id

    const updated = updateGoal(goalId, 15)
    const goal = updated.goals.find((g) => g.id === goalId)
    expect(goal?.current).toBe(15)
  })

  it('should mark goal as completed when target reached', () => {
    const settings = getSettings()
    const goalId = settings.goals[0].id
    const target = settings.goals[0].target

    const updated = updateGoal(goalId, target)
    const goal = updated.goals.find((g) => g.id === goalId)
    expect(goal?.completed).toBe(true)
  })

  it('should add a new goal', () => {
    const updated = addGoal({
      title: 'Test Goal',
      target: 50,
      current: 0,
      unit: 'commits',
    })

    expect(updated.goals).toHaveLength(4)
    expect(updated.goals[3].title).toBe('Test Goal')
  })

  it('should remove a goal', () => {
    localStorage.clear()
    const initialCount = getSettings().goals.length

    const added = addGoal({ title: 'To Remove', target: 1, current: 0, unit: 'x' })
    expect(added.goals).toHaveLength(initialCount + 1)

    const goalId = added.goals[added.goals.length - 1].id
    const updated = removeGoal(goalId)

    expect(updated.goals).toHaveLength(initialCount)
    expect(updated.goals.find((g) => g.id === goalId)).toBeUndefined()
  })
})
