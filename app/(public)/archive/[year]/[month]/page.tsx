const S = ({ label, className = "" }: { label: string; className?: string }) => (
  <div className={`border border-dashed border-white/20 p-4 text-white/40 text-xs text-center min-h-[60px] flex items-center justify-center ${className}`}>
    {label}
  </div>
)

export default function ArchiveDetailPage() {
  return (
    <div className="bg-[#0A0E1A] flex flex-col gap-4 p-4 md:p-6">

      {/* Breadcrumb */}
      <S label="BREADCRUMB — Archive › 2026 › March" />

      {/* Score card */}
      <S label="SCORE CARD" className="min-h-[140px] md:min-h-[160px]" />

      {/* Chart */}
      <S label="TREND CHART" className="min-h-[200px] md:min-h-[240px]" />

      {/* Breakdown + Commentary — stacked on mobile, side-by-side on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <S label="COMPONENT BREAKDOWN" className="min-h-[180px] md:min-h-[200px]" />
        <S label="COMMENTARY" className="min-h-[180px] md:min-h-[200px]" />
      </div>

    </div>
  )
}
