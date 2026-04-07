'use client'

import React, { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Clock } from 'lucide-react'
import CommentarySkeleton from './CommentarySkeleton'
import { formatDate, splitWords } from '@/utils/commentaryComponent.utils'

interface CommentaryComponentProps {
  month:       string        // e.g. "March 2026"
  commentary:  string
  publishedAt: Date | string | null
  isLoading?:  boolean
}
const WORD_LIMIT = 60  

const CommentaryComponent: React.FC<CommentaryComponentProps> = ({
  month,
  commentary,
  publishedAt,
  isLoading = false,
}) => {
  const [expanded, setExpanded] = useState(false)

  if (isLoading) return <CommentarySkeleton />

  const { head, tail } = splitWords(commentary, WORD_LIMIT)
  const isTruncatable = tail.length > 0

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 w-full">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
        Analysis for {month}
      </p>

      <p className="text-sm sm:text-base leading-7 text-[var(--foreground)]">
        {expanded || !isTruncatable ? (
          commentary
        ) : (
          <>
            {head}
            <span className="text-[var(--muted-foreground)]">…</span>
          </>
        )}
      </p>

      {isTruncatable && (
        <button
          onClick={() => setExpanded(prev => !prev)}
          className="mt-2 text-xs font-medium text-[var(--primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}

      {/* Timestamp */}
      <div className="mt-4 flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
        <Clock className="size-3 shrink-0" />
        <span>Updated at {formatDate(publishedAt)}</span>
      </div>
    </div>
  )
}

export default CommentaryComponent
