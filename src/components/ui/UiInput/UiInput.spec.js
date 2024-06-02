import UiInput from './UiInput.vue'
import { shallowMount } from '@vue/test-utils'

const factory = (options = {}) => {
  return shallowMount(UiInput, {
    ...options
  })
}

describe('UiInput', () => {
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

  describe('input', () => {
    it('on default should render the input', () => {
      const wrapper = factory()

      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('should render the input with the correct type', () => {
      const wrapper = factory({
        props: {
          type: 'password'
        }
      })

      expect(wrapper.find({ ref: 'inputRef' }).attributes().type).toBe('password')
    })

    it('should render the input with the correct placeholder', () => {
      const wrapper = factory({
        props: {
          placeholder: 'foo'
        }
      })

      expect(wrapper.find({ ref: 'inputRef' }).attributes().placeholder).toBe('foo')
    })

    it('should emit an update:modelValue event when the input value changes', async () => {
      const wrapper = factory()

      await wrapper.find({ ref: 'inputRef' }).setValue('foo')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['foo'])
    })
  })

  describe('clear', () => {
    it('on default should NOT render the clear button', () => {
      const wrapper = factory()

      expect(wrapper.find({ ref: 'clearRef' }).exists()).toBe(false)
    })

    it('should render the clear button clearable and modelValue props are present', async () => {
      const wrapper = factory()
      expect(wrapper.findComponent({ ref: 'clearRef' }).exists()).toBe(false)

      await wrapper.setProps({ modelValue: 'foo', clearable: true })
      expect(wrapper.findComponent({ ref: 'clearRef' }).exists()).toBe(true)
    })
  })
})
