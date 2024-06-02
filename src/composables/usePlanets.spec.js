import { beforeEach, expect, it, vi } from 'vitest'
import { usePlanets } from './usePlanets'
import { formatDate } from '@/utils/formatDate'

const mockedRawPlanets = [
  {
    name: 'Tatooine',
    created: '2021-05-03T00:00:00'
  },
  {
    name: 'Alderaan',
    created: '2021-05-03T04:00:00'
  }
]

const httpGetMock = {
  get: vi.fn().mockResolvedValue({ data: { results: mockedRawPlanets, count: 40 } })
}

vi.mock('@/composables/useHttp', () => ({
  useHttp: () => ({
    http: httpGetMock
  })
}))

describe('usePlanets', () => {
  const getSpy = vi.spyOn(httpGetMock, 'get')

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('should be a function', () => {
    expect(typeof usePlanets).toBe('function')
  })

  it('should return an object', () => {
    expect(typeof usePlanets()).toBe('object')
  })

  it('should return the correct object shape', () => {
    const data = usePlanets()

    expect(data).toHaveProperty('fetchPlanets')
    expect(data).toHaveProperty('getPlanets')
    expect(data).toHaveProperty('search')
    expect(data).toHaveProperty('page')
    expect(data).toHaveProperty('pageCount')
    expect(data).toHaveProperty('sortBy')
  })

  describe('fetchPlanets', () => {
    it('should call the http.get method with correct query', async () => {
      const { page, search, fetchPlanets } = usePlanets()

      await fetchPlanets()
      expect(getSpy).toHaveBeenCalledTimes(1)
      expect(getSpy).toHaveBeenCalledWith('/planets?page=1')

      search.value = 'Tatooine'
      await fetchPlanets()

      expect(getSpy).toHaveBeenCalledTimes(2)
      expect(getSpy).toHaveBeenCalledWith('/planets?page=1&search=Tatooine')

      page.value = 4
      await fetchPlanets()

      expect(getSpy).toHaveBeenCalledTimes(3)
      expect(getSpy).toHaveBeenCalledWith('/planets?page=4&search=Tatooine')
    })

    it('should set the planets and pageCount', async () => {
      const { fetchPlanets, getPlanets, pageCount } = usePlanets()

      await fetchPlanets()

      expect(getPlanets.value).toHaveLength(2)
      expect(pageCount.value).toBe(4)
    })
  })

  describe('getPlanets', () => {
    const mockedFormattedPlanets = mockedRawPlanets.map((planet) => {
      return {
        ...planet,
        created: formatDate(planet.created)
      }
    })

    it('should return the formatted planets array', async () => {
      const { getPlanets, fetchPlanets } = usePlanets()

      await fetchPlanets()

      expect(getPlanets.value).toEqual(mockedFormattedPlanets)
    })

    it('should sort the planets array by the sortBy value', async () => {
      const { getPlanets, fetchPlanets, sortBy } = usePlanets()

      await fetchPlanets()

      sortBy.value = 'created'
      expect(getPlanets.value).toEqual(mockedFormattedPlanets)

      sortBy.value = 'name'
      expect(getPlanets.value).toEqual(mockedFormattedPlanets.reverse())
    })
  })
})
