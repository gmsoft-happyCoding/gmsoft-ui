import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Drawer as AntdDrawer, ConfigProvider } from 'antd';
import { DrawerProps as AntdDrawerProps } from 'antd/lib/drawer';
import { getTopRoot, getParent } from '../utils/getContainer';
import TopBodyOverflow from '../components/TopBodyOverflow';
import { getModalSize, ModalSize } from '../constant/modal-size';
import InjectStyleToTop from '../components/InjectStyleToTop';

const topRoot = getTopRoot();

export interface DrawerProps extends Omit<AntdDrawerProps, 'destroyOnClose'> {
  /** 点击窗体（整个Drawer）回调 */
  onClickCapture?: (e: MouseEvent) => void;
  children?: ReactNode;
  size?: ModalSize;
}

const Drawer = ({ children, width, size, getContainer, ...rest }: DrawerProps) => {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (rest.visible) {
      setLoad(true);
    }
  }, [rest.visible]);
  const afterVisibleChange = useCallback(v => {
    if (!v) {
      setLoad(false);
    }
  }, []);
  if (!load) {
    return null;
  }
  return (
    <InjectStyleToTop target={topRoot}>
      <TopBodyOverflow />
      <AntdDrawer
        getContainer={getContainer || getTopRoot}
        width={width || getModalSize(size)}
        afterVisibleChange={afterVisibleChange}
        {...rest}
      >
        <ConfigProvider getPopupContainer={getParent}>{children}</ConfigProvider>
      </AntdDrawer>
    </InjectStyleToTop>
  );
};

Drawer.Footer = AntdDrawer.Footer;

export default Drawer;
