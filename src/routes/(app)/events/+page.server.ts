import { Events } from '$lib/robotevents/api';
import dayjs from 'dayjs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  let params = url.searchParams;

  let events = await Events({
    region: params.get('region') ?? '',
    level: [params.get('level') ?? ''],
    season: params.get('season') ? [parseInt(params.get('season')!)] : undefined,
    start: params.get('from')
      ? dayjs(params.get('from')).toISOString()
      : dayjs().subtract(1, 'week').toISOString(),
    end: params.get('to') ? dayjs(params.get('to')).toISOString() : dayjs().toISOString(),
    eventTypes: ['tournament']
  });

  return { events: events.data };
};
