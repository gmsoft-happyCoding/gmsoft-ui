import sample from 'lodash/sample';

import HASH_KEYS from '../configs/hash-keys';

export default (length?: number) => {
  let index = length || 6;
  const hashArr: string[] = [];
  for (index; index > 0; index--) {
    hashArr.push(sample(HASH_KEYS)!);
  }
  return hashArr.join('');
};
