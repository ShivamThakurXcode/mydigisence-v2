"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = require("ioredis");
const logger_1 = require("@mydigisence/logger");
const config_js_1 = require("./config.js");
const log = (0, logger_1.createLogger)('auth-service:redis');
exports.redis = new ioredis_1.Redis(config_js_1.config.redis.url, {
    password: config_js_1.config.redis.password,
    lazyConnect: true,
    retryStrategy: (times) => Math.min(times * 50, 2000),
});
exports.redis.on('connect', () => log.info('Redis connected'));
exports.redis.on('error', (err) => log.error({ err }, 'Redis error'));
//# sourceMappingURL=redis.js.map