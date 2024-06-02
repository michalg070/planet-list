import { ref, computed } from 'vue'
import { useHttp } from '@/composables/useHttp'
import { objectToQuery } from '@/utils/objectToQuery'
import { sortArrayByProperty } from '@/utils/sortArrayByProperty'
import { formatDate } from '@/utils/formatDate'

export function usePlanets(initialParams = {}) {
  const { http } = useHttp()

  const planets = ref([])
  const page = ref(+initialParams.page || 1)
  const search = ref(initialParams.search || null)
  const pageCount = ref(null)
  const sortBy = ref(null)
  const itemsPerPage = 10

  const query = computed(() => {
    return objectToQuery({ page: page.value, search: search.value })
  })

  const getPlanets = computed(() => {
    const formattedPlanets = planets.value.map((planet) => {
      return {
        ...planet,
        created: formatDate(planet.created)
      }
    })

    return sortBy.value ? sortArrayByProperty(formattedPlanets, sortBy?.value) : formattedPlanets
  })

  const setPlanets = (data) => {
    planets.value = data || []
  }

  const setPageCount = (data) => {
    pageCount.value = data ? Math.ceil(data / itemsPerPage) : null
  }

  const fetchPlanets = async () => {
    const response = await http.get(`/planets${query.value}`)

    setPlanets(response?.data?.results)
    setPageCount(response?.data?.count)

    return response
  }

  return {
    fetchPlanets,
    getPlanets,
    search,
    page,
    pageCount,
    sortBy
  }
}
