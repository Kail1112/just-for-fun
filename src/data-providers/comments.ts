import type { BaseRequestConfig } from '@/types/requests.ts'
import type { Comment } from '@/types/comment'
import { makeRequest } from '@/utils/make-request'

import { jsonplaceholder } from './common.ts'

type GetCommentsRequest = Partial<Pick<Comment, 'email' | 'postId'>>

export const getComments = async (
  search?: GetCommentsRequest,
  options?: BaseRequestConfig,
): Promise<Comment[]> => {
  const { signal, ...rest } = options ?? {}

  const params = new URLSearchParams()

  if (typeof search !== 'undefined') {
    const entries = Object.entries(search)

    entries.forEach(([key, value]) => {
      params.append(key, String(value))
    })
  }

  const { data } = await makeRequest(() => {
    return jsonplaceholder.get<Comment[]>('/comments', { ...rest, params, signal })
  })

  return data
}
