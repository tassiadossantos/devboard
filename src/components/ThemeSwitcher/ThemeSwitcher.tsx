import { Sun, Moon } from 'lucide-react'
import { useStore } from '../../store'

export function ThemeSwitcher() {
  const theme = useStore((s) => s.theme)
  const setTheme = useStore((s) => s.setTheme)

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] transition-colors"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-[#d29922]" />
      ) : (
        <Moon className="w-4 h-4 text-[#c9d1d9]" />
      )}
      <span className="text-sm text-[#c9d1d9]">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}
