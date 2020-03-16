/**
 * 顶层窗口引用挂载节点
 */
export const getTopRoot = () =>
  (top.document.querySelector('#mount-root') as HTMLElement) || top.document.body;

export function getParent(triggerNode?: Element): HTMLElement {
  if (triggerNode && triggerNode.parentNode) {
    // @ts-ignore
    return triggerNode.parentNode;
  }
  // fallback
  return getTopRoot();
}
