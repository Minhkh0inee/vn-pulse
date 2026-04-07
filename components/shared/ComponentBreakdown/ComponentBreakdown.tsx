'use client'

import React from 'react'
import { Banknote, Briefcase, Newspaper, BarChart2 } from 'lucide-react'
import Row from './Row'
import SkeletonRow from './SkeletonRow'

export interface ComponentBreakdownData {
  fundingScore:      number
  jobPostingScore:   number
  newsVolumeScore:   number
  pollScore:         number
  fundingWeight:     number  // e.g. 0.30
  jobPostingWeight:  number
  newsVolumeWeight:  number
  pollWeight:        number
}

interface ComponentBreakdownProps {
  data?:      ComponentBreakdownData
  isLoading?: boolean
}


const ComponentBreakdown: React.FC<ComponentBreakdownProps> = ({ data, isLoading = false }) => {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 w-full">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
        Component Breakdown
      </p>

      <div className="divide-y divide-[var(--border)]">
        {isLoading || !data ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : (
          <>
            <Row icon={<Banknote  className="size-4" />} label="Funding"        weight={data.fundingWeight}   score={data.fundingScore}   />
            <Row icon={<Briefcase className="size-4" />} label="Job Postings"   weight={data.jobPostingWeight} score={data.jobPostingScore} />
            <Row icon={<Newspaper className="size-4" />} label="News Volume"    weight={data.newsVolumeWeight} score={data.newsVolumeScore} />
            <Row icon={<BarChart2  className="size-4" />} label="Community Poll" weight={data.pollWeight}       score={data.pollScore}       />
          </>
        )}
      </div>
    </div>
  )
}

export default ComponentBreakdown
