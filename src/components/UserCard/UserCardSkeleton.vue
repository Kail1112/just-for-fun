<script setup lang="ts">
import { useCssModule } from 'vue'

import { randomValue } from '@/utils/random-value'

import DetailsSkeleton from '../Details/DetailsSkeleton.vue'
import Skeleton from '../Skeleton.vue'

import UserCardContainer from './UserCardContainer.vue'

const classes = useCssModule()

const maxTitleWidth = randomValue({ base: 200, factor: 50 })
</script>

<template>
  <UserCardContainer>
    <template #title>
      <Skeleton :class="classes.title" :style="{ 'max-width': `${maxTitleWidth}px` }" />
    </template>
    <template #details>
      <DetailsSkeleton />
      <DetailsSkeleton />
      <DetailsSkeleton />
    </template>
  </UserCardContainer>
</template>

<style module>
.title {
  width: 100%;
  height: 35.19px;
}
</style>
