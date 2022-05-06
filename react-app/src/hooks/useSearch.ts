import useUrlState, { Options } from '@ahooksjs/use-url-state'

interface ExtraOptions {
  arrayNames?: string[]
}

export const useSerach = <T>(
  initialState: T | (() => T) | undefined,
  options: Options & ExtraOptions
) => {
  const [state, setState] = useUrlState(initialState, options)
  options = {
    stringifyOptions: { arrayFormat: 'comma' },
    parseOptions: { arrayFormat: 'comma' },
    ...options,
  }
  const array = state as any
  options.arrayNames?.forEach((name) => {
    array[name] = toArray(array[name])
  })
  return [state, setState] as const
}

function toArray(array: string[]) {
  return typeof array === 'string' ? [array] : array ?? []
}
