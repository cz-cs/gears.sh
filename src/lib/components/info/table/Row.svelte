<script lang="ts">
  import { goto } from '$app/navigation';
  import type { Team } from '$lib/robotevents/schemas/Team';
  let { ...team }: Team = $props();
</script>

<tr
  data-sveltekit-preload-code={true}
  class="cursor-pointer border-b border-zinc-200 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
  onclick={() => goto(`/teams/${team.id}`)}
>
  <td class="p-2 align-middle font-medium">{team.number}</td>
  <td class="p-2 align-middle">{team.organization}</td>
  <td class="p-2 align-middle">
    {#if team.location === undefined}
      No location is provided for this team
    {:else}
      {team.location.city}, {team.location.region !== null ? team.location.region + ',' : ''}
      {team.location.country}
    {/if}</td
  >
  <td class="p-2 text-right align-middle">{team.team_name}</td>
</tr>
