import type { IdInfo } from './IdInfo';

enum SkillType {
  driver,
  programming,
  package_delivery_time // ???
}

export type Skill = {
  id: number;
  event: IdInfo;
  team: IdInfo;
  type: SkillType;
  season: IdInfo;
  division: IdInfo;
  rank: number;
  score: number;
  attempts: number;
};
