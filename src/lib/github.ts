import type {
  GitHubUser,
  GitHubRepo,
  CommitActivity,
  LanguageStat,
  ContributionDay,
  Activity,
} from '../types'

const GITHUB_API = 'https://api.github.com'

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vim: '#199f4b',
}

function getColorForLanguage(lang: string): string {
  return LANGUAGE_COLORS[lang] || '#8b949e'
}

export async function fetchUser(token: string): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}

export async function fetchRepos(token: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = []
  let page = 1
  while (page <= 5) {
    const res = await fetch(
      `${GITHUB_API}/user/repos?per_page=100&page=${page}&sort=updated`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (!res.ok) break
    const data = await res.json()
    if (data.length === 0) break
    repos.push(...data)
    page++
  }
  return repos
}

export async function fetchCommitActivity(
  token: string,
  username: string
): Promise<CommitActivity[]> {
  const repos = await fetchRepos(token)
  const ownedRepos = repos.filter((r) => r.full_name.startsWith(username + '/'))

  if (ownedRepos.length === 0) {
    // Fallback: use contribution data
    return []
  }

  // Fetch commit activity for top repos (up to 5 most recently updated)
  const topRepos = ownedRepos.slice(0, 5)
  const allActivity: CommitActivity[] = []

  for (const repo of topRepos) {
    try {
      const res = await fetch(
        `${GITHUB_API}/repos/${repo.full_name}/stats/commit_activity`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) {
          allActivity.push(...data)
        }
      }
    } catch {
      // skip failed repos
    }
  }

  return allActivity
}

export async function fetchLanguages(
  token: string,
  username: string
): Promise<LanguageStat[]> {
  const repos = await fetchRepos(token)
  const ownedRepos = repos.filter((r) => r.full_name.startsWith(username + '/'))

  const langMap: Record<string, number> = {}

  for (const repo of ownedRepos) {
    if (!repo.language) continue
    langMap[repo.language] = (langMap[repo.language] || 0) + 1
  }

  const total = Object.values(langMap).reduce((a, b) => a + b, 0)

  return Object.entries(langMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, count]) => ({
      name,
      value: Math.round((count / total) * 100),
      color: getColorForLanguage(name),
    }))
}

export async function fetchContributions(
  token: string,
  username: string
): Promise<ContributionDay[]> {
  // Fetch contribution data from GitHub's contribution calendar
  // We use commit counts from repos to simulate contribution data
  const commitActivity = await fetchCommitActivity(token, username)

  if (commitActivity.length === 0) {
    // Generate empty contributions for last 365 days
    const days: ContributionDay[] = []
    const now = new Date()
    for (let i = 365; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      days.push({
        date: date.toISOString().split('T')[0],
        count: 0,
        level: 0,
      })
    }
    return days
  }

  // Aggregate commit activity into daily counts
  const dayMap: Record<number, number> = {}
  for (const activity of commitActivity) {
    for (let i = 0; i < 7; i++) {
      const dayIndex = activity.week * 7 + i
      dayMap[dayIndex] = (dayMap[dayIndex] || 0) + activity.days[i]
    }
  }

  // Convert to ContributionDay format (last 365 days)
  const days: ContributionDay[] = []
  const now = new Date()
  const totalWeeks = Math.ceil(365 / 7)

  for (let week = 0; week < totalWeeks; week++) {
    for (let day = 0; day < 7; day++) {
      const dayIndex = week * 7 + day
      const date = new Date(now)
      date.setDate(date.getDate() - (365 - dayIndex))

      if (date > now) continue

      const count = dayMap[dayIndex] || 0
      let level: 0 | 1 | 2 | 3 | 4 = 0
      if (count > 0) level = 1
      if (count >= 3) level = 2
      if (count >= 6) level = 3
      if (count >= 10) level = 4

      days.push({
        date: date.toISOString().split('T')[0],
        count,
        level,
      })
    }
  }

  return days
}

export async function fetchRecentActivity(
  token: string,
  username: string
): Promise<Activity[]> {
  const eventsRes = await fetch(
    `${GITHUB_API}/users/${username}/events/public?per_page=30`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  if (!eventsRes.ok) return []
  const events = await eventsRes.json()

  const activities: Activity[] = []

  for (const event of events.slice(0, 15)) {
    if (!event.repo) continue

    const repoName = event.repo.name

    switch (event.type) {
      case 'PushEvent':
        for (const commit of event.payload.commits || []) {
          activities.push({
            id: commit.sha,
            type: 'commit',
            repo: repoName,
            title: commit.message.split('\n')[0],
            date: event.created_at,
            url: `https://github.com/${repoName}/commit/${commit.sha}`,
          })
        }
        break
      case 'PullRequestEvent':
        activities.push({
          id: `pr-${event.id}`,
          type: 'pr',
          repo: repoName,
          title: event.payload.pull_request?.title || 'PR',
          date: event.created_at,
          url: event.payload.pull_request?.html_url || '#',
        })
        break
      case 'IssuesEvent':
        activities.push({
          id: `issue-${event.id}`,
          type: 'issue',
          repo: repoName,
          title: event.payload.issue?.title || 'Issue',
          date: event.created_at,
          url: event.payload.issue?.html_url || '#',
        })
        break
      case 'PullRequestReviewEvent':
        activities.push({
          id: `review-${event.id}`,
          type: 'review',
          repo: repoName,
          title: `Reviewed PR in ${repoName}`,
          date: event.created_at,
          url: event.payload.pull_request?.html_url || '#',
        })
        break
    }
  }

  return activities.slice(0, 10)
}
