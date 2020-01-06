import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { get } from 'lodash';
import { Button } from 'antd';
import { Router, Route, Switch } from 'react-router-dom';
import { Drawer, Modal } from 'gmsoft-ui';

import { stateContainer } from './utils';

const Demo = () => {
  const [v1, setV1] = useState(false);
  const [v2, setV2] = useState(false);
  return (
    <>
      <Button onClick={() => setV1(true)}>打开Drawer</Button>
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
        <Route path="/add" exact strict component={Demo} />
      </Switch>
    </Router>
  </Provider>
);

export default hot(App);
