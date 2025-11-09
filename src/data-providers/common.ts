import axios from 'axios'

import { Headers } from '@/constants/requests.ts'

export const jsonplaceholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { [Headers.CONTENT_TYPE]: 'application/json' },
})
