<script lang="ts">
  let { children, currentOption }: { children: any; currentOption: string } = $props();
  let checked = $state(false);
</script>

<button
  onclick={() => (checked = true)}
  class="flex w-full justify-between rounded-sm bg-zinc-950 py-1.5 pr-8 pl-2 transition-colors hover:bg-zinc-900"
>
  {@render children()}
</button>
