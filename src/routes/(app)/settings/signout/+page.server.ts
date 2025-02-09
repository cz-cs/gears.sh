import { PUBLIC_SESSIONCOOKIE } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  cookies.delete(PUBLIC_SESSIONCOOKIE, {
    path: '/'
  });
  redirect(303, '/');
};
