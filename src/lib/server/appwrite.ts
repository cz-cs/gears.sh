import { Client } from 'node-appwrite';
import * as a from 'appwrite';
import { PRIVATE_APPWRITE_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_PROJECT, PUBLIC_SESSIONCOOKIE } from '$env/static/public';
import type { Cookies } from '@sveltejs/kit';

export function createAdminClient() {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PUBLIC_APPWRITE_PROJECT)
    .setKey(PRIVATE_APPWRITE_KEY);

  return client;
}

export function createSessionClient(cookies: Cookies) {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PUBLIC_APPWRITE_PROJECT);
  const session = cookies.get(PUBLIC_SESSIONCOOKIE);

  if (!session) {
    throw new Error('No user session');
  }

  client.setSession(session);

  return client;
}

export function createClientClient(cookies: Cookies) {
  const client = new a.Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PUBLIC_APPWRITE_PROJECT);
  const session = cookies.get(PUBLIC_SESSIONCOOKIE);

  if (!session) {
    throw new Error('No user session');
  }

  client.setSession(session);

  return client;
}
