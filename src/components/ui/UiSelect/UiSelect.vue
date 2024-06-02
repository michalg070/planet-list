<script setup>
import Multiselect from 'vue-multiselect'
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="ui-select">
    <label v-if="$slots.label" class="ui-select__label" ref="labelRef">
      <slot name="label" />
    </label>

    <multiselect v-bind="$attrs" :showLabels="false"></multiselect>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss" scoped>
@import './UiSelect.scss';
</style>
