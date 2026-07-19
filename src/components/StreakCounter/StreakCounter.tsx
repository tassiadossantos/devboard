import { Flame, TrendingUp } from 'lucide-react'
import { useStore } from '../../store'

export function StreakCounter() {
  const streak = useStore((s) => s.streak)

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">Streak</h3>

      <div className="flex items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-[#f85149]" />
            <span className="text-[#8b949e] text-sm">Current</span>
          </div>
          <div className="text-4xl font-bold text-white">
            {streak.current}
            <span className="text-lg text-[#8b949e] font-normal ml-1">days</span>
          </div>
        </div>

        <div className="w-px h-16 bg-[#30363d]" />

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-[#d29922]" />
            <span className="text-[#8b949e] text-sm">Longest</span>
          </div>
          <div className="text-4xl font-bold text-white">
            {streak.longest}
            <span className="text-lg text-[#8b949e] font-normal ml-1">days</span>
          </div>
        </div>
      </div>

      {streak.current > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-[#1f6feb]/10 border border-[#1f6feb]/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#39d353] animate-pulse" />
            <span className="text-sm text-[#c9d1d9]">
              {streak.current >= 7
                ? `Amazing! ${streak.current} day streak! Keep burning!`
                : `Good progress! ${streak.current} days and counting.`}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
