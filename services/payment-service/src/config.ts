export const config = {
  port: Number(process.env['PAYMENT_SERVICE_PORT'] ?? 4007),
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  stripe: {
    secretKey: process.env['STRIPE_SECRET_KEY'] ?? 'sk_test_placeholder',
    webhookSecret: process.env['STRIPE_WEBHOOK_SECRET'] ?? 'whsec_placeholder',
    publishableKey: process.env['STRIPE_PUBLISHABLE_KEY'] ?? 'pk_test_placeholder',
  },
  corsOrigins: (process.env['CORS_ORIGINS'] ?? 'http://localhost:3000,http://localhost:4000').split(','),
} as const
