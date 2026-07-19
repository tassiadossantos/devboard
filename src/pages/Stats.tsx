import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { useMetrics } from '../hooks/useMetrics'
import { formatDistanceToNow } from 'date-fns'
import {
  GitCommit,
  GitPullRequest,
  Star,
  Users,
  Calendar,
  TrendingUp,
} from 'lucide-react'

export function Stats() {
  const { token, user, repos } = useStore()
  const navigate = useNavigate()
  const metrics = useMetrics()

  useEffect(() => {
    if (!token) navigate('/')
  }, [token, navigate])

  if (!user) return null

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Detailed Statistics</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[#8b949e]" />
            <span className="text-[#8b949e] text-sm">Member Since</span>
          </div>
          <div className="text-lg text-white font-semibold">
            {formatDistanceToNow(new Date(user.created_at))} ago
          </div>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[#8b949e]" />
            <span className="text-[#8b949e] text-sm">Followers</span>
          </div>
          <div className="text-lg text-white font-semibold">{user.followers}</div>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <GitPullRequest className="w-4 h-4 text-[#8b949e]" />
            <span className="text-[#8b949e] text-sm">Following</span>
          </div>
          <div className="text-lg text-white font-semibold">{user.following}</div>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#8b949e]" />
            <span className="text-[#8b949e] text-sm">Total Stars</span>
          </div>
          <div className="text-lg text-white font-semibold">{metrics.totalStars}</div>
        </div>
      </div>

      {/* Top Repos */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
        <h2 className="text-lg font-semibold text-white mb-4">Top Repositories</h2>
        <div className="space-y-3">
          {topRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-[#0d1117] border border-[#21262d] hover:border-[#388bfd]/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <GitCommit className="w-4 h-4 text-[#8b949e]" />
                <div>
                  <div className="text-sm text-[#c9d1d9] group-hover:text-white font-medium">
                    {repo.name}
                  </div>
                  {repo.language && (
                    <div className="text-xs text-[#8b949e]">{repo.language}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs text-[#8b949e]">
                  <Star className="w-3.5 h-3.5" />
                  {repo.stargazers_count}
                </div>
                <div className="text-xs text-[#8b949e]">
                  {formatDistanceToNow(new Date(repo.updated_at))} ago
                </div>
              </div>
            </a>
          ))}

          {topRepos.length === 0 && (
            <div className="text-center text-[#8b949e] py-8">No repos found</div>
          )}
        </div>
      </div>

      {/* Language Breakdown */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
        <h2 className="text-lg font-semibold text-white mb-4">Repository Languages</h2>
        <div className="space-y-2">
          {useStore.getState().languages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-sm text-[#c9d1d9] w-24">{lang.name}</span>
              <div className="flex-1 h-2 bg-[#21262d] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${lang.value}%`,
                    backgroundColor: lang.color,
                  }}
                />
              </div>
              <span className="text-xs text-[#8b949e] w-10 text-right">
                {lang.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
