import type { ISectorScore } from "@/app/types/sectorScore"
import { SECTOR_LABELS } from "@/lib/constant/sectors"
import { getScoreColor } from "@/utils/scoreCard.utils"

interface Props {
  sectorScore: ISectorScore | undefined
}

export default function SectorTabPanel({ sectorScore }: Props) {
  if (!sectorScore) {
    return (
      <div className="py-6 text-center text-sm text-[var(--muted-foreground)]">
        No data available for this sector.
      </div>
    )
  }

  const { score, trend, summaryEn, summaryVi } = sectorScore
  const trendAbs = trend != null ? Math.abs(trend) : null
  const trendDir = trend == null ? "stable" : trend > 0 ? "up" : trend < 0 ? "down" : "stable"
  const trendIcon = trendDir === "up" ? "↑" : trendDir === "down" ? "↓" : "→"
  const trendColor =
    trendDir === "up"
      ? "text-[var(--trend-up)]"
      : trendDir === "down"
        ? "text-[var(--trend-down)]"
        : "text-[var(--muted-foreground)]"

  const summary = summaryEn || summaryVi

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
            {SECTOR_LABELS[sectorScore.sector] ?? sectorScore.sector}
          </p>
          <p className={`text-5xl font-bold tabular-nums leading-none ${getScoreColor(score)}`}>
            {score.toFixed(1)}
          </p>
        </div>

        {trendAbs != null && (
          <div className={`flex items-center gap-1 mb-1 text-sm font-medium ${trendColor}`}>
            <span>{trendIcon}</span>
            <span>{trendAbs.toFixed(1)} pts</span>
            <span className="text-[var(--muted-foreground)] font-normal text-xs ml-1">vs last month</span>
          </div>
        )}
      </div>

      {summary ? (
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          {summary}
        </p>
      ) : (
        <p className="text-sm text-[var(--muted-foreground)]/50 italic">
          No AI summary available for this sector.
        </p>
      )}
    </div>
  )
}
