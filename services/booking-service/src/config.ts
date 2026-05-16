export const config = {
  port: Number(process.env['BOOKING_SERVICE_PORT'] ?? 4005),
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  corsOrigins: (process.env['CORS_ORIGINS'] ?? 'http://localhost:3000,http://localhost:4000').split(','),
  notificationServiceUrl: process.env['NOTIFICATION_SERVICE_URL'] ?? 'http://localhost:4008',
  emailServiceUrl: process.env['EMAIL_SERVICE_URL'] ?? 'http://localhost:4009',
} as const
