import { z } from 'zod';
export declare const createWorkspaceSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    type: z.ZodEnum<any>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    name?: unknown;
    slug?: unknown;
    type?: unknown;
    description?: unknown;
}, {
    [x: string]: any;
    name?: unknown;
    slug?: unknown;
    type?: unknown;
    description?: unknown;
}>;
export declare const updateWorkspaceSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    website?: string | undefined;
    description?: string | undefined;
    phone?: string | undefined;
}, {
    name?: string | undefined;
    website?: string | undefined;
    description?: string | undefined;
    phone?: string | undefined;
}>;
export declare const inviteMemberSchema: z.ZodObject<{
    email: z.ZodString;
    role: z.ZodEnum<any>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    email?: unknown;
    role?: unknown;
}, {
    [x: string]: any;
    email?: unknown;
    role?: unknown;
}>;
export declare const updateModulesSchema: z.ZodObject<{
    modules: z.ZodRecord<z.ZodString, z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    modules: Record<string, boolean>;
}, {
    modules: Record<string, boolean>;
}>;
export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
//# sourceMappingURL=workspace.schemas.d.ts.map