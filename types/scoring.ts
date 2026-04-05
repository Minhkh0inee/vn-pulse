export interface WeightConfig {
  funding:    number  
  jobPosting: number
  news:       number
  poll:       number
}

export interface ScoreInputs {
  funding: {
    deals:    number
    valueUsd: number
  }
  jobPosting: {
    count: number
  }
  newsVolume: {
    count: number
  }
  pollAvg:  number
  weights?: WeightConfig  
}

export interface ScoreBreakdown {
  fundingScore: number
  jobScore:     number
  newsScore:    number
  pollScore:    number
}

export interface IndexScore {
  total:     number
  breakdown: ScoreBreakdown
}