<script lang="ts">
  let {
    children,
    onclick,
    active,
    disabled = false
  }: { children: any; onclick: any; active: boolean; disabled?: boolean } = $props();
</script>

<button
  {onclick}
  data-active={active}
  {disabled}
  class="h-9 rounded-md bg-transparent px-4 py-2 text-left text-sm font-medium hover:underline enabled:cursor-pointer disabled:no-underline disabled:opacity-50 data-[active=true]:bg-zinc-100 dark:data-[active=true]:bg-zinc-800"
>
  {@render children()}
</button>
