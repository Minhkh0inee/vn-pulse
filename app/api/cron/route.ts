import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  // Verify đây là Vercel gọi, không phải người random
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log(`[CRON] Started at ${new Date().toISOString()}`)

  try {
    await prisma.monthlyIndex.count() 

    console.log(`[CRON] Completed successfully`)

    return Response.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Cron job ran successfully'
    })

  } catch (error) {
    console.error(`[CRON] Failed:`, error)
    return Response.json({ error: String(error) }, { status: 500 })
  }
}