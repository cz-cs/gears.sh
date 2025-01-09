import type { IdInfo } from './IdInfo';

export type AllianceTeam = {
  team?: IdInfo;
  sitting?: boolean;
};

export type Alliance = {
  color: string;
  score: number;
  teams: AllianceTeam[];
};
