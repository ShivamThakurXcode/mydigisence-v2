"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.verifyEmailSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address').toLowerCase(),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Must contain at least one number'),
    firstName: zod_1.z.string().min(1).max(50).trim(),
    lastName: zod_1.z.string().min(1).max(50).trim(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase(),
    password: zod_1.z.string().min(1),
});
exports.verifyEmailSchema = zod_1.z.object({
    token: zod_1.z.string().min(1),
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase(),
});
exports.resetPasswordSchema = zod_1.z
    .object({
    token: zod_1.z.string().min(1),
    password: zod_1.z
        .string()
        .min(8)
        .regex(/[A-Z]/)
        .regex(/[0-9]/),
    confirmPassword: zod_1.z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1),
});
//# sourceMappingURL=auth.schemas.js.map