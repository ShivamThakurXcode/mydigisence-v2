import { prisma } from '@mydigisence/database'
import { NotFoundError, ForbiddenError, ConflictError } from '@mydigisence/utils'
import { businessRepository } from './business.repository.js'
import type { CreateBusinessProfileBody, UpdateBusinessProfileBody } from './business.types.js'

function getWorkspaceMember(
  members: unknown[],
  userId: string,
): { userId: string; role: string } | undefined {
  return (members as Array<{ userId: string; role: string }>).find((m) => m.userId === userId)
}

async function getWorkspaceOrThrow(workspaceId: string) {
  const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } })
  if (!workspace || !workspace.isActive) throw new NotFoundError('Workspace', workspaceId)
  return workspace
}

export const businessService = {
  async getBusinessProfile(requesterId: string, workspaceId: string) {
    const workspace = await getWorkspaceOrThrow(workspaceId)
    const member = getWorkspaceMember(workspace.members, requesterId)
    if (!member) throw new ForbiddenError('Not a member of this workspace')

    const profile = await businessRepository.findByWorkspaceId(workspaceId)
    if (!profile) throw new NotFoundError('BusinessProfile', workspaceId)
    return profile
  },

  async getPublicBusinessProfile(workspaceId: string) {
    const workspace = await getWorkspaceOrThrow(workspaceId)
    if (!workspace.isActive) throw new NotFoundError('Workspace', workspaceId)

    const profile = await businessRepository.findByWorkspaceId(workspaceId)
    if (!profile) throw new NotFoundError('BusinessProfile', workspaceId)
    return profile
  },

  async createBusinessProfile(
    requesterId: string,
    workspaceId: string,
    body: CreateBusinessProfileBody,
  ) {
    const workspace = await getWorkspaceOrThrow(workspaceId)

    if (workspace.ownerId !== requesterId) {
      const member = getWorkspaceMember(workspace.members, requesterId)
      if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
        throw new ForbiddenError('Only owners can create a business profile')
      }
    }

    const existing = await businessRepository.exists(workspaceId)
    if (existing) throw new ConflictError('Business profile already exists for this workspace')

    return businessRepository.create(workspaceId, body)
  },

  async updateBusinessProfile(
    requesterId: string,
    workspaceId: string,
    body: UpdateBusinessProfileBody,
  ) {
    const workspace = await getWorkspaceOrThrow(workspaceId)
    const member = getWorkspaceMember(workspace.members, requesterId)

    const isOwner = workspace.ownerId === requesterId
    const canEdit =
      isOwner || (member && (member.role === 'admin' || member.role === 'editor'))

    if (!canEdit) throw new ForbiddenError('Insufficient permissions to update business profile')

    const existing = await businessRepository.exists(workspaceId)
    if (!existing) throw new NotFoundError('BusinessProfile', workspaceId)

    return businessRepository.update(workspaceId, body)
  },
}
