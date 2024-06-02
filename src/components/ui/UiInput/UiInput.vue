<script setup>
import { computed } from 'vue'
import { RiCloseLine } from '@remixicon/vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: null
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  clearable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const isClearIconVisible = computed(() => props.clearable && props.modelValue)

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const onClear = () => {
  emit('update:modelValue', null)
}
</script>

<template>
  <div class="ui-input">
    <label v-if="$slots.label" class="ui-input__label" ref="labelRef">
      <slot name="label" />
    </label>

    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      v-bind="$attrs"
      class="ui-input__input"
      ref="inputRef"
      @input="onInput"
    />

    <RiCloseLine
      v-if="isClearIconVisible"
      class="ui-input__clear"
      size="18px"
      @click="onClear"
      ref="clearRef"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './UiInput.scss';
</style>
