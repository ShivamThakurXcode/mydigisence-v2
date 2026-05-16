"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateListingSchema = exports.createListingSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("@mydigisence/constants");
exports.createListingSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(200).trim(),
    description: zod_1.z.string().min(20).max(5000),
    price: zod_1.z.number().positive().multipleOf(0.01),
    currency: zod_1.z.string().length(3).default('USD'),
    category: zod_1.z.string().min(1).max(100),
    tags: zod_1.z.array(zod_1.z.string().max(50)).max(10).default([]),
    images: zod_1.z.array(zod_1.z.string().url()).max(10).default([]),
    deliveryTime: zod_1.z.number().int().positive().optional(),
});
exports.updateListingSchema = exports.createListingSchema
    .partial()
    .extend({
    status: zod_1.z
        .enum([constants_1.LISTING_STATUS.ACTIVE, constants_1.LISTING_STATUS.DRAFT, constants_1.LISTING_STATUS.ARCHIVED])
        .optional(),
});
//# sourceMappingURL=listing.schemas.js.map