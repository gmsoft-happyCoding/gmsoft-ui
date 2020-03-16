/**
 * 表格-描述详情 展示
 */
import React, { useMemo } from 'react';
import { Skeleton } from 'antd';

import Empty from '../Empty';

import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Label,
  Value,
  TableDesView,
  TableDesTitle,
} from './StyledTable';
import { TableDescriptionsProps } from './interface.d';
import { TOTAL_COLUMNS_NUM } from './configs/columns';
import getThKeys from './utils/th-keys';
import getHash from './utils/get-hash';
import groupData from './utils/group';

export default ({
  dataSource,
  loading,
  title,
  size = 'default',
  alignConf = { labelAlign: 'right', labelValign: 'top', valueAlign: 'left', valueValign: 'top' },
}: TableDescriptionsProps) => {
  const TheadTrElem = useMemo(
    () => (
      <Tr>
        {getThKeys(TOTAL_COLUMNS_NUM).map(key => (
          <Th key={key} />
        ))}
      </Tr>
    ),
    []
  );
  const TbodyTrElem = useMemo(() => {
    if (dataSource && dataSource.length) {
      return groupData(dataSource, TOTAL_COLUMNS_NUM).map(row => (
        <Tr key={getHash()}>
          {row.map(item =>
            item.type === 'label' ? (
              <Label
                key={getHash()}
                colSpan={item.span}
                align={alignConf.labelAlign}
                valign={item.alignConf?.labelValign || alignConf.labelValign}
              >
                {item.node}
              </Label>
            ) : (
              <Value
                key={getHash()}
                colSpan={item.span}
                align={item.alignConf?.valueAlign || alignConf.valueAlign}
                valign={alignConf.valueValign}
              >
                {item.node}
              </Value>
            )
          )}
        </Tr>
      ));
    }
    return null;
  }, [dataSource, alignConf]);
  if (loading === true) {
    return <Skeleton />;
  }
  if (!dataSource || dataSource.length === 0) {
    return <Empty />;
  }
  return (
    <>
      {title && <TableDesTitle>{title}</TableDesTitle>}
      <TableDesView>
        <Table size={size}>
          <Thead>{TheadTrElem}</Thead>
          <Tbody>{TbodyTrElem}</Tbody>
        </Table>
      </TableDesView>
    </>
  );
};
