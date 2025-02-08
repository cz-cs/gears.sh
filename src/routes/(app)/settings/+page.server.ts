import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { Account, Databases } from 'node-appwrite';
import { PUBLIC_DATABASE, PUBLIC_USERNAMESCOLLECTION } from '$env/static/public';

let account: Account;
let db: Databases;

export const load: PageServerLoad = async ({ locals }) => {
  account = new Account(locals.client!);

  let session = await account.get();
  db = new Databases(locals.client!);

  let usernameDoc = await db.getDocument(
    PUBLIC_DATABASE,
    PUBLIC_USERNAMESCOLLECTION,
    session.prefs.usernameId
  );

  return { username: usernameDoc.username, display_name: session.name, email: session.email };
};

export const actions: Actions = {
  name: async ({ request }) => {
    let data = await request.formData();
    let session = await account.get();

    await account.updateName(`${data.get('display_name')}`);
    try {
      await db.updateDocument(
        PUBLIC_DATABASE,
        PUBLIC_USERNAMESCOLLECTION,
        session.prefs.usernameId,
        {
          username: `${data.get('username')}`,
          id: `${session.$id}`
        }
      );
    } catch {
      return fail(400, {
        error: true,
        message: 'Your username cannot be longer than 30 characters'
      });
    }

    return { error: false, message: 'Name updated successfully' };
  },
  signout: async () => {
    await account.deleteSession('current');
    redirect(301, '/');
  }
};
