import { useStore } from '../../store'
import { format } from 'date-fns'

const LEVEL_COLORS = [
  '#161b22',
  '#0e4429',
  '#006d32',
  '#26a641',
  '#39d353',
]

export function ContributionGrid() {
  const contributions = useStore((s) => s.contributions)

  if (contributions.length === 0) {
    return (
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Contributions</h3>
        <div className="h-32 flex items-center justify-center text-[#8b949e]">
          No contribution data available
        </div>
      </div>
    )
  }

  // Build weeks array (each week = 7 days)
  const totalDays = contributions.length
  const weeks: (typeof contributions)[] = []
  for (let i = 0; i < totalDays; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  const totalContributions = contributions.reduce((sum, d) => sum + d.count, 0)

  // Month labels
  const monthLabels: { month: string; weekIndex: number }[] = []
  let lastMonth = ''
  weeks.forEach((week, i) => {
    const firstDay = week[0]
    if (firstDay) {
      const month = format(new Date(firstDay.date), 'MMM')
      if (month !== lastMonth) {
        monthLabels.push({ month, weekIndex: i })
        lastMonth = month
      }
    }
  })

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Contributions</h3>
        <span className="text-[#8b949e] text-sm">
          {totalContributions} contributions in the last year
        </span>
      </div>

      {/* Month labels */}
      <div className="flex ml-8 mb-1 gap-0">
        {monthLabels.map(({ month, weekIndex }, i) => (
          <div
            key={i}
            className="text-[10px] text-[#8b949e]"
            style={{
              position: 'relative',
              left: `${weekIndex * 13}px`,
              width: 0,
            }}
          >
            {month}
          </div>
        ))}
      </div>

      <div className="flex gap-0.5 overflow-x-auto pb-2">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 mr-1 mt-0">
          {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, i) => (
            <div
              key={i}
              className="text-[10px] text-[#8b949e] h-[11px] leading-[11px] w-7 text-right pr-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-0.5">
            {week.map((day, dayIdx) => (
              <div
                key={dayIdx}
                className="w-[11px] h-[11px] rounded-[2px] hover:ring-1 hover:ring-[#8b949e] transition-all cursor-pointer"
                style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                title={`${day.count} contributions on ${format(new Date(day.date), 'MMM d, yyyy')}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-1 mt-2">
        <span className="text-[10px] text-[#8b949e] mr-1">Less</span>
        {LEVEL_COLORS.map((color, i) => (
          <div
            key={i}
            className="w-[11px] h-[11px] rounded-[2px]"
            style={{ backgroundColor: color }}
          />
        ))}
        <span className="text-[10px] text-[#8b949e] ml-1">More</span>
      </div>
    </div>
  )
}
