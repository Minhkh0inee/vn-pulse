import { scoreColor } from "./shared"

interface StatsBarProps {
  totalScore: number
  fundingScore: string
  jobPostingScore: string
  newsVolumeScore: string
}

export function StatsBar({ totalScore, fundingScore, jobPostingScore, newsVolumeScore }: StatsBarProps) {
  const stats = [
    { label: "Total Score", value: totalScore.toFixed(1), color: scoreColor(totalScore) },
    { label: "Funding Score", value: fundingScore || "—", color: "text-white" },
    { label: "Job Postings Score", value: jobPostingScore || "—", color: "text-white" },
    { label: "News Volume Score", value: newsVolumeScore || "—", color: "text-white" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(({ label, value, color }) => (
        <div
          key={label}
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 flex flex-col gap-1.5"
        >
          <p className="text-xs text-white/40 uppercase tracking-wide">{label}</p>
          <p className={`text-2xl font-bold tabular-nums ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  )
}
