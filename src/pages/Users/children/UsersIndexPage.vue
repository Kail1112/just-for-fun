<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useCssModule } from 'vue'
import { RouterLink } from 'vue-router'

import UserCard from '@/components/UserCard/UserCard.vue'
import UserCardSkeleton from '@/components/UserCard/UserCardSkeleton.vue'
import { Routes } from '@/constants/routes'
import { useUsersStore } from '@/stores/users'

const sketeletons = Array.from({ length: 6 })

const classes = useCssModule()
const store = useUsersStore()

const controller = ref(new AbortController())
const loading = ref(true)

onMounted(() => {
  store.getUsers({ signal: controller.value.signal }).finally(() => {
    loading.value = false
  })
})

onBeforeUnmount(() => {
  if (controller.value.signal.aborted) {
    return
  }

  controller.value.abort()
})
</script>

<template>
  <div :class="classes.container">
    <template v-if="loading">
      <UserCardSkeleton v-for="(_, index) in sketeletons" :key="`user_skeleton_${index}`" />
    </template>
    <template v-else>
      <UserCard v-for="(user, index) in store.users" :key="`user_${index}_${user.id}`" :user="user">
        <template #bottom="{ id }">
          <RouterLink :to="{ name: Routes.USERS_PROFILE, params: { userId: id } }"
            >Detail</RouterLink
          >
        </template>
      </UserCard>
    </template>
  </div>
</template>

<style module>
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: var(--l-gap);
  padding: var(--l-padding);
}
</style>
