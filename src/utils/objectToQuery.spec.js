import { objectToQuery } from './objectToQuery'

const mockedObject = {
  name: 'Luke Skywalker',
  height: 172
}

describe('objectToQuery', () => {
  it('on default should return an empty string', () => {
    expect(objectToQuery()).toEqual('')
  })

  it('should convert an object to a query string', () => {
    expect(objectToQuery(mockedObject)).toEqual('?name=Luke+Skywalker&height=172')
  })

  it('should NOT include falsy values in the query string', () => {
    const obj = {
      ...mockedObject,
      empty_property: ''
    }

    expect(objectToQuery(obj)).toEqual('?name=Luke+Skywalker&height=172')
  })
})
