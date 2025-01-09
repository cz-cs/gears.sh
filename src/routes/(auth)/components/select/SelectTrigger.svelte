<script lang="ts">
  import ChevronDown from '$lib/icons/ChevronDown.svelte';
  let {
    children,
    open = $bindable(),
    option
  }: { children: any; open: boolean; option: string } = $props();
</script>

<button
  onclick={() => (open = !open)}
  class="mb-3 flex w-full cursor-pointer justify-between rounded-md border border-zinc-800 px-4 py-2 text-xs font-medium"
>
  {#if option !== ''}
    {option}
  {:else}
    {@render children()}
  {/if}
  <ChevronDown />
</button>
