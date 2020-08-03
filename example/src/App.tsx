import { hot } from 'react-hot-loader/root';
import React, { useState, useCallback } from 'react';
import { Provider } from 'react-redux';
import { get } from 'lodash';
import { Button, Card, Radio, Typography } from 'antd';
import { Router, Route, Switch } from 'react-router-dom';
import {
  Drawer,
  Modal,
  notification,
  message,
  TableDescriptions,
  FromToDatePicker,
  AreaSelect,
} from '@gmsoft/ui';
import { TDRecod } from '../../src/TableDescriptions/interface';
import './utils/eventBus';
import { stateContainer } from './utils';
import { misc } from '@/api';
import { AreaI } from '../../dist/AreaSelect/typing';

const { Paragraph, Title } = Typography;

const Demo = () => {
  const [v1, setV1] = useState(false);
  const [v2, setV2] = useState(false);
  const [tdSize, setTdSize] = useState<any>('default');

  const showInfo = useCallback(() => {
    notification.info({
      message: '请求错误!',
      description: 'hello',
    });
  }, []);

  const showError = useCallback(() => {
    const modal = Modal.error({
      title: 'This is an error message',
      content: 'i Will disappear in 3 seconds',
    });
    setTimeout(() => {
      modal.destroy();
    }, 3000);
  }, []);
  const changeTdSize = useCallback(e => {
    setTdSize(e.target.value);
  }, []);

  const showLoading = useCallback(() => {
    message.loading('loading');
  }, []);

  const tdData: TDRecod[] = [
    { label: '姓名', value: '张三' },
    { label: '年龄', value: '23' },
    { label: '性别', value: '男' },
    { label: '毕业学校', value: '重庆师范大学' },
    { label: '收入', value: '$55,500.55', alignConf: { valueAlign: 'right' } },
    {
      label: '简介',
      value:
        '塞尔维亚总统武契奇15日晚宣布，为应对新冠肺炎疫情，塞尔维亚即刻起进入国家紧急状态，将禁止外国人入境，塞尔维亚人回国需要接受至少14天的强制隔离。武契奇说，中国医护人员不在禁止入境名单之列，因为“中国是目前唯一能帮助塞尔维亚的国家”。他表示，塞尔维亚已经从中国购买了500万个口罩用于国内防疫，并将寻求中方医疗援助。（记者石中玉）',
      colspan: 24,
    },
    {
      label: '简介',
      value:
        '塞尔维亚总统武契奇15日晚宣布，为应对新冠肺炎疫情，塞尔维亚即刻起进入国家紧急状态，将禁止外国人入境，塞尔维亚人回国需要接受至少14天的强制隔离。武契奇说，中国医护人员不在禁止入境名单之列，因为“中国是目前唯一能帮助塞尔维亚的国家”。他表示，塞尔维亚已经从中国购买了500万个口罩用于国内防疫，并将寻求中方医疗援助。（记者石中玉）',
      colspan: 24,
    },
  ];

  const [fromToDate, setFromToDate] = useState({});
  const [area, setArea] = useState({} as AreaI);

  return (
    <Card title="Demo">
      <Card title="交互类">
        <Button onClick={() => setV1(true)}>打开Drawer</Button>
        <Button onClick={showInfo}>notification.info</Button>
        <Button onClick={showError}>Modal.error</Button>
        <Button onClick={showLoading}>message.loading</Button>
        <Button onClick={notification.destroy}>closeAllNotification</Button>
        <Title level={3}>选择的日期:</Title>
        <Paragraph>{JSON.stringify(fromToDate)}</Paragraph>
        <FromToDatePicker value={fromToDate} onChange={setFromToDate} fromKey="min" toKey="max" />
        <Title level={3}>选择的地区:</Title>
        <Paragraph>{JSON.stringify(area)}</Paragraph>
        <AreaSelect api={misc.districts_get} value={area} onChange={setArea} />
        <Drawer visible={v1} onClose={() => setV1(false)}>
          <div>
            <Button onClick={() => setV2(true)}>打开Drawer</Button>
            {[...'zxcvbnm,.asdfghjklqwertyuiop'].map(item => (
              <br key={item} />
            ))}
            <Modal visible={v2} size="large" onCancel={() => setV2(false)}>
              <div>
                {[...'zxcvbnm,.asdfghjklqwertyuiop'].map(item => (
                  <br key={item} />
                ))}
              </div>
            </Modal>
          </div>
        </Drawer>
      </Card>
      <Card title="TableDescriptions">
        <Radio.Group onChange={changeTdSize} value={tdSize}>
          <Radio value="default">default</Radio>
          <Radio value="middle">middle</Radio>
          <Radio value="small">small</Radio>
        </Radio.Group>
        <TableDescriptions size={tdSize} title="学生信息" dataSource={tdData} />
      </Card>
    </Card>
  );
};

const App = () => (
  <Provider store={stateContainer._store}>
    <Router history={stateContainer._history}>
      <Switch>
        <Route
          path="/iframe-test"
          strict
          render={p1 => (
            // eslint-disable-next-line jsx-a11y/iframe-has-title
            <iframe
              src={`${
                get(p1, 'location.pathname', '/iframe-test/todo').split('/iframe-test')[1]
              }${get(p1, 'location.search', '')}`}
              style={{ width: 1200, height: 800, marginTop: 100 }}
            />
          )}
        />
        <Route path="/demo" exact strict component={Demo} />
      </Switch>
    </Router>
  </Provider>
);

export default hot(App);
