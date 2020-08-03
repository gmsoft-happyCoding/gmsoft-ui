import { AxiosPromise, AxiosRequestConfig } from 'axios';

type Extend = { cache?: boolean };

interface PathParam {
  path: { [key: string]: string };
}

export type Opts = AxiosRequestConfig & Extend;

export type WithPathOpts = Opts & PathParam;

export interface ApiI {
  (opts: WithPathOpts): AxiosPromise<any>;
}

export interface IdAndName {
  id: string;
  name: string;
}

export interface AreaI {
  province: IdAndName;
  city?: IdAndName;
  county?: IdAndName;
}
