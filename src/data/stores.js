import { writable } from 'svelte/store'

export const processing = writable(false)
export const error = writable({})
export const data = writable({})

export const useFetchCache = async () => {
  processing.set(true)
  // Check local storage for cached data
  const storedData = localStorage.getItem('COVID_summary_data')
  if (storedData) {
    let lastUpdate = new Date(localStorage.getItem('COVID_last_update'))
    let now = new Date.now()
    if (getHourDiff(now, lastUpdate) >= 12) {
      // Cached data is good, use stored data
      processing.set(false)
      return data.set(storedData)
    }
  }
  // Fetch new data
  localStorage.clear()
  const freshData = await fetchData()
  processing.set(false)
  return data.set(freshData)
}

const getHourDiff = (dt) => {
  let now = new Date.now()
  let diff = (now - dt) / 1000
  return Math.round(diff / 3600)
}

const fetchData = async () => {
  const response = await fetch('https://api.opencovid.ca/summary')
  let data = await response.json()
  data = data.data // there's a data property which holds our array of region data.
  // Store data in local storage
  localStorage.setItem('COVID_summary_data', JSON.stringify(data))
  localStorage.setItem(
    'COVID_last_update',
    JSON.stringify(new Date.now().toISOString())
  )
  return data
}
