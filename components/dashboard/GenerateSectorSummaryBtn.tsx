"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import type { Sector } from "@/app/types/sectorScore"

interface Props {
  sector: Sector
  score: string
  trend: string
  month: string
  totalScore: number
  disabled?: boolean
  onGenerated: (summaryVi: string, summaryEn: string) => void
}

export default function GenerateSectorSummaryBtn({
  sector, score, trend, month, totalScore, disabled, onGenerated,
}: Props) {
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    try {
      const res = await fetch("/api/ai/generate-sector-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sector,
          score:      parseFloat(score) || 0,
          trend:      trend !== "" ? parseFloat(trend) : null,
          month,
          totalScore,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`)

      onGenerated(data.summaryVi, data.summaryEn)
      toast.success("Sector summary generated")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      disabled={loading || disabled}
      onClick={handleGenerate}
      className="h-7 text-xs"
    >
      {loading ? "Generating..." : "AI Generate"}
    </Button>
  )
}
