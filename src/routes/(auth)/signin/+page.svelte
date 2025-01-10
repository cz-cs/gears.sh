<script lang="ts">
  import * as m from '$lib/paraglide/messages';

  import { enhance } from '$app/forms';
  import BlockSpinner from '$lib/components/BlockSpinner.svelte';
  import Button from '$lib/components/button/Primary.svelte';
  import AlertTriangle from '$lib/icons/AlertTriangle.svelte';
  import { cubicIn, cubicOut } from 'svelte/easing';

  import { fly } from 'svelte/transition';
  import type { ActionData } from './$types';
  import Input from '../components/Input.svelte';
  let loading = $state(false);
  let { form }: { form: ActionData } = $props();
</script>

{#if form?.message}
  <div
    class="fixed top-6 left-4 inline-flex h-9 items-center justify-between gap-2 rounded-md border border-yellow-900 bg-yellow-950/80 px-4 py-2 text-sm font-medium text-yellow-50 shadow-sm backdrop-blur-sm md:top-auto md:right-4 md:bottom-4 md:left-auto"
    in:fly={{ x: 30, easing: cubicOut }}
    out:fly={{ y: 30, easing: cubicIn }}
  >
    <AlertTriangle fill="yellow-50" />
    <p>{form.message}</p>
  </div>
{/if}
<svelte:head>
  <title>{m.caring_few_pony_pop()} - gears</title>
</svelte:head>
<a
  class="absolute top-4 right-4 inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-900 focus-visible:ring focus-visible:outline-none disabled:pointer-events-none md:top-8 md:right-8"
  href="/signup">{m.game_loose_bee_create()}</a
>
<div class="my-auto w-full px-12 lg:w-1/2">
  <div class="text-center">
    <h1 class="mb-6 text-2xl font-bold">{m.caring_few_pony_pop()}</h1>
  </div>
  <form
    method="POST"
    use:enhance={({}) => {
      loading = true;
      return async ({ update }) => {
        loading = false;
        await update({ invalidateAll: false });
      };
    }}
  >
    <Input name="email" type="email" placeholder={m.jolly_icy_newt_shine()} />
    <Input name="password" type="password" placeholder={m.lucky_noisy_pony_endure()} />
    <Button disabled={loading} extraProps="w-full justify-center"
      ><BlockSpinner active={loading} size={4} fill="#09090b" />
      <p data-loading={loading} class="visible data-[loading=true]:hidden">
        {m.jolly_close_jellyfish_forgive()}
      </p></Button
    >
  </form>
</div>
