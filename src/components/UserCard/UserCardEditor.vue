<script setup lang="ts" generic="User extends import('@/types/user').User = never">
import { defineEmits, defineProps, reactive, ref, useCssModule } from 'vue'

import type { Address } from '@/types/address'

import DetailsEditor from '../Details/DetailsEditor.vue'

import UserCardContainer from './UserCardContainer.vue'

const emits = defineEmits<{
  (event: 'cancel'): void
  (event: 'save', user: import('@/types/user').User): void
}>()
const { user } = defineProps<{ user?: User }>()

const classes = useCssModule()

const address = reactive<Address>(
  Object.entries(user?.address ?? {}).reduce(
    (acc, [key, value]) => {
      return { ...acc, [key]: value }
    },
    { city: '', geo: {}, street: '', suite: '', zipcode: '' } as Address,
  ),
)
const name = ref(user?.name ?? '')
</script>

<template>
  <UserCardContainer>
    <template #title>
      <input v-model="name" :class="classes.input" type="text" />
    </template>
    <template #details>
      <DetailsEditor title="Address:" v-model="address" />
    </template>
  </UserCardContainer>
</template>

<style module>
.input {
  border: 1px solid var(--color-black-30);
  border-radius: var(--s-border-radius);
  padding: 3.5px 9px;
  font-size: var(--font-size-h2);

  &:focus,
  &:focus-visible {
    outline-color: var(--color-black-30);
  }
}
</style>
