"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    port: Number(process.env['AUTH_SERVICE_PORT'] ?? 4001),
    nodeEnv: process.env['NODE_ENV'] ?? 'development',
    jwtSecret: process.env['JWT_SECRET'] ?? '',
    redis: {
        url: process.env['REDIS_URL'] ?? 'redis://localhost:6379',
        password: process.env['REDIS_PASSWORD'],
    },
    email: {
        provider: process.env['EMAIL_PROVIDER'] ?? 'smtp',
        host: process.env['SMTP_HOST'] ?? 'localhost',
        port: Number(process.env['SMTP_PORT'] ?? 1025),
        user: process.env['SMTP_USER'] ?? '',
        pass: process.env['SMTP_PASS'] ?? '',
        from: process.env['FROM_EMAIL'] ?? 'noreply@mydigisence.com',
        fromName: process.env['FROM_NAME'] ?? 'MyDigiSence',
        sendgridKey: process.env['SENDGRID_API_KEY'],
    },
    appUrl: process.env['APP_URL'] ?? 'http://localhost:3000',
    corsOrigins: (process.env['CORS_ORIGINS'] ?? 'http://localhost:3000').split(','),
};
//# sourceMappingURL=config.js.map