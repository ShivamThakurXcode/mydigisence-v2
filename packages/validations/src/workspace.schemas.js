"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateModulesSchema = exports.inviteMemberSchema = exports.updateWorkspaceSchema = exports.createWorkspaceSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("@mydigisence/constants");
const common_schemas_js_1 = require("./common.schemas.js");
exports.createWorkspaceSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100).trim(),
    slug: common_schemas_js_1.slugSchema,
    type: zod_1.z.enum([
        constants_1.WORKSPACE_TYPES.BUSINESS,
        constants_1.WORKSPACE_TYPES.PROFESSIONAL,
        constants_1.WORKSPACE_TYPES.CREATOR,
        constants_1.WORKSPACE_TYPES.AGENCY,
        constants_1.WORKSPACE_TYPES.ENTERPRISE,
    ]),
    description: zod_1.z.string().max(500).optional(),
});
exports.updateWorkspaceSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100).trim().optional(),
    description: zod_1.z.string().max(500).optional(),
    website: zod_1.z.string().url().optional(),
    phone: zod_1.z.string().max(20).optional(),
});
exports.inviteMemberSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    role: zod_1.z.enum([
        constants_1.WORKSPACE_ROLES.ADMIN,
        constants_1.WORKSPACE_ROLES.EDITOR,
        constants_1.WORKSPACE_ROLES.MEMBER,
        constants_1.WORKSPACE_ROLES.VIEWER,
    ]),
});
exports.updateModulesSchema = zod_1.z.object({
    modules: zod_1.z.record(zod_1.z.string(), zod_1.z.boolean()),
});
//# sourceMappingURL=workspace.schemas.js.map