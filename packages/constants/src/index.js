"use strict";
// ─── User & Workspace Roles ───────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_TTL = exports.PAGINATION = exports.REDIS_KEYS = exports.ERROR_CODES = exports.HTTP_STATUS = exports.QUEUE_NAMES = exports.NOTIFICATION_TYPES = exports.CRM_CONTACT_STATUS = exports.LISTING_STATUS = exports.BOOKING_STATUS = exports.WORKSPACE_MODULES = exports.DASHBOARD_WIDGET_TYPES = exports.PROFILE_SECTION_TYPES = exports.SUBSCRIPTION_PLANS = exports.WORKSPACE_TYPES = exports.WORKSPACE_ROLES = exports.USER_ROLES = void 0;
exports.USER_ROLES = {
    BUSINESS: 'business',
    PROFESSIONAL: 'professional',
    EXPLORER: 'explorer',
};
exports.WORKSPACE_ROLES = {
    OWNER: 'owner',
    ADMIN: 'admin',
    EDITOR: 'editor',
    MEMBER: 'member',
    VIEWER: 'viewer',
};
exports.WORKSPACE_TYPES = {
    BUSINESS: 'business',
    PROFESSIONAL: 'professional',
    CREATOR: 'creator',
    AGENCY: 'agency',
    ENTERPRISE: 'enterprise',
};
// ─── Subscription Plans ───────────────────────────────────────────────────────
exports.SUBSCRIPTION_PLANS = {
    FREE: 'free',
    STARTER: 'starter',
    PRO: 'pro',
    BUSINESS: 'business',
    ENTERPRISE: 'enterprise',
};
// ─── Profile Section Types ────────────────────────────────────────────────────
exports.PROFILE_SECTION_TYPES = {
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
};
// ─── Dashboard Widget Types ───────────────────────────────────────────────────
exports.DASHBOARD_WIDGET_TYPES = {
    REVENUE_ANALYTICS: 'revenue_analytics',
    BOOKING_CALENDAR: 'booking_calendar',
    CRM_OVERVIEW: 'crm_overview',
    SALES_CHART: 'sales_chart',
    CUSTOMER_INSIGHTS: 'customer_insights',
    LEAD_TRACKING: 'lead_tracking',
    SEO_ANALYTICS: 'seo_analytics',
    AI_SUGGESTIONS: 'ai_suggestions',
    ENGAGEMENT_METRICS: 'engagement_metrics',
};
// ─── Workspace Modules ────────────────────────────────────────────────────────
exports.WORKSPACE_MODULES = {
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
};
// ─── Booking Status ───────────────────────────────────────────────────────────
exports.BOOKING_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    NO_SHOW: 'no_show',
};
// ─── Service / Listing Status ─────────────────────────────────────────────────
exports.LISTING_STATUS = {
    ACTIVE: 'active',
    DRAFT: 'draft',
    ARCHIVED: 'archived',
    SUSPENDED: 'suspended',
};
// ─── CRM Contact Status ───────────────────────────────────────────────────────
exports.CRM_CONTACT_STATUS = {
    LEAD: 'lead',
    PROSPECT: 'prospect',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CHURNED: 'churned',
};
// ─── Notification Types ───────────────────────────────────────────────────────
exports.NOTIFICATION_TYPES = {
    BOOKING_CONFIRMED: 'booking_confirmed',
    BOOKING_CANCELLED: 'booking_cancelled',
    NEW_MESSAGE: 'new_message',
    NEW_REVIEW: 'new_review',
    NEW_FOLLOWER: 'new_follower',
    PAYMENT_RECEIVED: 'payment_received',
    WORKSPACE_INVITE: 'workspace_invite',
    AI_SUGGESTION: 'ai_suggestion',
    SYSTEM: 'system',
};
// ─── BullMQ Queue Names ───────────────────────────────────────────────────────
exports.QUEUE_NAMES = {
    EMAIL: 'email-queue',
    NOTIFICATION: 'notification-queue',
    AUTOMATION: 'automation-queue',
    INDEXING: 'indexing-queue',
    EMBEDDING: 'embedding-queue',
    ANALYTICS: 'analytics-queue',
    MEDIA: 'media-queue',
};
// ─── HTTP Status Codes ────────────────────────────────────────────────────────
exports.HTTP_STATUS = {
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
};
// ─── Error Codes ──────────────────────────────────────────────────────────────
exports.ERROR_CODES = {
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
};
// ─── Redis Key Prefixes ───────────────────────────────────────────────────────
exports.REDIS_KEYS = {
    SESSION: 'session:',
    EMAIL_VERIFY: 'email_verify:',
    PASSWORD_RESET: 'password_reset:',
    RATE_LIMIT: 'rate_limit:',
    REFRESH_TOKEN: 'refresh:',
    WORKSPACE_CACHE: 'workspace:',
    PROFILE_CACHE: 'profile:',
};
// ─── Pagination ───────────────────────────────────────────────────────────────
exports.PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
};
// ─── Token TTLs (seconds) ─────────────────────────────────────────────────────
exports.TOKEN_TTL = {
    ACCESS: 15 * 60, // 15 minutes
    REFRESH: 7 * 24 * 60 * 60, // 7 days
    EMAIL_VERIFY: 24 * 60 * 60, // 24 hours
    PASSWORD_RESET: 60 * 60, // 1 hour
    SESSION: 7 * 24 * 60 * 60, // 7 days
};
//# sourceMappingURL=index.js.map