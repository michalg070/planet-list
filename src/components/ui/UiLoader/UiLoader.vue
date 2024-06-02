<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const classes = computed(() => {
  return {
    'ui-loader': true,
    'ui-loader--small': props.size === 'small',
    'ui-loader--medium': props.size === 'medium',
    'ui-loader--large': props.size === 'large'
  }
})
</script>

<template>
  <img :class="classes" src="@/assets/images/loader.png" alt="loader" ref="loaderRef" />
</template>

<style lang="scss" scoped>
@import './UiLoader.scss';
</style>
