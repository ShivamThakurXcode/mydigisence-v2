"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
exports.authErrorHandler = authErrorHandler;
const validations_1 = require("@mydigisence/validations");
const auth_1 = require("@mydigisence/auth");
const auth_service_js_1 = require("./auth.service.js");
async function authRoutes(app) {
    // POST /auth/signup
    app.post('/auth/signup', async (req, reply) => {
        const input = validations_1.signupSchema.parse(req.body);
        const result = await auth_service_js_1.authService.signup(input);
        return reply.code(201).send({ success: true, data: result });
    });
    // POST /auth/login
    app.post('/auth/login', async (req, reply) => {
        const input = validations_1.loginSchema.parse(req.body);
        const result = await auth_service_js_1.authService.login(input);
        reply.setCookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env['NODE_ENV'] === 'production',
            sameSite: 'lax',
            path: '/auth/refresh',
            maxAge: 7 * 24 * 60 * 60,
        });
        return reply.send({
            success: true,
            data: { accessToken: result.accessToken, expiresIn: result.expiresIn, user: result.user },
        });
    });
    // POST /auth/verify-email
    app.post('/auth/verify-email', async (req, reply) => {
        const { token } = validations_1.verifyEmailSchema.parse(req.body);
        const result = await auth_service_js_1.authService.verifyEmail(token);
        return reply.send({ success: true, data: result });
    });
    // POST /auth/forgot-password
    app.post('/auth/forgot-password', async (req, reply) => {
        const input = validations_1.forgotPasswordSchema.parse(req.body);
        const result = await auth_service_js_1.authService.forgotPassword(input);
        return reply.send({ success: true, data: result });
    });
    // POST /auth/reset-password
    app.post('/auth/reset-password', async (req, reply) => {
        const input = validations_1.resetPasswordSchema.parse(req.body);
        const result = await auth_service_js_1.authService.resetPassword(input);
        return reply.send({ success: true, data: result });
    });
    // POST /auth/refresh
    app.post('/auth/refresh', async (req, reply) => {
        const cookieToken = req.cookies['refreshToken'];
        const bodyInput = validations_1.refreshTokenSchema.safeParse(req.body);
        const token = cookieToken ?? bodyInput.data?.refreshToken;
        if (!token)
            return reply.code(400).send({ success: false, error: 'No refresh token' });
        const result = await auth_service_js_1.authService.refreshTokens(token);
        return reply.send({ success: true, data: result });
    });
    // POST /auth/logout — requires access token
    app.post('/auth/logout', async (req, reply) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.replace('Bearer ', '');
        if (token) {
            try {
                const payload = (0, auth_1.verifyAccessToken)(token);
                await auth_service_js_1.authService.logout(payload.sub);
            }
            catch {
                // Token invalid or expired — still clear the cookie
            }
        }
        reply.clearCookie('refreshToken', { path: '/auth/refresh' });
        return reply.send({ success: true, data: { message: 'Logged out' } });
    });
    // GET /auth/session — requires access token
    app.get('/auth/session', async (req, reply) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.replace('Bearer ', '');
        if (!token)
            return reply.code(401).send({ success: false, error: 'No token' });
        const payload = (0, auth_1.verifyAccessToken)(token);
        const user = await auth_service_js_1.authService.getSession(payload.sub);
        return reply.send({ success: true, data: user });
    });
}
function authErrorHandler(error, req, reply) {
    if (error instanceof auth_service_js_1.AuthError) {
        return reply.code(error.statusCode).send({
            success: false,
            error: { code: error.code, message: error.message },
        });
    }
    if (error instanceof Error && error.name === 'ZodError') {
        return reply.code(422).send({
            success: false,
            error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: error },
        });
    }
    return reply.code(500).send({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Internal server error' },
    });
}
//# sourceMappingURL=auth.routes.js.map