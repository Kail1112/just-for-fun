<script setup lang="ts" generic="Details extends import('@/types').AnyObject">
import { computed, defineModel, defineProps } from 'vue'

import type { AnyObject } from '@/types'

import { useDetailsPresenter } from './Details.presenter'
import DetailsContainer from './DetailsContainer.vue'
import DetailsLine from './DetailsLine.vue'

defineProps<{ title?: string }>()
const model = defineModel<Details>()

const { classes, isPrimitive } = useDetailsPresenter()

const lines = computed(() => {
  return Object.entries(model.value ?? {}).reduce((acc, [key, value]) => {
    if (isPrimitive(value)) {
      acc[key] = value
    }

    return acc
  }, {} as AnyObject)
})
</script>

<template>
  <DetailsContainer>
    <template v-if="title" #title>{{ title }}</template>
    <template #details>
      <DetailsLine
        v-for="(value, key, index) in lines"
        :key="`details-editor-${index}-${String(key)}`"
      >
        <p :class="classes['line-title']">{{ key }}</p>

        <input
          v-if="model && key in model"
          type="text"
          v-model="model[key]"
          :class="classes['line-value-input']"
        />
      </DetailsLine>
    </template>
  </DetailsContainer>
</template>

<style module src="./Details.styles.css"></style>
