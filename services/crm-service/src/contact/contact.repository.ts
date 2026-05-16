import { prisma } from '@mydigisence/database'
import type { CrmContactStatus } from '@mydigisence/database'

const contactSelect = {
  id: true, workspaceId: true, name: true, email: true, phone: true, company: true,
  status: true, stage: true, dealValue: true, source: true, tags: true,
  notes: true, communicationHistory: true, customFields: true, createdAt: true, updatedAt: true,
} as const

export const contactRepository = {
  findAll(workspaceId: string, opts: { status?: CrmContactStatus; stage?: string; limit?: number; skip?: number; q?: string }) {
    const { status, stage, limit = 20, skip = 0, q } = opts
    return prisma.crmContact.findMany({
      where: {
        workspaceId,
        ...(status && { status }),
        ...(stage && { stage }),
        ...(q && { OR: [{ name: { contains: q, mode: 'insensitive' } }, { email: { contains: q, mode: 'insensitive' } }, { company: { contains: q, mode: 'insensitive' } }] }),
      },
      select: contactSelect, orderBy: { createdAt: 'desc' }, take: limit, skip,
    })
  },

  count(workspaceId: string, opts: { status?: CrmContactStatus; stage?: string }) {
    return prisma.crmContact.count({ where: { workspaceId, ...opts } })
  },

  findById(id: string) { return prisma.crmContact.findUnique({ where: { id }, select: contactSelect }) },

  create(workspaceId: string, data: { name: string; email?: string; phone?: string; company?: string; status?: CrmContactStatus; stage?: string; dealValue?: number; source?: string; tags?: string[] }) {
    return prisma.crmContact.create({ data: { workspaceId, ...data }, select: contactSelect })
  },

  update(id: string, data: Partial<{ name: string; email: string; phone: string; company: string; status: CrmContactStatus; stage: string; dealValue: number; tags: string[]; customFields: object }>) {
    return prisma.crmContact.update({ where: { id }, data, select: contactSelect })
  },

  addNote(id: string, note: { content: string; authorId: string; createdAt: string }) {
    return prisma.crmContact.update({
      where: { id },
      data: { notes: { push: note } },
      select: contactSelect,
    })
  },

  delete(id: string) { return prisma.crmContact.delete({ where: { id } }) },
}
