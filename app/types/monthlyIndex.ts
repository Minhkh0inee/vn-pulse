import { AuditLog } from "@prisma/client";
import { ISectorScore } from "./sectorScore";

export interface IMonthlyIndex {
  id: string;
  month: string;
  year: number;
  month_num: number;

  // Scores
  totalScore: number;
  fundingScore: number;
  jobPostingScore: number;
  newsVolumeScore: number;
  pollScore: number;

  // Weights
  fundingWeight: number;
  jobPostingWeight: number;
  newsVolumeWeight: number;
  pollWeight: number;

  // Raw Data (Optional/Null)
  rawFundingDeals: number | null;
  rawFundingValue: number | null;
  rawJobPostings: number | null;
  rawNewsArticles: number | null;
  rawPollAvg: number | null;
  rawPollCount: number | null;

  // Content
  commentary: string;
  summaryVi: string | null;
  summaryEn: string | null;

  // Status & Metadata
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  sectorScores?: ISectorScore[];
  auditLogs?: AuditLog[];
}

