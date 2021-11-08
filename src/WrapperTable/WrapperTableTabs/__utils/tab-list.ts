import React from 'react';
import { TableProps } from 'antd/lib/table';
import toArray from 'rc-util/lib/Children/toArray';

import { TabState, TabNode } from '../../typing';

export const parseTabList = ({
  children,
  tabs,
}: {
  children: React.ReactNode;
  tabs: TabState[];
}): TabNode[] => {
  const tabList: TabNode[] = [];
  toArray(children).map((node: React.ReactElement<TableProps<any>> & { tabKey?: string }) => {
    if (React.isValidElement(node)) {
      let key: undefined | string;
      if (node.key !== undefined) {
        key = String(node.key);
      }
      if (!key || !tabs.length || tabs.find(tabState => tabState.key === key)?.status === 'hide') {
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
