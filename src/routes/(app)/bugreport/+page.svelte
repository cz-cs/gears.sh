<script lang="ts">
  import Input from '$lib/components/form/Input.svelte';
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';

  let description = $state('');
</script>

<Container>
  <Title extraProps="mb-2">Bug Report</Title>
  <p class="text-sm text-zinc-400">
    Thank you for taking the time to report a bug! Please fill out the form below, and we'll contact
    you when we fix it.
  </p>
  <div class="my-6"></div>
  <div class="space-y-2">
    <p class="text-sm font-medium">Bug description</p>
    <Input
      bind:value={description}
      placeholder="Where did you go? What happened to lead up to the bug? Explain in detail."
    />
  </div>
</Container>
<form id="form" method="POST">
  <input hidden aria-hidden="true" name="description" bind:value={description} />
</form>
