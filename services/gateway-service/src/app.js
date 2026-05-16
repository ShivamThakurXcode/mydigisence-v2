"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const http_proxy_1 = __importDefault(require("@fastify/http-proxy"));
const logger_1 = require("@mydigisence/logger");
const config_js_1 = require("./config.js");
const log = (0, logger_1.createLogger)('gateway-service');
const app = (0, fastify_1.default)({ logger: false, trustProxy: true });
async function bootstrap() {
    // ─── Security plugins ──────────────────────────────────────
    await app.register(helmet_1.default);
    await app.register(cors_1.default, {
        origin: config_js_1.config.corsOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    await app.register(rate_limit_1.default, {
        max: 500,
        timeWindow: '1 minute',
        keyGenerator: (req) => req.headers['x-forwarded-for'] ?? req.ip,
    });
    // ─── Health ────────────────────────────────────────────────
    app.get('/health', async () => ({
        status: 'ok',
        service: 'gateway',
        timestamp: new Date().toISOString(),
        services: config_js_1.config.services,
    }));
    // ─── Proxy Routes ──────────────────────────────────────────
    // Auth routes — proxy to auth-service
    await app.register(http_proxy_1.default, {
        upstream: config_js_1.config.services.auth,
        prefix: '/auth',
        rewritePrefix: '/auth',
        http2: false,
    });
    // User routes — proxy to user-service (requires auth)
    await app.register(http_proxy_1.default, {
        upstream: config_js_1.config.services.user,
        prefix: '/users',
        rewritePrefix: '/users',
        http2: false,
    });
    // Profile routes
    await app.register(http_proxy_1.default, {
        upstream: config_js_1.config.services.profile,
        prefix: '/profiles',
        rewritePrefix: '/profiles',
        http2: false,
    });
    // Marketplace routes
    await app.register(http_proxy_1.default, {
        upstream: config_js_1.config.services.marketplace,
        prefix: '/marketplace',
        rewritePrefix: '/marketplace',
        http2: false,
    });
    // Booking routes
    await app.register(http_proxy_1.default, {
        upstream: config_js_1.config.services.booking,
        prefix: '/bookings',
        rewritePrefix: '/bookings',
        http2: false,
    });
    // Search routes
    await app.register(http_proxy_1.default, {
        upstream: config_js_1.config.services.search,
        prefix: '/search',
        rewritePrefix: '/search',
        http2: false,
    });
    // AI routes
    await app.register(http_proxy_1.default, {
        upstream: config_js_1.config.services.ai,
        prefix: '/ai',
        rewritePrefix: '/ai',
        http2: false,
    });
    // Notification routes
    await app.register(http_proxy_1.default, {
        upstream: config_js_1.config.services.notification,
        prefix: '/notifications',
        rewritePrefix: '/notifications',
        http2: false,
    });
    // ─── Start ────────────────────────────────────────────────
    await app.listen({ port: config_js_1.config.port, host: '0.0.0.0' });
    log.info(`Gateway running on port ${config_js_1.config.port}`);
}
bootstrap().catch((err) => {
    log.error({ err }, 'Failed to start gateway');
    process.exit(1);
});
const shutdown = async (signal) => {
    log.info(`Received ${signal}, shutting down...`);
    await app.close();
    process.exit(0);
};
process.on('SIGTERM', () => { shutdown('SIGTERM').catch(() => process.exit(1)); });
process.on('SIGINT', () => { shutdown('SIGINT').catch(() => process.exit(1)); });
//# sourceMappingURL=app.js.map