import React from 'react';
import { TableProps } from 'antd/lib/table';
import toArray from 'rc-util/lib/Children/toArray';

import { TabState, TabNode } from '../../typing';

export const parseTabList = (children: React.ReactNode, tabs: TabState[]): TabNode[] => {
  const tabList: TabNode[] = [];
  toArray(children).map((node: React.ReactElement<TableProps<any>>) => {
    if (React.isValidElement(node)) {
      const key = node.key !== undefined ? String(node.key) : undefined;
      if (tabs.find(tabState => tabState.key === key)?.status === 'hide') {
        return;
      }
      tabList.push({
        key,
        ...node.props,
        node,
      });
    }
  });
  return tabList;
};
