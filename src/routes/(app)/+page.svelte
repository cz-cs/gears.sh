<script lang="ts">
  import * as m from '$lib/paraglide/messages';

  import EventCard from '$lib/components/EventCard.svelte';
  import EventCardSkeleton from '$lib/components/EventCardSkeleton.svelte';
  import type { PageData } from './$types';
  import Title from '$lib/components/pages/Title.svelte';
  import Section from '$lib/components/pages/Section.svelte';
  import Container from '$lib/components/pages/Container.svelte';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Home - gears</title>
</svelte:head>
<Container>
  <Title>{m.tiny_tame_parrot_twist()}</Title>
  <div role="separator" class="my-6 h-px shrink-0 bg-zinc-800"></div>
  <div class="mb-3 space-y-3">
    <Section>{m.fluffy_blue_chipmunk_drum()}</Section>
    {#await data.events}
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
    {:then events}
      <div class="space-y-5">
        {#each events.data as event}
          <EventCard {...event} />
        {/each}
      </div>
    {/await}
  </div>
  <div>
    <Section>{m.drab_short_jackal_loop()}</Section>
  </div>
</Container>
