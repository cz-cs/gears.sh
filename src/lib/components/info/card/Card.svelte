<script lang="ts">
  let {
    children,
    icon,
    heading,
    href = ''
  }: {
    children: any;
    icon: any;
    heading: string;
    href?: string;
  } = $props();
</script>

{#snippet card()}
  <div
    data-clickable={href !== ''}
    class="flex h-full flex-col justify-between space-y-2 rounded-xl border border-zinc-200 p-6 shadow focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent data-[clickable=true]:transition-colors data-[clickable=true]:hover:bg-zinc-100 dark:border-zinc-800 dark:data-[clickable=true]:hover:bg-zinc-900"
  >
    <div class="flex items-center justify-between">
      <p class="text-sm font-medium tracking-tight">{heading}</p>
      <svelte:component this={icon} />
    </div>
    {@render children()}
  </div>
{/snippet}
{#if href}
  <a {href}>
    {@render card()}
  </a>
{:else}
  {@render card()}
{/if}
