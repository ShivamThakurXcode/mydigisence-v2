"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.generateSecureToken = generateSecureToken;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = 12;
async function hashPassword(password) {
    return bcryptjs_1.default.hash(password, SALT_ROUNDS);
}
async function verifyPassword(password, hash) {
    return bcryptjs_1.default.compare(password, hash);
}
function generateSecureToken(length = 32) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}
//# sourceMappingURL=password.js.map