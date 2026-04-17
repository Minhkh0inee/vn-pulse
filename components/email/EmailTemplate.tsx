import React from 'react'

interface NewsletterHighlight {
  emoji: string
  text: string
}

interface EmailTemplateProps {
  month: string
  issueNumber?: number
  score: number
  previousScore?: number
  fundingValue?: string
  fundingDeals?: number
  jobPostings?: number
  topSector?: string
  commentary?: string | null
  highlights?: NewsletterHighlight[]
  unsubscribeUrl?: string
  siteUrl?: string
}

export const EmailTemplate = ({
  month = 'April 2026',
  issueNumber,
  score = 0,
  previousScore,
  fundingValue,
  fundingDeals,
  jobPostings,
  topSector,
  commentary,
  highlights = [],
  unsubscribeUrl = '#',
  siteUrl = 'https://vn-pulse.com',
}: EmailTemplateProps) => {
  const scoreDelta =
    previousScore != null ? +(score - previousScore).toFixed(1) : null
  const deltaSign = scoreDelta != null && scoreDelta >= 0 ? '+' : ''
  const scoreColor =
    score >= 70 ? '#16a34a' : score >= 45 ? '#d97706' : '#dc2626'
  const scoreBg =
    score >= 70 ? '#f0fdf4' : score >= 45 ? '#fffbeb' : '#fff1f2'
  const scoreBorder =
    score >= 70 ? '#bbf7d0' : score >= 45 ? '#fde68a' : '#fecdd3'

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>VN Pulse Newsletter — {month}</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#f4f4f5',
          fontFamily:
            'Georgia, "Times New Roman", serif',
        }}
      >
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: '#f4f4f5', padding: '32px 16px' }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  width="600"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    maxWidth: '600px',
                    width: '100%',
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <tbody>

                    {/* ── TOP BAR ── */}
                    <tr>
                      <td
                        style={{
                          backgroundColor: '#09090b',
                          padding: '10px 40px',
                          textAlign: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '11px',
                            color: '#a1a1aa',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          }}
                        >
                          Vietnamese Startup Ecosystem{issueNumber ? ` · Issue #${issueNumber}` : ''}
                        </span>
                      </td>
                    </tr>

                    {/* ── MASTHEAD ── */}
                    <tr>
                      <td
                        style={{
                          padding: '36px 40px 28px',
                          textAlign: 'center',
                          borderBottom: '2px solid #09090b',
                        }}
                      >
                        <div style={{ marginBottom: '6px' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: '#ef4444',
                              marginRight: '8px',
                              verticalAlign: 'middle',
                            }}
                          />
                          <span
                            style={{
                              fontSize: '32px',
                              fontWeight: 700,
                              color: '#09090b',
                              letterSpacing: '-0.5px',
                            }}
                          >
                            VN Pulse
                          </span>
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '14px',
                            color: '#71717a',
                            fontStyle: 'italic',
                          }}
                        >
                          {month} · Monthly Index & Ecosystem Digest
                        </p>
                      </td>
                    </tr>

                    {/* ── OPENING LINE ── */}
                    <tr>
                      <td style={{ padding: '28px 40px 0' }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '16px',
                            lineHeight: '1.75',
                            color: '#18181b',
                          }}
                        >
                          Welcome back. Here is your monthly read on the Vietnamese startup
                          ecosystem — funding flows, hiring signals, and what the numbers
                          say about where things are heading.
                        </p>
                      </td>
                    </tr>

                    {/* ── SECTION LABEL ── */}
                    <tr>
                      <td style={{ padding: '32px 40px 12px' }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#a1a1aa',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          }}
                        >
                          This Month&apos;s Score
                        </p>
                        <div
                          style={{
                            height: '2px',
                            backgroundColor: '#f4f4f5',
                            marginTop: '8px',
                          }}
                        />
                      </td>
                    </tr>

                    {/* ── SCORE CARD ── */}
                    <tr>
                      <td style={{ padding: '0 40px' }}>
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  backgroundColor: scoreBg,
                                  border: `1px solid ${scoreBorder}`,
                                  borderRadius: '6px',
                                  padding: '24px 28px',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <table width="100%" cellPadding={0} cellSpacing={0}>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <span
                                          style={{
                                            fontSize: '56px',
                                            fontWeight: 800,
                                            color: scoreColor,
                                            letterSpacing: '-2px',
                                            lineHeight: 1,
                                            fontFamily:
                                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                          }}
                                        >
                                          {score.toFixed(1)}
                                        </span>
                                        <span
                                          style={{
                                            fontSize: '16px',
                                            color: scoreColor,
                                            marginLeft: '4px',
                                            fontFamily:
                                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                          }}
                                        >
                                          / 100
                                        </span>
                                        {scoreDelta != null && (
                                          <span
                                            style={{
                                              display: 'inline-block',
                                              marginLeft: '12px',
                                              padding: '3px 10px',
                                              borderRadius: '999px',
                                              fontSize: '12px',
                                              fontWeight: 600,
                                              backgroundColor: scoreDelta >= 0 ? '#dcfce7' : '#fee2e2',
                                              color: scoreDelta >= 0 ? '#15803d' : '#b91c1c',
                                              verticalAlign: 'middle',
                                              fontFamily:
                                                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                            }}
                                          >
                                            {deltaSign}{scoreDelta}
                                          </span>
                                        )}
                                        <p
                                          style={{
                                            margin: '6px 0 0',
                                            fontSize: '13px',
                                            color: scoreColor,
                                            fontFamily:
                                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                          }}
                                        >
                                          Composite index score for {month}
                                          {scoreDelta != null && (
                                            <> · {scoreDelta >= 0 ? 'Up' : 'Down'} {Math.abs(scoreDelta)} points from last month</>
                                          )}
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* ── SECTION LABEL: HIGHLIGHTS ── */}
                    {highlights.length > 0 && (
                      <>
                        <tr>
                          <td style={{ padding: '32px 40px 12px' }}>
                            <p
                              style={{
                                margin: 0,
                                fontSize: '10px',
                                fontWeight: 700,
                                color: '#a1a1aa',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                              }}
                            >
                              Key Highlights
                            </p>
                            <div
                              style={{
                                height: '2px',
                                backgroundColor: '#f4f4f5',
                                marginTop: '8px',
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '0 40px' }}>
                            <table width="100%" cellPadding={0} cellSpacing={0}>
                              <tbody>
                                {highlights.map((h, i) => (
                                  <tr key={i}>
                                    <td
                                      style={{
                                        padding: '10px 0',
                                        borderBottom: i < highlights.length - 1 ? '1px solid #f4f4f5' : 'none',
                                        verticalAlign: 'top',
                                      }}
                                    >
                                      <span style={{ marginRight: '12px', fontSize: '18px' }}>
                                        {h.emoji}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: '14px',
                                          lineHeight: '1.6',
                                          color: '#27272a',
                                        }}
                                      >
                                        {h.text}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </>
                    )}

                    {/* ── SECTION LABEL: SIGNALS ── */}
                    {(fundingValue || jobPostings != null || topSector) && (
                      <>
                        <tr>
                          <td style={{ padding: '32px 40px 12px' }}>
                            <p
                              style={{
                                margin: 0,
                                fontSize: '10px',
                                fontWeight: 700,
                                color: '#a1a1aa',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                              }}
                            >
                              Ecosystem Signals
                            </p>
                            <div
                              style={{
                                height: '2px',
                                backgroundColor: '#f4f4f5',
                                marginTop: '8px',
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '0 40px' }}>
                            <table width="100%" cellPadding={0} cellSpacing={0}>
                              <tbody>
                                {fundingValue && (
                                  <tr>
                                    <td
                                      style={{
                                        padding: '14px 0',
                                        borderBottom: '1px solid #f4f4f5',
                                        verticalAlign: 'top',
                                      }}
                                    >
                                      <table width="100%" cellPadding={0} cellSpacing={0}>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <p
                                                style={{
                                                  margin: '0 0 2px',
                                                  fontSize: '11px',
                                                  fontWeight: 600,
                                                  color: '#a1a1aa',
                                                  textTransform: 'uppercase',
                                                  letterSpacing: '0.5px',
                                                  fontFamily:
                                                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                                }}
                                              >
                                                Total Funding Raised
                                              </p>
                                              <p
                                                style={{
                                                  margin: 0,
                                                  fontSize: '20px',
                                                  fontWeight: 700,
                                                  color: '#09090b',
                                                  letterSpacing: '-0.3px',
                                                  fontFamily:
                                                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                                }}
                                              >
                                                {fundingValue}
                                                {fundingDeals != null && (
                                                  <span
                                                    style={{
                                                      fontSize: '13px',
                                                      fontWeight: 400,
                                                      color: '#71717a',
                                                      marginLeft: '8px',
                                                    }}
                                                  >
                                                    across {fundingDeals} deals
                                                  </span>
                                                )}
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                )}
                                {jobPostings != null && (
                                  <tr>
                                    <td
                                      style={{
                                        padding: '14px 0',
                                        borderBottom: topSector ? '1px solid #f4f4f5' : 'none',
                                        verticalAlign: 'top',
                                      }}
                                    >
                                      <p
                                        style={{
                                          margin: '0 0 2px',
                                          fontSize: '11px',
                                          fontWeight: 600,
                                          color: '#a1a1aa',
                                          textTransform: 'uppercase',
                                          letterSpacing: '0.5px',
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                        }}
                                      >
                                        Active Job Postings
                                      </p>
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: '20px',
                                          fontWeight: 700,
                                          color: '#09090b',
                                          letterSpacing: '-0.3px',
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                        }}
                                      >
                                        {jobPostings.toLocaleString()}
                                        <span
                                          style={{
                                            fontSize: '13px',
                                            fontWeight: 400,
                                            color: '#71717a',
                                            marginLeft: '8px',
                                          }}
                                        >
                                          listings tracked
                                        </span>
                                      </p>
                                    </td>
                                  </tr>
                                )}
                                {topSector && (
                                  <tr>
                                    <td style={{ padding: '14px 0' }}>
                                      <p
                                        style={{
                                          margin: '0 0 2px',
                                          fontSize: '11px',
                                          fontWeight: 600,
                                          color: '#a1a1aa',
                                          textTransform: 'uppercase',
                                          letterSpacing: '0.5px',
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                        }}
                                      >
                                        Leading Sector
                                      </p>
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: '20px',
                                          fontWeight: 700,
                                          color: '#09090b',
                                          letterSpacing: '-0.3px',
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                        }}
                                      >
                                        {topSector}
                                      </p>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </>
                    )}

                    {/* ── SECTION LABEL: COMMENTARY ── */}
                    {commentary && (
                      <>
                        <tr>
                          <td style={{ padding: '32px 40px 12px' }}>
                            <p
                              style={{
                                margin: 0,
                                fontSize: '10px',
                                fontWeight: 700,
                                color: '#a1a1aa',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                              }}
                            >
                              Editor&apos;s Note
                            </p>
                            <div
                              style={{
                                height: '2px',
                                backgroundColor: '#f4f4f5',
                                marginTop: '8px',
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '0 40px' }}>
                            <p
                              style={{
                                margin: '12px 0 0',
                                fontSize: '15px',
                                lineHeight: '1.8',
                                color: '#3f3f46',
                                fontStyle: 'italic',
                              }}
                            >
                              &ldquo;{commentary}&rdquo;
                            </p>
                          </td>
                        </tr>
                      </>
                    )}

                    {/* ── CTA ── */}
                    <tr>
                      <td style={{ padding: '36px 40px' }}>
                        <table width="100%" cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  backgroundColor: '#09090b',
                                  borderRadius: '6px',
                                  padding: '20px 28px',
                                }}
                              >
                                <table width="100%" cellPadding={0} cellSpacing={0}>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <p
                                          style={{
                                            margin: '0 0 4px',
                                            fontSize: '15px',
                                            fontWeight: 600,
                                            color: '#ffffff',
                                            fontFamily:
                                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                          }}
                                        >
                                          Read the full {month} report
                                        </p>
                                        <p
                                          style={{
                                            margin: 0,
                                            fontSize: '13px',
                                            color: '#a1a1aa',
                                            fontFamily:
                                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                          }}
                                        >
                                          Sector breakdowns, trend charts, and community poll results.
                                        </p>
                                      </td>
                                      <td
                                        style={{
                                          textAlign: 'right',
                                          whiteSpace: 'nowrap',
                                          paddingLeft: '20px',
                                        }}
                                      >
                                        <a
                                          href={siteUrl}
                                          style={{
                                            display: 'inline-block',
                                            padding: '10px 20px',
                                            backgroundColor: '#ef4444',
                                            color: '#ffffff',
                                            textDecoration: 'none',
                                            borderRadius: '4px',
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            fontFamily:
                                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                          }}
                                        >
                                          Read now →
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* ── FOOTER ── */}
                    <tr>
                      <td
                        style={{
                          backgroundColor: '#fafafa',
                          borderTop: '1px solid #e4e4e7',
                          padding: '20px 40px',
                          textAlign: 'center',
                        }}
                      >
                        <p
                          style={{
                            margin: '0 0 6px',
                            fontSize: '12px',
                            color: '#a1a1aa',
                            lineHeight: '1.6',
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          }}
                        >
                          You&apos;re receiving this because you subscribed to VN Pulse.
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '12px',
                            color: '#a1a1aa',
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          }}
                        >
                          <a
                            href={unsubscribeUrl}
                            style={{ color: '#71717a', textDecoration: 'underline' }}
                          >
                            Unsubscribe
                          </a>
                          {' · '}
                          <a
                            href={siteUrl}
                            style={{ color: '#71717a', textDecoration: 'underline' }}
                          >
                            vn-pulse.com
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

export default EmailTemplate
