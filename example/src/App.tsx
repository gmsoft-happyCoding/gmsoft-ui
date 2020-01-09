import { hot } from 'react-hot-loader/root';
import React, { useState, useCallback } from 'react';
import { Provider } from 'react-redux';
import { get } from 'lodash';
import { Button } from 'antd';
import { Router, Route, Switch } from 'react-router-dom';
import { Drawer, Modal, notification, message } from 'gmsoft-ui';

import { stateContainer } from './utils';

const Demo = () => {
  const [v1, setV1] = useState(false);
  const [v2, setV2] = useState(false);

  const showInfo = useCallback(() => {
    notification.info({
      message: '请求错误!',
      description: 'hello',
    });
  }, []);

  const showError = useCallback(() => {
    Modal.error({
      title: 'This is an error message',
      content: 'some messages...some messages...',
    });
  }, []);

  const showLoading = useCallback(() => {
    message.loading('loading');
  }, []);

  return (
    <>
      <Button onClick={() => setV1(true)}>打开Drawer</Button>
      <Button onClick={showInfo}>notification.info</Button>
      <Button onClick={showError}>Modal.error</Button>
      <Button onClick={showLoading}>message.loading</Button>
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
    </>
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
              style={{ width: 1200, height: 800 }}
            />
          )}
        />
        <Route path="/demo" exact strict component={Demo} />
      </Switch>
    </Router>
  </Provider>
);

export default hot(App);
