<script lang="ts">
  import { navigating, page } from '$app/state';
  import BlockSpinner from '$lib/components/BlockSpinner.svelte';
  import { fly } from 'svelte/transition';
  import SideNav from './components/SideNav.svelte';
  import X from '$lib/icons/X.svelte';

  import dayjs from 'dayjs';

  import 'dayjs/locale/en';
  import 'dayjs/locale/es';
  import 'dayjs/locale/zh';
  import LocalizedFormat from 'dayjs/plugin/localizedFormat';
  import { languageTag } from '$lib/paraglide/runtime';

  let { children } = $props();

  let worldsDismissed = $state(true);

  dayjs.locale(languageTag());
  dayjs.extend(LocalizedFormat);
</script>

<div class="min-h-screen bg-zinc-50 text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50">
  {#if !worldsDismissed}
    <div
      out:fly={{ y: -50 }}
      class="fixed top-0 right-0 left-0 z-50 mb-2 flex items-center justify-between gap-1 border-b border-blue-950/90 bg-blue-950 px-4 py-2 text-xs font-medium backdrop-blur-sm lg:text-sm"
    >
      <p class="font-semibold">VEX World Championship Finals Watch Party happening now!</p>
      <div class="flex space-x-4 lg:block">
        <a
          class="underline-offset-4 hover:underline"
          href="/worlds"
          onclick={() => (worldsDismissed = true)}>Come join!</a
        >
        <button
          onclick={() => (worldsDismissed = true)}
          class="inline-flex h-8 items-center rounded-md bg-red-900 px-3 text-xs hover:bg-red-900/90"
        >
          <X />
        </button>
      </div>
    </div>
  {/if}
  <div class="flex">
    <SideNav />
    {#if navigating.to}
      <div class="flex min-h-screen w-full">
        <div class="m-auto">
          <BlockSpinner active={true} />
        </div>
      </div>
    {:else}
      {@render children()}
    {/if}
  </div>
</div>
