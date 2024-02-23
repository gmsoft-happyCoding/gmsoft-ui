import React, { ReactNode } from 'react';
import { Modal as AntdModal, ConfigProvider } from 'antd';
import { ModalProps as AntdModalProps, ModalFuncProps } from 'antd/lib/modal';
import { getTopRoot, getParent } from '../utils/getContainer';
import TopBodyOverflow from '../components/TopBodyOverflow';
import { getModalSize, ModalSize } from '../constant/modal-size';
import InjectStyleToTop from '../components/InjectStyleToTop';

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
    <InjectStyleToTop target={topRoot}>
      <TopBodyOverflow />
      <AntdModal
        getContainer={getContainer || getTopRoot}
        width={width || getModalSize(size)}
        {...rest}
      >
        {children && <ConfigProvider getPopupContainer={getParent}>{children}</ConfigProvider>}
      </AntdModal>
    </InjectStyleToTop>
  );
};

type ModalType = 'info' | 'success' | 'error' | 'warning' | 'confirm';

const createModal = (type: ModalType) => ({ content, ...restConfig }: ModalFuncProps) =>
  AntdModal[type]({
    ...restConfig,
    getContainer: getTopRoot,
    content: content ? (
      <ConfigProvider getPopupContainer={getParent}>{content}</ConfigProvider>
    ) : null,
  });

Modal.info = createModal('info');
Modal.success = createModal('success');
Modal.error = createModal('error');
Modal.warning = createModal('warning');
Modal.confirm = createModal('confirm');
Modal.destroyAll = AntdModal.destroyAll;

export default Modal;
