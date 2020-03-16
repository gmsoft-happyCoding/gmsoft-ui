import { ReactNode } from 'react';
import { isNil, isNumber, isObject } from 'lodash';

import throwError from '../../utils/throw-error';

import { TDRecod, AlignConf } from '../interface';

const getSpanConf = (
  record: TDRecod,
  totalColumns: number
): { labelSpan: number; valueSpan: number } => {
  if (!isNil(record) && !isNil(record.colspan) && isNumber(record.colspan)) {
    // @ts-ignore
    if (record.colspan - 3 >= 0 || record.colspan <= totalColumns) {
      // @ts-ignore
      return { labelSpan: 3, valueSpan: record.colspan - 3 };
    }
    throwError(
      `配置错误，colspan应控制大于3并且小于等于${totalColumns}，但是现在为：${record.colspan}`
    );
  }
  if (record.colspan && isObject(record.colspan)) {
    // @ts-ignore
    return { labelSpan: record.colspan.label, valueSpan: record.colspan.value };
  }
  return { labelSpan: 3, valueSpan: 5 };
};

export interface RowRecord {
  type: 'label' | 'value';
  node: ReactNode;
  span: number;
  alignConf?: AlignConf;
}

export default (data: TDRecod[], totalColumns: number): RowRecord[][] => {
  const gourp: RowRecord[][] = [];
  let count = 0;
  let row: RowRecord[] = [];
  data.map(record => {
    const { labelSpan, valueSpan } = getSpanConf(record, totalColumns);
    if (count + labelSpan + valueSpan <= totalColumns) {
      row = [
        ...row,
        {
          type: 'label',
          node: record.label,
          span: labelSpan,
          alignConf: record.alignConf,
        },
        {
          type: 'value',
          node: record.value,
          span: valueSpan,
          alignConf: record.alignConf,
        },
      ];
      if (count + labelSpan + valueSpan === totalColumns) {
        count = 0;
        gourp.push(row);
        row = [];
      } else {
        count = count + labelSpan + valueSpan;
      }
    } else {
      row.push({
        type: 'value',
        node: null,
        span: totalColumns - count,
      });

      gourp.push(row);
      count = labelSpan + valueSpan;
      row = [
        {
          type: 'label',
          node: record.label,
          span: labelSpan,
          alignConf: record.alignConf,
        },
        {
          type: 'value',
          node: record.value,
          span: valueSpan,
          alignConf: record.alignConf,
        },
      ];
      if (count === totalColumns) {
        count = 0;
        gourp.push(row);
        row = [];
      } else if (count > totalColumns) {
        throwError(`配置错误，colspan应控制小于等于${totalColumns}，但是现在为：${record.colspan}`);
      }
    }
  });
  if (row.length) {
    row.push({
      type: 'value',
      node: null,
      span: totalColumns - count,
    });
    gourp.push(row);
  }
  return gourp;
};
