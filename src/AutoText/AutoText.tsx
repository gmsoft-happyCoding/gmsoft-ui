/*
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2021-03-11 17:23:37
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2021-03-12 11:11:14
 * @Description: Nothing
 */
import React from 'react';
import { Typography } from 'antd';
import { get } from 'lodash';
import { CSSProperties } from 'styled-components';

const { Paragraph } = Typography;

interface Prop {
  /** 展示的最大行数 */
  rows?: number;
  /** 是否可展开 */
  expandable?: boolean;
  /** 是否提供Copy按钮 */
  copyable?: boolean;
  /** 实际内容：仅可以为字符串 */
  content?: string | null;
  /** 实际内容：仅可以为字符串 */
  children?: string | string[] | React.ReactChild;
  /** 是否具备下方的留白,默认情况下，下方具备一定的纵向留白，默认：true */
  zeroMargin?: boolean;
  /** 数据对象：可以使用传入数据对象+键名的形式获取展示的内容[get(data,key)这个形式] */
  data?: any;
  /** 数据对象的目标键名 */
  keyName?: string;
  /** 为空时的占位字符，默认：-- */
  defCharacter?: string;
  style?: CSSProperties;
}

export default function AutoText(props: Prop) {
  const {
    data,
    keyName,
    zeroMargin,
    rows,
    expandable,
    copyable,
    content,
    children,
    defCharacter = '--',
    style = {},
  } = props;
  return (
    <Paragraph
      style={{ marginBottom: zeroMargin ? 0 : '1em', ...style }}
      ellipsis={{ rows, expandable }}
      copyable={copyable}
    >
      {content || children || get(data, keyName, defCharacter)}
    </Paragraph>
  );
}

AutoText.defaultProps = {
  rows: 2,
  expandable: true,
  copyable: false,
};
