import { Account, Databases, ID, Query, Teams } from 'node-appwrite';
import type { Actions, PageServerLoad } from './$types';
import { PUBLIC_DATABASE, PUBLIC_SESSIONCOOKIE } from '$env/static/public';
import { createClientClient } from '$lib/server/appwrite';
import { PUBLIC_USERNAMESCOLLECTION } from '$env/static/public';
import dayjs from 'dayjs';
import type { Message } from './components/Message';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  let db = new Databases(locals.client!);
  let account = new Account(locals.client!);

  let session = await account.get();
  let messages = await db.listDocuments(PUBLIC_DATABASE, '160012-msg', [Query.limit(25)]);

  let m: Message[] = messages.documents.map((x) => ({
    username: x.userId,
    content: x.content,
    time: x.time,
    sending: false
  }));

  return {
    name: 'bug talk',
    username: `${session.name}`,
    id: `160012-msg`,
    session: cookies.get(PUBLIC_SESSIONCOOKIE),
    messages: m
  };
};

export const actions: Actions = {
  send: async ({ fetch, locals, request }) => {
    let data = await request.formData();

    let account = new Account(locals.client!);
    let db = new Databases(locals.client!);

    let session = await account.get();

    await db.createDocument(PUBLIC_DATABASE, '160012-msg', ID.unique(), {
      content: `${data.get('content')}`,
      time: `${dayjs().toISOString()}`,
      userId: session.name
    });
    setTimeout(() => {}, 1000);
    let docs = await db.listDocuments(PUBLIC_DATABASE, '160012-msg');
    let messages: Message[] = [];

    docs.documents.forEach((x) => {
      messages.push({
        username: x.userId,
        content: x.content,
        sending: false,
        time: x.time
      });
    });

    return { messages };
  }
};
