import { describe, it } from 'vitest'
import UiTable from './UiTable.vue'
import { shallowMount } from '@vue/test-utils'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'foo', label: 'Foo' },
  { key: 'bar', label: 'Bar' }
]

const items = [{ name: 'John Doe', foo: 'Foo', bar: 'Bar' }]

const props = {
  columns,
  items
}

const factory = (options = {}) => {
  return shallowMount(UiTable, {
    ...options
  })
}

describe('UiTable', () => {
  describe('header', () => {
    it('on default should NOT render the header slot', () => {
      const wrapper = factory()

      expect(wrapper.find({ ref: 'headerRef' }).exists()).toBe(false)
    })

    it('should render the header slot', () => {
      const wrapper = factory({
        slots: {
          header: 'foo'
        }
      })

      expect(wrapper.find({ ref: 'headerRef' }).exists()).toBe(true)
    })
  })

  describe('columns', () => {
    it('on default should NOT render the columns', () => {
      const wrapper = factory()

      expect(wrapper.find('th').exists()).toBe(false)
    })

    it('should render the columns based on the columns prop', () => {
      const wrapper = factory({ props })

      expect(wrapper.find('th').exists()).toBe(true)
      expect(wrapper.findAll('th').length).toBe(columns.length)
    })
  })

  describe('loader', () => {
    it('on default should NOT render the loader', () => {
      const wrapper = factory()

      expect(wrapper.find({ ref: 'loaderRef' }).exists()).toBe(false)
    })

    it('should render the loader based on the loading prop', () => {
      const wrapper = factory({ props: { loading: true } })

      expect(wrapper.find({ ref: 'loaderRef' }).exists()).toBe(true)
    })
  })

  describe('no data', () => {
    it('on default should render no data row', () => {
      const wrapper = factory()

      expect(wrapper.find({ ref: 'noDataRef' }).exists()).toBe(true)
    })

    it('should NOT render no data row when items are present', () => {
      const wrapper = factory({ props })

      expect(wrapper.find({ ref: 'noDataRef' }).exists()).toBe(false)
    })
  })

  describe('items', () => {
    it('should render the items based on the items prop', () => {
      const wrapper = factory({ props })

      expect(wrapper.findAll('tr').length).toBe(items.length)
    })
  })
})
