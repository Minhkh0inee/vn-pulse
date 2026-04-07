export default function Header() {
  return (
    <header className="border border-dashed border-white/20 bg-[#0A0E1A] px-4 md:px-6">

      {/* Mobile: stacked, Desktop: single row */}
      <div className="flex flex-col sm:flex-row items-center gap-3 py-3 min-h-[60px]">

        <div className="border border-dashed border-white/20 p-3 text-white/40 text-xs text-center min-h-[40px] flex items-center justify-center w-full sm:w-auto sm:flex-1">
          LOGO + APP NAME
        </div>

        <div className="border border-dashed border-white/20 p-3 text-white/40 text-xs text-center min-h-[40px] flex items-center justify-center w-full sm:w-auto sm:flex-1">
          NAV — Home · Archive
        </div>

        <div className="border border-dashed border-white/20 p-3 text-white/40 text-xs text-center min-h-[40px] flex items-center justify-center w-full sm:w-auto sm:flex-1">
          AUTH STATUS
        </div>

      </div>
    </header>
  )
}
