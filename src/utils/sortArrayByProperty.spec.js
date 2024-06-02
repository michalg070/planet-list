import { expect } from 'vitest'
import { sortArrayByProperty } from './sortArrayByProperty'

const mockedArr = [
  { name: 'Luke Skywalker', height: 172 },
  { name: 'C-3PO', height: 167 },
  { name: 'R2-D2', height: 96 },
  { name: 'Darth Vader', height: 202 }
]

describe('sortArrayByProperty', () => {
  it('should sort an array of objects by a specified property', () => {
    // sort by number
    const sortedArr = sortArrayByProperty(mockedArr, 'height')

    expect(sortedArr).toEqual([
      { name: 'R2-D2', height: 96 },
      { name: 'C-3PO', height: 167 },
      { name: 'Luke Skywalker', height: 172 },
      { name: 'Darth Vader', height: 202 }
    ])

    // sort by string
    const sortedArrName = sortArrayByProperty(mockedArr, 'name')

    expect(sortedArrName).toEqual([
      { name: 'C-3PO', height: 167 },
      { name: 'Darth Vader', height: 202 },
      { name: 'Luke Skywalker', height: 172 },
      { name: 'R2-D2', height: 96 }
    ])
  })

  it('should NOT change the original array when there is no passed property in objects', () => {
    const sortedArr = sortArrayByProperty(mockedArr, 'unknown')

    expect(sortedArr).toEqual(mockedArr)
  })

  it('should return empty array when there is no passed array', () => {
    const sortedArr = sortArrayByProperty(undefined, 'unknown')

    expect(sortedArr).toEqual([])
  })
})
