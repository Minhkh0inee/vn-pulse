import { z } from "zod"
export interface ICommentaryInput {
  month:        string
  totalScore:   number
  trend:        number | null  
  fundingScore: number
  jobScore:     number
  newsScore:    number
  pollScore:    number
  rawData?: {
    fundingDeals?:  number
    fundingValueUsd?: number
    jobPostings?:   number
    newsArticles?:  number
    pollAvg?:       number
    pollCount?:     number
  }
}

export const CommentaryInputSchema = z.object({
  month:        z.string().regex(/^\d{4}-\d{2}$/, "Format phải là YYYY-MM"),
  totalScore:   z.number().min(0).max(100),
  trend:        z.number().nullable(),
  fundingScore: z.number().min(0).max(100),
  jobScore:     z.number().min(0).max(100),
  newsScore:    z.number().min(0).max(100),
  pollScore:    z.number().min(0).max(100),
  rawData: z.object({
    fundingDeals:    z.number().int().min(0).optional(),
    fundingValueUsd: z.number().min(0).optional(),
    jobPostings:     z.number().int().min(0).optional(),
    newsArticles:    z.number().int().min(0).optional(),
    pollAvg:         z.number().min(1).max(5).optional(),
    pollCount:       z.number().int().min(0).optional(),
  }).optional(),
})

// Infer TypeScript type từ schema — không cần define 2 lần
export type CommentaryInput = z.infer<typeof CommentaryInputSchema>