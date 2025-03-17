import { Events } from '$lib/robotevents/api';
import dayjs from 'dayjs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  let events = await Events({
    start: dayjs().toISOString(),
    eventTypes: ['tournament']
  });

  return { events: events.data };
};
