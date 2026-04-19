import { getAllIndexes, getIndexesByMonths } from '@/lib/fetchers'
import CompareClient from '@/components/shared/Compare/CompareClient'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { IMonthlyIndex } from '@/app/types/monthlyIndex'
import { formatMonthLabel } from '@/utils/formatMonthLabel'

export const revalidate = 3600

interface ComparePageProps {
  searchParams: Promise<{ a?: string; b?: string }>
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams
  const { a, b } = params

  const allIndexes = await getAllIndexes()

  let indexA: IMonthlyIndex | null = null
  let indexB: IMonthlyIndex | null = null

  if (a && b && a !== b) {
    const results = await getIndexesByMonths(a, b)
    indexA = results.find(i => i.month === a) ?? null
    indexB = results.find(i => i.month === b) ?? null
  }

  const monthOptions = allIndexes.map(idx => ({
    value: idx.month,
    label: formatMonthLabel(idx.month),
  }))

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-8 space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Compare</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Month Comparison
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Compare two months side by side — total score, components, and sector breakdown.
        </p>
      </div>

      <CompareClient
        monthOptions={monthOptions}
        selectedA={a ?? null}
        selectedB={b ?? null}
        indexA={indexA}
        indexB={indexB}
      />

    </div>
  )
}
