"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import type { ISectorScore, Sector } from "@/app/types/sectorScore"
import { SECTOR_LABELS } from "@/lib/constant/sectors"

const SECTORS: Sector[] = ["fintech", "ecommerce", "edtech", "healthtech", "deeptech"]

interface Props {
  sectorScores: ISectorScore[]
  activeSector: Sector
  onSectorHover: (sector: Sector) => void
}

export default function SectorRadarChart({ sectorScores, activeSector, onSectorHover }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const size = 280
    const cx = size / 2
    const cy = size / 2
    const maxR = 95
    const labelPad = 22

    const scoreMap = new Map(sectorScores.map((s) => [s.sector, s.score]))
    const angles = SECTORS.map((_, i) => (i * 2 * Math.PI) / 5 - Math.PI / 2)

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()
    svg.attr("viewBox", `0 0 ${size} ${size}`)

    // Grid rings
    ;[25, 50, 75, 100].forEach((level) => {
      const pts = angles.map((a) => [
        cx + (level / 100) * maxR * Math.cos(a),
        cy + (level / 100) * maxR * Math.sin(a),
      ])
      svg
        .append("polygon")
        .attr("points", pts.map((p) => p.join(",")).join(" "))
        .attr("fill", "none")
        .attr("stroke", "rgba(255,255,255,0.07)")
        .attr("stroke-width", 1)
    })

    // Axis lines
    angles.forEach((a) => {
      svg
        .append("line")
        .attr("x1", cx)
        .attr("y1", cy)
        .attr("x2", cx + maxR * Math.cos(a))
        .attr("y2", cy + maxR * Math.sin(a))
        .attr("stroke", "rgba(255,255,255,0.07)")
        .attr("stroke-width", 1)
    })

    // Score polygon points
    const polyPts = SECTORS.map((s, i) => {
      const score = scoreMap.get(s) ?? 0
      return [
        cx + (score / 100) * maxR * Math.cos(angles[i]),
        cy + (score / 100) * maxR * Math.sin(angles[i]),
      ]
    })

    // Fill polygon
    svg
      .append("polygon")
      .attr("points", polyPts.map((p) => p.join(",")).join(" "))
      .attr("fill", "rgba(59,130,246,0.12)")
      .attr("stroke", "rgba(59,130,246,0.65)")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("opacity", 0)
      .transition()
      .duration(500)
      .ease(d3.easeCubicOut)
      .attr("opacity", 1)

    // Vertex dots + hover areas
    SECTORS.forEach((sector, i) => {
      const score = scoreMap.get(sector) ?? 0
      const x = cx + (score / 100) * maxR * Math.cos(angles[i])
      const y = cy + (score / 100) * maxR * Math.sin(angles[i])
      const isActive = sector === activeSector

      svg
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", isActive ? 5.5 : 4)
        .attr("fill", isActive ? "#3B82F6" : "rgba(59,130,246,0.75)")
        .attr("stroke", isActive ? "#fff" : "none")
        .attr("stroke-width", isActive ? 1.5 : 0)
        .style("cursor", "pointer")
        .on("mouseenter", () => onSectorHover(sector))
        .on("click", () => onSectorHover(sector))

      // Invisible larger hit area
      svg
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 12)
        .attr("fill", "transparent")
        .style("cursor", "pointer")
        .on("mouseenter", () => onSectorHover(sector))
        .on("click", () => onSectorHover(sector))
    })

    // Axis labels
    SECTORS.forEach((sector, i) => {
      const a = angles[i]
      const lx = cx + (maxR + labelPad) * Math.cos(a)
      const ly = cy + (maxR + labelPad) * Math.sin(a)
      const isActive = sector === activeSector

      svg
        .append("text")
        .attr("x", lx)
        .attr("y", ly)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", isActive ? "#F9FAFB" : "rgba(249,250,251,0.45)")
        .attr("font-size", "10")
        .attr("font-weight", isActive ? "600" : "400")
        .style("cursor", "pointer")
        .text(SECTOR_LABELS[sector])
        .on("mouseenter", () => onSectorHover(sector))
        .on("click", () => onSectorHover(sector))
    })
  }, [sectorScores, activeSector, onSectorHover])

  return (
    <svg
      ref={svgRef}
      className="w-full max-w-[260px] mx-auto"
      style={{ aspectRatio: "1" }}
    />
  )
}
