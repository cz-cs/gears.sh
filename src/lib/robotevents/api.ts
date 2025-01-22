// modelled from https://www.robotevents.com/api/v2

import { PRIVATE_ROBOTEVENTS_TOKEN } from '$env/static/private';
import type { Paginated } from './schemas/Paginated';

import type { Event } from './schemas/Event';
import type { Match } from './schemas/Match';
import type { Ranking } from './schemas/Ranking';
import type { Skill } from './schemas/Skill';
import type { Team } from './schemas/Team';

export const baseUri = 'https://www.robotevents.com/api/v2';

const request = async (url: string): Promise<Response> => {
  return await fetch(url, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      Authorization: 'Bearer ' + PRIVATE_ROBOTEVENTS_TOKEN
    })
  });
};

export const Get = async (url: string) => {
  await request(url);
  return;
};

const param = (name: string, value: any): string => {
  if (Array.isArray(value)) {
    return value.reduce((s, x) => `${s}${name}[]=${x}&`, '');
  }
  return `${value ? `${name}=${value}&` : ''}`;
};

//#region Events
export const Events = async ({
  id = undefined,
  sku = undefined,
  team = undefined,
  season = undefined,
  start = undefined,
  end = undefined,
  region = undefined,
  level = undefined,
  eventTypes = undefined
}: {
  id?: number[];
  sku?: string[];
  team?: number[];
  season?: number[];
  start?: string;
  end?: string;
  region?: string;
  level?: string[];
  eventTypes?: string[];
}): Promise<Paginated<Event>> => {
  let res = await request(
    `${baseUri}/events?${param('id', id)}${param('sku', sku)}${param('team', team)}${param('season', season)}${param('start', start)}${param('end', end)}${param('region', region)}${param('level', level)}${param('eventTypes', eventTypes)}`
  );
  if (!res.ok) {
    console.error(`ROBOTEVENTS API MALFUNCTIONING\n${res.ok} ${res.url} ${await res.text()}`);
  }
  return await res.json();
};

export const EventById = async (id: number): Promise<Event | null> => {
  let res = await request(`${baseUri}/events/${id}`);
  if (!res.ok) return null;
  return await res.json();
};

export const EventTeams = async ({
  id,
  number = undefined,
  registered = undefined,
  grade = undefined,
  country = undefined
}: {
  id: number;
  number?: string[];
  registered?: boolean;
  grade?: string[];
  country?: string[];
}): Promise<Paginated<Team> | null> => {
  let res = await request(
    `${baseUri}/events/${id}/teams?${param('number', number)}${param('registered', registered)}${param('grade', grade)}${param('country', country)}`
  );
  if (!res.ok) return null;
  return await res.json();
};

export const EventSkills = async ({
  id,
  team = undefined,
  type = undefined
}: {
  id: number;
  team?: number[];
  type?: string[];
}): Promise<Paginated<Skill> | null> => {
  let res = await request(
    `${baseUri}/events/${id}/skills?${param('team', team)}${param('type', type)}`
  );
  if (!res.ok) return null;
  return await res.json();
};

export const EventAwards = async ({
  id,
  team = undefined,
  winner = undefined
}: {
  id: number;
  team?: number[];
  winner?: string[];
}): Promise<Paginated<Skill> | null> => {
  let res = await request(
    `${baseUri}/events/${id}/awards?${param('team', team)}${param('winner', winner)}`
  );
  if (!res.ok) return null;
  return await res.json();
};

export const DivMatches = async ({
  id,
  div,
  team = undefined,
  round = undefined,
  instance = undefined,
  matchnum = undefined
}: {
  id: number;
  div: number;
  team?: number[];
  round?: number[];
  instance?: number[];
  matchnum?: number[];
}): Promise<Paginated<Match> | null> => {
  let res = await request(
    `${baseUri}/events/${id}/divisions/${div}/matches?${param('team', team)}${param('round', round)}${param('instance', instance)}${param('matchnum', matchnum)}`
  );
  if (!res.ok) {
    return null;
  }
  return await res.json();
};

export const DivFinalists = async ({
  id,
  div,
  team = undefined,
  rank = undefined
}: {
  id: number;
  div: number;
  team?: number[];
  rank?: number[];
}): Promise<Paginated<Ranking> | null> => {
  let res = await request(
    `${baseUri}/events/${id}/divisions/${div}/finalistRankings?${param('team', team)}${param('rank', rank)}`
  );
  if (!res.ok) {
    return null;
  }
  return await res.json();
};

export const DivRankings = async ({
  id,
  div,
  team = undefined,
  rank = undefined
}: {
  id: number;
  div: number;
  team?: number[];
  rank?: number[];
}): Promise<Paginated<Ranking> | null> => {
  let res = await request(
    `${baseUri}/events/${id}/divisions/${div}/rankings?${param('team', team)}${param('rank', rank)}`
  );
  if (!res.ok) {
    return null;
  }
  return await res.json();
};
//#endregion
//#region Teams
export const Teams = async ({
  id = undefined,
  number = undefined,
  event = undefined,
  registered = undefined,
  program = undefined,
  grade = undefined,
  country = undefined
}: {
  id?: number;
  number?: string[];
  event?: number[];
  registered?: boolean;
  program?: number[];
  grade?: string[];
  country?: string[];
}): Promise<Paginated<Team> | null> => {
  let res = await request(
    `${baseUri}/teams?${param('id', id)}${param('number', number)}${param('event', event)}${param('registered', registered)}${param('program', program)}${param('grade', grade)}${param('country', country)}`
  );
  if (!res.ok) return null;
  return await res.json();
};

export const TeamById = async (id: number): Promise<Team | null> => {
  let res = await request(`${baseUri}/teams/${id}`);
  if (!res.ok) return null;
  return await res.json();
};

export const TeamEvents = async ({
  id,
  sku = undefined,
  season = undefined,
  start = undefined,
  end = undefined,
  level = undefined
}: {
  id: number;
  sku?: string[];
  season?: number[];
  start?: string;
  end?: string;
  level?: string[];
}): Promise<Paginated<Event> | null> => {
  let res = await request(
    `${baseUri}/teams/${id}/events?${param('sku', sku)}${param('season', season)}${param('start', start)}${param('end', end)}${param('level', level)}`
  );
  if (!res.ok) return null;
  return await res.json();
};

export const TeamMatches = async ({
  id,
  event = undefined,
  season = undefined,
  round = undefined,
  instance = undefined,
  matchnum = undefined
}: {
  id: number;
  event?: number[];
  season?: number[];
  round?: number[];
  instance?: number[];
  matchnum?: string[];
}): Promise<Paginated<Match> | null> => {
  let res = await request(
    `${baseUri}/teams/${id}/matches?${param('event', event)}${param('season', season)}${param('round', round)}${param('instance', instance)}${param('matchnum', matchnum)}`
  );
  if (!res.ok) return null;
  return await res.json();
};

export const TeamRankings = async ({
  id,
  event = undefined,
  rank = undefined,
  season = undefined
}: {
  id: number;
  event?: number[];
  rank?: number[];
  season?: number[];
}): Promise<Paginated<Ranking> | null> => {
  let res = await request(
    `${baseUri}/teams/${id}/rankings?${param('event', event)}${param('rank', rank)}${param('season', season)}`
  );
  if (!res.ok) return null;
  return await res.json();
};

export const TeamSkills = async ({
  id,
  event = undefined,
  type = undefined,
  season = undefined
}: {
  id: number;
  event?: number[];
  type?: string[];
  season?: number[];
}): Promise<Paginated<Skill> | null> => {
  let res = await request(
    `${baseUri}/teams/${id}/skills?${param('event', event)}${param('type', type)}${param('season', season)}`
  );
  if (!res.ok) return null;
  return await res.json();
};

export const TeamAwards = async ({
  id,
  event = undefined,
  season = undefined
}: {
  id: number;
  event?: number[];
  season?: number[];
}): Promise<Paginated<Skill> | null> => {
  let res = await request(
    `${baseUri}/teams/${id}/awards?${param('event', event)}${param('season', season)}`
  );
  if (!res.ok) return null;
  return await res.json();
};
//#endregion
