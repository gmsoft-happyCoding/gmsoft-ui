/* eslint-disable no-restricted-globals */
import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

type NotifyType = 'info' | 'success' | 'error' | 'warning';

const createNotify = (type: NotifyType) => (config: ArgsProps) => {
  if (top.eventBus) {
    top.eventBus.emit(`antd.notification.${type}` as EventKey, config);
  } else {
    notification[type](config);
  }
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
};
