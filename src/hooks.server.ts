import { PUBLIC_SESSIONCOOKIE } from '$env/static/public';
import { i18n } from '$lib/i18n';
import { createSessionClient } from '$lib/server/appwrite';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
const clientHandle: Handle = async ({ resolve, event }) => {
  let cookie = event.cookies.get(PUBLIC_SESSIONCOOKIE);
  console.log(event.route.id);
  if (cookie) {
    let client = createSessionClient(event.cookies);
    event.locals.client = client;
  }

  if (cookie && event.route.id === null) {
    redirect(303, '/home');
  }

  return await resolve(event);
};
const i18nHandle: Handle = i18n.handle();

export const handle = sequence(i18nHandle, clientHandle);
