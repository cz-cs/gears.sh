<script lang="ts">
  let {
    children,
    disabled = false,
    href
  }: { children: any; disabled?: boolean; href: string } = $props();
</script>

<a
  data-disabled={disabled}
  {href}
  class="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-zinc-800 bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-950 shadow-sm ring-zinc-50 transition-all placeholder:text-zinc-400 hover:bg-zinc-300 focus-visible:ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
>
  {@render children()}
</a>
