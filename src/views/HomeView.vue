<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePlanets } from '@/composables/usePlanets'
import PlanetList from '@/components/PlanetList/PlanetList.vue'

const router = useRouter()
const route = useRoute()
const { fetchPlanets, getPlanets, search, page, pageCount, sortBy } = usePlanets(route.query)
const loading = ref(false)

const handleFetchPlanets = async () => {
  loading.value = true

  return fetchPlanets().finally(() => {
    loading.value = false
  })
}

const updateRouteQuery = () => {
  router.push({
    query: {
      search: search.value || undefined,
      page: page.value || undefined
    }
  })
}

// SEARCH
const debounce = ref(null)
const onSearch = () => {
  clearTimeout(debounce.value)

  debounce.value = setTimeout(async () => {
    page.value = 1
    await handleFetchPlanets()
    updateRouteQuery()
  }, 300)
}

// PAGE CHANGE
const onPageChange = async () => {
  await handleFetchPlanets()
  updateRouteQuery()
}

// INIT FETCH
await handleFetchPlanets()
</script>

<template>
  <main class="home container">
    <img class="home__logo" src="@/assets/images/logo.png" alt="Star Wars logo" />

    <PlanetList
      :planets="getPlanets"
      :page-count="pageCount"
      :loading="loading"
      v-model:search="search"
      v-model:page="page"
      v-model:sortBy="sortBy"
      @update:search="onSearch"
      @update:page="onPageChange"
    />
  </main>
</template>

<style lang="scss" scoped>
.home {
  &__logo {
    display: block;
    width: rem(150px);
    margin: 0 auto;
  }

  @include tablet {
    &__logo {
      width: rem(250px);
    }
  }
}
</style>
