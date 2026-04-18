interface VerifyEmailTemplateProps {
  verifyUrl: string
  siteUrl?: string
}

export const VerifyEmailTemplate = ({
  verifyUrl,
  siteUrl = 'https://vn-pulse.com',
}: VerifyEmailTemplateProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Confirm your VN Pulse subscription</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f4f4f5', fontFamily: 'Georgia, "Times New Roman", serif' }}>
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#f4f4f5', padding: '32px 16px' }}>
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellPadding={0} cellSpacing={0} style={{ maxWidth: '600px', width: '100%', backgroundColor: '#ffffff', borderRadius: '4px', overflow: 'hidden' }}>
                  <tbody>
                    {/* TOP BAR */}
                    <tr>
                      <td style={{ backgroundColor: '#09090b', padding: '10px 40px', textAlign: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#a1a1aa', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                          Vietnamese Startup Ecosystem
                        </span>
                      </td>
                    </tr>

                    {/* MASTHEAD */}
                    <tr>
                      <td style={{ padding: '36px 40px 28px', textAlign: 'center', borderBottom: '2px solid #09090b' }}>
                        <div style={{ marginBottom: '6px' }}>
                          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', marginRight: '8px', verticalAlign: 'middle' }} />
                          <span style={{ fontSize: '32px', fontWeight: 700, color: '#09090b', letterSpacing: '-0.5px' }}>VN Pulse</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '14px', color: '#71717a', fontStyle: 'italic' }}>
                          One last step.
                        </p>
                      </td>
                    </tr>

                    {/* BODY */}
                    <tr>
                      <td style={{ padding: '36px 40px 0' }}>
                        <p style={{ margin: '0 0 16px', fontSize: '16px', lineHeight: '1.75', color: '#18181b' }}>
                          Click the button below to confirm your email and start receiving the monthly VN Pulse index.
                        </p>
                      </td>
                    </tr>

                    {/* CTA */}
                    <tr>
                      <td style={{ padding: '36px 40px' }}>
                        <table width="100%" cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td style={{ backgroundColor: '#09090b', borderRadius: '6px', padding: '20px 28px' }}>
                                <table width="100%" cellPadding={0} cellSpacing={0}>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <p style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 600, color: '#ffffff', fontFamily: 'sans-serif' }}>
                                          Confirm your subscription
                                        </p>
                                        <p style={{ margin: 0, fontSize: '13px', color: '#a1a1aa', fontFamily: 'sans-serif' }}>
                                          This link expires in 24 hours.
                                        </p>
                                      </td>
                                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap', paddingLeft: '20px' }}>
                                        <a href={verifyUrl} style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#ef4444', color: '#ffffff', textDecoration: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: 600, fontFamily: 'sans-serif' }}>
                                          Confirm →
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

                    {/* FOOTER */}
                    <tr>
                      <td style={{ backgroundColor: '#fafafa', borderTop: '1px solid #e4e4e7', padding: '20px 40px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'sans-serif' }}>
                          If you didn&apos;t request this, you can safely ignore it.
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#a1a1aa', fontFamily: 'sans-serif' }}>
                          <a href={siteUrl} style={{ color: '#71717a', textDecoration: 'underline' }}>vn-pulse.com</a>
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