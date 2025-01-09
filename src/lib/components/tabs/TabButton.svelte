<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';

  let {
    active,
    onclick,
    disabled = undefined,
    children
  }: {
    active: boolean;
    onclick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    children: any;
  } = $props();
</script>

<button
  data-active={active}
  {disabled}
  {onclick}
  class="inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none data-[active=true]:bg-zinc-950 data-[active=true]:text-zinc-50"
>
  {@render children()}
</button>
