import { getAllIndexes } from '@/lib/fetchers'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { CalendarX2 } from 'lucide-react'
import YearFilter from '@/components/shared/YearFilter'

export const revalidate = 3600

export default async function ArchivePage() {
  const allIndexes = await getAllIndexes()

  const years = [...new Set(allIndexes.map(idx => idx.year))].sort((a, b) => b - a)

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-8 space-y-8">

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Lịch sử</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Lịch sử chỉ số
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Toàn bộ dữ liệu chỉ số hệ sinh thái khởi nghiệp Việt Nam theo từng tháng
        </p>
      </div>

      {/* Content */}
      {allIndexes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center text-[var(--muted-foreground)]">
          <CalendarX2 className="size-10 opacity-40" />
          <p className="text-base font-medium">Chưa có dữ liệu</p>
          <p className="text-sm">Dữ liệu tháng đầu tiên sẽ xuất hiện tại đây sau khi được công bố.</p>
        </div>
      ) : (
        <YearFilter indexes={allIndexes} years={years} />
      )}

    </div>
  )
}
