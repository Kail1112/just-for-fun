import type { BaseRequestConfig } from '@/types/requests.ts'

import { deferred } from './deferred'

interface ExponentialDelayParams extends Pick<BaseRequestConfig, 'signal'> {
  attempt: number
  delay?: number
  exponent?: number
}

export const exponentialDelay = ({
  attempt,
  delay = 150,
  exponent = 2,
  signal,
}: ExponentialDelayParams) => {
  const timeout = delay * exponent ** (attempt - 1)
  const { promise, resolve } = deferred<void>()

  let timer = -1

  if (signal instanceof AbortSignal) {
    signal.addEventListener(
      'abort',
      () => {
        if (timer >= 0) {
          clearTimeout(timer)
        }

        resolve()
      },
      { once: true },
    )
  }

  timer = setTimeout(() => {
    resolve()
  }, timeout)

  return promise
}
