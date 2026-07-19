import { GitCommit, GitPullRequest, AlertCircle, Eye } from 'lucide-react'
import { useStore } from '../../store'
import { formatDistanceToNow } from 'date-fns'

const ACTIVITY_ICONS = {
  commit: GitCommit,
  pr: GitPullRequest,
  issue: AlertCircle,
  review: Eye,
}

const ACTIVITY_COLORS = {
  commit: 'text-[#39d353] bg-[#39d353]/10',
  pr: 'text-[#a371f7] bg-[#a371f7]/10',
  issue: 'text-[#f85149] bg-[#f85149]/10',
  review: 'text-[#1f6feb] bg-[#1f6feb]/10',
}

export function ActivityFeed() {
  const recentActivity = useStore((s) => s.recentActivity)

  if (recentActivity.length === 0) {
    return (
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
        <div className="h-32 flex items-center justify-center text-[#8b949e]">
          No recent activity
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {recentActivity.map((activity) => {
          const Icon = ACTIVITY_ICONS[activity.type]
          const colorClass = ACTIVITY_COLORS[activity.type]
          return (
            <a
              key={activity.id}
              href={activity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#1c2128] transition-colors group"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-[#c9d1d9] group-hover:text-white truncate">
                  {activity.title}
                </div>
                <div className="text-xs text-[#8b949e] mt-0.5">
                  {activity.repo} ·{' '}
                  {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
