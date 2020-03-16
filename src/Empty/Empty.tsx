import React from 'react';
import { Empty } from 'antd';
import { EmptyProps } from 'antd/lib/empty';

import { NO_DATA_PIC_URL } from './config';

export default (props: EmptyProps) => (
  <Empty className="ant-empty-normal" description="暂无数据" image={NO_DATA_PIC_URL} {...props} />
);
