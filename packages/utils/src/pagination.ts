export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PaginatedResult<T> {
  data: T[]
  meta: PaginationMeta
}

export function getPaginationOffset(page: number, limit: number): number {
  return (page - 1) * limit
}

export function buildPaginationMeta(page: number, limit: number, total: number): PaginationMeta {
  const totalPages = Math.ceil(total / limit)
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}

export function paginateArray<T>(arr: T[], page: number, limit: number): PaginatedResult<T> {
  const offset = getPaginationOffset(page, limit)
  const data = arr.slice(offset, offset + limit)
  return {
    data,
    meta: buildPaginationMeta(page, limit, arr.length),
  }
}

export interface CursorPaginationParams {
  cursor?: string
  limit: number
}

export interface CursorPaginationMeta {
  nextCursor: string | null
  hasMore: boolean
  count: number
}

export function buildCursorMeta<T extends { id: string }>(
  items: T[],
  limit: number,
): CursorPaginationMeta {
  const hasMore = items.length > limit
  const data = hasMore ? items.slice(0, limit) : items
  const lastItem = data[data.length - 1]
  return {
    nextCursor: hasMore && lastItem ? lastItem.id : null,
    hasMore,
    count: data.length,
  }
}
