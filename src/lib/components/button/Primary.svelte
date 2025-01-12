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
  class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-xs font-medium text-zinc-50 shadow-sm transition-all placeholder:text-zinc-400 hover:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100 dark:focus-visible:ring-zinc-50 {extraProps}"
>
  {@render children()}
</button>
