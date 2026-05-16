import { PERMISSION_MATRIX } from './matrix.js'
import type { Action, WorkspaceRole } from './matrix.js'

export interface WorkspaceMember {
  userId: string
  role: WorkspaceRole
}

export function can(role: WorkspaceRole, action: Action): boolean {
  return PERMISSION_MATRIX[role]?.has(action) ?? false
}

export function canAll(role: WorkspaceRole, actions: Action[]): boolean {
  return actions.every((action) => can(role, action))
}

export function canAny(role: WorkspaceRole, actions: Action[]): boolean {
  return actions.some((action) => can(role, action))
}

export function getActionsForRole(role: WorkspaceRole): Action[] {
  return [...(PERMISSION_MATRIX[role] ?? [])]
}

export function getMemberRole(members: WorkspaceMember[], userId: string): WorkspaceRole | null {
  return members.find((m) => m.userId === userId)?.role ?? null
}

export function assertCan(role: WorkspaceRole, action: Action): void {
  if (!can(role, action)) {
    throw new Error(`Role '${role}' is not allowed to perform '${action}'`)
  }
}

export function isAtLeastRole(role: WorkspaceRole, minimum: WorkspaceRole): boolean {
  const hierarchy: WorkspaceRole[] = ['viewer', 'member', 'editor', 'admin', 'owner']
  return hierarchy.indexOf(role) >= hierarchy.indexOf(minimum)
}
