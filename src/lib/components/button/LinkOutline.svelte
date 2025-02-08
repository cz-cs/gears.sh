<script lang="ts">
  let {
    children,
    disabled = false,
    href,
    extraProps = undefined
  }: { children: any; disabled?: boolean; href: string; extraProps?: string } = $props();
</script>

<a
  data-disabled={disabled}
  {href}
  class="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-zinc-800 bg-transparent px-4 py-2 text-xs font-medium text-zinc-50 shadow-sm ring-zinc-50 transition-all placeholder:text-zinc-400 hover:bg-zinc-900 focus-visible:ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 {extraProps}"
>
  {@render children()}
</a>
