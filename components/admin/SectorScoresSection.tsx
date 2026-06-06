import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionCard } from "./shared"
import type { SectorRow } from "./types"
import type { Sector } from "@/app/types/sectorScore"
import { ChevronDown, ChevronUp } from "lucide-react"
import GenerateSectorSummaryBtn from "@/components/dashboard/GenerateSectorSummaryBtn"
import { SECTOR_LABELS } from "@/lib/constant/sectors"

interface SectorScoresSectionProps {
  sectorScores: SectorRow[]
  canGenerate: boolean
  month: string
  totalScore: number
  onChange: (sector: Sector, key: keyof Omit<SectorRow, "sector">, value: string) => void
}

export function SectorScoresSection({
  sectorScores, canGenerate, month, totalScore, onChange,
}: SectorScoresSectionProps) {
  const [expanded, setExpanded] = useState<Record<Sector, boolean>>({
    fintech: false,
    ecommerce: false,
    edtech: false,
    healthtech: false,
    deeptech: false,
  })

  function toggleExpand(sector: Sector) {
    setExpanded((prev) => ({ ...prev, [sector]: !prev[sector] }))
  }

  return (
    <SectionCard title="Sector Scores">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-[1fr_80px_80px_32px] gap-3 pb-1">
          <p className="text-xs text-white/30 uppercase tracking-wide">Sector</p>
          <p className="text-xs text-white/30 uppercase tracking-wide">Score</p>
          <p className="text-xs text-white/30 uppercase tracking-wide">Trend Δ</p>
          <span />
        </div>
        {sectorScores.map((row) => {
          const sectorCanGenerate = canGenerate && row.score !== ""
          return (
            <div key={row.sector} className="flex flex-col gap-2">
              <div className="grid grid-cols-[1fr_80px_80px_32px] gap-3 items-center">
                <p className="text-sm text-white/70">{SECTOR_LABELS[row.sector]}</p>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="0"
                  value={row.score}
                  onChange={(e) => onChange(row.sector, "score", e.target.value)}
                />
                <Input
                  type="number"
                  step={0.1}
                  placeholder="0"
                  value={row.trend}
                  onChange={(e) => onChange(row.sector, "trend", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => toggleExpand(row.sector)}
                  className="flex items-center justify-center text-white/30 hover:text-white/70 transition-colors"
                  title="Toggle AI summaries"
                >
                  {expanded[row.sector] ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>
              </div>

              {expanded[row.sector] && (
                <div className="flex flex-col gap-2 pl-2 border-l border-white/10">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-white/30">AI Summary</p>
                    <GenerateSectorSummaryBtn
                      sector={row.sector}
                      score={row.score}
                      trend={row.trend}
                      month={month}
                      totalScore={totalScore}
                      disabled={!sectorCanGenerate}
                      onGenerated={(vi, en) => {
                        onChange(row.sector, "summaryVi", vi)
                        onChange(row.sector, "summaryEn", en)
                      }}
                    />
                  </div>
                  {!sectorCanGenerate && (
                    <p className="text-xs text-white/30">
                      Fill month, scores, weights, and this sector&apos;s score to enable AI generation.
                    </p>
                  )}
                  <Textarea
                    placeholder="Summary (Vietnamese)..."
                    value={row.summaryVi}
                    rows={2}
                    onChange={(e) => onChange(row.sector, "summaryVi", e.target.value)}
                    className="text-xs resize-none"
                  />
                  <Textarea
                    placeholder="Summary (English)..."
                    value={row.summaryEn}
                    rows={2}
                    onChange={(e) => onChange(row.sector, "summaryEn", e.target.value)}
                    className="text-xs resize-none"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
