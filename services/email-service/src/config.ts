export const config = {
  port: Number(process.env['EMAIL_SERVICE_PORT'] ?? 4009),
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  smtp: {
    host: process.env['SMTP_HOST'] ?? 'localhost',
    port: Number(process.env['SMTP_PORT'] ?? 1025),
    user: process.env['SMTP_USER'] ?? '',
    pass: process.env['SMTP_PASS'] ?? '',
  },
  from: process.env['FROM_EMAIL'] ?? 'noreply@mydigisence.com',
  fromName: process.env['FROM_NAME'] ?? 'MyDigiSence',
  appUrl: process.env['APP_URL'] ?? 'http://localhost:3000',
} as const
