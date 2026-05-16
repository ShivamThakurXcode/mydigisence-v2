import { useState, useCallback, useRef } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useAsync<T>(
  asyncFn: (...args: unknown[]) => Promise<T>,
  immediate = false,
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  })
  const mountedRef = useRef(true)

  const execute = useCallback(
    async (...args: unknown[]) => {
      setState({ data: null, loading: true, error: null })
      try {
        const result = await asyncFn(...args)
        if (mountedRef.current) {
          setState({ data: result, loading: false, error: null })
        }
        return result
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred'
        if (mountedRef.current) {
          setState({ data: null, loading: false, error: message })
        }
        throw err
      }
    },
    [asyncFn],
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return { ...state, execute, reset }
}
