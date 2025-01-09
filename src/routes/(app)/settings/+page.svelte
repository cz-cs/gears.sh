<script lang="ts">
  import Button from '$lib/components/button/Primary.svelte';
  import Container from '$lib/components/pages/Container.svelte';
  import Section from '$lib/components/pages/Section.svelte';
  import Title from '$lib/components/pages/Title.svelte';
  import { fly } from 'svelte/transition';
  import Tab from './components/Tab.svelte';
  import LinkOutline from '$lib/components/button/LinkOutline.svelte';
  import { applyAction, enhance } from '$app/forms';
  import BlockSpinner from '$lib/components/BlockSpinner.svelte';
  import AlertTriangle from '$lib/icons/AlertTriangle.svelte';
  import { untrack } from 'svelte';
  import Input from '$lib/components/form/Input.svelte';

  let { data, form } = $props();

  let page = $state(1);

  let submitting = $state(false);

  let username = $state(data.username);
  let displayName = $state(data.display_name);
  let email = $state(data.email);
  let showSignout = $state(false);

  $effect(() => {
    form?.message;
    untrack(() => {
      setTimeout(() => (form = null), 5000);
    });
  });
</script>

{#if showSignout}
  <div
    transition:fly={{ y: 15, duration: 250 }}
    class="no-doc-scroll fixed top-0 right-0 bottom-0 left-0 z-50 flex h-full flex-col bg-zinc-950/70 backdrop-blur-sm"
  >
    <div class="m-auto flex flex-col rounded-md border border-zinc-800 bg-zinc-950 p-4">
      <p class="mb-3 text-lg font-semibold">Are you sure you want to sign out?</p>
      <div class="w-full gap-2 md:flex">
        <LinkOutline href="?/signout">Yes</LinkOutline>
        <Button onclick={() => (showSignout = false)}>No</Button>
      </div>
    </div>
  </div>
{/if}
{#if form?.message}
  {#if form.error}
    <div
      transition:fly={{ x: 30 }}
      class="fixed top-4 right-4 left-4 flex gap-2 rounded-md border border-red-800 bg-red-950/80 px-4 py-2 shadow-sm backdrop-blur-sm md:top-auto md:bottom-4 md:left-auto"
    >
      <AlertTriangle />
      <p class="text-xs font-medium text-red-50">{form.message}</p>
    </div>
  {:else}
    <div
      transition:fly={{ x: 30 }}
      class="absolute right-4 bottom-4 flex gap-2 rounded-md border border-green-800 bg-green-950 px-4 py-2"
    >
      <p class="text-xs font-medium text-green-50">{form.message}</p>
    </div>
  {/if}
{/if}
<Container>
  <Title extraProps="mb-1">Settings</Title>
  <p class="text-zinc-400">
    Manage privacy settings, security preferences, and website preferences.
  </p>
  <div role="separator" class="my-6 h-px shrink-0 bg-zinc-800"></div>
  <div class="flex flex-col gap-4 lg:flex-row">
    <div class="flex gap-2 lg:w-1/5 lg:flex-col">
      <Tab active={page === 1} onclick={() => (page = 1)}>Account</Tab>
      <Tab active={page === 2} onclick={() => (page = 2)}>Privacy & Security</Tab>
      <Tab active={page === 3} onclick={() => (page = 3)}>Theme</Tab>
    </div>
    {#if page === 1}
      <div class="mb-20 w-full space-y-3 lg:mb-0">
        <Section>Account Settings</Section>
        <p class="mb-6 text-sm font-medium text-zinc-400">
          Change your username, display name, set email and more.
        </p>
        <div class="space-y-2">
          <form
            method="post"
            action="?/name"
            id="name"
            use:enhance={({ formData, cancel }) => {
              formData.forEach((x) => {
                if (x.toString().length === 0) {
                  cancel();
                  return;
                }
              });
              submitting = true;
              return async ({ result }) => {
                submitting = false;
                await applyAction(result);
              };
            }}
          >
            <input
              aria-hidden="true"
              autocomplete="off"
              hidden
              name="username"
              bind:value={username}
            />
            <input
              aria-hidden="true"
              autocomplete="off"
              hidden
              name="display_name"
              bind:value={displayName}
            />
          </form>
          <div class="space-y-2">
            <div class="flex flex-col gap-2 text-xs font-medium md:text-sm">
              Username
              <Input disabled={submitting} placeholder="Username..." bind:value={username} />
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex flex-col gap-2 text-xs font-medium md:text-sm">
              Display name
              <Input disabled={submitting} placeholder="Display name..." bind:value={displayName} />
            </div>
          </div>
          <Button disabled={submitting} form="name"
            >Save changes<BlockSpinner active={submitting} fill="09090b" size={16} /></Button
          >
        </div>
        <div role="separator" class="my-3 h-px bg-zinc-800"></div>
        <div class="space-y-2">
          <form
            method="post"
            action="?/email"
            id="email"
            use:enhance={({}) => {
              submitting = true;
              return async ({ result }) => {
                submitting = false;
                await applyAction(result);
              };
            }}
          >
            <input
              aria-hidden="true"
              autocomplete="off"
              type="email"
              hidden
              name="email"
              bind:value={email}
            />
          </form>
          <div class="flex flex-col gap-2 text-xs font-medium md:text-sm">
            Email
            <div class="flex gap-2">
              <Input disabled={submitting} placeholder="Email..." bind:value={email} />
              <Button disabled={submitting} form="email"
                >Update<BlockSpinner active={submitting} fill="09090b" size={16} /></Button
              >
            </div>
          </div>
        </div>
        <div role="separator" class="my-3 h-px bg-zinc-800"></div>
        <p class="text-xs font-medium text-zinc-400">
          More settings coming soon, including changing password. If you forgot your password, email
          me@czcs.xyz
        </p>
        <div role="separator" class="my-3 h-px bg-zinc-800"></div>
        <button
          onclick={() => (showSignout = true)}
          class="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md bg-red-950 px-4 py-2 text-xs font-medium text-red-50 shadow-sm ring-red-50 transition-all hover:bg-red-900 focus-visible:ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          Sign out
        </button>
      </div>
    {:else if page === 2}
      <div class="w-full">
        <Section>Privacy and Security</Section>
        <p class="mb-6 text-sm font-medium text-zinc-400">
          Set who can see your followers, who you follow, and who can see your team.
        </p>
        <div class="space-y-2">
          <div class="flex flex-col gap-2 text-xs font-medium md:text-sm">
            Who can see your followers?
            <div>
              <div
                class="flex h-9 rounded-md border border-zinc-800 bg-transparent px-4 py-2 placeholder:text-zinc-400"
              ></div>
            </div>
          </div>
          <select aria-hidden="true" class="collapse" name="followers-visible"></select>
        </div>
      </div>
    {/if}
  </div>
</Container>
