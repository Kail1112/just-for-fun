import type { BaseRequestConfig } from '@/types/requests.ts'
import type { User } from '@/types/user'
import { makeRequest } from '@/utils/make-request'

import { jsonplaceholder } from './common.ts'

interface BaseUserRequest {
  userId: number | string
}

export const getUsers = async (options?: BaseRequestConfig): Promise<User[]> => {
  const { signal, ...rest } = options ?? {}

  const { data } = await makeRequest(() => {
    return jsonplaceholder.get<User[]>('/users', { ...rest, signal })
  })

  return data
}

export const getUser = async (
  { userId }: BaseUserRequest,
  options?: BaseRequestConfig,
): Promise<User> => {
  const { signal, ...rest } = options ?? {}

  const { data } = await makeRequest(() => {
    return jsonplaceholder.get<User>(`/users/${userId}`, { ...rest, signal })
  })

  return data
}

export const getUserAlbums = async (
  { userId }: BaseUserRequest,
  options?: BaseRequestConfig,
): Promise<User> => {
  const { signal, ...rest } = options ?? {}

  const { data } = await makeRequest(() => {
    return jsonplaceholder.get<User>(`/users/${userId}/albums`, { ...rest, signal })
  })

  return data
}

export const getUserPosts = async (
  { userId }: BaseUserRequest,
  options?: BaseRequestConfig,
): Promise<User> => {
  const { signal, ...rest } = options ?? {}

  const { data } = await makeRequest(() => {
    return jsonplaceholder.get<User>(`/users/${userId}/posts`, { ...rest, signal })
  })

  return data
}

export const getUserTodos = async (
  { userId }: BaseUserRequest,
  options?: BaseRequestConfig,
): Promise<User> => {
  const { signal, ...rest } = options ?? {}

  const { data } = await makeRequest(() => {
    return jsonplaceholder.get<User>(`/users/${userId}/todos`, { ...rest, signal })
  })

  return data
}
