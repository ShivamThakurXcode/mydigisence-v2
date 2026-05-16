import { NotFoundError, ForbiddenError, ConflictError } from '@mydigisence/utils'
import { can } from '@mydigisence/permissions'
import { workspaceRepository } from './workspace.repository.js'
import { userRepository } from '../user/user.repository.js'
import type { CreateWorkspaceBody, UpdateWorkspaceBody, UpdateModulesBody } from './workspace.types.js'

function getMemberRole(members: unknown[], userId: string): string | null {
  const member = (members as Array<{ userId: string; role: string }>).find(
    (m) => m.userId === userId,
  )
  return member?.role ?? null
}

export const workspaceService = {
  async getWorkspace(requesterId: string, workspaceId: string) {
    const workspace = await workspaceRepository.findById(workspaceId)
    if (!workspace) throw new NotFoundError('Workspace', workspaceId)

    const role = getMemberRole(workspace.members, requesterId)
    if (!role) throw new ForbiddenError('Not a member of this workspace')

    return workspace
  },

  async createWorkspace(ownerId: string, body: CreateWorkspaceBody) {
    const slugTaken = await workspaceRepository.slugExists(body.slug)
    if (slugTaken) throw new ConflictError(`Slug '${body.slug}' is already taken`)

    const workspace = await workspaceRepository.create({ ownerId, ...body })

    await userRepository.addWorkspaceId(ownerId, workspace.id)

    return workspace
  },

  async updateWorkspace(requesterId: string, workspaceId: string, body: UpdateWorkspaceBody) {
    const workspace = await workspaceRepository.findById(workspaceId)
    if (!workspace) throw new NotFoundError('Workspace', workspaceId)

    const role = getMemberRole(workspace.members, requesterId)
    if (!role || !can(role as Parameters<typeof can>[0], 'workspace:update')) {
      throw new ForbiddenError('Insufficient permissions to update workspace')
    }

    return workspaceRepository.update(workspaceId, body)
  },

  async updateModules(requesterId: string, workspaceId: string, body: UpdateModulesBody) {
    const workspace = await workspaceRepository.findById(workspaceId)
    if (!workspace) throw new NotFoundError('Workspace', workspaceId)

    const role = getMemberRole(workspace.members, requesterId)
    if (!role || !can(role as Parameters<typeof can>[0], 'modules:manage')) {
      throw new ForbiddenError('Insufficient permissions to manage modules')
    }

    return workspaceRepository.updateModules(workspaceId, body.modules)
  },

  async getWorkspaceModules(requesterId: string, workspaceId: string) {
    const workspace = await workspaceRepository.findById(workspaceId)
    if (!workspace) throw new NotFoundError('Workspace', workspaceId)

    const role = getMemberRole(workspace.members, requesterId)
    if (!role) throw new ForbiddenError('Not a member of this workspace')

    return { id: workspace.id, modules: workspace.modules }
  },
}
