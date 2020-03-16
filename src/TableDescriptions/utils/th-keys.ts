import getHash from './get-hash';

export default (count: number) => {
  let index = 1;
  const keys: string[] = [];
  for (index; index <= count; index++) {
    keys.push(getHash());
  }
  return keys;
};
