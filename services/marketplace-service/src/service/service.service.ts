import { NotFoundError, ForbiddenError } from '@mydigisence/utils'
import { serviceRepository } from './service.repository.js'
import type { CreateListingInput, UpdateListingInput } from '@mydigisence/validations'

export const marketplaceServiceLayer = {
  async list(opts: { workspaceId?: string; category?: string; status?: string; page?: number; limit?: number }) {
    const { page = 1, limit = 20, workspaceId, category, status } = opts
    const skip = (page - 1) * limit
    const [items, total] = await Promise.all([
      serviceRepository.findAll({ workspaceId, category, status: status as Parameters<typeof serviceRepository.findAll>[0]['status'], limit, skip }),
      serviceRepository.count({ workspaceId, category, status: status as Parameters<typeof serviceRepository.count>[0]['status'] }),
    ])
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) }
  },

  async getOne(id: string) {
    const service = await serviceRepository.findById(id)
    if (!service) throw new NotFoundError('Service', id)
    await serviceRepository.incrementView(id).catch(() => null)
    return service
  },

  async create(workspaceId: string, userId: string, data: CreateListingInput) {
    return serviceRepository.create(workspaceId, data)
  },

  async update(id: string, requesterId: string, data: UpdateListingInput) {
    const service = await serviceRepository.findById(id)
    if (!service) throw new NotFoundError('Service', id)
    return serviceRepository.update(id, data)
  },

  async publish(id: string) {
    const service = await serviceRepository.findById(id)
    if (!service) throw new NotFoundError('Service', id)
    return serviceRepository.publish(id)
  },

  async remove(id: string) {
    const service = await serviceRepository.findById(id)
    if (!service) throw new NotFoundError('Service', id)
    await serviceRepository.delete(id)
  },
}
