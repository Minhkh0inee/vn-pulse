'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ArchiveCard from '@/components/shared/ArchiveCard'
import type { IMonthlyIndex } from '@/app/types/monthlyIndex'

interface YearFilterProps {
  indexes: IMonthlyIndex[]   // DESC-sorted full list
  years: number[]            // unique years, DESC
}

export default function YearFilter({ indexes, years }: YearFilterProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  const filtered = selectedYear
    ? indexes.filter(idx => idx.year === selectedYear)
    : indexes

  return (
    <div className="space-y-6">
      {/* Year pill buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedYear === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedYear(null)}
        >
          Tất cả
        </Button>
        {years.map(year => (
          <Button
            key={year}
            variant={selectedYear === year ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </Button>
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(idx => {
          // Find this item in the full sorted array to get the true previous month
          const globalPos = indexes.findIndex(x => x.id === idx.id)
          const prevScore = indexes[globalPos + 1]?.totalScore

          return (
            <ArchiveCard
              key={idx.id}
              month={idx.month}
              score={idx.totalScore}
              previousScore={prevScore}
            />
          )
        })}
      </div>
    </div>
  )
}
