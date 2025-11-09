<script setup lang="ts">
import { useCssModule } from 'vue'

import { randomValue } from '@/utils/random-value'

import Skeleton from '../Skeleton.vue'

import DetailsContainer from './DetailsContainer.vue'
import DetailsLine from './DetailsLine.vue'

const classes = useCssModule()

const maxTitleWidth = randomValue({ base: 175, factor: 50 })
const lines = Array.from({ length: 3 }).map((_, index) => {
  return randomValue({ base: 100, factor: 50 + index + 1 })
})
</script>

<template>
  <DetailsContainer>
    <template #title>
      <Skeleton :class="classes.title" :style="{ 'max-width': `${maxTitleWidth}px` }" />
    </template>
    <template #details>
      <DetailsLine
        v-for="(value, index) in lines"
        :key="`details-skeleton-${index}`"
        :class="classes.line"
      >
        <Skeleton :class="classes['line-title']" />
        <Skeleton :class="classes['line-value']" :style="{ 'max-width': `${value}px` }" />
      </DetailsLine>
    </template>
  </DetailsContainer>
</template>

<style module>
.title,
.line-title,
.line-value {
  width: 100%;
}

.title {
  height: 27.19px;
}

.line-title,
.line-value {
  height: 24px;
}
</style>
