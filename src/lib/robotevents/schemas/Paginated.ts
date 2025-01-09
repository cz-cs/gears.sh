import type { PageMeta } from './PageMeta';

export type Paginated<T> = {
  meta: PageMeta;
  data: T[];
};
