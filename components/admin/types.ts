import type { Sector } from "@/app/types/sectorScore"

export interface SectorRow {
  sector: Sector
  score: string
  trend: string
}

export interface FormState {
  month: string
  fundingScore: string
  jobPostingScore: string
  newsVolumeScore: string
  pollScore: string
  fundingWeight: string
  jobPostingWeight: string
  newsVolumeWeight: string
  pollWeight: string
  rawFundingDeals: string
  rawFundingValue: string
  rawJobPostings: string
  rawNewsArticles: string
  rawPollAvg: string
  rawPollCount: string
  commentary: string
  summaryVi: string
  summaryEn: string
}
