import { derived, writable } from 'svelte/store'

export const example = writable({})
export const example2 = derived(example, ($example) => $example++)
