import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { RefreshCw, Trash2, Info } from 'lucide-react'

export function Settings() {
  const { token, user, theme, setTheme, loadAllData } = useStore()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!token) navigate('/')
  }, [token, navigate])

  const handleRefresh = async () => {
    await loadAllData()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClearData = () => {
    localStorage.removeItem('devboard_settings')
    localStorage.removeItem('devboard_token')
    window.location.reload()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      {/* Profile Info */}
      {user && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full border border-[#30363d]"
            />
            <div>
              <div className="text-white font-medium">{user.name || user.login}</div>
              <div className="text-[#8b949e] text-sm">@{user.login}</div>
              {user.bio && (
                <div className="text-[#8b949e] text-sm mt-1">{user.bio}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Appearance */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
        <h2 className="text-lg font-semibold text-white mb-4">Appearance</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setTheme('dark')}
            className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
              theme === 'dark'
                ? 'border-[#39d353] bg-[#0d1117]'
                : 'border-[#30363d] bg-[#0d1117] hover:border-[#484f58]'
            }`}
          >
            <div className="w-full h-20 bg-[#0d1117] rounded-md mb-2 border border-[#30363d]" />
            <span className="text-sm text-[#c9d1d9]">Dark</span>
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
              theme === 'light'
                ? 'border-[#39d353] bg-white'
                : 'border-[#30363d] bg-white hover:border-[#484f58]'
            }`}
          >
            <div className="w-full h-20 bg-[#f6f8fa] rounded-md mb-2 border border-[#d0d7de]" />
            <span className="text-sm text-[#1f2328]">Light</span>
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
        <h2 className="text-lg font-semibold text-white mb-4">Data</h2>
        <div className="space-y-3">
          <button
            onClick={handleRefresh}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#21262d] hover:bg-[#30363d] text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </button>

          <button
            onClick={handleClearData}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#21262d] hover:bg-[#f85149]/20 text-[#f85149] rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Data
          </button>
        </div>

        {saved && (
          <div className="mt-3 p-3 rounded-lg bg-[#238636]/20 border border-[#238636]/30 text-sm text-[#39d353]">
            Data refreshed successfully!
          </div>
        )}
      </div>

      {/* About */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-[#8b949e]" />
          <h2 className="text-lg font-semibold text-white">About</h2>
        </div>
        <div className="space-y-2 text-sm text-[#8b949e]">
          <p>DevBoard v1.0.0 — Developer Productivity Dashboard</p>
          <p>
            Your data is stored locally in your browser. No data is sent to any
            external server.
          </p>
          <p>
            Built with React, TypeScript, Recharts, Zustand, and Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  )
}
