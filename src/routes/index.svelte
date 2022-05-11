<script>
  import { fade } from 'svelte/transition'

  import Footer from '../components/sections/footer_section.svelte'
  import Spinner from '../components/ui/spinner.svelte'

  import { useFetchCache, processing, data, error } from '../data/stores.js'

  let loading = true
  processing.subscribe((value) => {
    loading = value
  })

  let summaryData = useFetchCache()

  const getPopulation = (region) => {
    switch (region) {
      case 'AB':
        return 4507427
      case 'BC':
        return 5297052
      case 'MB':
        return 1391885
      case 'NB':
        return 802460
      case 'NL':
        return 523732
      case 'NS':
        return 1009676
      case 'ON':
        return 15016219
      case 'PE':
        return 168212
      case 'QC':
        return 8657339
      case 'SK':
        return 1185904
      case 'NT':
        return 45839
      case 'NU':
        return 39929
      case 'YT':
        return 42895
      default:
        break
    }
  }
</script>

<svelte:head>
  <title>Roga.dev | Covid Canada</title>
</svelte:head>

<h1 class="text-4xl font-bold text-center my-6">Covid & Province Response</h1>

{#if loading}
  <Spinner />
{:else}
  <div in:fade>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {#each summaryData as region}
        <div>
          <h2 class="text-2xl font-bold">{region.region}</h2>
          <p>Deaths: {Math.round(region.deaths)}</p>
          <p>Population: {getPopulation(region.region)}</p>
        </div>
      {/each}
    </div>
  </div>
{/if}
<Footer />
