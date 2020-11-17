/* eslint-disable no-restricted-globals */
/**
 * 顶层窗口引用挂载节点
 */
export const getTopRoot = () => {
  // try 防止跨域报错
  try {
    return (top?.document.querySelector('#mount-root') as HTMLElement) || top.document.body;
  } catch (error) {
    return document.body;
  }
};

export function getParent(triggerNode?: Element): HTMLElement {
  if (triggerNode && triggerNode.parentNode) {
    // @ts-ignore
    return triggerNode.parentNode;
  }
  // fallback
  return getTopRoot();
}
