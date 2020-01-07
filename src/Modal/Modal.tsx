import React, { ReactNode } from 'react';
import { Modal as AntdModal, ConfigProvider } from 'antd';
import { ModalProps as AntdModalProps } from 'antd/lib/modal';
import { StyleSheetManager } from 'styled-components';
import { getTopRoot, getTopBody, getParent } from '../utils/getContainer';
import TopBodyOverflow from '../components/TopBodyOverflow';
import { getModalSize, ModalSize } from '../constant/modal-size';

const topRoot = getTopRoot();

export interface ModalProps extends Omit<AntdModalProps, 'destroyOnClose'> {
  children?: ReactNode;
  size?: ModalSize;
}

const Modal = ({ children, width, size, getContainer, ...rest }: ModalProps) => {
  if (rest.visible !== true) {
    return null;
  }
  return (
    <StyleSheetManager target={topRoot}>
      <>
        <TopBodyOverflow />
        <AntdModal
          getContainer={getContainer || getTopBody}
          width={width || getModalSize(size)}
          {...rest}
        >
          <ConfigProvider getPopupContainer={getParent}>{children}</ConfigProvider>
        </AntdModal>
      </>
    </StyleSheetManager>
  );
};

export default Modal;
