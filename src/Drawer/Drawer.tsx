import React, { ReactNode } from 'react';
import { Drawer as AntdDrawer, ConfigProvider } from 'antd';
import { DrawerProps as AntdDrawerProps } from 'antd/lib/drawer';
import { StyleSheetManager } from 'styled-components';
import { getTopRoot, getTopBody, getParent } from '../utils/getContainer';
import TopBodyOverflow from '../components/TopBodyOverflow';
import { getModalSize, ModalSize } from '../constant/modal-size';

const topRoot = getTopRoot();

export interface DrawerProps extends Omit<AntdDrawerProps, 'destroyOnClose'> {
  /** 点击窗体（整个Drawer）回调 */
  onClickCapture?: (e: MouseEvent) => void;
  children?: ReactNode;
  size?: ModalSize;
}

const Drawer = ({ children, width, size, getContainer, ...rest }: DrawerProps) => {
  if (rest.visible !== true) {
    return null;
  }
  return (
    <StyleSheetManager target={topRoot}>
      <>
        <TopBodyOverflow />
        <AntdDrawer
          getContainer={getContainer || getTopBody}
          width={width || getModalSize(size)}
          {...rest}
        >
          <ConfigProvider getPopupContainer={getParent}>{children}</ConfigProvider>
        </AntdDrawer>
      </>
    </StyleSheetManager>
  );
};

Drawer.Footer = AntdDrawer.Footer;

export default Drawer;
