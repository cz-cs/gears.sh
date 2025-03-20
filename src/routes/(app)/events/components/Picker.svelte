<script lang="ts">
  import ChevronDown from '$lib/icons/ChevronDown.svelte';
  import { fly, scale } from 'svelte/transition';
  let {
    placeholder,
    options,
    value = $bindable()
  }: {
    placeholder: string;
    options: [string, string][];
    value?: string;
  } = $props();

  function findOption(value: string) {
    return options.find((option) => option[1] === value)!;
  }

  let open = $state(false);
  let display: string = $state(
    value !== undefined && findOption(value) ? findOption(value)[0] : placeholder
  );
</script>

<svelte:window
  onclickcapture={() => {
    if (open) open = false;
  }}
/>
<div class="relative">
  <button
    onclick={() => (open = !open)}
    class="inline-flex h-9 w-full items-center justify-between rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium shadow-sm ring-zinc-50 transition-all duration-300 outline-none placeholder:text-zinc-400 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
  >
    {display}
    <ChevronDown />
  </button>
  {#if open}
    <div
      in:fly={{ y: -10, duration: 300 }}
      class="absolute top-10 z-50 flex w-full flex-col rounded-md border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-950"
    >
      {#each options as option}
        <button
          onclick={() => {
            value = option[1];
            display = option[0];
            open = false;
          }}
          class="relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-left text-sm outline-none select-none hover:bg-zinc-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-zinc-800"
        >
          {option[0]}
        </button>
      {/each}
    </div>
  {/if}
</div>
