import Link from 'next/link'
import { BarChart2 } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] mt-12">
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Brand */}
        <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
          <span className="flex size-6 items-center justify-center rounded-md bg-[var(--primary)] text-white">
            <BarChart2 className="size-3.5" />
          </span>
          <span className="text-sm">VN Pulse © {year}</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
          <Link href="/"        className="hover:text-[var(--foreground)] transition-colors">Home</Link>
          <Link href="/archive" className="hover:text-[var(--foreground)] transition-colors">Archive</Link>
        </nav>

      </div>
    </footer>
  )
}
