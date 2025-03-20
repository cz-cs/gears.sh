import { PUBLIC_SESSIONCOOKIE } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  if (!cookies.get(PUBLIC_SESSIONCOOKIE)) redirect(303, '/');
};
