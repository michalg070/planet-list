<script setup>
import UiLoader from '@/components/ui/UiLoader/UiLoader.vue'

defineProps({
  items: {
    type: Array,
    default: null
  },
  columns: {
    type: Array,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="ui-table">
    <div v-if="$slots.header" class="ui-table__header" ref="headerRef">
      <slot name="header" />
    </div>

    <table class="ui-table__table">
      <!-- header -->
      <th v-for="column in columns" :key="column.key" class="ui-table__thead" align="left">
        {{ column.label }}
      </th>

      <tbody class="ui-table__body">
        <!-- loader -->
        <tr v-if="loading" class="ui-table__row ui-table__row--loader" ref="loaderRef">
          <td :colspan="columns?.length">
            <UiLoader size="large" />
            <p>Be patient..</p>
          </td>
        </tr>

        <!-- no data -->
        <tr v-else-if="!items?.length" class="ui-table__row ui-table__row--no-data" ref="noDataRef">
          <td :colspan="columns?.length">Sorry, no data found.</td>
        </tr>

        <!-- content -->
        <tr v-else v-for="item in items" :key="item.name" class="ui-table__row">
          <td v-for="column in columns" :key="column.key">
            <span class="ui-table__row-mobile-title"> {{ column.label }}: </span>

            <template v-if="column.key === 'url'">
              <a :href="item[column.key]" target="_blank">{{ item[column.key] }}</a>
            </template>

            <template v-else>
              {{ item[column.key] || 'N/A' }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- footer -->
    <div v-if="$slots.footer" class="ui-table__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './UiTable.scss';
</style>
