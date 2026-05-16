import { z } from 'zod';
export declare const objectIdSchema: z.ZodString;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const slugSchema: z.ZodString;
export type ObjectId = z.infer<typeof objectIdSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
//# sourceMappingURL=common.schemas.d.ts.map