const S = ({ label, className = "" }: { label: string; className?: string }) => (
  <div className={`border border-dashed border-white/20 p-4 text-white/40 text-xs text-center min-h-[60px] flex items-center justify-center ${className}`}>
    {label}
  </div>
)

export default function AdminPage() {
  return (
    <div className="bg-[#0A0E1A] flex flex-col gap-4 p-4 md:p-6">

      {/* Admin header */}
      <div className="flex flex-col sm:flex-row gap-4">
        <S label="ADMIN HEADER" className="flex-1" />
        <S label="LOGOUT" className="sm:w-28" />
      </div>

      {/* Stats bar — 2 col on mobile, 4 col on md+ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <S label="STAT 1" />
        <S label="STAT 2" />
        <S label="STAT 3" />
        <S label="STAT 4" />
      </div>

      {/* Form + Preview — stacked on mobile, 2/3 + 1/3 on lg+ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <S label="INDEX FORM" className="lg:col-span-2 min-h-[400px]" />
        <S label="PREVIEW" className="min-h-[240px] lg:min-h-[400px]" />
      </div>

      {/* Publish */}
      <S label="PUBLISH BUTTON SECTION" />

    </div>
  )
}
