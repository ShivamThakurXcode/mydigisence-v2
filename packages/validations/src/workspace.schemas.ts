import { z } from 'zod'
import { WORKSPACE_TYPES, WORKSPACE_ROLES } from '@mydigisence/constants'
import { slugSchema } from './common.schemas.js'

export const createWorkspaceSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  slug: slugSchema,
  type: z.enum([
    WORKSPACE_TYPES.BUSINESS,
    WORKSPACE_TYPES.PROFESSIONAL,
    WORKSPACE_TYPES.CREATOR,
    WORKSPACE_TYPES.AGENCY,
    WORKSPACE_TYPES.ENTERPRISE,
  ]),
  description: z.string().max(500).optional(),
})

export const updateWorkspaceSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  description: z.string().max(500).optional(),
  website: z.string().url().optional(),
  phone: z.string().max(20).optional(),
})

export const inviteMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum([
    WORKSPACE_ROLES.ADMIN,
    WORKSPACE_ROLES.EDITOR,
    WORKSPACE_ROLES.MEMBER,
    WORKSPACE_ROLES.VIEWER,
  ]),
})

export const updateModulesSchema = z.object({
  modules: z.record(z.string(), z.boolean()),
})

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>
