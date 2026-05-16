import { prisma } from '@mydigisence/database'
import type { ListingStatus } from '@mydigisence/database'

const serviceSelect = {
  id: true, workspaceId: true, title: true, description: true, price: true,
  currency: true, category: true, subcategory: true, tags: true, images: true,
  deliveryTime: true, availability: true, status: true, viewCount: true,
  bookingCount: true, rating: true, reviewCount: true, createdAt: true, updatedAt: true,
} as const

export const serviceRepository = {
  findAll(opts: { workspaceId?: string; category?: string; status?: ListingStatus; limit?: number; skip?: number }) {
    const { workspaceId, category, status, limit = 20, skip = 0 } = opts
    return prisma.service.findMany({
      where: { ...(workspaceId && { workspaceId }), ...(category && { category }), ...(status && { status }) },
      select: serviceSelect,
      orderBy: { createdAt: 'desc' },
      take: limit, skip,
    })
  },

  count(opts: { workspaceId?: string; category?: string; status?: ListingStatus }) {
    return prisma.service.count({ where: { ...opts } })
  },

  findById(id: string) {
    return prisma.service.findUnique({ where: { id }, select: serviceSelect })
  },

  create(workspaceId: string, data: { title: string; description: string; price: number; currency?: string; category: string; subcategory?: string; tags?: string[]; images?: string[]; deliveryTime?: number }) {
    return prisma.service.create({ data: { workspaceId, ...data }, select: serviceSelect })
  },

  update(id: string, data: Partial<{ title: string; description: string; price: number; currency: string; category: string; subcategory: string; tags: string[]; images: string[]; deliveryTime: number; availability: object; status: ListingStatus }>) {
    return prisma.service.update({ where: { id }, data, select: serviceSelect })
  },

  delete(id: string) { return prisma.service.delete({ where: { id } }) },

  publish(id: string) { return prisma.service.update({ where: { id }, data: { status: 'active' }, select: serviceSelect }) },

  incrementView(id: string) { return prisma.service.update({ where: { id }, data: { viewCount: { increment: 1 } }, select: { id: true, viewCount: true } }) },
}
