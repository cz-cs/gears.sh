<script lang="ts">
  import * as m from '$lib/paraglide/messages';

  import { enhance } from '$app/forms';
  import BlockSpinner from '$lib/components/BlockSpinner.svelte';
  import Button from '$lib/components/button/Primary.svelte';

  import { fly, slide } from 'svelte/transition';
  import Input from '$lib/components/form/Input.svelte';

  import OutlineButton from '$lib/components/button/Outline.svelte';
  import type { ActionData } from './$types';

  let loading = $state(false);

  let page = $state(0);

  let data = $state(['', '', '', '', '', '']);

  let alert = $state(false);
  let privateToggle = $state(true);

  let team = $state(m.same_each_puffin_enchant());
  let program = $state('');

  let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
  <title>Sign up - gears</title>
</svelte:head>
<div class="my-auto w-full px-12 lg:w-1/2">
  {#if page === 0}
    <a
      class="absolute top-4 right-4 inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-900 focus-visible:ring focus-visible:outline-none disabled:pointer-events-none md:top-8 md:right-8"
      href="/signin">{m.caring_few_pony_pop()}</a
    >
    <div>
      <div class="space-y-2 text-center">
        <h1 class="text-2xl font-bold">{m.tired_direct_maggot_sew()}</h1>
        <h2 class="mb-6 text-sm text-zinc-400">
          {m.royal_empty_lizard_jest()}
        </h2>
      </div>
      <div class="space-y-2 *:w-full">
        <!-- ONLY time non atomic css is good -->
        <Input
          disabled={loading}
          placeholder={m.jolly_icy_newt_shine()}
          bind:value={data[2]}
          error={alert}
          type="email"
        />
        <Input
          disabled={loading}
          placeholder={m.lucky_noisy_pony_endure()}
          bind:value={data[3]}
          error={alert}
          type="password"
        />
        <Button
          extraProps="w-full"
          onclick={() => {
            if (data[2] && data[3]) page++;
            alert = true;
            setTimeout(() => (alert = false), 1000);
          }}
        >
          <p>{m.jolly_close_jellyfish_forgive()}</p></Button
        >
      </div>
      {#if false}
        <!-- i'll try to make oauth later, google cloud is stinky -->
        <div transition:slide={{ axis: 'y' }}>
          <div class="my-6 flex items-center gap-2">
            <div class="h-px w-full bg-zinc-800"></div>
            <p class="text-xs text-nowrap text-zinc-400">OR</p>
            <div class="h-px w-full bg-zinc-800"></div>
          </div>
          <div class="flex flex-col space-y-3">
            <Button disabled={loading}>
              <svg
                class="size-4"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                style="display: block;"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              Continue with Google
            </Button>
            <Button disabled={loading}>
              <svg
                class="size-4"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6133 4.77881C11.7923 4.77881 12.0975 4.80729 12.5288 4.86426C12.9601 4.92122 13.4321 5.08398 13.9448 5.35254C14.4657 5.61296 14.9377 6.04834 15.3608 6.65869C15.3364 6.68311 15.2184 6.77262 15.0068 6.92725C14.7952 7.07373 14.5592 7.29346 14.2988 7.58643C14.0384 7.87126 13.8105 8.23747 13.6152 8.68506C13.4199 9.12451 13.3223 9.64941 13.3223 10.2598C13.3223 10.9596 13.4443 11.5537 13.6885 12.042C13.9408 12.5303 14.2297 12.925 14.5552 13.2261C14.8888 13.519 15.1818 13.7347 15.4341 13.873C15.6945 14.0114 15.8328 14.0846 15.8491 14.0928C15.841 14.1253 15.7352 14.4142 15.5317 14.9595C15.3364 15.5047 15.0109 16.111 14.5552 16.7783C14.1564 17.3561 13.7251 17.8892 13.2612 18.3774C12.8055 18.8657 12.2562 19.1099 11.6133 19.1099C11.182 19.1099 10.828 19.0488 10.5513 18.9268C10.2746 18.7965 9.98975 18.6704 9.69678 18.5483C9.40381 18.4181 9.00911 18.353 8.5127 18.353C8.03255 18.353 7.62972 18.4181 7.3042 18.5483C6.98682 18.6785 6.68164 18.8088 6.38867 18.939C6.10384 19.0692 5.76611 19.1343 5.37549 19.1343C4.78141 19.1343 4.26058 18.8983 3.81299 18.4263C3.3654 17.9543 2.9056 17.3887 2.43359 16.7295C1.88835 15.9482 1.42041 14.9961 1.02979 13.873C0.647298 12.7419 0.456055 11.6025 0.456055 10.4551C0.456055 9.22624 0.687988 8.19678 1.15186 7.3667C1.61572 6.52848 2.2098 5.89779 2.93408 5.47461C3.6665 5.04329 4.42334 4.82764 5.20459 4.82764C5.61963 4.82764 6.01025 4.89681 6.37646 5.03516C6.74268 5.16536 7.08447 5.29964 7.40186 5.43799C7.72738 5.57633 8.02035 5.64551 8.28076 5.64551C8.53304 5.64551 8.82601 5.57227 9.15967 5.42578C9.49333 5.2793 9.86768 5.13688 10.2827 4.99854C10.6978 4.85205 11.1413 4.77881 11.6133 4.77881ZM10.9419 3.22852C10.6245 3.611 10.2257 3.93245 9.74561 4.19287C9.26546 4.44515 8.80973 4.57129 8.37842 4.57129C8.2889 4.57129 8.20345 4.56315 8.12207 4.54688C8.11393 4.52246 8.10579 4.4777 8.09766 4.4126C8.08952 4.34749 8.08545 4.27832 8.08545 4.20508C8.08545 3.7168 8.19124 3.24479 8.40283 2.78906C8.61442 2.3252 8.85449 1.94271 9.12305 1.6416C9.46484 1.2347 9.89616 0.896973 10.417 0.628418C10.9378 0.359863 11.4342 0.217448 11.9062 0.201172C11.9307 0.306966 11.9429 0.433105 11.9429 0.57959C11.9429 1.06787 11.8493 1.54395 11.6621 2.00781C11.4749 2.46354 11.2349 2.87044 10.9419 3.22852Z"
                  fill="black"
                />
              </svg>
              Continue with Apple
            </Button>
          </div>
        </div>
      {/if}
    </div>
  {:else if page === 1}
    <div in:fly={{ x: 15 }}>
      <div class="space-y-2 text-center">
        <h1 class="text-2xl font-bold">{m.tangy_swift_thrush_fulfill()}</h1>
        <p class="mb-6 text-sm text-zinc-400">
          {m.known_inner_mule_conquer()}
          {m.super_low_peacock_advise()}
        </p>
      </div>
      <div class="w-full space-y-2 *:w-full">
        <Button
          disabled={loading}
          onclick={() => {
            page++;
          }}
        >
          {m.antsy_sea_meerkat_talk()}
        </Button>
        <Button
          disabled={true}
          onclick={() => {
            page++;
          }}
        >
          {m.bland_each_herring_gleam()}
        </Button>
        <Button
          disabled={true}
          onclick={() => {
            page++;
          }}
        >
          {m.many_tired_marlin_heart()}
        </Button>
      </div>
    </div>
  {:else if page === 2}
    <div in:fly={{ x: 15 }}>
      <h1 class="mb-6 text-center text-2xl font-bold">{m.active_this_gorilla_compose()}</h1>
      <div class="space-y-2 *:w-full">
        <Input bind:value={data[0]} placeholder="@" />
        <Input bind:value={data[1]} placeholder={m.tangy_good_llama_slide()} />
        <Input bind:value={data[5]} placeholder={m.honest_stale_owl_build()} />
      </div>
      <div class="my-6 h-px bg-zinc-800"></div>
      <div
        class="mb-2 flex items-center justify-between gap-4 rounded-md border border-zinc-800 px-4 py-2 text-xs font-medium"
      >
        {m.cuddly_lost_insect_sway()}
        <button
          aria-label="Private account toggle"
          data-checked={privateToggle}
          onclick={() => (privateToggle = !privateToggle)}
          class="inline-flex w-9 cursor-pointer rounded-full border-2 border-transparent bg-zinc-800 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:outline-none data-[checked=true]:bg-zinc-50"
        >
          <div
            data-checked={privateToggle}
            class="pointer-events-none block h-4 w-4 rounded-full bg-zinc-950 ring-0 shadow-lg transition-transform data-[checked=false]:translate-x-0 data-[checked=true]:translate-x-4"
          ></div>
        </button>
      </div>
      <Button extraProps="w-full" onclick={() => page++}>
        <p>{m.curly_blue_raven_pout()}</p></Button
      >
    </div>
  {:else if page === 3}
    {@const special = /[$&+,:;=?@#|'<>.^*()%!-]/}
    <form action="?/team" id="teamform" oninput={(e) => e.currentTarget.requestSubmit()}>
      <input aria-hidden="true" hidden name="team_number" bind:value={data[4]} />
    </form>
    <div in:fly={{ x: 15 }}>
      <div class="mb-6 space-y-2 text-center">
        <h1 class="text-2xl font-bold">{m.mild_wise_badger_embrace()}</h1>
        <p class="text-sm text-zinc-400">{m.happy_best_flamingo_lend()}</p>
      </div>
      <Input
        placeholder={m.fit_dull_frog_treasure()}
        extraProps="uppercase placeholder:normal-case w-full mb-1"
        oninput={async (e) => {
          program = '';
          team = m.few_tasty_antelope_pray();
          let res = await fetch(`/api/team?n=${data[4]}`);
          if (!res.ok) {
            program = 'not found';
            team = m.north_every_gorilla_race();
            return;
          }
          let t = await res.json();
          program = t.program;
          team = `${t.number} - ${t.name}: ${t.members === 0 ? m.awful_deft_panther_startle() : m.north_day_guppy_treasure({ members: t.members })}`;
        }}
        bind:value={data[4]}
      />
      <div
        data-active={team === m.few_tasty_antelope_pray()}
        data-iq={program.includes('IQ')}
        data-v5={program.includes('V5') || program.includes('U') || program === 'not found'}
        class="mb-3 flex gap-3 text-zinc-400 data-[active=true]:animate-pulse data-[iq=true]:text-blue-400 data-[v5=true]:text-red-400"
      >
        <p class="text-xs font-medium">{team}</p>
      </div>
      <Button form="form" extraProps="w-full"
        ><BlockSpinner active={loading} size={4} fill="#09090b" />
        <p>{m.gaudy_tame_moth_embrace()}</p></Button
      >
    </div>
  {/if}
</div>
<form
  id="form"
  method="POST"
  autocomplete="off"
  use:enhance={({}) => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      await update({ invalidateAll: false });
    };
  }}
>
  <input hidden name="username" bind:value={data[0]} />
  <input hidden name="display_name" bind:value={data[1]} />
  <input hidden name="email" bind:value={data[2]} />
  <input hidden name="password" bind:value={data[3]} />
  <input hidden name="team" bind:value={data[4]} />
  <input hidden name="name" bind:value={data[5]} />
  <input hidden name="private" type="checkbox" bind:checked={privateToggle} />
</form>
{#if false}
  <div in:fly={{ x: 15 }}>
    <div class="text-center">
      <h1 class="mb-2 text-2xl font-bold">Would you like to set up 2FA?</h1>
      <p class="text-sm text-zinc-400">This adds more security to your account.</p>
      <p class="mb-3 text-sm text-zinc-400">You'll also need an authenticator app.</p>
    </div>
    <div class="space-y-3">
      <Button
        disabled={loading}
        onclick={() => {
          page++;
        }}
      >
        <p>Yes</p></Button
      >
      <OutlineButton
        onclick={() => {
          page++;
        }}
      >
        <p>No</p></OutlineButton
      >
    </div>
  </div>
{/if}
