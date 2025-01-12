<script>
  import { page } from '$app/state';
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';
</script>

<svelte:head>
  <title>Error - gears</title>
</svelte:head>
<div class="flex h-screen bg-zinc-950 text-zinc-50">
  <div class="mx-5 flex flex-col items-center text-center lg:m-auto lg:w-1/2">
    <Title extraProps="mb-0">{page.status}</Title>
    {#if page.status === 404}
      <p class="text-sm">
        This page doesn't exist. If someone sent you this link, it's probably broken now. We're
        sorry!
      </p>
    {:else if page.status === 500}
      <p class="text-sm">
        Congrats, you've caught an ultra-rare error. Please report this over at our <a
          class="font-medium underline-offset-4 hover:underline"
          href="https://github.com/cz-cs/gears.sh">Github.</a
        >
      </p>
    {/if}
    <div role="separator" class="my-6 h-px w-full shrink-0 bg-zinc-800"></div>
    <a
      class="rounded-md bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-950 shadow-sm transition-colors hover:bg-zinc-200"
      href="/"
    >
      Home
    </a>
  </div>
</div>
