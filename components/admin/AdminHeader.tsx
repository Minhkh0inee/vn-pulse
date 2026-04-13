import { Button } from "@/components/ui/button"

interface AdminHeaderProps {
  month: string
}

export function AdminHeader({ month }: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1">
        <p className="text-xs uppercase tracking-widest text-white/40 mb-0.5">VN Pulse</p>
        <h1 className="text-lg font-semibold text-white">
          Admin Dashboard
          {month && (
            <span className="ml-2 text-sm font-normal text-white/50">— {month}</span>
          )}
        </h1>
      </div>
      <Button variant="outline" size="sm" className="sm:self-start">
        Log out
      </Button>
    </div>
  )
}
