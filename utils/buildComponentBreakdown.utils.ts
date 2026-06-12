import { ComponentBreakdownData } from "@/components/shared/ComponentBreakdown/ComponentBreakdown";

type BreakdownInput = Pick<ComponentBreakdownData,
  'fundingScore' | 'jobPostingScore' | 'newsVolumeScore' | 'pollScore' |
  'fundingWeight' | 'jobPostingWeight' | 'newsVolumeWeight' | 'pollWeight'
>

export function buildComponentBreakdown(index: BreakdownInput): ComponentBreakdownData {
  return {
    fundingScore:     index.fundingScore,
    jobPostingScore:  index.jobPostingScore,
    newsVolumeScore:  index.newsVolumeScore,
    pollScore:        index.pollScore,
    fundingWeight:    index.fundingWeight,
    jobPostingWeight: index.jobPostingWeight,
    newsVolumeWeight: index.newsVolumeWeight,
    pollWeight:       index.pollWeight,
  }
}