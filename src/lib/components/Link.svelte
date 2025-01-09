<script lang="ts">
  let {
    href = '',
    children,
    variant = 'hidden',
    onclick = undefined
  }: { children: any; href?: string; variant?: string; onclick?: undefined } = $props();
</script>

{#if variant === 'hidden'}
  <a class="font-medium underline-offset-4 hover:underline" {href}>{@render children()}</a>
{:else if variant === 'primary'}
  {#if onclick != undefined}
    <button
      {onclick}
      class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-950 shadow-sm transition-colors hover:bg-zinc-200 focus-visible:outline-hidden"
    >
      {@render children()}
    </button>
  {:else}
    <a
      {href}
      class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-950 shadow-sm transition-colors hover:bg-zinc-200 focus-visible:outline-hidden disabled:opacity-50"
    >
      {@render children()}
    </a>
  {/if}
{/if}
