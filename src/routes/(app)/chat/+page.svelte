<script lang="ts">
  import { enhance } from '$app/forms';
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';
  import Send from '$lib/icons/Send.svelte';
  import dayjs from 'dayjs';
  import type { ActionData, PageData } from './$types';
  import type { Message } from './components/Message';
  import MessageBubble from './components/MessageBubble.svelte';
  import { Client, Databases } from 'appwrite';
  import { PUBLIC_APPWRITE_PROJECT, PUBLIC_DATABASE } from '$env/static/public';
  import type { Models } from 'node-appwrite';
  import Button from '$lib/components/button/Primary.svelte';
  import Pencil from '$lib/icons/Pencil.svelte';
  import { fly, scale } from 'svelte/transition';
  import { quadIn, quintIn, quintOut } from 'svelte/easing';
  import ImagePlus from '$lib/icons/ImagePlus.svelte';
  import Outline from '$lib/components/button/Outline.svelte';
  import X from '$lib/icons/X.svelte';
  import Input from '$lib/components/form/Input.svelte';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let message = $state('');
  let inputFocus = $state(false);

  let edit = $state(false);

  let messages: Message[] = $derived(form?.messages ?? data.messages);

  let client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PUBLIC_APPWRITE_PROJECT)
    .setSession(data.session!);
  let databases = new Databases(client);

  $inspect(inputFocus);
</script>

<svelte:head>
  <title>{data.name} - gears</title>
</svelte:head>
<form
  id="send"
  use:enhance={({ formData, controller }) => {
    let msg = {
      username: `${data.username}`,
      content: `${formData.get('content')}`,
      time: dayjs().toISOString(),
      sending: true
    };
    messages.push(msg);

    return async ({ update }) => {
      await update({ reset: true, invalidateAll: false });
    };
  }}
  method="post"
  action="?/send"
>
  <input aria-hidden="true" hidden bind:value={message} autocomplete="off" name="content" />
</form>
{#if edit}
  <div
    role="complementary"
    in:fly={{ duration: 250, y: 15 }}
    out:scale={{ start: 0.95, easing: quadIn, duration: 100 }}
    onclick={() => (edit = false)}
    class="absolute top-0 right-0 bottom-0 left-0 z-50 flex flex-col bg-zinc-950/30 backdrop-blur-sm"
  >
    <div
      role="alertdialog"
      onclick={(e) => {
        e.stopPropagation();
      }}
      class="m-auto rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div class="mb-3 flex items-center justify-between gap-3">
        <Title>{data.name} settings</Title>
        <Outline onclick={() => (edit = false)}><X /></Outline>
      </div>
      <Input extraProps="w-full" placeholder="Room name..." name="chat_name" />
    </div>
  </div>
{/if}
<Container extraProps="relative">
  <div
    class="absolute top-0 right-0 left-0 flex border-b border-red-800 bg-red-800/60 p-2 text-xs font-medium backdrop-blur-sm"
  >
    <p>NOTICE: The chat page is unstable at the moment.</p>
  </div>
  <div class="flex items-center gap-3">
    <Title>{data.name}</Title>
    <Button onclick={() => (edit = !edit)}><Pencil fill="zinc-950" /> Edit</Button>
  </div>
  <div role="separator" class="my-6 h-px bg-zinc-200 dark:bg-zinc-800"></div>
  <div class="flex h-96 flex-col">
    <div class="grow space-y-2">
      {#key messages}
        {#each messages as message}
          <MessageBubble {...message} />
        {/each}
      {/key}
    </div>
    <!-- absolutely nasty disgusting absolute positioning hack bc i couldnt get input to the bottom without it overflowing for some reason -->
    <div
      data-focus={inputFocus}
      class="absolute right-4 bottom-4 left-4 inline-flex gap-2 rounded-full border border-zinc-200 bg-zinc-50 p-2 text-sm ring-zinc-950 ring-offset-2 ring-offset-zinc-50 transition-shadow duration-300 outline-none placeholder:font-medium data-[focus=true]:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-zinc-50 dark:ring-offset-zinc-950"
    >
      <button
        disabled
        class="inline-flex cursor-pointer items-center justify-center rounded-full bg-zinc-950 p-2 opacity-100 transition-all not-disabled:hover:bg-zinc-200 disabled:cursor-auto disabled:opacity-50 dark:bg-zinc-50"
      >
        <ImagePlus fill="zinc-950" />
      </button>
      <input
        onfocus={() => (inputFocus = true)}
        onblur={() => (inputFocus = false)}
        class="ml-2 grow outline-none"
        autocomplete="off"
        form="send"
        bind:value={message}
        placeholder="Harrass your teammates..."
      />
      <button
        disabled={message.length === 0}
        form="send"
        type="submit"
        class="inline-flex cursor-pointer items-center justify-center rounded-full bg-zinc-950 p-2 opacity-100 ring-zinc-950 transition-all outline-none not-disabled:hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 disabled:cursor-auto disabled:opacity-50 dark:bg-zinc-50 dark:ring-zinc-50 dark:focus-visible:ring-offset-zinc-950"
      >
        <Send fill="zinc-950" />
      </button>
    </div>
  </div>
</Container>
