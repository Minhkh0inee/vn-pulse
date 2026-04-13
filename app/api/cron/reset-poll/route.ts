import { prisma } from "@/lib/prisma"
import { getCurrentMonth, getPreviousMonth } from "@/utils/month.utils"

export async function GET(req: Request) {
  const auth = req.headers.get("authorization")
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const month     = getCurrentMonth()
  const prevMonth = getPreviousMonth(month)

  await prisma.poll.updateMany({
    where: { month: prevMonth, isOpen: true },
    data:  { isOpen: false, closedAt: new Date() },
  })

  await prisma.poll.upsert({
    where:  { month },
    update: {},
    create: {
      month,
      question: `Bạn đánh giá hệ sinh thái startup Việt Nam tháng ${month} như thế nào?`,
      isOpen: true,
    },
  })
}