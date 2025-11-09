<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useCssModule } from 'vue'
import { useRoute } from 'vue-router'

import UserCard from '@/components/UserCard/UserCard.vue'
import UserCardEditor from '@/components/UserCard/UserCardEditor.vue'
import UserCardSkeleton from '@/components/UserCard/UserCardSkeleton.vue'
import { useUsersStore } from '@/stores/users'

const classes = useCssModule()
const route = useRoute()
const store = useUsersStore()

const controller = ref(new AbortController())
const loading = ref(true)

const userId = computed(() => {
  return route.params.userId
})
const user = computed(() => {
  if (loading.value || typeof userId.value !== 'string') {
    return
  }

  return store.users[userId.value]
})

onMounted(() => {
  const userId = route.params.userId

  if (typeof userId !== 'string') {
    return
  }

  store.getUser({ userId }, { signal: controller.value.signal }).finally(() => {
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
    <template v-if="user">
      <UserCard :user="user" />
      <UserCardEditor :user="user"
    /></template>
    <UserCardSkeleton v-else />
  </div>
</template>

<style module>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--l-gap);
  padding: var(--l-padding);
}
</style>
