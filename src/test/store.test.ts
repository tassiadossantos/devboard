import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from '../store'

describe('Zustand Store', () => {
  beforeEach(() => {
    localStorage.clear()
    useStore.setState({
      token: null,
      user: null,
      repos: [],
      commitActivity: [],
      languages: [],
      contributions: [],
      recentActivity: [],
      streak: { current: 0, longest: 0, lastCommitDate: null },
      theme: 'dark',
      goals: [],
      loading: false,
      error: null,
    })
  })

  it('should have initial state', () => {
    const state = useStore.getState()
    expect(state.token).toBeNull()
    expect(state.user).toBeNull()
    expect(state.loading).toBe(false)
    expect(state.theme).toBe('dark')
  })

  it('should set token', () => {
    useStore.getState().setToken('test-token-123')
    expect(useStore.getState().token).toBe('test-token-123')
    expect(localStorage.getItem('devboard_token')).toBe('test-token-123')
  })

  it('should logout and clear token', () => {
    useStore.getState().setToken('test-token')
    useStore.getState().logout()
    expect(useStore.getState().token).toBeNull()
    expect(localStorage.getItem('devboard_token')).toBeNull()
  })

  it('should set theme', () => {
    useStore.getState().setTheme('light')
    expect(useStore.getState().theme).toBe('light')
  })

  it('should set goals', () => {
    const goals = [
      { id: '1', title: 'Test', target: 10, current: 5, unit: 'days', completed: false },
    ]
    useStore.getState().setGoals(goals)
    expect(useStore.getState().goals).toHaveLength(1)
  })
})
