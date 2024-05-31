import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

/**
 * 用于标记是否需要注入css
 * 避免多次注入(弹出多个drawer的时), css不能被正确清理
 * 导致body滚动条被一直禁用
 */
export const TOP_BODY_OVERFLOW_HIDDEN_MARK = 'gmsoft-ui-top-body-need-inject-css';

export const setBodyOverflowHidden = (val: boolean) => {
  if (window.top) window.top[TOP_BODY_OVERFLOW_HIDDEN_MARK] = val;
};

export const getBodyOverflowHidden = () => {
  if (window?.top?.[TOP_BODY_OVERFLOW_HIDDEN_MARK] === undefined) {
    setBodyOverflowHidden(true);
  }
  return window?.top?.[TOP_BODY_OVERFLOW_HIDDEN_MARK];
};

const HiddenOverflow = createGlobalStyle<{ scrollbarWidth: number }>`
  body{
    position: relative;
    width: ${props => `calc(100% - ${props.scrollbarWidth}px)`};
    overflow: hidden;
    touch-action: none;
  }
`;

/**
 * 标记 禁用 top.body 滚动
 * didMount setBodyOverflowHidden(false)
 * willUnmount setBodyOverflowHidden(true)
 */
export const useHiddenOverflow = () => {
  useEffect(() => {
    setBodyOverflowHidden(false);
    return () => {
      setBodyOverflowHidden(true);
    };
  });
};

function getScrollbarWidth() {
  return window.top ? window.top?.innerWidth - window.top?.document.body.clientWidth : 0;
}

export default () => {
  const [visibleProxy] = useState(() => getBodyOverflowHidden());

  useHiddenOverflow();

  if (visibleProxy) {
    return <HiddenOverflow scrollbarWidth={getScrollbarWidth()} />;
  }
  return null;
};
