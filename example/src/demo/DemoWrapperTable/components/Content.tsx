/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Button } from 'antd';
import { ContentProps } from 'search-page';
import { WrapperTable } from '@gmsoft/ui';

const { WrapperTableTabs, WrapperTableContext } = WrapperTable;

const BtnBar = styled.div`
  &&& > .ant-btn:not(:first-child) {
    margin-left: 8px;
  }
`;

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];
const dataSource1 = [
  {
    key: '1',
    name: '胡彦斌1',
    age: 32,
    address: '西湖区湖底公园1号1',
  },
  {
    key: '2',
    name: '胡彦祖2',
    age: 42,
    address: '西湖区湖底公园1号2',
  },
];
const dataSource2 = [
  {
    key: '1',
    name: '胡彦斌4',
    age: 32,
    address: '西湖区湖底公园1号1',
  },
  {
    key: '2',
    name: '胡彦祖25',
    age: 42,
    address: '西湖区湖底公园1号2',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const Content = ({ data, forceUpdate, loading, filters, pagination }: ContentProps) => {
  const wrapperState = useContext(WrapperTableContext);
  useEffect(() => {
    console.log('wrapperState=-------', wrapperState);
  }, [wrapperState]);
  const doSetTabTitle = useCallback(() => {
    wrapperState?.setState({
      tabs: [
        { key: '1', title: '待处理（100）' },
        { key: '2', title: '被禁言（102）' },
        { key: '3', title: '可撤回（1001）', status: 'disable' },
      ],
    });
  }, [wrapperState]);
  return (
    <WrapperTableTabs
      tabBarExtraContent={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <BtnBar>
          <Button type="primary" onClick={doSetTabTitle}>
            设置tab标题
          </Button>
          <Button>打印</Button>
        </BtnBar>
      }
    >
      <Table key="1" columns={columns} dataSource={dataSource} />
      <Table key="2" columns={columns} dataSource={dataSource1} />
      <Table key="3" columns={columns} dataSource={dataSource2} />
    </WrapperTableTabs>
  );
};

export default Content;
