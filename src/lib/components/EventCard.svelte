<script lang="ts">
  import type { Event } from '$lib/robotevents/schemas/Event';
  import CalendarDays from '$lib/icons/CalendarDays.svelte';
  import MapPin from '$lib/icons/MapPin.svelte';
  import { languageTag } from '$lib/paraglide/runtime';
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import GradientText from './GradientText.svelte';

  let { ...event }: Event = $props();

  dayjs.extend(localizedFormat);

  let start = dayjs(event.start).locale(languageTag());
  let end = dayjs(event.end).locale(languageTag());
</script>

<a
  class="flex flex-col gap-1 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm transition-colors duration-300 hover:bg-zinc-900"
  href="/events/{event.id}"
>
  {#if event.name.includes('World Championship') || event.name.includes('Open')}
    <GradientText extraProps="font-medium">{event.name}</GradientText>
  {:else}
    <p class="font-medium">{event.name}</p>
  {/if}
  <div class="flex gap-2">
    <div class="flex items-center gap-1">
      <CalendarDays />
      <p class="text-xs">
        {#if start.isSame(end)}
          {start.format('LL')}
        {:else}
          {start.format('LL')} - {end.format('LL')}
        {/if}
      </p>
    </div>
    <div role="separator" class="w-px shrink-0 bg-zinc-800"></div>
    <div class="flex items-center gap-1">
      <MapPin />
      <p class="text-xs">
        {event.location.venue}
      </p>
    </div>
  </div></a
>
