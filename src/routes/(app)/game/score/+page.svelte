<script lang="ts">
  import Primary from '$lib/components/button/Primary.svelte';
  import Secondary from '$lib/components/button/Outline.svelte';
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';
  import Input from '$lib/components/form/Input.svelte';

  let scored = $state(0);
  let cleared = $state(0);

  let total = $derived.by(() => {
    const multipliers: { [key: number]: number } = {
      1: 4,
      2: 8,
      3: 10,
      4: 12
    };

    if (cleared >= 1 && cleared <= 4) {
      return cleared + scored * multipliers[cleared];
    } else {
      return 'invalid';
    }
  });
</script>

<svelte:head>
  <title>Score calculator - gears</title>
</svelte:head>

<Container extraProps="flex flex-col min-h-screen">
  <Title>Score calculator</Title>
  <div class="m-auto lg:w-1/2">
    <div class="rounded-md border border-zinc-200 p-6 shadow dark:border-zinc-800">
      <div class="flex items-center gap-3">
        <Input type="number" bind:value={scored} placeholder="0" />
        <p>balls scored</p>
      </div>
      <div class="flex items-center gap-3">
        <Input extraProps="w-fit" type="number" bind:value={cleared} placeholder="0" />
        <p>switches cleared</p>
      </div>
      <p class="text-center text-5xl font-medium lg:text-7xl">{total}</p>
    </div>
  </div>
</Container>
