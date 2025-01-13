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
  import Tabs from '$lib/components/tabs/Tabs.svelte';
  import TabButton from '$lib/components/tabs/TabButton.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let page = $state(1);

  dayjs.extend(relativeTime);
</script>

<svelte:head>
  <title>Event details - gearsHQ</title>
</svelte:head>
{#await data.event}
  <PageSkeleton />
{:then event}
  {@const now = dayjs()}
  {@const start = dayjs(event.start)}
  {@const end = dayjs(event.end)}
  {@const spansTime = !start.isSame(end)}
  <Container>
    <Title extraProps="mb-3">{event.name}</Title>
    <div class="mb-6 grid grid-cols-2 gap-2">
      <Card
        href={`http://maps.apple.com/?ll=${event.location.coordinates?.lat},${event.location.coordinates?.lon}`}
        heading={m.every_inner_vole_hug()}
        icon={MapPin}
        ><Content>
          {event.location.city}{event.location.region !== null ? `, ${event.location.region}` : ''}
        </Content>
        <Subtitle>{event.location.address_1}</Subtitle></Card
      >
      <Card
        heading={m.east_icy_gecko_buzz()}
        icon={CalendarDays}
        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.name}&dates=${new Date(event.start!).toISOString().replace(/(?:T.*)|(?:[-])/g, '')}/${new Date(event.end!).toISOString().replace(/(?:T.*)|(?:[-])/g, '')}&location=${event.location.address_1}, ${event.location.city}&sprop=website:gearshq.tv/events/${event.id}&sprop=name:gearsHQ`}
      >
        <Content>
          {#if spansTime}
            {start.format('LL')} - {end.format('LL')}
          {:else}
            {start.format('LL')}
          {/if}
        </Content>
        <Subtitle>
          {#if spansTime}
            {#if now.isAfter(start) && now.isBefore(end)}
              ends {end.fromNow()}
            {:else}
              {start.fromNow()}
            {/if}
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
      <Tabs>
        <TabButton active={page === 1} onclick={() => (page = 1)}>Teams</TabButton>
        <TabButton active={page === 2} onclick={() => (page = 2)}>Results</TabButton>
      </Tabs>
    </div>
    {#if page === 1}
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
    {:else if page === 2}{/if}
  </Container>
{/await}
