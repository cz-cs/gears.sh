<script lang="ts">
  import Primary from '$lib/components/button/Primary.svelte';
  import Input from '$lib/components/form/Input.svelte';
  import Noise from '$lib/components/Noise.svelte';
  import Container from '$lib/components/pages/Container.svelte';
  import { fly } from 'svelte/transition';
  import type { ActionData } from './$types';
  import { enhance } from '$app/forms';

  let email = $state('');
  let submitting = $state(false);

  let { form }: { form: ActionData } = $props();
</script>

{#if form !== null}
  <div
    transition:fly={{ x: 30 }}
    class="absolute right-4 bottom-4 flex gap-2 rounded-md border border-green-800 bg-green-950 px-4 py-2"
  >
    <p class="text-xs font-medium text-green-50">
      You are now signed up as an alpha tester! We'll shoot you an email when we're ready. Until
      then, cheers!
    </p>
  </div>
{/if}
<svelte:head>
  <title>gears</title>
</svelte:head>
<Noise patternAlpha={5}></Noise>
<div class="text-zinc-50 select-none">
  <div class="flex h-screen flex-col">
    <div class="z-50 m-auto space-y-6 text-center">
      <p class="font-display mb-9 text-8xl font-medium md:text-9xl">gears</p>
      <p>The only website and app you'll ever need for everything robotics.</p>
      <p class="md:text-md text-sm text-zinc-400">
        Launching at the beginning of the VRC 2025-2026 season
      </p>
      <div class="flex w-full gap-3">
        <Input form="form" extraProps="w-full" bind:value={email} placeholder="Email..." />
        <Primary disabled={submitting} form="form">Register</Primary>
      </div>
      <p class="text-xs text-zinc-400">A creation by the coders of 11393C</p>
    </div>
  </div>
</div>
<form
  use:enhance={() => {
    submitting = true;
    return async ({ update }) => {
      submitting = false;
      await update();
    };
  }}
  id="form"
  hidden
  method="POST"
>
  <input name="email" bind:value={email} />
</form>
