import { prisma } from '@mydigisence/database'

const profileSelect = {
  id: true,
  userId: true,
  username: true,
  displayName: true,
  bio: true,
  avatar: true,
  banner: true,
  location: true,
  website: true,
  sections: true,
  settings: true,
  isPublic: true,
  viewCount: true,
  createdAt: true,
  updatedAt: true,
} as const

export const profileRepository = {
  findByUsername(username: string) {
    return prisma.profile.findUnique({ where: { username }, select: profileSelect })
  },

  findById(id: string) {
    return prisma.profile.findUnique({ where: { id }, select: profileSelect })
  },

  findByUserId(userId: string) {
    return prisma.profile.findUnique({ where: { userId }, select: profileSelect })
  },

  update(
    id: string,
    data: {
      displayName?: string
      bio?: string
      avatar?: string
      banner?: string
      location?: string
      website?: string
      username?: string
    },
  ) {
    return prisma.profile.update({ where: { id }, data, select: profileSelect })
  },

  updateSections(id: string, sections: object[]) {
    return prisma.profile.update({
      where: { id },
      data: { sections },
      select: { id: true, sections: true },
    })
  },

  incrementViewCount(id: string) {
    return prisma.profile.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      select: { id: true, viewCount: true },
    })
  },

  usernameExists(username: string, excludeId?: string) {
    return prisma.profile.findFirst({
      where: { username, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    })
  },
}
