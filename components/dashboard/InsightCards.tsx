"use client"

interface Insight {
  icon: string
  text: string
  type: "positive" | "warning" | "neutral"
}

const typeStyles = {
  positive: "border-green-500/30 bg-green-500/10 text-green-400",
  warning:  "border-amber-500/30 bg-amber-500/10 text-amber-400",
  neutral:  "border-blue-500/30 bg-blue-500/10 text-blue-400",
}

export function InsightCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-16 rounded-lg border border-white/10 bg-white/5 animate-pulse"
        />
      ))}
    </div>
  )
}

// Component chính
export function InsightCards({ insights }: { insights: Insight[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {insights.map((insight, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 rounded-lg border p-4 ${typeStyles[insight.type]}`}
        >
          <span className="text-2xl">{insight.icon}</span>
          <p className="text-sm font-medium">{insight.text}</p>
        </div>
      ))}
    </div>
  )
}