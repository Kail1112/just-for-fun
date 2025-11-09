<script setup lang="ts">
import { defineSlots, Text, useCssModule } from 'vue'
import type { VNodeTypes } from 'vue'

defineSlots<{
  details?: () => VNodeTypes
  title?: () => VNodeTypes
}>()

const classes = useCssModule()
</script>

<template>
  <div v-if="$slots.details || $slots.title" :class="classes.container">
    <h3 v-if="$isSlotType($slots.title, Text)" :class="classes.title">
      <slot name="title" />
    </h3>
    <slot v-else name="title" />

    <div v-if="$slots.details" :class="classes.lines">
      <slot name="details" />
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--s-gap);
  border-radius: var(--l-border-radius);
  border: 1px solid var(--color-black-30);
  padding: var(--m-padding) var(--l-padding);
}

.title {
  margin: 0;
  font-size: var(--font-size-h3);
  font-weight: 500;
}

.lines {
  display: flex;
  flex-direction: column;
  gap: var(--xs-gap);
}
</style>
