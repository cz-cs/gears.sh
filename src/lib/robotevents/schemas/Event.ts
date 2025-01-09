import type { IdInfo } from './IdInfo';
import type { Location } from './Location';

export type Event = {
  id: number;
  sku: string;
  name: string;
  start?: string;
  end?: string;
  season: IdInfo;
  program: IdInfo;
  location: Location;
  locations?: Location[];
  divisions?: Division[];
  level?: string;
};

export type Division = {
  id?: number;
  name?: string;
  order?: number;
};
