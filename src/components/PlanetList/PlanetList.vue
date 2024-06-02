<script setup>
import { computed } from 'vue'
import UiTable from '@/components/ui/UiTable/UiTable.vue'
import UiPagination from '@/components/ui/UiPagination/UiPagination.vue'
import UiInput from '@/components/ui/UiInput/UiInput.vue'
import UiSelect from '@/components/ui/UiSelect/UiSelect.vue'
import { sortOptions, columns } from './PlanetList.config'

const props = defineProps({
  planets: {
    type: Array,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  search: {
    type: String,
    default: null
  },
  page: {
    type: [Number, String],
    default: null
  },
  sortBy: {
    type: String,
    default: null
  },
  pageCount: {
    type: [Number, String],
    default: null
  }
})

const emit = defineEmits(['update:search', 'update:page', 'update:sortBy'])

const onSearchChange = (search) => {
  emit('update:search', search)
}

const onPageChange = (page) => {
  emit('update:page', page)
}

const onSortChange = (sortBy) => {
  emit('update:sortBy', sortBy?.value ?? null)
}

const currentSort = computed(() => {
  return sortOptions.find((option) => option.value === props?.sortBy) ?? null
})
</script>

<template>
  <UiTable class="planet-list" :items="planets" :columns="columns" :loading="loading">
    <template #header>
      <h2>Planet List</h2>

      <div class="planet-list__utils">
        <UiSelect
          :options="sortOptions"
          :modelValue="currentSort"
          :searchable="false"
          track-by="value"
          label="label"
          @update:modelValue="onSortChange"
          ref="sortRef"
        >
          <template #label> Sort by: </template>
        </UiSelect>

        <UiInput
          :modelValue="search"
          clearable
          @update:modelValue="onSearchChange"
          placeholder="Search..."
          ref="searchRef"
        >
          <template #label>Search name:</template>
        </UiInput>
      </div>
    </template>

    <template #footer>
      <UiPagination
        :modelValue="page"
        :pageCount="pageCount"
        :click-handler="onPageChange"
        active-class="active"
        ref="paginationRef"
      />
    </template>
  </UiTable>
</template>

<style lang="scss" scoped>
@import './PlanetList.scss';
</style>
