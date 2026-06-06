"use client"

import { useState, useCallback } from "react"
import type { ISectorScore, Sector } from "@/app/types/sectorScore"
import dynamic from "next/dynamic"
import SectorTabPanel from "./SectorTabPanel"
import { SECTOR_LABELS } from "@/lib/constant/sectors"

const SectorRadarChart = dynamic(() => import("./SectorRadarChart"), { ssr: false })

const SECTORS: Sector[] = ["fintech", "ecommerce", "edtech", "healthtech", "deeptech"]

interface Props {
  sectorScores: ISectorScore[]
}

export default function SectorIndex({ sectorScores }: Props) {
  const available = SECTORS.filter((s) => sectorScores.some((r) => r.sector === s))
  const [activeSector, setActiveSector] = useState<Sector>(available[0] ?? "fintech")

  const handleHover = useCallback((sector: Sector) => {
    setActiveSector(sector)
  }, [])

  if (sectorScores.length === 0) return null

  const activeScore = sectorScores.find((s) => s.sector === activeSector)

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
        Sector Index
      </p>

      {/* Radar chart */}
      <SectorRadarChart
        sectorScores={sectorScores}
        activeSector={activeSector}
        onSectorHover={handleHover}
      />

      {/* Tab row */}
      <div className="flex flex-wrap gap-2 mt-4">
        {available.map((sector) => {
          const isActive = sector === activeSector
          return (
            <button
              key={sector}
              type="button"
              onClick={() => setActiveSector(sector)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                isActive
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {SECTOR_LABELS[sector]}
            </button>
          )
        })}
      </div>

      {/* Panel */}
      <div className="mt-4 pt-4 border-t border-[var(--border)]">
        <SectorTabPanel sectorScore={activeScore} />
      </div>
    </div>
  )
}
