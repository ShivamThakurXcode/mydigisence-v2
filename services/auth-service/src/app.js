"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const logger_1 = require("@mydigisence/logger");
const database_1 = require("@mydigisence/database");
const redis_js_1 = require("./redis.js");
const auth_routes_js_1 = require("./auth.routes.js");
const config_js_1 = require("./config.js");
const log = (0, logger_1.createLogger)('auth-service');
const app = (0, fastify_1.default)({ logger: false, trustProxy: true });
async function bootstrap() {
    // ─── Plugins ───────────────────────────────────────────────
    await app.register(helmet_1.default);
    await app.register(cors_1.default, {
        origin: config_js_1.config.corsOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    await app.register(rate_limit_1.default, {
        max: 100,
        timeWindow: '1 minute',
        keyGenerator: (req) => req.headers['x-forwarded-for'] ?? req.ip,
    });
    // ─── Error Handler ─────────────────────────────────────────
    app.setErrorHandler(auth_routes_js_1.authErrorHandler);
    // ─── Health Check ──────────────────────────────────────────
    app.get('/health', async () => ({
        status: 'ok',
        service: 'auth-service',
        timestamp: new Date().toISOString(),
    }));
    // ─── Routes ────────────────────────────────────────────────
    await app.register(auth_routes_js_1.authRoutes);
    // ─── Connect DB + Redis ────────────────────────────────────
    await redis_js_1.redis.connect().catch(() => log.warn('Redis connection deferred'));
    await database_1.prisma.$connect();
    // ─── Start Server ──────────────────────────────────────────
    await app.listen({ port: config_js_1.config.port, host: '0.0.0.0' });
    log.info(`Auth service running on port ${config_js_1.config.port}`);
}
bootstrap().catch((err) => {
    log.error({ err }, 'Failed to start auth service');
    process.exit(1);
});
// Graceful shutdown
const shutdown = async (signal) => {
    log.info(`Received ${signal}, shutting down...`);
    await app.close();
    await database_1.prisma.$disconnect();
    await redis_js_1.redis.quit();
    process.exit(0);
};
process.on('SIGTERM', () => { shutdown('SIGTERM').catch(() => process.exit(1)); });
process.on('SIGINT', () => { shutdown('SIGINT').catch(() => process.exit(1)); });
//# sourceMappingURL=app.js.map