import React from 'react';
import { Select } from 'antd';
import { SelectValue, SelectProps } from 'antd/lib/select';
import map from 'lodash/map';
import { getParent } from '../utils/getContainer';
import { OptionI } from './types';

const { Option } = Select;

interface Props extends SelectProps {
  options: Array<OptionI>;
}

export const OptionSelect = React.forwardRef<Select<SelectValue>, Props>((props: Props, ref) => {
  const { options, ...rest } = props;

  return (
    <Select ref={ref} {...rest} getPopupContainer={getParent}>
      {map(options, option => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
});
