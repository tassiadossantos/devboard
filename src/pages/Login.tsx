import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { ArrowRight, Zap, BarChart3, Target, Flame } from 'lucide-react'
import { Logo } from '../components/Logo/Logo'

export function Login() {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const setStoreToken = useStore((s) => s.setToken)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!token.trim()) {
      setError('Please enter a GitHub token')
      return
    }
    setStoreToken(token.trim())
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <Logo size={64} className="mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Dev<span className="text-[#39d353]">Board</span>
          </h1>
          <p className="text-[#8b949e] text-lg">
            Your productivity dashboard for developers
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { icon: BarChart3, label: 'Commit Analytics' },
            { icon: Flame, label: 'Streak Tracking' },
            { icon: Target, label: 'Goal Setting' },
            { icon: Zap, label: 'Activity Feed' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 p-3 rounded-lg bg-[#161b22] border border-[#30363d]"
            >
              <Icon className="w-4 h-4 text-[#39d353]" />
              <span className="text-sm text-[#c9d1d9]">{label}</span>
            </div>
          ))}
        </div>

        {/* Login Form */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Connect with GitHub
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#8b949e] mb-2">
                GitHub Personal Access Token
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => {
                  setToken(e.target.value)
                  setError('')
                }}
                placeholder="ghp_xxxxxxxxxxxx"
                className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-white placeholder-[#484f58] focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-colors"
              />
              {error && (
                <p className="mt-2 text-sm text-[#f85149]">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#238636] hover:bg-[#2ea043] text-white font-medium rounded-lg transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-4 p-3 rounded-lg bg-[#0d1117] border border-[#21262d]">
            <p className="text-xs text-[#8b949e]">
              <span className="text-[#c9d1d9] font-medium">How to get a token:</span>{' '}
              Go to GitHub Settings → Developer settings → Personal access tokens →
              Generate new token (classic). Select{' '}
              <code className="px-1 py-0.5 bg-[#21262d] rounded text-[#c9d1d9]">
                repo
              </code>{' '}
              and{' '}
              <code className="px-1 py-0.5 bg-[#21262d] rounded text-[#c9d1d9]">
                read:user
              </code>{' '}
              scopes.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#484f58] mt-6">
          Your token is stored locally in your browser and never sent to any server.
        </p>
      </div>
    </div>
  )
}
