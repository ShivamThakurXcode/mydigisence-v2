import { z } from 'zod';
export declare const sectionConfigSchema: z.ZodObject<{
    type: z.ZodEnum<[string, ...string[]]>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    order: z.ZodNumber;
    config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: string;
    enabled: boolean;
    order: number;
    config?: Record<string, unknown> | undefined;
}, {
    type: string;
    order: number;
    enabled?: boolean | undefined;
    config?: Record<string, unknown> | undefined;
}>;
export declare const updateProfileSectionsSchema: z.ZodObject<{
    sections: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<[string, ...string[]]>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        order: z.ZodNumber;
        config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        enabled: boolean;
        order: number;
        config?: Record<string, unknown> | undefined;
    }, {
        type: string;
        order: number;
        enabled?: boolean | undefined;
        config?: Record<string, unknown> | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    sections: {
        type: string;
        enabled: boolean;
        order: number;
        config?: Record<string, unknown> | undefined;
    }[];
}, {
    sections: {
        type: string;
        order: number;
        enabled?: boolean | undefined;
        config?: Record<string, unknown> | undefined;
    }[];
}>;
export declare const heroSectionDataSchema: z.ZodObject<{
    headline: z.ZodOptional<z.ZodString>;
    subheadline: z.ZodOptional<z.ZodString>;
    ctaText: z.ZodOptional<z.ZodString>;
    ctaUrl: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    headline?: string | undefined;
    subheadline?: string | undefined;
    ctaText?: string | undefined;
    ctaUrl?: string | undefined;
    backgroundImage?: string | undefined;
}, {
    headline?: string | undefined;
    subheadline?: string | undefined;
    ctaText?: string | undefined;
    ctaUrl?: string | undefined;
    backgroundImage?: string | undefined;
}>;
export declare const aboutSectionDataSchema: z.ZodObject<{
    content: z.ZodString;
    highlights: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    content: string;
    highlights?: string[] | undefined;
}, {
    content: string;
    highlights?: string[] | undefined;
}>;
export type SectionConfig = z.infer<typeof sectionConfigSchema>;
export type HeroSectionData = z.infer<typeof heroSectionDataSchema>;
export type AboutSectionData = z.infer<typeof aboutSectionDataSchema>;
//# sourceMappingURL=profile.schemas.d.ts.map