const S = ({ label, className = "" }: { label: string; className?: string }) => (
  <div className={`border border-dashed border-white/20 p-4 text-white/40 text-xs text-center min-h-[60px] flex items-center justify-center ${className}`}>
    {label}
  </div>
)

export default function ArchivePage() {
  return (
    <div className="bg-[#0A0E1A] flex flex-col gap-4 p-4 md:p-6">

      {/* Page header */}
      <S label="PAGE HEADER — Title + Description" className="min-h-[80px]" />

      {/* Filter bar */}
      <S label="FILTER BAR — Year filter" />

      {/* Archive grid — 1 col → 2 col → 3 col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <S key={i} label={`ARCHIVE CARD ${i + 1}`} className="min-h-[100px]" />
        ))}
      </div>

    </div>
  )
}
