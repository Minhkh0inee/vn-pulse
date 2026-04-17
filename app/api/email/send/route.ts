import { EmailTemplate } from '@/components/email/EmailTemplate'
import { getLatestTwoIndexes } from '@/lib/fetchers'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.NEXT_RESEND_API_KEY)
const from = process.env.NEXT_MAIL_FROM
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vn-pulse.com'
const BATCH_SIZE = 50
console.log("resend:", resend)
console.log("process.env.RESEND_API_KEY:", process.env.RESEND_API_KEY)

function formatMonthLabel(month: string): string {
  const [year, mon] = month.split('-')
  const date = new Date(Number(year), Number(mon) - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export async function POST(request: Request) {
  const auth = request.headers.get('Authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [latest, previous] = await getLatestTwoIndexes()
    if (!latest) {
      return Response.json({ error: 'No published index found' }, { status: 404 })
    }

    const subscribers = await prisma.subscriber.findMany({
      where: { isVerified: true, unsubscribedAt: null },
      select: { email: true, verifyToken: true },
    })

    if (subscribers.length === 0) {
      return Response.json({ sent: 0, message: 'No active subscribers' })
    }

    const monthLabel = formatMonthLabel(latest.month)
    const fundingValue =
      latest.rawFundingValue != null
        ? `$${(latest.rawFundingValue / 1_000_000).toFixed(1)}M`
        : undefined

    let totalSent = 0

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE)

      const emails = batch.map((sub) => ({
        from: from,
        to: sub.email,
        subject: `VN Pulse · ${monthLabel} Index — ${latest.totalScore.toFixed(1)}/100`,
        react: EmailTemplate({
          month: monthLabel,
          score: latest.totalScore,
          previousScore: previous?.totalScore,
          fundingValue,
          fundingDeals: latest.rawFundingDeals ?? undefined,
          jobPostings: latest.rawJobPostings ?? undefined,
          commentary: latest.commentary,
          unsubscribeUrl: sub.verifyToken
            ? `${SITE_URL}/unsubscribe?token=${sub.verifyToken}`
            : `${SITE_URL}/unsubscribe`,
          siteUrl: SITE_URL,
        }),
      }))
      console.log("email:" , emails)
      await resend.batch.send(emails)
      totalSent += batch.length
    }
    console.log("Email Sent")
    return Response.json({ sent: totalSent })
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 })
  }
}
