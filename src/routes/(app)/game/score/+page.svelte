<script lang="ts">
  import Primary from '$lib/components/button/Primary.svelte';
  import Secondary from '$lib/components/button/Outline.svelte';
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';
  import Input from '$lib/components/form/Input.svelte';

  let total = $state(0);

  let scored = $state('');
</script>

<svelte:head>
  <title>Score calculator - gears</title>
</svelte:head>

<Container extraProps="flex flex-col min-h-screen">
  <Title>Score calculator</Title>
  <div class="m-auto lg:w-1/2">
    <div class="rounded-md border border-zinc-200 p-6 shadow dark:border-zinc-800">
      <div class="flex items-center gap-3">
        <Input bind:value={scored} placeholder="0" />
        <p>balls scored</p>
      </div>
      <div class="flex items-center gap-3">
        <Input bind:value={scored} placeholder="0" />
        <p>switches cleared</p>
      </div>
      <p class="text-center text-5xl font-medium lg:text-7xl">{total}</p>
    </div>
  </div>
</Container>
