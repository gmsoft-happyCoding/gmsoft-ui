/*
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2021-03-11 17:21:50
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2021-03-12 10:46:42
 * @Description: Nothing
 */
/* eslint-disable no-restricted-globals */
import { message } from 'antd';
import { ReactNode } from 'react';
import { ConfigOnClose } from 'antd/lib/message';
import { getTopRoot } from '../utils/getContainer';

type MessageType = 'info' | 'success' | 'error' | 'warning' | 'loading';
type Content = string | ReactNode;

const createMessage = (type: MessageType) => (
  content: Content,
  duration: number = 3,
  onClose?: ConfigOnClose
) => {
  if (top !== self) {
    message.config({
      getContainer: getTopRoot,
    });
  }
  message[type](content, duration, onClose);
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
  config: message.config,
  destory: message.destroy,
  destroy: message.destroy,
};
