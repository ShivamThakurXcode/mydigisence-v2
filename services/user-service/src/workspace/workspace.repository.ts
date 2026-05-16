import { prisma } from '@mydigisence/database'

const workspaceSelect = {
  id: true,
  ownerId: true,
  name: true,
  slug: true,
  type: true,
  description: true,
  logo: true,
  banner: true,
  website: true,
  phone: true,
  email: true,
  members: true,
  modules: true,
  branding: true,
  subscription: true,
  isActive: true,
  isVerified: true,
  customDomain: true,
  createdAt: true,
  updatedAt: true,
} as const

export const workspaceRepository = {
  findById(id: string) {
    return prisma.workspace.findUnique({ where: { id }, select: workspaceSelect })
  },

  findBySlug(slug: string) {
    return prisma.workspace.findUnique({ where: { slug }, select: workspaceSelect })
  },

  findByOwner(ownerId: string) {
    return prisma.workspace.findMany({ where: { ownerId }, select: workspaceSelect })
  },

  create(data: {
    ownerId: string
    name: string
    slug: string
    type: string
    description?: string
  }) {
    return prisma.workspace.create({
      data: {
        ownerId: data.ownerId,
        name: data.name,
        slug: data.slug,
        type: data.type as Parameters<typeof prisma.workspace.create>[0]['data']['type'],
        description: data.description,
        members: [{ userId: data.ownerId, role: 'owner', joinedAt: new Date().toISOString() }],
      },
      select: workspaceSelect,
    })
  },

  update(
    id: string,
    data: {
      name?: string
      description?: string
      website?: string
      phone?: string
      email?: string
      logo?: string
      banner?: string
    },
  ) {
    return prisma.workspace.update({ where: { id }, data, select: workspaceSelect })
  },

  updateModules(id: string, modules: Record<string, boolean>) {
    return prisma.workspace.update({
      where: { id },
      data: { modules },
      select: { id: true, modules: true },
    })
  },

  slugExists(slug: string) {
    return prisma.workspace.findUnique({ where: { slug }, select: { id: true } })
  },
}
