import { formatDate } from './formatDate'

const mockedDateString = '2021-01-01T00:00:00'

describe('formatDate', () => {
  it('should return the same string if no date is provided', () => {
    expect(formatDate()).toBeUndefined()
  })
  it('should return the formatted date string with format YYYY/MM/DD HH:MM:SS', () => {
    expect(formatDate(mockedDateString)).toEqual('2021/01/01 00:00:00')
  })
})
