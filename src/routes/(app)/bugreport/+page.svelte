<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/button/Primary.svelte';
  import Input from '$lib/components/form/Input.svelte';
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';

  let description = $state('');
  let submitting = $state(false);

  let { form } = $props();
</script>

<Container>
  <Title extraProps="mb-2">Bug Report</Title>
  <p class="text-sm text-zinc-400">this is for you ADRIAN</p>
  <div class="my-6"></div>
  <div class="space-y-2 *:w-full">
    <p class="text-sm font-medium">Bug description</p>
    <Input
      bind:value={description}
      placeholder="Where did you go? What happened to lead up to the bug? Explain in detail."
    />
  </div>
  <Button form="form" disabled={submitting}>Submit</Button>
</Container>
<form
  id="form"
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
