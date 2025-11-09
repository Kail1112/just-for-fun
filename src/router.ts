import { createRouter, createWebHistory } from 'vue-router'

import { Routes } from './constants/routes'
import IndexPage from './pages/IndexPage.vue'
import { UsersIndexPage, UsersProfilePage, UsersRootPage } from './pages/Users'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: IndexPage,
      name: Routes.INDEX,
      path: '/',
    },
    {
      children: [
        { component: UsersIndexPage, name: Routes.USERS_INDEX, path: '' },
        { component: UsersProfilePage, name: Routes.USERS_PROFILE, path: ':userId' },
      ],
      component: UsersRootPage,
      name: Routes.USERS,
      path: '/users',
    },
  ],
})
