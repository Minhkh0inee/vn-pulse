import { Skeleton } from '../../ui/skeleton'

const ChartSkeleton = () => {
  return (
    <div className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <Skeleton className="h-4 w-32 mb-6" />
      <div className="flex items-end gap-2 h-40">
        {[60, 80, 50, 90, 70, 100].map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-sm"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-8" />
        ))}
      </div>
    </div>
  )
}

export default ChartSkeleton