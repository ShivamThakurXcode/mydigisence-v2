import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env['NODE_ENV'] === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })
}

// Singleton for dev to avoid exhausting DB connections with HMR
export const prisma = globalThis.__prisma ?? createPrismaClient()

if (process.env['NODE_ENV'] !== 'production') {
  globalThis.__prisma = prisma
}

export { PrismaClient }
export type { Prisma } from '@prisma/client'

// Re-export all Prisma types for convenience
export type {
  User,
  Profile,
  Workspace,
  BusinessProfile,
  ProfessionalProfile,
  Service,
  Product,
  Booking,
  Review,
  Conversation,
  Message,
  Notification,
  CrmContact,
  Automation,
  Campaign,
  AnalyticsEvent,
} from '@prisma/client'
