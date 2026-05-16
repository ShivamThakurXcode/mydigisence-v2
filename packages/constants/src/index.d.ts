export declare const USER_ROLES: {
    readonly BUSINESS: "business";
    readonly PROFESSIONAL: "professional";
    readonly EXPLORER: "explorer";
};
export declare const WORKSPACE_ROLES: {
    readonly OWNER: "owner";
    readonly ADMIN: "admin";
    readonly EDITOR: "editor";
    readonly MEMBER: "member";
    readonly VIEWER: "viewer";
};
export declare const WORKSPACE_TYPES: {
    readonly BUSINESS: "business";
    readonly PROFESSIONAL: "professional";
    readonly CREATOR: "creator";
    readonly AGENCY: "agency";
    readonly ENTERPRISE: "enterprise";
};
export declare const SUBSCRIPTION_PLANS: {
    readonly FREE: "free";
    readonly STARTER: "starter";
    readonly PRO: "pro";
    readonly BUSINESS: "business";
    readonly ENTERPRISE: "enterprise";
};
export declare const PROFILE_SECTION_TYPES: {
    readonly HERO: "hero";
    readonly ABOUT: "about";
    readonly SERVICES: "services";
    readonly PRODUCTS: "products";
    readonly PRICING: "pricing";
    readonly GALLERY: "gallery";
    readonly REVIEWS: "reviews";
    readonly SKILLS: "skills";
    readonly EXPERIENCE: "experience";
    readonly PROJECTS: "projects";
    readonly BOOKING: "booking";
    readonly FAQS: "faqs";
    readonly CONTACT: "contact";
};
export declare const DASHBOARD_WIDGET_TYPES: {
    readonly REVENUE_ANALYTICS: "revenue_analytics";
    readonly BOOKING_CALENDAR: "booking_calendar";
    readonly CRM_OVERVIEW: "crm_overview";
    readonly SALES_CHART: "sales_chart";
    readonly CUSTOMER_INSIGHTS: "customer_insights";
    readonly LEAD_TRACKING: "lead_tracking";
    readonly SEO_ANALYTICS: "seo_analytics";
    readonly AI_SUGGESTIONS: "ai_suggestions";
    readonly ENGAGEMENT_METRICS: "engagement_metrics";
};
export declare const WORKSPACE_MODULES: {
    readonly BOOKING: "booking";
    readonly CRM: "crm";
    readonly MARKETPLACE: "marketplace";
    readonly CAMPAIGNS: "campaigns";
    readonly ANALYTICS: "analytics";
    readonly AI: "ai";
    readonly SEO: "seo";
    readonly TEAM: "team";
    readonly REVIEWS: "reviews";
    readonly AUTOMATION: "automation";
    readonly MEDIA: "media";
    readonly INTEGRATIONS: "integrations";
    readonly CUSTOM_DOMAIN: "custom_domain";
};
export declare const BOOKING_STATUS: {
    readonly PENDING: "pending";
    readonly CONFIRMED: "confirmed";
    readonly CANCELLED: "cancelled";
    readonly COMPLETED: "completed";
    readonly NO_SHOW: "no_show";
};
export declare const LISTING_STATUS: {
    readonly ACTIVE: "active";
    readonly DRAFT: "draft";
    readonly ARCHIVED: "archived";
    readonly SUSPENDED: "suspended";
};
export declare const CRM_CONTACT_STATUS: {
    readonly LEAD: "lead";
    readonly PROSPECT: "prospect";
    readonly ACTIVE: "active";
    readonly INACTIVE: "inactive";
    readonly CHURNED: "churned";
};
export declare const NOTIFICATION_TYPES: {
    readonly BOOKING_CONFIRMED: "booking_confirmed";
    readonly BOOKING_CANCELLED: "booking_cancelled";
    readonly NEW_MESSAGE: "new_message";
    readonly NEW_REVIEW: "new_review";
    readonly NEW_FOLLOWER: "new_follower";
    readonly PAYMENT_RECEIVED: "payment_received";
    readonly WORKSPACE_INVITE: "workspace_invite";
    readonly AI_SUGGESTION: "ai_suggestion";
    readonly SYSTEM: "system";
};
export declare const QUEUE_NAMES: {
    readonly EMAIL: "email-queue";
    readonly NOTIFICATION: "notification-queue";
    readonly AUTOMATION: "automation-queue";
    readonly INDEXING: "indexing-queue";
    readonly EMBEDDING: "embedding-queue";
    readonly ANALYTICS: "analytics-queue";
    readonly MEDIA: "media-queue";
};
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly UNPROCESSABLE: 422;
    readonly TOO_MANY_REQUESTS: 429;
    readonly INTERNAL_ERROR: 500;
};
export declare const ERROR_CODES: {
    readonly INVALID_CREDENTIALS: "INVALID_CREDENTIALS";
    readonly EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED";
    readonly EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS";
    readonly USERNAME_TAKEN: "USERNAME_TAKEN";
    readonly WORKSPACE_NOT_FOUND: "WORKSPACE_NOT_FOUND";
    readonly PROFILE_NOT_FOUND: "PROFILE_NOT_FOUND";
    readonly PERMISSION_DENIED: "PERMISSION_DENIED";
    readonly TOKEN_EXPIRED: "TOKEN_EXPIRED";
    readonly TOKEN_INVALID: "TOKEN_INVALID";
    readonly RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
};
export declare const REDIS_KEYS: {
    readonly SESSION: "session:";
    readonly EMAIL_VERIFY: "email_verify:";
    readonly PASSWORD_RESET: "password_reset:";
    readonly RATE_LIMIT: "rate_limit:";
    readonly REFRESH_TOKEN: "refresh:";
    readonly WORKSPACE_CACHE: "workspace:";
    readonly PROFILE_CACHE: "profile:";
};
export declare const PAGINATION: {
    readonly DEFAULT_PAGE: 1;
    readonly DEFAULT_LIMIT: 20;
    readonly MAX_LIMIT: 100;
};
export declare const TOKEN_TTL: {
    readonly ACCESS: number;
    readonly REFRESH: number;
    readonly EMAIL_VERIFY: number;
    readonly PASSWORD_RESET: number;
    readonly SESSION: number;
};
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type WorkspaceRole = (typeof WORKSPACE_ROLES)[keyof typeof WORKSPACE_ROLES];
export type WorkspaceType = (typeof WORKSPACE_TYPES)[keyof typeof WORKSPACE_TYPES];
export type SubscriptionPlan = (typeof SUBSCRIPTION_PLANS)[keyof typeof SUBSCRIPTION_PLANS];
export type ProfileSectionType = (typeof PROFILE_SECTION_TYPES)[keyof typeof PROFILE_SECTION_TYPES];
export type WorkspaceModule = (typeof WORKSPACE_MODULES)[keyof typeof WORKSPACE_MODULES];
export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];
export type ListingStatus = (typeof LISTING_STATUS)[keyof typeof LISTING_STATUS];
export type NotificationType = (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];
//# sourceMappingURL=index.d.ts.map