<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function click() {
    dispatch('click')
  }
</script>

<button
  type="button"
  class="border bg-green-800 text-white font-semibold py-1 px-4 rounded-md"
  on:click={click}
>
  <slot />
</button>
