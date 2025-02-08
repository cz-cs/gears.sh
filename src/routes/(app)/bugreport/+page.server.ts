import { Account, Databases, ID } from 'node-appwrite';
import type { Actions } from './$types';
import { PUBLIC_BUGREPORTSCOLLECTION, PUBLIC_DATABASE } from '$env/static/public';

export const actions: Actions = {
  default: async ({ locals, request }) => {
    let data = await request.formData();

    let db = new Databases(locals.client!);
    let account = new Account(locals.client!);

    let session = await account.get();

    await db.createDocument(PUBLIC_DATABASE, PUBLIC_BUGREPORTSCOLLECTION, ID.unique(), {
      userId: session.$id,
      description: `${data.get('description')}`
    });

    return { message: 'Bug report submitted! Thank you!' };
  }
};
