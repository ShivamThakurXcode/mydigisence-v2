"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = exports.AuthError = void 0;
const database_1 = require("@mydigisence/database");
const auth_1 = require("@mydigisence/auth");
const constants_1 = require("@mydigisence/constants");
const redis_js_1 = require("./redis.js");
const email_js_1 = require("./email.js");
const logger_1 = require("@mydigisence/logger");
const log = (0, logger_1.createLogger)('auth-service');
class AuthError extends Error {
    code;
    statusCode;
    constructor(code, message, statusCode = 400) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.name = 'AuthError';
    }
}
exports.AuthError = AuthError;
class AuthService {
    async signup(input) {
        const existing = await database_1.prisma.user.findUnique({ where: { email: input.email } });
        if (existing) {
            throw new AuthError(constants_1.ERROR_CODES.EMAIL_ALREADY_EXISTS, 'Email already in use', 409);
        }
        const passwordHash = await (0, auth_1.hashPassword)(input.password);
        const user = await database_1.prisma.user.create({
            data: {
                email: input.email,
                passwordHash,
                firstName: input.firstName,
                lastName: input.lastName,
                roles: [],
                workspaceIds: [],
                profile: {
                    create: {
                        username: await this.generateUsername(input.firstName, input.lastName),
                        displayName: `${input.firstName} ${input.lastName}`,
                    },
                },
            },
            include: { profile: true },
        });
        const token = (0, auth_1.signEmailToken)({ sub: user.id, email: user.email, purpose: 'verify' });
        await redis_js_1.redis.setex(`${constants_1.REDIS_KEYS.EMAIL_VERIFY}${user.id}`, constants_1.TOKEN_TTL.EMAIL_VERIFY, token);
        await (0, email_js_1.sendVerificationEmail)(user.email, token).catch((err) => log.warn({ err }, 'Failed to send verification email'));
        log.info({ userId: user.id }, 'User signed up');
        return { id: user.id, email: user.email, message: 'Check your email to verify your account' };
    }
    async login(input) {
        const user = await database_1.prisma.user.findUnique({ where: { email: input.email } });
        if (!user) {
            throw new AuthError(constants_1.ERROR_CODES.INVALID_CREDENTIALS, 'Invalid credentials', 401);
        }
        const valid = await (0, auth_1.verifyPassword)(input.password, user.passwordHash);
        if (!valid) {
            throw new AuthError(constants_1.ERROR_CODES.INVALID_CREDENTIALS, 'Invalid credentials', 401);
        }
        if (!user.emailVerified) {
            throw new AuthError(constants_1.ERROR_CODES.EMAIL_NOT_VERIFIED, 'Please verify your email first', 403);
        }
        if (!user.isActive) {
            throw new AuthError('ACCOUNT_SUSPENDED', 'Account has been suspended', 403);
        }
        const tokens = (0, auth_1.createTokenPair)({
            sub: user.id,
            email: user.email,
            roles: user.roles,
        });
        // Cache session in Redis
        await redis_js_1.redis.setex(`${constants_1.REDIS_KEYS.SESSION}${user.id}`, constants_1.TOKEN_TTL.SESSION, JSON.stringify({ userId: user.id, email: user.email }));
        await database_1.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        log.info({ userId: user.id }, 'User logged in');
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                workspaceIds: user.workspaceIds,
            },
        };
    }
    async verifyEmail(token) {
        let payload;
        try {
            payload = (0, auth_1.verifyEmailToken)(token);
        }
        catch {
            throw new AuthError(constants_1.ERROR_CODES.TOKEN_INVALID, 'Invalid or expired token', 400);
        }
        if (payload.purpose !== 'verify') {
            throw new AuthError(constants_1.ERROR_CODES.TOKEN_INVALID, 'Invalid token type', 400);
        }
        const stored = await redis_js_1.redis.get(`${constants_1.REDIS_KEYS.EMAIL_VERIFY}${payload.sub}`);
        if (!stored || stored !== token) {
            throw new AuthError(constants_1.ERROR_CODES.TOKEN_EXPIRED, 'Token has expired', 400);
        }
        await database_1.prisma.user.update({
            where: { id: payload.sub },
            data: { emailVerified: true },
        });
        await redis_js_1.redis.del(`${constants_1.REDIS_KEYS.EMAIL_VERIFY}${payload.sub}`);
        log.info({ userId: payload.sub }, 'Email verified');
        return { message: 'Email verified successfully' };
    }
    async forgotPassword(input) {
        const user = await database_1.prisma.user.findUnique({ where: { email: input.email } });
        // Always return success to prevent email enumeration
        if (!user)
            return { message: 'If that email exists, a reset link has been sent' };
        const token = (0, auth_1.signEmailToken)({ sub: user.id, email: user.email, purpose: 'reset' });
        await redis_js_1.redis.setex(`${constants_1.REDIS_KEYS.PASSWORD_RESET}${user.id}`, constants_1.TOKEN_TTL.PASSWORD_RESET, token);
        await (0, email_js_1.sendPasswordResetEmail)(user.email, token).catch((err) => log.warn({ err }, 'Failed to send reset email'));
        return { message: 'If that email exists, a reset link has been sent' };
    }
    async resetPassword(input) {
        let payload;
        try {
            payload = (0, auth_1.verifyEmailToken)(input.token);
        }
        catch {
            throw new AuthError(constants_1.ERROR_CODES.TOKEN_INVALID, 'Invalid or expired token', 400);
        }
        if (payload.purpose !== 'reset') {
            throw new AuthError(constants_1.ERROR_CODES.TOKEN_INVALID, 'Invalid token type', 400);
        }
        const stored = await redis_js_1.redis.get(`${constants_1.REDIS_KEYS.PASSWORD_RESET}${payload.sub}`);
        if (!stored || stored !== input.token) {
            throw new AuthError(constants_1.ERROR_CODES.TOKEN_EXPIRED, 'Token has expired', 400);
        }
        const passwordHash = await (0, auth_1.hashPassword)(input.password);
        await database_1.prisma.user.update({
            where: { id: payload.sub },
            data: { passwordHash },
        });
        await redis_js_1.redis.del(`${constants_1.REDIS_KEYS.PASSWORD_RESET}${payload.sub}`);
        // Invalidate all sessions
        await redis_js_1.redis.del(`${constants_1.REDIS_KEYS.SESSION}${payload.sub}`);
        log.info({ userId: payload.sub }, 'Password reset');
        return { message: 'Password reset successfully' };
    }
    async refreshTokens(refreshToken) {
        let payload;
        try {
            payload = (0, auth_1.verifyRefreshToken)(refreshToken);
        }
        catch {
            throw new AuthError(constants_1.ERROR_CODES.TOKEN_INVALID, 'Invalid refresh token', 401);
        }
        const user = await database_1.prisma.user.findUnique({ where: { id: payload.sub } });
        if (!user || !user.isActive) {
            throw new AuthError(constants_1.ERROR_CODES.TOKEN_INVALID, 'User not found', 401);
        }
        const tokens = (0, auth_1.createTokenPair)({
            sub: user.id,
            email: user.email,
            roles: user.roles,
        });
        return tokens;
    }
    async logout(userId) {
        await redis_js_1.redis.del(`${constants_1.REDIS_KEYS.SESSION}${userId}`);
        log.info({ userId }, 'User logged out');
        return { message: 'Logged out successfully' };
    }
    async getSession(userId) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                roles: true,
                workspaceIds: true,
                emailVerified: true,
                isActive: true,
                profile: { select: { username: true, displayName: true, avatar: true } },
            },
        });
        if (!user || !user.isActive) {
            throw new AuthError(constants_1.ERROR_CODES.TOKEN_INVALID, 'Session not found', 401);
        }
        return user;
    }
    async generateUsername(firstName, lastName) {
        const base = `${firstName}${lastName}`
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '')
            .slice(0, 20);
        let username = base;
        let suffix = 0;
        while (true) {
            const exists = await database_1.prisma.profile.findUnique({ where: { username } });
            if (!exists)
                return username;
            suffix++;
            username = `${base}${suffix}`;
        }
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map