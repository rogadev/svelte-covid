import { get } from 'svelte/store'
import { error, data, cache, lastUpdated } from '../data/stores'

const URI = 'https://weatherdbi.herokuapp.com/data/weather/'

const sanitize = (location) => {
  console.log('Sanitizing', location)
  return location.toLowerCase().replace(/\s/g, '+')
}

const generateCacheIndex = (location) => {
  const dateIndex = get(lastUpdated)
  return location + ' @ ' + dateIndex
}

const tryFetch = async (location) => {
  try {
    console.log('Trying fetch')
    const response = await fetch(URI + sanitize(location))
    const d = await response.json()
    data.set(d)
  } catch (e) {
    console.error('Fetch error:', e)
    error.set(e)
  } finally {
    if (data !== {}) {
      console.log('Fetch success')
      console.log('Cached new data')
      const cacheIndex = generateCacheIndex(location)
      cache.update((c) => (c = [...c, { key: cacheIndex, value: get(data) }]))
      console.log('Cache now has', get(cache).length, 'items')
    }
  }
}

const tryCache = async (location) => {
  const cacheIndex = generateCacheIndex(location)
  const cacheHit = get(cache).find((c) => c.key === cacheIndex)
  if (cacheHit) {
    console.log('Cache hit')
    console.log('->', cacheHit.key)
    data.set(cacheHit.value)
  } else {
    console.log('Cache miss')
    await tryFetch(location)
  }
}

const fetchWeather = async (location = 'Courtenay, BC') => {
  if (lastUpdated === null) {
    await tryFetch(location)
  } else {
    await tryCache(location, lastUpdated)
  }
}

export default fetchWeather
