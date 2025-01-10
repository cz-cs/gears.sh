import { Teams } from '$lib/robotevents/api';
import * as Appwrite from 'node-appwrite';
import { createAdminClient } from '$lib/server/appwrite';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, url }) => {
  let team = await Teams({ number: [url.searchParams.get('n')?.toUpperCase()!] });

  if (team?.data.length === 0) {
    return new Response(JSON.stringify({ message: 'Team not found' }), {
      status: 404
    });
  }

  let client = createAdminClient();
  let teams = new Appwrite.Teams(client);

  try {
    let aTeam = await teams.get(team!.data[0].id.toString());
    var members = aTeam.total;
  } catch {
    return new Response(
      JSON.stringify({
        number: team!.data[0].number,
        name: team!.data[0].team_name,
        members: 0,
        program: team!.data[0].program.name
      }),
      {
        status: 200
      }
    );
  }

  return new Response(
    JSON.stringify({
      number: team!.data[0].number,
      name: team!.data[0].team_name,
      members: members,
      program: team!.data[0].program.name
    }),
    {
      status: 200
    }
  );
};
