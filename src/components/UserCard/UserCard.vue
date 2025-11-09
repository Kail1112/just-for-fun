<script setup lang="ts" generic="User extends import('@/types/user').User">
import { computed, defineProps, defineSlots } from 'vue'
import type { VNodeTypes } from 'vue'

import Details from '../Details/Details.vue'

import UserCardContainer from './UserCardContainer.vue'

const { user } = defineProps<{ user: User }>()
defineSlots<{ bottom?: (props: User) => VNodeTypes }>()

const data = computed(() => {
  const { address, company, id: ___, name: ____, ...base } = user

  return { address, base, company }
})
</script>

<template>
  <UserCardContainer>
    <template #title>
      {{ user.name }}
    </template>
    <template #details>
      <Details title="Base information:" :details="data.base" />
      <Details title="Address:" :details="data.address" v-slot="line">
        <a
          v-if="line.key === 'geo'"
          :href="`https://www.openstreetmap.org/?mlat=${line.value.lng}&mlon=${line.value.lat}`"
          target="_blank"
          >Open in map</a
        >
      </Details>
      <Details title="Company:" :details="data.company" />
    </template>
    <template #bottom>
      <slot name="bottom" :="user" />
    </template>
  </UserCardContainer>
</template>

<style module></style>
