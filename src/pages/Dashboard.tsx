import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { useMetrics } from '../hooks/useMetrics'
import { MetricsCard } from '../components/MetricsCard/MetricsCard'
import { CommitGraph } from '../components/CommitGraph/CommitGraph'
import { StreakCounter } from '../components/StreakCounter/StreakCounter'
import { LanguagePie } from '../components/LanguagePie/LanguagePie'
import { ContributionGrid } from '../components/ContributionGrid/ContributionGrid'
import { ActivityFeed } from '../components/ActivityFeed/ActivityFeed'
import { GoalsTracker } from '../components/GoalsTracker/GoalsTracker'
import {
  GitCommit,
  GitPullRequest,
  Star,
  Flame,
  BarChart3,
  Folder,
} from 'lucide-react'

export function Dashboard() {
  const { token, loading, error, loadAllData } = useStore()
  const user = useStore((s) => s.user)
  const navigate = useNavigate()
  const metrics = useMetrics()

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token, navigate])

  useEffect(() => {
    if (token && !user) {
      loadAllData()
    }
  }, [token, user, loadAllData])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#30363d] border-t-[#39d353] rounded-full animate-spin" />
          <p className="text-[#8b949e]">Loading your data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-[#f85149] text-lg mb-2">Error loading data</p>
          <p className="text-[#8b949e] text-sm mb-4">{error}</p>
          <button
            onClick={loadAllData}
            className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center gap-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-16 h-16 rounded-full border-2 border-[#30363d]"
        />
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome, {user.name || user.login}!
          </h1>
          <p className="text-[#8b949e]">
            Here's your development overview
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricsCard
          title="Total Commits"
          value={metrics.totalCommits}
          icon={GitCommit}
          subtitle="all time"
        />
        <MetricsCard
          title="This Week"
          value={metrics.commitsThisWeek}
          icon={BarChart3}
          change={`${metrics.commitsThisMonth} this month`}
          changeType="positive"
        />
        <MetricsCard
          title="Current Streak"
          value={`${metrics.streak.current}d`}
          icon={Flame}
          subtitle={`Best: ${metrics.streak.longest}d`}
        />
        <MetricsCard
          title="Stars"
          value={metrics.totalStars}
          icon={Star}
          subtitle={`across ${metrics.totalRepos} repos`}
        />
        <MetricsCard
          title="Top Language"
          value={metrics.topLanguage}
          icon={GitPullRequest}
          subtitle="by usage"
        />
        <MetricsCard
          title="Repos"
          value={metrics.totalRepos}
          icon={Folder}
          subtitle="public"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommitGraph />
        <LanguagePie />
      </div>

      {/* Streak + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreakCounter />
        <ActivityFeed />
      </div>

      {/* Contribution Grid */}
      <ContributionGrid />

      {/* Goals */}
      <GoalsTracker />
    </div>
  )
}
