// ─── User & Workspace Roles ───────────────────────────────────────────────────

export const USER_ROLES = {
  BUSINESS: 'business',
  PROFESSIONAL: 'professional',
  EXPLORER: 'explorer',
} as const

export const WORKSPACE_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  EDITOR: 'editor',
  MEMBER: 'member',
  VIEWER: 'viewer',
} as const

export const WORKSPACE_TYPES = {
  BUSINESS: 'business',
  PROFESSIONAL: 'professional',
  CREATOR: 'creator',
  AGENCY: 'agency',
  ENTERPRISE: 'enterprise',
} as const

// ─── Subscription Plans ───────────────────────────────────────────────────────

export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  STARTER: 'starter',
  PRO: 'pro',
  BUSINESS: 'business',
  ENTERPRISE: 'enterprise',
} as const

// ─── Profile Section Types ────────────────────────────────────────────────────

export const PROFILE_SECTION_TYPES = {
  HERO: 'hero',
  ABOUT: 'about',
  SERVICES: 'services',
  PRODUCTS: 'products',
  PRICING: 'pricing',
  GALLERY: 'gallery',
  REVIEWS: 'reviews',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  BOOKING: 'booking',
  FAQS: 'faqs',
  CONTACT: 'contact',
} as const

// ─── Dashboard Widget Types ───────────────────────────────────────────────────

export const DASHBOARD_WIDGET_TYPES = {
  REVENUE_ANALYTICS: 'revenue_analytics',
  BOOKING_CALENDAR: 'booking_calendar',
  CRM_OVERVIEW: 'crm_overview',
  SALES_CHART: 'sales_chart',
  CUSTOMER_INSIGHTS: 'customer_insights',
  LEAD_TRACKING: 'lead_tracking',
  SEO_ANALYTICS: 'seo_analytics',
  AI_SUGGESTIONS: 'ai_suggestions',
  ENGAGEMENT_METRICS: 'engagement_metrics',
} as const

// ─── Workspace Modules ────────────────────────────────────────────────────────

export const WORKSPACE_MODULES = {
  BOOKING: 'booking',
  CRM: 'crm',
  MARKETPLACE: 'marketplace',
  CAMPAIGNS: 'campaigns',
  ANALYTICS: 'analytics',
  AI: 'ai',
  SEO: 'seo',
  TEAM: 'team',
  REVIEWS: 'reviews',
  AUTOMATION: 'automation',
  MEDIA: 'media',
  INTEGRATIONS: 'integrations',
  CUSTOM_DOMAIN: 'custom_domain',
} as const

// ─── Booking Status ───────────────────────────────────────────────────────────

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  NO_SHOW: 'no_show',
} as const

// ─── Service / Listing Status ─────────────────────────────────────────────────

export const LISTING_STATUS = {
  ACTIVE: 'active',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
  SUSPENDED: 'suspended',
} as const

// ─── CRM Contact Status ───────────────────────────────────────────────────────

export const CRM_CONTACT_STATUS = {
  LEAD: 'lead',
  PROSPECT: 'prospect',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  CHURNED: 'churned',
} as const

// ─── Notification Types ───────────────────────────────────────────────────────

export const NOTIFICATION_TYPES = {
  BOOKING_CONFIRMED: 'booking_confirmed',
  BOOKING_CANCELLED: 'booking_cancelled',
  NEW_MESSAGE: 'new_message',
  NEW_REVIEW: 'new_review',
  NEW_FOLLOWER: 'new_follower',
  PAYMENT_RECEIVED: 'payment_received',
  WORKSPACE_INVITE: 'workspace_invite',
  AI_SUGGESTION: 'ai_suggestion',
  SYSTEM: 'system',
} as const

// ─── BullMQ Queue Names ───────────────────────────────────────────────────────

export const QUEUE_NAMES = {
  EMAIL: 'email-queue',
  NOTIFICATION: 'notification-queue',
  AUTOMATION: 'automation-queue',
  INDEXING: 'indexing-queue',
  EMBEDDING: 'embedding-queue',
  ANALYTICS: 'analytics-queue',
  MEDIA: 'media-queue',
} as const

// ─── HTTP Status Codes ────────────────────────────────────────────────────────

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
} as const

// ─── Error Codes ──────────────────────────────────────────────────────────────

export const ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  USERNAME_TAKEN: 'USERNAME_TAKEN',
  WORKSPACE_NOT_FOUND: 'WORKSPACE_NOT_FOUND',
  PROFILE_NOT_FOUND: 'PROFILE_NOT_FOUND',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const

// ─── Redis Key Prefixes ───────────────────────────────────────────────────────

export const REDIS_KEYS = {
  SESSION: 'session:',
  EMAIL_VERIFY: 'email_verify:',
  PASSWORD_RESET: 'password_reset:',
  RATE_LIMIT: 'rate_limit:',
  REFRESH_TOKEN: 'refresh:',
  WORKSPACE_CACHE: 'workspace:',
  PROFILE_CACHE: 'profile:',
} as const

// ─── Pagination ───────────────────────────────────────────────────────────────

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const

// ─── Token TTLs (seconds) ─────────────────────────────────────────────────────

export const TOKEN_TTL = {
  ACCESS: 15 * 60,           // 15 minutes
  REFRESH: 7 * 24 * 60 * 60, // 7 days
  EMAIL_VERIFY: 24 * 60 * 60, // 24 hours
  PASSWORD_RESET: 60 * 60,    // 1 hour
  SESSION: 7 * 24 * 60 * 60,  // 7 days
} as const

// ─── Type Exports ─────────────────────────────────────────────────────────────

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]
export type WorkspaceRole = (typeof WORKSPACE_ROLES)[keyof typeof WORKSPACE_ROLES]
export type WorkspaceType = (typeof WORKSPACE_TYPES)[keyof typeof WORKSPACE_TYPES]
export type SubscriptionPlan = (typeof SUBSCRIPTION_PLANS)[keyof typeof SUBSCRIPTION_PLANS]
export type ProfileSectionType = (typeof PROFILE_SECTION_TYPES)[keyof typeof PROFILE_SECTION_TYPES]
export type WorkspaceModule = (typeof WORKSPACE_MODULES)[keyof typeof WORKSPACE_MODULES]
export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS]
export type ListingStatus = (typeof LISTING_STATUS)[keyof typeof LISTING_STATUS]
export type NotificationType = (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES]
