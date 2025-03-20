<script lang="ts">
  let {
    children,
    disabled = false,
    onclick = undefined,
    form = undefined,
    extraProps = undefined
  }: {
    children: any;
    disabled?: boolean;
    onclick?: any;
    form?: string;
    extraProps?: string;
  } = $props();
</script>

<button
  {disabled}
  {onclick}
  {form}
  class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-950 shadow ring-zinc-50 transition-all placeholder:text-zinc-400 hover:bg-zinc-100 focus-visible:ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 {extraProps}"
>
  {@render children()}
</button>
