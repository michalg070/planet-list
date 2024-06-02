/**
 * Converts an object to a query string.
 *
 * @param {Object} obj - The object to convert.
 * @returns {string} The query string representation of the object.
 */
export const objectToQuery = (obj = {}) => {
  if (!obj) {
    return ''
  }

  const queryParams = new URLSearchParams()

  for (const [key, value] of Object.entries(obj)) {
    if (value || value === 0) {
      queryParams.append(key, value)
    }
  }

  const queryString = queryParams.toString()
  return queryString ? `?${queryString}` : ''
}
