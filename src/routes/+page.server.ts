import { createAdminClient } from '$lib/server/appwrite';
import { Databases, ID } from 'node-appwrite';
import type { Actions, PageServerLoad } from './$types';
import { PUBLIC_DATABASE, PUBLIC_RESERVATIONSCOLLECTION } from '$env/static/public';

export const actions: Actions = {
  default: async ({ request }) => {
    let data = await request.formData();

    let client = createAdminClient();
    let db = new Databases(client);

    let result = await db.createDocument(
      PUBLIC_DATABASE,
      PUBLIC_RESERVATIONSCOLLECTION,
      ID.unique(),
      {
        email: data.get('email')
      }
    );

    return {
      status: 200,
      body: {
        message: 'Success'
      }
    };
  }
};
