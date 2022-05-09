<script>
  import { fade } from 'svelte/transition'

  import Footer from '../components/sections/footer_section.svelte'
  import Spinner from '../components/ui/spinner.svelte'

  let loading = false
</script>

<svelte:head>
  <title>Roga Weather</title>
</svelte:head>

<h1 class="text-4xl font-bold text-center my-6">Roga Weather</h1>

{#if loading}
  <Spinner />
{:else}
  <div in:fade>
    <Footer />
  </div>
{/if}
