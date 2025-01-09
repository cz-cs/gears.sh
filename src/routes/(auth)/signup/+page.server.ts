import {
  PUBLIC_DATABASE,
  PUBLIC_SESSIONCOOKIE,
  PUBLIC_USERNAMESCOLLECTION
} from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../signin/$types';
import { createAdminClient, createSessionClient } from '$lib/server/appwrite';
import { Account, Databases, ID, Users } from 'node-appwrite';
import { Teams } from '$lib/robotevents/api';

export const load: PageServerLoad = async ({ cookies }) => {
  if (cookies.get(PUBLIC_SESSIONCOOKIE)) redirect(303, '/');
};

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    let data = await request.formData();

    let adminClient = createAdminClient();
    let account = new Account(adminClient);
    let db = new Databases(adminClient);

    await account.create(
      `${data.get('username')}`,
      `${data.get('email')}`,
      `${data.get('password')}`,
      `${data.get('display_name')}`
    );

    let session = await account.createEmailPasswordSession(
      `${data.get('email')}`,
      `${data.get('password')}`
    );
    let doc = await db.createDocument(PUBLIC_DATABASE, PUBLIC_USERNAMESCOLLECTION, ID.unique(), {
      username: `${data.get('username')}`,
      id: session.userId
    });

    cookies.set(PUBLIC_SESSIONCOOKIE, session.secret, {
      path: '/',
      expires: new Date(session.expire)
    });

    let sessionClient = createSessionClient(cookies);
    let userAcc = new Account(sessionClient);

    let team = await Teams({ number: [`${data.get('team')}`] });

    await userAcc.updatePrefs({
      team: team?.data[0].id,
      usernameId: doc.$id
    });

    redirect(303, '/');
  }
};
