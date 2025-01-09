<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import { fly } from 'svelte/transition';

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
  onfocus={() => (hover = true)}
  onblur={() => (hover = false)}
  onmouseenter={() => (hover = true)}
  onmouseleave={() => (hover = false)}
  class="relative self-center rounded-md p-2 hover:bg-zinc-800 data-[active=true]:bg-zinc-800"
  data-active={active}
  {href}
>
  {@render children()}
  {#if hover}
    <div
      transition:fly={{ x: prefersReducedMotion.current ? 0 : -15, duration: 200 }}
      class="absolute bottom-full mb-3 ml-0 rounded-md border border-zinc-800 bg-zinc-950/80 px-2 py-1 text-sm font-medium whitespace-nowrap text-zinc-50 backdrop-blur-sm md:bottom-0 md:left-full md:mb-0 md:ml-2"
    >
      {label}
    </div>
  {/if}
</a>
