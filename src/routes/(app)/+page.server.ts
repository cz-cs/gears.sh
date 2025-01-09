import { baseUri, Events, Teams } from '$lib/robotevents/api';
import type { PageServerLoad } from './$types';
import type { Paginated } from '$lib/robotevents/schemas/Paginated';
import { Account } from 'node-appwrite';
import type { Event } from '$lib/robotevents/schemas/Event';

export const load: PageServerLoad = async ({ fetch, locals }) => {
  let account = new Account(locals.client!);
  let session = await account.get();

  let res = Events({
    start: new Date(Date.now()).toISOString(),
    season: [189],
    team: [session.prefs.team]
  });

  return { events: res as Promise<Paginated<Event>> };
};
