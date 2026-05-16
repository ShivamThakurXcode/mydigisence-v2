import { NotFoundError, ForbiddenError, ConflictError } from '@mydigisence/utils'
import { profileRepository } from './profile.repository.js'
import type { UpdateProfileBody, UpdateSectionsBody, SectionConfig } from './profile.types.js'

export const profileService = {
  async getProfileByUsername(username: string, viewerId?: string) {
    const profile = await profileRepository.findByUsername(username)
    if (!profile) throw new NotFoundError('Profile', username)

    if (!profile.isPublic && profile.userId !== viewerId) {
      throw new ForbiddenError('This profile is private')
    }

    if (profile.userId !== viewerId) {
      await profileRepository.incrementViewCount(profile.id).catch(() => null)
    }

    return profile
  },

  async getProfileById(profileId: string, requesterId: string) {
    const profile = await profileRepository.findById(profileId)
    if (!profile) throw new NotFoundError('Profile', profileId)
    if (profile.userId !== requesterId) throw new ForbiddenError('Cannot access this profile')
    return profile
  },

  async getMyProfile(userId: string) {
    const profile = await profileRepository.findByUserId(userId)
    if (!profile) throw new NotFoundError('Profile')
    return profile
  },

  async updateProfile(requesterId: string, profileId: string, body: UpdateProfileBody) {
    const profile = await profileRepository.findById(profileId)
    if (!profile) throw new NotFoundError('Profile', profileId)
    if (profile.userId !== requesterId) throw new ForbiddenError('Cannot update this profile')

    if (body.username && body.username !== profile.username) {
      const taken = await profileRepository.usernameExists(body.username, profileId)
      if (taken) throw new ConflictError(`Username '${body.username}' is already taken`)
    }

    return profileRepository.update(profileId, body)
  },

  async getSections(requesterId: string, profileId: string) {
    const profile = await profileRepository.findById(profileId)
    if (!profile) throw new NotFoundError('Profile', profileId)
    if (profile.userId !== requesterId) throw new ForbiddenError('Cannot access this profile')
    return profile.sections as SectionConfig[]
  },

  async updateSections(requesterId: string, profileId: string, body: UpdateSectionsBody) {
    const profile = await profileRepository.findById(profileId)
    if (!profile) throw new NotFoundError('Profile', profileId)
    if (profile.userId !== requesterId) throw new ForbiddenError('Cannot update this profile')

    const ordered = [...body.sections].sort((a, b) => a.order - b.order)
    return profileRepository.updateSections(profileId, ordered)
  },
}
