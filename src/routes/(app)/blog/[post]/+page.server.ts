import { createSessionClient } from '$lib/server/appwrite';
import { AppwriteException, Databases } from 'node-appwrite';
import type { PageServerLoad } from './$types';
import { PUBLIC_BLOGCOLLECTION, PUBLIC_DATABASE } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, params }) => {
  let client = createSessionClient(cookies);
  let db = new Databases(client);

  try {
    let doc = await db.getDocument(PUBLIC_DATABASE, PUBLIC_BLOGCOLLECTION, params.post);
    return {
      html: doc.html as string,
      author: doc.author as string
    };
  } catch {
    error(404, {
      message: 'Blog post not found'
    });
  }
};
