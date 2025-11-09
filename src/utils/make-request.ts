import type { AxiosResponse } from 'axios'

import type { BaseRequestConfig } from '@/types/requests'

import { exponentialDelay } from './exponential-delay'

type MakeRequestOptions = Pick<BaseRequestConfig, 'signal'>

const MAX_RETRY = 3

/* eslint-disable @typescript-eslint/no-explicit-any */
export const makeRequest = async <
  Request extends () => Promise<AxiosResponse<any>>,
  Response extends ReturnType<Request> = ReturnType<Request>,
>(
  request: Request,
  options?: MakeRequestOptions,
): Promise<Response> => {
  const { signal } = options ?? {}

  let attempt = 0

  while (true) {
    attempt++

    try {
      const response = await request()

      return response as Response
    } catch (error) {
      if (attempt >= MAX_RETRY) {
        throw error
      }

      await exponentialDelay({ attempt, signal })
    }
  }
}
/* eslint-enable */
