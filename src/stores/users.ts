import { ref } from 'vue'
import { defineStore } from 'pinia'

import {
  getUser as getUserDataProvider,
  getUsers as getUsersDataProvider,
} from '@/data-providers/users'
import type { BaseRequestConfig } from '@/types/requests'
import type { User } from '@/types/user'

type GetUserParams = Parameters<typeof getUserDataProvider>[0]
type Users = Record<string, User>

export const useUsersStore = defineStore('users', () => {
  const users = ref<Users>({})

  const getUser = async (params: GetUserParams, options?: BaseRequestConfig) => {
    const { userId } = params

    users.value[userId] ??= await getUserDataProvider(params, options)
  }

  const getUsers = async (options?: BaseRequestConfig) => {
    const response = await getUsersDataProvider(options)

    for (const user of response) {
      const { id } = user

      users.value[id] ??= user
    }
  }

  return { getUser, getUsers, users }
})
