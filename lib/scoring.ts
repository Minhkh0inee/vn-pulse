import { IndexScore, ScoreInputs, WeightConfig } from "@/types/scoring"

const BASELINES = {
  fundingDeals: 3,
  fundingValue: 5,
  jobPostings:  100,
  newsArticles: 30,
}

const MAX_VALUES = {
  fundingDeals: 15,
  fundingValue: 50,
  jobPostings:  300,
  newsArticles: 100,
}

export const DEFAULT_WEIGHTS: WeightConfig = {
  funding:    0.30,
  jobPosting: 0.25,
  news:       0.25,
  poll:       0.20,
}

export function normalizeToScore(
  value:    number,
  max:      number,
  baseline: number
): number {
  if (value <= 0) return 0
  if (value >= max) return 100

  const score         = (value / max) * 100
  const baselineBonus = value > baseline ? 5 : 0

  return Math.min(100, Math.round(score + baselineBonus))
}

export function calculateIndex(inputs: ScoreInputs): IndexScore {
  const weights = inputs.weights ?? DEFAULT_WEIGHTS

  const sum = weights.funding + weights.jobPosting + weights.news + weights.poll
  if (Math.abs(sum - 1) > 0.001) {
    throw new Error(`Weights must sum to 1, got ${sum}`)
  }

  const dealScore    = normalizeToScore(inputs.funding.deals,    MAX_VALUES.fundingDeals, BASELINES.fundingDeals)
  const valueScore   = normalizeToScore(inputs.funding.valueUsd, MAX_VALUES.fundingValue, BASELINES.fundingValue)
  const fundingScore = Math.round((dealScore + valueScore) / 2)

  const jobScore  = normalizeToScore(inputs.jobPosting.count,  MAX_VALUES.jobPostings,  BASELINES.jobPostings)
  const newsScore = normalizeToScore(inputs.newsVolume.count,  MAX_VALUES.newsArticles, BASELINES.newsArticles)

  const clampedPoll = Math.min(5, Math.max(1, inputs.pollAvg))
  const pollScore   = Math.round((clampedPoll / 5) * 100)

  const total =
    fundingScore * weights.funding    +
    jobScore     * weights.jobPosting +
    newsScore    * weights.news       +
    pollScore    * weights.poll

  return {
    total:     Math.round(total * 10) / 10,
    breakdown: { fundingScore, jobScore, newsScore, pollScore }
  }
}