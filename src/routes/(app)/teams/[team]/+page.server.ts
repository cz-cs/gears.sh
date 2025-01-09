import { TeamById, TeamMatches, TeamRankings, Teams } from '$lib/robotevents/api';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Team } from '$lib/robotevents/schemas/Team';
import type { Paginated } from '$lib/robotevents/schemas/Paginated';
import type { Ranking } from '$lib/robotevents/schemas/Ranking';
import type { Match } from '$lib/robotevents/schemas/Match';

export const load: PageServerLoad = async ({ params }) => {
  let team = Number.parseInt(params.team);
  if (params.team !== team.toString()) {
    let res = await Teams({ number: [params.team] });
    if (res?.data.length === 0)
      error(404, {
        message: "Gears couldn't find that team."
      });
    redirect(303, `/teams/${res?.data[0].id}`);
  }

  let teamRes = TeamById(team);
  let matchesRes = TeamMatches({ id: team, season: [189, 190, 191, 194, 195, 192, 118] });
  let rankRes = TeamRankings({ id: team, season: [189, 190, 191, 194, 195, 192, 118] });
  let allRankRes = TeamRankings({ id: team });

  return {
    team: teamRes as Promise<Team>,
    rankings: rankRes as Promise<Paginated<Ranking>>,
    allRankings: allRankRes as Promise<Paginated<Ranking>>,
    matches: matchesRes as Promise<Paginated<Match>>
  };
};
