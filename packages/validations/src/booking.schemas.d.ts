import { z } from 'zod';
export declare const createBookingSchema: z.ZodObject<{
    serviceId: z.ZodString;
    workspaceId: z.ZodString;
    dateTime: z.ZodString;
    duration: z.ZodDefault<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    serviceId: string;
    dateTime: string;
    duration: number;
    notes?: string | undefined;
}, {
    workspaceId: string;
    serviceId: string;
    dateTime: string;
    duration?: number | undefined;
    notes?: string | undefined;
}>;
export declare const updateBookingSchema: z.ZodObject<{
    status: z.ZodEnum<["confirmed", "cancelled", "completed"]>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "confirmed" | "cancelled" | "completed";
    notes?: string | undefined;
}, {
    status: "confirmed" | "cancelled" | "completed";
    notes?: string | undefined;
}>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
//# sourceMappingURL=booking.schemas.d.ts.map