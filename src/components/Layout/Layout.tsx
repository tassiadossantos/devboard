import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useGitHub } from '../../hooks/useGitHub'
import { useStore } from '../../store'
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher'
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'
import { Logo } from '../Logo/Logo'

export function Layout() {
  const { user, isAuthenticated, logout } = useGitHub()
  const storeLogout = useStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    storeLogout()
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Header */}
      <header className="bg-[#161b22] border-b border-[#30363d] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Logo size={32} />
              <span className="text-xl font-bold text-white">
                Dev<span className="text-[#39d353]">Board</span>
              </span>
            </div>

            {/* Navigation */}
            {isAuthenticated && (
              <nav className="flex items-center gap-1">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#21262d] text-white'
                        : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]'
                    }`
                  }
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/stats"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#21262d] text-white'
                        : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]'
                    }`
                  }
                >
                  <BarChart3 className="w-4 h-4" />
                  Stats
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#21262d] text-white'
                        : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]'
                    }`
                  }
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </NavLink>
              </nav>
            )}

            {/* Right side */}
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              {isAuthenticated && user && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="w-8 h-8 rounded-full border border-[#30363d]"
                    />
                    <span className="text-sm text-[#c9d1d9] hidden sm:block">
                      {user.login}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
