import { fetchResult } from '#H/UseResult'

export interface IUser {
  id: number
  username: string
  enabled: boolean
  roles: string[]
  createOn: number
  accessOn?: number
}

export interface Search {
  page: number
  size: number
}

export function findAll({ page = 1, size = 20 }: Partial<Search>) {
  return fetchResult<IUser[]>(`/api/users?page=${page}&size=${size}`)
}
