<script lang="ts">
  import regions from '$lib/regions';
  import { fly } from 'svelte/transition';
  let {
    name = '',
    value = $bindable(''),
    placeholder,
    disabled = false,
    extraProps = '',
    form = undefined,
    required = false
  }: {
    name?: string;
    value?: string;
    placeholder: string;
    disabled?: boolean;
    extraProps?: string;
    form?: string;
    required?: boolean;
  } = $props();

  let input = $state(value);
  let options: string[] = $derived.by(() => {
    if (input === '') return [];
    return regions.filter((region) => region.toLowerCase().includes(input.toLowerCase()));
  });
  let open = $derived(options.length > 0 && input.length > 0 && input !== value);

  $effect(() => {
    if (input === '') value = '';
  });
</script>

<div class="relative">
  <input
    autocomplete="off"
    {form}
    {placeholder}
    {name}
    {required}
    bind:value={input}
    {disabled}
    class="flex h-9 rounded-md border border-zinc-200 px-4 py-2 text-xs font-medium shadow-sm ring-zinc-50 transition-shadow duration-300 outline-none placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-offset-2 data-[error=true]:ring-2 data-[error=true]:ring-red-600 dark:border-zinc-800 dark:focus-visible:ring-offset-zinc-950 {extraProps}"
  />
  {#if open}
    <div
      in:fly={{ y: -10, duration: 300 }}
      class="absolute bottom-12 z-50 flex max-h-64 w-full flex-col overflow-y-auto rounded-md border border-zinc-200 bg-zinc-50 p-1 shadow dark:border-zinc-800 dark:bg-zinc-950"
    >
      {#if options.length === 0 && open}
        <button
          class="relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-left text-sm outline-none select-none hover:bg-zinc-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-zinc-800"
        >
          No results found
        </button>
      {:else}
        {#each options as option}
          <button
            onclick={() => {
              value = option;
              input = value;
            }}
            class="relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-left text-sm outline-none select-none hover:bg-zinc-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-zinc-800"
          >
            {option}
          </button>
        {/each}
      {/if}
    </div>
  {/if}
</div>
