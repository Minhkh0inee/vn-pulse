import { Input } from "@/components/ui/input"
import { SectionCard } from "./shared"
import type { SectorRow } from "./types"
import type { Sector } from "@/app/types/sectorScore"

const SECTOR_LABELS: Record<Sector, string> = {
  fintech: "Fintech",
  ecommerce: "E-commerce",
  edtech: "EdTech",
  healthtech: "HealthTech",
  deeptech: "DeepTech",
}

interface SectorScoresSectionProps {
  sectorScores: SectorRow[]
  onChange: (sector: Sector, key: "score" | "trend", value: string) => void
}

export function SectorScoresSection({ sectorScores, onChange }: SectorScoresSectionProps) {
  return (
    <SectionCard title="Sector Scores">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-[1fr_80px_80px] gap-3 pb-1">
          <p className="text-xs text-white/30 uppercase tracking-wide">Sector</p>
          <p className="text-xs text-white/30 uppercase tracking-wide">Score</p>
          <p className="text-xs text-white/30 uppercase tracking-wide">Trend Δ</p>
        </div>
        {sectorScores.map((row) => (
          <div key={row.sector} className="grid grid-cols-[1fr_80px_80px] gap-3 items-center">
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
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
