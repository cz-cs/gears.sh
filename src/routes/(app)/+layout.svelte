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

  dayjs.locale(languageTag());
  dayjs.extend(LocalizedFormat);
</script>

<div class="min-h-full bg-zinc-50 text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-950">
  <div class="flex">
    <SideNav />
    {#if navigating.to}
      <div class="flex min-h-screen w-full">
        <div class="m-auto">
          <BlockSpinner size={8} active={true} />
        </div>
      </div>
    {:else}
      {@render children()}
    {/if}
  </div>
</div>
