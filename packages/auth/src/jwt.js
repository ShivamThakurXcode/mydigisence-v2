"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.signEmailToken = signEmailToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.verifyEmailToken = verifyEmailToken;
exports.createTokenPair = createTokenPair;
exports.decodeToken = decodeToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("@mydigisence/constants");
function getSecret() {
    const secret = process.env['JWT_SECRET'];
    if (!secret)
        throw new Error('JWT_SECRET environment variable is required');
    return secret;
}
function signAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, getSecret(), {
        expiresIn: constants_1.TOKEN_TTL.ACCESS,
        algorithm: 'HS256',
    });
}
function signRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, getSecret(), {
        expiresIn: constants_1.TOKEN_TTL.REFRESH,
        algorithm: 'HS256',
    });
}
function signEmailToken(payload) {
    const ttl = payload.purpose === 'verify' ? constants_1.TOKEN_TTL.EMAIL_VERIFY : constants_1.TOKEN_TTL.PASSWORD_RESET;
    return jsonwebtoken_1.default.sign(payload, getSecret(), {
        expiresIn: ttl,
        algorithm: 'HS256',
    });
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, getSecret());
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, getSecret());
}
function verifyEmailToken(token) {
    return jsonwebtoken_1.default.verify(token, getSecret());
}
function createTokenPair(payload) {
    const tokenId = crypto.randomUUID();
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken({ sub: payload.sub, tokenId });
    return {
        accessToken,
        refreshToken,
        expiresIn: constants_1.TOKEN_TTL.ACCESS,
    };
}
function decodeToken(token) {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=jwt.js.map