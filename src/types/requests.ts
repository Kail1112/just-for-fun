import type { AxiosRequestConfig } from 'axios'

export type BaseRequestConfig = Pick<
  AxiosRequestConfig,
  'decompress' | 'signal' | 'onUploadProgress' | 'onDownloadProgress'
>
