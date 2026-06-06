"use client"

import { useState, useEffect } from "react"
import type { Sector } from "@/app/types/sectorScore"
import type { ICommentaryInput } from "@/types/commentary"
import { parseNum } from "@/components/admin/shared"
import type { FormState, SectorRow } from "@/components/admin/types"
import { getExistingMonths } from "./actions"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { StatsBar } from "@/components/admin/StatsBar"
import { PeriodSection } from "@/components/admin/PeriodSection"
import { ComponentScoresSection } from "@/components/admin/ComponentScoresSection"
import { WeightsSection } from "@/components/admin/WeightsSection"
import { RawSignalDataSection } from "@/components/admin/RawSignalDataSection"
import { SectorScoresSection } from "@/components/admin/SectorScoresSection"
import { CommentarySectionEditor } from "@/components/admin/CommentarySection"
import { PreviewPanel } from "@/components/admin/PreviewPanel"
import { ActionBar } from "@/components/admin/ActionBar"

const SECTORS: Sector[] = ["fintech", "ecommerce", "edtech", "healthtech", "deeptech"]

const DEFAULT_FORM: FormState = {
  month: "",
  fundingScore: "",
  jobPostingScore: "",
  newsVolumeScore: "",
  pollScore: "",
  fundingWeight: "0.30",
  jobPostingWeight: "0.25",
  newsVolumeWeight: "0.25",
  pollWeight: "0.20",
  rawFundingDeals: "",
  rawFundingValue: "",
  rawJobPostings: "",
  rawNewsArticles: "",
  rawPollAvg: "",
  rawPollCount: "",
  commentary: "",
  summaryVi: "",
  summaryEn: "",
}

export default function AdminPage() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM)
  const [existingMonths, setExistingMonths] = useState<string[]>([])

  useEffect(() => {
    getExistingMonths().then(setExistingMonths)
  }, [])
  const [editingWeights, setEditingWeights] = useState(false)
  const [sectorScores, setSectorScores] = useState<SectorRow[]>(
    SECTORS.map((s) => ({ sector: s, score: "", trend: "", summaryVi: "", summaryEn: "" }))
  )

  function setField(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function setSectorField(sector: Sector, key: keyof Omit<SectorRow, "sector">, value: string) {
    setSectorScores((prev) =>
      prev.map((row) => (row.sector === sector ? { ...row, [key]: value } : row))
    )
  }

  const fw = parseNum(form.fundingWeight)
  const jw = parseNum(form.jobPostingWeight)
  const nw = parseNum(form.newsVolumeWeight)
  const pw = parseNum(form.pollWeight)
  const weightSum = fw + jw + nw + pw
  const weightsValid = Math.abs(weightSum - 1.0) < 0.001

  const fs = parseNum(form.fundingScore)
  const js = parseNum(form.jobPostingScore)
  const ns = parseNum(form.newsVolumeScore)
  const ps = parseNum(form.pollScore)
  const totalScore = fs * fw + js * jw + ns * nw + ps * pw

  const canPublish = form.month.trim().length > 0 && weightsValid

  const monthValid = /^\d{4}-\d{2}$/.test(form.month.trim())
  const scoresReady =
    form.fundingScore !== "" &&
    form.jobPostingScore !== "" &&
    form.newsVolumeScore !== "" &&
    form.pollScore !== ""
  const canGenerate = monthValid && scoresReady && weightsValid

  const commentaryInput: ICommentaryInput = {
    month: form.month.trim(),
    totalScore,
    trend: null,
    fundingScore: fs,
    jobScore: js,
    newsScore: ns,
    pollScore: ps,
    rawData: {
      fundingDeals:    form.rawFundingDeals    !== "" ? parseNum(form.rawFundingDeals)    : undefined,
      fundingValueUsd: form.rawFundingValue    !== "" ? parseNum(form.rawFundingValue)    : undefined,
      jobPostings:     form.rawJobPostings     !== "" ? parseNum(form.rawJobPostings)     : undefined,
      newsArticles:    form.rawNewsArticles    !== "" ? parseNum(form.rawNewsArticles)    : undefined,
      pollAvg:         form.rawPollAvg         !== "" ? parseNum(form.rawPollAvg)         : undefined,
      pollCount:       form.rawPollCount       !== "" ? parseNum(form.rawPollCount)       : undefined,
    },
  }

  return (
    <div className="bg-[#0A0E1A] min-h-screen flex flex-col gap-5 p-5 md:p-8 text-white">

      <AdminHeader month={form.month} />

      <StatsBar
        totalScore={totalScore}
        fundingScore={form.fundingScore}
        jobPostingScore={form.jobPostingScore}
        newsVolumeScore={form.newsVolumeScore}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <div className="lg:col-span-2 flex flex-col gap-4">
          <PeriodSection
            month={form.month}
            existingMonths={existingMonths}
            onChange={(v) => setField("month", v)}
          />

          <ComponentScoresSection
            fundingScore={form.fundingScore}
            jobPostingScore={form.jobPostingScore}
            newsVolumeScore={form.newsVolumeScore}
            pollScore={form.pollScore}
            onChange={setField}
          />

          <WeightsSection
            fundingWeight={form.fundingWeight}
            jobPostingWeight={form.jobPostingWeight}
            newsVolumeWeight={form.newsVolumeWeight}
            pollWeight={form.pollWeight}
            weightSum={weightSum}
            weightsValid={weightsValid}
            editing={editingWeights}
            onToggleEdit={() => setEditingWeights((v) => !v)}
            onChange={setField}
          />

          <RawSignalDataSection
            rawFundingDeals={form.rawFundingDeals}
            rawFundingValue={form.rawFundingValue}
            rawJobPostings={form.rawJobPostings}
            rawNewsArticles={form.rawNewsArticles}
            rawPollAvg={form.rawPollAvg}
            rawPollCount={form.rawPollCount}
            onChange={setField}
          />

          <SectorScoresSection
            sectorScores={sectorScores}
            canGenerate={canGenerate}
            month={form.month}
            totalScore={totalScore}
            onChange={setSectorField}
          />

          <CommentarySectionEditor
            commentary={form.commentary}
            summaryVi={form.summaryVi}
            summaryEn={form.summaryEn}
            canGenerate={canGenerate}
            commentaryInput={commentaryInput}
            onChange={setField}
          />
        </div>

        <div className="flex flex-col gap-4">
          <PreviewPanel
            totalScore={totalScore}
            month={form.month}
            weightsValid={weightsValid}
            sectorScores={sectorScores}
          />
        </div>

      </div>

      <ActionBar
        month={form.month}
        weightsValid={weightsValid}
        canPublish={canPublish}
        form={form}
        sectorScores={sectorScores}
        onPublishSuccess={() => {
          getExistingMonths().then(setExistingMonths)
          setForm(DEFAULT_FORM)
          setSectorScores(SECTORS.map((s) => ({ sector: s, score: "", trend: "", summaryVi: "", summaryEn: "" })))
        }}
      />

    </div>
  )
}
