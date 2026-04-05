import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { redis } from "@/lib/redis"

export async function GET() {
  const checks = {
    database: { status: "ok", latency: 0 },
    redis:    { status: "ok", latency: 0 },
  }

  try {
    const dbStart = Date.now()
    await prisma.$queryRaw`SELECT 1`
    checks.database.latency = Date.now() - dbStart
  } catch (error) {
    checks.database.status = "error"
  }

  try {
    const redisStart = Date.now()
    await redis.ping()
    checks.redis.latency = Date.now() - redisStart
  } catch (error) {
    checks.redis.status = "error"
  }

  const allOk = Object.values(checks).every(c => c.status === "ok")

  return NextResponse.json(
    {
      status:    allOk ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      services:  checks,
    },
    { status: allOk ? 200 : 503 }
  )
}