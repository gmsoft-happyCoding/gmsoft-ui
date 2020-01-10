/* eslint-disable no-restricted-globals */
import { message } from 'antd';
import { ReactNode } from 'react';
import { ConfigOnClose } from 'antd/lib/message';

type MessageType = 'info' | 'success' | 'error' | 'warning' | 'loading';
type Content = string | ReactNode;

const createMessage = (type: MessageType) => (
  content: Content,
  duration: number = 3,
  onClose?: ConfigOnClose
) => {
  if (top.eventBus) {
    top.eventBus.emit(`antd.message.${type}` as EventKey, content, duration, onClose);
  } else {
    message[type](content, duration, onClose);
  }
};

export const info = createMessage('info');
export const success = createMessage('success');
export const error = createMessage('error');
export const warning = createMessage('warning');
export const loading = createMessage('loading');

export default {
  info,
  success,
  error,
  warning,
  loading,
};
