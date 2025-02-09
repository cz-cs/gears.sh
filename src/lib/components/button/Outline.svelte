<script lang="ts">
  let {
    children,
    disabled = false,
    onclick = undefined,
    extraProps = undefined
  }: { children: any; disabled?: boolean; onclick?: any; extraProps?: string } = $props();
</script>

<button
  {disabled}
  {onclick}
  class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-zinc-800 bg-transparent px-4 py-2 text-xs font-medium text-zinc-50 shadow-sm ring-zinc-50 transition-all placeholder:text-zinc-400 hover:bg-zinc-900 focus-visible:ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 {extraProps}"
>
  {@render children()}
</button>
