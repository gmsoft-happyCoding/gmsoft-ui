/* eslint-disable no-restricted-globals */
import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';
import { getTopRoot } from '../utils/getContainer';

type NotifyType = 'info' | 'success' | 'error' | 'warning';

const createNotify = (type: NotifyType) => (config: ArgsProps) => {
  notification[type]({
    style: { wordBreak: 'break-word' },
    getContainer: getTopRoot,
    ...config,
  });
};

export const info = createNotify('info');
export const success = createNotify('success');
export const error = createNotify('error');
export const warning = createNotify('warning');

export default {
  info,
  success,
  error,
  warning,
  open: notification.open,
  close: notification.close,
  destroy: notification.destroy,
};
