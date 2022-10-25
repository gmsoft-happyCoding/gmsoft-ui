import React, { PropsWithChildren } from 'react';
import { StyleSheetManager } from 'styled-components';
import { inIframe } from '../utils/commonUtils';

interface Props {
  target: HTMLElement;
}

const InjectStyleToTop: React.FC<Props> = (props: PropsWithChildren<Props>) => {
  const { children, target } = props;
  if (inIframe) {
    return <StyleSheetManager target={target}>{children}</StyleSheetManager>;
  }
  return <>{children}</>;
};

export default InjectStyleToTop;
