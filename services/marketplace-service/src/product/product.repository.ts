import { prisma } from '@mydigisence/database'

const productSelect = {
  id: true, workspaceId: true, title: true, description: true, price: true,
  currency: true, category: true, tags: true, images: true, sku: true,
  inventory: true, isDigital: true, downloadUrl: true, status: true,
  createdAt: true, updatedAt: true,
} as const

export const productRepository = {
  findAll(opts: { workspaceId?: string; category?: string; isDigital?: boolean; limit?: number; skip?: number }) {
    const { workspaceId, category, isDigital, limit = 20, skip = 0 } = opts
    return prisma.product.findMany({
      where: { ...(workspaceId && { workspaceId }), ...(category && { category }), ...(isDigital !== undefined && { isDigital }) },
      select: productSelect, orderBy: { createdAt: 'desc' }, take: limit, skip,
    })
  },

  count(opts: { workspaceId?: string }) { return prisma.product.count({ where: opts }) },

  findById(id: string) { return prisma.product.findUnique({ where: { id }, select: productSelect }) },

  create(workspaceId: string, data: { title: string; description: string; price: number; currency?: string; category: string; tags?: string[]; images?: string[]; sku?: string; inventory?: number; isDigital?: boolean }) {
    return prisma.product.create({ data: { workspaceId, ...data }, select: productSelect })
  },

  update(id: string, data: Partial<{ title: string; description: string; price: number; category: string; tags: string[]; images: string[]; inventory: number; status: 'active' | 'draft' | 'archived' | 'suspended' }>) {
    return prisma.product.update({ where: { id }, data, select: productSelect })
  },

  delete(id: string) { return prisma.product.delete({ where: { id } }) },
}
