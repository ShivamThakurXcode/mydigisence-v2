"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingSchema = exports.createBookingSchema = void 0;
const zod_1 = require("zod");
exports.createBookingSchema = zod_1.z.object({
    serviceId: zod_1.z.string().min(1),
    workspaceId: zod_1.z.string().min(1),
    dateTime: zod_1.z.string().datetime(),
    duration: zod_1.z.number().int().positive().default(60),
    notes: zod_1.z.string().max(1000).optional(),
});
exports.updateBookingSchema = zod_1.z.object({
    status: zod_1.z.enum(['confirmed', 'cancelled', 'completed']),
    notes: zod_1.z.string().max(1000).optional(),
});
//# sourceMappingURL=booking.schemas.js.map