import { describe, it } from 'vitest'
import UiSelect from './UiSelect.vue'
import { shallowMount } from '@vue/test-utils'

const factory = (options = {}) => {
  return shallowMount(UiSelect, {
    ...options
  })
}

describe('UiSelect', () => {
  describe('label', () => {
    it('on default should NOT render the label', () => {
      const wrapper = factory()

      expect(wrapper.find({ ref: 'labelRef' }).exists()).toBe(false)
    })

    it('should render the label when label slot is present', () => {
      const wrapper = factory({
        slots: {
          label: 'foo'
        }
      })

      expect(wrapper.find({ ref: 'labelRef' }).exists()).toBe(true)
    })
  })
})
