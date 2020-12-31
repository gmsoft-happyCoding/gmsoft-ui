/**
 * 构造顶级容器
 * @Author GM20171202
 * @Date 2020-11-11 13:59:45
 * @Last Modified by: GM20171202
 * @Last Modified time: 2020-12-31 10:23:51
 */
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import HistoryHelper from 'history-helper';

import WrapperTableContext from './WrapperTableContext';
import { WrapperTableState, WrapperTableContextValue, TabState } from './typing';

export interface WrapperTableContextProviderProps {
  /**
   * 存储在history.state中key, 如果同一个页面有多个, 需要避免重复时请指定
   */
  storeKey?: string;
  /**
   * 存储数据使用的history对象, 默认为 top.history
   */
  storeHistory?: History;
  /**
   * 初始化 state.activeTabKey
   * 优先级大于缓存
   * */
  activeTabKey?: string;
  /**
   * 初始化 state.activeTabKey
   * 优先级小于缓存
   * */
  defaultActiveTabKey?: string;
  /**
   * 初始化 state.tabs
   * 优先级大于缓存
   * */
  tabs?: TabState[];
  children?: ReactNode;
}

const WrapperTableContextProvider = ({
  children,
  storeKey,
  storeHistory,
  activeTabKey,
  defaultActiveTabKey,
  tabs,
}: WrapperTableContextProviderProps) => {
  const historyHelper = new HistoryHelper(storeKey, storeHistory);
  const [wrapperTableState, setWrapperTableState] = useState<WrapperTableState>(() => ({
    activeTabKey:
      activeTabKey || historyHelper.getValue('activeTabKey', undefined) || defaultActiveTabKey,
    tabs,
    historyHelper,
  }));
  useEffect(() => {
    if (activeTabKey) {
      historyHelper.setState({ activeTabKey });
    }
  }, []);
  useEffect(() => {
    if (
      wrapperTableState.historyHelper.getValue('activeTabKey', undefined) !==
      wrapperTableState.activeTabKey
    ) {
      wrapperTableState.historyHelper.setState({ activeTabKey: wrapperTableState.activeTabKey });
    }
  }, [wrapperTableState.activeTabKey, wrapperTableState.historyHelper]);
  const setState = useCallback((newState: WrapperTableState) => {
    setWrapperTableState(oldState => ({ ...oldState, ...newState }));
  }, []);
  const contextValue = useMemo<WrapperTableContextValue>(
    () => ({ ...wrapperTableState, setState }),
    [wrapperTableState, setState]
  );
  return (
    <WrapperTableContext.Provider value={contextValue}>{children}</WrapperTableContext.Provider>
  );
};

export default WrapperTableContextProvider;
