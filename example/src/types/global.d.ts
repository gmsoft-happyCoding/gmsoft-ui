type Omit = Pick<T, Exclude<keyof T, K>>;

interface DvaLoadingState {
  global: boolean;
  models: { [type: string]: boolean | undefined };
  effects: { [type: string]: boolean | undefined };
}
