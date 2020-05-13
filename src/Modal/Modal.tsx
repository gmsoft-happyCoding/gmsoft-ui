/* eslint-disable no-restricted-globals */
import React, { ReactNode } from 'react';
import { Modal as AntdModal, ConfigProvider } from 'antd';
import { ModalProps as AntdModalProps, ModalFuncProps } from 'antd/lib/modal';
import { StyleSheetManager } from 'styled-components';
import { getTopRoot, getParent } from '../utils/getContainer';
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
          getContainer={getContainer || getTopRoot}
          width={width || getModalSize(size)}
          {...rest}
        >
          <ConfigProvider getPopupContainer={getParent}>{children}</ConfigProvider>
        </AntdModal>
      </>
    </StyleSheetManager>
  );
};

type ModalType = 'info' | 'success' | 'error' | 'warning' | 'confirm';

const createModal = (type: ModalType) => (config: ModalFuncProps) =>
  AntdModal[type]({ getContainer: getTopRoot, ...config });

Modal.info = createModal('info');
Modal.success = createModal('success');
Modal.error = createModal('error');
Modal.warning = createModal('warning');
Modal.confirm = createModal('confirm');
Modal.destroyAll = AntdModal.destroyAll;

export default Modal;
