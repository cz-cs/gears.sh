import { EventById, Events, EventTeams } from '$lib/robotevents/api';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import type { Paginated } from '$lib/robotevents/schemas/Paginated';
import type { Team } from '$lib/robotevents/schemas/Team';
import type { Event } from '$lib/robotevents/schemas/Event';

export const load: PageServerLoad = async ({ params }) => {
  let id = Number.parseInt(params.event);
  if (id.toString() !== params.event) {
    let res = await Events({ sku: [params.event] });
    if (res!.data.length === 0)
      error(404, {
        message: 'Event could not be found'
      });
    redirect(303, `/events/${res.data[0].id}/`);
  }

  let res = EventById(id);

  let teamsRes = EventTeams({ id: id });
  return { event: res as Promise<Event>, teams: teamsRes as Promise<Paginated<Team>> };
};
