import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useStore } from '../../store'
import { format, subWeeks } from 'date-fns'

export function CommitGraph() {
  const commitActivity = useStore((s) => s.commitActivity)

  const data = commitActivity.slice(-12).map((week, i) => {
    const weekDate = subWeeks(new Date(), 12 - i)
    return {
      name: format(weekDate, 'MMM dd'),
      commits: week.total,
    }
  })

  if (data.length === 0) {
    return (
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Commit Activity</h3>
        <div className="h-64 flex items-center justify-center text-[#8b949e]">
          No commit data available
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">Commit Activity</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#8b949e', fontSize: 11 }}
              axisLine={{ stroke: '#21262d' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#8b949e', fontSize: 11 }}
              axisLine={{ stroke: '#21262d' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1c2128',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: '#c9d1d9',
              }}
              cursor={{ fill: 'rgba(56,143,253,0.1)' }}
            />
            <Bar dataKey="commits" fill="#1f6feb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
