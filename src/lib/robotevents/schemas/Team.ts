import type { IdInfo } from './IdInfo';
import type { Location } from './Location';

export type Team = {
  id: number;
  number: string;
  team_name?: string;
  robot_name?: string;
  organization?: string;
  location?: Location;
  registered?: boolean;
  program: IdInfo;
  grade?: string;
};
