import { parseNum, scoreColor } from "./shared"
import type { SectorRow } from "./types"
import type { Sector } from "@/app/types/sectorScore"

const SECTOR_LABELS: Record<Sector, string> = {
  fintech: "Fintech",
  ecommerce: "E-commerce",
  edtech: "EdTech",
  healthtech: "HealthTech",
  deeptech: "DeepTech",
}

interface PreviewPanelProps {
  totalScore: number
  month: string
  weightsValid: boolean
  sectorScores: SectorRow[]
}

export function PreviewPanel({ totalScore, month, weightsValid, sectorScores }: PreviewPanelProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col gap-4 sticky top-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Preview</p>

      <div className="flex flex-col items-center gap-1 py-4 border-b border-white/10">
        <p className="text-xs text-white/40 uppercase tracking-wide">Composite Index</p>
        <p className={`text-5xl font-bold tabular-nums ${scoreColor(totalScore)}`}>
          {totalScore.toFixed(1)}
        </p>
        <p className="text-xs text-white/30">/ 100</p>
        {month && (
          <p className="mt-1 text-sm text-white/50 font-medium">{month}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`inline-block size-2 rounded-full ${
            weightsValid ? "bg-emerald-400" : "bg-rose-400"
          }`}
        />
        <span className="text-xs text-white/50">
          {weightsValid ? "Weights valid" : "Weights invalid"}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-white/40 uppercase tracking-wide mb-1">Sectors</p>
        {sectorScores.map((row) => {
          const t = parseNum(row.trend)
          return (
            <div key={row.sector} className="flex items-center justify-between gap-2">
              <span className="text-xs text-white/60">{SECTOR_LABELS[row.sector]}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium tabular-nums text-white">
                  {row.score || "—"}
                </span>
                {row.trend && (
                  <span
                    className={`text-xs tabular-nums ${
                      t > 0 ? "text-emerald-400" : t < 0 ? "text-rose-400" : "text-white/30"
                    }`}
                  >
                    {t > 0 ? "+" : ""}{t.toFixed(1)}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="pt-2 border-t border-white/10">
        <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
          <span className="inline-block size-1.5 rounded-full bg-white/20" />
          Not Published
        </span>
      </div>
    </div>
  )
}
