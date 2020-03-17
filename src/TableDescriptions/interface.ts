import { ReactNode } from 'react';

export interface AlignConf {
  /**
   * label 标签的文本 水平对齐方式
   * @default 'right'
   */
  labelAlign?: Aligin;
  /**
   * label 标签的文本 竖直对齐方式
   * @default 'top'
   */
  labelValign?: Valigin;
  /**
   * value 内容的文本 水平对齐方式
   * @default 'left'
   */
  valueAlign?: Aligin;
  /**
   * value 内容的文本 竖直对齐方式
   * @default 'top'
   */
  valueValign?: Valigin;
}

export interface TDRecod {
  /**
   * 标签
   * * 若传入undefined|null 则不显示
   */
  label: ReactNode;
  /**
   * 内容
   * * 若传入undefined|null 则不显示
   */
  value: ReactNode;
  /**
   * 布局
   * @default { label: 3; value: 5 }
   * * 传入 number 时 将 配置为 { label: 3; value: colspan - 3 }，故colspan必须大于 3 小于24
   */
  colspan?: number | { label: number; value: number };
  /**
   * 文本、内容对齐配置
   * * 若不传入则取组件props配置
   * * 若传入则优先取本值
   */
  alignConf?: AlignConf;
}

export type Aligin = 'left' | 'right' | 'center' | 'justify' | 'char';

export type Valigin = 'top' | 'middle' | 'bottom' | 'baseline';

export interface TableDescriptionsProps {
  /**
   * 数据数组
   * @default []
   */
  dataSource?: TDRecod[];
  /**
   * 加载中
   */
  loading?: boolean;
  /** 标题 */
  title?: ReactNode;
  /**
   * 列表的大小
   * 可以设置为 middle 、small 、 default, 或不填
   * @default 'default'
   */
  size?: 'default' | 'middle' | 'small';
  /**
   * 文本、内容对齐配置
   * @default {labelAlign:'right',labelValign:'top',valueAlign:'left',valueValign:'top'}
   */
  alignConf?: AlignConf;
}
