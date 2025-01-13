import { Account, Avatars } from 'node-appwrite';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const account = new Account(locals.client!);
  const avatars = new Avatars(locals.client!);

  const session = await account.get();

  return { name: session.prefs.name };
};
