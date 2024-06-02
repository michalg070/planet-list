import PlanetList from './PlanetList.vue'
import { shallowMount } from '@vue/test-utils'
import { sortOptions } from './PlanetList.config'
import { describe } from 'vitest'

const factory = (options = {}) => {
  return shallowMount(PlanetList, {
    global: {
      stubs: {
        UiTable: false
      }
    },
    ...options
  })
}

describe('PlanetList', () => {
  describe('sorting', () => {
    it('should render sort select', () => {
      const wrapper = factory()

      expect(wrapper.findComponent({ ref: 'sortRef' }).exists()).toBe(true)
    })

    it('should have correct value based on sortBy prop', () => {
      const wrapper = factory({
        props: {
          sortBy: 'name'
        }
      })

      expect(wrapper.findComponent({ ref: 'sortRef' }).vm.$attrs.modelValue).toStrictEqual({
        label: 'Name',
        value: 'name'
      })
    })

    it('should emit update:sortBy event when sort select value changes', async () => {
      const wrapper = factory()

      await wrapper.findComponent({ ref: 'sortRef' }).vm.$emit('update:modelValue', sortOptions[1])

      expect(wrapper.emitted('update:sortBy')).toStrictEqual([['population']])
    })
  })

  describe('searching', () => {
    it('should render search input', () => {
      const wrapper = factory()

      expect(wrapper.findComponent({ ref: 'searchRef' }).exists()).toBe(true)
    })

    it('should have correct value based on search prop', () => {
      const wrapper = factory({
        props: {
          search: 'foo'
        }
      })

      expect(wrapper.findComponent({ ref: 'searchRef' }).props().modelValue).toBe('foo')
    })

    it('should emit update:search event when search input value changes', async () => {
      const wrapper = factory()

      await wrapper.findComponent({ ref: 'searchRef' }).vm.$emit('update:modelValue', 'foo')

      expect(wrapper.emitted('update:search')).toStrictEqual([['foo']])
    })
  })

  describe('pagination', () => {
    it('should render pagination', () => {
      const wrapper = factory()

      expect(wrapper.findComponent({ ref: 'paginationRef' }).exists()).toBe(true)
    })

    it('should have correct value based on page prop', () => {
      const wrapper = factory({
        props: {
          page: 2
        }
      })

      expect(wrapper.findComponent({ ref: 'paginationRef' }).vm.$attrs.modelValue).toBe(2)
    })
  })
})
