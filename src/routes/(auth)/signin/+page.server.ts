import { PUBLIC_SESSIONCOOKIE } from '$env/static/public';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createAdminClient } from '$lib/server/appwrite';
import { Account } from 'node-appwrite';

export const load: PageServerLoad = async ({ cookies }) => {
  if (cookies.get(PUBLIC_SESSIONCOOKIE)) redirect(303, '/');
};

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    let data = await request.formData();
    let adminClient = createAdminClient();

    let account = new Account(adminClient);

    try {
      var session = await account.createEmailPasswordSession(
        `${data.get('email')}`,
        `${data.get('password')}`
      );
    } catch {
      return fail(422, {
        message: 'Invalid email or password'
      });
    }
    cookies.set(PUBLIC_SESSIONCOOKIE, session.secret, {
      path: '/',
      expires: new Date(session.expire)
    });
    redirect(303, '/');
  }
};
