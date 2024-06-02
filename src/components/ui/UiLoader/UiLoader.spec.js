import UiLoader from './UiLoader.vue'
import { shallowMount } from '@vue/test-utils'

const factory = (options = {}) => {
  return shallowMount(UiLoader, {
    ...options
  })
}

describe('UiLoader', () => {
  describe('size', () => {
    it('on default should render the default size', () => {
      const wrapper = factory()

      expect(wrapper.find({ ref: 'loaderRef' }).classes()).toContain('ui-loader--medium')
    })

    it('should render the loader with the size passed', () => {
      const wrapper = factory({
        props: {
          size: 'large'
        }
      })

      expect(wrapper.find({ ref: 'loaderRef' }).classes()).toContain('ui-loader--large')
    })
  })
})
