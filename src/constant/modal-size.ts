// 弹出层 size
const MODAL_SIZE = {
  SMALL: 300,
  DEFAULT: 600,
  LARGE: 800,
};

export default MODAL_SIZE;

export type ModalSize = 'small' | 'default' | 'large';

export const getModalSize = (modalSize?: ModalSize) => {
  if (modalSize === 'large') {
    return MODAL_SIZE.LARGE;
  }
  if (modalSize === 'small') {
    return MODAL_SIZE.SMALL;
  }
  return MODAL_SIZE.DEFAULT;
};
