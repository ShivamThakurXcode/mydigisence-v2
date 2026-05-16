import { prisma } from '@mydigisence/database'

const userSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  roles: true,
  workspaceIds: true,
  emailVerified: true,
  isActive: true,
  lastLoginAt: true,
  createdAt: true,
  profile: {
    select: {
      id: true,
      username: true,
      displayName: true,
      bio: true,
      avatar: true,
      banner: true,
      location: true,
      website: true,
      isPublic: true,
      viewCount: true,
    },
  },
} as const

export const userRepository = {
  findById(id: string) {
    return prisma.user.findUnique({ where: { id }, select: userSelect })
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email }, select: userSelect })
  },

  update(id: string, data: { firstName?: string; lastName?: string; phone?: string | null }) {
    return prisma.user.update({ where: { id }, data, select: userSelect })
  },

  addWorkspaceId(userId: string, workspaceId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { workspaceIds: { push: workspaceId } },
      select: { id: true, workspaceIds: true },
    })
  },

  findWorkspaces(workspaceIds: string[]) {
    return prisma.workspace.findMany({
      where: { id: { in: workspaceIds } },
      select: {
        id: true,
        name: true,
        slug: true,
        type: true,
        logo: true,
        subscription: true,
        isActive: true,
        isVerified: true,
        members: true,
        modules: true,
        createdAt: true,
      },
    })
  },
}
