import type { Alliance } from './Alliance';
import type { IdInfo } from './IdInfo';

export type Match = {
  id: number;
  event: IdInfo;
  division: IdInfo;
  round: number;
  instance: number;
  matchnum: number;
  scheduled?: string;
  started?: string;
  field?: string;
  scored: boolean;
  name: string;
  alliances: Alliance[];
};
