<script lang="ts">
  import * as m from '$lib/paraglide/messages';

  import Title from '$lib/components/pages/Title.svelte';
  import Skeleton from '$lib/components/pages/Skeleton.svelte';
  import type { PageData } from './$types';
  import Container from '$lib/components/pages/Container.svelte';
  import Card from '$lib/components/info/card/Card.svelte';
  import Content from '$lib/components/info/card/Content.svelte';
  import MapPin from '$lib/icons/MapPin.svelte';
  import ListOrdered from '$lib/icons/ListOrdered.svelte';
  import Medal from '$lib/icons/Medal.svelte';
  import Subtitle from '$lib/components/info/card/Subtitle.svelte';
  import Bug from '$lib/icons/Bug.svelte';
  import Section from '$lib/components/pages/Section.svelte';
  import PageSkeleton from './components/PageSkeleton.svelte';
  import Tabs from '$lib/components/tabs/Tabs.svelte';
  import TabButton from '$lib/components/tabs/TabButton.svelte';
  import BlockSpinner from '$lib/components/BlockSpinner.svelte';
  let { data }: { data: PageData } = $props();

  let currentSeason = $state(true);
  let page = $state(1);
</script>

<svelte:head>
  <title>Team details - gears</title>
</svelte:head>
{#await data.team}
  <PageSkeleton />
{:then team}
  <Container>
    <Title extraProps="mb-3">{team.number} - {team.team_name}</Title>
    <div class="mb-2 grid grid-cols-2 gap-2">
      <Card
        href={`http://maps.apple.com/?ll=${team.location?.coordinates?.lat},${team.location?.coordinates?.lon}`}
        heading={m.inner_tidy_tuna_walk()}
        icon={MapPin}
        ><Content>
          {team.organization}
        </Content>
        <Subtitle>
          {team.location?.city}, {team.location?.region}, {team.location?.country}
        </Subtitle></Card
      >
      <Card heading="Grade" icon={Medal}>
        <Content>{team.grade}</Content>
        <Subtitle>{team.program.name}</Subtitle>
      </Card>
    </div>
    <div class="mb-3">
      {#if team.robot_name}
        <Card heading="Robot name" icon={Bug}>
          <Content>{team.robot_name}</Content>
          <Subtitle>very cool</Subtitle>
        </Card>
      {/if}
    </div>
    <div class="mb-3 flex items-center justify-between" id="teams">
      <div class="flex items-center gap-2">
        {#if page === 1}
          {#if currentSeason}
            <Section>24-25 Competitions</Section>
          {:else}
            <Section>All-time Competitions</Section>
          {/if}
          <Tabs>
            <TabButton active={currentSeason} onclick={() => (currentSeason = true)}
              >24-25</TabButton
            >
            <TabButton active={!currentSeason} onclick={() => (currentSeason = false)}
              >All time</TabButton
            >
          </Tabs>
        {:else if page === 2}{/if}
      </div>
      <Tabs>
        <TabButton active={page === 1} onclick={() => (page = 1)}>Competitions</TabButton>
        <TabButton active={page === 2} onclick={() => (page = 2)}>Awards</TabButton>
      </Tabs>
    </div>
    {#if page === 1}
      {#if currentSeason}
        {#await data.rankings}
          <BlockSpinner active={true} size={32} />
        {:then rankings}
          <div class="grid auto-cols-max grid-cols-1 gap-2 md:grid-cols-2">
            {#each rankings.data as rank}
              <a
                class="inline-flex flex-col justify-center space-y-2 rounded-md border border-zinc-200 p-3 text-sm font-medium shadow transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                href="/events/{rank.event!.id}"
              >
                <p>{rank.event!.name}</p>
                <div class="h-px bg-zinc-200 dark:bg-zinc-800"></div>
                <div class="flex justify-evenly gap-3 text-xs font-normal md:text-sm">
                  <p>rank <span class="font-bold">{rank.rank}</span></p>
                  <div class="w-px bg-zinc-200 dark:bg-zinc-800"></div>
                  <p><span class="font-bold">{rank.total_points}</span> total points</p>
                  <div class="w-px bg-zinc-200 dark:bg-zinc-800"></div>
                  <p>high score <span class="font-bold">{rank.high_score}</span></p>
                  <div class="w-px bg-zinc-200 dark:bg-zinc-800"></div>
                  <p>average <span class="font-bold">{rank.average_points}</span></p>
                </div>
              </a>
            {/each}
          </div>
        {/await}
      {:else}
        {#await data.allRankings}
          <BlockSpinner fill="#ffffff" active={true} size={32} />
        {:then rankings}
          <div class="grid auto-cols-max grid-cols-1 gap-2 md:grid-cols-2">
            {#each rankings.data as rank}
              <a
                class="inline-flex flex-col justify-center space-y-2 rounded-md border border-zinc-800 bg-zinc-950 p-3 text-sm font-medium shadow-md hover:bg-zinc-900"
                href="/events/{rank.event!.id}"
              >
                <p>{rank.event!.name}</p>
                <div class="h-px bg-zinc-800"></div>
                <div class="flex justify-evenly gap-3 text-xs font-normal md:text-sm">
                  <p>rank <span class="font-bold">{rank.rank}</span></p>
                  <div class="w-px bg-zinc-800"></div>
                  <p><span class="font-bold">{rank.total_points}</span> total points</p>
                  <div class="w-px bg-zinc-800"></div>
                  <p>high score <span class="font-bold">{rank.high_score}</span></p>
                  <div class="w-px bg-zinc-800"></div>
                  <p>average <span class="font-bold">{rank.average_points}</span></p>
                </div>
              </a>
            {/each}
          </div>
        {/await}
      {/if}
    {:else if page === 2}{/if}
  </Container>
{/await}
