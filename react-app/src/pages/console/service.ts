import { fetchResult } from '#H/UseResult'

export const allNames = ['SERVER_CORE', 'SERVER_USER', 'DEFAULT'] as const

export const allTypes = ['DEBUG', 'INFO', 'NOTIFY', 'SUCCESS', 'WARNING', 'ERROR'] as const

export type Name = typeof allNames[number]

export type Type = typeof allTypes[number]

export interface Message {
  id: number
  name: Name
  type: Type
  text: string
  createOn: number
  acceptOn: number
}

export interface Options {
  types: Type[]
  search?: string
  page?: number
  size?: number
}

export function findAll(name: Name, options?: Options) {
  const params = new URLSearchParams()
  if (options?.types) params.append('types', options.types.join(','))
  if (options?.search) params.append('search', options.search)
  if (options?.page) params.append('page', `${options.page}`)
  if (options?.size) params.append('size', `${options.size}`)
  return fetchResult<Message[]>(`/api/messages/${name}?${params}`)
}
