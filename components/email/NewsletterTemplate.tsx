import React from 'react'
import { IMonthlyIndex } from '@/app/types/monthlyIndex'
import { formatMonthLabel } from '@/utils/formatMonthLabel'
import { SECTOR_LABELS } from '@/lib/constant/sectors'
import { computeTrend } from '@/utils/scoreCard.utils'

interface NewsletterTemplateProps {
  index: IMonthlyIndex 
  previousScore?: number
  baseUrl: string
  unsubscribeUrl: string
}

function getScoreColor(score: number): string {
  if (score >= 70) return '#16a34a'
  if (score >= 50) return '#d97706'
  return '#dc2626'
}

export const NewsletterTemplate = ({
  index,
  previousScore,
  baseUrl,
  unsubscribeUrl,
}: NewsletterTemplateProps) => {
  const monthLabel = formatMonthLabel(index.month)
  const { direction, deltaStr, icon, isFlat } = computeTrend(previousScore != null ? index.totalScore - previousScore : null)
  const scoreColor = getScoreColor(index.totalScore)
  const readMoreUrl = `${baseUrl}/archive/${index.year}/${String(index.month_num).padStart(2, '0')}`

  const trendColor = isFlat ? '#6b7280' : direction === 'up' ? '#16a34a' : '#dc2626'

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VN Pulse — {monthLabel} Index</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f4f4f5', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#f4f4f5', padding: '32px 16px' }}>
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellPadding={0} cellSpacing={0} style={{ maxWidth: 600, width: '100%' }}>
                  <tbody>

                    {/* Header */}
                    <tr>
                      <td style={{ backgroundColor: '#0f172a', borderRadius: '12px 12px 0 0', padding: '28px 40px' }}>
                        <table width="100%" cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td>
                                <span style={{ color: '#f8fafc', fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px' }}>
                                  VN<span style={{ color: '#f97316' }}>Pulse</span>
                                </span>
                                <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: 13 }}>
                                  Vietnamese Startup Ecosystem Tracker
                                </p>
                              </td>
                              <td align="right">
                                <span style={{ color: '#64748b', fontSize: 13 }}>{monthLabel}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Hero Score */}
                    <tr>
                      <td style={{ backgroundColor: '#ffffff', padding: '40px 40px 32px' }}>
                        <p style={{ margin: '0 0 8px', color: '#6b7280', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          Monthly Composite Index
                        </p>
                        <table cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td>
                                <span style={{ fontSize: 72, fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
                                  {index.totalScore.toFixed(1)}
                                </span>
                                <span style={{ fontSize: 22, color: '#9ca3af', marginLeft: 4 }}>/100</span>
                              </td>
                              {!isFlat && (
                                <td style={{ paddingLeft: 20, verticalAlign: 'middle' }}>
                                  <div style={{
                                    backgroundColor: direction === 'up' ? '#dcfce7' : '#fee2e2',
                                    borderRadius: 8,
                                    padding: '6px 14px',
                                    display: 'inline-block',
                                  }}>
                                    <span style={{ color: trendColor, fontSize: 18, fontWeight: 700 }}>
                                      {icon} {deltaStr}
                                    </span>
                                    <p style={{ margin: '2px 0 0', color: trendColor, fontSize: 12 }}>
                                      vs last month
                                    </p>
                                  </div>
                                </td>
                              )}
                            </tr>
                          </tbody>
                        </table>

                        {/* Summary */}
                        {(index.summaryEn || index.summaryVi) && (
                          <p style={{ margin: '20px 0 0', color: '#374151', fontSize: 15, lineHeight: 1.7, borderLeft: '3px solid #f97316', paddingLeft: 16 }}>
                            {index.summaryEn ?? index.summaryVi}
                          </p>
                        )}
                      </td>
                    </tr>

                    {/* Score Breakdown */}
                    <tr>
                      <td style={{ backgroundColor: '#ffffff', padding: '0 40px 32px', borderBottom: '1px solid #f1f5f9' }}>
                        <p style={{ margin: '0 0 16px', color: '#111827', fontSize: 15, fontWeight: 600 }}>Score Breakdown</p>
                        <table width="100%" cellPadding={0} cellSpacing={0}>
                          <tbody>
                            {[
                              { label: 'Funding', score: index.fundingScore, weight: index.fundingWeight },
                              { label: 'Job Postings', score: index.jobPostingScore, weight: index.jobPostingWeight },
                              { label: 'News Volume', score: index.newsVolumeScore, weight: index.newsVolumeWeight },
                              { label: 'Community Poll', score: index.pollScore, weight: index.pollWeight },
                            ].map(({ label, score, weight }) => (
                              <tr key={label}>
                                <td style={{ paddingBottom: 12 }}>
                                  <table width="100%" cellPadding={0} cellSpacing={0}>
                                    <tbody>
                                      <tr>
                                        <td style={{ color: '#374151', fontSize: 14 }}>{label}</td>
                                        <td align="right" style={{ color: '#6b7280', fontSize: 13 }}>
                                          {(weight * 100).toFixed(0)}% weight
                                        </td>
                                        <td align="right" style={{ width: 48, color: getScoreColor(score), fontWeight: 700, fontSize: 14 }}>
                                          {score.toFixed(1)}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan={3} style={{ paddingTop: 4 }}>
                                          <div style={{ backgroundColor: '#f1f5f9', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                                            <div style={{
                                              backgroundColor: getScoreColor(score),
                                              height: 6,
                                              width: `${Math.min(score, 100)}%`,
                                              borderRadius: 4,
                                            }} />
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Sector Scores */}
                    {index.sectorScores && index.sectorScores.length > 0 && (
                      <tr>
                        <td style={{ backgroundColor: '#ffffff', padding: '28px 40px 32px' }}>
                          <p style={{ margin: '0 0 16px', color: '#111827', fontSize: 15, fontWeight: 600 }}>Sector Highlights</p>
                          <table width="100%" cellPadding={0} cellSpacing={0}>
                            <tbody>
                              <tr>
                                {index.sectorScores.map((s) => {
                                  const trendUp = s.trend != null && s.trend > 0
                                  const trendDown = s.trend != null && s.trend < 0
                                  return (
                                    <td key={s.sector} align="center" style={{ padding: '0 6px' }}>
                                      <div style={{
                                        backgroundColor: '#f8fafc',
                                        borderRadius: 10,
                                        padding: '14px 10px',
                                        border: '1px solid #e2e8f0',
                                      }}>
                                        <p style={{ margin: 0, color: '#6b7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                          {SECTOR_LABELS[s.sector] ?? s.sector}
                                        </p>
                                        <p style={{ margin: '6px 0 0', color: getScoreColor(s.score), fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
                                          {s.score.toFixed(0)}
                                        </p>
                                        {s.trend != null && (
                                          <p style={{ margin: '4px 0 0', fontSize: 12, color: trendUp ? '#16a34a' : trendDown ? '#dc2626' : '#9ca3af' }}>
                                            {trendUp ? '↑' : trendDown ? '↓' : '—'} {Math.abs(s.trend).toFixed(1)}
                                          </p>
                                        )}
                                      </div>
                                    </td>
                                  )
                                })}
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}

                    {/* CTA */}
                    <tr>
                      <td style={{ backgroundColor: '#0f172a', padding: '32px 40px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 20px', color: '#cbd5e1', fontSize: 15, lineHeight: 1.6 }}>
                          Dive deeper into the full analysis, charts, and raw data behind the {monthLabel} index.
                        </p>
                        <a
                          href={readMoreUrl}
                          style={{
                            display: 'inline-block',
                            backgroundColor: '#f97316',
                            color: '#ffffff',
                            textDecoration: 'none',
                            borderRadius: 8,
                            padding: '14px 32px',
                            fontSize: 15,
                            fontWeight: 700,
                            letterSpacing: '0.02em',
                          }}
                        >
                          Read Full Report →
                        </a>
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td style={{ backgroundColor: '#1e293b', borderRadius: '0 0 12px 12px', padding: '24px 40px', textAlign: 'center' }}>
                        <p style={{ margin: 0, color: '#64748b', fontSize: 12, lineHeight: 1.8 }}>
                          You are receiving this because you subscribed to VN Pulse updates.
                          <br />
                          <a href={unsubscribeUrl} style={{ color: '#94a3b8', textDecoration: 'underline' }}>
                            Unsubscribe
                          </a>
                          {' · '}
                          <a href={baseUrl} style={{ color: '#94a3b8', textDecoration: 'underline' }}>
                            Visit VN Pulse
                          </a>
                        </p>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  )
}

export default NewsletterTemplate
