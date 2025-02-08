<script lang="ts">
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';

  let { children, open }: { children: any; open: boolean } = $props();
</script>

{#if open}
  <div
    transition:fly={{ y: -15, duration: 250 }}
    class="absolute top-9 rounded-md border border-zinc-800 bg-zinc-950 p-1 text-xs"
  >
    {@render children()}
  </div>
{/if}
