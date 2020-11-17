import { ReactElement, Dispatch, SetStateAction } from 'react';
import { TableProps } from 'antd/es/table';
import HistoryHelper from 'history-helper';

/**
 * 单标签状态
 * * normal   - 正常
 * * disabled - 禁用
 * * hide     - 隐藏
 */
export type TabStatus = 'normal' | 'disable' | 'hide';

export type TabState = { key: string; title: string; status: TabStatus };

export interface WrapperTableState {
  activeTabKey?: string;
  tabs?: TabState[];
  historyHelper: HistoryHelper;
}

export interface WrapperTableContextValue extends WrapperTableState {
  setState: (newState: Partial<WrapperTableState>) => void;
}

export interface WrapperTableCacheState {
  activeTabKey?: string;
}

export interface TabNode extends TableProps<any> {
  key?: string;
  node: ReactElement;
}
