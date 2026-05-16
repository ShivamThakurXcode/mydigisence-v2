"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.optionalAuth = optionalAuth;
const auth_1 = require("@mydigisence/auth");
const constants_1 = require("@mydigisence/constants");
async function authenticate(req, reply) {
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
        return reply.code(401).send({
            success: false,
            error: { code: constants_1.ERROR_CODES.TOKEN_INVALID, message: 'No authorization token' },
        });
    }
    const token = authHeader.slice(7);
    try {
        const payload = (0, auth_1.verifyAccessToken)(token);
        req.user = payload;
    }
    catch {
        return reply.code(401).send({
            success: false,
            error: { code: constants_1.ERROR_CODES.TOKEN_EXPIRED, message: 'Token invalid or expired' },
        });
    }
}
async function optionalAuth(req, _reply) {
    const authHeader = req.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
        try {
            const token = authHeader.slice(7);
            const payload = (0, auth_1.verifyAccessToken)(token);
            req.user = payload;
        }
        catch {
            // Optional — don't fail
        }
    }
}
//# sourceMappingURL=auth.middleware.js.map