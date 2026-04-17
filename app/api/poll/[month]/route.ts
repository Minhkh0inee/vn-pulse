// app/api/v1/poll/[month]/route.ts
import { NextResponse }  from "next/server"
import { prisma }        from "@/lib/prisma"
import { redis }         from "@/lib/redis"
import { hashIP } from "@/utils/month.utils"
import { PollResult } from "@/app/types/poll"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ month: string }> }
) {
  const { month } = await params
  const ip        = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
  const ipHash    = await hashIP(ip)
  try {
    // 1. Check cache
    const cacheKey  = `poll:result:${month}`
    const votedKey  = `poll:voted:${month}:${ipHash}`

    const [cached, hasVoted] = await Promise.all([
      redis.get<PollResult>(cacheKey),
      redis.get(votedKey),
    ])

    if (cached) {
      return NextResponse.json({
        success:  true,
        data:     cached,
        hasVoted: !!hasVoted,
        source:   "cache",
      })
    }

    // 2. Query DB
    const poll = await prisma.poll.findUnique({
      where:   { month },
      include: { responses: true },
    })

    if (!poll) {
      return NextResponse.json(
        { success: false, error: "Poll not found for this month" },
        { status: 404 }
      )
    }

    // 3. Tính kết quả
    const totalVotes = poll.responses.length
    const avgRating  = totalVotes > 0
      ? poll.responses.reduce((sum, r) => sum + r.rating, 0) / totalVotes
      : 0

    const distribution = [1, 2, 3, 4, 5].map(rating => {
      const count = poll.responses.filter(r => r.rating === rating).length
      return {
        rating,
        count,
        percent: totalVotes > 0
          ? Math.round((count / totalVotes) * 100)
          : 0,
      }
    })

    const result: PollResult = {
      month:      poll.month,
      question:   poll.question,
      isOpen:     poll.isOpen,
      totalVotes,
      avgRating:  Math.round(avgRating * 10) / 10,
      distribution,
    }

    // 4. Cache 5 phút (poll thay đổi thường xuyên)
    await redis.set(cacheKey, result, { ex: 300 })

    return NextResponse.json(
      { success: true, data: result, hasVoted: !!hasVoted, source: "db" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    )

  } catch (error) {
    console.error("[POLL GET ERROR]", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}