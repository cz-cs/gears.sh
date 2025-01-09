import type { IdInfo } from './IdInfo';

export type Ranking = {
  id?: number;
  event?: IdInfo;
  division?: IdInfo;
  rank?: number;
  team?: IdInfo;
  wins?: number;
  losses?: number;
  ties?: number;
  wp?: number;
  ap?: number;
  sp?: number;
  high_score?: number;
  average_points?: number;
  total_points?: number;
};
