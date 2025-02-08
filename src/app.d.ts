// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Client } from 'node-appwrite';

// for information about these interfaces
declare global {
  declare namespace App {
    // interface Error {}
    interface Locals {
      client?: Client;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
