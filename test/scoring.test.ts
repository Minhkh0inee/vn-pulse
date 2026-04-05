import { calculateIndex, normalizeToScore } from '../lib/scoring'
import { describe, it, expect } from 'vitest'

describe('normalizeToScore', () => {
  it('returns 0 when value <= 0', () => {
    expect(normalizeToScore(0, 100, 50)).toBe(0)
  })
  it('returns 100 when value >= max', () => {
    expect(normalizeToScore(200, 100, 50)).toBe(100)
  })
})

describe('calculateIndex', () => {
  it('throws when weights do not sum to 1', () => {
    expect(() => calculateIndex({
      funding:    { deals: 3, valueUsd: 5 },
      jobPosting: { count: 100 },
      newsVolume: { count: 30 },
      pollAvg:    3,
      weights:    { funding: 0.5, jobPosting: 0.5, news: 0.5, poll: 0.5 }
    })).toThrow()
  })

  it('returns score between 0 and 100', () => {
    const result = calculateIndex({
      funding:    { deals: 3, valueUsd: 5 },
      jobPosting: { count: 100 },
      newsVolume: { count: 30 },
      pollAvg:    3,
    })
    expect(result.total).toBeGreaterThanOrEqual(0)
    expect(result.total).toBeLessThanOrEqual(100)
  })
})