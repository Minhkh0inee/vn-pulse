import { Skeleton } from '@/components/ui/skeleton'

const SkeletonRow = () => {
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <Skeleton className="size-8 rounded-md shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-2 w-full" />
      </div>
      <Skeleton className="h-4 w-6 shrink-0" />
    </div>
  )
}

export default SkeletonRow