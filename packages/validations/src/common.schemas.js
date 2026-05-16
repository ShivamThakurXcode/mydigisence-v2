"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugSchema = exports.paginationSchema = exports.objectIdSchema = void 0;
const zod_1 = require("zod");
exports.objectIdSchema = zod_1.z.string().regex(/^[0-9a-f]{24}$/, 'Invalid ID format');
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(20),
});
exports.slugSchema = zod_1.z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only');
//# sourceMappingURL=common.schemas.js.map