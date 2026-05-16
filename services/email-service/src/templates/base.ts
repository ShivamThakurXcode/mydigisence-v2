export function baseTemplate(content: string, previewText = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <title>MyDigiSence</title>
  ${previewText ? `<meta name="description" content="${previewText}" />` : ''}
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #f4f6fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1f36; -webkit-font-smoothing: antialiased; }
    .wrapper { max-width: 600px; margin: 40px auto; padding: 0 16px 40px; }
    .header { background: #1a1f36; border-radius: 12px 12px 0 0; padding: 32px 40px; text-align: center; }
    .header-logo { color: #fff; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; text-decoration: none; }
    .body { background: #fff; padding: 40px; border-left: 1px solid #e8ecf4; border-right: 1px solid #e8ecf4; }
    .footer { background: #f4f6fb; border-radius: 0 0 12px 12px; border: 1px solid #e8ecf4; border-top: none; padding: 24px 40px; text-align: center; }
    .footer p { color: #8898aa; font-size: 12px; line-height: 1.6; }
    h1 { font-size: 24px; font-weight: 700; color: #1a1f36; margin-bottom: 16px; line-height: 1.3; }
    p { font-size: 15px; color: #4a5568; line-height: 1.7; margin-bottom: 16px; }
    .btn { display: inline-block; padding: 14px 32px; background: #1a1f36; color: #fff !important; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 600; margin: 16px 0; }
    .btn-accent { background: #f5a623; color: #1a1f36 !important; }
    .divider { border: none; border-top: 1px solid #e8ecf4; margin: 24px 0; }
    .highlight-box { background: #f8fafc; border-left: 4px solid #f5a623; border-radius: 4px; padding: 16px 20px; margin: 20px 0; }
    .highlight-box p { margin-bottom: 0; font-size: 14px; color: #4a5568; }
    .small { font-size: 13px; color: #8898aa; }
    .url-fallback { word-break: break-all; color: #4a90e2; font-size: 13px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <span class="header-logo">MyDigiSence</span>
    </div>
    <div class="body">
      ${content}
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} MyDigiSence · Your Digital Presence Platform</p>
      <p style="margin-top:8px">You're receiving this because you signed up at mydigisence.com</p>
    </div>
  </div>
</body>
</html>`
}
