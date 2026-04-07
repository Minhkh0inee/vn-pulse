export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0E1A] flex flex-col">

      <div className="border border-dashed border-white/20 p-4 text-white/40 text-xs text-center min-h-[60px] flex items-center justify-center sticky top-0 z-10">
        HEADER
      </div>

      <main className="flex-1">
        {children}
      </main>

      <div className="border border-dashed border-white/20 p-4 text-white/40 text-xs text-center min-h-[60px] flex items-center justify-center">
        FOOTER
      </div>

    </div>
  )
}
