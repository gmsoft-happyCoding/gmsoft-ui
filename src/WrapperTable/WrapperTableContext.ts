/**
 * 表格包裹器 上下文
 * @Author GM20171202
 * @Date 2020-11-11 13:50:58
 * @Last Modified by: GM20171202
 * @Last Modified time: 2020-11-12 17:06:33
 */
import { createContext } from 'react';

import { WrapperTableContextValue } from './typing.d';

const WrapperTableContext = createContext<WrapperTableContextValue | undefined>(undefined);

export default WrapperTableContext;
