import React, { ReactNode } from 'react';
import { Modal as AntdModal, ConfigProvider } from 'antd';
import { ModalProps as AntdModalProps, ModalFuncProps } from 'antd/lib/modal';
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

type ModalType = 'info' | 'success' | 'error' | 'warning' | 'confirm';

const createModal = (type: ModalType) => (config: ModalFuncProps) => {
  if (top.eventBus) {
    top.eventBus.emit(`antd.Modal.${type}` as EventKey, config);
  } else {
    AntdModal[type](config);
  }
};

Modal.info = createModal('info');
Modal.success = createModal('success');
Modal.error = createModal('error');
Modal.warning = createModal('warning');
Modal.confirm = createModal('confirm');

export default Modal;
