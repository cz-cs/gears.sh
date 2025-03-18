import { Events } from '$lib/robotevents/api';
import type { PageServerLoad } from '../$types';
import type { Paginated } from '$lib/robotevents/schemas/Paginated';
import { Account, Teams } from 'node-appwrite';
import type { Event } from '$lib/robotevents/schemas/Event';

export const load: PageServerLoad = async ({ fetch, locals }) => {
  let account = new Account(locals.client!);
  let team = new Teams(locals.client!);

  let session = await account.get();

  let teams = await team.list([], undefined);

  let res = Events({
    start: new Date(Date.now()).toISOString(),
    season: [189],
    team: [parseInt(teams.teams[0].$id)]
  });

  return { events: res as Promise<Paginated<Event>>, name: session.prefs.name };
};
