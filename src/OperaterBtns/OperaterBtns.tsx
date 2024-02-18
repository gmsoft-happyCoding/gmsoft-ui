/*
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2021-03-11 17:29:42
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2021-03-11 17:38:30
 * @Description: Nothing
 */
import React from 'react';
import { Menu, Dropdown, Icon, Divider } from 'antd';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import { isArray } from '@gmsoft/tools';

const MoreLink = styled.span`
  margin-right: 4px;
`;
const LinkBtn = styled.div`
  display: inline-block;
  button {
    padding: 0;
    min-width: 0;
  }
`;
interface Props {
  children?: React.ReactNode;
  /** 至多展示几个操作项，超过这个数量将归入下拉菜单，默认：3 */
  defaultShowCount?: number;
}

function getMoreMenu(moreChild: React.ReactNode[]) {
  return (
    <Menu>
      {moreChild.map(item => (
        <Menu.Item key={uniqueId('operator_key_')}>{item}</Menu.Item>
      ))}
    </Menu>
  );
}

/**
 * 列表项目操作部分的容器组件，自动适配下拉菜单
 * Usage: 只需要使用组件将操作部分的按钮包裹起来即可，不要在按钮组外再包裹其他容器，包括Fragment,否则组件遍历计算按钮个数将会出错
 */
export default function OperaterBtns(props: Props) {
  const { children, defaultShowCount = 3 } = props;
  const allChilds = React.Children.map(children, child => child);

  // 如果菜单项数量低于三个（含）则直接渲染
  // 如果菜单项数量超过三个，则渲染前两个，其余部分放入dropMenu中渲染
  let prevChild: Array<React.ReactNode> = [];
  let moreChild: Array<React.ReactNode> = [];
  if (isArray(allChilds)) {
    if (allChilds.length <= defaultShowCount) {
      // 菜单项小于等于defaultShowCount个，直接渲染
      prevChild = allChilds.slice(0, defaultShowCount);
    } else {
      // 多于defaultShowCount个，渲染前面 defaultShowCount - 1 个，剩余的child加入更多选项豪华套餐，由menu接管
      prevChild = allChilds.slice(0, defaultShowCount - 1);
      moreChild = allChilds.slice(defaultShowCount - 1);
    }
  }

  return (
    <div>
      {prevChild.map((child, index, arr) => (
        <React.Fragment key={uniqueId('jhjf542_')}>
          <LinkBtn>{child}</LinkBtn>
          {index < arr.length - 1 || moreChild.length > 0 ? <Divider type="vertical" /> : null}
        </React.Fragment>
      ))}
      {moreChild.length > 1 ? (
        <Dropdown overlay={getMoreMenu(moreChild)}>
          {/* eslint-disable */}
          <LinkBtn>
            <a className="ant-dropdown-link">
              <MoreLink>更多</MoreLink>
              <Icon type="down" />
            </a>
          </LinkBtn>
          {/* eslint-enable */}
        </Dropdown>
      ) : null}
    </div>
  );
}
