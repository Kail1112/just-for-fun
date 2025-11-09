<script setup lang="ts">
import { useCssModule } from 'vue'

const classes = useCssModule()
</script>

<template>
  <div :class="classes.container"><slot /></div>
</template>

<style module>
.container {
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-column-gap: var(--xs-gap);
}
</style>
