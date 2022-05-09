/**
 * Checks local storage for cached data. If data exists, check the last updated date. If data is older than 12 hours, fetch new data. Otherwise, use cached data.
 */
const useFetchCache = async (loading) => {
  loading = true
  // Check local storage for cached data
  const storedData = localStorage.getItem('COVID_summary_data')
  if (storedData) {
    let lastUpdate = new Date(localStorage.getItem('COVID_last_update'))
    let now = new Date.now()
    if (getHourDiff(now, lastUpdate) >= 12) {
      // Cached data is good, use stored data
      loading = false
      return storedData
    }
  }
  // Fetch new data
  localStorage.clear()
  const freshData = await fetchData()
  loading = false
  return freshData
}

/**
 * Returns the difference in hours between now and the provided date.
 * @param dt dateTime to compare
 */
const getHourDiff = (dt) => {
  let now = new Date.now()
  let diff = (now - dt) / 1000
  return Math.round(diff / 3600)
}

/**
 * Fetch data from the API
 */
const fetchData = async () => {
  const response = await fetch('https://api.opencovid.ca/summary')
  const data = await response.json()
  data = data.data // there's a data property which holds our array of region data.
  // Store data in local storage
  localStorage.setItem('COVID_summary_data', JSON.stringify(data))
  localStorage.setItem(
    'COVID_last_update',
    JSON.stringify(new Date.now().toISOString())
  )
  return data
}

export default useFetchCache
