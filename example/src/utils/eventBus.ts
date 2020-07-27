/* eslint-disable import/prefer-default-export */
/**
 * 应用和框架, 应用和应用之间通过 eventBus 通信
 * event 比直接暴露方法有更高的灵活性, 耦合度更低且更加安全
 * 框架提供的所有 listener 在此文件中注册, 方便查看
 * 如果有外部依赖, 无法在初始化时完成注册, 提供 listenX 方法例如: listenAngularRoute
 * api:
 * eventBus.on('namespace.eventName', listener)
 * eventBus.emit('namespace.eventName', ...listenerArgs)
 * eventBus.off('namespace.eventName', listener)
 * @see: 更多内容 - https://github.com/angular-moon/eev
 */
import Eev from 'eev';
import { message, Modal, notification } from 'antd';

const eventBus = new Eev();

/**
 * antd 的 Modal, 如何使用参见:
 * https://ant.design/components/modal-cn/#Modal.method()
 */
eventBus.on('antd.Modal.info', Modal.info);
eventBus.on('antd.Modal.success', Modal.success);
eventBus.on('antd.Modal.error', Modal.error);
eventBus.on('antd.Modal.warning', Modal.warning);
eventBus.on('antd.Modal.confirm', Modal.confirm);

/**
 * antd 的 message, 如何使用参见:
 * https://ant.design/components/message-cn/#API
 */
eventBus.on('antd.message.info', message.info);
eventBus.on('antd.message.success', message.success);
eventBus.on('antd.message.error', message.error);
eventBus.on('antd.message.warning', message.warning);
eventBus.on('antd.message.loading', message.loading);

/**
 * antd 的 message, 如何使用参见:
 * https://ant.design/components/notification-cn/#API
 */
eventBus.on('antd.notification.info', notification.info);
eventBus.on('antd.notification.success', notification.success);
eventBus.on('antd.notification.error', notification.error);
eventBus.on('antd.notification.warning', notification.warning);
eventBus.on('antd.notification.open', notification.open);
eventBus.on('antd.notification.close', notification.close);
eventBus.on('antd.notification.destroy', notification.destroy);

/**
 * 其他(iframe加载)应用通过 eventBus 和主框架及其他应用通信
 * @example: top.eventBus.emit('route.angular', 'notices.list');
 * @type {Eev}
 */
window.eventBus = eventBus;
