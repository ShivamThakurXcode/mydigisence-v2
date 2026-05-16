"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = exports.updateUserSchema = void 0;
const zod_1 = require("zod");
const common_schemas_js_1 = require("./common.schemas.js");
exports.updateUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(50).trim().optional(),
    lastName: zod_1.z.string().min(1).max(50).trim().optional(),
    phone: zod_1.z.string().max(20).optional(),
});
exports.updateProfileSchema = zod_1.z.object({
    username: common_schemas_js_1.slugSchema.optional(),
    displayName: zod_1.z.string().min(1).max(100).trim().optional(),
    bio: zod_1.z.string().max(500).optional(),
    avatar: zod_1.z.string().url().optional(),
    banner: zod_1.z.string().url().optional(),
    location: zod_1.z.string().max(100).optional(),
    website: zod_1.z.string().url().optional(),
});
//# sourceMappingURL=user.schemas.js.map