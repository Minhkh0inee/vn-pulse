import { IMonthlyIndex } from "@/app/types/monthlyIndex"

export function buildFundingStatus(index: IMonthlyIndex) {
    const hasFunding = index.rawFundingValue != null
      return {
    value: hasFunding
      ? `$${(index.rawFundingValue! / 1_000_000).toFixed(1)}M`
      : "Not available",
    sub: hasFunding && index.rawFundingDeals != null
      ? `across ${index.rawFundingDeals} deals`
      : "Data not collected for this period",
  }
}