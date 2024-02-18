import find from 'lodash/find';

interface OptionI {
  label: string;
  value: any;
}

export const getLabel = (Options: Array<OptionI>, value: any) => {
  const option = find(Options, (o: OptionI) => o.value === value);
  return option ? option.label : '';
};
