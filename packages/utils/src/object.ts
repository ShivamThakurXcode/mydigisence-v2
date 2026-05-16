type PlainObject = Record<string, unknown>

export function pick<T extends PlainObject, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) result[key] = obj[key]
  }
  return result
}

export function omit<T extends PlainObject, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result as Omit<T, K>
}

export function deepMerge<T extends PlainObject>(target: T, ...sources: Partial<T>[]): T {
  const output = { ...target }
  for (const source of sources) {
    for (const key in source) {
      const srcVal = source[key]
      const tgtVal = output[key as keyof T]
      if (isPlainObject(srcVal) && isPlainObject(tgtVal)) {
        ;(output as PlainObject)[key] = deepMerge(
          tgtVal as PlainObject,
          srcVal as PlainObject,
        )
      } else if (srcVal !== undefined) {
        ;(output as PlainObject)[key] = srcVal
      }
    }
  }
  return output
}

export function isPlainObject(val: unknown): val is PlainObject {
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}

export function flattenObject(obj: PlainObject, prefix = ''): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, val] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key
    if (isPlainObject(val)) {
      Object.assign(result, flattenObject(val, newKey))
    } else {
      result[newKey] = val
    }
  }
  return result
}

export function removeUndefined<T extends PlainObject>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as Partial<T>
}
