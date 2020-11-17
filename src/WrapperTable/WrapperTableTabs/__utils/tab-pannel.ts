import { TabPaneProps } from 'antd/es/tabs';

import { TabState } from '../../typing';

export const getTabPannelProps = (
  key: string | undefined,
  tabs: TabState[] | undefined
): TabPaneProps => {
  const currentTab = tabs?.find(ti => ti.key === key);

  return {
    tab: currentTab?.title,
    key: currentTab?.key,
    disabled: currentTab?.status === 'disable',
  };
};
