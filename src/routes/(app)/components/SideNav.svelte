<script lang="ts">
  import { page } from '$app/state';
  import * as m from '$lib/paraglide/messages';

  import NavLink from './NavLink.svelte';
  import Link from '$lib/components/Link.svelte';

  import Home from '$lib/icons/Home.svelte';
  import Map from '$lib/icons/Map.svelte';
  import Medal from '$lib/icons/Medal.svelte';
  import MessageCircle from '$lib/icons/MessageCircle.svelte';
  import Megaphone from '$lib/icons/Megaphone.svelte';
  import Bug from '$lib/icons/Bug.svelte';

  import { fly, scale } from 'svelte/transition';
  import { prefersReducedMotion } from 'svelte/motion';
  import ListOrdered from '$lib/icons/ListOrdered.svelte';
  import { cubicIn, quadIn, quintIn } from 'svelte/easing';

  let profile = $state(false);
</script>

<svelte:window
  onclickcapture={() => {
    if (profile == true) profile = false;
  }}
/>
<div
  role="navigation"
  class="fixed right-5 bottom-5 left-5 z-40 flex justify-center gap-2 rounded-full border border-zinc-200 p-2 shadow backdrop-blur-md lg:sticky lg:top-0 lg:right-0 lg:bottom-0 lg:left-0 lg:h-screen lg:w-auto lg:flex-col lg:justify-start lg:rounded-none lg:border-y-0 lg:border-r lg:border-l-0 lg:shadow-none lg:backdrop-blur-none dark:border-zinc-800"
>
  <NavLink label="Home" active={page.route.id! == '/(app)'} href="/">
    <Home />
  </NavLink>
  <NavLink label="Competitions" active={page.route.id!.includes('/events')} href="/competitions">
    <Map />
  </NavLink>
  <NavLink label="Skills rankings" active={false} href="/rankings">
    <ListOrdered />
  </NavLink>
  <NavLink label="Team Chat" active={page.route.id!.includes('/chat')} href="/chat">
    <MessageCircle />
  </NavLink>
  <div class="mt-0 border-l border-zinc-800 lg:mt-auto lg:border-0"></div>
  <NavLink label="Blog" active={false} href="/blog">
    <Megaphone />
  </NavLink>
  <NavLink label="Bug report" active={false} href="/bugreport">
    <Bug />
  </NavLink>
  <button
    onclick={() => (profile = true)}
    data-active={profile}
    class="cursor-pointer self-center rounded-full ring-zinc-50 ring-offset-2 ring-offset-zinc-950 transition-shadow duration-300 data-[active=true]:ring-2 lg:rounded-md"
    aria-label="Profile"
    ><img
      class="h-8 w-8 rounded-full lg:rounded-md"
      src="https://cdn.vectorstock.com/i/500p/52/48/yellow-smile-face-seamless-pattern-funny-melting-vector-45485248.jpg"
      alt=""
    /></button
  >
  {#if profile}
    <div
      class="absolute right-0 bottom-16 w-56 rounded-md border border-zinc-800 bg-zinc-950 p-1 shadow-sm md:right-6 lg:right-0 lg:bottom-12 lg:left-3"
      in:fly={{ y: prefersReducedMotion.current ? 0 : 15, duration: 250 }}
      out:scale={{ start: 0.95, easing: quadIn, duration: 100 }}
    >
      <p class="px-2 py-1.5 text-sm font-semibold">
        {m.even_caring_rook_charm({ user: page.data.name })}
      </p>
      <div aria-orientation="horizontal" class="-mx-1 my-1 h-px bg-zinc-800"></div>
      <div role="group" class="w-full text-sm">
        <a
          class="inline-flex w-full justify-between rounded-xs px-2 py-1.5 opacity-50 transition-colors hover:bg-zinc-800"
          aria-disabled="true">{m.clear_alert_peacock_pave()}</a
        >
        <a
          class="inline-block w-full rounded-xs px-2 py-1.5 transition-colors hover:bg-zinc-800"
          href="/settings">{m.lofty_equal_gopher_bend()}</a
        >
      </div>
      <div aria-orientation="horizontal" class="-mx-1 my-1 h-px bg-zinc-800"></div>
      <div role="group" class="w-full text-sm">
        <a
          class="inline-flex w-full justify-between rounded-xs px-2 py-1.5 transition-colors hover:bg-zinc-800"
          href="/tos">{m.kind_deft_racoon_snip()}</a
        >
        <a
          class="inline-block w-full rounded-xs px-2 py-1.5 transition-colors hover:bg-zinc-800"
          href="/privacy">{m.weak_salty_mammoth_breathe()}</a
        >
      </div>
      <div aria-orientation="horizontal" class="-mx-1 my-1 h-px bg-zinc-800"></div>
      <div role="group" class="w-full text-xs text-zinc-400">
        <p class="inline-block w-full rounded-xs px-2 py-1.5">
          {m.wise_sweet_swan_shine()}
          <Link href="https://github.com/cz-cs/gears.sh">GitHub</Link>
        </p>
        <p class="inline-block w-full rounded-xs px-2 py-1.5">
          {m.close_aloof_cobra_foster()}
        </p>
      </div>
    </div>
  {/if}
</div>
