import { prisma } from '@mydigisence/database'
import type { CreateBusinessProfileBody, UpdateBusinessProfileBody } from './business.types.js'

const businessProfileSelect = {
  id: true,
  workspaceId: true,
  industry: true,
  category: true,
  subcategory: true,
  address: true,
  location: true,
  businessHours: true,
  founded: true,
  size: true,
  socialLinks: true,
  createdAt: true,
  updatedAt: true,
} as const

export const businessRepository = {
  findByWorkspaceId(workspaceId: string) {
    return prisma.businessProfile.findUnique({
      where: { workspaceId },
      select: businessProfileSelect,
    })
  },

  create(workspaceId: string, data: CreateBusinessProfileBody) {
    return prisma.businessProfile.create({
      data: { workspaceId, ...data },
      select: businessProfileSelect,
    })
  },

  update(workspaceId: string, data: UpdateBusinessProfileBody) {
    return prisma.businessProfile.update({
      where: { workspaceId },
      data,
      select: businessProfileSelect,
    })
  },

  exists(workspaceId: string) {
    return prisma.businessProfile.findUnique({
      where: { workspaceId },
      select: { id: true },
    })
  },
}
