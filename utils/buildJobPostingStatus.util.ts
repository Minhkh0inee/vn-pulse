import { IMonthlyIndex } from "@/app/types/monthlyIndex";

export function buildJobPostingStatus(index: IMonthlyIndex) {
    const hasJobs    = index.rawJobPostings != null
    return {
    value: hasJobs
    ? index.rawJobPostings!.toLocaleString()
    : 'Not available',
    sub: hasJobs
    ? 'active listings tracked'
    : 'Data not collected for this period',
  }
}