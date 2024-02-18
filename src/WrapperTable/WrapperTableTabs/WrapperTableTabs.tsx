/**
 * 包装 Tab
 * @Author GM20171202
 * @Date 2020-11-12 09:53:44
 * @Last Modified by: GM20171202
 * @Last Modified time: 2020-11-12 17:37:47
 */
import React, { ReactNode, useCallback, useContext } from 'react';
import { Tabs } from 'antd';
import isNil from 'lodash/isNil';
import { TabsProps } from 'antd/es/tabs';

import WrapperTableContext from '../WrapperTableContext';

import { WrapNoTab, WrapTab, WrapNoTabBtnBar } from './StyledElems';
import { parseTabList } from './__utils/tab-list';
import { getTabPannelProps } from './__utils/tab-pannel';

const { TabPane } = Tabs;

export interface WrapperTableTabsProps
  extends Pick<
    TabsProps,
    | 'className'
    | 'tabBarGutter'
    | 'animated'
    | 'size'
    | 'tabBarExtraContent'
    | 'tabBarStyle'
    | 'size'
  > {
  children?: ReactNode;
}

export default ({
  children,
  size = 'default',
  tabBarExtraContent,
  tabBarGutter = 23,
  animated = { inkBar: true, tabPane: false },
  ...resProps
}: WrapperTableTabsProps) => {
  const wrapperState = useContext(WrapperTableContext);
  const setActiveKey = useCallback(
    (acKey: string) => {
      wrapperState?.setState({ activeTabKey: acKey });
    },
    [wrapperState]
  );

  const tabList = parseTabList({ children, tabs: wrapperState?.tabs || [] });
  if (isNil(wrapperState?.tabs) || tabList.length === 0) {
    return null;
  }
  if (tabList.length === 1) {
    return (
      <WrapNoTab>
        {!!tabBarExtraContent && <WrapNoTabBtnBar>{tabBarExtraContent}</WrapNoTabBtnBar>}
        {React.cloneElement(tabList[0].node, { size, pagination: false, ...tabList[0].node.props })}
      </WrapNoTab>
    );
  }
  if (wrapperState?.tabs) {
    return (
      <WrapTab>
        <Tabs
          activeKey={wrapperState?.activeTabKey}
          onChange={setActiveKey}
          size={size}
          animated={animated}
          tabBarGutter={tabBarGutter}
          {...resProps}
          tabBarExtraContent={tabBarExtraContent}
        >
          {tabList.map(tabItem => (
            <TabPane {...getTabPannelProps(tabItem.key, wrapperState.tabs)}>
              {React.cloneElement(tabItem.node, { size, pagination: false, ...tabItem.node.props })}
            </TabPane>
          ))}
        </Tabs>
      </WrapTab>
    );
  }
  return null;
};
