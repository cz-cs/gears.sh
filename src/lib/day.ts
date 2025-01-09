import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es-us';
import { languageTag } from './paraglide/runtime';

dayjs.locale(languageTag());
