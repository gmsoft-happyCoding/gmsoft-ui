import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

/**
 * 用于标记是否需要注入css
 * 避免多次注入(弹出多个drawer的时), css不能被正确清理
 * 导致body滚动条被一直禁用
 */
export const TOP_BODY_OVERFLOW_HIDDEN_MARK = 'gmsoft-ui-top-body-need-inject-css';

export const setBodyOverflowHidden = (val: boolean) => {
  window.top.window[TOP_BODY_OVERFLOW_HIDDEN_MARK] = val;
};

export const getBodyOverflowHidden = () => {
  if (top[TOP_BODY_OVERFLOW_HIDDEN_MARK] === undefined) {
    setBodyOverflowHidden(true);
  }
  return top[TOP_BODY_OVERFLOW_HIDDEN_MARK];
};

const HiddenOverflow = createGlobalStyle`
  body{
    position: relative;
    width: calc(100% - 17px);
    overflow: hidden;
    touch-action: none;
  }
`;

/**
 * 标记 禁用top.body 滚动
 * didmount setBodyOverflowHidden(false)
 * willunmount setBodyOverflowHidden(true)
 */
export const useHiddenOverflow = () => {
  useEffect(() => {
    setBodyOverflowHidden(false);
    return () => {
      setBodyOverflowHidden(true);
    };
  });
};

export default () => {
  const [visibleProxy] = useState(() => getBodyOverflowHidden());
  useHiddenOverflow();
  if (visibleProxy) {
    return <HiddenOverflow />;
  }
  return null;
};
