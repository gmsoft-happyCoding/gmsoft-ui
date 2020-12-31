import React, { useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import createSearchPage from 'search-page';
import { WrapperTable } from '@gmsoft/ui';

import { getChildren } from './api';
import Content from './components/Content';
import FiltersForm from './components/FiltersForm';

const { WrapperTableContextProvider } = WrapperTable;

const List = () => {
  const SearchPage = useMemo(
    () =>
      createSearchPage({
        getDataApi: getChildren,
        FiltersForm,
        hideOnSinglePage: false,
      }),
    []
  );
  return <SearchPage>{Content}</SearchPage>;
};

export default (props: RouteComponentProps<any>) => (
  <WrapperTableContextProvider
    tabs={[
      { key: '1', title: '待处理' },
      { key: '2', title: '被禁言' },
      { key: '3', title: '可撤回', status: 'disable' },
    ]}
    defaultActiveTabKey="2"
  >
    <List />
  </WrapperTableContextProvider>
);
