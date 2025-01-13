import { Account } from 'node-appwrite';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const account = new Account(locals.client!);

  const session = await account.get();

  return { name: session.prefs.name };
};
