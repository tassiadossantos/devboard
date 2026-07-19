import { describe, it, expect } from 'vitest'
import type { GitHubUser, GitHubRepo, LanguageStat, ContributionDay } from '../types'

describe('Types', () => {
  it('GitHubUser should have required fields', () => {
    const user: GitHubUser = {
      login: 'testuser',
      name: 'Test User',
      avatar_url: 'https://example.com/avatar.png',
      bio: 'Developer',
      public_repos: 10,
      followers: 5,
      following: 3,
      created_at: '2020-01-01T00:00:00Z',
    }
    expect(user.login).toBe('testuser')
    expect(user.public_repos).toBe(10)
  })

  it('GitHubRepo should have required fields', () => {
    const repo: GitHubRepo = {
      id: 1,
      name: 'test-repo',
      full_name: 'user/test-repo',
      html_url: 'https://github.com/user/test-repo',
      language: 'TypeScript',
      stargazers_count: 100,
      forks_count: 20,
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(repo.name).toBe('test-repo')
    expect(repo.full_name).toBe('user/test-repo')
  })

  it('LanguageStat should have color', () => {
    const lang: LanguageStat = {
      name: 'TypeScript',
      value: 45,
      color: '#3178c6',
    }
    expect(lang.color).toBe('#3178c6')
  })

  it('ContributionDay should have valid level', () => {
    const day: ContributionDay = {
      date: '2024-01-15',
      count: 5,
      level: 2,
    }
    expect([0, 1, 2, 3, 4]).toContain(day.level)
  })
})
