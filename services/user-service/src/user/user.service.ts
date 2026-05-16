import { NotFoundError, ForbiddenError } from '@mydigisence/utils'
import { userRepository } from './user.repository.js'
import type { UpdateUserBody } from './user.types.js'

export const userService = {
  async getUser(requesterId: string, targetId: string) {
    if (requesterId !== targetId) {
      throw new ForbiddenError('Cannot access another user\'s account')
    }
    const user = await userRepository.findById(targetId)
    if (!user) throw new NotFoundError('User', targetId)
    return user
  },

  async updateUser(requesterId: string, targetId: string, body: UpdateUserBody) {
    if (requesterId !== targetId) {
      throw new ForbiddenError('Cannot modify another user\'s account')
    }
    const user = await userRepository.findById(targetId)
    if (!user) throw new NotFoundError('User', targetId)
    return userRepository.update(targetId, body)
  },

  async getUserWorkspaces(requesterId: string, targetId: string) {
    if (requesterId !== targetId) {
      throw new ForbiddenError('Cannot access another user\'s workspaces')
    }
    const user = await userRepository.findById(targetId)
    if (!user) throw new NotFoundError('User', targetId)
    return userRepository.findWorkspaces(user.workspaceIds)
  },
}
