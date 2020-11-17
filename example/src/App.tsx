import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';
import { get } from 'lodash';
import { Router, Route, Switch } from 'react-router-dom';
import Demo1 from './demo/Demo1';
import DemoWrapperTable from './demo/DemoWrapperTable';

import { stateContainer } from './utils';

const App = () => (
  <Provider store={stateContainer._store}>
    <div style={{ padding: 20 }}>
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
          <Route path="/demo1" exact strict component={Demo1} />
          <Route path="/wrapper-table" exact strict component={DemoWrapperTable} />
        </Switch>
      </Router>
    </div>
  </Provider>
);

export default hot(App);
