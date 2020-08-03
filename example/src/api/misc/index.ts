/* eslint-disable camelcase */
import { WithPathOpts } from '../Opts.d';
import instance from './instance';
import { convertRESTAPI } from '../util';

/** 获取地区信息  */
function districts_get(opts: WithPathOpts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/stddata/api/v1.0/location/districts/{id}/children', opts),
    opts: { ...opts },
  });
}

export { districts_get };
