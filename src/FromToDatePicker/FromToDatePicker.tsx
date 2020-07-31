import React, { useMemo, useCallback } from 'react';
import { DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

const FromDatePicker = styled(DatePicker).attrs({
  suffixIcon: <></>,
})`
  width: 100%;
  &&& input {
    text-align: center;
    border-right-width: 0 !important;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const ToDatePicker = styled(DatePicker).attrs({
  suffixIcon: <></>,
})`
  width: 100%;
  &&& input {
    text-align: center;
    border-left-width: 0 !important;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const Split = styled(Col)`
  text-align: center;
  line-height: 32px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
`;

type DateTimeI = number | undefined;

/**
 * default schema:
 * {
 *  from: DateTimeI,
 *  to: DateTimeI
 * }
 */
export interface FromToValueI {
  [key: string]: DateTimeI;
}

/**
 * 返回一天的 0 点
 */
function getStartTime(m: moment.Moment | number) {
  const _m = typeof m === 'number' ? moment(m) : m;
  return _m
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .valueOf();
}

/**
 * 返回一天的 23:59:59 999
 */
function getEndTime(m: moment.Moment | number) {
  const _m = typeof m === 'number' ? moment(m) : m;
  return _m
    .hour(23)
    .minute(59)
    .second(59)
    .millisecond(999)
    .valueOf();
}

function getValue(from: DateTimeI, to: DateTimeI, fromKey: string, toKey: string) {
  /**
   * 如果 from > to, 交换位置
   */
  if (from && to && from > to) {
    return {
      [fromKey]: getStartTime(to),
      [toKey]: getEndTime(from),
    };
  }

  return { [fromKey]: from, [toKey]: to };
}

interface Props {
  value?: FromToValueI;
  onChange?: (value: FromToValueI) => void;
  /**
   * @default from
   * 起始时间戳 key, 请根据需要设置(例如接口的参数为 x.min), 请设置为 min
   */
  fromKey?: string;
  /**
   * @default to
   * 结束时间戳 key, 请根据需要设置(例如接口的参数为 x.max), 请设置为 max
   */
  toKey?: string;
}

export default React.forwardRef<any, Props>(
  ({ value, onChange, fromKey = 'from', toKey = 'to' }: Props, ref) => {
    const fromValue = useMemo(() => {
      if (!value || !value[fromKey]) {
        return undefined;
      }
      return moment(value[fromKey]);
    }, [fromKey, value]);

    const fromOnChange = useCallback(
      (date: moment.Moment | null) => {
        if (!onChange) return;

        const from = date ? getStartTime(date) : undefined;

        onChange(getValue(from, value?.[toKey], fromKey, toKey));
      },
      [fromKey, onChange, toKey, value]
    );

    const toValue = useMemo(() => {
      if (!value || !value[toKey]) {
        return undefined;
      }
      return moment(value[toKey]);
    }, [toKey, value]);

    const toOnChange = useCallback(
      (date: moment.Moment | null) => {
        if (!onChange) return;

        const to = date ? getEndTime(date) : undefined;

        onChange(getValue(value?.[fromKey], to, fromKey, toKey));
      },
      [fromKey, onChange, toKey, value]
    );

    return (
      <Row gutter={0} ref={ref} type="flex" align="middle">
        <Col span={11}>
          <FromDatePicker value={fromValue} onChange={fromOnChange} />
        </Col>
        <Split span={2}>~</Split>
        <Col span={11}>
          <ToDatePicker value={toValue} onChange={toOnChange} />
        </Col>
      </Row>
    );
  }
);
