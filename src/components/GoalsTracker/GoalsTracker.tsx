import { Target, Plus, Trash2 } from 'lucide-react'
import { useStore } from '../../store'
import type { Goal } from '../../types'

export function GoalsTracker() {
  const goals = useStore((s) => s.goals)
  const setGoals = useStore((s) => s.setGoals)

  const handleProgress = (goalId: string, increment: number) => {
    const updated = goals.map((g: Goal) => {
      if (g.id === goalId) {
        const newCurrent = Math.max(0, Math.min(g.target, g.current + increment))
        return { ...g, current: newCurrent, completed: newCurrent >= g.target }
      }
      return g
    })
    setGoals(updated)
  }

  const handleRemove = (goalId: string) => {
    setGoals(goals.filter((g: Goal) => g.id !== goalId))
  }

  const handleAdd = () => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: 'New Goal',
      target: 10,
      current: 0,
      unit: 'units',
      completed: false,
    }
    setGoals([...goals, newGoal])
  }

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Goals</h3>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-[#238636] hover:bg-[#2ea043] rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Goal
        </button>
      </div>

      <div className="space-y-3">
        {goals.map((goal: Goal) => {
          const percentage = Math.round((goal.current / goal.target) * 100)
          return (
            <div
              key={goal.id}
              className="p-3 rounded-lg bg-[#0d1117] border border-[#21262d]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target
                    className={`w-4 h-4 ${
                      goal.completed ? 'text-[#39d353]' : 'text-[#8b949e]'
                    }`}
                  />
                  <span className="text-sm text-[#c9d1d9]">{goal.title}</span>
                </div>
                <button
                  onClick={() => handleRemove(goal.id)}
                  className="text-[#8b949e] hover:text-[#f85149] transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-[#21262d] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: goal.completed ? '#39d353' : '#1f6feb',
                    }}
                  />
                </div>
                <span className="text-xs text-[#8b949e] w-12 text-right">
                  {percentage}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8b949e]">
                  {goal.current} / {goal.target} {goal.unit}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleProgress(goal.id, -1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-[#8b949e] hover:bg-[#21262d] transition-colors text-xs"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleProgress(goal.id, 1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-[#8b949e] hover:bg-[#21262d] transition-colors text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {goals.length === 0 && (
          <div className="text-center text-[#8b949e] text-sm py-4">
            No goals yet. Add one to start tracking!
          </div>
        )}
      </div>
    </div>
  )
}
