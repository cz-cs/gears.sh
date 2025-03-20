<script lang="ts">
  import EventCard from '$lib/components/EventCard.svelte';
  import Input from '$lib/components/form/Input.svelte';
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';
  import dayjs from 'dayjs';
  import Picker from './components/Picker.svelte';
  import Autocomplete from '$lib/components/form/Autocomplete.svelte';
  import Primary from '$lib/components/button/Primary.svelte';
  import { page } from '$app/state';
  import Filter from './components/Filter.svelte';
  import Outline from '$lib/components/button/Outline.svelte';

  let { data } = $props();

  let form: HTMLFormElement;

  let program = $state('');
  let level = $state('');
  let season = $state('');
  let region = $state('');
  let from = $state(dayjs().format('YYYY-MM-DD'));
  let to = $state(dayjs().format('YYYY-MM-DD'));

  let availableSeasons: [string, string][] = $derived.by(() => {
    switch (program) {
      case '41':
        return [
          ['24-25: Rapid Relay', '189'],
          ['23-24: Full Volume', '180'],
          ['22-23: Slapshot', '174'],
          ['21-22: Pitching In', '155'],
          ['20-21: Rise Above', '138']
        ];
      case '1':
        return [
          ['24-25: High Stakes', '190'],
          ['23-24: Over Under', '181'],
          ['22-23: Spin Up', '173'],
          ['21-22: Tipping Point', '154'],
          ['20-21: Change Up', '139']
        ];
      case '4':
        return [
          ['24-25: High Stakes', '191'],
          ['23-24: Over Under', '182'],
          ['22-23: Spin Up', '175'],
          ['21-22: Tipping Point', '156'],
          ['20-21: Change Up', '140']
        ];
      case 'ftc':
        return [
          ['24-25: Into the Deep', '191'],
          ['23-24: Centerstage', '192'],
          ['22-23: Powerplay', '193'],
          ['21-22: Freight Frenzy', '194'],
          ['20-21: Ultimate Goal', '195']
        ];
      case 'frc':
        return [
          ['24-25: Reefscape', '196'],
          ['23-24: Crescendo', '197'],
          ['22-23: Charged Up', '198'],
          ['21-22: Rapid React', '199'],
          ['20-21: Infinite Recharge', '200']
        ];
      case 'fll':
        return [
          ['24-25: Submerged', '201'],
          ['23-24: MasterPiece', '202'],
          ['22-23: Superpowered', '203'],
          ['21-22: Cargo Connect', '204'],
          ['20-21: RePLAY', '205']
        ];
      default:
        return [['No Season Available', 'none'] as [string, string]];
    }
  });

  if (page.url.searchParams.size !== 0) {
    program = page.url.searchParams.get('program') || '';
    level = page.url.searchParams.get('level') || '';
    season = page.url.searchParams.get('season') || '';
    region = page.url.searchParams.get('region') || '';
    from = page.url.searchParams.get('from') || dayjs().subtract(1, 'week').format('YYYY-MM-DD');
    to = page.url.searchParams.get('to') || dayjs().format('YYYY-MM-DD');
  }
</script>

<svelte:head>
  <title>Competitions - gears</title>
</svelte:head>
<Container>
  <Title>Competitions</Title>
  <div role="separator" class="my-6 h-px shrink-0 bg-zinc-200 dark:bg-zinc-800"></div>
  <div class="flex flex-col gap-0 md:flex-row md:gap-3">
    <div class="w-full md:min-h-screen md:w-1/4">
      <div class="space-y-3 md:sticky md:top-4">
        <Filter label="Program">
          <Picker
            placeholder="Program"
            bind:value={program}
            options={[
              ['VEX IQ', '41'],
              ['VEX V5', '1'],
              ['VEX U', '4']
            ]}
          />
        </Filter>
        <Filter label="Level class">
          <Picker
            placeholder="Class"
            bind:value={level}
            options={[
              ['All', ''],
              ['Signature', 'Signature'],
              ['National', 'National'],
              ['Regional', 'State'],
              ['World', 'World']
            ]}
          />
        </Filter>
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
        <Filter label="Season">
          <Picker placeholder="Season" bind:value={season} options={availableSeasons} />
        </Filter>
        <Filter label="Region">
          <Autocomplete placeholder="Region..." bind:value={region} extraProps="w-full" />
        </Filter>
        <Primary
          extraProps="w-full"
          onclick={() => {
            form.requestSubmit();
          }}>Filter</Primary
        >
      </div>
    </div>
    <div
      role="separator"
      class="my-6 h-px shrink-0 bg-zinc-200 md:my-0 md:h-0 dark:bg-zinc-800"
    ></div>
    <div class="flex w-full flex-col gap-3">
      {#each data.events as event}
        <EventCard {...event} />
      {/each}
      <p class="text-center text-xs tracking-widest text-zinc-400">nothing else to show</p>
    </div>
  </div>
</Container>
<form bind:this={form} hidden action="?/search" method="GET">
  <input type="hidden" name="program" bind:value={program} />
  <input type="hidden" name="level" bind:value={level} />
  <input type="hidden" name="from" bind:value={from} />
  <input type="hidden" name="to" bind:value={to} />
  <input type="hidden" name="season" bind:value={season} />
  <input type="hidden" name="region" bind:value={region} />
</form>
