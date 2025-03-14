<script lang="ts">
  import { cubicIn, expoIn, quartIn } from 'svelte/easing';
  import { prefersReducedMotion } from 'svelte/motion';
  import { fly, scale } from 'svelte/transition';

  let {
    children = 'Hello Rizz',
    extraProps = '',
    active,
    href = '',
    label
  }: {
    children: any;
    extraProps?: string;
    active: boolean;
    href: string;
    label: string;
  } = $props();

  let hover = $state(false);
</script>

<a
  role="tab"
  onmouseenter={() => (hover = true)}
  onmouseleave={() => (hover = false)}
  class="relative self-center rounded-md p-2 hover:bg-zinc-200 data-[active=true]:bg-zinc-200 dark:hover:bg-zinc-800 dark:data-[active=true]:bg-zinc-800"
  data-active={active}
  {href}
>
  {@render children()}
  {#if hover}
    <div
      in:fly={{ x: prefersReducedMotion.current ? 0 : -15, duration: 200 }}
      out:scale={{ start: 0.9, easing: cubicIn, duration: 100 }}
      class="absolute bottom-full mb-3 ml-0 rounded-md border border-zinc-200 bg-zinc-50/80 px-2 py-1 text-sm font-medium whitespace-nowrap backdrop-blur-sm md:bottom-0 md:left-full md:mb-0 md:ml-2 dark:border-zinc-800 dark:bg-zinc-950/80"
    >
      {label}
    </div>
  {/if}
</a>
