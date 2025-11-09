interface DeferredResult<Result> {
  resolve: (value: Result) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void
  promise: Promise<Result>
}

export const deferred = <Result = never>() => {
  const result = {} as unknown as DeferredResult<Result>

  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })

  return result
}
