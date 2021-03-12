/* eslint-disable indent */
/*
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2021-03-11 17:39:29
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2021-03-12 10:20:26
 * @Description: Nothing
 */

import React from 'react';
import { Statistic } from 'antd';
import styled from 'styled-components';
import { isNil } from 'ramda';

type Size = 'normal' | 'large' | 'small';
const Layout = styled.div<{ size: Size; color: string }>`
  .ant-statistic-content-prefix,
  .ant-statistic-content-value {
    font-size: ${props => {
      const { size } = props;
      return {
        normal: 20,
        large: 24,
        small: 16,
      }[size];
    }}px;
    color: ${props => props.color};
  }
`;

interface Props {
  /** 金额 */
  amount?: string | number;
  /** UI尺寸 */
  size?: Size;
  /** 小数点后有效位数 */
  precision?: number;
  /** 前景色 */
  color?: string;
  /** 金额 */
  children?: string | number;
  /** 占位符 */
  defCharacter?: string;
}

function Money(props: Props) {
  const {
    amount,
    size = 'normal',
    precision = 2,
    color = 'rgb(220 19 19 / 85%)',
    children,
    defCharacter = '--',
  } = props;

  if (isNil(children) && isNil(amount)) {
    return <span>{defCharacter}</span>;
  }

  return (
    <Layout size={size} color={color}>
      <Statistic prefix="￥" value={amount || +children!} precision={precision} />
    </Layout>
  );
}

export default Money;
