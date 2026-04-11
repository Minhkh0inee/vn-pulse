"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import GenerateCommentaryBtn from "@/components/dashboard/GenerateCommentaryBtn"
import type { ICommentaryInput } from "@/types/commentary"
import type { Sector } from "@/app/types/sectorScore"

const SECTORS: Sector[] = ["fintech", "ecommerce", "edtech", "healthtech", "deeptech"]

const SECTOR_LABELS: Record<Sector, string> = {
  fintech: "Fintech",
  ecommerce: "E-commerce",
  edtech: "EdTech",
  healthtech: "HealthTech",
  deeptech: "DeepTech",
}

interface SectorRow {
  sector: Sector
  score: string
  trend: string
}

interface FormState {
  month: string
  fundingScore: string
  jobPostingScore: string
  newsVolumeScore: string
  pollScore: string
  fundingWeight: string
  jobPostingWeight: string
  newsVolumeWeight: string
  pollWeight: string
  rawFundingDeals: string
  rawFundingValue: string
  rawJobPostings: string
  rawNewsArticles: string
  rawPollAvg: string
  rawPollCount: string
  commentary: string
  summaryVi: string
  summaryEn: string
}

const DEFAULT_STATE: FormState = {
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

function parseNum(v: string): number {
  const n = parseFloat(v)
  return isNaN(n) ? 0 : n
}

function scoreColor(score: number): string {
  if (score >= 70) return "text-emerald-400"
  if (score >= 40) return "text-amber-400"
  return "text-rose-400"
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col gap-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{title}</p>
      {children}
    </div>
  )
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

export default function AdminPage() {
  const [form, setForm] = useState<FormState>(DEFAULT_STATE)
  const [editingWeights, setEditingWeights] = useState(false)
  const [sectorScores, setSectorScores] = useState<SectorRow[]>(
    SECTORS.map((s) => ({ sector: s, score: "", trend: "" }))
  )

  function setField(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function setSectorField(sector: Sector, key: "score" | "trend", value: string) {
    setSectorScores((prev) =>
      prev.map((row) => (row.sector === sector ? { ...row, [key]: value } : row))
    )
  }

  // Derived values
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

  // All required fields for commentary generation must be present
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-0.5">VN Pulse</p>
          <h1 className="text-lg font-semibold text-white">
            Admin Dashboard
            {form.month && (
              <span className="ml-2 text-sm font-normal text-white/50">— {form.month}</span>
            )}
          </h1>
        </div>
        <Button variant="outline" size="sm" className="sm:self-start">
          Log out
        </Button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Score", value: totalScore.toFixed(1), color: scoreColor(totalScore) },
          { label: "Funding Score", value: form.fundingScore || "—", color: "text-white" },
          { label: "Job Postings Score", value: form.jobPostingScore || "—", color: "text-white" },
          { label: "News Volume Score", value: form.newsVolumeScore || "—", color: "text-white" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 flex flex-col gap-1.5"
          >
            <p className="text-xs text-white/40 uppercase tracking-wide">{label}</p>
            <p className={`text-2xl font-bold tabular-nums ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Form + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left — form */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Month */}
          <SectionCard title="Period">
            <FieldGroup label="Month (YYYY-MM)">
              <Input
                placeholder="2026-04"
                value={form.month}
                onChange={(e) => setField("month", e.target.value)}
                className="max-w-[160px]"
              />
            </FieldGroup>
          </SectionCard>

          {/* Component Scores */}
          <SectionCard title="Component Scores (0 – 100)">
            <div className="grid grid-cols-2 gap-4">
              <FieldGroup label="Funding Score">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="0"
                  value={form.fundingScore}
                  onChange={(e) => setField("fundingScore", e.target.value)}
                />
              </FieldGroup>
              <FieldGroup label="Job Postings Score">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="0"
                  value={form.jobPostingScore}
                  onChange={(e) => setField("jobPostingScore", e.target.value)}
                />
              </FieldGroup>
              <FieldGroup label="News Volume Score">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="0"
                  value={form.newsVolumeScore}
                  onChange={(e) => setField("newsVolumeScore", e.target.value)}
                />
              </FieldGroup>
              <FieldGroup label="Poll Score">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="0"
                  value={form.pollScore}
                  onChange={(e) => setField("pollScore", e.target.value)}
                />
              </FieldGroup>
            </div>
          </SectionCard>

          {/* Weights */}
          <SectionCard title="Weights">
            {/* Header row: weight sum badge + Edit / Done toggle */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">Sum:</span>
                <span
                  className={`text-xs font-semibold tabular-nums ${
                    weightsValid ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {weightSum.toFixed(2)}
                </span>
                {!weightsValid && (
                  <span className="text-xs text-rose-400">— must equal 1.00</span>
                )}
              </div>
              <Button
                variant="outline"
                size="xs"
                onClick={() => setEditingWeights((v) => !v)}
              >
                {editingWeights ? "Done" : "Edit"}
              </Button>
            </div>

            {editingWeights ? (
              /* Editable inputs */
              <div className="grid grid-cols-2 gap-4">
                <FieldGroup label="Funding Weight">
                  <Input
                    type="number"
                    step={0.01}
                    min={0}
                    max={1}
                    value={form.fundingWeight}
                    onChange={(e) => setField("fundingWeight", e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Job Postings Weight">
                  <Input
                    type="number"
                    step={0.01}
                    min={0}
                    max={1}
                    value={form.jobPostingWeight}
                    onChange={(e) => setField("jobPostingWeight", e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="News Volume Weight">
                  <Input
                    type="number"
                    step={0.01}
                    min={0}
                    max={1}
                    value={form.newsVolumeWeight}
                    onChange={(e) => setField("newsVolumeWeight", e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Poll Weight">
                  <Input
                    type="number"
                    step={0.01}
                    min={0}
                    max={1}
                    value={form.pollWeight}
                    onChange={(e) => setField("pollWeight", e.target.value)}
                  />
                </FieldGroup>
              </div>
            ) : (
              /* Read-only display */
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Funding", value: form.fundingWeight },
                  { label: "Job Postings", value: form.jobPostingWeight },
                  { label: "News Volume", value: form.newsVolumeWeight },
                  { label: "Poll", value: form.pollWeight },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
                    <span className="text-xs text-white/50">{label}</span>
                    <span className="text-sm font-medium tabular-nums text-white">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          {/* Raw Signal Data */}
          <SectionCard title="Raw Signal Data (optional)">
            <div className="grid grid-cols-2 gap-4">
              <FieldGroup label="Funding Deals (#)">
                <Input
                  type="number"
                  min={0}
                  placeholder="e.g. 12"
                  value={form.rawFundingDeals}
                  onChange={(e) => setField("rawFundingDeals", e.target.value)}
                />
              </FieldGroup>
              <FieldGroup label="Funding Value (USD M)">
                <Input
                  type="number"
                  min={0}
                  step={0.1}
                  placeholder="e.g. 45.5"
                  value={form.rawFundingValue}
                  onChange={(e) => setField("rawFundingValue", e.target.value)}
                />
              </FieldGroup>
              <FieldGroup label="Job Postings (#)">
                <Input
                  type="number"
                  min={0}
                  placeholder="e.g. 320"
                  value={form.rawJobPostings}
                  onChange={(e) => setField("rawJobPostings", e.target.value)}
                />
              </FieldGroup>
              <FieldGroup label="News Articles (#)">
                <Input
                  type="number"
                  min={0}
                  placeholder="e.g. 87"
                  value={form.rawNewsArticles}
                  onChange={(e) => setField("rawNewsArticles", e.target.value)}
                />
              </FieldGroup>
              <FieldGroup label="Poll Average (1–5)">
                <Input
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  placeholder="e.g. 3.7"
                  value={form.rawPollAvg}
                  onChange={(e) => setField("rawPollAvg", e.target.value)}
                />
              </FieldGroup>
              <FieldGroup label="Poll Responses (#)">
                <Input
                  type="number"
                  min={0}
                  placeholder="e.g. 154"
                  value={form.rawPollCount}
                  onChange={(e) => setField("rawPollCount", e.target.value)}
                />
              </FieldGroup>
            </div>
          </SectionCard>

          {/* Sector Scores */}
          <SectionCard title="Sector Scores">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-[1fr_80px_80px] gap-3 pb-1">
                <p className="text-xs text-white/30 uppercase tracking-wide">Sector</p>
                <p className="text-xs text-white/30 uppercase tracking-wide">Score</p>
                <p className="text-xs text-white/30 uppercase tracking-wide">Trend Δ</p>
              </div>
              {sectorScores.map((row) => (
                <div key={row.sector} className="grid grid-cols-[1fr_80px_80px] gap-3 items-center">
                  <p className="text-sm text-white/70">{SECTOR_LABELS[row.sector]}</p>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="0"
                    value={row.score}
                    onChange={(e) => setSectorField(row.sector, "score", e.target.value)}
                  />
                  <Input
                    type="number"
                    step={0.1}
                    placeholder="0"
                    value={row.trend}
                    onChange={(e) => setSectorField(row.sector, "trend", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Commentary & Summaries */}
          <SectionCard title="Commentary & Summaries">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <Label>Commentary (required)</Label>
                <GenerateCommentaryBtn
                  input={commentaryInput}
                  onGenerated={(text) => setField("commentary", text)}
                  disabled={!canGenerate}
                />
              </div>
              <Textarea
                rows={5}
                placeholder="Monthly analysis and insights..."
                value={form.commentary}
                onChange={(e) => setField("commentary", e.target.value)}
              />
              {!canGenerate && (
                <p className="text-xs text-white/30">
                  Fill month, all 4 scores, and valid weights to enable AI generation.
                </p>
              )}
            </div>
            <FieldGroup label="Summary — Vietnamese">
              <Input
                placeholder="Tóm tắt ngắn tiếng Việt"
                value={form.summaryVi}
                onChange={(e) => setField("summaryVi", e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="Summary — English">
              <Input
                placeholder="Short summary in English"
                value={form.summaryEn}
                onChange={(e) => setField("summaryEn", e.target.value)}
              />
            </FieldGroup>
          </SectionCard>

        </div>

        {/* Right — preview */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col gap-4 sticky top-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Preview</p>

            {/* Score */}
            <div className="flex flex-col items-center gap-1 py-4 border-b border-white/10">
              <p className="text-xs text-white/40 uppercase tracking-wide">Composite Index</p>
              <p className={`text-5xl font-bold tabular-nums ${scoreColor(totalScore)}`}>
                {totalScore.toFixed(1)}
              </p>
              <p className="text-xs text-white/30">/ 100</p>
              {form.month && (
                <p className="mt-1 text-sm text-white/50 font-medium">{form.month}</p>
              )}
            </div>

            {/* Weight validity */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-block size-2 rounded-full ${
                  weightsValid ? "bg-emerald-400" : "bg-rose-400"
                }`}
              />
              <span className="text-xs text-white/50">
                {weightsValid ? "Weights valid" : "Weights invalid"}
              </span>
            </div>

            {/* Sector breakdown */}
            <div className="flex flex-col gap-1.5">
              <p className="text-xs text-white/40 uppercase tracking-wide mb-1">Sectors</p>
              {sectorScores.map((row) => {
                  const t = parseNum(row.trend)
                return (
                  <div key={row.sector} className="flex items-center justify-between gap-2">
                    <span className="text-xs text-white/60">{SECTOR_LABELS[row.sector]}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium tabular-nums text-white">
                        {row.score || "—"}
                      </span>
                      {row.trend && (
                        <span
                          className={`text-xs tabular-nums ${
                            t > 0 ? "text-emerald-400" : t < 0 ? "text-rose-400" : "text-white/30"
                          }`}
                        >
                          {t > 0 ? "+" : ""}{t.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Status */}
            <div className="pt-2 border-t border-white/10">
              <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                <span className="inline-block size-1.5 rounded-full bg-white/20" />
                Not Published
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <p className="text-xs text-white/30 hidden sm:block">
          {!form.month && "Enter a month to enable publish."}
          {form.month && !weightsValid && "Fix weights (must sum to 1.00) to enable publish."}
          {canPublish && "Ready to publish."}
        </p>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm">
            Save Draft
          </Button>
          <Button size="sm" disabled={!canPublish}>
            Publish →
          </Button>
        </div>
      </div>

    </div>
  )
}
