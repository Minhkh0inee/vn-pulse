const S = ({ label, className = "" }: { label: string; className?: string }) => (
  <div className={`border border-dashed border-white/20 p-4 text-white/40 text-xs text-center min-h-[60px] flex items-center justify-center ${className}`}>
    {label}
  </div>
)

export default function HomePage() {
  return (
    <div className="bg-[#0A0E1A] flex flex-col gap-4 p-4 md:p-6">

      {/* Hero — stacked on mobile, side-by-side on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <S label="SCORE CARD" className="min-h-[140px] md:min-h-[160px]" />
        <S label="MONTH LABEL" className="min-h-[80px] md:min-h-[160px]" />
      </div>

      {/* Chart — full width always */}
      <S label="TREND CHART (full width)" className="min-h-[200px] md:min-h-[240px]" />

      {/* Breakdown + Commentary — stacked on mobile, 2-col on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <S label="COMPONENT BREAKDOWN" className="min-h-[180px] md:min-h-[200px]" />
        <S label="COMMENTARY" className="min-h-[180px] md:min-h-[200px]" />
      </div>

      {/* Insight Cards — 1 col → 3 col */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <S label="INSIGHT CARD 1" />
        <S label="INSIGHT CARD 2" />
        <S label="INSIGHT CARD 3" />
      </div>

      {/* Poll — full width on mobile, centered on md+ */}
      <div className="flex justify-center">
        <S label="POLL SECTION" className="w-full md:max-w-md min-h-[120px]" />
      </div>

    </div>
  )
}
