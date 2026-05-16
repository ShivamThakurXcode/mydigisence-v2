import { z } from 'zod';
export declare const createListingSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    category: z.ZodString;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    images: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    deliveryTime: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    tags: string[];
    images: string[];
    deliveryTime?: number | undefined;
}, {
    title: string;
    description: string;
    price: number;
    category: string;
    currency?: string | undefined;
    tags?: string[] | undefined;
    images?: string[] | undefined;
    deliveryTime?: number | undefined;
}>;
export declare const updateListingSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    category: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    images: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    deliveryTime: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
} & {
    status: z.ZodOptional<z.ZodEnum<any>>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    title?: unknown;
    description?: unknown;
    price?: unknown;
    currency?: unknown;
    category?: unknown;
    tags?: unknown;
    images?: unknown;
    deliveryTime?: unknown;
    status?: unknown;
}, {
    [x: string]: any;
    title?: unknown;
    description?: unknown;
    price?: unknown;
    currency?: unknown;
    category?: unknown;
    tags?: unknown;
    images?: unknown;
    deliveryTime?: unknown;
    status?: unknown;
}>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
//# sourceMappingURL=listing.schemas.d.ts.map