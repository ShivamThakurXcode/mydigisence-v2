"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutSectionDataSchema = exports.heroSectionDataSchema = exports.updateProfileSectionsSchema = exports.sectionConfigSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("@mydigisence/constants");
exports.sectionConfigSchema = zod_1.z.object({
    type: zod_1.z.enum(Object.values(constants_1.PROFILE_SECTION_TYPES)),
    enabled: zod_1.z.boolean().default(true),
    order: zod_1.z.number().int().min(0),
    config: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
});
exports.updateProfileSectionsSchema = zod_1.z.object({
    sections: zod_1.z.array(exports.sectionConfigSchema),
});
exports.heroSectionDataSchema = zod_1.z.object({
    headline: zod_1.z.string().max(200).optional(),
    subheadline: zod_1.z.string().max(500).optional(),
    ctaText: zod_1.z.string().max(50).optional(),
    ctaUrl: zod_1.z.string().url().optional(),
    backgroundImage: zod_1.z.string().url().optional(),
});
exports.aboutSectionDataSchema = zod_1.z.object({
    content: zod_1.z.string().max(2000),
    highlights: zod_1.z.array(zod_1.z.string().max(100)).max(6).optional(),
});
//# sourceMappingURL=profile.schemas.js.map