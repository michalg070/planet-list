/**
 * Formats a given date string into a specific format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} The formatted date string in the format: "YYYY/MM/DD HH:MM:SS".
 */
export const formatDate = (dateString) => {
  if (!dateString) return dateString

  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}
