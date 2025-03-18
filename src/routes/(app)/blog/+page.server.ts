import { createSessionClient } from '$lib/server/appwrite';
import { Databases, Query } from 'node-appwrite';
import type { PageServerLoad } from './$types';
import { PUBLIC_BLOGCOLLECTION, PUBLIC_DATABASE } from '$env/static/public';

export const load: PageServerLoad = async ({ cookies }) => {
  let client = createSessionClient(cookies);
  let db = new Databases(client);

  let postResult = await db.listDocuments(PUBLIC_DATABASE, PUBLIC_BLOGCOLLECTION);
  let posts = postResult.documents.map((x) => {
    return {
      title: x.title as string,
      description: x.description as string,
      author: x.author as string,
      date: x.date as string,
      url: x.$id as string
    };
  });

  return { posts: posts };
};
