import type { LucideIcon } from 'lucide-react'

interface MetricsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  subtitle?: string
}

export function MetricsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
  subtitle,
}: MetricsCardProps) {
  const changeColors = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-gray-400',
  }

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 hover:border-[#388bfd]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,143,253,0.1)]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#8b949e] text-sm font-medium">{title}</span>
        <div className="w-9 h-9 rounded-lg bg-[#1f6feb]/10 flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-[#1f6feb]" />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      {(change || subtitle) && (
        <div className="flex items-center gap-2">
          {change && (
            <span className={`text-xs font-medium ${changeColors[changeType]}`}>
              {change}
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-[#8b949e]">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  )
}
