<script setup lang="ts" generic="Details extends import('@/types').AnyObject">
import { defineProps, defineSlots } from 'vue'
import type { VNodeTypes } from 'vue'

import type { Primitive } from './Details.types'
import { useDetailsPresenter } from './Details.presenter'
import DetailsContainer from './DetailsContainer.vue'
import DetailsLine from './DetailsLine.vue'

interface DefaultSlotProp<Key, Value> {
  index: number
  key: Key
  value: Value
}
type DefaultSlotProps = {
  [Key in keyof Details]: Details[Key] extends Primitive
    ? never
    : DefaultSlotProp<Key, Details[Key]>
}[keyof Details]

defineProps<{ details: Details; title?: string }>()
defineSlots<{ default: (props: DefaultSlotProps) => VNodeTypes }>()

const { classes, isPrimitive } = useDetailsPresenter()
</script>

<template>
  <DetailsContainer v-if="details || title">
    <template v-if="title" #title>{{ title }}</template>
    <template v-if="details" #details>
      <DetailsLine v-for="(value, key, index) in details" :key="`details-${index}-${String(key)}`">
        <p :class="classes['line-title']">{{ key }}</p>

        <p v-if="isPrimitive(value)" :class="classes['line-value']">
          {{ value }}
        </p>
        <slot v-else :="{ index, key: String(key), value } as DefaultSlotProps" />
      </DetailsLine>
    </template>
  </DetailsContainer>
</template>

<style module src="./Details.styles.css"></style>
