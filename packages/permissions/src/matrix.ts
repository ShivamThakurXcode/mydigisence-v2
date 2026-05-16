import { WORKSPACE_ROLES } from '@mydigisence/constants'

export type WorkspaceRole = (typeof WORKSPACE_ROLES)[keyof typeof WORKSPACE_ROLES]

export type Action =
  | 'workspace:read'
  | 'workspace:update'
  | 'workspace:delete'
  | 'workspace:manage_billing'
  | 'workspace:manage_domain'
  | 'members:read'
  | 'members:invite'
  | 'members:remove'
  | 'members:update_role'
  | 'profile:read'
  | 'profile:update'
  | 'profile:manage_sections'
  | 'services:read'
  | 'services:create'
  | 'services:update'
  | 'services:delete'
  | 'services:publish'
  | 'products:read'
  | 'products:create'
  | 'products:update'
  | 'products:delete'
  | 'bookings:read'
  | 'bookings:create'
  | 'bookings:update'
  | 'bookings:cancel'
  | 'crm:read'
  | 'crm:write'
  | 'crm:delete'
  | 'analytics:read'
  | 'campaigns:read'
  | 'campaigns:write'
  | 'automation:read'
  | 'automation:write'
  | 'media:read'
  | 'media:upload'
  | 'media:delete'
  | 'modules:manage'
  | 'integrations:manage'
  | 'team:manage'

type PermissionMatrix = Record<WorkspaceRole, Set<Action>>

const ALL_ACTIONS: Action[] = [
  'workspace:read', 'workspace:update', 'workspace:delete', 'workspace:manage_billing', 'workspace:manage_domain',
  'members:read', 'members:invite', 'members:remove', 'members:update_role',
  'profile:read', 'profile:update', 'profile:manage_sections',
  'services:read', 'services:create', 'services:update', 'services:delete', 'services:publish',
  'products:read', 'products:create', 'products:update', 'products:delete',
  'bookings:read', 'bookings:create', 'bookings:update', 'bookings:cancel',
  'crm:read', 'crm:write', 'crm:delete',
  'analytics:read',
  'campaigns:read', 'campaigns:write',
  'automation:read', 'automation:write',
  'media:read', 'media:upload', 'media:delete',
  'modules:manage', 'integrations:manage', 'team:manage',
]

export const PERMISSION_MATRIX: PermissionMatrix = {
  [WORKSPACE_ROLES.OWNER]: new Set(ALL_ACTIONS),

  [WORKSPACE_ROLES.ADMIN]: new Set([
    'workspace:read', 'workspace:update',
    'members:read', 'members:invite', 'members:remove', 'members:update_role',
    'profile:read', 'profile:update', 'profile:manage_sections',
    'services:read', 'services:create', 'services:update', 'services:delete', 'services:publish',
    'products:read', 'products:create', 'products:update', 'products:delete',
    'bookings:read', 'bookings:create', 'bookings:update', 'bookings:cancel',
    'crm:read', 'crm:write', 'crm:delete',
    'analytics:read',
    'campaigns:read', 'campaigns:write',
    'automation:read', 'automation:write',
    'media:read', 'media:upload', 'media:delete',
    'modules:manage', 'team:manage',
  ]),

  [WORKSPACE_ROLES.EDITOR]: new Set([
    'workspace:read',
    'members:read',
    'profile:read', 'profile:update', 'profile:manage_sections',
    'services:read', 'services:create', 'services:update',
    'products:read', 'products:create', 'products:update',
    'bookings:read', 'bookings:create', 'bookings:update',
    'crm:read', 'crm:write',
    'analytics:read',
    'campaigns:read', 'campaigns:write',
    'automation:read',
    'media:read', 'media:upload',
  ]),

  [WORKSPACE_ROLES.MEMBER]: new Set([
    'workspace:read',
    'members:read',
    'profile:read',
    'services:read',
    'products:read',
    'bookings:read', 'bookings:create',
    'crm:read',
    'analytics:read',
    'media:read',
  ]),

  [WORKSPACE_ROLES.VIEWER]: new Set([
    'workspace:read',
    'profile:read',
    'services:read',
    'products:read',
    'bookings:read',
    'analytics:read',
    'media:read',
  ]),
}
