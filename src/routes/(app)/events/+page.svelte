<script>
  import EventCard from '$lib/components/EventCard.svelte';
  import Input from '$lib/components/form/Input.svelte';
  import GradientText from '$lib/components/GradientText.svelte';
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';
  import ChevronDown from '$lib/icons/ChevronDown.svelte';
  import dayjs from 'dayjs';
  let { data } = $props();

  let from = $state(dayjs().format('YYYY-MM-DD'));
  let to = $state(dayjs().format('YYYY-MM-DD'));
</script>

<svelte:head>
  <title>Competitions - gears</title>
</svelte:head>
<Container>
  <Title>Competitions</Title>
  <div role="separator" class="my-6 h-px shrink-0 bg-zinc-800"></div>
  <div class="relative flex flex-col gap-3 md:flex-row">
    <div class="sticky top-0 w-full space-y-3 md:w-1/4">
      <div class="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
        <div class="space-y-2">
          <p class="text-sm font-medium">Level class</p>
          <div class="relative">
            <div
              class="inline-flex h-9 w-full items-center justify-between rounded-md border border-zinc-800 px-4 py-2 text-xs font-medium shadow-sm ring-zinc-50 transition-all duration-300 outline-none placeholder:text-zinc-400 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
            >
              Class...
              <ChevronDown />
            </div>

            <div
              class="absolute top-10 flex w-full flex-col gap-2 rounded-md border border-zinc-800 bg-zinc-50 p-1 dark:bg-zinc-950"
            >
              <button
                class="inline-flex h-9 items-center rounded-sm px-4 py-1.5 text-xs font-medium transition-colors duration-300 hover:cursor-pointer hover:bg-zinc-800"
              >
                Turn this tv off
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
        <div class="space-y-2">
          <p class="text-sm font-medium">From</p>
          <Input extraProps="w-full" type="date" placeholder="" bind:value={from} />
        </div>
        <div role="separator" class="my-3 h-px shrink-0 bg-zinc-200 dark:bg-zinc-800"></div>
        <div class="space-y-2">
          <p class="text-sm font-medium">To</p>
          <Input extraProps="w-full" type="date" placeholder="" bind:value={to} />
        </div>
      </div>
      <div class="space-y-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
        <div class="space-y-2">
          <p class="text-sm font-medium">Region</p>
          <div class="relative">
            <div
              class="inline-flex h-9 w-full items-center justify-between rounded-md border border-zinc-800 px-4 py-2 text-xs font-medium shadow-sm ring-zinc-50 transition-all duration-300 outline-none placeholder:text-zinc-400 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
            >
              Region...
              <ChevronDown />
            </div>

            <div
              class="absolute top-10 flex w-full flex-col gap-2 rounded-md border border-zinc-800 bg-zinc-50 p-1 dark:bg-zinc-950"
            >
              <button
                class="inline-flex h-9 items-center rounded-sm px-4 py-1.5 text-xs font-medium transition-colors duration-300 hover:cursor-pointer hover:bg-zinc-800"
              >
                Turn this tv off
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid w-full grid-cols-1 gap-3">
      {#each data.events as event}
        <EventCard {...event} />
      {/each}
    </div>
  </div>
</Container>
