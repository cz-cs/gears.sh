<script lang="ts">
  import { enhance } from '$app/forms';
  import BlockSpinner from '$lib/components/BlockSpinner.svelte';
  import Button from '$lib/components/button/Primary.svelte';
  import Input from '$lib/components/form/Input.svelte';
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';
  import { fly } from 'svelte/transition';

  let description = $state('');
  let submitting = $state(false);

  let { form } = $props();
</script>

<svelte:head>
  <title>Bug report - gears</title>
</svelte:head>
{#if form?.message}
  <div
    transition:fly={{ x: 30 }}
    class="absolute right-4 bottom-4 flex gap-2 rounded-md border border-green-800 bg-green-950 px-4 py-2"
  >
    <p class="text-xs font-medium text-green-50">Bug report submitted! Thank you!</p>
  </div>
{/if}
<Container>
  <Title extraProps="mb-2">Bug Report</Title>
  <p class="text-sm text-zinc-400">this is for you ADRIAN</p>
  <div class="my-6"></div>
  <div class="mb-3 space-y-2 *:w-full">
    <p class="text-sm font-medium">Bug description</p>
    <Input
      bind:value={description}
      placeholder="Where did you go? What happened to lead up to the bug? Explain in detail."
    />
  </div>
  <Button form="form" disabled={submitting}
    ><BlockSpinner fill="#000000" active={submitting} size={16} />Submit</Button
  >
</Container>
<form
  id="form"
  autocomplete="off"
  method="POST"
  use:enhance={async () => {
    submitting = true;
    return ({ update }) => {
      submitting = false;
      update({ reset: false });
    };
  }}
>
  <input hidden aria-hidden="true" name="description" bind:value={description} />
</form>
