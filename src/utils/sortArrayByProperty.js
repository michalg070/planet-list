/**
 * Sorts an array of objects by a specified property.
 *
 * @param {Array} arr - The array to be sorted.
 * @param {string} property - The property to sort the array by.
 * @returns {Array} - The sorted array.
 */
export const sortArrayByProperty = (arr = [], property) => {
  if (!arr) return arr

  return [...arr].sort((a, b) => {
    const valA = a[property]
    const valB = b[property]

    if (typeof valA === 'number' && typeof valB === 'number') {
      return valA - valB
    } else if (typeof valA === 'string' && typeof valB === 'string') {
      return valA.localeCompare(valB)
    } else {
      return 0
    }
  })
}
