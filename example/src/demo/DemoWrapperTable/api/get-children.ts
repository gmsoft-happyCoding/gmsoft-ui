import { AxiosResponse } from 'axios';
import { delay } from 'lodash';
import { PaginationI, ApiResult } from 'search-page/dist/typing.d';

export default async (
  filters: { [key: string]: any },
  paganaition: PaginationI
): Promise<ApiResult> => {
  await delay(() => {}, 100);
  return { data: [1, 2, 3], total: 3 };
};
