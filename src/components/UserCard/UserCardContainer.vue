<script setup lang="ts">
import { defineSlots, Text, useCssModule } from 'vue'
import type { VNodeTypes } from 'vue'

defineSlots<{
  bottom?: () => VNodeTypes
  details?: () => VNodeTypes
  title?: () => VNodeTypes
}>()

const classes = useCssModule()
</script>

<template>
  <div v-if="$slots.bottom || $slots.details || $slots.title" :class="classes.container">
    <h2 v-if="$isSlotType($slots.title, Text)" :class="classes.title">
      <slot name="title" />
    </h2>
    <slot v-else name="title" />

    <div v-if="$slots.details" :class="classes.details">
      <slot name="details" />
    </div>

    <div v-if="$slots.bottom" :class="classes.bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--m-gap);
  border-radius: var(--l-border-radius);
  border: 1px solid var(--color-black-30);
  background-color: var(--color-white);
  padding: var(--m-padding) var(--l-padding);
}

.title {
  margin: 0;
  font-size: var(--font-size-h2);
  font-weight: 600;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  gap: var(--m-gap);
}
</style>
