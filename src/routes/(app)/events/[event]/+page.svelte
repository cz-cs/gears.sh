<script lang="ts">
  import * as m from '$lib/paraglide/messages';

  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';
  import PageSkeleton from './components/PageSkeleton.svelte';

  import Card from '$lib/components/info/card/Card.svelte';
  import Content from '$lib/components/info/card/Content.svelte';
  import Subtitle from '$lib/components/info/card/Subtitle.svelte';
  import Section from '$lib/components/pages/Section.svelte';
  import MapPin from '$lib/icons/MapPin.svelte';
  import ListOrdered from '$lib/icons/ListOrdered.svelte';
  import Bug from '$lib/icons/Bug.svelte';

  import dayjs from 'dayjs';
  import CalendarDays from '$lib/icons/CalendarDays.svelte';

  import relativeTime from 'dayjs/plugin/relativeTime';
  import Row from '$lib/components/info/table/Row.svelte';
  import Head from '$lib/components/info/table/Head.svelte';
  import { isActionFailure } from '@sveltejs/kit';

  let { data } = $props();

  let teamState = $state(1);

  dayjs.extend(relativeTime);
</script>

<svelte:head>
  <title>Event details - gears</title>
</svelte:head>
{#await data.event}
  <PageSkeleton />
{:then event}
  {@const now = dayjs()}
  {@const start = dayjs(event.start)
    .hour(now.hour())
    .minute(now.minute())
    .second(now.second())
    .millisecond(now.millisecond())}
  {@const end = dayjs(event.end)
    .hour(now.hour())
    .minute(now.minute())
    .second(now.second())
    .millisecond(now.millisecond())}
  <!-- dates have the same time because all robotevents competitions are set to 12 am. Boiiiiiiiiii this so not tuff -->
  {@const spansTime = !start.isSame(end)}
  {@const fullAddress = `${event.location.address_1}, ${event.location.city}${
    event.location.region !== null ? `, ${event.location.region}` : ''
  }`}
  <Container>
    <Title extraProps="mb-3">{event.name}</Title>
    <div class="mb-6 grid grid-cols-2 gap-2">
      <Card
        href={`http://maps.apple.com/?t=r&q=${event.location.venue}&address=${fullAddress}`}
        heading={m.every_inner_vole_hug()}
        icon={MapPin}
        ><Content>
          {event.location.venue}
        </Content>
        <Subtitle>{event.location.address_1}</Subtitle></Card
      >
      <Card
        heading={m.east_icy_gecko_buzz()}
        icon={CalendarDays}
        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.name}&dates=${new Date(event.start!).toISOString().replace(/(?:T.*)|(?:[-])/g, '')}/${new Date(event.end!).toISOString().replace(/(?:T.*)|(?:[-])/g, '')}&location=${fullAddress}&sprop=website:gears.sh/events/${event.id}&sprop=name:gears`}
      >
        <Content>
          {#if spansTime}
            {start.format('LL')} - {end.format('LL')}
          {:else}
            {start.format('LL')}
          {/if}
        </Content>
        <Subtitle>
          {#if spansTime && now.isAfter(start) && now.isBefore(end)}
            ends {end.fromNow()}
          {:else}
            {start.fromNow()}
          {/if}
        </Subtitle></Card
      >
      <Card heading={m.mushy_gaudy_jackal_reside()} icon={ListOrdered}>
        <Content>{event.level}</Content>
      </Card>
      <Card heading={m.inclusive_large_ray_stab()} icon={Bug}>
        <Content>ID {event.id}</Content>
        <Subtitle>sku {event.sku}</Subtitle>
      </Card>
    </div>
    <div class="mb-3 flex items-center justify-between" id="teams">
      <Section>{m.lost_red_frog_hack()}</Section>
      <div class="inline-flex h-9 rounded-lg bg-zinc-800 p-1 text-zinc-400">
        <button
          data-active={true}
          class="inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none data-[active=true]:bg-zinc-950 data-[active=true]:text-zinc-50"
        >
          Teams
        </button>
        <button
          data-active={false}
          disabled={start.isAfter(now)}
          class="inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none disabled:cursor-default disabled:opacity-50 data-[active=true]:bg-zinc-950 data-[active=true]:text-zinc-50"
        >
          Results
        </button>
      </div>
    </div>
    {#await data.teams then teams}
      {@debug teams}
      {#if teams.data!.length === 0}
        <Section>{m.sunny_basic_raven_snap()}</Section>
      {:else}
        <table class="w-full text-xs lg:text-sm">
          <thead class="border-b border-zinc-800">
            <tr>
              <Head>ID</Head>
              <Head>{m.minor_lofty_emu_trust()}</Head>
              <Head>{m.inner_tidy_tuna_walk()}</Head>
              <Head extraProps="text-right">{m.low_bland_otter_adapt()}</Head>
            </tr>
          </thead>
          <tbody>
            {#each teams.data! as team}
              <Row {...team} />
            {/each}
          </tbody>
        </table>
      {/if}
    {/await}
  </Container>
{/await}
