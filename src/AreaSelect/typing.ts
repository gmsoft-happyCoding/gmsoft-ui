import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { LEVEL } from './Level';

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

export interface AreaDataI {
  id: string;
  pid: string;
  code: string;
  level: LEVEL;
  name: string;
}

export interface OptionI {
  value: string;
  label: string;
  disabled?: boolean;
  level: LEVEL;
  isLeaf: boolean;
  children?: OptionI[];
}
