import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CommentarySkeleton = () => {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 w-full space-y-4">
      <Skeleton className="h-3.5 w-40" />
      <div className="space-y-2.5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-[78%]" />
      </div>
      {/* timestamp */}
      <Skeleton className="h-3 w-44" />
    </div>
  )
}

export default CommentarySkeleton