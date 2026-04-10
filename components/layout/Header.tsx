'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2 } from 'lucide-react'
import { ThemeToggle } from '../ThemeToggle'

export default function Header() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-20 w-full border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 md:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex size-7 items-center justify-center rounded-md bg-[var(--primary)] text-white">
            <BarChart2 className="size-4" />
          </span>
          <span className="text-sm font-semibold text-[var(--foreground)] hidden sm:block">
            VN Pulse
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
          <Link
            href="/"
            className={`rounded-md px-3 py-1.5 font-medium transition-colors hover:text-[var(--foreground)] hover:bg-[var(--accent)] ${
              pathname === '/'
                ? 'text-[var(--foreground)] bg-[var(--accent)]'
                : 'text-[var(--muted-foreground)]'
            }`}
          >
            Home
          </Link>
          <Link
            href="/archive"
            className={`rounded-md px-3 py-1.5 font-medium transition-colors hover:text-[var(--foreground)] hover:bg-[var(--accent)] ${
              pathname.startsWith('/archive')
                ? 'text-[var(--foreground)] bg-[var(--accent)]'
                : 'text-[var(--muted-foreground)]'
            }`}
          >
            Archive
          </Link>
          <ThemeToggle />
        </nav>
    
      </div>
    </header>
  )
}
