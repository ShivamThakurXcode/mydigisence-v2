import { z } from 'zod';
export declare const updateUserSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
}>;
export declare const updateProfileSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    displayName: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    banner: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username?: string | undefined;
    website?: string | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    avatar?: string | undefined;
    banner?: string | undefined;
    location?: string | undefined;
}, {
    username?: string | undefined;
    website?: string | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    avatar?: string | undefined;
    banner?: string | undefined;
    location?: string | undefined;
}>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
//# sourceMappingURL=user.schemas.d.ts.map