import {
  PUBLIC_DATABASE,
  PUBLIC_SESSIONCOOKIE,
  PUBLIC_USERNAMESCOLLECTION
} from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../signin/$types';
import { createAdminClient, createSessionClient } from '$lib/server/appwrite';
import * as Appwrite from 'node-appwrite';
import { Teams } from '$lib/robotevents/api';

export const load: PageServerLoad = async ({ cookies }) => {
  if (cookies.get(PUBLIC_SESSIONCOOKIE)) redirect(303, '/');
};

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    let data = await request.formData();

    let adminClient = createAdminClient();
    let account = new Appwrite.Account(adminClient);
    let db = new Appwrite.Databases(adminClient);

    await account.create(
      Appwrite.ID.unique(),
      `${data.get('email')}`,
      `${data.get('password')}`,
      `${data.get('display_name')}`
    );

    let session = await account.createEmailPasswordSession(
      `${data.get('email')}`,
      `${data.get('password')}`
    );

    cookies.set(PUBLIC_SESSIONCOOKIE, session.secret, {
      path: '/',
      expires: new Date(session.expire)
    });

    let team = await Teams({ number: [`${data.get('team')}`] });
    let doc = await db.createDocument(
      PUBLIC_DATABASE,
      PUBLIC_USERNAMESCOLLECTION,
      Appwrite.ID.unique(),
      {
        username: `${data.get('username')}`,
        id: session.userId
      }
    );

    try {
      let teams = new Appwrite.Teams(adminClient);
      let t = await teams.get(team!.data[0].id.toString());

      let membership = await teams.createMembership(t.$id, [], undefined, session.userId);

      await teams.updateMembershipStatus(t.$id, membership.$id, session.userId, 'secret');
    } catch {}

    let sessionClient = createSessionClient(cookies);
    let userAcc = new Appwrite.Account(sessionClient);

    await userAcc.updatePrefs({
      usernameId: doc.$id,
      name: `${data.get('name')}`,
      private: Boolean(`${data.get('private')}`)
    });

    redirect(303, '/');
  }
};
