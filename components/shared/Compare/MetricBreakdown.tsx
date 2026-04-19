import React from "react";
import CompareMetricRow from "./CompareMetricRow";
import { IMonthlyIndex } from "@/app/types/monthlyIndex";

interface MetricBreakdownProps {
  labelA: string;
  labelB: string;
  indexA: IMonthlyIndex;
  indexB: IMonthlyIndex;
}

const MetricBreakdown: React.FC<MetricBreakdownProps> = ({
  indexA,
  indexB,
  labelA,
  labelB
}) => {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6">
      <div className="grid grid-cols-[1fr_auto_1fr] mb-4">
        <p className="text-right text-sm font-semibold text-[var(--foreground)]">
          {labelA}
        </p>
        <div className="min-w-[140px]" />
        <p className="text-left text-sm font-semibold text-[var(--foreground)]">
          {labelB}
        </p>
      </div>

      <CompareMetricRow
        label="Overall Index"
        scoreA={indexA.totalScore}
        scoreB={indexB.totalScore}
      />
      <CompareMetricRow
        label="Funding"
        weight={indexA.fundingWeight}
        scoreA={indexA.fundingScore}
        scoreB={indexB.fundingScore}
      />
      <CompareMetricRow
        label="Job Postings"
        weight={indexA.jobPostingWeight}
        scoreA={indexA.jobPostingScore}
        scoreB={indexB.jobPostingScore}
      />
      <CompareMetricRow
        label="News Volume"
        weight={indexA.newsVolumeWeight}
        scoreA={indexA.newsVolumeScore}
        scoreB={indexB.newsVolumeScore}
      />
      <CompareMetricRow
        label="Community Poll"
        weight={indexA.pollWeight}
        scoreA={indexA.pollScore}
        scoreB={indexB.pollScore}
      />
    </div>
  );
};

export default MetricBreakdown;
